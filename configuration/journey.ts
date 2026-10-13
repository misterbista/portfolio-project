import * as z from "zod";

export const schema = z.object({
  summary: z
    .string()
    .meta({
      title: "Summary",
      description: "A brief summary of your journey"
    }),
  milestones: z.array(
    z.object({
      uniqueId: z.string().meta({
        title: "Unique ID",
        description: "A unique identifier for this milestone"
      }),
      type: z.enum(["Academic", "Professional", "Personal"]).meta({
        title: "Type",
        description: "The type of milestone"
      }),
      title: z.string().meta({
        title: "Title",
        description: "The title of the milestone"
      }),
      description: z.string().meta({
        title: "Description",
        description: "A brief description of the milestone"
      }),
      start: z.coerce.date().optional().meta({
        title: "Start Date",
        description: "The start date of the milestone"
      }),
      end: z.coerce.date().optional().meta({
        title: "End Date",
        description: "The end date of the milestone"
      }),
      organisation: z.string().optional().meta({
        title: "Organization",
        description: "The organization associated with the milestone"
      }),
      organizationWebsite: z.string().optional().meta({
        title: "Organization Website",
        description: "The website of the organization associated with the milestone"
      }),
      department: z.string().optional().meta({
        title: "Department",
        description: "The department associated with the milestone"
      }),
      departmentWebsite: z.string().optional().meta({
        title: "Department Website",
        description: "The website of the department associated with the milestone"
      }),
      points: z.array(z.string().meta({
        title: "Point",
        description: "A key point or highlight of the milestone"
      })).optional().meta({
        title: "Points",
        description: "A list of key points or highlights of the milestone"
      }),
      partingNote: z.string().optional().meta({
        title: "Parting Note",
        description: "A final note or message related to the milestone"
      }),
      achievements: z
        .array(
          z.object({
            title: z.string().meta({
              title: "Achievement Title",
              description: "The title of the achievement"
            }),
            description: z.string().meta({
              title: "Achievement Description",
              description: "A brief description of the achievement"
            }),
            on: z.coerce.date().optional().meta({
              title: "Achievement Date",
              description: "The date of the achievement"
            })
          }).meta({
            title: "Achievement",
            description: "An achievement related to the milestone"
          })
        )
        .optional().meta({
          title: "Achievements",
          description: "A list of achievements related to the milestone"
        })
    }).meta({
      title: "Milestone",
      description: "A significant event in your journey"
    })
  ).meta({
    title: "Milestones",
    description: "A list of significant events in your journey"
  }),
});

export type Model = z.infer<typeof schema>;
