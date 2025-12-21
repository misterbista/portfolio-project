import CoreSetupModel from "./models/CoreSetupModel";
import SidebarSetupModel from "./models/SidebarSetupModel";
import HomeSetupModel from "./models/HomeSetupModel";
import AboutSetupModel from "./models/AboutSetupModel";
import JourneySetupModel from "./models/JourneySetupModel";
import ProjectsSetupModel from "./models/ProjectsSetupModel";
import SkillsSetupModel from "./models/SkillsSetupModel";
import TestimonialsSetupModel from "./models/TestimonialsSetupModel";
import GallerySetupModel from "./models/GallerySetupModel";
import DownloadsSetupModel from "./models/DownloadsSetupModel";

export enum ConfigIdentifiers {
  Core="core",
  Sidebar="sidebar",
  Home="home",
  About="about",
  Journey="journey",
  Projects="projects",
  Skills="skills",
  Testimonials="testimonials",
  Gallery="gallery",
  Downloads="downloads"
}

export type ConfigModels = {
  [ConfigIdentifiers.Core]: CoreSetupModel;
  [ConfigIdentifiers.Sidebar]: SidebarSetupModel;
  [ConfigIdentifiers.Home]: HomeSetupModel;
  [ConfigIdentifiers.About]: AboutSetupModel;
  [ConfigIdentifiers.Journey]: JourneySetupModel;
  [ConfigIdentifiers.Projects]: ProjectsSetupModel;
  [ConfigIdentifiers.Skills]: SkillsSetupModel;
  [ConfigIdentifiers.Testimonials]: TestimonialsSetupModel;
  [ConfigIdentifiers.Gallery]: GallerySetupModel;
  [ConfigIdentifiers.Downloads]: DownloadsSetupModel;
};

export type TypeByConfigIdentifier<T extends keyof ConfigModels> = ConfigModels[T];