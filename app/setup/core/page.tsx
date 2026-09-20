"use client"

import React from 'react';
import styles from "./page.module.css";
import {Identifier, useConfig} from "@/configuration/useConfig";
import ViewOrCopyConfigValues from "@/components/ui/ViewOrCopyConfigValues";
import {useForm} from "react-hook-form";
import {Model, schema} from "@/configuration/core";
import {zodResolver} from "@hookform/resolvers/zod";

function Page() {
  const {
    data: coreConfig,
    isLoading: coreConfigLoading
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

  function save(values: Model) {
    console.log(values);
  }

  if(coreConfigLoading || !coreConfig){
    return "Loading...";
  }

  return (
    <div className={styles.page}>
      <h1>Core Configuration <ViewOrCopyConfigValues config={formValues} /></h1>
      <form onSubmit={handleSubmit(save)}>
        {/* start finding better ui design for form and begin form component placement. */}
        <input{...register("fullName")}/>
        <label htmlFor={"fullName"}>Full Name</label>
      </form>
    </div>
  );
}

export default Page;
