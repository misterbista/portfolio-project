"use client"

import React, {useEffect} from 'react';
import styles from "./page.module.css";
import ConfigurationFormWrapper from "@/components/ui/ConfigurationFormWrapper";
import {Identifier, useConfig} from "@/hooks/useConfig";
import {useForm} from "react-hook-form";
import {Model, schema, defaultValues} from "@/configuration/core";  // Change this
import {zodResolver} from "@hookform/resolvers/zod";
import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import FullScreenMessage from "@/components/ui/FullScreenMessage";
import {Spinner} from "@/components/ui/spinner";

function Page() {
  const router = useRouter()

  const {
    config,
    isLoadingConfig,
    saveConfig,
    isSavingConfig
  } = useConfig(Identifier.Core);  // Change this

  const form = useForm<Model>({
    resolver: zodResolver(schema),
    defaultValues
  });
  const {
    reset,
    control,
    handleSubmit,
    watch
  } = form;
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
    <ConfigurationFormWrapper className={styles.page} title={"Blank Configuration"} config={formValues} form={form}>
      <form onSubmit={handleSubmit(save)} className={cn(styles.form, "grid gap-2 max-w-3xl")}>
        Nothing here.

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
            disabled={isSavingConfig}
          >
            {isSavingConfig ? <Spinner /> : "Save"}
          </Button>
        </div>
      </form>
    </ConfigurationFormWrapper>
  );
}

export default Page;
