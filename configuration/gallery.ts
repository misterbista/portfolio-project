import * as z from "zod";

export const schema = z.object({
  photos: z.array(
    z.object({
      url: z.string(),
      caption: z.string(),
      categories: z.array(z.string()),
    }),
  ),
});

export type Model = z.infer<typeof schema>;
