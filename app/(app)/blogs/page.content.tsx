"use client"

import React from 'react';
import styles from "./page.module.css";
import {Model as BlogsModel} from "@/configuration/blogs"
import Link from "next/link";

function PageContent(
  {blogsConfig}: {
    blogsConfig: BlogsModel
  }
) {
  return (
    <main className={styles.page}>
      <h1 className={styles.pageHeader}>Blog</h1>
      {blogsConfig.posts ? (
        <div className={styles.postGrid}>
          {blogsConfig.posts.map((post) => (
            <Link href={"/blogs/" + post.id + "/"} className={styles.postLink} key={post.id}>
              <article className={styles.postCard}>
                <time className={styles.postDate} dateTime={post.date}>{post.date}</time>
                <h2>{post.title}</h2>
                <p className={styles.postExcerpt}>Click to read this post...</p>
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
  );
}

export default PageContent;
