"use client"

import React from 'react';
import ConfigFormTools from "@/components/ui/ConfigFormTools";
import {Card, CardContent} from "@/components/ui/card";
import {FieldValues, FormProvider, UseFormReturn} from "react-hook-form";

function ConfigurationFormWrapper<T extends FieldValues>(
  {title, config, children, className, form}: {
    title: string;
    config: T;
    children: React.ReactNode;
    className?: string;
    form: UseFormReturn<T, any, T>
  }
) {
  return (
    <div className={className}>
      <FormProvider {...form}>
      <Card>
        <CardContent>
          <div className={"flex justify-between items-center mb-2"}>
            <span className={"text-xl font-bold"}>{title}</span>
            <ConfigFormTools config={config}/>
          </div>
          {children}
        </CardContent>
      </Card>
      </FormProvider>
    </div>
  );
}

export default ConfigurationFormWrapper;
