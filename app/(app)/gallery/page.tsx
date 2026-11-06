import styles from "./page.module.css";
import StructuredData from "@/components/StructuredData";
import {cn} from "@/lib/utils";
import {CoreConfig, GalleryConfig} from "@/configuration";
import {createPageMetadata, getCanonicalUrl} from "@/lib/pageMetadata";
import {Folder, Images} from "lucide-react";
import Link from "next/link";

const description = CoreConfig.seoDescription || "Browse the photo collections.";
const uncategorizedGalleryCategory = {name: "Uncategorized", description: "Photos that are not part of a specific collection."};

export function getCollectionImages(collectionName: string) {
  if(collectionName === uncategorizedGalleryCategory.name) {
    return GalleryConfig.photos.filter((photo) => !photo.categories || photo.categories.length === 0);
  }
  return GalleryConfig.photos.filter((photo) => photo.categories?.includes(collectionName));
}

export function getCollectionCover(collectionName: string){
  const images = getCollectionImages(collectionName);
  if(images.length) {
    return images[0].url;
  }
  return null;
}

export function getCollection(collectionName: string){
  const collection = GalleryConfig.categories.find((collection) => collection.name === collectionName);
  if(collection) {
    return collection;
  }
  return null;
}

export const metadata = createPageMetadata({
  title: "Gallery",
  description,
  path: "/gallery/",
  image: CoreConfig.favicon,
  keywords: CoreConfig.seoKeywords,
});

function GalleryFolders() {
  if (!GalleryConfig.photos.length) {
    return (
      <div className={styles.emptyState}>
        <Images className={styles.emptyIcon} aria-hidden="true" />
        No photos yet.
      </div>
    );
  }

  return (
    <>
      <p className={styles.pageText}>Browse the photo collections.</p>
      <div className={styles.folderGrid}>
        {[...GalleryConfig.categories, uncategorizedGalleryCategory]
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((collection, index) => (
          <Link
            href={"/gallery/" + collection.name + "/"}
            key={index}
            className={styles.folderCard}
          >
            <span className={styles.folderCover}>
              { getCollectionCover(collection.name)
                ? <img src={getCollectionCover(collection.name) || ""} alt="" className={styles.folderImage} />
                : <Folder className={styles.folderPlaceholder} aria-hidden="true" />}
            </span>
            <span className={styles.folderDetails}>
              <span className={styles.folderName}><Folder size={18} />{collection.name}</span>
              <span className={styles.folderCount}>
                {getCollectionImages(collection.name).length} {getCollectionImages(collection.name).length === 1 ? "photo" : "photos"}
              </span>
            </span>
          </Link>
        ))}
      </div>
    </>
  );
}

export default function Page() {
  return (
    <>
      <main className={cn(styles.page, "bg-secondary")}>
        <div className={styles.headingRow}>
          <h1 className={styles.pageHeader}>Gallery</h1>
        </div>
        <GalleryFolders />
      </main>
      <StructuredData data={{
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "Gallery",
        description,
        ...(getCanonicalUrl("/gallery/") ? {url: getCanonicalUrl("/gallery/")} : {}),
      }} />
    </>
  );
}
