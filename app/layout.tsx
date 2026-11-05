import type {Metadata, Viewport} from "next";
import React from "react";
import "./globals.css";
import "@/components/block-editor/style.css";
import Providers from "@/app/Providers";
import StructuredData from "@/components/StructuredData";
import {CoreConfig} from "@/configuration";
import {getCanonicalUrl} from "@/lib/pageMetadata";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
const canonical = getCanonicalUrl("/");

export const metadata: Metadata = {
  metadataBase: siteUrl
    ? new URL(siteUrl.endsWith("/") ? siteUrl : siteUrl + "/")
    : undefined,
  title: {
    default: CoreConfig.websiteName,
    template: "%s | " + CoreConfig.websiteName,
  },
  description: CoreConfig.seoDescription,
  keywords: CoreConfig.seoKeywords,
  authors: [{
    name: CoreConfig.fullName
  }],
  alternates: canonical ? {canonical} : undefined,
  icons: {
    icon: CoreConfig.favicon
  },
  robots: {
    index: true,
    follow: true
  },
  openGraph: {
    type: "website",
    url: canonical,
    title: CoreConfig.websiteName,
    description: CoreConfig.seoDescription,
    siteName: CoreConfig.websiteName,
    locale: "en_US",
    images: [
      CoreConfig.favicon
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: CoreConfig.websiteName,
    description: CoreConfig.seoDescription,
    images: [
      CoreConfig.favicon
    ],
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

function RootLayout({children}: LayoutProps<"/">) {
  return (
    <html lang="en" data-google-analytics-opt-out="">
      <body>
        <Providers>
          {children}
          <StructuredData data={{
            "@context": "https://schema.org",
            "@type": "Person",
            name: CoreConfig.fullName,
            image: CoreConfig.favicon,
            ...(canonical ? {url: canonical} : {}),
          }} />
        </Providers>
      </body>
    </html>
  );
}

export default RootLayout;
