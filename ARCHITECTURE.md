---
clean-claude: architecture-reference
version: 2
created: 2026-09-19
updated: 2026-09-19
approved-by: pending
source: neodya production patterns (2024–2026), CRAFT-validated only
---

# Architecture Reference — Entry point

Confirm: `Architecture Reference: ARCHITECTURE.md (v2) ✅`

Then open **only the chapter for the layer you touch**. This file is the index. It is not product business knowledge.

| Reuse | Drop |
|-------|------|
| Hex packages, domain isolated | Fat 400-line pages |
| `Result<T,E>` + `kind` | `Result` buried in a feature folder |
| kebab-case + suffixes | PascalCase UI folders |
| UI never fetches | `packages/adapters` tRPC stub |
| Zod at HTTP edge, cents in DB | Hand-written Prisma migrations |
| Colocated Vitest | `fixtures.ts` imported by web-app |

Full reuse / drop list: [00 — Reuse vs drop](docs/architecture/00-reuse-vs-drop.md)

---

## Chapters

| # | File | Read when |
|---|------|-----------|
| 00 | [Reuse vs drop](docs/architecture/00-reuse-vs-drop.md) | First time / audit |
| 01 | [Architecture pattern](docs/architecture/01-architecture-pattern.md) | New package or layer |
| 02 | [Monorepo layout](docs/architecture/02-monorepo-layout.md) | New app or package |
| 03 | [Folder conventions](docs/architecture/03-folder-conventions.md) | New feature vertical |
| 04 | [Naming](docs/architecture/04-naming.md) | New file or type |
| 05 | [Data](docs/architecture/05-data.md) | Schema, money, errors, env, i18n |
| 06 | [Frontend](docs/architecture/06-frontend-patterns.md) | UI, Query, pages |
| 07 | [Testing](docs/architecture/07-testing.md) | Any new module |
| 08 | [Infra](docs/architecture/08-infra.md) | Tooling, deploy, Docker |
| 09 | [Feature vertical](docs/architecture/09-feature-vertical.md) | Copy-paste screen shape |
| 10 | [CRAFT checklist](docs/architecture/10-craft-checklist.md) | Before merge |
| 11 | [Starter gaps](docs/architecture/11-starter-gaps.md) | Before first feature in this repo |

---

## Architect read order (5 min)

1. This gate
2. [00](docs/architecture/00-reuse-vs-drop.md) + [01](docs/architecture/01-architecture-pattern.md)
3. The one chapter that matches the design (03 / 05 / 06 / 08)
4. [10](docs/architecture/10-craft-checklist.md) before writing the design

---

## Changelog

| Version | Date | Change |
|---------|------|--------|
| 2 | 2026-09-19 | Split into `docs/architecture/` chapters. This file is the gate. |
| 1 | 2026-09-19 | Single-file extract from neodya. |
