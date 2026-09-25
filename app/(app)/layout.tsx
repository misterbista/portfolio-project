"use client"

import React from 'react';
import { SidebarProvider } from "@/components/ui/sidebar"
import LeftPanel from "@/app/(app)/LeftPanel";
import GoToTopButton from "@/components/ui/GoToTopButton";


function Layout({ children }: LayoutProps<"/">) {
  return (
    <SidebarProvider defaultOpen={false}>
      <LeftPanel/>
      {children}
      <GoToTopButton/>
    </SidebarProvider>
  );
}

export default Layout;

