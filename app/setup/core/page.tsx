"use client"

import React, {useEffect} from 'react';
import styles from "./page.module.css";
import {Identifier, useConfig} from "@/configuration/useConfig";
import {Controller, useForm} from "react-hook-form";
import {Model, schema} from "@/configuration/core";
import {zodResolver} from "@hookform/resolvers/zod";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {useRouter} from "next/navigation";
import {ArrayInput} from "@/components/ui/ArrayInput";
import {Textarea} from "@/components/ui/textarea";
import ConfigurationFormWrapper from "@/components/ui/ConfigurationFormWrapper";
import FullScreenMessage from "@/components/ui/FullScreenMessage";
import {Spinner} from "@/components/ui/spinner";

function Page() {
  const router = useRouter()

  const {
    config,
    isLoadingConfig,
    saveConfig
  } = useConfig(Identifier.Core);

  const {
    reset,
    control,
    handleSubmit,
    watch
  } = useForm<Model>({
    resolver: zodResolver(schema),
    defaultValues: config
  });
  const formValues = watch();

  useEffect(() => {
    if (config) {
      reset(config);
    }
  }, [config, reset]);

  async function save(values: Model) {
    await saveConfig(values);
  }

  if(isLoadingConfig){
    return <FullScreenMessage><Spinner className="size-10" /></FullScreenMessage>;
  }

  return (
    <ConfigurationFormWrapper className={styles.page} title={"Core Configuration"} config={formValues}>
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
    </ConfigurationFormWrapper>
  );
}

export default Page;
