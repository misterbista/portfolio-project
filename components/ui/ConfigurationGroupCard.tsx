"use client"

import React, {ReactNode} from 'react';
import {useRouter} from "next/navigation";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {ArrowRight} from "lucide-react";
import {Button} from "@/components/ui/button";

function ConfigurationGroupCard(
  {icon, title, description, pagePath}: { icon: ReactNode; title: string; description: string, pagePath: string}
) {
  const router = useRouter()

  return(
    <Card style={{width: '250px', minWidth: '250px', maxWidth: '250px', padding: '10px'}}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between',  height: "100%"}}>
        {icon}
        <Button
          style={{marginTop: "5px", marginBottom: "5px"}}
          onClick={() => router.push(pagePath)}
        >
          Configure<ArrowRight/>
        </Button>
      </CardContent>
    </Card>
  );
}

export default ConfigurationGroupCard;
