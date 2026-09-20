"use client"

import React from 'react';
import styles from "./page.module.css";
import ConfigurationGroupCard from "@/components/ui/ConfigurationGroupCard";
import {AlignJustify, Home, Wrench} from "lucide-react";

function Page() {
  return (
    <div className={styles.page}>
      <div className={styles.cards}>
        <ConfigurationGroupCard
          icon={<Wrench/>}
          title="Core"
          description="Set core configuration values for the website."
          pagePath="/setup/core"
        />
        <ConfigurationGroupCard
          icon={<AlignJustify/>}
          title="Left Panel"
          description="Customize the left panel."
          pagePath="/setup/left-panel"
        />
        <ConfigurationGroupCard
          icon={<Home/>}
          title="Home"
          description="Customize the Landing page."
          pagePath="/setup/home"
        />
      </div>
    </div>
  );
}

export default Page;
