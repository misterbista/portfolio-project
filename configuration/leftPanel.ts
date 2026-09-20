import * as z from "zod";

export const schema = z.object({
  profilePhoto: z.string(),
  socials: z.array(
    z.object({
      name: z.string(),
      url: z.string(),
    }),
  ),
});

export type Model = z.infer<typeof schema>;
