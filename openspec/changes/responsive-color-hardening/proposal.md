# Proposal: Responsive & Color Critical Hardening

## Intent

The `dual-theme-design-system` change shipped a working light/dark theme, but a follow-up critical pass (`explore.md`) found two live, user-visible bugs it missed plus a CSS cascade landmine it didn't touch. First, `src/lib/icons.ts`'s `mark` icon hardcodes its knockout fill to `#080909`, producing a visible dark speck in light mode across the Navbar, `ProfileCard`, and footer. Second, `.toolbelt p span` fails WCAG AA in dark mode (3.50:1 vs. the 4.5:1 floor). Third, `portfolio.css` carries two non-nested "eras" of responsive rules for the same selectors; equal-specificity source-order resolution means the later, unconditional block silently overrides earlier tablet/mobile tuning (e.g. `.hero h1` renders ~80px instead of the intended flat 96px at ~1000px width) — currently masked by coincidence at common widths, not guaranteed to stay masked. Fourth, a dead selector (`.module-row>span:last-child`) never matches actual markup (`<svg class="icon">`), leaving the mobile trailing-arrow icon unpositioned. This change fixes all four now, before they compound.

## Scope

### In Scope
- Fix #1: make `icons.ts`'s `mark` knockout fill theme-aware (e.g. `var(--color-surface)`) instead of hardcoded `#080909`
- Fix #2: replace `.toolbelt p span{color:#64685f}` with a new value/token that clears WCAG AA (≥4.5:1) against BOTH `--color-surface` values (dark `#080909`, light `#f3eadc`), while still reading as muted/secondary (separator glyph, not body text)
- Fix #3: consolidate `portfolio.css`'s duplicate responsive rule sets for `.hero-grid`, `.hero h1`, `.hero-bottom`, `.project-content`/`.project-visual` padding, and `.module-row`+children into one canonical breakpoint ladder per selector; default to each property's current last-winning (actually-rendered) value, except where the earlier dead rule's intent is demonstrably better tuned — those cases are flagged as an explicit decision for `sdd-design`, not silently resolved here
- Fix #4: correct `.module-row>span:last-child{grid-column:3;grid-row:1}` to target the real last child (`.module-row>.icon:last-child` or equivalent `svg` selector)
- WCAG 2.1 AA verification (4.5:1 body / 3:1 large-UI) for every pairing touched by fixes #1/#2, both themes, via relative-luminance math (same method as `dual-theme-design-system`)

### Out of Scope
- `link-button.tsx` / `EnhancedHero.tsx` hardcoded old-palette colors — dead code, unimported by any page (same precedent as prior change)
- The flagged-but-unconfirmed 320px mobile-header crowding concern — needs a human/browser check first, not a blind fix
- Any change to `global.css` token values — independently reverified as WCAG-AA-compliant, no bugs found

## Capabilities

### New Capabilities
None.

### Modified Capabilities
None (no prior specs exist for theming or responsive layout — `dual-theme-design-system` shipped without formal spec capabilities; this change follows the same pattern).

## Approach

Four targeted, independent fixes in two files (`src/lib/icons.ts`, `src/styles/portfolio.css`). Fixes #1/#2/#4 are mechanical, low-risk value/selector corrections. Fix #3 requires careful before/after cascade tracing per affected property to avoid silently changing a currently-correct resolved value while removing the dead declaration — `sdd-design` must enumerate each property's current winner, each dead rule's intent, and decide (with stated reasoning) which value survives the consolidation where they diverge.

## Affected Areas

| Area | Impact | Description |
|------|--------|--------------|
| `src/lib/icons.ts` | Modified | `mark` icon knockout `fill` becomes theme-aware |
| `src/styles/portfolio.css` | Modified | `.toolbelt p span` color value; dead `.module-row>span:last-child` selector fixed; duplicate `.hero-grid`/`.hero h1`/`.hero-bottom`/`.project-content`/`.project-visual`/`.module-row` responsive rule sets consolidated into one breakpoint ladder |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| No browser/rendering tool is available in this environment (confirmed across two sessions) — no visual/interactive claim in this change can be live-verified | High (environmental constant) | Rely on `pnpm run build` success + hand-traced cascade math + relative-luminance contrast math, same method `explore.md` used; state plainly this is not a substitute for a human visual pass on the deployed site |
| Cascade consolidation (#3) accidentally changes a property NOT identified as dead/wrong | Med | Design phase enumerates every touched property's current winner and dead-rule intent explicitly before editing; tasks phase verifies against that enumeration, not ad hoc |
| New `.toolbelt` color choice reads too prominent (full-emphasis) or too faint (illegible) without visual check | Low-Med | Constrain to a value that clears AA with margin on both surfaces while staying visually closer to muted/secondary text than to primary body text; flag for human visual pass |

## Rollback Plan

All changes are confined to `src/lib/icons.ts` and `src/styles/portfolio.css`, no schema/data/dependency changes. Revert via `git revert` of the change's commit(s).

## Dependencies

None external. No new npm packages.

## Success Criteria

- [ ] `mark` icon knockout renders correctly (no visible speck) in both themes
- [ ] `.toolbelt p span` clears WCAG 2.1 AA (≥4.5:1) against both `--color-surface` values
- [ ] `.hero h1`, `.hero-grid`, `.hero-bottom`, `.project-content`/`.project-visual` padding, and `.module-row`+children each resolve from exactly one canonical rule per breakpoint, with every value change explicitly justified in the design decision log
- [ ] `.module-row`'s trailing icon is explicitly positioned on mobile via a selector that matches actual rendered markup
- [ ] `pnpm run build` stays green, 10 static pages, no errors
- [ ] Risk section's no-browser-verification caveat is carried forward to the PR description for a human visual pass post-deploy
