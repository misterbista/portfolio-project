import * as z from "zod";

export const schema = z.object({
  heroPicture: z.string(),
  bio: z.string(),
});

export type Model = z.infer<typeof schema>;

