# Design: Responsive & Color Critical Hardening

## Technical Approach

Four independent, surgical edits across two files (`src/lib/icons.ts`, `src/styles/portfolio.css`). No component, build-config, or dependency changes. Every claim below is derived from a verbatim re-read of the current files (not `explore.md`'s excerpts) plus explicit cascade/contrast math, since no browser tool is available. Two corrections to `explore.md`'s findings surfaced during this pass (Fix #2's "single literal" framing, and Fix #4's actual current state) — both are called out explicitly below because they change the shape of the fix.

## Architecture Decisions

### Decision: Fix #1 — `mark` icon knockout fill

**Choice**: `fill="#080909"` → `fill="var(--color-surface)"` on the inner knockout `<path>` only, in `src/lib/icons.ts`.

**SVG fill-inheritance reasoning (explicit, since no browser to confirm)**: `<Icon>`/`NavIcon` render `<svg fill="none" stroke="currentColor" ...>` with the two `<path>` elements injected via `set:html`/`dangerouslySetInnerHTML`. CSS `fill` is an inherited property; SVG presentation attributes (`fill="..."` on an element) are specified values for that exact element — a specified value (any origin, including a presentation attribute) always wins over an inherited value, because inheritance only supplies a value when the element has none of its own. Each `<path>` carries its own `fill` attribute, so both paths get their own specified value regardless of the wrapper `<svg>`'s `fill="none"` — that wrapper value only affects descendants that declare *no* `fill` of their own. This is why the icon already works today (outer path `fill="currentColor"`, inner path `fill="#080909"` — both override the wrapper). `var()` is valid inside any CSS `<paint>`-typed value, and SVG2 presentation attributes are parsed with the same grammar as the corresponding CSS property, so `fill="var(--color-surface)"` resolves exactly like `fill: var(--color-surface)` would in a stylesheet — a well-established, broadly supported pattern (not exotic). Custom properties inherit through the whole DOM including SVG, so `--color-surface` resolves regardless of where the icon is mounted.

**Usage-site audit (all 4 grepped, not just the 3 `explore.md` checked)**:

| Site | File | Immediate background | Match to `--color-surface`? |
|---|---|---|---|
| Wordmark brand-seal | `Navbar.tsx:42` | `.site-header{background:color-mix(in srgb, var(--color-surface) 93%, transparent)}`, fixed over `body{background:var(--color-surface)}` | Exact (both layers resolve to `--color-surface`) |
| Footer wordmark | `index.astro:50` | `.site-footer` — no own background, inherits `body{background:var(--color-surface)}` | Exact |
| Portrait caption badge | `ProfileCard.astro:9` | `.portrait-caption{background:color-mix(in srgb, var(--color-surface) 91%, transparent)}` composited over the portrait photo | Close approximation (91% surface tint over a photo is not a flat color; `var(--color-surface)` is the best available single-value match, and strictly better than the always-wrong-in-light-mode status quo) |
| Contact-social Arkelythex link | `index.astro:48` | `.contact-section{background:var(--color-surface-alt)}` (`.contact-social` has no own background) | **Not exact** — `--color-surface-alt` (`#111212` dark / `#fff7ea` light) differs from `--color-surface` (`#080909` / `#f3eadc`). Dark-mode delta is tiny (RGB 8,9,9 vs 17,18,18); light-mode delta is larger (~12–13/channel) and could be faintly perceptible on an 18px icon on close inspection. New finding — `explore.md` did not check this 4th site. |

**Alternatives considered**: (a) leave hardcoded — rejected, confirmed live bug in light mode at all 4 sites. (b) per-site `color-mix()` values matching each exact background — rejected as scope creep; the icon glyph set has no per-usage variant mechanism today (`icons.ts` is a flat name→markup map with no context param), and introducing one is a larger refactor unjustified by a cosmetic knockout mismatch smaller than the current bug.

**Rationale**: `var(--color-surface)` fixes the confirmed, always-visible light-mode bug at all 4 sites and is either exact or a materially closer approximation than today's hardcoded dark value everywhere. The residual imperfection at the contact-social site is flagged as an Open Question for a human visual pass, not blocking.

### Decision: Fix #2 — `.toolbelt p span` contrast

**Choice**: `color:#64685f` → `color:var(--color-text-secondary)` (reuse the existing theme-aware token; no new token, no `[data-theme]` block added to `portfolio.css`).

**Why a single literal is mathematically impossible (correction to the proposal's framing)**: WCAG relative luminance, `L(#080909) ≈ 0.00267`, `L(#f3eadc) ≈ 0.8306` (full workings below). For one fixed color to clear 4.5:1 against both:
- vs dark: `(Lx+0.05)/(0.00267+0.05) ≥ 4.5` ⇒ `Lx ≥ 0.1870`
- vs light: `(0.8306+0.05)/(Lx+0.05) ≥ 4.5` ⇒ `Lx ≤ 0.1457`

`0.1870 > 0.1457` — the two constraints do not overlap. **No single literal value can pass AA against both surfaces simultaneously.** This is why every other dual-theme text color in this project (`--color-text-secondary` etc.) is `[data-theme]`-scoped in `global.css`, not a portfolio.css literal — the proposal's "keep one literal" option is not viable, not just non-preferred.

**Contrast math for the chosen value** (relative luminance formula: linearize each sRGB channel `c ≤ 0.03928 ? c/12.92 : ((c+0.055)/1.055)^2.4`, then `L = 0.2126R+0.7152G+0.0722B`; ratio `= (L1+0.05)/(L2+0.05)`):
- Dark: `--color-text-secondary = #a5a6a2` → `L ≈ 0.3786`. vs `#080909` (`L≈0.00267`): `(0.3786+0.05)/(0.00267+0.05) ≈ 8.14:1` ✓ (≥4.5)
- Light: `--color-text-secondary = #6b5947` → `L ≈ 0.1072`. vs `#f3eadc` (`L≈0.8306`): `(0.8306+0.05)/(0.1072+0.05) ≈ 5.60:1` ✓ (≥4.5)

**Alternatives considered**: (a) new purpose-built token (e.g. `--color-toolbelt-sep`) with tighter luminance tuned closer to the AA floor for a more "faint separator" look — rejected: adds a token for one glyph, more surface area, no material benefit; (b) `[data-theme]`-scoped literal duplicating `--color-text-secondary`'s exact values inline in `portfolio.css` — rejected: pure duplication of an existing token with no upside. Reusing `--color-text-secondary` also matches the file's own established convention for muted decorative text (`.tags span`, `.module-index` already use it for the exact same "quiet UI label" role).

**Rationale**: passes AA on both surfaces with comfortable margin (5.60–8.14:1), matches the requested "muted/secondary" visual weight exactly (it *is* the secondary-text token), zero new tokens, zero new `[data-theme]` scoping in `portfolio.css` (keeps the file's existing all-`var()` convention intact).

### Decision: Fix #3 — cascade consolidation

**Cascade rule used throughout**: all six selectors use plain class/descendant selectors (equal specificity in both eras). The early batch (top of file) is 100% positioned *before* the late "Personal identity" batch in source order. Per CSS, when a property is set by both eras for the same viewport, **the late era always wins**, regardless of which one is wrapped in a narrower `@media`, because `@media` does not add specificity — only source order breaks the tie once both rules' conditions are true. The only way an early-era value survives is a **gap**: a property/range combination the late era never touches at all.

**Per-property table** (winner = what currently renders; ✅ = late wins per source order, only cell shown when values differ; "gap" = late never sets this property, early survives undisputed):

| Selector | Property | Early value(s) | Late value(s) | Current winner / range | Decision |
|---|---|---|---|---|---|
| `.hero-grid` | `display`, `align-items` | `grid`, `center` | never set | gap — early stands, all widths | keep |
| `.hero-grid` | `padding-inline` (L/R) | `0` (via shorthand, both blocks) | never set | gap — early stands, all widths | keep `0` |
| `.hero-grid` | `padding-block` (T/B) | `46px 70px` (base); `64px 80px` (@1500min); `35px 35px` (@720max) | `38px 54px` (base); `30px 32px` (@720max) | late wins whenever it applies: `38/54` for ≥721px, `30/32` for ≤720px. The `@1500min` early rule is **fully dead** at every width (late base always textually after it) | consolidate to late's `38/54` base + `30/32` @720; delete `@1500min` block (now empty) |
| `.hero-grid` | `grid-template-columns`, `gap` | `1fr 280px`/`70px` (base); `1fr 245px`/`35px` (@1000max); `1fr`/`40px` (@720max) | `minmax(0,1fr) minmax(300px,354px)`/`clamp(40px,6vw,86px)` (base); `minmax(0,1fr) 300px`/`32px` (@1100–721); `minmax(0,1fr)`/`30px` (@720max) | late wins in all 3 zones; early fully dead | consolidate to late's 3-tier ladder |
| `.hero h1` | `font-weight`, `letter-spacing` | `500`, `-.065em` | never set | gap — early stands, all widths | keep |
| `.hero h1` | `line-height` | `1.01` (base) | `1.04` (base, unconditional, no media override) | late wins, all widths | `1.04` |
| `.hero h1` | `font-size` | `clamp(4.5,8.2vw,7.7rem)` (base); `6rem` (@1000max); `clamp(4.5,15vw,6.5rem)` (@720max) | `clamp(4.6,8vw,7.35rem)` (base); `clamp(4rem,8.2vw,6.25rem)` (@1100–721); `clamp(4.1,14.5vw,6.2rem)` (@720max) | **Correction to `explore.md`**: at 1000px the actual winner is the late **tablet-media** clamp (`clamp(4rem,8.2vw,6.25rem)` → 82px), not the late unconditional base (8vw → 80px) that `explore.md` used — the late era's own 1100–721 media rule is positioned *after* its unconditional base and also matches 1000px, so it wins. Early's flat `6rem` is dead across its entire range: [721,1000] is beaten by late-tablet, [≤720] by late-mobile — never merely "leaked" by the unconditional base. | keep late's 3-tier ladder (it's a deliberately-tuned, already-scoped value from the same redesign pass, not an accidental leak — reverting to `6rem` would undo intentional later tuning with no evidence it regressed) |
| `.hero-bottom` | `display`,`align-items`,`border-top/bottom`,`color`,`font-family`,`font-size`,`letter-spacing` | set in base | never set | gap — early stands, all widths (`font-size:.75rem` constant) | keep |
| `.hero-bottom` | `gap` | `34px`(base) `20px`(@1000max) `8px`(@720max, grid) | `24px`(base) `15px`(@1100–721) `12px 20px`(@720max) | late wins in all 3 zones | consolidate to late's ladder |
| `.hero-bottom` | `padding-block` | `23px`(base) `18px`(@720max) | never set | gap — early's own internal cascade stands: `23px` >720px, `18px`... | **but** late DOES set `padding-block:21px` at @720max — re-check: late touches it only at @720max, not base/tablet → `23px` stands ≥721px (gap), `21px` wins at ≤720px (late beats early's `18px`) | `23px` base (gap, keep); `21px` @720max (late wins) |
| `.hero-bottom` | `display` at ≤720 | `grid` | `flex` (@720max) | late wins — early's mobile grid layout is fully dead | keep late's `flex` (drop early's dead `display:grid`/`grid-template-columns:1fr`) |
| `.hero-bottom` | `justify-content` | never set | `space-between`(base) `flex-start`(@1100–721) | gap other direction — late stands everywhere, `space-between` also carries through @720max since nothing there resets it | keep |
| `.hero-bottom` | `flex-wrap` | `wrap`(@1000max only) | `wrap`(@1100–721, @720max) | both agree wherever they overlap; unset (nowrap) ≥1101 unchanged | keep late's ladder |
| `.project-content` | `padding` | `42px`(base) `28px`(@1000max) `27px 23px`(@720max) | `37px`(base) `27px`(@1100–721) `27px 22px`(@720max) | late wins in all 3 zones | consolidate to late's ladder |
| `.project-visual` | `position`,`display`,`flex-direction`,`justify-content`,`overflow`,`color`,`min-width` | set in base | never set | gap — early stands, all widths | keep |
| `.project-visual` | `background` | `--color-surface-elevated` | `--color-surface-elevated` | same value, no conflict | unchanged |
| `.project-visual` | `padding` | `26px`(base) `20px`(@1000max) `60px 16px`(@720max) | `60px 27px`(base) — **no @1100–721 rule exists** — `58px 16px`(@720max) | late base wins ≥721px (early's `20px`@1000max is fully dead, beaten by late's unconditional base); late @720max wins ≤720px | See risk note below — keep current render (`60px 27px` for [721,∞), `58px 16px` ≤720); do **not** invent a new tablet rule |
| `.project-visual` | `min-height` | `260px`(@720max only) | never set | gap — early stands, ≤720px only | keep |
| `.module-row` | `display`,`align-items`,`border-bottom`,`color` | set in base | never set | gap — early stands | keep |
| `.module-row` | `padding-inline`(L/R) | `16px`(base, via shorthand); `0`(@720max, via shorthand) | `0`(base, `padding-inline`) | late wins ≥721px (`0`); both agree `0` at ≤720px | `0` at all widths |
| `.module-row` | `padding-block`(T/B) | `27px`(base) `24px`(@720max) | never set(base); `22px`(@720max) | gap ≥721px → `27px` stands; late wins ≤720px → `22px` | `27px` base; `22px` @720max |
| `.module-row` | `grid-template-columns`,`gap` | `32px 1fr 110px 1.7fr 22px`/`22px`(base); `25px 1fr 100px 1.2fr 18px`/`14px`(@1000max); `24px 1fr 20px`/`12px`(@720max) | `44px 1fr 110px 1.65fr 20px`/`22px`(base); `44px 1fr 100px 1.2fr 18px`/`15px`(@1100–721); `42px minmax(0,1fr) 20px`/`11px 14px`(@720max) | late wins in all 3 zones | consolidate to late's ladder |
| `.module-row h3` | `font-size`,`font-weight`,`letter-spacing`,`color` | set in base; `font-size:1.125rem`(@720max) | never set(base); `font-size:1.125rem`,`overflow-wrap:anywhere`(@720max, same font-size, adds new prop) | gap ≥721px → early base stands; ≤720px both agree on font-size, late adds `overflow-wrap` | keep early base + late's @720max addition |
| `.module-label` (bare) | all props | font-size/border/padding/radius/width/color (base) | never sets bare `.module-label` — only the higher-specificity `.module-row > .module-label{grid-column:2;grid-row:2}` at @720max | **not actually duplicated** — different selector text, different (positioning-only) properties, no conflict; `.module-row > .module-label` wins on specificity (0,2,0 > 0,1,0), not source order, and only for grid-column/row | no change |
| `.module-row p` | `color` | `--color-text-secondary`(base) | never set | gap — early stands | keep |
| `.module-row p` | `font-size` | `.875rem`(base) | `.875rem`(@720max only, same value) | identical value both eras — no real conflict, safe to keep as one declaration | keep `.875rem` in base only |
| `.module-row p` | `grid-column`,`grid-row` (@720max only) | `2`/`3` | `2/4`/`3` | late wins (`2/4` spans the icon's 20px column too, since the icon sits at `grid-row:1`, no row-3 collision) — deliberate, matches current 3-col mobile grid | keep late's `2/4` |
| `.module-icon` | all | *not present in early era at all* | full styling (base) + `grid-row:1/3`(@720max) | not a duplicate selector — out of scope for this table, zero risk | no change |

**Risk flag — `.project-visual` tablet padding**: at 721–1000px the resolved padding is `60px 27px` (late base, unconditional, never overridden by a tablet-scoped rule) rather than a narrower tablet-tuned value — every sibling selector in the shared `@media(max-width:1100px) and (min-width:721px)` block has its own `.project-visual`-equivalent entry except this one, suggesting a possible redesign oversight. This is the **current, live** render (not a cascade bug — nothing shadows it) so per the "keep what currently renders" default and the "do not change any property beyond the identified fix targets" constraint, this change does **not** add a new tablet rule. Flagged as an Open Question for a human visual pass, explicitly out of scope here.

### Decision: Fix #4 — dead selector (revised finding)

**Confirmed compiled markup**: `Icon.astro:6` emits `<svg class={`icon ${className}`} ...>`; the module loop (`index.astro:46`) renders `<Icon name="arrow" size={18}/>` as the last child of `<a class="module-row">`, compiling to `<svg class="icon">` — never a `<span>`.

**Correction to `explore.md`/proposal**: the late era (line 180, inside the already-correctly-scoped `@media(max-width:720px)` block) already contains `.module-row > .icon:last-child{grid-column:3;grid-row:1}`, which **correctly matches** the compiled `<svg class="icon">` and is the last rule touching this positioning — it is live and working today. The proposal's claim that "the trailing arrow icon falls into default grid flow on mobile" is **not currently true**; the icon is already explicitly positioned by the late-era rule. The only actual defect is that the **early**-era block (line 4) still contains the dead `.module-row>span:last-child{grid-column:3;grid-row:1}`, which matches zero elements — harmless today, but confusing dead code that should be removed as part of the Fix #3 cleanup of that same block.

**Choice**: delete the early-era `.module-row>span:last-child{...}` declaration; make no textual change to the late-era `.module-row > .icon:last-child{...}` rule (already correct).

## File Changes

| File | Action | Description |
|---|---|---|
| `src/lib/icons.ts` | Modify | `mark`'s inner path `fill="#080909"` → `fill="var(--color-surface)"` (1 attribute) |
| `src/styles/portfolio.css` | Modify | `.toolbelt p span{color:...}` value swap; delete now-empty `@media(min-width:1500px)` block; strip `.hero-grid`/`.hero h1`/`.hero-bottom`/`.project-content`/`.project-visual`/`.module-row`(+children)/dead `span:last-child` declarations out of the early `@media(max-width:1000px)` and `@media(max-width:720px)` blocks (leaving all other selectors in those blocks untouched); merge the surviving early-only properties (`display`, `align-items`, `padding-inline`, `border-*`, `color`, `font-family`, `letter-spacing`, `font-weight`, etc. — see table) into the late-era base/`@1100–721`/`@720max` rules for the same selectors |

## Consolidated CSS (ready to drop in)

Late-era base block — replace the existing bare declarations for these selectors with (properties in **bold** are new, merged in from the dead early rules; everything else already present, values may be corrected per the table above):

```css
.hero-grid {
  display: grid;
  align-items: center;
  padding-inline: 0;
  grid-template-columns: minmax(0, 1fr) minmax(300px, 354px);
  gap: clamp(40px, 6vw, 86px);
  padding-top: 38px;
  padding-bottom: 54px;
}
.hero h1 {
  font-weight: 500;
  letter-spacing: -.065em;
  line-height: 1.04;
  font-size: clamp(4.6rem, 8vw, 7.35rem);
}
.hero-bottom {
  display: flex;
  align-items: center;
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
  padding-block: 23px;
  color: var(--color-text-secondary);
  font-family: var(--font-mono);
  font-size: .75rem;
  letter-spacing: .04em;
  gap: 24px;
  justify-content: space-between;
}
.project-content { padding: 37px; }
.project-visual {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  color: var(--color-text-secondary);
  min-width: 0;
  background: var(--color-surface-elevated);
  padding: 60px 27px;
}
.module-row {
  display: grid;
  align-items: center;
  border-bottom: 1px solid var(--color-border);
  color: var(--color-text-secondary);
  padding-inline: 0;
  padding-block: 27px;
  grid-template-columns: 44px 1fr 110px 1.65fr 20px;
  gap: 22px;
}
.module-row h3 { font-size: 1.1875rem; font-weight: 500; letter-spacing: -.03em; color: var(--color-text); }
.module-row p { color: var(--color-text-secondary); font-size: .875rem; }
```

`@media (max-width: 1100px) and (min-width: 721px)` block — no structural change, values already correct per table (early era fully dead here).

`@media (max-width: 720px)` block — replace/add:

```css
.hero-grid { grid-template-columns: minmax(0,1fr); gap: 30px; padding-top: 30px; padding-bottom: 32px; }
.hero-bottom { flex-wrap: wrap; gap: 12px 20px; padding-block: 21px; }
.project-content { padding: 27px 22px; }
.project-visual { padding: 58px 16px; min-height: 260px; }
.module-row { grid-template-columns: 42px minmax(0,1fr) 20px; gap: 11px 14px; padding-block: 22px; }
.module-row h3 { font-size: 1.125rem; overflow-wrap: anywhere; }
.module-row p { grid-column: 2 / 4; grid-row: 3; }
/* .module-row > .icon:last-child{grid-column:3;grid-row:1} already present and correct — no change */
```

Early `@media(min-width:1500px)` block: **delete entirely** (only contained `.hero-grid{padding-block:64px 80px}`, now fully superseded).

Early `@media(max-width:1000px)` and `@media(max-width:720px)` blocks: **remove** the declarations for `.hero-grid`, `.hero h1`, `.hero-bottom`, `.project-content`, `.project-visual`, `.module-row` (+ `h3`/`p`/`span:last-child`) only — all other selectors in those blocks (`.wrap,.nav-wrap`, `.hero-index`, `.about-grid`, `.desktop-nav`, `.toolbelt`, `.contact-*`, `.site-footer`, etc.) stay byte-for-byte unchanged.

## Testing Strategy

| Layer | What to Test | Approach |
|---|---|---|
| Build | No regressions, 10 static pages | `pnpm run build` (green baseline already confirmed by orchestrator) |
| Static/manual | Cascade math holds after edit | Re-diff final `portfolio.css` against the per-property table above; confirm no selector for the 6 targets remains in the early blocks and no untargeted selector was touched |
| Contrast | AA math | Already computed above (5.60:1 light / 8.14:1 dark for Fix #2); no runtime tool needed |
| Visual (human, post-deploy) | `mark` icon knockout in both themes at all 4 sites; toolbelt separator legibility; hero/module responsive breakpoints at ~1000px, ~720px | Explicitly flagged as unverifiable in this environment — carry into PR description |

## Threat Matrix

N/A — no routing, shell, subprocess, VCS/PR automation, executable-file classification, or process-integration boundary.

## Migration / Rollout

No migration required. Single commit, revertible via `git revert`.

## Open Questions

- [ ] `mark` icon at the contact-social Arkelythex link (`index.astro:48`) sits on `--color-surface-alt`, not `--color-surface` — `var(--color-surface)` is a close but not exact match there (new finding, not in `explore.md`'s 3-site check). Net improvement over the status quo either way; flag for human visual pass.
- [ ] `.project-visual` renders `60px 27px` padding at 721–1000px width (no tablet-scoped override exists in either era) — possibly a redesign oversight, but is the current live behavior and out of scope for this change per the "don't touch untargeted properties" constraint. Flag for a follow-up UX check.
- [ ] All visual/interactive claims in this design are static-analysis-verified only (no browser tool available); require a human pass on the deployed site per the proposal's risk section.
