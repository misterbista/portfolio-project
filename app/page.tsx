"use client"

import React from 'react';
import styles from "./page.module.css";
import {Identifier, useConfig} from "@/configuration/useConfig";
import {cn} from "@/lib/utils";

function Page() {
  const {
    config: coreConfig,
    isLoadingConfig: isLoadingCoreConfig
  } = useConfig(Identifier.Core);

  const {
    config: homeConfig,
    isLoadingConfig: isLoadingHomeConfig
  } = useConfig(Identifier.Home);

  if (isLoadingCoreConfig || isLoadingHomeConfig || !coreConfig || !homeConfig) {
    return "Loading...";
  }

  return (
    <div className={styles.page}>
      <div
        className={styles.heroImage}
        style={{background: `url("${homeConfig.heroPicture}")`}}
      />
      <div className={styles.heroText} >
        <span className={cn(styles.heroTextPrimary, "text-white")}>{coreConfig.fullName}</span>
        <br/><br/>
        <span className={cn(styles.heroTextSecondary, "text-white")}>{homeConfig.bio}</span>
      </div>
    </div>
  );
}

export default Page;
