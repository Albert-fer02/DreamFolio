# Design: Scroll & Motion Polish

## Technical Approach

One vanilla `IntersectionObserver` script (placed after `<slot />` in `BaseLayout.astro`, not in `<head>`) toggles `is-visible` on `[data-reveal]` elements; CSS owns the actual transition. Hero entrance uses pure CSS `@keyframes` + per-element `animation-delay` (no JS, no scroll dependency). Four hover targets get deepened combined transitions. Every new/modified rule in this change uses one easing curve and a small duration ladder defined as CSS custom properties, extending `portfolio.css`'s existing "Personal identity" `:root` block (not `global.css`, not a parallel block).

## Architecture Decisions

### Decision: Timing system — reuse and extend existing tokens

**Choice**: Add to the existing `:root` block (portfolio.css:7-13):
```css
--motion-ease: cubic-bezier(.16,1,.3,1);
--motion-reveal: 640ms;
--motion-stagger-step: 90ms;
```
Keep `--motion-fast: 180ms` (icon hovers) and `--motion-slow: 360ms` (border/shadow hovers) unchanged and reuse them for the new hover deepening. `--motion-ease` applies only to NEW/MODIFIED rules in this change, not a sitewide rewrite of pre-existing `ease` transitions.
**Alternatives considered**: New parallel token names (`--reveal-ease` etc.); a bouncy/elastic curve for "signature" feel.
**Rationale**: The file already established `--motion-fast`/`--motion-slow` naming — inventing parallel tokens would fragment the system the proposal explicitly asks to unify. `cubic-bezier(.16,1,.3,1)` is a pure ease-out-expo (no overshoot), reading as content decelerating into place — matches the site's restrained/editorial tone; a bouncy curve would clash with it (per explore.md risk: "motion feeling generic/templated"). 5-step hero stagger at 90ms increments totals 360ms = `--motion-slow`, keeping the system internally coherent rather than introducing an unrelated number.

### Decision: Reveal gating mechanism — success-gated `motion-ready` class

**Choice**: Script adds `motion-ready` to `<html>` ONLY after `prefers-reduced-motion` is confirmed off, `IntersectionObserver` exists, targets exist, and `observe()` calls complete without throwing. CSS hides `[data-reveal]` only under `.motion-ready` scope.
**Alternatives considered**: Add `motion-ready` unconditionally at script start, before observer setup.
**Rationale**: If `motion-ready` were added before setup and setup then threw, elements would be CSS-hidden with no observer ever attached to reveal them — a permanent content-loss bug. Gating the class on successful setup means any failure (script never runs, throws, or reduced-motion/no-IO) leaves elements in their default, always-visible state. This is the exact mechanism verified against the "content never disappears if JS fails" requirement.

### Decision: Script placement — end of `<body>`, not `<head>`

**Choice**: Place `<script is:inline>` after `<slot />`, before `</body>` in `BaseLayout.astro`.
**Alternatives considered**: Match theme-init's `<head>` placement; `DOMContentLoaded` listener.
**Rationale**: Theme-init must run pre-paint to avoid a flash — an ordering constraint that doesn't apply here. Astro's `is:inline` scripts execute synchronously in document order; run in `<head>`, `document.querySelectorAll('[data-reveal]')` would return an empty list (body not parsed yet). End-of-body placement guarantees targets exist without adding a `DOMContentLoaded` listener.

### Decision: Section-level vs. card-level reveal nesting

