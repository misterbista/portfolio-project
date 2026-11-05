import {GalleryConfig} from "@/configuration";
import {slugify} from "@/lib/routeSlugs";

const usedCollectionSlugs = new Set<string>();

export const galleryCollection = GalleryConfig
  .categories
  .map((collection) => {
      const slug = slugify(collection.name, usedCollectionSlugs);
      usedCollectionSlugs.add(slug);

      const images = GalleryConfig
        .photos
        .filter((image) => image.categories.includes(collection.name))
        .map((image) => {
          return image;
        });

      return {...collection, slug, items: images};
  });
