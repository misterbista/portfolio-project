import * as z from "zod";

export const schema = z.object({
  pageDescription: z.string(),
  skills: z.array(
    z.object({
      title: z.string(),
      image: z.string(),
      description: z.string(),
      associatedMilestoneIds: z.array(z.string()),
      associatedProjectIds: z.array(z.string()),
    }),
  ),
});

export type Model = z.infer<typeof schema>;
