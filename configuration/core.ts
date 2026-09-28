import {z} from "zod";

export const schema = z.object({
  favicon: z.url("Favicon must be a valid URL"),
  websiteName: z.string("Website Name is required"),
  fullName: z.string("Full Name is required"),
  seoDescription: z.string().optional(),
  seoKeywords: z.array(z.string("Please enter a valid keyword")).default([]).optional(),
});

export type Model = z.infer<typeof schema>;

export const defaultValues: Model = {
  favicon: "",
  websiteName: "",
  fullName: "",
  seoDescription: "",
  seoKeywords: [],
};
