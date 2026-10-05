import * as z from "zod";

export const schema = z.object({
  coverPicture: z
    .url("The cover picture must be a valid URL")
    .meta({
      title: "Cover picture",
      description: "The background image to use in the landing page."
    }
  ),
  bio: z
    .string("Bio is required")
    .meta({
      title: "Bio",
      description: "A brief description about yourself."
    })
});

export type Model = z.infer<typeof schema>;

