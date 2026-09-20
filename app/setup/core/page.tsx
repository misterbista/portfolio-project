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
import {Card, CardContent} from "@/components/ui/card";
import {cn} from "@/lib/utils";
import {useRouter} from "next/navigation";

function Page() {
  const router = useRouter()

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
      <Card>
        <CardContent>
          <div className={styles.header}>Core Configuration <ViewOrCopyConfigValues config={formValues} /></div>
          <form onSubmit={handleSubmit(save)} className={cn(styles.form, "grid gap-2")}>
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
