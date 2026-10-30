import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  ConfigMode,
  Identifier,
  useConfig,
} from "@/hooks/useConfig";

export function useConfigurationForm<
  TSchema extends z.ZodObject<any>,
  TIdentifier extends Identifier
>(
  identifier: TIdentifier,
  schema: TSchema,
  defaultValues: z.input<TSchema>,
  query?: Record<string, string | number | null>,
  mode?: ConfigMode
) {
  type Input = z.input<TSchema>;
  type Output = z.output<TSchema>;

  mode ??= ConfigMode.Private;

  const {
    config,
    isLoadingConfig,
    saveConfig,
    isSavingConfig,
  } = useConfig(identifier, query, mode);

  const form = useForm<Input, any, Output>({
    resolver: zodResolver(schema) as any,
    defaultValues: defaultValues as any,
  });

  const {
    control,
    reset,
    handleSubmit,
    watch
  } = form;

  useEffect(() => {
    if (config) {
      reset(config as any);
    }
  }, [config, reset]);

  const formValues = watch();

  return {
    isLoadingConfig,
    saveConfig,
    isSavingConfig,
    form,
    control,
    handleSubmit,
    formValues
  };
}
