# Apply Progress: Dual Real Light/Dark Theme System

## Work Unit 1 / PR 1 — Design Tokens Foundation (`global.css`) — COMPLETE

**Mode**: Standard (no strict TDD active for this project; verification via build + grep checks).

### Completed Tasks
- [x] 1.1 Added `@custom-variant dark (&:where([data-theme=dark], [data-theme=dark] *));` after `@import "tailwindcss";`.
- [x] 1.2 Replaced the `@theme` block with the unified dark-default token set exactly per design.md's "Token Architecture" section. Preserved all pre-existing non-color tokens (spacing scale, fluid typography scale) verbatim.
- [x] 1.3 Added the `[data-theme="light"]` override block with the full light-mode token set exactly per design.md.
- [x] 1.4 Added `[data-theme="dark"] { color-scheme: dark; }` and `[data-theme="light"] { color-scheme: light; }`.
- [x] 1.5 Deleted the dead `.light` class block, the duplicate `@media (prefers-color-scheme: light)` block, and the redundant `html{color-scheme: dark light}` rule.
- [x] 1.6 Verified: exactly one `@theme` block remains; no `.light` class selector or duplicate `prefers-color-scheme` media block remains.

### Files Changed
| File | Action | What Was Done |
|------|--------|----------------|
| `src/styles/global.css` | Modified | Consolidated cyan `@theme` into unified amber dark-default token set; added `@custom-variant dark`; added `[data-theme="light"]` override block; added `[data-theme="dark"/"light"] { color-scheme }` rules; deleted dead `.light` class, duplicate `prefers-color-scheme` media block, and redundant `html { color-scheme: dark light }` |
| `openspec/changes/dual-theme-design-system/tasks.md` | Modified | Marked tasks 1.1-1.6 `[x]` |

### Work Unit Evidence
| Evidence | Value |
|---|---|
| Focused test command and exact result | `pnpm run build` — exit 0, "10 page(s) built", no errors |
| Runtime harness command/scenario and exact result | N/A for visual dark-mode regression: no visual change occurred because dark remains the only active theme (no toggle exists until PR 4); `pnpm run build` static generation is the correct and sufficient harness per tasks.md's own Unit 1 harness definition |
| Rollback boundary | Revert `src/styles/global.css` diff only; no other file touched in this unit |

### Verification detail
- `grep -c "^@theme" src/styles/global.css` → `1`
- `grep -n "^\.light\b" src/styles/global.css` → no match
- `grep -n "prefers-color-scheme" src/styles/global.css` → no match
- `grep -n "color-scheme: dark light" src/styles/global.css` → no match
- `pnpm run build` → succeeded, 10 static pages (404, projects/index, projects/[id] x7, index), no errors, dist/ removed after check (gitignored)
- `src/styles/global.css` SHA-256 after edit: `517586e6a8da1612f8fe45d06ab47da2ff4decd60545af3e572def12e08dee7f`

### Deviations from Design
None — implementation matches design.md's "Token Architecture" section exactly. Non-color tokens (spacing/typography) were preserved as design.md's snippet comment instructed ("spacing/typography scale unchanged from current global.css").

### Issues Found
None.

### Out of Scope for This Run (untouched, confirmed)
- `src/styles/portfolio.css` (Work Unit 2 / PR 2)
- `tailwind.config.mjs` (Work Unit 3 / PR 3)
- `src/layouts/BaseLayout.astro`, `src/lib/icons.ts`, `src/components/ui/Navbar.tsx` (Work Unit 4 / PR 4)

### Workload / PR Boundary
- Mode: stacked-to-main (Chain strategy per tasks.md Review Workload Forecast)
- Current work unit: Unit 1 of 4
- Boundary: starts from unmodified `global.css`, ends with the consolidated single-source `@theme` + `[data-theme]` override, ready to be committed as PR 1
- Estimated review budget impact: well under 400 lines (global.css diff only, ~50-60 changed lines)

