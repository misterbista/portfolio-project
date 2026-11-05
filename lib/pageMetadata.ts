import type {Metadata} from "next";
import {CoreConfig} from "@/configuration";

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  image?: string;
  keywords?: string[];
  type?: "website" | "article";
};

export function getCanonicalUrl(path: string) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (!siteUrl) return undefined;

  const base = new URL(siteUrl.endsWith("/") ? siteUrl : siteUrl + "/");
  return new URL(path.replace(/^\/+/, ""), base).toString();
}

export function createPageMetadata({
  title,
  description,
  path,
  image,
  keywords,
  type = "website",
}: PageMetadataOptions): Metadata {
  const canonical = getCanonicalUrl(path);
  const imageUrl = image ? image : undefined;
  const fullTitle = title === CoreConfig.websiteName
    ? title
    : title + " | " + CoreConfig.websiteName;

  return {
    title: title === CoreConfig.websiteName ? {absolute: title} : title,
    description,
    keywords,
    authors: [{name: CoreConfig.fullName}],
    alternates: canonical ? {canonical} : undefined,
    openGraph: {
      type,
      url: canonical,
      title: fullTitle,
      description,
      siteName: CoreConfig.websiteName,
      images: imageUrl ? [imageUrl] : undefined,
    },
    twitter: {
      card: imageUrl ? "summary_large_image" : "summary",
      title: fullTitle,
      description,
      images: imageUrl ? [imageUrl] : undefined,
    },
    robots: {index: true, follow: true},
  };
}

export function plainText(value: string) {
  return value
    .replaceAll(/<[^>]*>/g, " ")
    .replaceAll(/&nbsp;/gi, " ")
    .replaceAll(/\s+/g, " ")
    .trim();
}
