import {readFileSync} from "node:fs";
import {join} from "node:path";
import Link from "next/link";
import styles from "./page.module.css";
import StructuredData from "@/components/StructuredData";
import {createPageMetadata, getCanonicalUrl} from "@/lib/pageMetadata";
import {CoreConfig, BlogsConfig} from "@/configuration";
import {stripHtmlTags} from "@/lib/html";
import {Model as BlogPost} from "@/configuration/blog";

const blogContentDirectory = join(process.cwd(), "public", "config", "blogs");
const description = CoreConfig.seoDescription || "Notes and articles by " + CoreConfig.fullName + ".";

export const getPostMetadata = (postId: string) => {
  const postMetadata = BlogsConfig.posts.find((post) => post.id === postId) || null;
  if(!postMetadata) {
    throw new Error(`Blog post metadata not found for postId: ${postId}`);
  }
  return postMetadata;
}

export const getPostContent = (postId: string) => {
  let content: BlogPost;
  try {
    const fileContent = readFileSync(join(blogContentDirectory, postId + ".json"), "utf8");
    content = JSON.parse(fileContent) as BlogPost;
  } catch {
    return "";
  }
  return content.content || "";
}

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
        {BlogsConfig.posts ? (
          <div className={styles.postGrid}>
            {BlogsConfig.posts.map((post) => (
              <Link href={"/blogs/" + post.id + "/"} className={styles.postLink} key={post.id}>
                <article className={styles.postCard}>
                  <time className={styles.postDate} dateTime={post.date}>{post.date}</time>
                  <h2>{post.title}</h2>
                  <p className={styles.postExcerpt}>{stripHtmlTags(getPostContent(post.id)).slice(0, 240) || "Click to read more..."}</p>
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
