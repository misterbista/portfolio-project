import React from 'react';
import ConfigFormTools from "@/components/ui/ConfigFormTools";
import {Card, CardContent} from "@/components/ui/card";

function ConfigurationFormWrapper<T>(
  {title, config, children, className}: {
    title: string;
    config: T;
    children: React.ReactNode;
    className?: string;
  }
) {
  return (
    <div className={className}>
      <Card>
        <CardContent>
          <div className={"flex justify-between items-center mb-2"}>
            <span className={"text-xl font-bold"}>{title}</span>
            <ConfigFormTools config={config}/>
          </div>
          {children}
        </CardContent>
      </Card>
    </div>
  );
}

export default ConfigurationFormWrapper;
