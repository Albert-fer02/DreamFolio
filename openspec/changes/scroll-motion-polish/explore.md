# Explore: Scroll & Motion Polish (Award-Tier UI/UX Pass)

## Context

User asked whether DreamFolio's UI/UX can reach "top global" / award-tier quality (Awwwards/FWA-caliber), then explicitly authorized implementation: "implementa todo lo necesario para ser 10/10."

## Research (external, this session)

- Web Interface Guidelines (Vercel, fetched this session) — accessibility, focus states, forms, animation (`prefers-reduced-motion`, animate only `transform`/`opacity`), typography, performance, navigation, touch, dark mode.
- Award-winning developer/architect portfolios reference set: Brittany Chiang (dark theme, clean typography, smooth scroll reveals — closest positioning match to DreamFolio), CUSP, Griflan (Awwwards Site of the Day-caliber, scroll-triggered reveals, asymmetric layout). 3D/WebGL-heavy portfolios (Bruno Simon-tier) are a different genre (creative/agency), not the right reference for a software-architect/fintech portfolio.
- Consistent finding across both searches: the single biggest differentiator between "clean portfolio" and "award-tier portfolio" is **purposeful scroll-driven motion** — section reveals, staggered hero entrance, deeper hover micro-interactions — not gimmicks.

## Current State (verified against live code)

- **Zero scroll-driven animation anywhere.** Every section (`hero`, `#projects`, `#about`, `#architecture`, `#opensource`, `#connect` — 6 total, confirmed via grep on `src/pages/index.astro`) renders fully visible with no entrance treatment.
- **Zero JS-driven interaction beyond the theme toggle and mobile menu.** `Navbar` is the only hydrated React island (`client:load`); every section is static Astro markup. This matters: a scroll-reveal mechanism should be a small vanilla script (matching the established no-flash-init-script pattern in `BaseLayout.astro`), not a React island — adding React hydration for this would be inconsistent with the project's static-first architecture and its own explicit "no new dependencies" convention (confirmed repeatedly this session: `motion`/Framer Motion was just removed for being unused).
- `.project-visual:hover img{transform:translateY(-5px)}`, `.small-visual:hover img{transform:scale(1.025)}`, `.module-row:hover{background:...}` — hover states exist but are shallow (single-property, no depth/easing refinement).
- `@media(prefers-reduced-motion:reduce)` already exists (two blocks, confirmed in the recent cascade-consolidation work) — any new motion must respect this existing convention, not add a third block.
- Hero renders `hero-eyebrow`, `h1`, `hero-description`, `.actions`, `ProfileCard` all at once on load — no staged/staggered entrance.
- Build is currently ~58KB gzip client JS (Navbar island only) — very lean; this is a real asset to protect, not just a metric.

## Approaches

1. **CSS + native `IntersectionObserver`, vanilla JS, zero new deps** — a small script (similar footprint to the theme-init script) toggles a class (e.g. `is-visible`) on each section/card when it enters the viewport; CSS handles the actual `transform`/`opacity` transition. Respects `prefers-reduced-motion` by skipping the observer setup entirely (elements render visible immediately). Pros: zero bundle growth, consistent with the project's established "no new deps" discipline this session, full control over easing/timing. Cons: slightly more manual wiring than a library; no built-in stagger/orchestration helpers.
2. **Add a scroll-animation library (e.g. GSAP + ScrollTrigger, or a lighter alternative)** — Pros: richer orchestration primitives (timelines, scrub, pinning) matching what top-tier sites like Griflan/CUSP actually use. Cons: reintroduces exactly the kind of dependency the user's own repo history has been actively removing this session (Framer Motion was deleted minutes ago for being unused); GSAP's core is ~30-70KB depending on plugins, more than doubling current JS weight for a personal portfolio.
3. **Hero entrance choreography** (staggered fade/slide-up of eyebrow → h1 → description → actions → ProfileCard) — can layer on top of either approach 1 or 2, using CSS `animation-delay` per element (no JS needed for this specific piece, since it's a one-time on-load sequence, not scroll-driven).
4. **Deeper hover micro-interactions** on `.project-visual`, `.small-visual`, `.module-row`, `.principle-icon` — extend existing single-property hovers with combined transform+shadow+border-color transitions, still `transform`/`opacity`/`color`-only per the Guidelines' animation rule (never animate layout-triggering properties like `width`/`top`).

## Recommendation

Approach 1 (vanilla IntersectionObserver) + 3 (hero stagger) + 4 (deeper hovers), explicitly rejecting approach 2 (no new dependency) — matches the project's own established discipline from earlier in this session and keeps the ~58KB JS budget essentially untouched (the new scroll script will be well under 1KB).

## Scope for the proposal

1. Vanilla scroll-reveal script + CSS: sections and key cards (`.hero`, work/about/architecture/opensource/connect sections, `.featured-project`, `.small-visual` pair, `.principles article`, `.module-row`) fade+slide into view on first scroll-into-viewport, one-time (not re-triggering on scroll-back-up, to avoid distracting repeat animation).
2. Hero entrance stagger on page load (CSS-only, `animation-delay` per element).
3. Deepened hover states on project visuals, module rows, and principle icons (transform + shadow + border, still transform/opacity-safe).
4. `prefers-reduced-motion` compliance: reduced-motion users get all content immediately visible, no reveal delay, no stagger — verified against the two existing `prefers-reduced-motion` blocks rather than adding a third.
5. Explicitly OUT OF SCOPE: WebGL/3D/canvas work (wrong genre for this portfolio's positioning, per research); any new npm dependency; changing the underlying color/token system (already hardened this session) or the responsive breakpoint ladder (already consolidated this session).

## Risks

- No browser tool is available in this environment at the time of writing this doc... *(update: browser IS connected this session — earlier in this same conversation, once connected)* — so this change should get a real visual/scroll pass in-browser before merge, not just static reasoning, since motion timing/feel is inherently a visual judgment call.
- IntersectionObserver thresholds/margins need real tuning (not just correct code) to avoid reveals feeling too early/late — design phase should pick concrete values and the apply phase should visually verify them with the now-connected browser.
- Risk of motion feeling generic/templated rather than "signature" — mitigated by keeping easing/timing consistent with the site's existing restrained, editorial tone (the site already uses `cubic-bezier`-free simple transitions; introduce one consistent easing curve site-wide rather than per-component ad hoc curves).

## Ready for Proposal

Yes.
