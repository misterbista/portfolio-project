import {z} from "zod";

export const schema = z.object({
  favicon: z.string(),
  websiteName: z.string(),
  fullName: z.string(),
  seoDescription: z.string().optional(),
  seoKeywords: z.array(z.string()),
  enabledPages: z.array(z.string()),
});

export type Model = z.infer<typeof schema>;
