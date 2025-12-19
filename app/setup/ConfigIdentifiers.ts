import CoreSetupModel from "./models/CoreSetupModel";
import SidebarSetupModel from "./models/SidebarSetupModel";
import HomeSetupModel from "./models/HomeSetupModel";

export enum ConfigIdentifiers {
  Core="core",
  Sidebar="sidebar",
  Home="home"
}

export type ConfigModels = {
  [ConfigIdentifiers.Core]: CoreSetupModel;
  [ConfigIdentifiers.Sidebar]: SidebarSetupModel;
  [ConfigIdentifiers.Home]: HomeSetupModel;
};

export type TypeByConfigIdentifier<T extends keyof ConfigModels> = ConfigModels[T];