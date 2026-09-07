# Tasks: Responsive & Color Critical Hardening

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | ~60-100 (2 files, mostly single-line minified edits + one ~53-line consolidated CSS block per design.md) |
| 400-line budget risk | Low |
| Chained PRs recommended | No |
| Suggested split | Single PR |
| Delivery strategy | auto-chain |
| Chain strategy | stacked-to-main (cached this session; moot — single PR, no chain needed) |

Decision needed before apply: No
Chained PRs recommended: No
Chain strategy: stacked-to-main
400-line budget risk: Low

### Suggested Work Units

| Unit | Goal | Likely PR | Focused test command | Runtime harness | Rollback boundary |
|------|------|-----------|----------------------|-----------------|-------------------|
| 1 | All 4 fixes, both files | PR 1 (single) | `pnpm run build` | N/A — no browser tool in this environment; build + grep + contrast math is the full harness | `git revert` of the single commit |

## Phase 1: Fix #1 — Icon knockout fill (`src/lib/icons.ts`)

- [ ] 1.1 In `src/lib/icons.ts`, on the `mark` icon entry (inner knockout `<path>`), change `fill="#080909"` to `fill="var(--color-surface)"`. Leave the outer path's `fill="currentColor"` untouched.
- [ ] 1.2 Verify: `mark` is the only icon entry with `#080909`; no other icon's `fill` value changes.

## Phase 2: Fix #2 — Toolbelt separator contrast (`src/styles/portfolio.css`)

- [ ] 2.1 In `src/styles/portfolio.css` line 1 (early base rules), change `.toolbelt p span{padding-inline:13px;color:#64685f}` to `.toolbelt p span{padding-inline:13px;color:var(--color-text-secondary)}`. Only the `color` value changes; `padding-inline:13px` stays.

## Phase 3: Fix #3 + Fix #4 — Cascade consolidation (`src/styles/portfolio.css`)

Order matters: merge into the late era first, then strip the early era, so no value is lost mid-edit.

- [ ] 3.1 Merge gap properties into the late-era base block (currently lines 16-21 `.hero-grid`, line 22 `.hero h1`, line 82 `.hero-bottom`, line 109 `.project-visual`, line 124 `.module-row`) per design.md's "Consolidated CSS (ready to drop in) — Late-era base block" section, used verbatim as target end-state.
- [ ] 3.2 Add two new late-era base rules (`.module-row h3`, `.module-row p`) that do not currently exist in the late era — values per design.md's consolidated block (`.module-row h3{font-size:1.1875rem;font-weight:500;letter-spacing:-.03em;color:var(--color-text)}`, `.module-row p{color:var(--color-text-secondary);font-size:.875rem}`).
- [ ] 3.3 Confirm the `@media(max-width:1100px) and (min-width:721px)` block (lines 136-148) needs no structural change (design.md: early era fully dead here).
- [ ] 3.4 In the `@media(max-width:720px)` block (lines 149-185): add `min-height: 260px;` to `.project-visual` (line 170); remove the redundant `display: flex;` from `.hero-bottom` (line 168, now covered by the late base rule from 3.1); remove the redundant `font-size: .875rem;` from `.module-row p` (line 179, now covered by 3.2). No other declarations in this block change.
- [ ] 3.5 Delete the entire early `@media(min-width:1500px){.hero-grid{padding-block:64px 80px}}` block (line 2) — fully superseded.
- [ ] 3.6 In early line 1 (base), remove the full sub-declarations for `.hero-grid{...}`, `.hero h1{...}`, `.hero-bottom{...}`, `.project-content{padding:42px}...` (only the bare padding rule, not `.project-content .eyebrow`/`.project-content h3`/etc.), `.project-visual{...}`, `.module-row{...}` (the bare row rule, not `:hover`/`.module-index`), `.module-row h3{...}`, `.module-row p{...}`. Leave every other selector on line 1 byte-for-byte untouched (`.wrap`, `.hero-eyebrow`, `.location`, `.hero-description`, `.actions`, `.solid-link`, `.quiet-link`, `.hero-aside*`, `.about-*`, `.toolbelt*`, `.contact-*`, `.site-footer*`, `.site-header`, `.nav-wrap`, `.desktop-nav*`, `.menu-toggle`, `.mobile-nav*`, etc.).
- [ ] 3.7 In early line 3 (`@media(max-width:1000px)`), remove `.hero-grid{...}`, `.hero h1{font-size:6rem}`, `.hero-bottom{gap:20px;flex-wrap:wrap}`, `.project-content{padding:28px}`, `.project-visual{padding:20px}`, `.module-row{...}`. Leave `.wrap,.nav-wrap`, `.hero-index{display:none}`, `.project-visual .visual-label`, `.visual-caption`, `.about-grid{gap:50px}`, `.toolbelt{gap:30px}`, `.toolbelt p span{padding-inline:7px}`, `.desktop-nav{gap:20px}` untouched.
- [ ] 3.8 In early line 4 (`@media(max-width:720px)`), remove `.hero-grid{...}`, `.hero h1{...}`, `.hero-bottom{...}`, `.project-visual{padding:60px 16px;min-height:260px}`, `.project-content{padding:27px 23px}`, `.module-row{...}`, `.module-row h3{font-size:1.125rem}`, `.module-row p{grid-column:2;grid-row:3}`, and the dead `.module-row>span:last-child{grid-column:3;grid-row:1}`. Leave `.module-label{grid-row:2;grid-column:2}` (bare, distinct selector) and every other selector on that line untouched.

## Phase 4: Verification

- [ ] 4.1 Run `pnpm run build`; confirm it stays green and still emits 10 static pages, no errors.
- [ ] 4.2 Grep `src/styles/portfolio.css` for each of the 6 target selectors (`.hero-grid`, `.hero h1`, `.hero-bottom`, `.project-content`, `.project-visual`, `.module-row` incl. `h3`/`p`); confirm none of the properties named in design.md's per-property table appear more than once across the early+late blocks for the same breakpoint range (per spec's "Single cascade winner" scenario).
- [ ] 4.3 Grep the file for `span:last-child`; confirm zero matches (dead selector fully removed).
- [ ] 4.4 Diff-review lines 1-5 and the two late `@media` blocks against the pre-edit file (read-only baseline mentally tracked from this session) to confirm no untargeted selector's declaration changed.
- [ ] 4.5 Note in the PR description, as flagged-not-fixed items (not silent gaps): (a) the `mark` icon's imperfect match at the contact-social Arkelythex link (sits on `--color-surface-alt`, not `--color-surface`); (b) `.project-visual`'s unaudited `60px 27px` tablet padding (721-1000px, no dedicated tablet rule in either era) as a possible redesign oversight; (c) that `pnpm run build` + contrast math + grep/diff review is the full verification available — no browser tool exists in this environment, so a human visual pass post-deploy is still required.
