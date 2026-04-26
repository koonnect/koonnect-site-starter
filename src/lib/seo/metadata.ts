import type { Locale } from "../routing/locales";

export function absoluteUrl(pathname: string) {
  return new URL(pathname, "https://starter.koonnect.dev").toString();
}

export function buildCanonical(locale: Locale, pathname: string) {
  return absoluteUrl(`/${locale}${pathname === "/" ? "" : pathname}`);
}
