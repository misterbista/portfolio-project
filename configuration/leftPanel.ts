import * as z from "zod";

export const schema = z.object({
  profilePhoto: z.url("Profile Photo must be a valid URL"),
  socials: z.array(
    z.object({
      name: z.string("Social Media Name is required"),
      url: z.url("Social URL must be a valid URL"),
    }),
  ),
  enabledPages: z.array(z.string()),
});

export type Model = z.infer<typeof schema>;

export const defaultValues: Model = {
  profilePhoto: "",
  socials: [],
  enabledPages: [],
};
