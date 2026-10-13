import {z} from "zod";

export const schema = z.object({
  favicon: z
    .url("Favicon must be a valid URL")
    .meta({
      title: "Favicon",
      description:
        "An icon that will be used as a favicon for the website. " +
        "It is recommended to use a square image of size 512x512px. " +
        "This is different from the profile picture, which is used in the left panel, " +
        "the cover picture, which is used as a background for the landing page, " +
        "and the hero picture, which is used in the about page.",
    }
  ),
  websiteName: z
    .string()
    .meta({
      title: "Website Name",
      description: "The name of the website.",
    }
  ),
  fullName: z
    .string("Full Name is required")
    .meta({
      title: "Full Name",
      description:
        "The full name of the website owner. This will be used anywhere " +
        "the full name is required, such as in the left panel, the about page, " +
        "and the SEO metadata.",
    }
  ),
  seoDescription: z
    .string()
    .optional()
    .meta({
      title: "SEO Description",
      description:
        "A short description of the website that will be used in the SEO metadata. " +
        "This is different from the about page, which is a longer description of who you are.",
    }
  ),
  seoKeywords: z
    .array(z.string("Please enter a valid keyword").meta({
      title: "SEO Keyword",
      description: "A search term associated with the website.",
    }))
    .default([])
    .optional()
    .meta({
      title: "SEO Keywords",
      description:
        "A list of keywords that will be used in the SEO metadata. " +
        "These are different from the about page, which is a longer description of who you are.",
    }),
}).meta({
  title: "Core Configuration",
  description: "Site-wide identity and search metadata used throughout the portfolio.",
});

export type Model = z.infer<typeof schema>;

export const defaultValues: Model = {
  favicon: "",
  websiteName: "",
  fullName: "",
  seoDescription: "",
  seoKeywords: [],
};
