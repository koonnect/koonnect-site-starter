import { z } from "zod";

export type FieldKind = "text" | "lines" | "image" | "link" | "toggle";

export type FieldMeta = {
  id: string;
  label: string;
  kind: FieldKind;
  multiline?: boolean;
  description?: string;
};

function withFieldMeta<T extends z.ZodTypeAny>(schema: T, meta: FieldMeta) {
  return schema.meta({ cmsField: meta });
}

export function textField(meta: Omit<FieldMeta, "kind">) {
  return withFieldMeta(z.string().min(1), { ...meta, kind: "text" });
}

export function linesField(meta: Omit<FieldMeta, "kind">) {
  return withFieldMeta(z.array(z.string().min(1)).min(1), {
    ...meta,
    kind: "lines",
    multiline: true,
  });
}

export function imageField(meta: Omit<FieldMeta, "kind">) {
  return withFieldMeta(
    z.object({
      src: z.string().min(1),
      alt: z.string().min(1),
    }),
    { ...meta, kind: "image" },
  );
}

export function linkField(meta: Omit<FieldMeta, "kind">) {
  return withFieldMeta(
    z.object({
      label: z.string().min(1),
      href: z.string().min(1),
    }),
    { ...meta, kind: "link" },
  );
}

export function toggleField(meta: Omit<FieldMeta, "kind">) {
  return withFieldMeta(z.boolean(), { ...meta, kind: "toggle" });
}
