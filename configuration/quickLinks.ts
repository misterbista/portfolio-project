import * as z from "zod";

export const schema = z.object({
  links: z.array(
    z.object({
      title: z.string().meta({
        title: "Title",
        description: "The label shown for this download.",
      }),
      icon: z.string().meta({
        title: "Icon",
        description: "The icon to show alongside the download link.",
      }),
      link: z.string().meta({
        title: "Link",
        description: "The URL or path of the downloadable file.",
      }),
      download: z.boolean().meta({
        title: "Download",
        description: "Whither or not this link is a download link. If not, it will be treated as a link to open in a new tab"
      }),
    }).meta({
      title: "Download Link",
      description: "A file or resource that visitors can download.",
    }),
  ).meta({
    title: "Download Links",
    description: "A list of downloadable files and resources.",
  }),
}).meta({
  title: "Downloads Configuration",
  description: "Configuration for the downloads available on the portfolio.",
});

export type Model = z.infer<typeof schema>;

export const defaultValues: Model = {
  links: [],
};
