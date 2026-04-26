export const locales = ["pt", "en"] as const;

export type Locale = (typeof locales)[number];

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function oppositeLocale(locale: Locale): Locale {
  return locale === "pt" ? "en" : "pt";
}
