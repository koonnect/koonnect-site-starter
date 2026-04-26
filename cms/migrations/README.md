# CMS migrations

Coloque aqui migrations de content schema quando os JSON dos tenants precisarem de ser atualizados entre versoes.

Convencao recomendada:

```txt
cms/migrations/
  2026-04-24-add-home-comparison.ts
  2026-05-01-normalize-faq-items.ts
```

Cada migration deve:

- receber o JSON atual
- devolver o JSON normalizado para a nova versao
- ser idempotente
- nao tocar em codigo de layout
