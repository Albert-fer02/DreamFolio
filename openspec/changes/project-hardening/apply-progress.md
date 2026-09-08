# Apply Progress: Project Hardening (Repo Hygiene Closeout)

## Workload / PR Boundary
- Mode: chained PR slice (`auto-chain`, `stacked-to-main` per parent-orchestrator instruction for this launch)
- Current work unit: Unit 1 / PR 1 — 404 e2e spec
- Boundary: starts at repo HEAD (no prior work on this change), ends with `tests/404/404-page.ts` + `tests/404/404.spec.ts` created and green
- Estimated review budget impact: ~40 authored lines (well under the 400-line budget; per-unit estimate in tasks.md was 65-85)

## Phase 1: 404 e2e spec — COMPLETE

**Mode**: Standard (Strict TDD not active for this project; writing the spec is itself the task).

### Completed Tasks
- [x] 1.1 Create `tests/404/404-page.ts`: `NotFoundPage extends BasePage`, `heading` locator, `backLink` locator, `goto()` override to `/nonexistent-route-hardening-test`.
- [x] 1.2 Create `tests/404/404.spec.ts`: 2 tests tagged `@critical`, `@404`, `@404-E2E-001`/`002`.
- [x] 1.3 Run `pnpm run test:e2e` — full suite green (19/19), including both new tests.

### Files Changed
| File | Action | What Was Done |
|------|--------|----------------|
| `tests/404/404-page.ts` | Created | Page Object extending `BasePage`; `heading` (`getByRole('heading', { name: 'Página no encontrada' })`), `backLink` (`getByRole('link', { name: /Volver al inicio/ })`); `goto()` override navigating to `/nonexistent-route-hardening-test` |
| `tests/404/404.spec.ts` | Created | 2 tests: (1) unknown route renders `heading` + visible `page.getByText('404')`; (2) `backLink` has `href="/"` and clicking it navigates to `/` |
| `openspec/changes/project-hardening/tasks.md` | Modified | Marked tasks 1.1-1.3 `[x]` |

### Work Unit Evidence
| Evidence | Value |
|---|---|
| Focused test command and exact result | `pnpm run test:e2e` → `19 passed (12.8s)`, including `tests/404/404.spec.ts:5:3` (`@404-E2E-001`) and `tests/404/404.spec.ts:17:3` (`@404-E2E-002`) |
| Runtime harness command/scenario and exact result | Playwright against `astro build` + static `serve` on `localhost:4321` (existing CI harness, `SITE_BASE=/`) — full 19-test suite passed with zero regressions in `tests/home/`, `tests/projects/`, `tests/project-detail/` |
| Rollback boundary | `git rm -r tests/404/` and revert the two `[x]` checkboxes in `tasks.md` — no other files touched |

### Deviations from Design
None — implementation matches `design.md`'s literal `404-page.ts` code and the 2-test `404.spec.ts` structure verbatim. `backLink` href asserted as `'/'` (not a generic "base path" check) because `test:e2e` always runs with `SITE_BASE=/`, making `withBase("/")` deterministically `/` in this harness.

### Issues Found
None.

### Remaining Tasks (out of scope for this launch — other phases/PRs)
- [ ] Phase 2 — `.env.example` cleanup (PR 2)
- [ ] Phase 3 — docs Batch A (PR 3)
- [ ] Phase 4 — docs Batch B (PR 4)
- [ ] Phase 5 — docs Batch C1 (PR 5)
- [ ] Phase 6 — docs Batch C2 (PR 6)
- [ ] Phase 7 — docs Batch D (PR 7)
- [ ] Phase 8 — LICENSE (PR 8)
- [ ] Phase 9 — Final verification (after all units land)

### Status
3/3 Phase 1 tasks complete (3/27 total tasks across the full change). Ready for `sdd-verify` on this work unit; orchestrator to route remaining phases as separate chained PRs.
