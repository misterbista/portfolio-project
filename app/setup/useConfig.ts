import {useQuery} from "@tanstack/react-query";
import {ConfigModels, TypeByConfigIdentifier} from "./ConfigIdentifiers";


export const useConfig = <T extends keyof ConfigModels>(configIdentifier: T) => {
  const {
    data,
    isLoading,
  } = useQuery<TypeByConfigIdentifier<T>>({
    queryKey: ["setup", configIdentifier],
    queryFn: async () => await getConfig(configIdentifier),
    refetchOnWindowFocus: false
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