**Choice**: `#about` and `#connect` (compact, single-viewport) reveal only at the section level. `#projects`, `#architecture`, `#opensource` (tall/stacked content) reveal at BOTH the section (heading) and card level (`.featured-project`, `.small-visual` ×2, `.principles article` ×3, `.module-row` ×3), each independently observed. Hero does NOT get `data-reveal` — it uses only the dedicated keyframe stagger (Decision 4).
**Alternatives considered**: Reveal every section as one block only; reveal every card only, no section wrapper.
**Rationale**: Nested `[data-reveal]` elements don't conflict — each has its own independent transform/opacity state; a parent crossing threshold reveals its heading while a still-hidden child (e.g. `.featured-project`, further down a tall section) reveals separately when the user keeps scrolling. `#about`/`#connect` have no distinct nested targets and fit a viewport, so one reveal is sufficient. Hero is above the fold at load — IO would fire near-instantly for it, duplicating the stagger's own timing; using both would fight for the same content.

## Data Flow

```
Page load → BaseLayout <script is:inline> (end of body)
  → prefers-reduced-motion? or no IntersectionObserver? → return (no class added, all visible)
  → new IntersectionObserver(threshold:0.15, rootMargin:'0px 0px -10% 0px')
  → observe() every [data-reveal] → add html.motion-ready (only on success)
  → scroll → entry.isIntersecting → target.classList.add('is-visible'); io.unobserve(target)
  → CSS transition (opacity/transform, --motion-reveal/--motion-ease) plays
```

## Exact Scroll-Reveal Script (`BaseLayout.astro`, after `<slot />`)

```html
<script is:inline>
  (function () {
    try {
      var reduceMotion = window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduceMotion || !('IntersectionObserver' in window)) return;
      var targets = document.querySelectorAll('[data-reveal]');
      if (!targets.length) return;
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15, rootMargin: '0px 0px -10% 0px' });
      targets.forEach(function (el) { io.observe(el); });
      document.documentElement.classList.add('motion-ready');
    } catch (e) {}
  })();
</script>
```
`threshold: 0.15` + `rootMargin: '0px 0px -10% 0px'` (shrinks the effective viewport bottom by 10%) avoids both a laggy edge-trigger (threshold 0) and a late near-full-visibility trigger.

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `src/layouts/BaseLayout.astro` | Modify | Add reveal script (above) after `<slot />` |
| `src/pages/index.astro` | Modify | Add `data-reveal` attributes (below); no hero markup change |
| `src/styles/portfolio.css` | Modify | New `:root` tokens, reveal CSS, hero keyframes, 4 deepened hovers |

## `data-reveal` Placement (`src/pages/index.astro`)

| Element | Line ref (current) | Attribute added |
|---|---|---|
| `<section id="projects">` | 30 | `data-reveal` |
| `<article class="featured-project">` | 32 | `data-reveal` |
| `<a class="small-visual terminal-visual">` | 37 | `data-reveal` |
| `<a class="small-visual">` | 38 | `data-reveal` |
| `<section id="about">` | 42 | `data-reveal` |
| `<section id="architecture">` | 44 | `data-reveal` |
| each `.principles article` (×3, same line) | 44 | `data-reveal` on each `<article>` |
| `<section id="opensource">` | 46 | `data-reveal` |
| `.map()` loop `<a ... class="module-row">` | 46 | add `data-reveal` as static attr inside the map callback: `<a href={...} class="module-row" data-reveal>` — static attributes inside `.map()` JSX-like callbacks are added the same as on any element; no per-item conditional needed |
| `<section id="connect">` | 48 | `data-reveal` |
| Hero (`.hero`, `.hero-eyebrow`, `h1`, `.hero-description`, `.actions`, `ProfileCard`) | 17-27 | none — stagger only (below) |

## Exact CSS (portfolio.css)

**Reveal + stagger delay** (append after `:root` block):
```css
.motion-ready [data-reveal] {
  opacity: 0; transform: translateY(28px);
  transition: opacity var(--motion-reveal) var(--motion-ease),
              transform var(--motion-reveal) var(--motion-ease);
}
.motion-ready [data-reveal].is-visible { opacity: 1; transform: translateY(0); }
.motion-ready .principles article:nth-of-type(2),
.motion-ready .module-row:nth-of-type(2) { transition-delay: var(--motion-stagger-step); }
.motion-ready .principles article:nth-of-type(3),
.motion-ready .module-row:nth-of-type(3) { transition-delay: calc(var(--motion-stagger-step) * 2); }
```

