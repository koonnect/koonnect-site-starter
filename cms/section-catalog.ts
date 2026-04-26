import { z } from "zod";
import {
  imageField,
  linesField,
  linkField,
  textField,
} from "./field-definitions";

const textBlockSchema = z.object({
  title: textField({ id: "section.item.title", label: "Item title" }),
  text: textField({ id: "section.item.text", label: "Item text", multiline: true }),
});

const faqItemSchema = z.object({
  question: textField({ id: "faq.item.question", label: "FAQ question" }),
  answer: textField({ id: "faq.item.answer", label: "FAQ answer", multiline: true }),
});

const logoItemSchema = z.object({
  name: textField({ id: "logo-strip.item.name", label: "Logo name" }),
  src: textField({ id: "logo-strip.item.src", label: "Logo src" }),
  alt: textField({ id: "logo-strip.item.alt", label: "Logo alt" }),
});

const contactDetailSchema = z.object({
  label: textField({ id: "contact-panel.detail.label", label: "Contact detail label" }),
  value: textField({ id: "contact-panel.detail.value", label: "Contact detail value" }),
  href: textField({ id: "contact-panel.detail.href", label: "Contact detail href" }).optional(),
});

export const sectionCatalog = [
  {
    sectionId: "hero-centered",
    label: "Hero Centered",
    allowedContentFields: ["eyebrow", "title", "description", "primaryCta", "secondaryCta"],
    visualConstraints: ["headline com largura controlada", "um foco principal", "acoes acima da dobra"],
    propsSchema: z.object({
      eyebrow: textField({ id: "hero-centered.eyebrow", label: "Hero eyebrow" }),
      title: linesField({ id: "hero-centered.title", label: "Hero title" }),
      description: textField({ id: "hero-centered.description", label: "Hero description", multiline: true }),
      primaryCta: linkField({ id: "hero-centered.primaryCta", label: "CTA principal" }),
      secondaryCta: linkField({ id: "hero-centered.secondaryCta", label: "CTA secundario" }),
    }),
    cmsTargetMap: [
      "hero-centered.eyebrow",
      "hero-centered.title",
      "hero-centered.description",
      "hero-centered.primaryCta",
      "hero-centered.secondaryCta",
    ],
  },
  {
    sectionId: "hero-split",
    label: "Hero Split",
    allowedContentFields: ["eyebrow", "title", "description", "primaryCta", "secondaryCta", "media"],
    visualConstraints: ["texto e media em duas colunas", "media nao deve carregar copy essencial"],
    propsSchema: z.object({
      eyebrow: textField({ id: "hero-split.eyebrow", label: "Hero eyebrow" }),
      title: linesField({ id: "hero-split.title", label: "Hero title" }),
      description: textField({ id: "hero-split.description", label: "Hero description", multiline: true }),
      primaryCta: linkField({ id: "hero-split.primaryCta", label: "CTA principal" }),
      secondaryCta: linkField({ id: "hero-split.secondaryCta", label: "CTA secundario" }),
      media: imageField({ id: "hero-split.media", label: "Hero media" }),
    }),
    cmsTargetMap: [
      "hero-split.eyebrow",
      "hero-split.title",
      "hero-split.description",
      "hero-split.primaryCta",
      "hero-split.secondaryCta",
      "hero-split.media",
    ],
  },
  {
    sectionId: "logo-strip",
    label: "Logo Strip",
    allowedContentFields: ["eyebrow", "title", "logos"],
    visualConstraints: ["logos legiveis em dark mode", "sem alturas demasiado diferentes"],
    propsSchema: z.object({
      eyebrow: textField({ id: "logo-strip.eyebrow", label: "Logo strip eyebrow" }),
      title: textField({ id: "logo-strip.title", label: "Logo strip title" }),
      logos: z.array(logoItemSchema).min(1),
    }),
    cmsTargetMap: ["logo-strip.eyebrow", "logo-strip.title", "logo-strip.item.name", "logo-strip.item.src", "logo-strip.item.alt"],
  },
  {
    sectionId: "feature-grid",
    label: "Feature Grid",
    allowedContentFields: ["eyebrow", "title", "description", "items"],
    visualConstraints: ["items em grid regular", "cards sem copy excessivo"],
    propsSchema: z.object({
      eyebrow: textField({ id: "feature-grid.eyebrow", label: "Feature grid eyebrow" }),
      title: linesField({ id: "feature-grid.title", label: "Feature grid title" }),
      description: textField({ id: "feature-grid.description", label: "Feature grid description", multiline: true }),
    }),
    cmsTargetMap: ["feature-grid.eyebrow", "feature-grid.title", "feature-grid.description"],
  },
  {
    sectionId: "comparison-two-column",
    label: "Comparison Two Column",
    allowedContentFields: ["eyebrow", "heading", "without", "with"],
    visualConstraints: ["comparacao equilibrada", "copy curto por coluna"],
    propsSchema: z.object({
      eyebrow: textField({ id: "comparison-two-column.eyebrow", label: "Comparison eyebrow" }),
      heading: linesField({ id: "comparison-two-column.heading", label: "Comparison heading" }),
    }),
    cmsTargetMap: ["comparison-two-column.eyebrow", "comparison-two-column.heading"],
  },
  {
    sectionId: "timeline",
    label: "Timeline",
    allowedContentFields: ["eyebrow", "title", "steps"],
    visualConstraints: ["etapas curtas e ordenadas", "nao usar mais de seis passos"],
    propsSchema: z.object({
      eyebrow: textField({ id: "timeline.eyebrow", label: "Timeline eyebrow" }),
      title: linesField({ id: "timeline.title", label: "Timeline title" }),
      steps: z.array(textBlockSchema).min(2),
    }),
    cmsTargetMap: ["timeline.eyebrow", "timeline.title", "section.item.title", "section.item.text"],
  },
  {
    sectionId: "cta-banner",
    label: "CTA Banner",
    allowedContentFields: ["title", "description", "primaryCta"],
    visualConstraints: ["um foco de acao", "titulo curto e forte"],
    propsSchema: z.object({
      title: linesField({ id: "cta-banner.title", label: "CTA banner title" }),
      description: textField({ id: "cta-banner.description", label: "CTA banner description", multiline: true }),
      primaryCta: linkField({ id: "cta-banner.primaryCta", label: "CTA banner action" }),
    }),
    cmsTargetMap: ["cta-banner.title", "cta-banner.description", "cta-banner.primaryCta"],
  },
  {
    sectionId: "faq",
    label: "FAQ",
    allowedContentFields: ["eyebrow", "title", "items"],
    visualConstraints: ["perguntas curtas", "respostas escaneaveis"],
    propsSchema: z.object({
      eyebrow: textField({ id: "faq.eyebrow", label: "FAQ eyebrow" }),
      title: linesField({ id: "faq.title", label: "FAQ title" }),
      items: z.array(faqItemSchema).min(1),
    }),
    cmsTargetMap: ["faq.eyebrow", "faq.title", "faq.item.question", "faq.item.answer"],
  },
  {
    sectionId: "blog-list",
    label: "Blog List",
    allowedContentFields: ["eyebrow", "title", "description"],
    visualConstraints: ["cards consistentes", "meta curta e clara"],
    propsSchema: z.object({
      eyebrow: textField({ id: "blog-list.eyebrow", label: "Blog list eyebrow" }),
      title: linesField({ id: "blog-list.title", label: "Blog list title" }),
      description: textField({ id: "blog-list.description", label: "Blog list description", multiline: true }),
    }),
    cmsTargetMap: ["blog-list.eyebrow", "blog-list.title", "blog-list.description"],
  },
  {
    sectionId: "legal-body",
    label: "Legal Body",
    allowedContentFields: ["eyebrow", "title", "bodyBlocks"],
    visualConstraints: ["hierarquia tipografica clara", "largura de leitura controlada"],
    propsSchema: z.object({
      eyebrow: textField({ id: "legal-body.eyebrow", label: "Legal eyebrow" }),
      title: linesField({ id: "legal-body.title", label: "Legal title" }),
      blocks: z.array(textBlockSchema).min(1),
    }),
    cmsTargetMap: ["legal-body.eyebrow", "legal-body.title", "section.item.title", "section.item.text"],
  },
  {
    sectionId: "contact-panel",
    label: "Contact Panel",
    allowedContentFields: ["eyebrow", "title", "description", "form"],
    visualConstraints: ["contactos acionaveis", "um CTA claro"],
    propsSchema: z.object({
      eyebrow: textField({ id: "contact-panel.eyebrow", label: "Contact eyebrow" }),
      title: linesField({ id: "contact-panel.title", label: "Contact title" }),
      description: textField({ id: "contact-panel.description", label: "Contact description", multiline: true }),
      details: z.array(contactDetailSchema).min(1),
      primaryCta: linkField({ id: "contact-panel.primaryCta", label: "Contact primary CTA" }),
    }),
    cmsTargetMap: [
      "contact-panel.eyebrow",
      "contact-panel.title",
      "contact-panel.description",
      "contact-panel.detail.label",
      "contact-panel.detail.value",
      "contact-panel.detail.href",
      "contact-panel.primaryCta",
    ],
  },
] as const;

export type StarterSectionId = (typeof sectionCatalog)[number]["sectionId"];
