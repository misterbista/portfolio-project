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
import {Model as DownloadsConfigurationModel} from "@/configuration/downloads";
import {toast} from "sonner";
import {useGithubPatAuth} from "@/hooks/useGithubPatAuth";

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
  Downloads = "downloads",
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
  [Identifier.Downloads]: DownloadsConfigurationModel;
};

type ConfigurationModel<K extends Identifier> = ConfigurationModelMap[K];

const configurationPaths: Record<Identifier, string> = {
  [Identifier.Core]: "/config/core.json",
  [Identifier.LeftPanel]: "/config/left-panel.json",
  [Identifier.Home]: "/config/home.json",
  [Identifier.About]: "/config/about.json",
  [Identifier.Journey]: "/config/journey.json",
  [Identifier.Projects]: "/config/projects.json",
  [Identifier.Skills]: "/config/skills.json",
  [Identifier.Testimonials]: "/config/testimonials.json",
  [Identifier.Gallery]: "/config/gallery.json",
  [Identifier.Downloads]: "/config/downloads.json",
};

export function useConfig<T extends Identifier>(configIdentifier: T){
  const queryClient = useQueryClient();

  const {
    data,
    isLoading,
  } = useQuery({
    queryKey: [configIdentifier],
    queryFn: async () => await getConfig(configIdentifier),
    refetchOnWindowFocus: false
  });

  const {githubPat} = useGithubPatAuth();

  const {
    mutateAsync,
    isPending
  } = useMutation({
    mutationKey: [configIdentifier],
    mutationFn: async (newConfig: ConfigurationModel<T>) => await saveConfig(configIdentifier, newConfig, githubPat),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [configIdentifier] });
      toast.success(`Config saved successfully: ${configIdentifier}`);
    },
    onError: async (error) => {
      const errorMessage = error instanceof Error ? error.message : typeof error === "string" ? error : `Failed to save ${configIdentifier} config.`;
      toast.error(errorMessage);
    }
  });

  return {
    config: data,
    isLoadingConfig: isLoading,
    saveConfig: mutateAsync,
    isSavingConfig: isPending
  };
}

async function getConfig<T extends Identifier> (configIdentifier: T): Promise<ConfigurationModel<T>> {
  const configPath = configurationPaths[configIdentifier];
  const response = await fetch(configPath);
  if (!response.ok) {
    throw new Error(`Failed to fetch config: ${configIdentifier}`);
  }
  return await response.json() as ConfigurationModel<T>;
}

async function saveConfig<T extends Identifier>(configIdentifier: T, newConfig: ConfigurationModel<T>, githubPat: string | null): Promise<void> {
  const configPath = configurationPaths[configIdentifier];
  const filePath = `./public${configPath}`;

  if (!githubPat) {
    return Promise.resolve().then(() => {
      throw new Error("You have not logged in yet. Please log in to use this feature.");
    });
  }

  return Promise.resolve().then(() => {
    throw new Error("Feature is not implemented: Saving config to GitHub is not supported yet.");
  });
}
