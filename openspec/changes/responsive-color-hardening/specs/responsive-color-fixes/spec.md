# Responsive Color Fixes Specification

## Purpose

Defines testable acceptance criteria for the four fixes in this change: the
theme-unaware `mark` icon knockout, the `.toolbelt p span` contrast failure,
the duplicated `portfolio.css` responsive cascade, and the dead
`.module-row` trailing-icon selector. No prior spec capability exists for
theming or responsive layout (`dual-theme-design-system` shipped without
one); this spec follows that precedent as a pragmatic, non-capability-named
grouping covering all four fixes.

## Requirements

### Requirement: Theme-aware mark icon knockout fill

The `mark` icon's inner knockout path MUST NOT render with a fixed
`fill="#080909"`. It MUST resolve to the active theme's surface color so the
knockout blends into its background in every theme where the icon appears
(Navbar wordmark, `ProfileCard` caption, footer Arkelythex link).

#### Scenario: Light theme active

- GIVEN `[data-theme="light"]` is active
- WHEN the `mark` icon renders in the Navbar, `ProfileCard`, or footer
- THEN the knockout fill value MUST equal the light theme's `--color-surface`
  (`#f3eadc`), not `#080909`

#### Scenario: Dark theme active

- GIVEN dark theme (default, no `[data-theme="light"]`) is active
- WHEN the `mark` icon renders in the Navbar, `ProfileCard`, or footer
- THEN the knockout fill value MUST equal the dark theme's `--color-surface`
  (`#080909`)

### Requirement: Toolbelt separator contrast

`.toolbelt p span` color MUST clear WCAG 2.1 AA (≥4.5:1 relative-luminance
contrast) against the active `--color-surface` value in both themes, while
remaining visually distinct from (lower emphasis than) primary body text.

#### Scenario: Dark theme surface

- GIVEN dark theme's `--color-surface` is `#080909`
- WHEN relative-luminance contrast is computed between the new
  `.toolbelt p span` color and `#080909`
- THEN the ratio MUST be ≥4.5:1

#### Scenario: Light theme surface

- GIVEN light theme's `--color-surface` is `#f3eadc`
- WHEN relative-luminance contrast is computed between the new
  `.toolbelt p span` color and `#f3eadc`
- THEN the ratio MUST be ≥4.5:1

### Requirement: Single cascade winner per responsive selector

For each of `.hero-grid`, `.hero h1`, `.hero-bottom`, `.project-content`,
`.project-visual` (padding), and `.module-row` plus its children, the
stylesheet MUST declare each affected property for a given selector and
breakpoint range exactly once across the cascade. No selector covered by
this consolidation may appear in more than one rule block that applies to
the same viewport width for the same property.

#### Scenario: No duplicate selector blocks remain

- GIVEN the consolidated `portfolio.css`
- WHEN each of the six selectors above is searched across the full
  stylesheet
- THEN each selector MUST resolve its listed properties from exactly one
  rule per breakpoint range (verifiable by counting rule-block occurrences
  per selector per property; no second, later, unconditional or
  differently-scoped block may exist for the same property)

#### Scenario: Resolved value matches the design decision log

- GIVEN a property whose current two-era cascade produces a specific
  resolved value at a given width (per `explore.md`'s cascade trace)
- WHEN the consolidated single rule is evaluated at that width
- THEN the resulting value MUST match the value the design phase recorded
  as the intended winner, and any divergence from the current
  actually-rendered value MUST be explicitly justified in the design
  decision log

### Requirement: Trailing icon selector matches rendered markup

The mobile (`≤720px`) `.module-row` trailing-icon positioning rule MUST use
a selector that matches the actual rendered element, `<svg class="icon">`,
not a bare `span`.

#### Scenario: Mobile breakpoint selector match

- GIVEN viewport width ≤720px
- WHEN a `.module-row`'s trailing `Icon` component renders (compiled to
  `<svg class="icon">`)
- THEN the CSS selector targeting it MUST be `.module-row > svg.icon:last-child`
  or an equivalent selector that matches `svg.icon`, MUST NOT be
  `.module-row > span:last-child`, and MUST apply the intended
  `grid-column`/`grid-row` positioning to that element
