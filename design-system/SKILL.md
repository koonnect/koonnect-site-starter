---
name: koonnect-site-starter
description: Use this skill to convert a Figma marketing layout into a Koonnect CMS-compatible tenant theme using the starter catalog, content model, and design-system constraints.
user-invocable: true
---

Read `README.md`, `cms/section-catalog.ts`, and this file before creating or adapting any layout.

## Starter-level rules

- Never hardcode editable copy in React components.
- First map the Figma layout to existing starter sections.
- Extract tokens, spacing, radius, and typography decisions before building.
- Keep `layout`, `content`, and `theme` separate.
- Use stable content target IDs.
- Any semantic multiline headline must use `lines[]`.
- Any new section must declare:
  - props schema
  - visual constraints
  - CMS target map
  - where its content lives in `content/**`

## Conversion workflow

1. Inspect Figma and identify candidate sections from the starter catalog.
2. Capture the tenant's tokens in `design-system/**`.
3. Adapt or compose starter sections.
4. Move all editable content into `content/**`.
5. Run `pnpm cms:targets` to refresh `.targets.json`.
6. Only then refine visual fidelity.

## What success looks like

- the tenant matches the brand and layout intent
- the structure remains reusable
- the editorial engine can find and update content without touching code