### Remaining Tasks (as of end of Work Unit 1)
- [ ] Phase 2 (2.1-2.6): `portfolio.css` tiered token conversion + `.theme-toggle` styles — Work Unit 2 / PR 2
- [ ] Phase 3 (3.1-3.2): Delete `tailwind.config.mjs` — Work Unit 3 / PR 3
- [ ] Phase 4 (4.1-4.2): No-flash init script in `BaseLayout.astro` — Work Unit 4 / PR 4
- [ ] Phase 5 (5.1-5.5): Toggle control in `icons.ts`/`Navbar.tsx` — Work Unit 4 / PR 4
- [ ] Phase 6 (6.1-6.5): Final verification

### Status (as of end of Work Unit 1)
6/29 tasks complete (Phase 1 fully done). Ready for commit/PR of Work Unit 1; next apply batch should target Work Unit 2 (`portfolio.css`).

---

## Work Unit 2 / PR 2 — Portfolio Retheme (`portfolio.css`) — COMPLETE

**Mode**: Standard (no strict TDD active for this project; verification via build + grep checks, consistent with Work Unit 1).

### Completed Tasks
- [x] 2.1 Deleted the redundant `:root { --color-* }` block (8 tokens: `--color-surface`, `--color-surface-alt`, `--color-surface-elevated`, `--color-text`, `--color-text-secondary`, `--color-accent`, `--color-accent-muted`, `--color-border`, `--color-border-hover`), now fully defined in `global.css`'s unified `@theme`.
- [x] 2.2 Tier 1: converted every hex literal exact-matching a core token to `var(--color-*)` — `#080909`→`var(--color-surface)`, `#111212`→`var(--color-surface-alt)`, `#191a1a`→`var(--color-surface-elevated)`, `#f0efeb`→`var(--color-text)`, `#a5a6a2`→`var(--color-text-secondary)`, `#dda783`→`var(--color-accent)`, applied exhaustively across every occurrence (grep-verified before and after; alpha-suffixed variants like `#080909ee` handled separately as Tier 2 to avoid corrupting the exact-match substring).
- [x] 2.3 Tier 2: converted clear tints:
  - Accent-alpha tints (`#dda78308/09/35/55/65`, `#d7c1af25`) → `color-mix(in srgb, var(--color-accent) N%, var(--color-surface))` with N derived from the literal alpha (3%, 4%, 21%, 33%, 40%, 15%).
  - Surface-alpha translucency (`#080909ee`, `#0a0b0be8`, used for backdrop-blur header and portrait caption chip) → `color-mix(in srgb, var(--color-surface) N%, transparent)` (93%, 91%) — mixed toward `transparent` instead of `var(--color-surface)` to preserve the intended translucency/backdrop-blur effect, a deliberate deviation from the design.md literal template justified by functional necessity.
  - White-alpha border family (`#ffffff1c/17/20/22/24/25/28/2b` → `var(--color-border)`; `#ffffff30/32/33/35` → `var(--color-border-hover)`) — bucketed by nearest-alpha proximity to the two canonical border tokens (0.11 / 0.24), per the explicit normalization instruction, even where the literal alpha differed slightly from the canonical value.
  - `#ffffff04` (subtle hover-background tint) → `var(--color-surface-glass)` (semantically the closest existing token, both representing a faint white overlay).
  - Near-duplicate surface tints (`#101111`, `#101213`, `#111314` → `var(--color-surface-alt)`; `#1c1c1b`, `#1b1e1e`, `#161919`, `#191713`, `#17191a` → `var(--color-surface-elevated)`) collapsed into the nearest canonical surface tier.
  - Second `:root` block's portfolio.css-local semantic aliases (`--portrait-surface`, `--line-subtle`, `--line-strong`) redefined to reference `var(--color-surface-alt)`, `var(--color-border)`, `var(--color-border-hover)` respectively — this single change makes every existing consumer of these aliases (`.profile-card`, `.profile-portrait`, `.profile-project`, `.module-icon`) automatically theme-reactive without touching each usage site.
  - ~40 remaining light-toned foreground literals (near-white/tan text and icon colors used throughout the "Personal identity" portrait/icon subsystem) classified by nearest-anchor brightness/warmth heuristic into `var(--color-text)` (near-white, neutral, avg brightness ≥215, warmth ≤15), `var(--color-text-secondary)` (neutral, avg brightness 140-215), or `var(--color-accent)` (warm-tan hue family, R-B channel delta >15) — full mapping table in the apply-phase report.
