# Repo Hygiene Specification

## Purpose

This change declares no new or modified capabilities (proposal.md:
"New Capabilities: None. Modified Capabilities: None") because it changes no
runtime or user-facing behavior. It only corrects stale documentation,
removes dead configuration, adds a license file, and adds one e2e regression
check for existing behavior. No prior spec exists for repo-hygiene work.
Following the `responsive-color-hardening` precedent (also "None"
capabilities, spec written anyway for its testable fixes), this spec
captures the four testable acceptance criteria the proposal's own Success
Criteria already state, as a pragmatic non-capability-named grouping. These
are content/config correctness checks, not new system behavior.

## Requirements

### Requirement: 404 page test coverage

The test suite MUST include an automated Playwright regression spec for
`404.astro`, following the existing `tests/home/` Page Object pattern.

#### Scenario: 404 spec exists and passes

- GIVEN the Playwright suite under `tests/`
- WHEN `pnpm test` runs
- THEN a spec under `tests/404/` MUST execute and pass, exercising
  `404.astro`'s rendered content

### Requirement: No dead environment variables

`.env.example` MUST list only environment variables referenced by code
under `src/`.

#### Scenario: Every remaining variable is referenced

- GIVEN `.env.example` after this change
- WHEN each declared variable name is searched under `src/`
- THEN every remaining variable MUST have at least one reference in `src/`

#### Scenario: Confirmed-dead variables are absent

- GIVEN `.env.example` after this change
- WHEN the file is read
- THEN `SUPABASE_*`, `OPENAI_API_KEY`, `ANTHROPIC_API_KEY`, and
  `GOOGLE_AI_API_KEY` MUST NOT appear

### Requirement: docs/ reflects the actual current architecture

Every file under `docs/` — excluding `docs/profile-assets.md` (already
accurate) and `docs/github-profile-README.md` (explicitly out of scope) —
MUST describe the project's real current architecture as verifiable against
`src/`, and MUST NOT reference technologies or components not present in
the codebase.

#### Scenario: No fictional component references remain

- GIVEN `docs/components/*` rewritten by this change
- WHEN each documented component name is checked against `src/components/`
- THEN no documented component name MUST be absent from `src/`

#### Scenario: Architecture description matches the real build

- GIVEN `docs/architecture/*` rewritten by this change
- WHEN compared against `astro.config.mjs` and `src/pages/`
- THEN the described architecture MUST match the static, zero-hydration Astro
  setup actually in use, with no residual React/islands/backend description

### Requirement: Root license file present

The repository root MUST contain a `LICENSE` file with the full MIT license
text and a copyright holder/year line.

#### Scenario: License file exists and is valid

- GIVEN the repository root after this change
- WHEN `LICENSE` is read
- THEN it MUST contain the standard MIT license text and MUST NOT be empty
