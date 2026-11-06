import type {Metadata} from "next";
import Link from "next/link";
import {notFound} from "next/navigation";
import {ArrowLeft} from "lucide-react";
import styles from "../page.module.css";
import StructuredData from "@/components/StructuredData";
import {createPageMetadata, getCanonicalUrl} from "@/lib/pageMetadata";
import {CoreConfig, BlogsConfig} from "@/configuration";
import {getPostContent, getPostMetadata} from "@/app/(app)/blogs/page";
import {stripHtmlTags} from "@/lib/html";
import HtmlRenderer from "@/components/ui/HtmlRenderer";

export const dynamicParams = false;

export function generateStaticParams() {
  return BlogsConfig.posts.map((post) => ({blogId: post.id}));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{blogId: string}>;
}): Promise<Metadata> {
  const {blogId} = await params;
  const post = getPostContent(blogId);
  const postMetadata = getPostMetadata(blogId);
  if (!post) return {};

  return createPageMetadata({
    title: postMetadata.title,
    description: stripHtmlTags(post).slice(0, 300),
    path: "/blogs/" + blogId + "/",
    image: CoreConfig.favicon,
    keywords: postMetadata.tags,
    type: "article",
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{blogId: string}>;
}) {
  const {blogId} = await params;
  const post = getPostContent(blogId);
  const postMetadata = getPostMetadata(blogId);
  if (!post) notFound();
  const canonical = getCanonicalUrl("/blogs/" + blogId + "/");
  const description = stripHtmlTags(post).slice(0, 300);

  return (
    <>
      <main className={styles.page}>
        <article className={styles.article}>
          <Link href="/blogs/" className={styles.backLink}>
            <ArrowLeft size={16} /> All posts
          </Link>
          <header className={styles.articleHeader}>
            <h1>{postMetadata.title}</h1>
            <time className={styles.postDate} dateTime={postMetadata.date}>{postMetadata.date}</time>
            {!!postMetadata.categories.length && (
              <div className={styles.tagList}>
                {postMetadata.categories.map((category) => (
                  <span className={styles.tag} key={category}>{category}</span>
                ))}
              </div>
            )}
            {!!postMetadata.tags.length && (
              <div className={styles.tagList}>
                {postMetadata.tags.map((tag) => (
                  <span className={styles.tag} key={tag}>{tag}</span>
                ))}
              </div>
            )}
          </header>
          <HtmlRenderer>{styles.articleContent}</HtmlRenderer>
        </article>
      </main>
      <StructuredData data={{
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: postMetadata.title,
        description,
        datePublished: postMetadata.date,
        articleSection: postMetadata.categories,
        keywords: postMetadata.tags,
        ...(canonical ? {url: canonical} : {}),
        author: {"@type": "Person", name: CoreConfig.fullName},
      }} />
    </>
  );
}
