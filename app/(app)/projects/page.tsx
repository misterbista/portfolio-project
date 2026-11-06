import StructuredData from "@/components/StructuredData";
import {CoreConfig, ProjectsConfig} from "@/configuration";
import {createPageMetadata, getCanonicalUrl} from "@/lib/pageMetadata";
import {stripHtmlTags} from "@/lib/html";
import PageContent from "./page.content";

const summary = ProjectsConfig.summary || "";
const description = stripHtmlTags(summary || CoreConfig.seoDescription || "Explore projects.");

export const metadata = createPageMetadata({
  title: "Projects",
  description,
  path: "/projects/",
  image: CoreConfig.favicon,
  keywords: CoreConfig.seoKeywords,
});

export default function Page() {
  return (
    <>
      <PageContent />
      <StructuredData data={{
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "Projects",
        description,
        ...(getCanonicalUrl("/projects/") ? {url: getCanonicalUrl("/projects/")} : {}),
      }} />
    </>
  );
}
