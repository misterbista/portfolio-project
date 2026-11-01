import {isNullOrWhitespace} from "@/lib/string";

export function createConfigurationId(prefix?: string) {
  const randomId = typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID().replace(/-/g, "").slice(0, 12)
    : Math.random().toString(36).slice(2, 14);
  if (prefix) {
    return `${prefix}-${randomId}`;
  }
  return randomId;
}

export function withConfigurationId<T extends object>(entry: T & {id?: string}, prefix?: string): Omit<T, "id"> & {id: string} {
  return {
    ...entry,
    id: isNullOrWhitespace(entry.id)
      ? createConfigurationId(prefix)
      : (entry.id as string)
  };
}
