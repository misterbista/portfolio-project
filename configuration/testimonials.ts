import * as z from "zod";

export const schema = z.object({
  pageDescription: z.string(),
  testimonials: z.array(
    z.object({
      by: z.string(),
      date: z.string(),
      title: z.string().optional(),
      image: z.string().optional(),
      text: z.string(),
      company: z.string().optional(),
      companyWebsite: z.string().optional(),
      department: z.string().optional(),
      departmentWebsite: z.string().optional(),
    }),
  ),
});

export type Model = z.infer<typeof schema>;
