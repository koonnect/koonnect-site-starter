// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  // __TENANT_SITE_URL__ is a marker swapped by the `koonnect new-site`
  // CLI on scaffold (e.g. acme.koonnect.me). Leave it in the starter
  // verbatim — a forgotten replacement is immediately visible in
  // <link rel=canonical>, sitemap.xml, robots.txt.
  site: "https://__TENANT_SITE_URL__",
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [sitemap()],
});
