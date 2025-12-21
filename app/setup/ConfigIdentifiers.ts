import CoreSetupModel from "./models/CoreSetupModel";
import SidebarSetupModel from "./models/SidebarSetupModel";
import HomeSetupModel from "./models/HomeSetupModel";
import AboutSetupModel from "./models/AboutSetupModel";
import JourneySetupModel from "./models/JourneySetupModel";

export enum ConfigIdentifiers {
  Core="core",
  Sidebar="sidebar",
  Home="home",
  About="about",
  Journey="journey",
}

export type ConfigModels = {
  [ConfigIdentifiers.Core]: CoreSetupModel;
  [ConfigIdentifiers.Sidebar]: SidebarSetupModel;
  [ConfigIdentifiers.Home]: HomeSetupModel;
  [ConfigIdentifiers.About]: AboutSetupModel;
  [ConfigIdentifiers.Journey]: JourneySetupModel;
};

export type TypeByConfigIdentifier<T extends keyof ConfigModels> = ConfigModels[T];