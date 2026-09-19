# 05 — Data

← [Gate](../../ARCHITECTURE.md)

## Result (domain root)

```typescript
export type Result<T, E> =
  | { readonly ok: true; readonly value: T }
  | { readonly ok: false; readonly error: E };

export const ok = <T>(value: T): Result<T, never> => ({ ok: true, value });
export const err = <E>(error: E): Result<never, E> => ({ ok: false, error });
```

Rules:

1. Domain / application / infrastructure return `Result` for expected failures. No `throw` for business or storage errors.
2. Error ADTs use a `kind` string-literal union.
3. Infrastructure wraps Prisma in `try/catch` → `err({ kind: 'storage_failed', message })`.
4. Nest controller is the only place Result becomes HTTP: `unwrapResultOrThrow(result, context)`.
5. Web queryFn: if `!result.ok` then `throw new Error(result.error)` so TanStack Query owns the failure. Prefer in-panel error (`meta: { errorToast: false }`) when the UI has an error slot.

| `kind` family | Status |
|---------------|--------|
| `storage_failed`, `repository_failed`, `source_unavailable` | 503 |
| `not_found`, `*_not_found` | 404 |
| `invalid_input`, `validation_failed`, `invalid_limit` | 400 |
| `conflict` | 409 |

## Persistence

- One Postgres. Prisma schema lives in `packages/infrastructure/src/db/prisma/schema.prisma`.
- **Edit `schema.prisma` directly.** Do not write migration files in agent sessions except extensions, triggers, views.
- Amounts: **integer cents** in the DB. One domain helper to display (`centsToDisplayEur` = `Math.round(cents / 100)`). Never a second rounding path.
- Enums: Prisma enum + domain `const` list (`statusList`) + exhaustive `switch` with **no `default`**.
- Read models (`*View`, `*Page`) live in **domain**. Prisma types stay in infrastructure. Map in `map-*.ts`.
- Dates leave persistence as ISO strings (`*Iso`) then flatten at the HTTP edge.
- Shared `WHERE` fragments live next to the repository, not copied into three files.

## Zod at the web boundary

Every fetcher `safeParse`s the JSON. Unknown enum values fail as `"invalid response"`. Do not let a bad payload reach a `switch` in UI.

## Config vs domain constants

| Lives in | What |
|----------|------|
| `packages/domain` | Business limits, vocabularies, formulas |
| `packages/config` | Env keys, URLs, cron expressions, feature flags, MIME / upload caps |
| `docs/business-knowledge.md` | Human rules. Read before changing stats, billing, status machines, crons |

`packages/config` loads env once (`loadEnv()` + `getAppConfig()`). Apps do not parse `process.env` ad hoc.

## i18n

`packages/locale/src/locales/{en,fr}/{namespace}.json`. Namespaces by audience (`admin`, `dashboard`, `auth`). UI uses `react-i18next` as a **peer**. Do not hardcode user-facing French in domain; domain may keep `*LabelFr` only when a label is a business vocabulary (status chips shared by SMS + UI).

Next: [06 — Frontend](06-frontend-patterns.md)
