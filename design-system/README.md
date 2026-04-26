# Koonnect Site Starter Design System

Este design system e a base editorial e visual do starter. Nao representa uma marca unica; serve para acelerar a criacao de tenants novos e para orientar agentes de vibe coding durante conversao de Figma para layout CMS-compatible.

---

## Purpose

- fornecer uma base dark-mode limpa
- dar consistencia tipografica e de espacamento ao starter
- suportar secao-catalogo, templates e content targets
- permitir que cada tenant sobreponha branding sem rebentar a arquitetura

## How to use it

1. Use o starter-level guide em `SKILL.md`.
2. Captura tokens e regras da marca do tenant.
3. Guarda overrides do tenant em `design-system/**`.
4. Reutiliza ou estende o catalogo de secoes.
5. Mantem o content model desacoplado do layout.

---

### Index

```
/
├── README.md                   ← this file
├── SKILL.md                    ← Agent-Skills-compatible entry point
├── colors_and_type.css         ← tokens legacy still useful as base
├── fonts/                      ← bundled fonts
├── assets/                     ← demo assets and logos
├── preview/                    ← static previews
├── sections/                   ← docs for approved starter sections
├── templates/                  ← docs for approved page templates
├── ui_kits/marketing-site/     ← high-fidelity sample UI kit used as reference
```

## Starter defaults

- dark-mode first
- large marketing container
- sentence-case titles
- restrained motion
- cards and CTA bands over full-page chrome
- headlines allowed to use one highlight term or line break for hierarchy

## Tenant overrides

Cada tenant deve documentar:

- tom de voz
- claims aprovados
- palavras proibidas
- logo e assets
- paleta e tipografia
- sections aprovadas
- templates aprovados

## Notes

- O starter ainda inclui um UI kit hi-fi e assets demo herdados do tenant inicial.
- Cada tenant deve acrescentar o seu proprio `design-system/README.md` ou `SKILL.md` com guardrails de marca.
- O objetivo do starter nao e ser neutro; e ser rapido, robusto e compatível com o CMS conversacional.
