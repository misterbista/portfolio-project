import {useQuery} from "@tanstack/react-query";
import CoreConfigModel from "./models/CoreSetupModel";
import SidebarConfigModel from "./models/SidebarSetupModel";
import {SetupIdentifiers} from "./SetupIdentifiers";


type ConfigModels = {
  [SetupIdentifiers.Core]: CoreConfigModel;
  [SetupIdentifiers.Sidebar]: SidebarConfigModel
};
type TypeByConfigIdentifier<T extends keyof ConfigModels> = ConfigModels[T];


export const useConfig = <T extends keyof ConfigModels>(configIdentifier: T) => {
  const {
    data,
    isLoading,
  } = useQuery<TypeByConfigIdentifier<T>>({
    queryKey: ["setup", configIdentifier],
    queryFn: async () => await getConfig(configIdentifier),
    refetchOnWindowFocus: true,
  });

  return {
    data: data as TypeByConfigIdentifier<T>,
    isLoading
  };
}

const getConfig = async <T extends keyof ConfigModels>(configIdentifier: T)=> {
  const response = await fetch(`/config/${configIdentifier}.json`)
  return await response.json() as TypeByConfigIdentifier<T>;
}