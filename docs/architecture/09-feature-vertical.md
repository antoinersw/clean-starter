# 09 — Feature vertical

← [Gate](../../ARCHITECTURE.md)

Read-model admin screen, the shape that held up:

```
1. UI          packages/ui/src/modules/admin/{feature}/
               Panel props: rows, kpis, error, onRetry, serverFiltered

2. Web         use{Feature}Data()
                 → use{Resource}Query(filters)
                 → fetch{Resource}() + Zod
                 → GET /v1/admin/{resource}?…

3. API         {Feature}Controller
                 → UseCase.execute(filters)
                 → unwrapResultOrThrow
                 → map *Iso → API dates

4. Application UseCase clamps limit / dates → port

5. Infra       Prisma repo loads rows → map-* → domain computeKpis → Page

6. Domain      status map, cents→EUR, KPI math
```

When two tabs must fail independently: two endpoints, two queries, two error slots.

When headlines must match **full history** but the table is truncated: compute KPIs on the full set in the repository, return `rows: full.slice(0, limit)` + `totalCount`.

Next: [10 — CRAFT checklist](10-craft-checklist.md)
