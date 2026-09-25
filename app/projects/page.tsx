"use client"

import React, {useState} from 'react';
import styles from "./page.module.css";
import {cn} from "@/lib/utils";
import {Identifier, useConfig} from "@/configuration/useConfig";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {GridIcon, ListIcon} from "lucide-react";
import SmartText from "@/components/ui/SmartText";
import FullScreenMessage from "@/components/ui/FullScreenMessage";
import {Spinner} from "@/components/ui/spinner";

function Page() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortMode, setSortMode] = useState<'name_asc' | 'name_desc' | 'created_asc' | 'created_desc'>('name_asc');
  const {
    config: coreConfig,
    isLoadingConfig: isLoadingCoreConfig
  } = useConfig(Identifier.Core);

  const {
    config: projectsConfig,
    isLoadingConfig: isLoadingProjectsConfig
  } = useConfig(Identifier.Projects);

  if (isLoadingCoreConfig || isLoadingProjectsConfig) {
    return <FullScreenMessage><Spinner className="size-10" /></FullScreenMessage>;
  }

  if(!coreConfig || !projectsConfig){
    return <FullScreenMessage>Error loading configuration...</FullScreenMessage>;
  }

  return (
    <div className={cn(styles.page, "bg-secondary")}>
      <span className={styles.pageHeader}>Projects</span>
      <SmartText className={styles.pageText}>{projectsConfig.pageDescription}</SmartText>
      <div className={styles.pageContent}>
        <div className={styles.searchAndActionsStrip}>
          <Input className={styles.searchBox} placeholder={"Search..."} />
          <div className={styles.quickActionButtons}>
            {viewMode === 'list' ? <Button
                size={"icon-sm"}
                type="button"
                onClick={() => setViewMode('grid')}
                aria-label={"Switch to grid mode"}
            ><GridIcon/></Button> : <Button
                size={"icon-sm"}
                type="button"
                onClick={() => setViewMode('list')}
                aria-label={"Switch to list mode"}
            ><ListIcon/></Button>}
          {/*  make a dropdown menu for sort modes  */}
          </div>
        </div>
        <div className={styles.projectsContainer}>
          {projectsConfig.projects.map((project, index) => <div key={index}>
            {project.title}
          </div>)}
        </div>
      </div>
    </div>
  );
}

export default Page;
