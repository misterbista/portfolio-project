"use client"

import React from 'react';
import styles from "./page.module.css";
import {Model as GalleryModel} from "@/configuration/gallery";
import {cn} from "@/lib/utils";
import {Folder, Images} from "lucide-react";
import SmartLink from "@/components/ui/SmartLink";

const uncategorizedGalleryCategory = {name: "Uncategorized", description: "Photos that are not part of a specific collection."};

export function getCollectionPhotos(collectionName: string, photos: GalleryModel["photos"]) {
  if(collectionName === uncategorizedGalleryCategory.name) {
    return photos.filter((photo) => !photo.categories || photo.categories.length === 0);
  }
  return photos.filter((photo) => photo.categories?.includes(collectionName));
}

export function getCollectionCover(collectionName: string, photos: GalleryModel["photos"]) {
  const images = getCollectionPhotos(collectionName, photos);
  if(images.length) {
    return images[0].url;
  }
  return null;
}

function PageContent(
  {galleryConfig}: {
    galleryConfig: GalleryModel
  }
) {
  if (!galleryConfig.photos.length) {
    return (
      <main className={cn(styles.page, "bg-secondary")}>
        <div className={styles.headingRow}>
          <h1 className={styles.pageHeader}>Gallery</h1>
        </div>
        <div className={styles.emptyState}>
          <Images className={styles.emptyIcon} aria-hidden="true" />
          No photos yet.
        </div>
      </main>
    );
  }

  return (
    <>
      <main className={cn(styles.page, "bg-secondary")}>
        <div className={styles.headingRow}>
          <h1 className={styles.pageHeader}>Gallery</h1>
        </div>
        <p className={styles.pageText}>Browse the photo collections.</p>
        <div className={styles.folderGrid}>
          {[...galleryConfig.categories, uncategorizedGalleryCategory]
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((collection, index) => (
              <SmartLink
                href={"/gallery/" + collection.name + "/"}
                key={index}
                className={styles.folderCard}
              >
              <span className={styles.folderCover}>
                { getCollectionCover(collection.name, galleryConfig.photos)
                  ? <img src={getCollectionCover(collection.name, galleryConfig.photos) || ""} alt="" className={styles.folderImage} />
                  : <Folder className={styles.folderPlaceholder} aria-hidden="true" />}
              </span>
                <span className={styles.folderDetails}>
                <span className={styles.folderName}><Folder size={18} />{collection.name}</span>
                <span className={styles.folderCount}>
                  {getCollectionPhotos(collection.name, galleryConfig.photos).length} {getCollectionPhotos(collection.name, galleryConfig.photos).length === 1 ? "photo" : "photos"}
                </span>
              </span>
              </SmartLink>
            ))}
        </div>
      </main>
    </>
  );
}

export default PageContent;
