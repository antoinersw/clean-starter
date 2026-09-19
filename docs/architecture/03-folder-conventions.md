# 03 — Folder conventions

← [Gate](../../ARCHITECTURE.md)

## Domain — one folder per bounded context

```
packages/domain/src/
  result.ts                         # ok / err / isOk / isErr  (ROOT, not inside a feature)
  {context}/
    types.ts
    errors.ts
    constants.ts
    compute-*.ts                    # pure
    map-*.ts                        # vocabulary collapse
    validate-*.ts
    index.ts
    *.test.ts
```

Register the context barrel in `packages/domain/src/index.ts` as `export * from './{context}'`. Keep that root barrel thin. Do not re-list 400 type names by hand.

Put a context at the **top level** when several apps consume it. Nest under a parent only when it is tightly coupled (`leads-platform/partner-compliance/`).

## Application — ports and use cases

```
packages/application/src/{context}/
  ports/
    {entity}-repository.port.ts
    {capability}.port.ts            # email, sms, clock, random — not only repos
  use-cases/
    {verb}-{entity}.use-case.ts
    {verb}-{entity}.use-case.test.ts
  {pure-helper}.ts
  index.ts
```

Port = **TypeScript type** (object of functions), not a class:

```typescript
export type PaymentsRepositoryPort = {
  listLedger(filters: PaymentsListFilters): Promise<Result<PaymentsLedgerPage, PaymentsError>>;
};
```

Use case = class with `execute()` and constructor-injected `Deps`:

```typescript
type Deps = { readonly repository: PaymentsRepositoryPort };

export class ListPaymentsLedger {
  constructor(private readonly deps: Deps) {}
  execute(filters: PaymentsListFilters = {}): Promise<Result<PaymentsLedgerPage, PaymentsError>> {
    const limit = clampLimit(filters.limit);
    if (limit === null) return Promise.resolve(err({ kind: 'invalid_limit' }));
    return this.deps.repository.listLedger({ ...filters, limit });
  }
}
```

One file per use case when the behavior is distinct. Group only when methods share the same port and the same screen.

## Infrastructure — Prisma + pure mappers

```
packages/infrastructure/src/{context}/
  prisma-{entity}.repository.ts
  map-{entity}-{detail}.ts          # unit-tested, no Prisma mock
  {shared-where}.ts
  mappers/
  index.ts
src/db/prisma/
  schema.prisma                     # edit THIS; do not hand-write migrations
```

Extract every non-trivial map / fold / date-where into its own file. Unit-test those. Do not mock Prisma in unit tests. Integration tests (separate vitest config) cover the repository.

## API — thin feature module

```
apps/api/src/{context}/
  {context}.module.ts               # controllers ONLY
  controllers/
    {context}.controller.ts
  tokens.ts                         # Symbol.for('Context.Name')
  {context}.providers.ts            # factory providers
```

Register the module in `app.module.ts`. Inject use cases, not repositories, into controllers.

```typescript
export const LIST_PAYMENTS_LEDGER = Symbol.for('Billing.ListPaymentsLedger');

{
  provide: PAYMENTS_REPOSITORY,
  inject: [PrismaService],
  useFactory: (prisma: PrismaService) => new PrismaPaymentsRepository(prisma.client),
},
{
  provide: LIST_PAYMENTS_LEDGER,
  inject: [PAYMENTS_REPOSITORY],
  useFactory: (repository: PaymentsRepositoryPort) => new ListPaymentsLedger({ repository }),
}
```

HTTP prefix: `/v1/{audience}/{resource}`. Guards on the controller class.

## Web app — feature slice

```
apps/web-app/src/features/{feature}/
  {feature}-page.tsx                # returns ONE @org/ui view
  application/
    {feature}-query-keys.ts
    use-{resource}-query.ts
    use-{feature}-data.ts
  infrastructure/
    {feature}.schema.ts
    fetch-{resource}.ts
  domain/                           # optional client-only pure helpers
```

There is **no** `apps/web-app/src/components/`. If it renders and does not fetch, it belongs in `packages/ui`.

```tsx
export function PaymentsPage() {
  return <PaymentsPanel {...usePaymentsPage()} />
}
```

Redirects and auth gates live in **route** `beforeLoad` / `loader`, not in the page.

## UI — audience modules + primitives

```
packages/ui/src/
  ui/                               # shadcn primitives
  shared/                           # layout, formatters used by several audiences
  modules/
    {audience}/                     # admin | partner | auth | marketplace
      {feature}/
        {audience}-{feature}-view.tsx
        {audience}-{feature}-panel.tsx
        components/
        model/
        types.ts
        fixtures.ts                 # Storybook + tests ONLY
        *.stories.tsx
        *.test.tsx
  styles/globals.css
```

```json
{
  ".": "./src/index.ts",
  "./ui": "./src/ui/index.ts",
  "./shared": "./src/shared/index.ts",
  "./admin": "./src/modules/admin/index.ts"
}
```

UI **may** import `@org/domain` types. UI **must not** import application, infrastructure, or fetch.

Panel state order: `error > loading > empty > rows`.

Next: [04 — Naming](04-naming.md)
