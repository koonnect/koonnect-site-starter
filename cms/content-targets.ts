import { createHash } from "node:crypto";

export type ContentTargetKind = "text" | "lines" | "image" | "link" | "toggle";

export type ContentTarget = {
  id: string;
  kind: ContentTargetKind;
  label: string;
  section: string;
  locale: string;
  entry: string;
  file: string;
  path: string;
  current: unknown;
  fileSha: string;
};

type JsonObject = Record<string, unknown>;

const SKIPPED_KEYS = new Set(["locale", "pageKey", "routeSlug", "status", "templateId", "sectionId"]);

function hashFile(input: string) {
  return createHash("sha1").update(input).digest("hex");
}

function isObject(value: unknown): value is JsonObject {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isLink(value: JsonObject) {
  return typeof value.label === "string" && typeof value.href === "string";
}

function isImage(value: JsonObject) {
  return typeof value.src === "string" && typeof value.alt === "string";
}

function inferLocale(file: string, json: JsonObject) {
  if (typeof json.locale === "string") return json.locale;
  const match = file.match(/(?:^|\/)(pt|en)(?:-|\/)/);
  return match?.[1] ?? "global";
}

function inferEntry(file: string, json: JsonObject) {
  if (file.includes("/site/")) return `site/${String(json.pageKey ?? "unknown")}`;
  if (file.includes("/pages/")) return `pages/${String(json.pageKey ?? "unknown")}`;
  if (file.includes("/settings/")) return `settings/${file.split("/").pop()?.replace(/\.json$/, "") ?? "unknown"}`;
  return file.replace(/^src\/content\//, "").replace(/\.json$/, "");
}

function inferPrefix(file: string, json: JsonObject) {
  if (file.includes("/site/")) return `site.${String(json.pageKey ?? "unknown")}`;
  if (file.includes("/pages/")) return `pages.${String(json.pageKey ?? "unknown")}`;
  if (file.includes("/settings/menus-")) return "settings.menus";
  if (file.includes("/settings/forms-")) return "settings.forms";
  if (file.includes("/settings/certifications")) return "settings.certifications";
  if (file.includes("/settings/analytics")) return "settings.analytics";
  return inferEntry(file, json).replace(/\//g, ".");
}

function humanize(input: string) {
  return input
    .replace(/\.\d+(?=\.|$)/g, " item")
    .replace(/[._-]+/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function makeTarget(context: {
  kind: ContentTargetKind;
  prefix: string;
  labelPath: string;
  section: string;
  locale: string;
  entry: string;
  file: string;
  path: string;
  current: unknown;
  fileSha: string;
}): ContentTarget {
  return {
    id: `${context.prefix}.${context.path}`,
    kind: context.kind,
    label: humanize(context.labelPath),
    section: context.section,
    locale: context.locale,
    entry: context.entry,
    file: context.file,
    path: context.path,
    current: context.current,
    fileSha: context.fileSha,
  };
}

function scanValue(
  value: unknown,
  context: {
    prefix: string;
    locale: string;
    entry: string;
    file: string;
    fileSha: string;
    section: string;
    path: string;
  },
): ContentTarget[] {
  if (typeof value === "boolean") {
    return [makeTarget({ ...context, kind: "toggle", labelPath: context.path, current: value })];
  }

  if (typeof value === "string") {
    return [makeTarget({ ...context, kind: "text", labelPath: context.path, current: value })];
  }

  if (Array.isArray(value)) {
    if (value.every((item) => typeof item === "string")) {
      return [makeTarget({ ...context, kind: "lines", labelPath: context.path, current: value })];
    }

    return value.flatMap((item, index) =>
      scanValue(item, {
        ...context,
        path: context.path ? `${context.path}.${index}` : String(index),
      }),
    );
  }

  if (!isObject(value)) return [];

  if (isLink(value)) {
    return [makeTarget({ ...context, kind: "link", labelPath: context.path, current: value })];
  }

  if (isImage(value)) {
    return [makeTarget({ ...context, kind: "image", labelPath: context.path, current: value })];
  }

  const nextSection = typeof value.sectionId === "string" ? value.sectionId : context.section;
  return Object.entries(value).flatMap(([key, child]) => {
    if (SKIPPED_KEYS.has(key)) return [];
    return scanValue(child, {
      ...context,
      section: nextSection,
      path: context.path ? `${context.path}.${key}` : key,
    });
  });
}

export function discoverContentTargets(file: string, raw: string, json: unknown): ContentTarget[] {
  if (!isObject(json)) return [];

  return scanValue(json, {
    prefix: inferPrefix(file, json),
    locale: inferLocale(file, json),
    entry: inferEntry(file, json),
    file,
    fileSha: hashFile(raw),
    section: inferEntry(file, json),
    path: "",
  });
}