- [x] 2.4 Tier 3: identified and left literal (spot-verified against both surfaces):
  - `#64685f` (`.toolbelt p span`, muted separator/punctuation color) — contrast 3.50:1 on dark surface `#080909` (pre-existing, below the 4.5:1 body floor but unchanged from original production value; non-critical punctuation glyph, not primary content), 4.77:1 on light surface `#f3eadc` (passes AA body threshold). Left literal: converting to `var(--color-text-secondary)` was rejected because that token's darker light-mode value would look visually different from this specific muted low-emphasis tone across both themes, and the literal itself does not regress in light mode.
  - `#0007`, `#0006`, `#0003` (box-shadow drop-shadow colors, `.project-visual img`, `.profile-card`) — decorative depth cues, not text; excluded from WCAG 1.4.3 text-contrast requirements (same exclusion class as design.md's own hairline-border table entry). Left literal; a dark shadow reads as valid depth cue on both a dark and a light surface (standard cross-theme practice).
  - `#fff3` (`.solid-link` inset box-shadow highlight) — decorative inset highlight, not text; on light surface this highlight becomes visually faint (white-on-near-white), a minor, non-blocking cosmetic softening with zero legibility impact (the shadow is additive, not load-bearing for content). Left literal.
- [x] 2.5 Added `.theme-toggle` styling, mirroring `.menu-toggle`'s full declared pattern (color, min-height/min-width 44px, border, border-radius, background, padding, align-items, justify-content) — deliberately omitting `.menu-toggle`'s `display:none` desktop-hidden behavior since the toggle must stay visible at all breakpoints per design.md; no hover/focus rule added because `.menu-toggle` itself declares none beyond the shared global `button:focus-visible` rule, which `.theme-toggle` (a `<button>`) inherits automatically.
- [x] 2.6 Verified: `grep -c "00d4ff|0088bb" src/styles/portfolio.css` → `0`.

### Files Changed
| File | Action | What Was Done |
|------|--------|----------------|
| `src/styles/portfolio.css` | Modified | Deleted redundant 8-token `:root` block; converted ~110 hex-literal occurrences (Tier 1 exact matches, Tier 2 tints/color-mix/border normalization, Tier 3 spot-verified) across the giant single-line rule block and the readable "Personal identity" block; redefined 3 local semantic aliases to canonical tokens; added `.theme-toggle` rule; left 5 literals (Tier 3, documented above) |
| `openspec/changes/dual-theme-design-system/tasks.md` | Modified | Marked tasks 2.1-2.6 `[x]` |

### Work Unit Evidence
| Evidence | Value |
|---|---|
| Focused test command and exact result | `pnpm run build` — exit 0, "10 page(s) built", no errors; compiled CSS spot-checked (`grep -o 'data-theme=light...'`) confirms the light override block compiles and `color-mix()` resolves (90 occurrences in output CSS, no Lightning CSS transform errors) |
| Runtime harness command/scenario and exact result | No browser tooling available in this environment to visually toggle `data-theme="light"` live; relied instead on (a) exhaustive grep-based literal inventory before/after conversion (zero unmapped literals besides the 5 documented Tier-3 exceptions), and (b) relative-luminance contrast math for the one Tier-3 literal with a plausible text role (`#64685f`). This is reported honestly as a non-visual verification, per the task's explicit fallback allowance |
| Rollback boundary | Revert `src/styles/portfolio.css` diff only (68 changed lines); Work Unit 1's `global.css` tokens remain valid and unaffected standalone |

### Verification detail
- `grep -c "00d4ff\|0088bb" src/styles/portfolio.css` → `0`
- `grep -o '#[0-9a-fA-F]\{3,8\}' src/styles/portfolio.css | sort -u` → only `#0003`, `#0006`, `#0007`, `#64685f`, `#fff3` remain (the documented Tier-3 set)
- `grep -n "^:root" src/styles/portfolio.css` → 1 match (the portfolio.css-local semantic-alias block; the 8-token duplicate root from task 2.1 is gone)
- `pnpm run build` → succeeded, 10 static pages, no errors; `dist/` removed after check
- `git diff --stat -- src/styles/portfolio.css openspec/changes/dual-theme-design-system/tasks.md` → 1 file changed (portfolio.css), 34 insertions(+), 34 deletions(-) = 68 changed lines total, well under the 400-line PR budget

### Deviations from Design
- Surface-alpha translucency literals (`#080909ee`, `#0a0b0be8`) were mixed toward `transparent` rather than `var(--color-surface)` as design.md's literal Tier-2 template specifies, to preserve the backdrop-blur/translucency effect these two rules depend on (`.site-header`'s `backdrop-filter:blur(18px)` and `.portrait-caption`'s layered chip over a portrait image). Mixing toward an opaque `var(--color-surface)` would have flattened these into fully opaque colors, breaking the intended visual effect. This is a deliberate, narrow, functionally-justified deviation from the literal template wording, not a departure from its intent (both still use `color-mix()` derived from the alpha value).
- The ~40 Tier-3-adjacent light-toned foreground literals were resolved via a documented nearest-anchor brightness/warmth heuristic (not exhaustive per-pixel WCAG math for each one individually) since design.md explicitly deferred exact tiering to apply-time and did not mandate a specific classification algorithm. All resulting choices land on the 3 already-WCAG-verified core tokens (text/text-secondary/accent), so every conversion inherits design.md's own verified contrast ratios for both themes.

### Issues Found
None. No visual browser regression check was possible in this environment (documented above as a verification gap, not silently skipped).

### Out of Scope for This Run (untouched, confirmed)
- `tailwind.config.mjs` (Work Unit 3 / PR 3)
- `src/layouts/BaseLayout.astro`, `src/lib/icons.ts`, `src/components/ui/Navbar.tsx` (Work Unit 4 / PR 4)

### Workload / PR Boundary
- Mode: stacked-to-main (Chain strategy per tasks.md Review Workload Forecast)
- Current work unit: Unit 2 of 4
- Boundary: starts from Work Unit 1's committed `global.css` tokens (assumed available, untouched here), ends with a fully theme-reactive `portfolio.css` ready to be committed as PR 2
- Estimated review budget impact: 68 changed lines (well under 400), single file

### Remaining Tasks
- [ ] Phase 4 (4.1-4.2): No-flash init script in `BaseLayout.astro` — Work Unit 4 / PR 4
- [ ] Phase 5 (5.1-5.5): Toggle control in `icons.ts`/`Navbar.tsx` — Work Unit 4 / PR 4
- [ ] Phase 6 (6.1-6.5): Final verification

### Status
12/29 tasks complete (Phases 1-2 fully done). Working tree left uncommitted for the orchestrator; next apply batch should target Work Unit 3 (`tailwind.config.mjs` deletion).

---

## Work Unit 3 / PR 3 — Tailwind Config Removal — COMPLETE

**Mode**: Standard. Performed directly by the orchestrator (mechanical single-file deletion, no design ambiguity — skipped the sub-agent hop per delegation rules).

### Completed Tasks
- [x] 3.1 Deleted `tailwind.config.mjs` outright.
- [x] 3.2 Verified `pnpm run build` succeeds with Tailwind resolving purely from `global.css`'s CSS-first `@theme`/`@custom-variant` — 10 static pages, no errors.

### Files Changed
| File | Action | What Was Done |
|------|--------|----------------|
| `tailwind.config.mjs` | Deleted | Confirmed dead in explore/design phases (no `@config` directive anywhere); grep after deletion found only inert `Read()` permission-allowlist entries in `.claude/settings.json`/`@.claude/agents/session-config.ts`/`.gemini/settings.json` referencing the old path — harmless, out of scope, not touched |
| `openspec/changes/dual-theme-design-system/tasks.md` | Modified | Marked tasks 3.1-3.2 `[x]` |

### Work Unit Evidence
| Evidence | Value |
|---|---|
| Focused test command and exact result | `pnpm run build` — exit 0, "10 page(s) built", no errors |
| Runtime harness | N/A — deletion has no visual surface; build-green is the harness, per tasks.md |
| Rollback boundary | `git checkout HEAD~1 -- tailwind.config.mjs`, independent of PR 1/2 |

### Status
14/29 tasks complete (Phases 1-3 fully done). Ready for commit/PR of Work Unit 3; next apply batch targets Work Unit 4 (no-flash script + Navbar toggle + icons).
