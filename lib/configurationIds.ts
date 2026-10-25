export function createConfigurationId(prefix: string) {
  const randomId = typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID().replace(/-/g, "").slice(0, 12)
    : Math.random().toString(36).slice(2, 14);

  return `${prefix}-${randomId}`;
}

export function withConfigurationId<T extends object>(entry: T & {id?: string}, prefix: string): Omit<T, "id"> & {id: string} {
  return {
    ...entry,
    id: entry.id || createConfigurationId(prefix),
  };
}
