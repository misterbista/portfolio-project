"use client"

import React from 'react';
import styles from "./page.module.css";
import {cn} from "@/lib/utils";
import type {TModel as CoreModel} from "@/configuration/core";
import type {TModel as HomeModel} from "@/configuration/home";


function PageContent(
  {coreConfig, homeConfig}: {
    coreConfig: CoreModel;
    homeConfig: HomeModel;
  }
) {
  return (
    <main className={styles.page} aria-label="Home">
      <div
        className={styles.heroImage}
        style={{backgroundImage: `url("${homeConfig.coverPicture}")`}}
        role="img"
        aria-label={`Hero image of ${coreConfig.fullName}`}
      />
      <div className={styles.heroText}>
        <h1 className={cn(styles.heroTextPrimary, "text-white")}>{coreConfig.fullName}</h1>
        <br/><br/>
        <p className={cn(styles.heroTextSecondary, "text-white")}>{homeConfig.bio}</p>
      </div>
    </main>
  );
}

export default PageContent;
