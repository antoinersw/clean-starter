# 01 — Architecture pattern

← [Gate](../../ARCHITECTURE.md)

Hexagonal. Dependencies point **inward**. Every layer does real work. No pass-through use cases, no 1:1 ports with no test seam.

```
apps/web-app  apps/api              ← driving adapters (composition roots)
        │            │
        ▼            ▼
packages/application                ← ports + use cases
        │
        ▼
packages/domain                     ← types, errors, pure functions
        ▲
        │
packages/infrastructure             ← Prisma, Stripe, email, files (driven)
packages/ui                         ← presentational React (no I/O)
packages/locale                     ← i18n JSON
packages/config                     ← env + app constants
```

## Layer table

| Layer | Package | Owns | Must NOT import |
|-------|---------|------|-----------------|
| Domain | `packages/domain` | Types, error ADTs, money/status mapping, KPI math, validation | Prisma, Nest, React, TanStack, application, infrastructure, ui |
| Application | `packages/application` | Port interfaces, use-case classes, input clamping | Prisma, Nest, React |
| Infrastructure | `packages/infrastructure` | Prisma repos, DTO→domain mappers, SQL helpers, gateways | Nest, React |
| API | `apps/api` | Controllers, guards, DI wiring, Result→HTTP | Prisma client directly (use repos) |
| Web app | `apps/web-app` | Query hooks, fetchers, Zod schemas, page wiring | Prisma, application, infrastructure |
| UI | `packages/ui` | Components, client display helpers, Storybook | application, infrastructure, fetch |
| Locale | `packages/locale` | JSON namespaces, `createI18n` | React app internals |
| Config | `packages/config` | Env keys, validated config, cron constants | Prisma, React |

Enforce with **both**:

- `eslint-plugin-boundaries` (domain → nothing; application → domain only)
- `dependency-cruiser` (`no-domain-deps`, `application-only-domain`)

## No dead layers

Do not add:

- A use case that only forwards one repository call with no validation / clamping.
- A port that mirrors its single adapter 1:1 with no test value.
- A domain folder whose logic is duplicated in infrastructure or UI.

Clamping limits at the use-case boundary **is** real work. Keep it.

Next: [02 — Monorepo layout](02-monorepo-layout.md)
