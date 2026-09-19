# 07 — Testing

← [Gate](../../ARCHITECTURE.md)

| Layer | How |
|-------|-----|
| Domain | Pure. Inline fixtures. Exact equality. |
| Use case | Mock **ports only** (`vi.fn()`). Cover defaults, clamp, filter forward, error propagation. |
| Infrastructure | Unit-test extracted mappers. Integration vitest config for repos. |
| Web fetcher / Zod | Valid payload passes. Unknown enum rejected. Query-string builder if non-trivial. |
| UI | Testing Library. Stories for loading / error / empty / rows. |
| E2E | Playwright under `apps/web-app/e2e`. Smoke first. |

Runner: **Vitest** next to the file. Every new non-barrel module gets a test. BDD: `describe('behavior', () => { it('should …') })`.

Application tests may use `test/in-memory-*.repository.ts` behind the port.

Next: [08 — Infra](08-infra.md)
