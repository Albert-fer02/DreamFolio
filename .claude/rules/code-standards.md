# DreamFolio Code Standards

## TypeScript Guidelines

- Use strict TypeScript mode
- Prefer interfaces over types for object shapes
- Use `type` for unions, primitives, and type aliases
- Never use `any` - use `unknown` if truly necessary
- Export types when they're used across modules

## Astro Components

- The site is fully static — every component is `.astro`, there is no React and no client-side hydration (`client:load`/`client:visible`/`client:idle`) in use
- Keep component logic in `src/lib/` when reusable
- If a component ever genuinely needs client-side interactivity, reach for a `<script>` tag scoped to the component before reintroducing a framework island — see the `astro-islands-patterns` skill for that decision

## Tailwind CSS

- Use utility classes from Tailwind
- Create custom utilities in `src/styles/global.css` if needed
- Follow the design system tokens in `CLAUDE.md` (`@theme` block + `[data-theme="light"]` overrides in `src/styles/global.css`)
- There is no `cn()` classname helper in this codebase — conditional classes are handled with plain template literals or Astro's `class:list`

## File Naming

- Components: `PascalCase.astro` (e.g., `Navbar.astro`, `ProfileCard.astro`)
- Utilities: `camelCase.ts` (e.g., `site.ts`, `icons.ts`)
- Pages: `kebab-case.astro` (e.g., `projects/index.astro`)
- Config: `camelCase.mjs` (e.g., `astro.config.mjs`)

## Git Conventions

- Use conventional commits: `feat:`, `fix:`, `docs:`, `refactor:`
- Keep commits atomic and focused
- Write meaningful commit messages

## Testing

- e2e coverage lives in `tests/` (Playwright, one `{page}-page.ts` + `{page}.spec.ts` pair per route — see the `playwright` skill for the pattern)
- Run `pnpm test:e2e` before pushing; it also runs in CI
- For anything not covered by a spec yet, test manually with `pnpm dev`, check the browser console for errors, and verify responsive layout across viewports

## Performance

- Keep bundle size minimal
- The site ships zero client-side JS by default — don't add a hydration directive or a JS dependency without a concrete interactivity need
- Optimize images before adding to `public/images/`
- Run `pnpm build` to check bundle analysis
