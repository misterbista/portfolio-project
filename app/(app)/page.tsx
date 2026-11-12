import dynamic from "next/dynamic";
import {CoreConfig, HomeConfig} from "@/configuration";
import {createPageMetadata, getSiteName} from "@/lib/pageMetadata";
import type {PageContentProps} from "./page.types";

export const metadata = createPageMetadata({
  title: getSiteName(),
  description: CoreConfig.seoDescription || HomeConfig.bio,
  path: "/",
  image: HomeConfig.coverPicture || CoreConfig.favicon,
  keywords: CoreConfig.seoKeywords,
});

const PageContent = dynamic<PageContentProps>(
  () => import(`@/templates/${CoreConfig.template}/home/page.content`),
  {ssr: true}
);

function Page() {
  return (
    <PageContent
      coreConfig={CoreConfig}
      homeConfig={HomeConfig}
    />
  );
}

export default Page;
