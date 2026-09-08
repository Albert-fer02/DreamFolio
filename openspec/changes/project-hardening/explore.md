# Explore: Project Hardening (docs/hygiene cleanup)

## Context

Follow-up to the same-session documentation-accuracy pass that fixed `.claude/CLAUDE.md`, `.claude/rules/code-standards.md`, and `README.md` (all three had drifted to describe a React 19 + Supabase stack that was deliberately removed — commits `842b1c3` and `af68540`). User asked "que mas planeas hacer" repeatedly and then explicitly requested SDD to close the remaining gaps to "10/10". Four candidates were named going in; exploration found the `docs/` gap is far larger than scoped.

## Current State

DreamFolio is fully static Astro 7.3: `package.json` deps are only `astro`, `@tailwindcss/vite`, `tailwindcss` (dev: `@playwright/test`, `serve`, `typescript`) — zero React, zero backend. `src/components/ui/` has exactly 3 files (`Icon.astro`, `Navbar.astro`, `ProfileCard.astro`). No `src/components/sections/` or `src/components/interactive/` exists.

**Caveat**: this project's stored SDD init context (Engram `sdd-init/dreamfolio`) and the Engram copy of the skill registry both still describe the old React+Motion stack — stale, same class of drift, not to be trusted for stack facts. The local `.atl/skill-registry.md` file is current (dated today) and was used instead.

## Findings, per candidate

