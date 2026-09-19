# 04 — Naming

← [Gate](../../ARCHITECTURE.md)

## Files (always kebab-case)

| Kind | Pattern | Example |
|------|---------|---------|
| Domain module | `{verb}-{noun}.ts` | `compute-commission-kpis.ts` |
| Domain test | `{module}.test.ts` | `compute-commission-kpis.test.ts` |
| Use case | `{verb}-{entity}.use-case.ts` | `list-payments-ledger.use-case.ts` |
| Port | `{entity}-repository.port.ts` | `payments-repository.port.ts` |
| Prisma adapter | `prisma-{entity}.repository.ts` | `prisma-payments.repository.ts` |
| Pure mapper | `map-{entity}-{detail}.ts` | `map-ledger-row.ts` |
| Gateway | `{vendor}-{capability}.adapter.ts` | `resend-invitation-email.adapter.ts` |
| Web fetcher | `fetch-{resource}.ts` | `fetch-payments-ledger.ts` |
| Query hook | `use-{resource}-query.ts` | `use-payments-ledger-query.ts` |
| Query keys | `{feature}-query-keys.ts` | `admin-query-keys.ts` |
| Zod schema | `{feature}.schema.ts` | `admin-payments.schema.ts` |
| UI view | `{audience}-{feature}-view.tsx` | `admin-qualification-view.tsx` |
| UI panel | `{audience}-{feature}-panel.tsx` | `admin-payments-panel.tsx` |
| Story | `{file}.stories.tsx` | next to the component |
| Nest controller | `{feature}.controller.ts` | `admin-payments.controller.ts` |

## Types

| Kind | Pattern | Example |
|------|---------|---------|
| Read-model row | `{Feature}{Entity}Row` | `AdminCommissionLedgerRow` |
| Screen view | `{Feature}{Entity}View` | `IncomingCallListView` |
| Page snapshot | `{Feature}{Entity}Page` | `ConnectedPartnersPage` |
| KPI snapshot | `{Feature}KpisSnapshot` | `AdminCommissionKpisSnapshot` |
| Filters | `{Feature}ListFilters` | `AdminPaymentsListFilters` |
| Error ADT | `{Feature}Error` | `{ kind: 'storage_failed'; message: string }` |
| Domain dates | `*Iso` | `paidAtIso` |
| API / UI dates | plain `paidAt` | mapped in controller or fetcher |
| Callback props | `on{Event}` | `onRowClick`, `onRetry` |

## Classes and symbols

| Kind | Pattern | Example |
|------|---------|---------|
| Use case class | PascalCase verb phrase | `ListPaymentsLedger` |
| Use case method | `execute()` | always |
| Repository class | `Prisma{Feature}Repository` | `PrismaPaymentsRepository` |
| DI token | `UPPER_SNAKE` + `Symbol.for` | `LIST_PAYMENTS_LEDGER` |
| Nest controller | `{Feature}Controller` | `AdminPaymentsController` |

Next: [05 — Data](05-data.md)
