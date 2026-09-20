import * as z from "zod";

export const schema = z.object({
  summary: z.string(),
  milestones: z.array(
    z.object({
      uniqueId: z.string(),
      type: z.enum(["Academic", "Professional", "Personal"]),
      title: z.string(),
      description: z.string(),
      start: z.coerce.date().optional(),
      end: z.coerce.date().optional(),
      organisation: z.string().optional(),
      organizationWebsite: z.string().optional(),
      department: z.string().optional(),
      departmentWebsite: z.string().optional(),
      points: z.array(z.string()),
      partingNote: z.string().optional(),
      achievements: z
        .array(
          z.object({
            title: z.string(),
            description: z.string(),
            on: z.coerce.date().optional(),
          }),
        )
        .optional(),
    }),
  ),
});

export type Model = z.infer<typeof schema>;
