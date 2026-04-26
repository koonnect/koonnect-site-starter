# Koonnect CMS Scope

This repo is the Astro starter for Koonnect CMS tenant sites. The CMS is Git-based and operated by a shared conversational control plane.

## Roles

### client
- Can edit structured content in `src/content/**`.
- Can update contact details, menu visibility, certifications, form settings and blog posts.
- Can request a preview change set.
- Cannot publish without an explicit approval step.

### admin
- Can do everything `client` can do.
- Can create pages from approved templates in `cms/templates.ts`.
- Can approve and publish change sets.
- Can update Zaraz IDs and Cloudflare/R2 metadata through the control plane.

### global_admin
- Can provision tenants, invite users, revoke memberships and manage Cloudflare/GitHub/Neon tenant metadata.

### developer
- Works outside MCP.
- May edit `src/components/**`, `src/layouts/**`, `src/pages/**`, styling, dependencies and approved templates directly in code.

## Hard Boundaries For MCP

MCP tools may write only:
- `src/content/**`
- `cms/change-sets/**`
- R2 prefixes managed for the current tenant

MCP tools must not write:
- `src/components/**`
- `src/layouts/**`
- `src/pages/**`
- `src/styles/**`
- `package.json`
- raw scripts or arbitrary embeds

Every write must validate against schemas before commit. The design-system `SKILL.md` must be loaded before generating copy, blog posts or new page content.
