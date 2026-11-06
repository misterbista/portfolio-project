import styles from "../page.module.css";
import type {Metadata} from "next";
import {notFound} from "next/navigation";
import StructuredData from "@/components/StructuredData";
import {CoreConfig, GalleryConfig} from "@/configuration";
import {createPageMetadata, getCanonicalUrl} from "@/lib/pageMetadata";
import {stripHtmlTags} from "@/lib/html";
import {getCollection, getCollectionCover, getCollectionImages} from "@/app/(app)/gallery/page";
import { cn } from "@/lib/utils";
import Link from "next/link";
import {buttonVariants} from "@/components/ui/button";
import {ArrowLeft} from "lucide-react";
import HtmlRenderer from "@/components/ui/HtmlRenderer";
import ImageLightbox from "@/components/ui/ImageLightbox";

export const dynamicParams = false;

export function generateStaticParams() {
  return GalleryConfig.categories.map((collection) => ({collectionName: collection.name}));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{collectionName: string}>;
}): Promise<Metadata> {
  const {collectionName} = await params;
  const collection = getCollection(collectionName);
  const collectionImages = getCollectionImages(collectionName);
  const collectionCover = getCollectionCover(collectionName);
  if (!collection) return {};

  return createPageMetadata({
    title: collection.name + " | Gallery",
    description: stripHtmlTags(collection.description || collectionImages.length + " photos in the " + collection.name + " collection.").slice(0, 300),
    path: "/gallery/" + collectionName + "/",
    image: collectionCover || CoreConfig.favicon,
    keywords: CoreConfig.seoKeywords,
  });
}

function GalleryCollectionView({collectionName}: {collectionName: string}) {
  const collection = getCollection(collectionName);
  const collectionImages = getCollectionImages(collectionName);
  if (!collection) notFound();

  return (
    <main className={cn(styles.page, "bg-secondary")}>
      <div className={styles.headingRow}>
        <Link href="/gallery/" className={cn(buttonVariants({variant: "outline", size: "sm"}))}>
          <ArrowLeft /> Folders
        </Link>
        <h1 className={styles.pageHeader}>{collection.name}</h1>
      </div>

      {collection.description?.trim() && (
        <HtmlRenderer className={styles.pageText}>{collection.description}</HtmlRenderer>
      )}

      {collectionImages.length ? (
        <div className={styles.photoGrid}>
          {collectionImages.map((photo, index) => {
            const imageName = photo.title || "Untitled Photo";
            const imageUrl = photo.url;
            return (
              <article className={styles.photoCard} key={photo.id || photo.url + "-" + index}>
                <ImageLightbox
                  src={imageUrl}
                  name={imageName}
                  trigger={<img className={styles.photoImage} src={imageUrl} alt={imageName} />}
                />
                {(photo.title || photo.caption) && (
                  <div className={styles.photoText}>
                    {photo.title && <h2 className={styles.photoTitle}>{photo.title}</h2>}
                    {photo.caption && <p className={styles.photoCaption}>{photo.caption}</p>}
                  </div>
                )}
              </article>
            );
          })}
        </div>
      ) : (
        <div className={styles.emptyState}>This folder does not have any photos yet.</div>
      )}
    </main>
  );
}

export default async function Page({
  params,
}: {
  params: Promise<{collectionName: string}>;
}) {
  const {collectionName} = await params;
  const collection = getCollection(collectionName);
  const collectionImages = getCollectionImages(collectionName);
  const collectionCover = getCollectionCover(collectionName);
  if (!collection) notFound();
  const canonical = getCanonicalUrl("/gallery/" + collectionName + "/");
  const description = stripHtmlTags(collection.description || collectionImages.length + " photos in the " + collection.name + " collection.");

  return (
    <>
      <GalleryCollectionView collectionName={collectionName} />
      <StructuredData data={{
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: collection.name,
        description,
        ...(collectionCover ? {image: collectionCover} : {}),
        ...(canonical ? {url: canonical} : {}),
        author: {"@type": "Person", name: CoreConfig.fullName},
      }} />
    </>
  );
}
