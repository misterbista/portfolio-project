"use client"

import React from 'react';
import "./globals.css";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {Identifier, useConfig} from "@/hooks/useConfig";
import { TooltipProvider } from "@/components/ui/tooltip"
import {Toaster} from "sonner";
import {GitHubPatProvider} from "@/hooks/useGitHubPatAuth";


const queryClient = new QueryClient()

function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <QueryClientProvider client={queryClient}>
      <GitHubPatProvider>
        <html
          lang="en"
          data-google-analytics-opt-out=""
        >
          <LayoutHead/>
          <body>
            <TooltipProvider>
              {children}
            </TooltipProvider>
            <Toaster/>
          </body>
        </html>
        <ReactQueryDevtools initialIsOpen={false} />
      </GitHubPatProvider>
    </QueryClientProvider>
  );
}

export default RootLayout;

// replace this with metadata export
function LayoutHead(){
  const {
    config: coreConfig,
    isLoadingConfig: isLoadingCoreConfig
  } = useConfig(Identifier.Core);

  if (isLoadingCoreConfig || !coreConfig) {
    return <></>;
  }

  const currentUrl = window.location.href;

  return (
    <head>
      {/* Title of the website */}
      <title>{coreConfig.websiteName}</title>

      {/* favicon */}
      <link rel="icon" href={coreConfig.favicon} />

      {/* Primary Meta Tags */}
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="title" content={coreConfig.websiteName} />
      <meta name="description" content={coreConfig.seoDescription} />
      <meta name="author" content={coreConfig.fullName} />
      <meta name="keywords" content={(coreConfig.seoKeywords || []).join(", ")} />
      <meta name="robots" content="index, follow" />
      <meta name="theme-color" content="#ffffff" />

      {/* Canonical URL */}
      <link rel="canonical" href={currentUrl} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={coreConfig.websiteName} />
      <meta property="og:description" content={coreConfig.seoDescription} />
      <meta property="og:image" content={coreConfig.favicon} />
      <meta property="og:site_name" content={coreConfig.websiteName} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:updated_time" content={new Date().toISOString()} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={currentUrl} />
      <meta property="twitter:title" content={coreConfig.websiteName} />
      <meta property="twitter:description" content={coreConfig.seoDescription} />
      <meta property="twitter:image" content={coreConfig.favicon} />

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": coreConfig.websiteName,
          "description": coreConfig.seoDescription,
          "image": coreConfig.favicon,
          "url": currentUrl,
          "author": {
            "@type": "Person",
            "name": coreConfig.fullName
          }
        })}
      </script>
    </head>
  );
}
