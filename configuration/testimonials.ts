import * as z from "zod";

export const schema = z.object({
  summary: z.string().meta({
    title: "Page Description",
    description: "Introductory text displayed at the top of the testimonials page.",
  }),
  testimonials: z.array(
    z.object({
      by: z.string().meta({
        title: "Author",
        description: "The person who gave the testimonial.",
      }),
      date: z.string().meta({
        title: "Date",
        description: "The date the testimonial was given or published.",
      }),
      title: z.string().optional().meta({
        title: "Title",
        description: "An optional heading for the testimonial.",
      }),
      image: z.string().optional().meta({
        title: "Image",
        description: "An optional image associated with the testimonial or its author.",
      }),
      text: z.string().meta({
        title: "Testimonial",
        description: "The testimonial text.",
      }),
      company: z.string().optional().meta({
        title: "Company",
        description: "The company associated with the author, if applicable.",
      }),
      companyWebsite: z.string().optional().meta({
        title: "Company Website",
        description: "The website of the associated company, if available.",
      }),
      department: z.string().optional().meta({
        title: "Department",
        description: "The department associated with the author, if applicable.",
      }),
      departmentWebsite: z.string().optional().meta({
        title: "Department Website",
        description: "The website of the associated department, if available.",
      }),
    }).meta({
      title: "Testimonial",
      description: "A testimonial and optional details about its author.",
    }),
  ).meta({
    title: "Testimonials",
    description: "The testimonials to display on the portfolio.",
  }),
}).meta({
  title: "Testimonials Configuration",
  description: "Configuration for the testimonials page and its testimonials.",
});

export type Model = z.infer<typeof schema>;
