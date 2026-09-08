# Design: Project Hardening (Repo Hygiene Closeout)

## Technical Approach

Four independent, mechanical work units, no code-behavior change. Each unit is scoped to stay under the 400-changed-line review budget on its own except unit 3, which must sub-slice by folder. No new dependencies, no build/config changes.

## Architecture Decisions

### Decision: 404 e2e spec structure

**Choice**: New `tests/404/404-page.ts` (Page Object) + `tests/404/404.spec.ts`, following the exact `tests/home/` convention (`home-page.ts` extends `BasePage`, `home.spec.ts` imports it).

**Alternatives considered**: adding 404 assertions inside an existing spec file — rejected, breaks the repo's one-folder-per-page convention (`tests/home/`, `tests/projects/`, `tests/project-detail/`).

**Rationale**: `src/pages/404.astro` (read verbatim) renders `BaseLayout` (`title="404 — Página no encontrada"`, `lang="es"`) + `Navbar` + a centered `<main id="main-content">` with `<p>404</p>`, `<h1>Página no encontrada</h1>`, and `<a href={withBase("/")} class="btn-primary">` containing `<Icon name="back"/>` + text `Volver al inicio`.

`404-page.ts`:
```ts
import type { Page, Locator } from '@playwright/test';
import { BasePage } from '../base-page';

export class NotFoundPage extends BasePage {
  readonly heading: Locator;
  readonly backLink: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', { name: 'Página no encontrada' });
    this.backLink = page.getByRole('link', { name: /Volver al inicio/ });
  }

  async goto(): Promise<void> {
    await super.goto('/nonexistent-route-hardening-test');
  }
}
```

`404.spec.ts` tests (tags `@critical`, `@404`, `@404-E2E-00N`):
1. Navigating an unknown route renders the 404 page (`heading` visible, `page.getByText('404')` visible).
2. `backLink` has `href` resolving to the base path (`withBase("/")`) and, when clicked, navigates back to the home page (assert `HomePage` heading or `page.url()` ends at root).

No new page-object methods belong in `BasePage` — this reuses `goto()`/`hasHorizontalOverflow()` unchanged. Astro's static build serves `404.astro` as `dist/404.html`; `astro preview`/GitHub Pages both resolve unmatched routes to it, so no server config change is needed — confirm via the second assertion only (no separate HTTP-status test, since static hosts vary in whether they return real `404` status or `200` with the fallback page, and `README.md`/CI already treat `astro preview` as the e2e target).

### Decision: `.env.example` cleanup — outcome only, no literal diff

**Choice**: Apply phase reads `.env.example` directly (may have different tool permissions than this design phase, which was denied `.env*` reads) and removes any `SUPABASE_*`, `OPENAI_API_KEY`, `ANTHROPIC_API_KEY`, `GOOGLE_AI_API_KEY` lines and their section headers/comments, cross-checked against `grep -r` over `src/` (confirmed zero matches in `explore.md`).

**Alternatives considered**: deleting the file entirely — rejected, `README.md` and `docs/guides/getting-started.md` both reference `.env.example`'s existence as the place to note "no required env vars," so an empty/minimal file (or the file reduced to a comment stating no vars are required) must remain.

**Rationale**: this design cannot fabricate exact current line numbers or content (never read); `sdd-tasks` must instruct `sdd-apply` to diff-first, delete-second. Success criterion: `grep -E "SUPABASE|OPENAI_API_KEY|ANTHROPIC_API_KEY|GOOGLE_AI_API_KEY" .env.example` returns no matches after the change.

### Decision: `docs/` rewrite — sub-slicing and fact grounding

**Choice**: rewrite in place (per proposal), sliced into 4 task batches by folder, each an independent commit:

