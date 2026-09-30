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

export function getFileTypeFromMimeType(
  mimeType?: string | null,
): FileType {
  if (!mimeType) {
    return "Other";
  }

  // Remove parameters:
  // "text/html; charset=utf-8" -> "text/html"
  const mime = mimeType
    .split(";", 1)[0]
    .trim()
    .toLowerCase();

  if (!mime) {
    return "Other";
  }

  // Exact match first
  const exactType = MIME_TYPE_MAP[mime];

  if (exactType) {
    return exactType;
  }

  // Family match
  for (const [prefix, fileType] of Object.entries(MIME_PREFIX_MAP)) {
    if (mime.startsWith(prefix)) {
      return fileType;
    }
  }

  return "Other";
}

export function humanizeFileSize(bytes: number): string {
  bytes ??= 0;
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  if (bytes === 0) return "0 B";
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return Math.round(bytes / Math.pow(1024, i)) + " " + sizes[i];
}
