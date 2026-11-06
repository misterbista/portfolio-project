import type {Metadata} from "next";
import StructuredData from "@/components/StructuredData";
import {AboutConfig, CoreConfig} from "@/configuration";
import {createPageMetadata, getCanonicalUrl} from "@/lib/pageMetadata";
import {stripHtmlTags} from "@/lib/html";
import PageContent from "./page.content";

const description = stripHtmlTags(AboutConfig.aboutMe).slice(0, 300);

export const metadata: Metadata = createPageMetadata({
  title: "About",
  description,
  path: "/about/",
  image: AboutConfig.heroPicture,
  keywords: CoreConfig.seoKeywords,
});

function Page() {
  return (
    <>
      <PageContent
        coreConfig={CoreConfig}
        aboutConfig={AboutConfig}
      />

      <StructuredData data={{
        "@context": "https://schema.org",
        "@type": "AboutPage",
        name: "About " + CoreConfig.fullName,
        description,
        ...(getCanonicalUrl("/about/") ? {url: getCanonicalUrl("/about/")} : {}),
        mainEntity: {
          "@type": "Person",
          name: CoreConfig.fullName,
          image: AboutConfig.heroPicture,
        },
      }} />
    </>
  );
}

export default Page;
