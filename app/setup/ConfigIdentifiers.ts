import CoreSetupModel from "./models/CoreSetupModel";
import SidebarSetupModel from "./models/SidebarSetupModel";
import HomeSetupModel from "./models/HomeSetupModel";
import AboutSetupModel from "./models/AboutSetupModel";

export enum ConfigIdentifiers {
  Core="core",
  Sidebar="sidebar",
  Home="home",
  About="about",
}

export type ConfigModels = {
  [ConfigIdentifiers.Core]: CoreSetupModel;
  [ConfigIdentifiers.Sidebar]: SidebarSetupModel;
  [ConfigIdentifiers.Home]: HomeSetupModel;
  [ConfigIdentifiers.About]: AboutSetupModel;
};

export type TypeByConfigIdentifier<T extends keyof ConfigModels> = ConfigModels[T];