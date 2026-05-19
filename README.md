# Koonnect Site Starter

Starter opinativo para sites comerciais multi-tenant ligados ao Koonnect CMS.

Este repo e a base dos sites publicados. O chat, approvals, preview orchestration e canais conversacionais vivem fora daqui, no `koonnect-cms-control-plane`.

## Stack

- Astro 6
- Tailwind CSS 4
- Content Collections em `src/content`
- Cloudflare Pages para deploy dos tenants

## Principios

- Todo o conteudo editorial vive em `src/content/**`
- Todo o layout vive em `src/components/**`, `src/layouts/**` e `src/pages/**`
- Targets editaveis sao declarados no schema e indexados em `cms/.targets.json`
- O starter adapta-se ao Figma; nao deve criar uma arquitetura nova por tenant sem necessidade

## Estrutura

```txt
src/
  content/
  content.config.ts
  components/
  layouts/
  pages/
  lib/
  styles/

cms/
  field-definitions.ts
  schemas.ts
  section-catalog.ts
  templates.ts
  content-targets.ts
  .targets.json

design-system/
  SKILL.md
  README.md
  tokens.css
```

## Scripts

```bash
pnpm dev
pnpm cms:targets
pnpm cms:validate
pnpm lint
pnpm build
```

`pnpm cms:targets` gera `cms/.targets.json`, o indice usado pelo editorial engine.

## O que ja vem pronto

- Homepage base com hero, feature grid, comparison e CTA banner
- Header/Footer CMS-ready
- Blog listing/detail
- Template page base
- SEO base, sitemap, robots e `llms.txt`
- Guide do agente e design system base

## Notas

- Este repo ainda usa conteudo demo inspirado no KOORTEX para acelerar a fase de fundacao.
- O primeiro tenant real sera derivado deste starter, nao o contrario.

## CLI placeholders

Estes ficheiros contêm marcadores `__TENANT_*__` que o `koonnect new-site`
substitui no scaffold:

| Ficheiro | Marcador | Substituído por |
|---|---|---|
| `astro.config.mjs` | `__TENANT_SITE_URL__` | URL final, e.g. `acme.koonnect.me` |
| `.github/workflows/cloudflare-pages.yml` | `__TENANT_PAGES_PROJECT__` | CF Pages project, e.g. `acme-site` |
| `CLAUDE.md` | `__TENANT_NAME__`, `__TENANT_SLUG__` | Display name + slug |
| `package.json` | `name: "koonnect-site-starter"` | `<slug>-site-astro` (string match, não marcador) |

Se editares manualmente o starter mantém os marcadores intactos — são
inválidos como hosts/projects propositadamente, para que um esquecimento
falhe ruidoso em vez de silencioso.
