import {migrateConfiguration} from "@/migrations/configurationMigrationManager";

import aboutJson from "@/public/config/about.json";
import type {TOutput as AboutOutput} from "@/configuration/about";
import {schema as aboutSchema} from "@/configuration/about";
export const AboutConfig: AboutOutput = aboutSchema.parse(migrateConfiguration("about", aboutJson).configuration);

import blogsJson from "@/public/config/blogs.json";
import type {TOutput as BlogsOutput} from "@/configuration/blogs";
import {schema as blogsSchema} from "@/configuration/blogs";
export const BlogsConfig: BlogsOutput = blogsSchema.parse(migrateConfiguration("blogs", blogsJson).configuration);

import coreJson from "@/public/config/core.json";
import type {TOutput as CoreOutput} from "@/configuration/core";
import {schema as coreSchema} from "@/configuration/core";
export const CoreConfig: CoreOutput = coreSchema.parse(migrateConfiguration("core", coreJson).configuration);

import galleryJson from "@/public/config/gallery.json";
import type {TOutput as GalleryOutput} from "@/configuration/gallery";
import {schema as gallerySchema} from "@/configuration/gallery";
export const GalleryConfig: GalleryOutput = gallerySchema.parse(migrateConfiguration("gallery", galleryJson).configuration);

import homeJson from "@/public/config/home.json";
import type {TOutput as HomeOutput} from "@/configuration/home";
import {schema as homeSchema} from "@/configuration/home";
export const HomeConfig: HomeOutput = homeSchema.parse(migrateConfiguration("home", homeJson).configuration);

import journeyJson from "@/public/config/journey.json";
import type {TOutput as JourneyOutput} from "@/configuration/journey";
import {schema as journeySchema} from "@/configuration/journey";
export const JourneyConfig: JourneyOutput = journeySchema.parse(migrateConfiguration("journey", journeyJson).configuration);

import leftPanelJson from "@/public/config/left-panel.json";
import type {TOutput as LeftPanelOutput} from "@/configuration/leftPanel";
import {schema as leftPanelSchema} from "@/configuration/leftPanel";
export const LeftPanelConfig: LeftPanelOutput = leftPanelSchema.parse(migrateConfiguration("leftPanel", leftPanelJson).configuration);

import projectsJson from "@/public/config/projects.json";
import type {TOutput as ProjectsOutput} from "@/configuration/projects";
import {schema as projectsSchema} from "@/configuration/projects";
export const ProjectsConfig: ProjectsOutput = projectsSchema.parse(migrateConfiguration("projects", projectsJson).configuration);

import quickLinksJson from "@/public/config/quick-links.json";
import type {TOutput as QuickLinksOutput} from "@/configuration/quickLinks";
import {schema as quickLinksSchema} from "@/configuration/quickLinks";
export const QuickLinksConfig: QuickLinksOutput = quickLinksSchema.parse(migrateConfiguration("quickLinks", quickLinksJson).configuration);

import servicesJson from "@/public/config/services.json";
import type {TOutput as ServicesOutput} from "@/configuration/services";
import {schema as servicesSchema} from "@/configuration/services";
export const ServicesConfig: ServicesOutput = servicesSchema.parse(migrateConfiguration("services", servicesJson).configuration);

import skillsJson from "@/public/config/skills.json";
import type {TOutput as SkillsOutput} from "@/configuration/skills";
import {schema as skillsSchema} from "@/configuration/skills";
export const SkillsConfig: SkillsOutput = skillsSchema.parse(migrateConfiguration("skills", skillsJson).configuration);

import testimonialsJson from "@/public/config/testimonials.json";
import type {TOutput as TestimonialsOutput} from "@/configuration/testimonials";
import {schema as testimonialsSchema} from "@/configuration/testimonials";
export const TestimonialsConfig: TestimonialsOutput = testimonialsSchema.parse(migrateConfiguration("testimonials", testimonialsJson).configuration);
