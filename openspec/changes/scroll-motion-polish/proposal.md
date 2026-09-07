# Proposal: Scroll & Motion Polish

## Intent

DreamFolio currently renders every section fully visible on load with zero scroll-driven motion, a shallow single-property hover set, and no hero entrance choreography. Research this session (Web Interface Guidelines + award-tier portfolio references) found purposeful scroll-driven motion is the single biggest differentiator between a "clean" and an "award-tier" portfolio. The user explicitly authorized closing this gap ("implementa todo lo necesario para ser 10/10"). This proposal adds that motion layer without violating the site's established static-first, zero-new-dependency discipline.

## Scope

### In Scope
- Vanilla `IntersectionObserver` scroll-reveal script (placed like the existing no-flash theme-init script in `BaseLayout.astro`) adding an `is-visible`-style class, one-time per element (unobserve after first reveal).
- CSS reveal treatment gated behind a `[data-motion-ready]`-style hook; default state is visible so content never disappears if JS fails (progressive enhancement).
- Reveal targets: hero, and `#projects`, `#about`, `#architecture`, `#opensource`, `#connect`; plus `.featured-project`, the `.small-visual` pair, `.principles article` (×3), `.module-row` (×3).
- CSS-only hero entrance stagger (`animation-delay` per element: eyebrow → h1 → description → actions → ProfileCard), page-load only, no JS.
- Deepened hover states on `.project-visual`, `.small-visual`, `.module-row`, `.principle-icon` (combined transform + shadow + border-color), animating only `transform`/`opacity`/`color`/`border-color`/`box-shadow`.
- `prefers-reduced-motion` compliance: reveal script and stagger are skipped entirely when reduced motion is requested — content is already visible, not delayed-then-instant.
- One consistent easing/timing system used site-wide.

### Out of Scope
- WebGL/3D/canvas effects (wrong genre for this portfolio's positioning).
- Any new npm dependency (GSAP/animation libraries explicitly rejected).
- Changes to the color/token system or responsive breakpoint ladder (both hardened earlier this session).

## Capabilities

### New Capabilities
- `scroll-motion`: vanilla IntersectionObserver-driven scroll reveals, CSS hero stagger, deepened hover states, and `prefers-reduced-motion` compliance for the portfolio's static sections.

### Modified Capabilities
None.

## Approach

Vanilla `IntersectionObserver` + CSS (approach 1 from exploration), explicitly rejecting a scroll-animation library. A small script toggles reveal classes; CSS owns the transition. Hero stagger is pure CSS `animation-delay`. Hover states extend existing single-property transitions into multi-property, transform/opacity-safe treatments per the Web Interface Guidelines.

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `src/layouts/BaseLayout.astro` | Modified | Add small inline/vanilla scroll-reveal script alongside existing theme-init script |
| `src/pages/index.astro` | Modified | Add reveal/stagger data hooks to hero and section/card markup |
| CSS (global or component-scoped) | Modified | Reveal transitions, hero stagger keyframes, deepened hover states, reduced-motion guards |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Motion feels generic/templated | Medium | One consistent easing/timing curve site-wide, not per-component ad hoc values |
| IntersectionObserver thresholds feel too early/late | Medium | Design phase picks concrete values; apply phase verifies visually in-browser |
| JS bundle growth erodes lean ~58KB gzip budget | Low | New script kept well under 1KB minified, no new dependency |

## Rollback Plan

Revert the script addition in `BaseLayout.astro` and the CSS/markup hooks in `index.astro`; site returns to its current fully-visible, no-motion state with no dependency or build-config changes to unwind.

## Dependencies

None (explicitly zero new npm packages).

## Success Criteria

- [ ] `pnpm run build` stays green with no new dependency in `package.json`
- [ ] New scroll-reveal script is well under 1KB minified
- [ ] Content is fully visible/usable with JavaScript disabled
- [ ] `prefers-reduced-motion` users see all content immediately, no delay or stagger
- [ ] Real in-browser visual/scroll pass confirms reveal and hover timing before merge
