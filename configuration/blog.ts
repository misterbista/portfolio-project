import * as z from "zod";

export const schema = z.array(
  z.object({
    title: z.string().meta({
      title: "Title",
      description: "The title of the blog post.",
    }),
    date: z.string().meta({
      title: "Date",
      description: "The date associated with the blog post.",
    }),
    contentPath: z.string().meta({
      title: "Content Path",
      description: "The path to the post's Markdown file in the blogs folder.",
    }),
    categories: z.array(z.string().meta({
      title: "Category",
      description: "A category used to group the blog post.",
    })).meta({
      title: "Categories",
      description: "Categories used to group the blog post.",
    }),
    tags: z.array(z.string().meta({
      title: "Tag",
      description: "A tag associated with the blog post.",
    })).meta({
      title: "Tags",
      description: "Tags associated with the blog post.",
    }),
  }).meta({
    title: "Blog Post",
    description: "Metadata that identifies a blog post and its Markdown content.",
  }),
).meta({
  title: "Blog Posts",
  description: "The list of blog posts available on the Blog page.",
});

export type Model = z.infer<typeof schema>;
