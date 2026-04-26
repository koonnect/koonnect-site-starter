import { getCollection } from "astro:content";
import type { Locale } from "../routing/locales";

export async function getSiteEntry(locale: Locale, slug: "home" | "about" | "pricing" | "contact") {
  const entries = await getCollection("site");
  const entry = entries.find((item) => item.data.locale === locale && item.data.pageKey === slug);

  if (!entry) {
    throw new Error(`Site entry ${locale}/${slug} not found.`);
  }

  return entry;
}

export async function getPageEntryByRoute(locale: Locale, routeSlug: string) {
  const [siteEntries, pageEntries] = await Promise.all([
    getCollection("site"),
    getCollection("pages"),
  ]);

  return (
    siteEntries.find((item) => item.data.locale === locale && item.data.routeSlug === routeSlug && item.data.pageKey !== "home") ??
    pageEntries.find((item) => item.data.locale === locale && item.data.routeSlug === routeSlug)
  );
}
