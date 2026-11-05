"use client"

import React, {useState} from "react";
import styles from "./page.module.css";
import {ArrowLeft, Folder, Images} from "lucide-react";
import {Identifier, useConfig} from "@/hooks/useConfig";
import {cn} from "@/lib/utils";
import FullScreenMessage from "@/components/ui/FullScreenMessage";
import {Spinner} from "@/components/ui/spinner";
import HtmlRenderer from "@/components/ui/HtmlRenderer";
import ImageLightbox from "@/components/ui/ImageLightbox";
import {Button} from "@/components/ui/button";

type GalleryCategory = {
  key: string;
  name: string;
  description?: string;
  photoCount: number;
  coverUrl?: string;
};

function categoryKey(name: string) {
  return name.trim().toLocaleLowerCase();
}

function Page() {
  const [selectedCategoryKey, setSelectedCategoryKey] = useState<string | null>(null);
  const {config, isLoadingConfig} = useConfig(Identifier.Gallery);

  if (isLoadingConfig) {
    return <FullScreenMessage><Spinner className="size-10" /></FullScreenMessage>;
  }

  if (!config) {
    return <FullScreenMessage>Error loading gallery configuration.</FullScreenMessage>;
  }

  const photos = (config.photos || []).filter((photo) => !!photo.url);
  const categoriesByKey = new Map<string, GalleryCategory>();

  for (const category of config.categories || []) {
    const key = categoryKey(category.name);
    if (!key) continue;
    categoriesByKey.set(key, {
      key,
      name: category.name,
      description: category.description,
      photoCount: 0,
    });
  }

  for (const photo of photos) {
    for (const categoryName of photo.categories || []) {
      const key = categoryKey(categoryName);
      if (!key || categoriesByKey.has(key)) continue;
      categoriesByKey.set(key, {key, name: categoryName.trim(), photoCount: 0});
    }
  }

  const categories = Array.from(categoriesByKey.values());
  for (const category of categories) {
    const matchingPhotos = photos.filter((photo) =>
      (photo.categories || []).some((name) => categoryKey(name) === category.key)
    );
    category.photoCount = matchingPhotos.length;
    category.coverUrl = matchingPhotos[0]?.url;
  }

  const uncategorizedPhotos = photos.filter((photo) => !(photo.categories || []).some((name) => !!name.trim()));
  if (uncategorizedPhotos.length > 0) {
    categories.push({
      key: "__uncategorized__",
      name: "Uncategorized",
      photoCount: uncategorizedPhotos.length,
      coverUrl: uncategorizedPhotos[0]?.url,
    });
  }

  const activeCategory = categories.find((category) => category.key === selectedCategoryKey);
  const visiblePhotos = activeCategory?.key === "__uncategorized__"
    ? uncategorizedPhotos
    : activeCategory
      ? photos.filter((photo) => (photo.categories || []).some((name) => categoryKey(name) === activeCategory.key))
      : [];

  return (
    <main className={cn(styles.page, "bg-secondary")}>
      <div className={styles.headingRow}>
        {activeCategory && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="cursor-pointer"
            onClick={() => setSelectedCategoryKey(null)}
          >
            <ArrowLeft /> Folders
          </Button>
        )}
        <h1 className={styles.pageHeader}>{activeCategory ? activeCategory.name : "Gallery"}</h1>
      </div>

      {activeCategory ? (
        <>
          {activeCategory.description?.trim() && (
            <HtmlRenderer className={styles.pageText}>{activeCategory.description}</HtmlRenderer>
          )}
          {visiblePhotos.length > 0 ? (
            <div className={styles.photoGrid}>
              {visiblePhotos.map((photo, index) => {
                const imageName = photo.title || photo.caption || `Gallery photo ${index + 1}`;
                return (
                  <article className={styles.photoCard} key={photo.id || `${photo.url}-${index}`}>
                    <ImageLightbox
                      src={photo.url}
                      name={imageName}
                      trigger={<img className={styles.photoImage} src={photo.url} alt={imageName} />}
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
        </>
      ) : categories.length > 0 ? (
        <>
          <p className={styles.pageText}>Browse the photo collections.</p>
          <div className={styles.folderGrid}>
            {categories.map((category) => (
              <button
                type="button"
                key={category.key}
                className={styles.folderCard}
                onClick={() => setSelectedCategoryKey(category.key)}
              >
                <span className={styles.folderCover}>
                  {category.coverUrl
                    ? <img src={category.coverUrl} alt="" className={styles.folderImage} />
                    : <Folder className={styles.folderPlaceholder} aria-hidden="true" />}
                </span>
                <span className={styles.folderDetails}>
                  <span className={styles.folderName}><Folder size={18} />{category.name}</span>
                  <span className={styles.folderCount}>{category.photoCount} {category.photoCount === 1 ? "photo" : "photos"}</span>
                </span>
              </button>
            ))}
          </div>
        </>
      ) : (
        <div className={styles.emptyState}>
          <Images className={styles.emptyIcon} aria-hidden="true" />
          No photo collections yet.
        </div>
      )}
    </main>
  );
}

export default Page;
