/**
 * Starter CMS schemas — barrel over `@koonnect/cms-core` with the
 * starter-specific bits layered on top.
 *
 * The starter ships BOTH hero variants out-of-the-box (most tenants
 * pick just one), so the local `HeroSchema` is the discriminated
 * union of cms-core's `HeroSplitSchema` + `HeroCenteredSchema`.
 * Tenants that only need one variant should narrow this in their
 * `cms/schemas/<tenant>.ts` extension instead of redefining it.
 *
 * Why a barrel + selective re-export instead of `export *`? cms-core
 * exports a single `HeroSchema` (the split variant) — re-exporting
 * star would collide with our local discriminated `HeroSchema`. So
 * we name every re-export explicitly, then layer our overrides.
 */

import { z } from "zod";

export {
  // Primitives
  LocaleSchema,
  LinkSchema,
  SeoSchema,
  // Hero variants — local HeroSchema below combines them
  HeroSplitSchema,
  HeroCenteredSchema,
  // Portable sections (identical shapes between starter + cms-core,
  // confirmed via diff at migration time)
  FeatureGridSchema,
  LogoStripSchema,
  ComparisonSchema,
  TimelineSchema,
  FaqSchema,
  CtaBannerSchema,
  ContactPanelSchema,
  LegalBodySchema,
  // Forms (cms-core ships these; starter previously lacked them)
  FormFieldSchema,
  FormSchema,
  // Page-level wrappers
  TemplateSectionSchema,
  TemplatePageSchema,
  AiOrUnknownSectionSchema,
  // Settings (portable site-config primitives)
  SettingsCollectionSchema,
  MenuSettingsSchema,
  FormSettingsSchema,
  CertificationSchema,
  AnalyticsSchema,
} from "@koonnect/cms-core/schemas/base";

import {
  HeroSplitSchema,
  HeroCenteredSchema,
} from "@koonnect/cms-core/schemas/base";

/**
 * Hero union — discriminated by `sectionId` so the editor can flip
 * between split + centered layouts without touching the page schema.
 *
 * Tenants that ship only one variant should re-narrow this in their
 * tenant-specific schemas file:
 *   `export const HeroSchema = HeroSplitSchema;`
 */
export const HeroSchema = z.discriminatedUnion("sectionId", [
  HeroSplitSchema,
  HeroCenteredSchema,
]);

/**
 * Site-level page (home/about/pricing/contact). Starter-specific
 * because the `pageKey` enum + `siteName` field are organisational
 * conventions of the starter scaffold, not portable primitives. A
 * tenant that drops these conventions should not have a SitePageSchema
 * — they author their own page wrapper.
 */
export const SitePageSchema = z.object({
  locale: z.enum(["pt", "en"]),
  pageKey: z.enum(["home", "about", "pricing", "contact"]),
  routeSlug: z.string(),
  siteName: z.string().min(1),
  metadata: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
  }),
  hero: HeroSplitSchema, // starter pages use the split hero specifically
  featureGrid: z
    .object({
      sectionId: z.literal("feature-grid"),
      eyebrow: z.string().min(1),
      title: z.array(z.string().min(1)).min(1),
      description: z.string().min(1),
      items: z
        .array(
          z.object({
            title: z.string().min(1),
            description: z.string().min(1),
          }),
        )
        .min(1),
    })
    .optional(),
  logoStrip: z
    .object({
      sectionId: z.literal("logo-strip"),
      eyebrow: z.string().min(1),
      title: z.string().min(1),
      logos: z
        .array(
          z.object({
            name: z.string().min(1),
            src: z.string().min(1),
            alt: z.string().min(1),
          }),
        )
        .min(1),
    })
    .optional(),
  comparison: z
    .object({
      sectionId: z.literal("comparison-two-column"),
      eyebrow: z.string().min(1),
      heading: z.array(z.string().min(1)).min(1),
      without: z.array(z.string().min(1)).min(1),
      with: z.array(z.string().min(1)).min(1),
    })
    .optional(),
  ctaBanner: z
    .object({
      sectionId: z.literal("cta-banner"),
      title: z.array(z.string().min(1)).min(1),
      description: z.string().min(1),
      primaryCta: z.object({
        label: z.string().min(1),
        href: z.string().min(1),
      }),
    })
    .optional(),
  body: z
    .array(
      z.object({
        title: z.string().min(1),
        text: z.string().min(1),
      }),
    )
    .optional(),
});
