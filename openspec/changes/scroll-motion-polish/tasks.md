# Tasks: Scroll & Motion Polish

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | ~80-100 |
| 400-line budget risk | Low |
| Chained PRs recommended | No |
| Suggested split | Single PR |
| Delivery strategy | auto-chain |
| Chain strategy | stacked-to-main (cached; unused, single PR) |

Decision needed before apply: No
Chained PRs recommended: No
Chain strategy: stacked-to-main
400-line budget risk: Low

### Suggested Work Units

| Unit | Goal | Likely PR | Focused test command | Runtime harness | Rollback boundary |
|------|------|-----------|----------------------|-----------------|-------------------|
| 1 | Scroll-motion layer: tokens, script, markup hooks, CSS | PR 1 | `pnpm run build` | In-browser scroll/hover pass (browser tooling connected this session) | Revert `BaseLayout.astro` script, `index.astro` `data-reveal` attrs, 4 new `portfolio.css` blocks |

## Phase 1: Timing Tokens

- [x] 1.1 `src/styles/portfolio.css`: add `--motion-ease`, `--motion-reveal`, `--motion-stagger-step` to the existing "Personal identity" `:root` block (Decision 1); leave `--motion-fast`/`--motion-slow` unchanged.

## Phase 2: Reveal Script

- [x] 2.1 `src/layouts/BaseLayout.astro`: add the exact reveal `<script is:inline>` from design.md after `<slot />`, before `</body>`. This is a separate block from the existing `<head>` theme-init script — do not merge or move either.

## Phase 3: Reveal Markup Hooks (`src/pages/index.astro`)

- [x] 3.1 Add `data-reveal` to `<section id="projects">`, `.featured-project`, both `.small-visual` anchors.
- [x] 3.2 Add `data-reveal` to `<section id="about">` and `<section id="connect">` (section-level only).
- [x] 3.3 Add `data-reveal` to `<section id="architecture">` and each of the 3 `.principles article`.
- [x] 3.4 Add `data-reveal` to `<section id="opensource">` and the `.module-row` anchor inside the `.map()` loop (static attribute).
- [x] 3.5 Confirm no `data-reveal` on `.hero` or any hero child — hero uses keyframe stagger only, per Decision 4.

## Phase 4: Motion CSS (`src/styles/portfolio.css`)

- [x] 4.1 Append the reveal + stagger-delay block after `:root`: `.motion-ready [data-reveal]`, `.is-visible`, `nth-of-type(2)`/`(3)` delays for `.principles article`/`.module-row`.
- [x] 4.2 Add `@keyframes hero-rise` and the 5 `animation-delay` rules (eyebrow 0ms, h1 90ms, description 180ms, actions 270ms, profile-card 360ms).
- [x] 4.3 Add the 4 deepened hover blocks (`.project-visual img`, `.small-visual img`, `.module-row`, `.principle-icon`) using only transform/opacity/color/border-color/box-shadow/background. Flag — don't silently fix — any drafted rule touching a layout-triggering property (width/height/top/left/margin).
- [x] 4.4 In the EXISTING second `@media (prefers-reduced-motion: reduce)` block near file end, add `.module-row:hover, .principles article:hover .principle-icon { transform: none; }`. Do not create a third block.

## Phase 5: Verification

- [x] 5.1 `pnpm run build` stays green, produces the expected 10 static pages.
- [x] 5.2 Diff `package.json`/`pnpm-lock.yaml`: zero new dependencies.
- [x] 5.3 Grep confirms every `[data-reveal]` element has a matching CSS rule.
- [x] 5.4 Grep confirms exactly 2 `prefers-reduced-motion` blocks (not 3).
- [x] 5.5 In-browser: disable JS, confirm all `[data-reveal]` content visible.
- [x] 5.6 In-browser: emulate reduced-motion, confirm no stagger/reveal runs.
- [x] 5.7 In-browser: scroll top-to-bottom and back up, confirm reveals fire once, no re-trigger.
- [x] 5.8 In-browser: hover `.project-visual`/`.small-visual`/`.module-row`/`.principles article`; confirm hero stagger on fresh load.
