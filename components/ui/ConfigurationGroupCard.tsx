"use client"

import React, {ReactNode} from "react";
import {useRouter} from "next/navigation";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {ArrowRight} from "lucide-react";
import {Button} from "@/components/ui/button";

function ConfigurationGroupCard(
  {icon, title, description, pagePath}: { icon: ReactNode; title: string; description: string, pagePath: string}
) {
  const router = useRouter();

  return (
    <Card className={"flex min-h-52 w-full max-w-sm flex-col border-border/70 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg"}>
      <CardHeader className={"gap-3"}>
        <div className={"flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary"}>
          {icon}
        </div>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className={"mt-auto"}>
        <Button className={"w-full justify-between"} variant={"outline"} onClick={() => router.push(pagePath)}>
          Configure
          <ArrowRight/>
        </Button>
      </CardContent>
    </Card>
  );
}

export default ConfigurationGroupCard;
