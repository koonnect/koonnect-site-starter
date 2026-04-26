# AGENTS.md — Koonnect Site Starter

## Missao

Este repo existe para transformar um design vindo do Figma num site comercial production-ready e compativel com o Koonnect CMS.

O teu trabalho nao e copiar um screenshot. O teu trabalho e:

- mapear o design para primitives e secoes do starter
- preservar a identidade visual do tenant
- manter separacao entre `layout`, `content` e `theme`
- deixar o resultado editavel pelo CMS conversacional

## Regras de ouro

1. Nunca hardcodar copy editavel em componentes ou layouts.
2. Todo o texto editavel vive em `src/content/**`.
3. Antes de criar uma secao nova, tenta mapear o Figma para o catalogo em `cms/section-catalog.ts`.
4. Se a quebra de linha for semantica, usa `lines[]`.
5. O design system do starter ou do tenant vive em `design-system/**`; o layout nao deve embutir valores magic.
6. Qualquer target editavel precisa de um ID estavel.
7. Qualquer secao nova deve declarar:
   - props schema
   - constraints visuais
   - target map
   - compatibilidade CMS
8. O output final deve ser reutilizavel e adaptavel, nao screenshot-driven.

## Contrato CMS

Qualquer bloco editavel deve responder a estas perguntas:

- onde vive o conteudo?
- quais sao os targets?
- qual e o schema?
- que constraints de layout tem?
- consegue gerar preview sem tocar em codigo?

Se a resposta for "nao", ainda nao esta CMS-ready.
