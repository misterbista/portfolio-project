import dynamic from "next/dynamic";
import {existsSync} from "node:fs";
import {join} from "node:path";
import {CoreConfig, HomeConfig} from "@/configuration";
import {createPageMetadata, getSiteName} from "@/lib/pageMetadata";
import {cn} from "@/lib/utils";
import styles from "./page.module.css";

export const metadata = createPageMetadata({
  title: getSiteName(),
  description: CoreConfig.seoDescription || HomeConfig.bio,
  path: "/",
  image: HomeConfig.coverPicture || CoreConfig.favicon,
  keywords: CoreConfig.seoKeywords,
});

const customHomePath = join(process.cwd(), "templates", CoreConfig.template, "home", "page.content.tsx");
const PageContent = existsSync(customHomePath) ? dynamic(
  () => import(`@/templates/${CoreConfig.template}/home/page.content`),
  {ssr: true}
) : null;

function Page() {
  if (!PageContent) return (
    <main className={styles.page} aria-label="Home">
      <div
        className={styles.heroImage}
        style={{backgroundImage: `url("${HomeConfig.coverPicture}")`}}
        role="img"
        aria-label={`Hero image of ${CoreConfig.fullName}`}
      />
      <div className={styles.heroText}>
        <h1 className={cn(styles.heroTextPrimary, "text-white")}>{CoreConfig.fullName}</h1>
        <br/><br/>
        <p className={cn(styles.heroTextSecondary, "text-white")}>{HomeConfig.bio}</p>
      </div>
    </main>
  );

  return <PageContent />;
}

export default Page;
