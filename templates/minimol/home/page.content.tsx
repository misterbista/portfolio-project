import {AboutConfig, CoreConfig, HomeConfig, LeftPanelConfig} from "@/configuration";
import HtmlRenderer from "@/components/ui/HtmlRenderer";
import SmartLink from "@/components/ui/SmartLink";
import styles from "./page.module.css";

export default function PageContent() {
  const showAbout = LeftPanelConfig.enabledMenus.includes("about");
  const showJourney = LeftPanelConfig.enabledMenus.includes("journey");

  return (
    <article className={styles.page} aria-label="Introduction">
      <header className={styles.hero}>
        <p className={styles.eyebrow}>A work in progress, a story so far.</p>
        <h1>{CoreConfig.fullName || CoreConfig.websiteName || "Hello there."}</h1>
        {HomeConfig.bio && <p className={styles.lead}>{HomeConfig.bio}</p>}
        {(showAbout || showJourney) && <nav className={styles.links} aria-label="Explore this portfolio">
          {showAbout && <SmartLink href="/about/">About me <span aria-hidden="true">↗</span></SmartLink>}
          {showJourney && <SmartLink href="/journey/">The journey <span aria-hidden="true">↗</span></SmartLink>}
        </nav>}
      </header>

      {showAbout && AboutConfig.summary && <section className={styles.chapter} aria-labelledby="introduction-title">
        <div className={styles.chapterLabel}>
          <span className={styles.eyebrow}>An introduction</span>
          <h2 id="introduction-title">A little context.</h2>
        </div>
        <div className={styles.body}><HtmlRenderer>{AboutConfig.summary}</HtmlRenderer></div>
      </section>}

      <footer className={styles.footer}>
        <p>{CoreConfig.fullName || CoreConfig.websiteName}</p>
        <span className={styles.eyebrow}>Always curious. Still building.</span>
      </footer>
    </article>
  );
}
