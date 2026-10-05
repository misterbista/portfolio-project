#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { z } from "zod";

export interface SchemaDoc {
  /**
   * Heading shown in the generated documentation.
   */
  title: string;

  /**
   * Zod object schema to document.
   */
  schema: z.ZodObject<any>;

  /**
   * Optional description shown underneath the section heading.
   */
  description?: string;
}

export interface GenerateOptions {
  /**
   * Optional title for the generated document.
   */
  title?: string;

  /**
   * Optional introductory description.
   */
  description?: string;

  /**
   * Whether to add a "DO NOT EDIT" comment.
   *
   * @default true
   */
  generatedComment?: boolean;
}

const DEFAULT_OPTIONS: Required<GenerateOptions> = {
  title: "Configuration Reference",
  description: "",
  generatedComment: true,
};

/**
 * Read metadata from a Zod schema.
 */
function getMeta(schema: z.ZodType): Record<string, unknown> {
  return schema.meta?.() ?? {};
}

/**
 * Get a human-readable name for a schema.
 */
function getSchemaTitle(
  schema: z.ZodType,
  fallback: string,
): string {
  const meta = getMeta(schema);

  return typeof meta.title === "string"
    ? meta.title
    : fallback;
}

/**
 * Get a schema description from metadata.
 */
function getSchemaDescription(
  schema: z.ZodType,
): string | undefined {
  const meta = getMeta(schema);

  return typeof meta.description === "string"
    ? meta.description
    : undefined;
}

/**
 * Convert a camelCase / snake_case / kebab-case key into
 * a human-readable title.
 *
 * Examples:
 *   websiteName -> Website Name
 *   website_name -> Website Name
 *   website-name -> Website Name
 */
function humanize(value: string): string {
  return value
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/^./, (char) => char.toUpperCase());
}

/**
 * Determine whether a Zod schema is an object.
 */
function isZodObject(
  schema: z.ZodType,
): schema is z.ZodObject<any> {
  return schema instanceof z.ZodObject;
}

/**
 * Determine whether a Zod schema is an array.
 */
function isZodArray(
  schema: z.ZodType,
): schema is z.ZodArray<any> {
  return schema instanceof z.ZodArray;
}

/**
 * Get the element schema from a Zod array.
 *
 * This intentionally uses the public `element` property rather than
 * reaching into `_def`.
 */
function getArrayElement(
  schema: z.ZodArray<any>,
): z.ZodType {
  return schema.element;
}

/**
 * Render metadata for a schema.
 */
function renderMeta(
  schema: z.ZodType,
  lines: string[],
): void {
  const description = getSchemaDescription(schema);

  if (description) {
    lines.push(description);
    lines.push("");
  }
}

/**
 * Recursively render a Zod schema.
 *
 * The important part of this function is that metadata belongs to
 * the schema node itself. We render that node first and only then
 * descend into children.
 *
 * This means:
 *
 *   z.array(...).meta(...)
 *
 * gets documented separately from:
 *
 *   z.array(z.object(...).meta(...))
 *
 * and both are preserved.
 */
function renderSchema(
  schema: z.ZodType,
  lines: string[],
  level: number,
  fallbackTitle: string,
): void {
  const title = getSchemaTitle(schema, fallbackTitle);

  lines.push(`${"#".repeat(level)} ${title}`);
  lines.push("");

  renderMeta(schema, lines);

  if (isZodObject(schema)) {
    renderObject(schema, lines, level);
    return;
  }

  if (isZodArray(schema)) {
    renderArray(schema, lines, level);
    return;
  }
}

/**
 * Render a Zod object and recursively render all of its properties.
 */
function renderObject(
  schema: z.ZodObject<any>,
  lines: string[],
  level: number,
): void {
  for (const [key, field] of Object.entries(schema.shape)) {
    const zodField = field as z.ZodType;

    renderSchema(
      zodField,
      lines,
      level + 1,
      humanize(key),
    );
  }
}

/**
 * Render a Zod array and recursively render its element schema.
 */
function renderArray(
  schema: z.ZodArray<any>,
  lines: string[],
  level: number,
): void {
  const element = getArrayElement(schema);

  /*
   * Give the element a meaningful fallback title.
   *
   * If the element has `.meta({ title: "User" })`, that title
   * takes precedence.
   *
   * If it is itself an object/array without metadata, the
   * fallback still makes the hierarchy understandable.
   */
  renderSchema(
    element,
    lines,
    level + 1,
    getDefaultArrayElementTitle(element),
  );
}

/**
 * Produce a useful title when an array element has no metadata.
 */
function getDefaultArrayElementTitle(
  schema: z.ZodType,
): string {
  if (isZodObject(schema)) {
    return "Items";
  }

  if (isZodArray(schema)) {
    return "Items";
  }

  const meta = getMeta(schema);
  if (meta && meta.title && typeof meta.title === "string") {
    return meta.title;
  }

  if (schema instanceof z.ZodString) return "string";
  if (schema instanceof z.ZodNumber) return "number";
  if (schema instanceof z.ZodBoolean) return "boolean";
  if (schema instanceof z.ZodArray) return "array";
  if (schema instanceof z.ZodObject) return "object";
  if (schema instanceof z.ZodDate) return "date";
  if (schema instanceof z.ZodBigInt) return "bigint";
  if (schema instanceof z.ZodNull) return "null";
  if (schema instanceof z.ZodUndefined) return "undefined";
  if (schema instanceof z.ZodEnum) return "enum";

  return schema.constructor.name;
}

