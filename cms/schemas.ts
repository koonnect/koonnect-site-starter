import { z } from "zod";

export const LocaleSchema = z.enum(["pt", "en"]);

export const LinkSchema = z.object({
  label: z.string().min(1),
  href: z.string().min(1),
});

export const HeroSplitSchema = z.object({
  sectionId: z.literal("hero-split"),
  eyebrow: z.string().min(1),
  title: z.array(z.string().min(1)).min(1),
  description: z.string().min(1),
  primaryCta: LinkSchema,
  secondaryCta: LinkSchema.optional(),
  media: z.object({ src: z.string().min(1), alt: z.string().min(1) }).optional(),
});

export const HeroCenteredSchema = z.object({
  sectionId: z.literal("hero-centered"),
  eyebrow: z.string().min(1),
  title: z.array(z.string().min(1)).min(1),
  description: z.string().min(1),
  primaryCta: LinkSchema,
  secondaryCta: LinkSchema.optional(),
});

export const HeroSchema = z.discriminatedUnion("sectionId", [HeroSplitSchema, HeroCenteredSchema]);

export const FeatureGridSchema = z.object({
  sectionId: z.literal("feature-grid"),
  eyebrow: z.string().min(1),
  title: z.array(z.string().min(1)).min(1),
  description: z.string().min(1),
  items: z.array(z.object({ title: z.string().min(1), description: z.string().min(1) })).min(1),
});

export const LogoStripSchema = z.object({
  sectionId: z.literal("logo-strip"),
  eyebrow: z.string().min(1),
  title: z.string().min(1),
  logos: z.array(z.object({ name: z.string().min(1), src: z.string().min(1), alt: z.string().min(1) })).min(1),
});

export const ComparisonSchema = z.object({
  sectionId: z.literal("comparison-two-column"),
  eyebrow: z.string().min(1),
  heading: z.array(z.string().min(1)).min(1),
  without: z.array(z.string().min(1)).min(1),
  with: z.array(z.string().min(1)).min(1),
});

export const TimelineSchema = z.object({
  sectionId: z.literal("timeline"),
  eyebrow: z.string().min(1),
  title: z.array(z.string().min(1)).min(1),
  steps: z.array(z.object({ title: z.string().min(1), text: z.string().min(1) })).min(2),
});

export const FaqSchema = z.object({
  sectionId: z.literal("faq"),
  eyebrow: z.string().min(1),
  title: z.array(z.string().min(1)).min(1),
  items: z.array(z.object({ question: z.string().min(1), answer: z.string().min(1) })).min(1),
});

export const CtaBannerSchema = z.object({
  sectionId: z.literal("cta-banner"),
  title: z.array(z.string().min(1)).min(1),
  description: z.string().min(1),
  primaryCta: LinkSchema,
});

export const ContactPanelSchema = z.object({
  sectionId: z.literal("contact-panel"),
  eyebrow: z.string().min(1),
  title: z.array(z.string().min(1)).min(1),
  description: z.string().min(1),
  details: z.array(z.object({ label: z.string().min(1), value: z.string().min(1), href: z.string().optional() })).min(1),
  primaryCta: LinkSchema,
});

export const LegalBodySchema = z.object({
  sectionId: z.literal("legal-body"),
  eyebrow: z.string().min(1),
  title: z.array(z.string().min(1)).min(1),
  blocks: z.array(z.object({ title: z.string().min(1), text: z.string().min(1) })).min(1),
});

export const TemplateSectionSchema = z.discriminatedUnion("sectionId", [
  FeatureGridSchema,
  ComparisonSchema,
  TimelineSchema,
  FaqSchema,
  ContactPanelSchema,
  LegalBodySchema,
  LogoStripSchema,
]);

export const SeoSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
});

export const SitePageSchema = z.object({
  locale: LocaleSchema,
  pageKey: z.enum(["home", "about", "pricing", "contact"]),
  routeSlug: z.string(),
  siteName: z.string().min(1),
  metadata: SeoSchema,
  hero: HeroSplitSchema,
  featureGrid: FeatureGridSchema.optional(),
  logoStrip: LogoStripSchema.optional(),
  comparison: ComparisonSchema.optional(),
  ctaBanner: CtaBannerSchema.optional(),
  body: z.array(z.object({ title: z.string().min(1), text: z.string().min(1) })).optional(),
});

export const TemplatePageSchema = z.object({
  locale: LocaleSchema,
  pageKey: z.string().min(1),
  routeSlug: z.string().min(1),
  status: z.enum(["draft", "published"]),
  templateId: z.enum(["quality-page", "certification-page", "landing-simple", "faq-page", "legal-page"]),
  metadata: SeoSchema,
  hero: HeroSchema,
  sections: z.array(TemplateSectionSchema).min(1),
  ctaBanner: CtaBannerSchema.optional(),
});

export const MenuSettingsSchema = z.object({
  locale: LocaleSchema,
  nav: z.object({
    solutionsLabel: z.string().min(1),
    platformLabel: z.string().min(1),
    directLinks: z.array(z.object({ label: z.string().min(1), href: z.string().min(1), enabled: z.boolean() })),
    demoCta: LinkSchema,
  }),
  footer: z.object({
    followLabel: z.string().min(1),
    columns: z.array(z.object({ title: z.string().min(1), links: z.array(LinkSchema) })),
    demoCta: LinkSchema,
    copyright: z.string().min(1),
  }),
});

export const FormSettingsSchema = z.object({
  locale: LocaleSchema,
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

export const CertificationSchema = z.object({
  items: z.array(z.object({ id: z.string().min(1), name: z.string().min(1), logo: z.string().min(1), url: z.string().optional() })),
});

export const AnalyticsSchema = z.object({
  enabled: z.boolean(),
  ga4: z.string().nullable(),
  metaPixel: z.string().nullable(),
  linkedin: z.string().nullable(),
});
