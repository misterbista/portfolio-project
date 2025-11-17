import {useQuery} from "@tanstack/react-query";
import CoreSetupModel from "./models/CoreSetupModel";
import SidebarSetupModel from "./models/SidebarSetupModel";
import {SetupIdentifiers} from "./SetupIdentifiers";


type SetupModels = {
  [SetupIdentifiers.Core]: CoreSetupModel;
  [SetupIdentifiers.Sidebar]: SidebarSetupModel
};
type TypeBySetupIdentifier<T extends keyof SetupModels> = SetupModels[T];


export const useSetup = <T extends keyof SetupModels>(setupIdentifier: T) => {
  const {
    data,
    isLoading,
  } = useQuery<TypeBySetupIdentifier<T>>({
    queryKey: ["setup", setupIdentifier],
    queryFn: async () => await getSetup(setupIdentifier),
    refetchOnWindowFocus: true,
  });

  return {
    data: data as TypeBySetupIdentifier<T>,
    isLoading
  };
}

const getSetup = async <T extends keyof SetupModels>(setupIdentifier: T)=> {
  return await fetch(`config/${setupIdentifier}.json`) as TypeBySetupIdentifier<T>;
}