import * as z from "zod";

export const schema = z.object({
  downloadLinks: z.array(
    z.object({
      title: z.string(),
      icon: z.string(),
      link: z.string(),
    }),
  ),
});

export type Model = z.infer<typeof schema>;
