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
import {Button} from "@base-ui/react";

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
    <div className={styles.page}>
      <h1>Core Configuration <ViewOrCopyConfigValues config={formValues} /></h1>
      <form onSubmit={handleSubmit(save)}>
        {/* start finding better ui design for form and begin form component placement. */}

        <Input {...register("fullName")}/>
        <Label htmlFor={"fullName"}>Full Name</Label>

        <Button type={"submit"}>Save</Button>
      </form>
    </div>
  );
}

export default Page;
