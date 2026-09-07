# Scroll Motion Specification

## Purpose

Defines the scroll-driven reveal, hero entrance stagger, and hover-state motion layer for DreamFolio's static sections, built with vanilla `IntersectionObserver` and CSS only — no new dependency, no content hidden from non-JS or reduced-motion users.

## Requirements

### Requirement: One-Time Scroll Reveal

The system MUST reveal each reveal target (hero; `#projects`, `#about`, `#architecture`, `#opensource`, `#connect`; `.featured-project`; the `.small-visual` pair; each of the 3 `.principles article`; each of the 3 `.module-row`) exactly once via `IntersectionObserver`, applying a reveal class on first intersection and unobserving the element immediately after.

#### Scenario: Reveal target enters viewport

- GIVEN a reveal target is below the initial viewport
- WHEN the user scrolls it into view
- THEN it transitions to its revealed state
- AND the observer stops observing that element

#### Scenario: Re-scrolling does not re-trigger

- GIVEN a reveal target has already been revealed once
- WHEN the user scrolls it out of view and back into view again
- THEN no reveal transition replays and no observer event fires for it

### Requirement: Progressive Enhancement Without JavaScript

The system MUST render every reveal target fully visible by default in CSS, independent of any JS execution succeeding.

#### Scenario: JavaScript fails or is disabled

- GIVEN JavaScript fails to load or is disabled in the browser
- WHEN the page renders
- THEN every reveal target is fully visible immediately
- AND no content is hidden, delayed, or dependent on a `[data-motion-ready]`-style hook being set by script

### Requirement: Reduced Motion Compliance

The system MUST NOT run the reveal script or the hero stagger animation when `prefers-reduced-motion: reduce` is set, and MUST show all content immediately in that case.

#### Scenario: Reduced motion is requested

- GIVEN the user's OS/browser sets `prefers-reduced-motion: reduce`
- WHEN the page loads
- THEN the reveal script does not attach observers or toggle classes
- AND the hero stagger animation does not run
- AND all content is visible immediately, matching the no-motion experience (not an instant post-delay reveal)

### Requirement: CSS-Only Hero Entrance Stagger

The system MUST animate the hero's child elements (eyebrow, `h1`, description, actions, ProfileCard) into view with a staggered `animation-delay`, in that order, using CSS only, on page load, with no JavaScript dependency for this specific behavior.

#### Scenario: Hero first paints with motion allowed

- GIVEN the homepage loads with motion allowed (no reduced-motion preference)
- WHEN the hero section first paints
- THEN eyebrow, `h1`, description, actions, and ProfileCard animate in with increasing `animation-delay` values in that listed order
- AND this stagger works with JavaScript disabled

### Requirement: Compositor-Safe Hover Transitions

The system MUST restrict hover transitions on `.project-visual`, `.small-visual`, `.module-row`, and `.principle-icon` to `transform`, `opacity`, `color`, `border-color`, and `box-shadow` properties only.

#### Scenario: User hovers a deepened hover target

- GIVEN a user hovers `.project-visual`, `.small-visual`, `.module-row`, or `.principle-icon`
- WHEN the hover transition runs
- THEN only `transform`, `opacity`, `color`, `border-color`, and/or `box-shadow` change
- AND no `width`, `height`, `top`, `left`, `margin`, or other layout-triggering property is part of the transition

### Requirement: Zero-Dependency Bundle Budget

The system MUST add zero new entries to `package.json` dependencies/devDependencies, and the new scroll-reveal script's minified output MUST stay well under 1KB.

#### Scenario: Build after the change

- GIVEN the scroll-motion change is implemented
- WHEN `pnpm run build` runs
- THEN it completes without adding any new dependency to `package.json`
- AND the reveal script's minified size is well under 1KB

### Requirement: Consistent Motion Timing System

All reveal, stagger, and hover transitions added by this capability MUST share one small, deliberate set of easing and duration values rather than per-component ad hoc numbers.

#### Scenario: Motion CSS is inspected for timing consistency

- GIVEN the new motion CSS (reveal transitions, hero stagger keyframes, hover transitions) is written
- WHEN the CSS is grepped for `cubic-bezier(` and `ease` timing functions
- THEN no more than 2 distinct easing values appear across all new motion CSS
- AND no more than 3 distinct duration values appear across all new motion CSS
