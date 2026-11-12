"use client"

import type {PageContentProps} from "@/app/(app)/page.types";
import styles from "./page.module.css";

export default function PageContent({coreConfig, homeConfig}: PageContentProps) {
  return (
    <article className={styles.page} aria-label="Introduction">
      <header className={styles.hero}>
        <p className={styles.eyebrow}>A work in progress, a story so far.</p>
        <h1>{coreConfig.fullName || coreConfig.websiteName || "Hello there."}</h1>
        {homeConfig.bio && <p className={styles.lead}>{homeConfig.bio}</p>}
      </header>

      <footer className={styles.footer}>
        <p>{coreConfig.fullName || coreConfig.websiteName}</p>
        <span className={styles.eyebrow}>Always curious. Still building.</span>
      </footer>
    </article>
  );
}
