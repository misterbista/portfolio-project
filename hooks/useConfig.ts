"use client"

import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {Model as CoreConfigurationModel} from "@/configuration/core";
import {Model as LeftPanelConfigurationModel} from "@/configuration/leftPanel";
import {Model as HomeConfigurationModel} from "@/configuration/home";
import {Model as AboutConfigurationModel} from "@/configuration/about";
import {Model as JourneyConfigurationModel} from "@/configuration/journey";
import {Model as ProjectsConfigurationModel} from "@/configuration/projects";
import {Model as SkillsConfigurationModel} from "@/configuration/skills";
import {Model as TestimonialsConfigurationModel} from "@/configuration/testimonials";
import {Model as GalleryConfigurationModel} from "@/configuration/gallery";
import {Model as DownloadsConfigurationModel} from "@/configuration/quickLinks";
import {Model as BlogConfigurationModel} from "@/configuration/blog";
import {Model as ServicesConfigurationModel} from "@/configuration/services";
import {toast} from "sonner";
import {useGitHubPatAuth} from "@/hooks/useGitHubPatAuth";
import {getGitHubFileContent, uploadGitHubFiles} from "@/lib/gitHub";

export enum Identifier {
  Core = "core",
  LeftPanel = "leftPanel",
  Home = "home",
  About = "about",
  Journey = "journey",
  Projects = "projects",
  Skills = "skills",
  Testimonials = "testimonials",
  Gallery = "gallery",
  QuickLinks = "quickLinks",
  Blogs = "blogs",
  Blog = "blog",
  Services = "services",
}

type ConfigurationModelMap = {
  [Identifier.Core]: CoreConfigurationModel;
  [Identifier.LeftPanel]: LeftPanelConfigurationModel;
  [Identifier.Home]: HomeConfigurationModel;
  [Identifier.About]: AboutConfigurationModel;
  [Identifier.Journey]: JourneyConfigurationModel;
  [Identifier.Projects]: ProjectsConfigurationModel;
  [Identifier.Skills]: SkillsConfigurationModel;
  [Identifier.Testimonials]: TestimonialsConfigurationModel;
  [Identifier.Gallery]: GalleryConfigurationModel;
  [Identifier.QuickLinks]: DownloadsConfigurationModel;
  [Identifier.Blogs]: BlogConfigurationModel;
  [Identifier.Blog]: string;
  [Identifier.Services]: ServicesConfigurationModel;
};

type ConfigQuery = Record<string, string|number|null>;
type ConfigurationModel<K extends Identifier> = ConfigurationModelMap[K];
type ConfigHookResult<T extends Identifier> = {
  config: ConfigurationModel<T> | undefined;
  isLoadingConfig: boolean;
  saveConfig: (config: ConfigurationModel<T>) => Promise<void>;
  isSavingConfig: boolean;
};

const configurationPaths: Record<Identifier, (query?: ConfigQuery) => string> = {
  [Identifier.Core]: _ => `/config/core.json`,
  [Identifier.LeftPanel]: _ => `/config/left-panel.json`,
  [Identifier.Home]: _ => `/config/home.json`,
  [Identifier.About]: _ => `/config/about.json`,
  [Identifier.Journey]: _ => `/config/journey.json`,
  [Identifier.Projects]: _ => `/config/projects.json`,
  [Identifier.Skills]: _ => `/config/skills.json`,
  [Identifier.Testimonials]: _ => `/config/testimonials.json`,
  [Identifier.Gallery]: _ => `/config/gallery.json`,
  [Identifier.QuickLinks]: _ => `/config/quick-links.json`,
  [Identifier.Blogs]: _ => `/config/blogs.json`,
  [Identifier.Blog]: (query) => `/config/blogs/${query ? query['id'] : "NA"}`,
  [Identifier.Services]: _ => `/config/services.json`,
};

export enum ConfigMode {
  Public = "public",
  Private = "private"
}

export function useConfig<T extends Identifier>(configIdentifier: T, query?: ConfigQuery, mode?: ConfigMode): ConfigHookResult<T>{
  const queryClient = useQueryClient();
  mode ??= ConfigMode.Public;

  const {
    data: publicConfigData,
    isLoading: isLoadingPublicConfig
  } = useQuery({
    queryKey: [configIdentifier, query],
    queryFn: async () => await getConfig(configIdentifier, query),
    refetchOnWindowFocus: false,
    enabled: mode === ConfigMode.Public
  });

  const {
    data: privateConfigData,
    isLoading: isLoadingPrivateConfig
  } = useQuery({
    queryKey: [configIdentifier, query],
    queryFn: async () => await getConfigUsingPat(
      configIdentifier,
      query,
      gitHubPat,
      gitHubSession?.repository?.full_name || ""
    ),
    refetchOnWindowFocus: false,
    enabled: mode === ConfigMode.Private
  });

  const {
    gitHubPat,
    gitHubSession
  } = useGitHubPatAuth();

  const {
    mutateAsync,
    isPending
  } = useMutation({
    mutationKey: [configIdentifier, query],
    mutationFn: async (newConfig: ConfigurationModel<T>) => await saveConfig(
      configIdentifier,
      query,
      newConfig,
      gitHubPat,
      gitHubSession?.repository?.full_name || ""
    ),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [configIdentifier, query] });
      toast.success(`Config saved successfully: ${configIdentifier}`);
    },
    onError: async (error) => {
      const errorMessage = error instanceof Error ? error.message : typeof error === "string" ? error : `Failed to save ${configIdentifier} config.`;
      toast.error(errorMessage);
    }
  });

  return {
    config: mode === ConfigMode.Public ? publicConfigData : privateConfigData,
    isLoadingConfig: mode === ConfigMode.Public ? isLoadingPublicConfig : isLoadingPrivateConfig,
    saveConfig: mutateAsync,
    isSavingConfig: isPending
  };
}

async function getConfig<T extends Identifier>(configIdentifier: T, query?: ConfigQuery): Promise<ConfigurationModel<T>> {
  const configPathFunction = configurationPaths[configIdentifier];
  const configPath = configPathFunction(query);
  const response = await fetch(configPath);
  if (!response.ok) {
    throw new Error(`Failed to fetch config: ${configIdentifier}`);
  }

  const text = await response.text();
  try {
    return JSON.parse(text) as ConfigurationModel<T>;
  } catch {
    return text as ConfigurationModel<T>;
  }
}

async function saveConfig<T extends Identifier>(
  configIdentifier: T,
  query: ConfigQuery | undefined,
  newConfig: ConfigurationModel<T>,
  gitHubPat: string | null,
  repo: string
): Promise<void> {
  const configPathFunction = configurationPaths[configIdentifier];
  const configPath = configPathFunction(query);
  const filePath = configPath.replace(/^\/+/, "");
  await uploadGitHubFiles(
    gitHubPat ?? "",
    repo,
    filePath.substring(0, filePath.lastIndexOf("/")),
    [
      {
        name: filePath.substring(filePath.lastIndexOf("/") + 1),
        content: JSON.stringify(newConfig, null, 2),
      },
    ]
  )
}

async function getConfigUsingPat<T extends Identifier>(
  configIdentifier: T,
  query: ConfigQuery | undefined,
  gitHubPat: string | null,
  repo: string
): Promise<ConfigurationModel<T>> {
  const configPathFunction = configurationPaths[configIdentifier];
  const configPath = configPathFunction(query);
  const filePath = configPath.replace(/^\/+/, "");
  const response = await getGitHubFileContent(
    gitHubPat ?? "",
    repo,
    filePath
  );
  return JSON.parse(response) as ConfigurationModel<T>;
}
