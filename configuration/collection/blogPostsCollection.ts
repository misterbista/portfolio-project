import {readFileSync} from "node:fs";
import {basename, join} from "node:path";
import {BlogsConfig} from "@/configuration";
import type {Model as BlogPost} from "@/configuration/blog";
import {slugify} from "@/lib/routeSlugs";

const blogContentDirectory = join(process.cwd(), "public", "config", "blogs");
const usedSlugs = new Set<string>();

export const blogPostsCollection = BlogsConfig.posts
  .map((post) => {
    if (basename(post.id) !== post.id) {
      return null;
    }

    let content: BlogPost;
    try {
      const fileContent = readFileSync(join(blogContentDirectory, post.id), "utf8");
      content = JSON.parse(fileContent) as BlogPost;
    } catch {
      return null;
    }

    const slug = slugify(post.title, usedSlugs);
    usedSlugs.add(slug);

    return {...post, ...content, slug}
  })
  .filter(post => post !== null)
  .sort((left, right) => right.date.localeCompare(left.date));
