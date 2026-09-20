"use client"

import React, {useEffect} from 'react';
import styles from "./page.module.css";
import {Identifier, useConfig} from "@/configuration/useConfig";
import ViewOrCopyConfigValues from "@/components/ui/ViewOrCopyConfigValues";
import {Controller, useForm} from "react-hook-form";
import {Model, schema} from "@/configuration/core";
import {zodResolver} from "@hookform/resolvers/zod";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";
import {Card, CardContent} from "@/components/ui/card";
import {cn} from "@/lib/utils";
import {useRouter} from "next/navigation";
import {ArrayInput} from "@/components/ui/ArrayInput";
import {Textarea} from "@/components/ui/textarea";
import ConfigFormTools from "@/app/setup/ConfigFormTools";

function Page() {
  const router = useRouter()

  const {
    config: coreConfig,
    isLoadingConfig: isLoadingCoreConfig,
    saveConfig
  } = useConfig(Identifier.Core);

  const {
    reset,
    control,
    handleSubmit,
    watch
  } = useForm<Model>({
    resolver: zodResolver(schema),
    defaultValues: coreConfig
  });
  const formValues = watch();

  useEffect(() => {
    if (coreConfig) {
      reset(coreConfig);
    }
  }, [coreConfig, reset]);

  async function save(values: Model) {
    await saveConfig(values);
  }

  if(isLoadingCoreConfig || !coreConfig){
    return <>Loading...</>;
  }

  return (
    <div className={styles.page}>
      <Card>
        <CardContent>
          <div className={styles.header}>
            <span className={styles.left}>Core Configuration <ViewOrCopyConfigValues config={formValues} /></span>
            {/* Move view and copy config as dropdown menus in tools, add an option to manage files in github */}
            {/* This file manager shall list all the files inside public/uploads directory */}
            {/* Allow user to download the file, copy the URL, upload the file, delete the file */}
            {/* Deleting won't use any smart detection, any existing usage will start failing, so just show a warning before deleting */}
            {/* Adding file will expose it to public, so we should show a warning before uploading */}
            <span className={styles.right}><ConfigFormTools/></span>
          </div>
          <form onSubmit={handleSubmit(save)} className={cn(styles.form, "grid gap-2 max-w-3xl")}>
            <Controller
              control={control}
              name={"favicon"}
              render={({field, fieldState: {error}}) => <>
                <Label htmlFor={"favicon"}>Favicon</Label>
                <Input {...field} className={cn("w-full", {"border-destructive": error})}/>
                {error && <small className={"text-destructive"}>{error.message}</small>}
              </>}
            />

            <Controller
              control={control}
              name={"websiteName"}
              render={({field, fieldState: {error}}) => <>
                <Label htmlFor={"websiteName"}>Website Name</Label>
                <Input {...field} className={cn("w-full", {"border-destructive": error})}/>
                {error && <small className={"text-destructive"}>{error.message}</small>}
              </>}
            />

            <Controller
              control={control}
              name={"fullName"}
              render={({field, fieldState: {error}}) => <>
                <Label htmlFor={"fullName"}>Full Name</Label>
                <Input {...field} className={cn("w-full", {"border-destructive": error})}/>
                {error && <small className={"text-destructive"}>{error.message}</small>}
              </>}
            />

            <Controller
              control={control}
              name={"seoDescription"}
              render={({field, fieldState: {error}}) => <>
                <Label htmlFor={"seoDescription"}>SEO Description</Label>
                <Textarea {...field} className={cn("w-full", {"border-destructive": error})}/>
                {error && <small className={"text-destructive"}>{error.message}</small>}
              </>}
            />

            <Controller
              control={control}
              name={"seoKeywords"}
              render={({field, fieldState: {error}}) => <>
                <Label htmlFor={"seoKeywords"}>SEO Keywords</Label>
                <ArrayInput {...field} className={cn("w-full", {"border-destructive": error})}/>
                {error && <small className={"text-destructive"}>{error.message}</small>}
              </>}
            />

            <div className={"flex gap-2 justify-end"}>
              <Button
                type={"button"}
                size={"sm"}
                variant={"outline"}
                className={"cursor-pointer mt-2"}
                onClick={() => router.push("/setup")}
              >
                Cancel
              </Button>
              <Button
                type={"submit"}
                size={"sm"}
                variant={"outline"}
                className={"cursor-pointer mt-2 bg-primary text-secondary"}
              >
                Save
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Page;