**Hero stagger**:
```css
@keyframes hero-rise { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
.hero-eyebrow, .hero h1, .hero-description, .actions, .profile-card {
  animation: hero-rise var(--motion-reveal) var(--motion-ease) both;
}
.hero-eyebrow { animation-delay: 0ms; }
.hero h1 { animation-delay: 90ms; }
.hero-description { animation-delay: 180ms; }
.actions { animation-delay: 270ms; }
.profile-card { animation-delay: 360ms; }
```
No new reduced-motion rule needed: the existing global block (`*,*::before,*::after{animation:none!important;transition:none!important}`, line 4) already removes `animation: hero-rise ...` entirely — including its `both` fill-mode phantom state — so elements fall back to their un-animated (fully visible) computed style. Verified: no static `opacity:0` exists outside the keyframe.

**Deepened hovers** (all under `.icon`-free selectors already used by the file):
```css
.project-visual img { transition: transform var(--motion-fast) var(--motion-ease), box-shadow var(--motion-fast) var(--motion-ease); }
.project-visual:hover img { transform: translateY(-8px) scale(1.01); box-shadow: 0 32px 64px #000a; }

.small-visual img { transition: transform var(--motion-fast) var(--motion-ease); }
.small-visual:hover img { transform: scale(1.045); } /* up from 1.025; no box-shadow: overflow:hidden clips it */

.module-row { transition: background var(--motion-fast) var(--motion-ease), border-color var(--motion-fast) var(--motion-ease), transform var(--motion-fast) var(--motion-ease); }
.module-row:hover { border-color: color-mix(in srgb, var(--color-accent) 30%, var(--color-border)); transform: translateX(4px); }

.principle-icon { transition: transform var(--motion-fast) var(--motion-ease), border-color var(--motion-fast) var(--motion-ease), background var(--motion-fast) var(--motion-ease), box-shadow var(--motion-fast) var(--motion-ease); }
.principles article:hover .principle-icon { border-color: color-mix(in srgb, var(--color-accent) 45%, var(--color-surface)); background: color-mix(in srgb, var(--color-accent) 8%, var(--color-surface)); transform: translateY(-3px); box-shadow: 0 10px 24px color-mix(in srgb, var(--color-accent) 18%, transparent); }
```
`.project-visual`/`.small-visual` transform-on-hover is already covered by the existing reduced-motion neutering line (`.project-visual:hover img,.small-visual:hover img{transform:none}`, block 1) — no change needed there. Two NEW hover transforms require adding to the SECOND existing reduced-motion block (line 229-232), not a third block:
```css
.module-row:hover,
.principles article:hover .principle-icon { transform: none; }
```
`box-shadow`/`border-color`/`background` changes are not added to either reduced-motion block — consistent with the file's existing precedent of only neutering `transform`, since the blanket `transition: none !important` already removes the animated interpolation for those properties.

## Testing Strategy

| Layer | What to Test | Approach |
|---|---|---|
| Static | No-JS reveal visibility | Disable JS in browser devtools, confirm all `[data-reveal]` content fully visible |
| Static | Reduced-motion | OS/browser emulate `prefers-reduced-motion: reduce`, confirm no delay/stagger/reveal-hide |
| Manual/visual | IO threshold feel, hover depth, hero stagger timing | Real in-browser scroll pass (apply phase) per proposal's explicit success criterion |
| Build | Bundle budget | `pnpm run build`, confirm script stays well under 1KB minified, no new dependency in `package.json` |

## Threat Matrix

N/A — no routing, shell, subprocess, VCS/PR automation, executable-file classification, or process-integration boundary.

## Migration / Rollout

No migration required. Additive CSS/JS/markup only; revert per proposal's rollback plan.

## Open Questions

None — all decisions in scope resolved above.