/**
 * Generate Markdown for a single Zod object schema.
 */
export function generateSection(
  title: string,
  schema: z.ZodObject<any>,
  description?: string,
): string {
  const lines: string[] = [];

  lines.push(`## ${title}`);
  lines.push("");

  if (description) {
    lines.push(description);
    lines.push("");
  }

  /*
   * We start rendering object properties at level 3 because the
   * section itself occupies level 2.
   */
  renderObject(schema, lines, 3);

  return lines.join("\n");
}

/**
 * Generate the complete Markdown documentation.
 *
 * Example:
 *
 * generate([
 *   {
 *     title: "Core",
 *     schema: CoreConfigSchema,
 *   },
 * ]);
 */
export function generate(
  schemas: SchemaDoc[],
  options: GenerateOptions = {},
): string {
  const opts = {
    ...DEFAULT_OPTIONS,
    ...options,
  };

  const lines: string[] = [];

  if (opts.generatedComment) {
    lines.push("<!--");
    lines.push("  DO NOT EDIT THIS FILE MANUALLY.");
    lines.push("");
    lines.push("  This file is generated from Zod schemas.");
    lines.push("  Run the documentation generator to regenerate it.");
    lines.push("-->");
    lines.push("");
  }

  if (opts.title) {
    lines.push(`# ${opts.title}`);
    lines.push("");
  }

  if (opts.description) {
    lines.push(opts.description);
    lines.push("");
  }

  for (const section of schemas) {
    lines.push(
      generateSection(
        section.title,
        section.schema,
        section.description,
      ),
    );
  }

  return lines
    .join("\n")
    .replace(/\n{3,}/g, "\n\n");
}

/**
 * Write generated documentation to a file.
 */
export function write(
  outputFile: string,
  schemas: SchemaDoc[],
  options: GenerateOptions = {},
): void {
  const markdown = generate(schemas, options);

  const directory = path.dirname(outputFile);

  if (directory !== ".") {
    fs.mkdirSync(directory, { recursive: true });
  }

  fs.writeFileSync(outputFile, markdown, "utf8");
}

/**
 * Load schemas from a JavaScript/TypeScript module.
 *
 * The module can export:
 *
 *   export default [...]
 *
 * or:
 *
 *   export const schemas = [...]
 *
 * or:
 *
 *   export const configSchemas = [...]
 */
async function loadSchemas(
  modulePath: string,
): Promise<SchemaDoc[]> {
  const absolutePath = path.resolve(modulePath);
  const moduleUrl = pathToFileURL(absolutePath).href;

  const module = await import(moduleUrl);

  const schemas =
    module.default ??
    module.schemas ??
    module.configSchemas;

  if (!Array.isArray(schemas)) {
    throw new Error(
      `Could not find a schema array in ${modulePath}.\n\n` +
      `Export it as one of:\n` +
      `  export default [...]\n` +
      `  export const schemas = [...]\n` +
      `  export const configSchemas = [...]`,
    );
  }

  return schemas;
}

/**
 * CLI entry point.
 *
 * Usage:
 *
 *   npx tsx zodSchemaDocs.ts schemas.ts docs/CONFIGURATION.md
 *
 * Optional:
 *
 *   npx tsx zodSchemaDocs.ts schemas.ts docs/CONFIGURATION.md "My Config"
 */
async function cli() {
  const [
    ,
    ,
    schemaFile,
    outputFile,
    title,
    description,
  ] = process.argv;

  if (!schemaFile || !outputFile) {
    console.error(
      [
        "Usage:",
        "",
        "  npx tsx zodSchemaDocs.ts <schema-file> <output-file> [title] [description]",
        "",
        "Example:",
        "",
        "  npx tsx zodSchemaDocs.ts \\",
        "    src/config/schemas.ts \\",
        "    docs/CONFIGURATION.md \\",
        "    'Configuration Docs' \\",
        "    'This Docs will detail the schema used in the application.'",
      ].join("\n"),
    );

    process.exit(1);
  }

  try {
    const schemas = await loadSchemas(schemaFile);

    write(outputFile, schemas, {
      title: title || DEFAULT_OPTIONS.title,
      description:
        description || DEFAULT_OPTIONS.description,
    });

    console.log(`Generated ${outputFile}`);
  } catch (error) {
    console.error(
      error instanceof Error
        ? error.message
        : String(error),
    );

    process.exit(1);
  }
}

/**
 * Run CLI only when this file is executed directly.
 *
 * This allows the same file to be imported safely:
 *
 *   import { generate } from "./zodSchemaDocs";
 */
const isDirectExecution =
  process.argv[1] &&
  path.resolve(process.argv[1]) ===
  path.resolve(new URL(import.meta.url).pathname);

if (isDirectExecution) {
  void cli();
}
