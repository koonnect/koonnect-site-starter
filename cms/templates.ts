import { z } from "zod";
import { TemplatePageSchema } from "./schemas";

export const pageTemplates = {
  "quality-page": {
    id: "quality-page",
    label: "Pagina de Qualidade",
    routePrefix: "/quality",
    propsSchema: TemplatePageSchema,
    sections: ["hero", "sections", "ctaBanner"],
  },
  "certification-page": {
    id: "certification-page",
    label: "Pagina de Certificacao",
    routePrefix: "/certification",
    propsSchema: TemplatePageSchema,
    sections: ["hero", "sections", "ctaBanner"],
  },
  "landing-simple": {
    id: "landing-simple",
    label: "Landing Page Simples",
    routePrefix: "/landing",
    propsSchema: TemplatePageSchema,
    sections: ["hero", "sections", "ctaBanner"],
  },
  "faq-page": {
    id: "faq-page",
    label: "Pagina de FAQ",
    routePrefix: "/faq",
    propsSchema: TemplatePageSchema,
    sections: ["hero", "sections", "ctaBanner"],
  },
  "legal-page": {
    id: "legal-page",
    label: "Pagina Legal",
    routePrefix: "/legal",
    propsSchema: TemplatePageSchema,
    sections: ["hero", "sections", "ctaBanner"],
  },
} as const satisfies Record<
  string,
  {
    id: string;
    label: string;
    routePrefix: string;
    propsSchema: z.ZodTypeAny;
    sections: string[];
  }
>;

export type PageTemplateId = keyof typeof pageTemplates;
