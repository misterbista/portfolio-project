"use client"

import React from "react";
import styles from "./page.module.css";
import {Identifier, useConfig} from "@/configuration/useConfig";
import ViewOrCopyConfigValues from "@/components/ui/ViewOrCopyConfigValues";
import {useForm} from "react-hook-form";
import {Model, schema} from "@/configuration/leftPanel";
import {zodResolver} from "@hookform/resolvers/zod";

function Page() {
  const {
    config: leftPanelConfig,
    isLoadingConfig: isLoadingLeftPanelConfig
  } = useConfig(Identifier.LeftPanel);

  const {
    register,
    handleSubmit,
    watch
  } = useForm<Model>({
    resolver: zodResolver(schema),
    values: leftPanelConfig
  });
  const formValues = watch();

  function save(values: Model) {
    console.log(values);
  }

  if(isLoadingLeftPanelConfig){
    return <>Loading...</>;
  }

  if(!leftPanelConfig){
    return <>Error loading configuration</>;
  }

  return (
    <div className={styles.page}>
      <div>Left Panel Configuration <ViewOrCopyConfigValues config={formValues} /></div>
      <form onSubmit={handleSubmit(save)}>
          <input {...register("profilePhoto")}/>
          <label htmlFor={"profilePhoto"}>Profile Photo URL</label>
      </form>
    </div>
  );
}

export default Page;
