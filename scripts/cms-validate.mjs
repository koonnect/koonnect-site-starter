import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { z } from "zod";

const root = process.cwd();
const readJson = (path) => JSON.parse(readFileSync(join(root, path), "utf8"));

const locale = z.enum(["pt", "en"]);
const link = z.object({ label: z.string().min(1), href: z.string().min(1) });
const seo = z.object({ title: z.string().min(1), description: z.string().min(1) });

const siteSchema = z.object({
  locale,
  pageKey: z.string().min(1),
  routeSlug: z.string(),
  siteName: z.string().min(1),
  metadata: seo,
  hero: z.object({
    sectionId: z.literal("hero-split"),
    eyebrow: z.string().min(1),
    title: z.array(z.string().min(1)).min(1),
    description: z.string().min(1),
    primaryCta: link,
  }),
});

const featureGridSection = z.object({
  sectionId: z.literal("feature-grid"),
  eyebrow: z.string().min(1),
  title: z.array(z.string().min(1)).min(1),
  description: z.string().min(1),
  items: z.array(z.object({ title: z.string().min(1), description: z.string().min(1) })).min(1),
});

const comparisonSection = z.object({
  sectionId: z.literal("comparison-two-column"),
  eyebrow: z.string().min(1),
  heading: z.array(z.string().min(1)).min(1),
  without: z.array(z.string().min(1)).min(1),
  with: z.array(z.string().min(1)).min(1),
});

const timelineSection = z.object({
  sectionId: z.literal("timeline"),
  eyebrow: z.string().min(1),
  title: z.array(z.string().min(1)).min(1),
  steps: z.array(z.object({ title: z.string().min(1), text: z.string().min(1) })).min(2),
});

const faqSection = z.object({
  sectionId: z.literal("faq"),
  eyebrow: z.string().min(1),
  title: z.array(z.string().min(1)).min(1),
  items: z.array(z.object({ question: z.string().min(1), answer: z.string().min(1) })).min(1),
});

const contactPanelSection = z.object({
  sectionId: z.literal("contact-panel"),
  eyebrow: z.string().min(1),
  title: z.array(z.string().min(1)).min(1),
  description: z.string().min(1),
  details: z.array(z.object({ label: z.string().min(1), value: z.string().min(1), href: z.string().optional() })).min(1),
  primaryCta: link,
});

const legalBodySection = z.object({
  sectionId: z.literal("legal-body"),
  eyebrow: z.string().min(1),
  title: z.array(z.string().min(1)).min(1),
  blocks: z.array(z.object({ title: z.string().min(1), text: z.string().min(1) })).min(1),
});

const logoStripSection = z.object({
  sectionId: z.literal("logo-strip"),
  eyebrow: z.string().min(1),
  title: z.string().min(1),
  logos: z.array(z.object({ name: z.string().min(1), src: z.string().min(1), alt: z.string().min(1) })).min(1),
});

const ctaBannerSection = z.object({
  sectionId: z.literal("cta-banner"),
  title: z.array(z.string().min(1)).min(1),
  description: z.string().min(1),
  primaryCta: link,
});

const templateSection = z.discriminatedUnion("sectionId", [
  featureGridSection,
  comparisonSection,
  timelineSection,
  faqSection,
  contactPanelSection,
  legalBodySection,
  logoStripSection,
]);

const pageSchema = z.object({
  locale,
  pageKey: z.string().min(1),
  routeSlug: z.string().min(1),
  status: z.enum(["draft", "published"]),
  templateId: z.string().min(1),
  metadata: seo,
  hero: z.object({
    sectionId: z.literal("hero-split"),
    eyebrow: z.string().min(1),
    title: z.array(z.string().min(1)).min(1),
    description: z.string().min(1),
    primaryCta: link,
  }),
  sections: z.array(templateSection).min(1),
  ctaBanner: ctaBannerSection.optional(),
});

const menuSchema = z.object({
  locale,
  nav: z.object({
    solutionsLabel: z.string().min(1),
    platformLabel: z.string().min(1),
    directLinks: z.array(z.object({ label: z.string().min(1), href: z.string().min(1), enabled: z.boolean() })),
    demoCta: link,
  }),
  footer: z.object({
    followLabel: z.string().min(1),
    columns: z.array(z.object({ title: z.string().min(1), links: z.array(link) })),
    demoCta: link,
    copyright: z.string().min(1),
  }),
});

const formSchema = z.object({
  locale,
  forms: z.record(
    z.string(),
    z.object({
      type: z.enum(["webhook", "iframe"]),
      endpoint: z.string().nullable(),
      successMessage: z.string().min(1),
      errorMessage: z.string().min(1),
    }),
  ),
});

const certificationsSchema = z.object({
  items: z.array(z.object({ id: z.string().min(1), name: z.string().min(1), logo: z.string().min(1), url: z.string().optional() })),
});

const analyticsSchema = z.object({
  enabled: z.boolean(),
  ga4: z.string().nullable(),
  metaPixel: z.string().nullable(),
  linkedin: z.string().nullable(),
});

const checks = [
  ["src/content/site/pt-home.json", siteSchema],
  ["src/content/site/en-home.json", siteSchema],
  ["src/content/site/pt-about.json", siteSchema],
  ["src/content/site/en-about.json", siteSchema],
  ["src/content/site/pt-pricing.json", siteSchema],
  ["src/content/site/en-pricing.json", siteSchema],
  ["src/content/site/pt-contact.json", siteSchema],
  ["src/content/site/en-contact.json", siteSchema],
  ["src/content/pages/pt-quality.json", pageSchema],
  ["src/content/pages/en-quality.json", pageSchema],
  ["src/content/pages/pt-legal.json", pageSchema],
  ["src/content/pages/en-legal.json", pageSchema],
  ["src/content/settings/menus-pt.json", menuSchema],
  ["src/content/settings/menus-en.json", menuSchema],
  ["src/content/settings/forms-pt.json", formSchema],
  ["src/content/settings/forms-en.json", formSchema],
  ["src/content/settings/certifications.json", certificationsSchema],
  ["src/content/settings/analytics.json", analyticsSchema],
];

let failures = 0;
for (const [file, schema] of checks) {
  const result = schema.safeParse(readJson(file));
  if (!result.success) {
    failures += 1;
    console.error(`CMS validation failed: ${file}`);
    console.error(z.prettifyError(result.error));
  }
}

for (const dir of ["src/content/blog/pt", "src/content/blog/en"]) {
  const files = readdirSync(join(root, dir)).filter((item) => item.endsWith(".md"));
  if (files.length === 0) {
    failures += 1;
    console.error(`CMS validation failed: ${dir} must contain at least one markdown entry.`);
  }
}

if (failures > 0) {
  process.exit(1);
}

console.log("CMS content validation passed.");
