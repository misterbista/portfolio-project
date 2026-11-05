import aboutJson from "@/public/config/about.json";
import type {Model as AboutModel} from "@/configuration/about";
export const AboutConfig = aboutJson as unknown as AboutModel;

import blogsJson from "@/public/config/blogs.json";
import type {Model as BlogsModel} from "@/configuration/blogs";
export const BlogsConfig = blogsJson as unknown as BlogsModel;

import coreJson from "@/public/config/core.json";
import type {Model as CoreModel} from "@/configuration/core";
export const CoreConfig = coreJson as unknown as CoreModel;

import galleryJson from "@/public/config/gallery.json";
import type {Model as GalleryModel} from "@/configuration/gallery";
export const GalleryConfig = galleryJson as unknown as GalleryModel;

import homeJson from "@/public/config/home.json";
import type {Model as HomeModel} from "@/configuration/home";
export const HomeConfig = homeJson as unknown as HomeModel;

import journeyJson from "@/public/config/journey.json";
import type {Model as JourneyModel} from "@/configuration/journey";
export const JourneyConfig = journeyJson as unknown as JourneyModel;

import leftPanelJson from "@/public/config/left-panel.json";
import type {Model as LeftPanelModel} from "@/configuration/leftPanel";
export const LeftPanelConfig = leftPanelJson as unknown as LeftPanelModel;

import projectsJson from "@/public/config/projects.json";
import type {Model as ProjectsModel} from "@/configuration/projects";
export const ProjectsConfig = projectsJson as unknown as ProjectsModel;

import quickLinksJson from "@/public/config/quick-links.json";
import type {Model as QuickLinksModel} from "@/configuration/quickLinks";
export const QuickLinksConfig = quickLinksJson as unknown as QuickLinksModel;

import servicesJson from "@/public/config/services.json";
import type {Model as ServicesModel} from "@/configuration/services";
export const ServicesConfig = servicesJson as unknown as ServicesModel;

import skillsJson from "@/public/config/skills.json";
import type {Model as SkillsModel} from "@/configuration/skills";
export const SkillsConfig = skillsJson as unknown as SkillsModel;

import testimonialsJson from "@/public/config/testimonials.json";
import type {Model as TestimonialsModel} from "@/configuration/testimonials";
export const TestimonialsConfig = testimonialsJson as unknown as TestimonialsModel;
