import { getCollection } from "astro:content";
import type { Locale } from "../routing/locales";

export async function getSettings(locale: Locale) {
  const settings = await getCollection("settings");
  const menus = settings.find((item) => item.id === `menus-${locale}`);
  const forms = settings.find((item) => item.id === `forms-${locale}`);
  const certifications = settings.find((item) => item.id === "certifications");
  const analytics = settings.find((item) => item.id === "analytics");

  return {
    menus: menus?.data,
    forms: forms?.data,
    certifications: certifications?.data,
    analytics: analytics?.data,
  };
}
