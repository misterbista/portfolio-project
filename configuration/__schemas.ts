import {schema as coreSchema} from "./core";
import {schema as leftPanelSchema} from "./leftPanel";
import {schema as homeSchema} from "./home";
import {schema as aboutSchema} from "./about";
import {schema as journeySchema} from "./journey";
import {schema as projectsSchema} from "./projects";
import {schema as gallerySchema} from "./gallery";
import {schema as skillsSchema} from "./skills";
import {schema as servicesSchema} from "./services";
import {schema as testimonialsSchema} from "./testimonials";
import {schema as blogSchema} from "./blog";
import {schema as quickLinksSchema} from "./quickLinks";


export default [
  {
    title: "Core",
    schema: coreSchema,
  },
  {
    title: "Left Panel",
    schema: leftPanelSchema
  },
  {
    title: "Home",
    schema: homeSchema
  },
  {
    title: "About",
    schema: aboutSchema
  },
  {
    title: "Journey",
    schema: journeySchema
  },
  {
    title: "Projects",
    schema: projectsSchema
  },
  {
    title: "Gallery",
    schema: gallerySchema
  },
  {
    title: "Skills",
    schema: skillsSchema
  },
  {
    title: "Services",
    schema: servicesSchema
  },
  {
    title: "Testimonials",
    schema: testimonialsSchema
  },
  {
    title: "Blog",
    schema: blogSchema
  },
  {
    title: "Quick Links",
    schema: quickLinksSchema
  }
];

