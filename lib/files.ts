export type FileType =
  | "Image"
  | "Video"
  | "Audio"
  | "Text"
  | "HTML"
  | "CSS"
  | "CSV"
  | "JSON"
  | "XML"
  | "JavaScript"
  | "Markdown"
  | "PDF"
  | "Word"
  | "Excel"
  | "PowerPoint"
  | "RTF"
  | "Archive"
  | "Font"
  | "Other";

const MIME_TYPE_MAP: Record<string, FileType> = {
  // Text
  "text/plain": "Text",
  "text/html": "HTML",
  "text/htm": "HTML",
  "text/css": "CSS",
  "text/csv": "CSV",
  "text/xml": "XML",
  "text/markdown": "Markdown",
  "text/javascript": "JavaScript",

  // Structured data
  "application/json": "JSON",
  "application/ld+json": "JSON",
  "application/geo+json": "JSON",
  "application/xml": "XML",

  // Documents
  "application/pdf": "PDF",
  "application/rtf": "RTF",
  "application/msword": "Word",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "Word",

  "application/vnd.ms-excel": "Excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "Excel",

  "application/vnd.ms-powerpoint": "PowerPoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation": "PowerPoint",

  // Archives
  "application/zip": "Archive",
  "application/x-zip-compressed": "Archive",
  "application/x-rar-compressed": "Archive",
  "application/vnd.rar": "Archive",
  "application/gzip": "Archive",
  "application/x-gzip": "Archive",
  "application/x-7z-compressed": "Archive",
  "application/x-tar": "Archive",

  // JavaScript
  "application/javascript": "JavaScript",
  "application/x-javascript": "JavaScript",

  // Fonts
  "font/woff": "Font",
  "font/woff2": "Font",
  "font/ttf": "Font",
  "font/otf": "Font",
  "application/vnd.ms-opentype": "Font",
};

const MIME_PREFIX_MAP: Record<string, FileType> = {
  "image/": "Image",
  "video/": "Video",
  "audio/": "Audio",
};

const EXTENSION_TO_TYPE_MAP: Record<string, FileType> = {
  // Text
  txt: "Text",
  html: "HTML",
  htm: "HTML",
  css: "CSS",
  csv: "CSV",
  xml: "XML",
  md: "Markdown",
  js: "JavaScript",

  // Structured data
  json: "JSON",

  // Documents
  pdf: "PDF",
  rtf: "RTF",
  doc: "Word",
  docx: "Word",

  xls: "Excel",
  xlsx: "Excel",

  ppt: "PowerPoint",
  pptx: "PowerPoint",

  // Archives
  zip: "Archive",
  rar: "Archive",
  gz: "Archive",
  tar: "Archive",
  "7z": "Archive",

  // Fonts
  woff: "Font",
  woff2: "Font",
  ttf: "Font",
  otf: "Font",

  // Images
  jpg: "Image",
  jpeg: "Image",
  png: "Image",
  gif: "Image",
  bmp: "Image",
  webp: "Image",
  svg: "Image",
  ico: "Image",

  // Videos
  mp4: "Video",
  mov: "Video",
  avi: "Video",
  mkv: "Video",
  webm: "Video",

  // Audio
  mp3: "Audio",
  wav: "Audio",
  ogg: "Audio",
};

export function getFileTypeFromExtension(
  filename?: string | null,
): FileType {
  if (!filename) return "Other";
  const extension = filename.split(".").pop()?.toLowerCase();
  if (!extension) return "Other";
  return EXTENSION_TO_TYPE_MAP[extension] ?? "Other";
}

export function humanizeFileSize(bytes: number): string {
  bytes ??= 0;
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  if (bytes === 0) return "0 B";
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return Math.round(bytes / Math.pow(1024, i)) + " " + sizes[i];
}
