import dynamic from "next/dynamic";
import {CoreConfig, SkillsConfig, JourneyConfig, ProjectsConfig} from "@/configuration";
import {createPageMetadata, getCanonicalUrl} from "@/lib/pageMetadata";
import {stripHtmlTags} from "@/lib/html";
import StructuredData from "@/components/StructuredData";
import type {PageContentProps} from "./page.types";

const PageContent = dynamic<PageContentProps>(
  () => import(`@/templates/${CoreConfig.template}/skills/page.content`),
  {ssr: true}
);

const description = stripHtmlTags(SkillsConfig.summary).slice(0, 300);

export const metadata = createPageMetadata({
  title: "Skills",
  description,
  path: "/skills/",
  image: CoreConfig.favicon,
});

function Page() {
  const canonical = getCanonicalUrl("/skills/");
  return (
    <>
      <PageContent
        skillsConfig={SkillsConfig}
        journeyConfig={JourneyConfig}
        projectsConfig={ProjectsConfig}
      />

      <StructuredData data={{
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "Skills",
        description,
        ...(canonical ? {url: canonical} : {}),
      }}/>
    </>
  );
}

export default Page;
