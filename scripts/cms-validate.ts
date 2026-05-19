/**
 * CMS content validation — walks `src/content/**` and validates every
 * JSON file against the schemas declared in `cms/schemas.ts`. Same
 * single source of truth as the Astro content-collection schemas
 * (`src/content.config.ts`).
 *
 * Before the cms-core migration, this file carried ~100 lines of
 * inline Zod schemas that drifted with both `content.config.ts` and
 * `cms/schemas.ts`. Now it imports from the barrel, so any field
 * shipped via `@koonnect/cms-core` is enforced everywhere
 * automatically.
 *
 * Exit code: 0 on success, 1 if ANY content file fails validation
 * (we accumulate failures and print them all so the operator can fix
 * everything in one pass).
 */

import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { z } from "zod";

import {
  SitePageSchema,
  TemplatePageSchema,
  MenuSettingsSchema,
  FormSettingsSchema,
  CertificationSchema,
  AnalyticsSchema,
} from "../cms/schemas";

const root = process.cwd();
const readJson = (path: string) =>
  JSON.parse(readFileSync(join(root, path), "utf8"));

const jsonFiles = (dir: string): string[] =>
  readdirSync(join(root, dir))
    .filter((item) => item.endsWith(".json"))
    .map((item) => `${dir}/${item}`);

interface Check {
  file: string;
  schema: z.ZodTypeAny;
}

const checks: Check[] = [
  ...jsonFiles("src/content/site").map((file) => ({
    file,
    schema: SitePageSchema,
  })),
  ...jsonFiles("src/content/pages").map((file) => ({
    file,
    schema: TemplatePageSchema,
  })),
  { file: "src/content/settings/menus-pt.json", schema: MenuSettingsSchema },
  { file: "src/content/settings/menus-en.json", schema: MenuSettingsSchema },
  { file: "src/content/settings/forms-pt.json", schema: FormSettingsSchema },
  { file: "src/content/settings/forms-en.json", schema: FormSettingsSchema },
  {
    file: "src/content/settings/certifications.json",
    schema: CertificationSchema,
  },
  { file: "src/content/settings/analytics.json", schema: AnalyticsSchema },
];

let failures = 0;
for (const { file, schema } of checks) {
  const result = schema.safeParse(readJson(file));
  if (!result.success) {
    failures += 1;
    console.error(`CMS validation failed: ${file}`);
    console.error(z.prettifyError(result.error));
  }
}

// Blog: just check each locale directory has at least one entry. The
// blog frontmatter shape lives in `src/content.config.ts` (Markdown
// loader) and is validated by Astro on build, not here.
for (const dir of ["src/content/blog/pt", "src/content/blog/en"]) {
  try {
    const files = readdirSync(join(root, dir)).filter((item) =>
      item.endsWith(".md"),
    );
    if (files.length === 0) {
      failures += 1;
      console.error(
        `CMS validation failed: ${dir} must contain at least one markdown entry.`,
      );
    }
  } catch {
    failures += 1;
    console.error(`CMS validation failed: ${dir} does not exist.`);
  }
}

if (failures > 0) {
  process.exit(1);
}

console.log("CMS content validation passed.");
