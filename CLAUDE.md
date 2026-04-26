# CLAUDE.md — KOORTEX Commercial Site

## Project Overview

Site comercial do **KOORTEX** (AI Company OS). Originalmente era o site da KOONNECT (e-commerce), foi transformado para promover o KOORTEX — um sistema operativo inteligente com agentes de IA autónomos por departamento.

## Commands

```bash
pnpm dev      # Dev server (port 3000)
pnpm build    # Production build
pnpm start    # Run production
pnpm lint     # ESLint
```

## Tech Stack
- **Framework:** Next.js 16, React 19, TypeScript 5
- **Styling:** Tailwind CSS 4.2, custom dark theme
- **Animation:** Framer Motion 12
- **Font:** Poppins (300-800)
- **Icons:** Lucide React
- **No UI library** — all components custom Tailwind

## Design System (Dark Mode)

```css
--color-k-dark: #202020     /* body bg */
--color-k-gray: #1f1f1f     /* cards/sections */
--color-k-card: #161616     /* card bg */
--color-k-border: #333333   /* borders */
--color-k-blue: #0093fc     /* primary CTA */
--color-k-yellow: #fcc000   /* accent/featured */
--color-k-text: #c7c7c7     /* body text */
```

**Patterns:**
- `rounded-[15px]` for cards, `rounded-full` for buttons/pills
- `max-w-7xl mx-auto px-8` container
- Gradient text: `text-transparent bg-clip-text bg-gradient-to-r from-[#0093FC] to-[#FCC000]`
- Cards: `bg-k-card border border-k-border rounded-[15px]`
- CTA primary: `bg-k-blue hover:bg-blue-600 text-white rounded-full shadow-[0_0_15px_rgba(0,147,252,0.3)]`

## Figma Reference
- **File:** `t2uwt3X2r1JEmgUT0CR0G4` (Layout Koonnect 25 darkmode)
- **Pages (node IDs):**
  - `0:1453` — Homepage (1440x4675)
  - `0:1185` — Menu/Navbar with mega-dropdowns
  - `0:1224` — Homepage hover states
  - `0:396` — Solutions main page (1440x5745)
  - `0:198` — Platform detail page (1440x5136)
  - `0:90` — Contactos (1440x2036)
  - `0:966` — Blog listing (1440x1942)
  - `0:721` — Blog detail (1440x2388)
  - `0:873` — Cases listing (1440x2486)
  - `0:2` — Case detail (1440x4046)
- **Fidelity pass still pending** — layout matches but pixel-perfect comparison not done yet

## Sitemap & Routes

```
/                               Homepage (9 sections)
/solucoes/crm                   CRM AI-First
/solucoes/agente-autonomo       Agente Autónomo (personas IA)
/solucoes/hub-integracoes       Hub de Integrações (ERP, e-commerce)
/solucoes/analytics             Analytics & Relatórios
/plataforma/motor-ia            Motor de IA (personas, sensors, RAG)
/plataforma/multi-canal         Multi-Canal (Telegram, Teams, WhatsApp, Live Chat)
/plataforma/automacao           Automação (SOPs, workflows, proactive)
/plataforma/integracoes         Integrações (MCP, ZLINK HUB, adapters)
/casos-de-uso                   Use Cases listing (5 cases)
/casos-de-uso/[slug]            Use case detail
/precos                         Pricing (Base/Premium/Enterprise)
/sobre                          About KOORTEX
/blog                           Blog (6 articles, AI themes)
/blog/[slug]                    Blog detail
/contactos                      Contact + Demo form
```

## Navigation Structure

**Dropdown "Soluções"** (o que oferecemos):
- CRM AI-First → `/solucoes/crm`
- Agente Autónomo → `/solucoes/agente-autonomo`
- Hub de Integrações → `/solucoes/hub-integracoes`
- Analytics & Relatórios → `/solucoes/analytics`

**Dropdown "Plataforma"** (como funciona):
- Motor de IA → `/plataforma/motor-ia`
- Multi-Canal → `/plataforma/multi-canal`
- Automação → `/plataforma/automacao`
- Integrações → `/plataforma/integracoes`

**Direct links:** Casos de Uso, Preços, Blog
**CTA:** "Pedir Demo" → `/contactos#demo`

