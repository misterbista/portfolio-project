export async function encodeBase64(content: string | File): Promise<string> {
  if (typeof content === "string") {
    const bytes = new TextEncoder().encode(content);
    let binary = "";
    for (const byte of bytes) {
      binary += String.fromCharCode(byte);
    }
    return btoa(binary);
  }

  const buffer = await content.arrayBuffer();
  let binary = "";
  for (const byte of new Uint8Array(buffer)) {
    binary += String.fromCharCode(byte);
  }
  return btoa(binary);
}
