import { getCollection } from "astro:content";
import type { Locale } from "../routing/locales";

export async function getBlogEntries(locale: Locale) {
  const entries = await getCollection("blog", ({ data }) => data.locale === locale);
  return entries.sort((a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime());
}

export async function getBlogEntry(locale: Locale, slug: string) {
  const entries = await getBlogEntries(locale);
  const entry = entries.find((item) => item.data.slug === slug);

  if (!entry) {
    throw new Error(`Blog entry ${locale}/${slug} not found.`);
  }

  return entry;
}
