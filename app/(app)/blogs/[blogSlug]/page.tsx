import type {Metadata} from "next";
import Link from "next/link";
import {notFound} from "next/navigation";
import {ArrowLeft} from "lucide-react";
import styles from "../page.module.css";
import StructuredData from "@/components/StructuredData";
import {blogPostsCollection} from "@/configuration/collection/blogPostsCollection";
import {createPageMetadata, getCanonicalUrl, plainText} from "@/lib/pageMetadata";
import {CoreConfig} from "@/configuration";

export const dynamicParams = false;

export function generateStaticParams() {
  return blogPostsCollection.map((post) => ({blogSlug: post.slug}));
}

function findPost(blogSlug: string) {
  return blogPostsCollection.find((post) => post.slug === blogSlug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{blogSlug: string}>;
}): Promise<Metadata> {
  const {blogSlug} = await params;
  const post = findPost(blogSlug);
  if (!post) return {};

  return createPageMetadata({
    title: post.title,
    description: plainText(post.content).slice(0, 300),
    path: "/blogs/" + blogSlug + "/",
    image: CoreConfig.favicon,
    keywords: post.tags,
    type: "article",
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{blogSlug: string}>;
}) {
  const {blogSlug} = await params;
  const post = findPost(blogSlug);
  if (!post) notFound();
  const canonical = getCanonicalUrl("/blogs/" + blogSlug + "/");
  const description = plainText(post.content).slice(0, 300);

  return (
    <>
      <main className={styles.page}>
        <article className={styles.article}>
          <Link href="/blogs/" className={styles.backLink}>
            <ArrowLeft size={16} /> All posts
          </Link>
          <header className={styles.articleHeader}>
            <h1>{post.title}</h1>
            <time className={styles.postDate} dateTime={post.date}>{post.date}</time>
            {!!post.categories.length && (
              <div className={styles.tagList}>
                {post.categories.map((category) => (
                  <span className={styles.tag} key={category}>{category}</span>
                ))}
              </div>
            )}
            {!!post.tags.length && (
              <div className={styles.tagList}>
                {post.tags.map((tag) => (
                  <span className={styles.tag} key={tag}>{tag}</span>
                ))}
              </div>
            )}
          </header>
          <div
            className={styles.articleContent}
            dangerouslySetInnerHTML={{__html: post.content}}
          />
        </article>
      </main>
      <StructuredData data={{
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        description,
        datePublished: post.date,
        articleSection: post.categories,
        keywords: post.tags,
        ...(canonical ? {url: canonical} : {}),
        author: {"@type": "Person", name: CoreConfig.fullName},
      }} />
    </>
  );
}
