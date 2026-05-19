# CLAUDE.md — __TENANT_NAME__

> **This is a Koonnect tenant scaffolded from `koonnect-site-starter`.**
> The `__TENANT_NAME__` / `__TENANT_SLUG__` markers below were either
> filled in by `koonnect new-site` on scaffold or are still placeholders
> if you read this in the starter repo itself.

## Project Overview

Commercial site for **__TENANT_NAME__**, built on the Koonnect platform:
Astro for the static site, `@koonnect/cms-core` for shared schemas, and
the Koonnect Control Plane (`cms.koonnect.me`) for editorial — Visual
Editor, change-sets, publish flow, audit log.

## Commands

```bash
pnpm dev          # Dev server (port 4321)
pnpm cms:targets  # Regenerate cms/.targets.json
pnpm cms:validate # Validate src/content/** against Zod schemas
pnpm build        # Production build (Astro → dist/)
pnpm preview      # Serve dist/ locally
```

## Stack

- **Framework:** Astro 6
- **Styling:** Tailwind CSS 4
- **Content:** Astro Content Collections, JSON files under `src/content/`
- **Schemas:** Zod in `cms/schemas.ts` (mostly tenant-local for now;
  shared schemas will migrate to `@koonnect/cms-core` in a follow-up
  sprint)
- **Deploy:** Cloudflare Pages via GitHub Actions
  (`.github/workflows/cloudflare-pages.yml`)
- **CMS:** Edited via Koonnect Control Plane at `cms.koonnect.me`

## Project Structure

```
cms/
  schemas.ts            Zod schemas (sections, pages, settings)
  field-definitions.ts  Editor field metadata
  templates.ts          Page templates
  .targets.json         Generated: every editable leaf path → file
  
scripts/
  cms-validate.mjs            Validates content against schemas
  generate-content-targets.ts Regenerates .targets.json
  
src/
  content/
    site/         {locale}-{pageKey}.json — homepage, about, etc.
    pages/        {locale}-{templateId}.json — template-driven pages
    settings/     analytics, menus, forms, certifications
  pages/          .astro routes
  layouts/        Layout components
  components/     UI components
  styles/         Tailwind entry
```

## Conventions

- Content lives in JSON under `src/content/**` — never inline copy in
  `.astro` files. The Visual Editor relies on this convention.
- Every editable text field needs a `data-edit-path` marker in the
  rendering component matching the schema path
  (e.g. `data-edit-path="hero.title.0"`). See `cms/scope.md`.
- Component files use semantic Tailwind tokens (`bg-surface-card`,
  `text-brand-primary`) defined in `src/styles/global.css` so a future
  tenant only re-tokens, never re-codes.
- New shared sections go in `@koonnect/cms-core`; tenant-specific ones
  stay local. Drift between tenants is the failure mode this avoids.

## Related

- **Koonnect Control Plane** — `cms.koonnect.me` (Hetzner-hosted Next.js
  app). Source: `github.com/koonnect/koonnect-cms-control-plane`.
- **Koonnect CLI** — `pnpm add -g @koonnect/cli`. Created this repo via
  `koonnect new-site __TENANT_SLUG__`.
- **Starter** — `github.com/koonnect/koonnect-site-starter` (this repo
  before the CLI customized it).
