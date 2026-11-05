"use client"

import React from 'react';
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import SmartLink from "@/components/ui/SmartLink";
import DynamicLucideReactIcon, {LucideReactIconName} from "@/components/ui/DynamicLucideReactIcon";

function SidebarCustomMenuItem(
  {
    label,
    link,
    icon,
    currentPath,
    show = true,
  }: {
    label: string;
    link: string;
    icon: string;
    currentPath?: string;
    show?: boolean;
  }
) {

  if(!show){
    return null;
  }

  // is active if current path is equal to the link
  // or if the current path starts with the link and the link is not just "/"
  // or if the current path ends with the link and the link is not just "/"
  const isActive = currentPath === link
    || (link !== '/' && currentPath?.startsWith(link))
    || (link !== '/' && currentPath?.endsWith(link));

  return (
    <Button
      type="button"
      variant="ghost"
      className={cn(
        "w-full justify-start h-12",
        isActive && "bg-gray-200",
        "cursor-pointer hover:-translate-y-px"
      )}
    >
      <SmartLink href={link} className="w-full h-full flex items-center">
        <DynamicLucideReactIcon name={icon as LucideReactIconName} style={{marginRight: '0.5rem'}}/>
        {label}
      </SmartLink>
    </Button>
  );
}

export default SidebarCustomMenuItem;
