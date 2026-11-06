import type {Metadata} from "next";
import {notFound} from "next/navigation";
import styles from "./page.module.css";
import PageContent from "./page.content";
import StructuredData from "@/components/StructuredData";
import {CoreConfig, JourneyConfig, ProjectsConfig, SkillsConfig} from "@/configuration";
import {createPageMetadata, getCanonicalUrl} from "@/lib/pageMetadata";
import {cn} from "@/lib/utils";
import {stripHtmlTags} from "@/lib/html";

export const dynamicParams = false;

export function generateStaticParams() {
  return ProjectsConfig.projects.map((project) => ({
    projectId: project.id,
  }));
}

function findProject(projectId: string) {
  return ProjectsConfig.projects.find((project) => project.id === projectId);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{projectId: string}>;
}): Promise<Metadata> {
  const {projectId} = await params;
  const project = findProject(projectId);
  if (!project) return {};

  return createPageMetadata({
    title: project.title,
    description: stripHtmlTags(project.description).slice(0, 300),
    path: "/projects/" + projectId + "/",
    image: project.previewImage || CoreConfig.favicon,
    keywords: project.seoKeywords || [],
    type: "article",
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{projectId: string}>;
}) {
  const {projectId} = await params;
  const project = findProject(projectId);
  if (!project) notFound();

  const milestone = project.milestoneId
    ? JourneyConfig.milestones.find((item) => item.id === project.milestoneId)
    : undefined;

  const linkedSkills = SkillsConfig.skills.filter((skill) =>
    (skill.associatedProjectIds || []).includes(project.id)
  );

  const canonical = getCanonicalUrl("/projects/" + projectId + "/");
  return (
    <main className={cn(styles.page, "bg-secondary")}>
      <PageContent
        project={project}
        milestone={milestone}
        skills={linkedSkills}
      />
      <StructuredData data={{
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        name: project.title,
        description: stripHtmlTags(project.description),
        ...(project.previewImage ? {image: project.previewImage} : {}),
        ...(canonical ? {url: canonical} : {}),
        author: {"@type": "Person", name: CoreConfig.fullName},
        keywords: project.seoKeywords || [],
      }} />
    </main>
  );
}