### 1. `.env.example` — real, narrow gap
Could not be read directly (denied by this session's own permission settings on `.env*` paths — a deliberate guard, not overridden). Confirmed independently via `README.md:95` (already notes the vars are unused) and via `grep` across `src/` for `SUPABASE|OPENAI_API_KEY|ANTHROPIC_API_KEY|GOOGLE_AI_API_KEY` → zero matches. `docs/guides/getting-started.md` independently states "No required environment variables for the public portfolio." The file itself still lists dead vars — only the README carries a pointer note a new contributor may not read first.

### 2. No `LICENSE` file — confirmed, blocked on human decision
`find . -maxdepth 1 -iname "LICENSE*"` → zero matches at repo root. `README.md:99` already has its own `<TODO>` for this. **Not resolvable by exploration** — license choice (MIT, Apache-2.0, proprietary/all-rights-reserved for a personal portfolio, etc.) is a product/legal decision for the user.

### 3. `docs/` folder — extensive, previously-unaudited staleness (bigger than scoped)
Confirmed via direct read + grep. Files describing a nonexistent React-hydrated architecture:

- `docs/README.md:10` — "Hydrated islands: Navbar, EnhancedHero, EvidenceEngine, TechnicalIntake"
- `docs/architecture/README.md:17-30` — full runtime composition tree with `Navbar.tsx client:load`, `EnhancedHero.tsx client:idle`, `EvidenceEngine.tsx client:visible`, `TechnicalIntake.tsx client:visible`, plus static sections (`CraftProtocol.astro`, `TrinitySection.astro`, `SystemUnit.astro`, `VisualLab.astro`, `TechnicalDepth.astro`, `CollaborationSection.astro`) — **none of these 10 files exist anywhere in `src/components/`**.
- `docs/architecture/islands-architecture.md` — entire file is the same fictional island table.
- `docs/architecture/stack-comparison.md:16` — "React is still available for the few interactive islands."
- `docs/components/README.md` — full catalog of nonexistent files with fictional paths (`src/components/sections/EnhancedHero.tsx`, `src/components/interactive/EvidenceEngine.tsx`, etc.).
- `docs/components/collaboration.md`, `technical-intake.md`, `hero.md`, `navigation.md` — each a full spec for one nonexistent React component; `navigation.md` explicitly claims `Navbar.tsx` is "a hydrated React island" — directly contradicted by the real, vanilla `Navbar.astro` (commit `af68540`).
- `docs/guides/getting-started.md` — mixed: env-var section is accurate, but Prerequisites table says Node 18.x/pnpm 8.x (actual: pnpm pinned `10.33.0`, CI uses Node 22 per `.github/workflows/deploy.yml:38`); project-structure diagram still shows `src/components/sections/`; references `tailwind.config.mjs` (doesn't exist, Tailwind 4 is CSS-first); includes a full worked example of adding a React/Motion component.
- `docs/guides/best-practices.md` (554 lines) — an entire generic "Bleeding Edge Stack Dec 2025" guide: React 19.2, Motion v12, Zod schemas, shadcn-style `ui/button.tsx`/`ui/card.tsx` catalog, a `cn()` helper (confirmed absent), `src/content/config.ts` (actual file is `src/content.config.ts`, no `content/` dir). Essentially unrelated to the real codebase.
- `docs/lib/README.md` — lists `src/lib/utils.ts` (does not exist) and omits the real `src/lib/icons.ts`.
- `docs/profile-assets.md` — **accurate**, matches current `ProfileCard.astro`/`site.ts`/`public/images/profile/`. No fix needed.
- `docs/github-profile-README.md` — not about DreamFolio at all; personal GitHub-profile content for a *different* repo (`Dreamcoder08/Dreamcoder08`). Placement question, not a content-accuracy one.
- Binary/asset files (`docs/assets/*.png`, `docs/contribuciones.png`, the PDF/HTML anexo, `docs/css/styles.css`) not content-audited — out of scope, not text claims about the codebase.

**Constraint**: `docs/` is not under `public/` and is never referenced by `astro.config.mjs` — excluded from the deployed site. But the repo is public and `README.md` (Demo screenshot + "Documentación del proyecto" pointer) links into it, so accuracy still matters for public-repo credibility.

**Decision needed before design**: rewrite `docs/` in place to describe the current architecture, or trim it down and keep stack facts solely in `.claude/CLAUDE.md`/`code-standards.md` as the single source of truth (avoids future re-drift, less to maintain for a docs tree that isn't part of the shipped site)?

### 4. `404.astro` has zero e2e coverage — confirmed
`tests/` only has `base-page.ts`, `home/`, `projects/`, `project-detail/`. `src/pages/404.astro` (19 lines) renders `BaseLayout` + `Navbar` + a "Volver al inicio" link via `withBase("/")`. The existing `BasePage`/Page-Object pattern (`tests/home/home-page.ts` + `home.spec.ts`) directly templates a spec for this.

## Approaches

| Approach | Pros | Cons | Effort |
|---|---|---|---|
| Single combined PR for all 4 areas | One coherent review | `docs/best-practices.md` alone is 554 lines; combined diff will likely exceed the 400-line review budget | Medium-High |
| Sliced work units (recommended) | Reviewable, respects the 400-line guard, isolates the human-decision item (LICENSE) so it doesn't stall the rest | More PRs to sequence | Low per unit |

## Recommendation

Sliced work units, in this order:
1. `404.astro` e2e spec — fully mechanical, no design decision.
2. `.env.example` cleanup — mechanical, already diagnosed by README.
3. `docs/` rewrite — needs the source-of-truth decision above first; likely needs its own sub-slicing by file group given size.
4. `LICENSE` — blocked on human license choice, independent of the rest.

## Risks

- `docs/` rewrite is large enough to trip the 400-line review guard on its own if not sliced further by sub-area (architecture/, components/, guides/).
- LICENSE choice is a legal/product decision outside SDD's authority — must be asked as a single blocking question before that work unit starts.
- `docs/github-profile-README.md` placement is unresolved (flagged only, not a content-accuracy fix).
- `.env.example` content was triangulated from `README.md` + `grep` over `src/`, not read directly (session permission guard on `.env*` paths) — the apply phase should attempt a direct read/diff first.

## Ready for Proposal

Yes for items 1 (404 e2e), 2 (`.env.example`), and 4 (LICENSE — pending human choice, proposal should surface the question). Item 3 (`docs/` rewrite) is ready too, but the proposal should explicitly pose the source-of-truth question above before design/tasks are written.
