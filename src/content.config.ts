import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const linkSchema = z.object({
  label: z.string().min(1),
  href: z.string().min(1),
});

const heroSplitSchema = z.object({
  sectionId: z.literal("hero-split"),
  eyebrow: z.string().min(1),
  title: z.array(z.string().min(1)).min(1),
  description: z.string().min(1),
  primaryCta: linkSchema,
  secondaryCta: linkSchema.optional(),
  media: z.object({
    src: z.string().min(1),
    alt: z.string().min(1),
  }).optional(),
});

const heroCenteredSchema = z.object({
  sectionId: z.literal("hero-centered"),
  eyebrow: z.string().min(1),
  title: z.array(z.string().min(1)).min(1),
  description: z.string().min(1),
  primaryCta: linkSchema,
  secondaryCta: linkSchema.optional(),
});

const heroSchema = z.discriminatedUnion("sectionId", [heroSplitSchema, heroCenteredSchema]);

const featureGridSchema = z.object({
  sectionId: z.literal("feature-grid"),
  eyebrow: z.string().min(1),
  title: z.array(z.string().min(1)).min(1),
  description: z.string().min(1),
  items: z.array(
    z.object({
      title: z.string().min(1),
      description: z.string().min(1),
    }),
  ).min(1),
});

const logoStripSchema = z.object({
  sectionId: z.literal("logo-strip"),
  eyebrow: z.string().min(1),
  title: z.string().min(1),
  logos: z.array(
    z.object({
      name: z.string().min(1),
      src: z.string().min(1),
      alt: z.string().min(1),
    }),
  ).min(1),
});

const comparisonSchema = z.object({
  sectionId: z.literal("comparison-two-column"),
  eyebrow: z.string().min(1),
  heading: z.array(z.string().min(1)).min(1),
  without: z.array(z.string().min(1)).min(1),
  with: z.array(z.string().min(1)).min(1),
});

const timelineSchema = z.object({
  sectionId: z.literal("timeline"),
  eyebrow: z.string().min(1),
  title: z.array(z.string().min(1)).min(1),
  steps: z.array(
    z.object({
      title: z.string().min(1),
      text: z.string().min(1),
    }),
  ).min(2),
});

const faqSchema = z.object({
  sectionId: z.literal("faq"),
  eyebrow: z.string().min(1),
  title: z.array(z.string().min(1)).min(1),
  items: z.array(
    z.object({
      question: z.string().min(1),
      answer: z.string().min(1),
    }),
  ).min(1),
});

const ctaBannerSchema = z.object({
  sectionId: z.literal("cta-banner"),
  title: z.array(z.string().min(1)).min(1),
  description: z.string().min(1),
  primaryCta: linkSchema,
});

const contactPanelSchema = z.object({
  sectionId: z.literal("contact-panel"),
  eyebrow: z.string().min(1),
  title: z.array(z.string().min(1)).min(1),
  description: z.string().min(1),
  details: z.array(
    z.object({
      label: z.string().min(1),
      value: z.string().min(1),
      href: z.string().optional(),
    }),
  ).min(1),
  primaryCta: linkSchema,
});

const legalBodySchema = z.object({
  sectionId: z.literal("legal-body"),
  eyebrow: z.string().min(1),
  title: z.array(z.string().min(1)).min(1),
  blocks: z.array(
    z.object({
      title: z.string().min(1),
      text: z.string().min(1),
    }),
  ).min(1),
});

const seoSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
});

const templateSectionSchema = z.discriminatedUnion("sectionId", [
  featureGridSchema,
  comparisonSchema,
  timelineSchema,
  faqSchema,
  contactPanelSchema,
  legalBodySchema,
  logoStripSchema,
]);

const siteCollection = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/site" }),
  schema: z.object({
    locale: z.enum(["pt", "en"]),
    pageKey: z.enum(["home", "about", "pricing", "contact"]),
    routeSlug: z.string().min(1),
    siteName: z.string().min(1),
    metadata: seoSchema,
    hero: heroSplitSchema,
    featureGrid: featureGridSchema.optional(),
    logoStrip: logoStripSchema.optional(),
    comparison: comparisonSchema.optional(),
    ctaBanner: ctaBannerSchema.optional(),
    body: z
      .array(
        z.object({
          title: z.string().min(1),
          text: z.string().min(1),
        }),
      )
      .optional(),
  }),
});

const pagesCollection = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/pages" }),
  schema: z.object({
    locale: z.enum(["pt", "en"]),
    pageKey: z.string().min(1),
    routeSlug: z.string().min(1),
    status: z.enum(["draft", "published"]).default("draft"),
    templateId: z.enum([
      "quality-page",
      "certification-page",
      "landing-simple",
      "faq-page",
      "legal-page",
    ]),
    metadata: seoSchema,
    hero: heroSchema,
    sections: z.array(templateSectionSchema).min(1),
    ctaBanner: ctaBannerSchema.optional(),
  }),
});

const blogCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    locale: z.enum(["pt", "en"]),
    slug: z.string().min(1),
    title: z.string().min(1),
    excerpt: z.string().min(1),
    category: z.string().min(1),
    publishedAt: z.coerce.date(),
    heroImage: z.string().min(1),
    featured: z.boolean().default(false),
    seo: seoSchema,
  }),
});

const settingsCollection = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/settings" }),
  schema: z.object({
    locale: z.enum(["pt", "en"]).optional(),
    nav: z
      .object({
        solutionsLabel: z.string().min(1),
        platformLabel: z.string().min(1),
        directLinks: z.array(
          z.object({
            label: z.string().min(1),
            href: z.string().min(1),
            enabled: z.boolean().default(true),
          }),
        ),
        demoCta: linkSchema,
      })
      .optional(),
    footer: z
      .object({
        followLabel: z.string().min(1),
        columns: z.array(
          z.object({
            title: z.string().min(1),
            links: z.array(linkSchema),
          }),
        ),
        demoCta: linkSchema,
        copyright: z.string().min(1),
      })
      .optional(),
    forms: z.record(
      z.string(),
      z.object({
        type: z.enum(["webhook", "iframe"]),
        endpoint: z.string().nullable(),
        successMessage: z.string().min(1),
        errorMessage: z.string().min(1),
      }),
    ).optional(),
    items: z
      .array(
        z.object({
          id: z.string().min(1),
          name: z.string().min(1),
          logo: z.string().min(1),
          url: z.string().optional(),
        }),
      )
      .optional(),
    enabled: z.boolean().optional(),
    ga4: z.string().nullable().optional(),
    metaPixel: z.string().nullable().optional(),
    linkedin: z.string().nullable().optional(),
  }),
});

export const collections = {
  site: siteCollection,
  pages: pagesCollection,
  blog: blogCollection,
  settings: settingsCollection,
};
