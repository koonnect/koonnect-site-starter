import type { Locale } from "../routing/locales";
import { absoluteUrl } from "./metadata";

export type JsonLd = Record<string, unknown>;

type BaseStructuredDataInput = {
  locale: Locale;
  title: string;
  description: string;
  pathname: string;
};

export function buildBaseStructuredData(input: BaseStructuredDataInput): JsonLd[] {
  const url = absoluteUrl(`/${input.locale}${input.pathname === "/" ? "" : input.pathname}`);

  return [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Koonnect",
      url: absoluteUrl(`/${input.locale}`),
      logo: absoluteUrl("/logo-mark.png"),
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Koonnect Site Starter",
      url: absoluteUrl(`/${input.locale}`),
      inLanguage: input.locale,
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: input.title,
      description: input.description,
      url,
      inLanguage: input.locale,
    },
  ];
}

export function buildArticleJsonLd(input: BaseStructuredDataInput & { publishedAt: Date; image: string }): JsonLd {
  const url = absoluteUrl(`/${input.locale}${input.pathname}`);

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    datePublished: input.publishedAt.toISOString(),
    image: absoluteUrl(input.image),
    mainEntityOfPage: url,
    inLanguage: input.locale,
    publisher: {
      "@type": "Organization",
      name: "Koonnect",
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/logo-mark.png"),
      },
    },
  };
}
