import React from "react";
import type {Metadata} from "next";
import Image from "next/image";
import styles from "./page.module.css";
import SmartText from "@/components/ui/SmartText";
import {AspectRatio} from "@/components/ui/aspect-ratio";
import {cn} from "@/lib/utils";
import HtmlRenderer from "@/components/ui/HtmlRenderer";
import StructuredData from "@/components/StructuredData";
import {AboutConfig, CoreConfig} from "@/configuration";
import {createPageMetadata, getCanonicalUrl, plainText} from "@/lib/pageMetadata";

const description = CoreConfig.seoDescription || plainText(AboutConfig.aboutMe).slice(0, 300);

export const metadata: Metadata = createPageMetadata({
  title: "About",
  description,
  path: "/about/",
  image: AboutConfig.heroPicture,
  keywords: CoreConfig.seoKeywords,
});

function Page() {
  return (
    <main className={cn(styles.page, "bg-secondary")}>
      <h1 className={styles.pageHeader}>About</h1>
      <HtmlRenderer className={styles.pageText}>{AboutConfig.aboutMe}</HtmlRenderer>
      <div className={styles.pageContent}>
        <AspectRatio ratio={16 / 9} className="w-full max-w-sm rounded-lg bg-muted">
          <Image
            className={styles.pagePhoto}
            src={AboutConfig.heroPicture}
            alt={CoreConfig.fullName}
            width={200}
            height={200}
            style={{objectFit: "cover", width: "100%", height: "auto"}}
          />
        </AspectRatio>
        <div className={styles.keypoints}>
          {AboutConfig.keypoints.map((keypoint) => (
            <div className={styles.keypoint} key={keypoint.title.replaceAll(/[^a-zA-Z0-9-_]/g, "")}>
              <span className={styles.keypointHead}>{keypoint.title}:</span>
              <SmartText className={styles.keypointValue}>{keypoint.value}</SmartText>
            </div>
          ))}
        </div>
      </div>
      {AboutConfig.additionalInformation && (
        <HtmlRenderer className={styles.pageText}>{AboutConfig.additionalInformation}</HtmlRenderer>
      )}
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
    </main>
  );
}

export default Page;
