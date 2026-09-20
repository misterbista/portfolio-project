"use client"

import React from 'react';
import styles from "./page.module.css";
import {Identifier, useConfig} from "@/configuration/useConfig";
import {cn} from "@/lib/utils";

function Page() {
  const {
    data: coreConfig,
    isLoading: coreConfigLoading
  } = useConfig(Identifier.Core);

  const {
    data: homeConfig,
    isLoading: homeConfigLoading
  } = useConfig(Identifier.Home);

  if (coreConfigLoading || homeConfigLoading || !coreConfig || !homeConfig) {
    return null;
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
