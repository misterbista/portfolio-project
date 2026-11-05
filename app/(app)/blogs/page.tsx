import Link from "next/link";
import styles from "./page.module.css";
import StructuredData from "@/components/StructuredData";
import {createPageMetadata, getCanonicalUrl, plainText} from "@/lib/pageMetadata";
import {CoreConfig} from "@/configuration";
import {blogPostsCollection} from "@/configuration/collection/blogPostsCollection";

const description = CoreConfig.seoDescription || "Notes and articles by " + CoreConfig.fullName + ".";

export const metadata = createPageMetadata({
  title: "Blog",
  description,
  path: "/blogs/",
  image: CoreConfig.favicon,
  keywords: CoreConfig.seoKeywords,
});

export default function Page() {
  return (
    <>
      <main className={styles.page}>
        <h1 className={styles.pageHeader}>Blog</h1>
        <p className={styles.pageText}>{description}</p>
        {blogPostsCollection.length ? (
          <div className={styles.postGrid}>
            {blogPostsCollection.map((post) => (
              <Link href={"/blogs/" + post.slug + "/"} className={styles.postLink} key={post.id}>
                <article className={styles.postCard}>
                  <time className={styles.postDate} dateTime={post.date}>{post.date}</time>
                  <h2>{post.title}</h2>
                  <p className={styles.postExcerpt}>{plainText(post.content).slice(0, 240)}</p>
                  {!!post.categories.length && (
                    <div className={styles.tagList}>
                      {post.categories.map((category) => (
                        <span className={styles.tag} key={category}>{category}</span>
                      ))}
                    </div>
                  )}
                </article>
              </Link>
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>No blog posts yet.</div>
        )}
      </main>
      <StructuredData data={{
        "@context": "https://schema.org",
        "@type": "Blog",
        name: CoreConfig.websiteName + " Blog",
        description,
        ...(getCanonicalUrl("/blogs/") ? {url: getCanonicalUrl("/blogs/")} : {}),
        author: {"@type": "Person", name: CoreConfig.fullName},
      }} />
    </>
  );
}
