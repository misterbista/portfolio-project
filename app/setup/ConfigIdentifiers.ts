import CoreConfigModel from "./models/CoreSetupModel";
import SidebarConfigModel from "./models/SidebarSetupModel";

export enum ConfigIdentifiers {
  Core="core",
  Sidebar="sidebar"
}

export type ConfigModels = {
  [ConfigIdentifiers.Core]: CoreConfigModel;
  [ConfigIdentifiers.Sidebar]: SidebarConfigModel
};

export type TypeByConfigIdentifier<T extends keyof ConfigModels> = ConfigModels[T];