"use client"

import React from "react";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {TooltipProvider} from "@/components/ui/tooltip";
import {Toaster} from "sonner";
import {GitHubPatProvider} from "@/hooks/useGitHubPatAuth";
import {ConfirmDialog} from "@/components/ui/Confirm";

const queryClient = new QueryClient();

export default function Providers({children}: {children: React.ReactNode}) {
  return (
    <QueryClientProvider client={queryClient}>
      <GitHubPatProvider>
        <TooltipProvider>
          {children}
        </TooltipProvider>
        <Toaster />
        <ConfirmDialog />
        <ReactQueryDevtools initialIsOpen={false} />
      </GitHubPatProvider>
    </QueryClientProvider>
  );
}
