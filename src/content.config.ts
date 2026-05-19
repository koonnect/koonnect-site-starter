/**
 * Astro Content Collections — bound to the shared schemas declared in
 * `cms/schemas.ts` (which re-exports portable shapes from
 * `@koonnect/cms-core` and layers starter-specific extras on top).
 *
 * Before the cms-core migration, every schema lived inline here AND
 * in `cms/schemas.ts` AND in `scripts/cms-validate.mjs` — three
 * copies drifting apart. Now there is one source of truth, and any
 * future field shipped via `@koonnect/cms-core` propagates with a
 * single `pnpm update`.
 *
 * Astro's `astro/zod` is a re-export of `zod`, so the schemas from
 * cms-core (pure zod) plug straight into `defineCollection({ schema })`.
 */

import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

import {
  // Page wrappers
  SitePageSchema,
  TemplatePageSchema,
  // Settings — the starter splits settings into per-file collections
  // (analytics, menus, forms, certifications). cms-core ships a single
  // SettingsCollectionSchema; we use it directly + add the optional
  // blog frontmatter schema below.
  SettingsCollectionSchema,
  SeoSchema,
} from "../cms/schemas";

const siteCollection = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/site" }),
  schema: SitePageSchema,
});

const pagesCollection = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/pages" }),
  schema: TemplatePageSchema,
});

const blogCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  // Blog frontmatter stays local — `@koonnect/cms-core/schemas/blog`
  // models JSON-based posts (used by koortex/isolago), but the
  // starter's blog is Markdown-with-frontmatter. They're different
  // surfaces; we keep the inline shape until a tenant needs to share it.
  schema: z.object({
    locale: z.enum(["pt", "en"]),
    slug: z.string().min(1),
    title: z.string().min(1),
    excerpt: z.string().min(1),
    category: z.string().min(1),
    publishedAt: z.coerce.date(),
    heroImage: z.string().min(1),
    featured: z.boolean().default(false),
    seo: SeoSchema,
  }),
});

const settingsCollection = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/settings" }),
  // SettingsCollectionSchema is intentionally loose (every field
  // optional) because each settings JSON file in the starter only
  // populates a subset — menus-pt.json has nav/footer, analytics.json
  // has ga4/metaPixel, etc. Astro validates each file against the
  // same shape and trusts the JSON file to populate only what it owns.
  schema: SettingsCollectionSchema,
});

export const collections = {
  site: siteCollection,
  pages: pagesCollection,
  blog: blogCollection,
  settings: settingsCollection,
};
