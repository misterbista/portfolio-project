import * as z from "zod";

export const schema = z.object({
  profilePicture: z
    .url("Profile Picture must be a valid URL")
    .meta({
      title: "Profile Picture",
      description:
        "An image that will be used as the profile picture in the left panel. " +
        "It is recommended to use a square image of size 512x512px.",
    }),
  socials: z
    .array(
    z.object({
      name: z
        .string("Social Media Name is required")
        .meta({
          title: "Social Media Name",
          description: "The name of the social media account.",
        }
      ),
      url: z
        .url("Social URL must be a valid URL")
        .meta({
          title: "Social Media URL",
          description: "The URL of the social media account.",
        }
      ),
    }).meta({
      title: "Social Media",
      description: "A social media account.",
    }).meta({
      title: "Social Media Accounts",
      description: "A list of social media accounts to show in the left panel.",
    }),
  ),
  enabledMenus: z
    .array(z.string().meta({
      title: "Menu Name",
      description: "The name of the menu.",
    }))
    .meta({
      title: "Enabled Menus",
      description:
        "A list of enabled menus in to show in the left panel.",
    }),
});

export type Model = z.infer<typeof schema>;

export const defaultValues: Model = {
  profilePicture: "",
  socials: [],
  enabledMenus: [],
};
