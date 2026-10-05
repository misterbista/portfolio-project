import * as z from "zod";

export const schema = z.object({
  aboutMe: z.string(),
  heroPicture: z.string(),
  keypoints: z.array(
    z.object({
      title: z.string(),
      value: z.string(),
    }),
  ),
  additionalInformation: z.string().optional(),
});

export type Model = z.infer<typeof schema>;
