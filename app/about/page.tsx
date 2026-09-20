"use client"

import React from 'react';
import styles from "./page.module.css";
import {Identifier, useConfig} from "@/configuration/useConfig";
import Image from "next/image";
import SmartText from "@/components/ui/SmartText";
import {AspectRatio} from "@/components/ui/aspect-ratio";
import {cn} from "@/lib/utils";

function Page() {
  const {
    data: coreConfig,
    isLoading: coreConfigLoading
  } = useConfig(Identifier.Core);

  const {
    data: aboutConfig,
    isLoading: aboutConfigLoading
  } = useConfig(Identifier.About);

  if (aboutConfigLoading || coreConfigLoading || !aboutConfig || !coreConfig) {
    return null;
  }

  return (
    <div className={cn(styles.page, "bg-secondary")}>
      <span className={styles.pageHeader}>About</span>
      <SmartText className={styles.pageText}>{aboutConfig.aboutMe}</SmartText>
      <div className={styles.pageContent}>
        <AspectRatio ratio={16 / 9} className="w-full max-w-sm rounded-lg bg-muted">
          <Image
            className={styles.pagePhoto}
            src={aboutConfig.photo}
            alt={coreConfig.fullName}
            width={200}
            height={200}
            style={{objectFit: "cover", width: "100%", height: "auto"}}
          />
        </AspectRatio>
        <div className={styles.keypoints}>
          {aboutConfig.keypoints.map(keypoint => (
            <div className={styles.keypoint} key={keypoint.title.replaceAll(/[^a-zA-Z0-9-_]/g, "")}>
              <span className={styles.keypointHead}>{keypoint.title}:</span>
              <SmartText className={styles.keypointValue}>{keypoint.value}</SmartText>
            </div>
          ))}
        </div>
      </div>
      { aboutConfig.additionalInformation && <SmartText className={styles.pageText}>{aboutConfig.additionalInformation}</SmartText> }
    </div>
  );
}

export default Page;
