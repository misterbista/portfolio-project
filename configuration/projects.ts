import * as z from "zod";

export const schema = z.object({
  summary: z.string().meta({
    title: "Page Description",
    description: "Introductory text displayed at the top of the projects page.",
  }),
  projects: z.array(
    z.object({
      title: z.string().meta({
        title: "Title",
        description: "The name of the project.",
      }),
      links: z.array(
        z.object({
          name: z.string().meta({
            title: "Name",
            description: "The label for this project link, such as GitHub or a live demo.",
          }),
          url: z.string().meta({
            title: "URL",
            description: "The address this project link opens.",
          }),
        }).meta({
          title: "Project Link",
          description: "An external link associated with the project.",
        }),
      ).meta({
        title: "Links",
        description: "External links associated with the project.",
      }),
      description: z.string().meta({
        title: "Description",
        description: "A description of the project and what it does.",
      }),
      previewImage: z.string().meta({
        title: "Preview Image",
        description: "The image used as the project's primary preview.",
      }),
      images: z.array(z.string().meta({
        title: "Image URL",
        description: "The URL of an additional project image.",
      })).meta({
        title: "Images",
        description: "Additional images to show with the project.",
      }),
      keypoints: z.array(
        z.object({
          title: z.string().meta({
            title: "Title",
            description: "The label for this project detail.",
          }),
          value: z.string().meta({
            title: "Value",
            description: "The value or short detail for this project.",
          }),
        }).meta({
          title: "Key Point",
          description: "A short detail that highlights an aspect of the project.",
        }),
      ).meta({
        title: "Key Points",
        description: "A list of short details about the project.",
      }),
      seoKeywords: z.array(z.string().meta({
        title: "Keyword",
        description: "A search keyword associated with the project.",
      })).meta({
        title: "SEO Keywords",
        description: "Keywords used to describe the project in search metadata.",
      }),
      milestoneId: z.string().optional().meta({
        title: "Milestone ID",
        description: "The ID of a journey milestone associated with this project.",
      }),
    }).meta({
      title: "Project",
      description: "A project entry displayed on the projects page.",
    }),
  ).meta({
    title: "Projects",
    description: "The project entries displayed on the projects page.",
  }),
}).meta({
  title: "Projects Configuration",
  description: "Configuration for the projects page and its project entries.",
});

export type Model = z.infer<typeof schema>;
