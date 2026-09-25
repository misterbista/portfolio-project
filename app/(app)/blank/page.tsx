"use client"

import React from 'react';
import styles from "./page.module.css";
import {cn} from "@/lib/utils";

function Page() {
  return (
    <div className={cn(styles.page, "bg-secondary")}>
      Congratulations on reaching the blank page. This page serves as a pause to reflect on how you’re squandering your time.
    </div>
  );
}

export default Page;
