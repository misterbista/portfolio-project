'use client';
import React from "react";
import {AppendToType, PrimeReactProvider} from "primereact/api";
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-amber/theme.css';
import "./globals.css";
import Sidebar from "./Sidebar";
import GoToTop from "./GoToTop";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {useConfig} from "./setup/useConfig";
import {ConfigIdentifiers} from "./setup/ConfigIdentifiers";

const queryClient = new QueryClient()

export default function MainLayout(
  {
    children
  }: Readonly<{ children: React.ReactNode; }>
) {
  const primeReactConfiguration = {
    appendTo: 'self' as AppendToType,
    ripple: true,
  };

  return (
    <QueryClientProvider client={queryClient}>
      <PrimeReactProvider value={primeReactConfiguration}>
        <html lang="en" data-google-analytics-opt-out="">
          <Head/>
          <body>
            <Sidebar/>
            {children}
            <GoToTop/>
          </body>
        </html>
      </PrimeReactProvider>
    </QueryClientProvider>
  );
}

const Head = () => {
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
    <head>
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
    </head>
  );
};
