'use client';
import React from "react";
import "./globals.css";
import GoToTop from "@/components/custom/GoToTop";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {useConfig} from "@/app/setup/useConfig";
import {ConfigIdentifiers} from "@/app/setup/ConfigIdentifiers";
import Head from "next/head";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import Sidebar from "./Sidebar";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const queryClient = new QueryClient()

export default function MainLayout(
  {
    children
  }: Readonly<{ children: React.ReactNode; }>
) {
  return (
    <QueryClientProvider client={queryClient}>
      <html lang="en" data-google-analytics-opt-out="" className={cn("font-sans", geist.variable)}>
        <HeadLayout/>
        <body>
          <Sidebar/>
          {children}
          <GoToTop/>
        </body>
      </html>
    </QueryClientProvider>
  );
}

const HeadLayout = () => {
  const {
    data: coreConfig,
    isLoading: coreConfigLoading
  } = useConfig(ConfigIdentifiers.Core);

  if (coreConfigLoading || !coreConfig) {
    return null;
  }

  const title = coreConfig.fullName;
  const description = coreConfig.seoDescription;
  const author = coreConfig.fullName;
  const keywords = coreConfig.seoKeywords.join(", ");
  const currentUrl = window.location.href;
  const favicon = coreConfig.favicon;
  const previewImage = coreConfig.favicon;

  return (
    <Head>
      {/* Title of the website */}
      <title>{title}</title>

      {/* favicon */}
      <link rel="icon" href={favicon} />

      {/* Primary Meta Tags */}
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="author" content={author} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content="index, follow" />
      <meta name="theme-color" content="#ffffff" />

      {/* Canonical URL */}
      <link rel="canonical" href={currentUrl} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={previewImage} />
      <meta property="og:site_name" content={title} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:updated_time" content={new Date().toISOString()} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={currentUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={previewImage} />

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": title,
          "description": description,
          "image": previewImage,
          "url": currentUrl,
          "author": {
            "@type": "Person",
            "name": author
          }
        })}
      </script>
    </Head>
  );
};
