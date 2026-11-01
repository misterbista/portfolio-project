"use client"

import React from 'react';
import styles from "./page.module.css";
import {Identifier, useConfig} from "@/hooks/useConfig";
import {cn} from "@/lib/utils";
import FullScreenMessage from "@/components/ui/FullScreenMessage";
import {Spinner} from "@/components/ui/spinner";

function Page() {
  const {
    config: coreConfig,
    isLoadingConfig: isLoadingCoreConfig
  } = useConfig(Identifier.Core);

  const {
    config: homeConfig,
    isLoadingConfig: isLoadingHomeConfig
  } = useConfig(Identifier.Home);

  if (isLoadingCoreConfig || isLoadingHomeConfig) {
    return <FullScreenMessage><Spinner className="size-10" /></FullScreenMessage>;
  }

  if(!coreConfig){
    return <FullScreenMessage>Error loading core configuration.</FullScreenMessage>;
  }

  if(!homeConfig){
    return <FullScreenMessage>Error loading home configuration.</FullScreenMessage>;
  }

  return (
    <div className={styles.page}>
      <div
        className={styles.heroImage}
        style={{background: `url("${homeConfig.coverPicture}")`}}
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
