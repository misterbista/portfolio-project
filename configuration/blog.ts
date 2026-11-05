import * as z from "zod";

export const schema = z.object({
  content: z.string().min(1, "Content is required.").meta({
    title: "Content",
    description: "The actual HTML content of the blog post."
  })
}).meta({
  title: "Blog Post",
  description: "Actual blog post content."
});

export type Model = z.infer<typeof schema>;

export const defaultValues: Model = {
  content: ""
};
