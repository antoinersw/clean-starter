# 08 — Infra

← [Gate](../../ARCHITECTURE.md)

## Tooling

| Tool | Role |
|------|------|
| pnpm workspaces | `apps/*`, `packages/*` |
| Turbo | `dev` (no cache, persistent), `build` depends on `^build` |
| TypeScript project refs | `tsc -b` at root |
| Biome | web-app lint/format |
| ESLint + boundaries | packages |
| Vitest | unit |
| Playwright | e2e |
| Storybook | `packages/ui` on port 6006 |
| Docker Compose | `docker/dev` — Postgres (PostGIS if geo), MinIO |

## Prisma scripts (on `packages/infrastructure`)

`db:generate`, `db:migrate:dev`, `db:migrate:deploy`, `db:seed`. Root proxies: `pnpm db:migrate:deploy`, `pnpm prepare:api` → generate.

Seeds take `--env staging|prod`. Never point a seed at prod without an explicit env flag.

## Deploy

- Frontends (web-app, landing, waitlist, Storybook): **Vercel**. `installCommand` / `buildCommand` run from repo root with `pnpm --filter @{org}/web-app...`.
- API / cron: Node host or Docker (`docker/staging`, `docker/prod`).
- Auth: better-auth. Cookie domain resolved in `packages/config`.
- Realtime (optional): Nest Socket.IO + client in the feature `infrastructure/` adapter. Domain owns room names and event types.

## Env

One `.env` at repo root (or per `APP_ENV`). `packages/config` owns keys (`ENV.DATABASE_URL`), parsing, CORS / cookie / API base URL helpers. `pnpm env:sync` copies the example. Apps import `appConfig` — they do not scatter `process.env`.

Next: [09 — Feature vertical](09-feature-vertical.md)
