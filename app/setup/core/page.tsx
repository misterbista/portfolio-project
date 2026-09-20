"use client"

import React from 'react';
import styles from "./page.module.css";
import {Identifier, useConfig} from "@/configuration/useConfig";
import ViewOrCopyConfigValues from "@/components/ui/ViewOrCopyConfigValues";
import {useForm} from "react-hook-form";
import {Model, schema} from "@/configuration/core";
import {zodResolver} from "@hookform/resolvers/zod";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";

function Page() {
  const {
    config: coreConfig,
    isLoadingConfig: isLoadingCoreConfig,
    saveConfig
  } = useConfig(Identifier.Core);

  const {
    register,
    handleSubmit,
    watch
  } = useForm<Model>({
    resolver: zodResolver(schema),
    values: coreConfig
  });
  const formValues = watch();

  async function save(values: Model) {
    await saveConfig(values);
  }

  if(isLoadingCoreConfig || !coreConfig){
    return <>Loading...</>;
  }

  return (
    // make it a card in the middle of the page
    <div className={styles.page}>
      <div className={styles.header}>Core Configuration <ViewOrCopyConfigValues config={formValues} /></div>
      <form onSubmit={handleSubmit(save)}>
        {/* start finding better ui design for form and begin form component placement. */}

        <Label htmlFor={"favicon"}>Favicon</Label>
        <Input {...register("favicon")}/>

        <Label htmlFor={"websiteName"}>Website Name</Label>
        <Input {...register("websiteName")}/>

        <Label htmlFor={"fullName"}>Full Name</Label>
        <Input {...register("fullName")}/>

        <Label htmlFor={"seoDescription"}>SEO Description</Label>
        <Input {...register("seoDescription")}/>

        <Label htmlFor={"seoKeywords"}>SEO Keywords</Label>
        {/* show badge below input for each enter save as string array */}
        <Input {...register("seoKeywords.0")}/>

        <Button
          type={"submit"}
          size={"sm"}
          variant={"outline"}
          className={"cursor-pointer mt-2"}
        >
          Save
        </Button>
      </form>
    </div>
  );
}

export default Page;
