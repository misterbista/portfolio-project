export function stripHtmlTags(str?: string | null): string | null {
  if(!str) {
    return null;
  }
  return str.replace(/<[^>]*>/g, "");
}