| Batch | Files | Fictional claims to remove | Real facts to substitute (verified) |
|---|---|---|---|
| A — root + architecture | `docs/README.md`, `docs/architecture/README.md`, `docs/architecture/stack-comparison.md`, `docs/architecture/islands-architecture.md` | "Hydrated islands: Navbar/EnhancedHero/EvidenceEngine/TechnicalIntake"; full island runtime tree; "React is still available for the few interactive islands" | Zero islands, zero React/client directives anywhere in `src/`. Real component set: `src/components/ui/{Icon,Navbar,ProfileCard}.astro` (all static `.astro`). Real pages: `src/pages/{index,404}.astro`, `src/pages/projects/{index,[id]}.astro`. `islands-architecture.md` should be deleted or replaced with a short note that the site has no client-side hydration by design |
| B — components | `docs/components/README.md`, `collaboration.md`, `technical-intake.md`, `hero.md`, `navigation.md` | Full specs for nonexistent `EnhancedHero.tsx`, `EvidenceEngine.tsx`, `TechnicalIntake.tsx`, `CollaborationSection.astro`; "`Navbar.tsx` is a hydrated React island" | Delete the 4 nonexistent-component files; replace `docs/components/README.md` with a catalog of the actual 3 files in `src/components/ui/` (`Icon.astro`, `Navbar.astro` — real vanilla Astro, no hydration, per commit `af68540` — `ProfileCard.astro`) |
| C — guides | `docs/guides/getting-started.md`, `docs/guides/best-practices.md` | Node 18.x/pnpm 8.x prerequisites; `src/components/sections/` in project-structure diagram; `tailwind.config.mjs` reference; React/Motion worked example; entire "Bleeding Edge Stack" content (React 19.2, Motion v12, Zod, shadcn `ui/button.tsx`, `cn()` helper, `src/content/config.ts`) | `package.json`: `pnpm@10.33.0`, Node 22 per `.github/workflows/deploy.yml:38`; Tailwind 4 is CSS-first (no config file, confirmed absent); actual `src/` tree from `package.json`/glob: `components/ui/`, `content.config.ts`, `data/{projects.json,systems.ts}`, `layouts/BaseLayout.astro`, `lib/{site,icons,project-presentation,project-case-studies}.ts`, `pages/`, `styles/{global.css,portfolio.css}`. `best-practices.md` should be rewritten around the real conventions already documented in `.claude/rules/code-standards.md` (TypeScript strict, `.astro` vs `.tsx` usage — note: repo currently has zero `.tsx`, Astro-only — Tailwind utilities, `cn()` does NOT exist, file naming) |
| D — lib | `docs/lib/README.md` | Lists `src/lib/utils.ts` (does not exist); omits `src/lib/icons.ts` | Document the real 4 files: `site.ts` (`withBase` helper, confirmed used in `404.astro`), `icons.ts`, `project-presentation.ts`, `project-case-studies.ts` |

`docs/profile-assets.md` and `docs/github-profile-README.md`: no changes (confirmed accurate / explicitly out of scope per proposal).

**Alternatives considered**: trim `docs/` to stack-fact pointers only, keeping `.claude/CLAUDE.md` as sole source of truth — rejected by the proposal's confirmed decision (rewrite in place); noted here only for traceability.

**Rationale**: each batch is disjoint files, independently revertible, and stays well under 400 lines given `best-practices.md` alone is 554 lines and needs its own batch (C).

### Decision: LICENSE

**Choice**: root `LICENSE` file, standard MIT text, copyright line `Copyright (c) 2026 Dreamcoder08`.

**Alternatives considered**: using a real personal name — rejected, no real name appears anywhere in the repo (`package.json`, `README.md`, git remote `github.com/Dreamcoder08/DreamFolio` all use only the handle `Dreamcoder08`); fabricating one would violate the "do not guess a name absent from the repo" constraint.

**Rationale**: MIT is confirmed by the proposal as the decided license; `README.md:99` already has a `<TODO>` pointing at this exact gap, to be resolved by linking to `LICENSE` once added (out of scope to edit `README.md` further here — flagged as follow-up, not required by success criteria).

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `tests/404/404-page.ts` | Create | Page Object for 404 page |
| `tests/404/404.spec.ts` | Create | 2 tests: renders + back-link navigation |
| `.env.example` | Modify | Remove dead Supabase/AI vars (apply-phase diff-first) |
| `docs/README.md`, `docs/architecture/*.md` | Modify/Delete | Batch A rewrite |
| `docs/components/*.md` | Modify/Delete | Batch B rewrite (4 nonexistent-component files deleted) |
| `docs/guides/*.md` | Modify | Batch C rewrite |
| `docs/lib/README.md` | Modify | Batch D rewrite |
| `LICENSE` | Create | MIT text |

## Testing Strategy

| Layer | What to Test | Approach |
|-------|-------------|----------|
| E2E | 404 page renders, back link works | New `tests/404/404.spec.ts`, run via `pnpm run test:e2e` |
| Static/manual | `.env.example` has no dead vars | `grep` check post-edit |
| Static/manual | `docs/` claims match `src/` | Manual re-diff of each rewritten file against the fact tables above |
| Build | No regressions | `pnpm run build` and `pnpm run verify` stay green (docs/tests/.env.example/LICENSE don't affect the build) |

## Threat Matrix

N/A — no routing, shell, subprocess, VCS/PR automation, executable-file classification, or process-integration boundary.

## Migration / Rollout

No migration required. Each of the 4 units (and each `docs/` batch within unit 3) is an independent, revertible commit per the proposal's rollback plan.

## Open Questions

- [ ] Exact current `.env.example` content is unverified by this design phase (permission-denied read) — apply phase must diff-first per the decision above.
- [ ] `README.md:99`'s `<TODO>` for LICENSE is not updated by this change (out of scope); flagged as a natural follow-up once `LICENSE` exists.
