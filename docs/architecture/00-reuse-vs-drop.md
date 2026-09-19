# 00 — Reuse vs drop

← [Gate](../../ARCHITECTURE.md)

What scaled in production. What to leave behind.

## Reuse

| Area | Rule |
|------|------|
| Layers | Hexagonal packages. Domain has zero framework imports. |
| Errors | `Result<T, E>` in domain / application / infrastructure. `kind` discriminant. |
| UI | Presentational library. No fetch, no router, no env. |
| Web app | Feature slice: page + query hooks + Zod fetchers. One UI root per page. |
| API | Thin Nest module (controller only). DI tokens + factories in one composition root. |
| Data | Postgres + Prisma. Cents in DB. View models in domain. Zod at the HTTP boundary. |
| Names | kebab-case files. Suffixes: `.use-case`, `.port`, `.repository`, `.schema`. |
| Tests | Colocated `*.test.ts`. Vitest. In-memory ports for use cases. |
| Tooling | pnpm workspaces + Turbo. dependency-cruiser + eslint-plugin-boundaries. |

## Drop

1. A 400-line page that wires 40 callbacks. Split by tab / screen.
2. One domain `index.ts` with 500 named re-exports. Prefer per-context barrels.
3. `Result` buried inside a random feature folder. Put it at `packages/domain/src/result.ts`.
4. PascalCase UI folders (`Tooltip/Tooltip.tsx`). Production uses kebab-case files.
5. A separate `packages/adapters` tRPC layer. Nest HTTP is the driving adapter that shipped.
6. Hand-written Prisma migration files in agent sessions. Edit `schema.prisma` only.
7. Demo `fixtures.ts` imported by the web app. Storybook only.
8. `useEffect` to derive / sync / notify. Calculate during render or call the parent in the handler.
9. Inventing a business rule from a screen label. If it is not in `docs/business-knowledge.md`, ask.

Next: [01 — Architecture pattern](01-architecture-pattern.md)
