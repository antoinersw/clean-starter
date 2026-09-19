# 11 — Starter gaps

← [Gate](../../ARCHITECTURE.md)

This repo is not yet at the production bar. Close these **before** the first feature:

1. Add `packages/domain/src/result.ts` and export it from the domain barrel.
2. Move Prisma into `packages/infrastructure/src/db/prisma/schema.prisma`.
3. Delete or ignore the commented `packages/adapters` tRPC stub. Nest is the HTTP adapter.
4. Replace PascalCase Storybook demo widgets with kebab-case `modules/` + `ui/` primitives.
5. Add `packages/config` and `packages/locale` before the first screen ships copy or env reads.
6. Prefer TanStack Start for `apps/web-app` (or accept Next.js **and** still use the feature-slice rules).
7. Add `docs/business-knowledge.md` on day one. Empty is fine. Inventing rules later is not.
8. Copy `.cursor/rules` from production: UI-in-package, no-useEffect-misuse, hooks-in-ui, ADHD output.

Back: [Gate](../../ARCHITECTURE.md)
