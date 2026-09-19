# 02 — Monorepo layout

← [Gate](../../ARCHITECTURE.md)

```
apps/
  web-app/          TanStack Start + Vite + TanStack Router + Query
  api/              NestJS composition root
  cron/             optional — scheduled jobs, same use cases as api
  landing/          optional — marketing, Vercel
packages/
  domain/
  application/
  infrastructure/   Prisma schema + adapters
  ui/               Storybook source package (no compile step)
  locale/
  config/
  typescript-config/
  eslint-config/
docs/
  business-knowledge.md    product rules (not architecture)
  architecture/            these chapters
specs/                     or {scope}/specs/ in a monorepo
```

## Package naming

`@{org}/domain`, `@{org}/application`, `@{org}/infrastructure`, `@{org}/ui`, `@{org}/locale`, `@{org}/config`.

`packages/ui` stays a **source package**: export `./src/index.ts`. Do not compile it for the app. Storybook is its `dev` / `build-storybook`.

## Frontend stack (proven)

Production that scaled: **TanStack Start + Vite + TanStack Router + TanStack Query + Tailwind v4 + Biome**.

This starter’s `apps/web-app` is still Next.js. For the **next product app**, use the TanStack Start slice. Keep Next.js only if the surface is a marketing / content site (`apps/landing`). Feature rules are stack-agnostic.

Next: [03 — Folder conventions](03-folder-conventions.md)
