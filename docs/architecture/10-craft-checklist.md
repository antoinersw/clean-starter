# 10 — CRAFT checklist

← [Gate](../../ARCHITECTURE.md)

Every feature, before merge:

- [ ] No `any`, no `as unknown as`, no `@ts-ignore`
- [ ] `Result<T, E>` on fallible domain / application / infrastructure paths
- [ ] Domain free of framework imports
- [ ] Colocated test for every new non-barrel file
- [ ] Port in application; one Prisma adapter in infrastructure
- [ ] Use case class with `execute()`; clamp / validate at that boundary
- [ ] Controller uses `unwrapResultOrThrow`; audience routes guarded
- [ ] Web: Zod parse at HTTP boundary; query key includes filters
- [ ] UI: presentational only; Storybook for loading / error / empty / data
- [ ] Money: cents in DB, one domain rounding helper
- [ ] Spec + design under `specs/` (or `{scope}/specs/`) before implementation
- [ ] Business rule exists in `docs/business-knowledge.md` or was asked

Next: [11 — Starter gaps](11-starter-gaps.md)
