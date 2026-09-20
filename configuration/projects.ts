import * as z from "zod";

export const schema = z.object({
  pageDescription: z.string(),
  projects: z.array(
    z.object({
      title: z.string(),
      links: z.array(
        z.object({
          name: z.string(),
          url: z.string(),
        }),
      ),
      description: z.string(),
      previewImage: z.string(),
      images: z.array(z.string()),
      keypoints: z.array(
        z.object({
          title: z.string(),
          value: z.string(),
        }),
      ),
      seoKeywords: z.array(z.string()),
      milestoneId: z.string().optional(),
    }),
  ),
});

export type Model = z.infer<typeof schema>;
