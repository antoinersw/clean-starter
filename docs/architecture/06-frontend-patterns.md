# 06 — Frontend patterns

← [Gate](../../ARCHITECTURE.md)

## TanStack Query

```typescript
useQuery({
  queryKey: adminQueryKeys.commissionLedger(partnerSearch, limit, from, to),
  queryFn: async () => {
    const result = await fetchAdminCommissionLedger({ partnerSearch, limit, from, to });
    if (!result.ok) throw new Error(result.error);
    return result.value;
  },
  enabled,
  staleTime: 60_000,
  meta: { errorToast: false },
});
```

Query keys are a factory object. **Every filter dimension is in the key.** Independent tabs = independent queries (one 503 must not blank the other).

## UI hooks allowed in `packages/ui`

Local UI only: `useState`, `useReducer`, `useRef`, `useId`, `useMemo` (expensive), `useCallback` (stable child), measure / disclosure / click-outside.

Forbidden in UI: `useQuery`, store, `useRouter` / `useNavigate`, `useSession`, `process.env`.

## `useEffect`

Allowed only to sync with an **external** system (socket, `document.title`, `window` listener, third-party widget).

Forbidden: derived values, resetting state on prop change (use `key`), notifying parent, init-from-props, fetch (use Query), filtering/sorting.

## Feature page rendering

1. Return **one** UI view.
2. Spread a hook for data + callbacks.
3. No layout `div` / Tailwind clusters in `apps/web-app`.
4. No session spinner in the page. Route guards own auth.
5. `fixtures.ts` is never imported from `apps/web-app`.

## Information architecture (UI)

Top = identity / context. Center = the reason the screen exists. Bottom-right = primary action. Never put the primary action top-left. A component with two reasons to exist is two components.

Next: [07 — Testing](07-testing.md)