## Project Structure

```
app/
├── page.tsx                    # Homepage (imports 9 section components)
├── layout.tsx                  # Root layout (metadata, JSON-LD, Navbar, Footer)
├── globals.css                 # Theme colors, Tailwind config
├── sitemap.ts                  # All 19 routes
├── solucoes/[slug]/page.tsx    # Solutions pages (635+ lines, 7 sections each)
├── plataforma/[slug]/page.tsx  # Platform pages (tabbed interface)
├── casos-de-uso/               # Use cases listing + [slug] detail
├── precos/page.tsx             # Pricing 3-tier page
├── sobre/page.tsx              # About page
├── blog/                       # Blog listing + [slug] detail
├── contactos/                  # Contact page + ContactosForm.tsx
├── casos-de-sucesso/           # OLD — kept for backwards compat, to be removed
└── api/newsletter/route.ts     # Newsletter/contact form handler

components/
├── layout/
│   ├── Navbar.tsx              # Sticky navbar, 2 mega-dropdowns, mobile TODO
│   └── Footer.tsx              # 4-column footer, social links
├── home/
│   ├── HeroSection.tsx         # Hero with search bar + CTAs
│   ├── EcommerceSection.tsx    # → AgentShowcase (2-col: image + text)
│   ├── PillarsSection.tsx      # → ModulesSection (4 solution pillars)
│   ├── CtaMidSection.tsx       # 3-col CTA section
│   ├── CtaBannerSection.tsx    # Yellow-bordered CTA banner
│   ├── CasesSection.tsx        # Client logos grid
│   ├── NewsSection.tsx         # 3 article cards
│   ├── PressSection.tsx        # Press/recognition logos
│   └── NewsletterSection.tsx   # Email subscription form
└── FadeUp.tsx                  # Reusable framer-motion animation wrapper
```

## Key Conventions

- All pages use `'use client'` (client components with framer-motion)
- `generateStaticParams` NOT compatible with `'use client'` — don't add it
- Data is hardcoded in page files (no CMS/API)
- Animation pattern: `initial={{ opacity: 0, y: 24 }}` + `whileInView` + `viewport={{ once: true, margin: '-60px' }}`
- FadeUp wrapper for staggered animations
- Forms POST to `/api/newsletter` (logs only, no persistence)
- Images in `/public/images/` — mostly placeholders

## KOORTEX Product Context (for content)

KOORTEX é um **AI Company OS** — sistema operativo inteligente para empresas:
- **Personas de IA** configuráveis por departamento (vendas, suporte, marketing, operações)
- **Multi-canal:** Telegram, Teams, WhatsApp, Live Chat, Email, REST API
- **CRM AI-First:** leads, entities, deals, pipeline com IA conversacional
- **Automação:** SOPs, workflows, ações proativas, draft/approve system
- **Integrações:** MCP servers, ZLINK HUB (multi-ERP), Moloni, Shopify
- **Analytics:** Report builder, dashboards custom, KPIs, visão 360°
- **Knowledge Base:** RAG com documentos e FAQ
- **Pricing:** Base (1 persona, CRM) / Premium (tudo, ilimitado) / Enterprise (custom, SLA)

## Pending Work

1. **Figma fidelity pass** — compare each page @1440px vs Figma screenshots, fix spacing/typography/colors
2. **Mobile hamburger menu** — Navbar has no mobile menu (hidden on `lg:`)
3. **Hover states** — Figma frame 0:1224 has mouseover states not implemented
4. **Google Maps embed** — missing from contactos page
5. **Business hours** — missing from contactos page
6. **Remove `/casos-de-sucesso`** — old route still exists, redirect to `/casos-de-uso`
7. **Logo** — using KOONNECT logo as variant, may need KOORTEX-specific logo
8. **OG image** — `/og-image.jpg` still references old design
9. **Real content/images** — all images are placeholders

## Related Projects

- **Koonnect CRM** (`~/Code/koonnect-crm`) — the actual KOORTEX platform (Next.js app with KOORTEX agent, personas, integrations, etc.)
- **Plan docs** in CRM: `docs-dev/PLAN_production_readiness.md`, `docs-dev/PLAN_zlink_hub_integration.md`
