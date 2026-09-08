<div align="center">

# DreamFolio

Portafolio público de Dreamcoder08 — arquitectura frontend static-first con Astro, construido para mostrar el ecosistema ARKELYTHEX con velocidad y accesibilidad de primer nivel.

[![Stack](https://img.shields.io/badge/stack-Astro%20%2B%20Tailwind-informational)]()
[![Deploy](https://img.shields.io/badge/deploy-GitHub%20Pages-blue)](https://dreamcoder08.github.io/DreamFolio)

</div>

---

## Demo

![DreamFolio screenshot](./docs/assets/dreamfolio-screenshot.png)

## Índice

- [Descripción](#descripción)
- [Características](#características)
- [Stack técnico](#stack-técnico)
- [Instalación](#instalación)
- [Uso](#uso)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Despliegue](#despliegue)
- [Licencia](#licencia)

## Descripción

DreamFolio es el portafolio público de Dreamcoder08: una superficie de evidencia para mostrar arquitectura frontend, accesibilidad y la narrativa técnica detrás del ecosistema fiscal ARKELYTHEX. Astro renderiza el sitio como HTML estático puro — sin framework de UI en el cliente, sin hidratación.

## Características

- **Arquitectura 100% estática** — Astro genera HTML puro; el sitio no envía JavaScript de framework al navegador.
- **Tema dual claro/oscuro** — tokens definidos en `src/styles/global.css`, oscuro por defecto (`#080909` superficie / `#dda783` acento) con overrides `[data-theme="light"]` (`#f3eadc` / `#8a4e26`).
- **Cobertura e2e con Playwright** — specs en `tests/` para home, listado de proyectos y detalle de proyecto (Page Object Model), corridos en CI.
- **Despliegue automatizado** — CI/CD vía GitHub Actions a GitHub Pages: typecheck (`astro sync` + `tsc`), e2e y build antes de publicar.

## Stack técnico

| Capa | Tecnología |
|------|-----------|
| Framework | Astro 7 (SSG, static-first) |
| Estilos | Tailwind CSS 4 (config CSS-first, sin `tailwind.config.mjs`) |
| Lenguaje | TypeScript (modo estricto) |
| Testing | Playwright (e2e) |
| Gestor de paquetes | pnpm |
| CI/CD | GitHub Actions → GitHub Pages |

## Instalación

```bash
git clone https://github.com/Dreamcoder08/DreamFolio.git
cd DreamFolio
pnpm install
```

## Uso

```bash
# desarrollo
pnpm dev

# build de producción + preview local
pnpm run build
pnpm run preview

# typecheck + build (quality gate usado en CI)
pnpm run verify
```

## Estructura del proyecto

```
DreamFolio/
├── src/
│   ├── components/
│   │   └── ui/              # Componentes Astro (Icon, Navbar, ProfileCard)
│   ├── content.config.ts    # Esquema tipado de la colección de proyectos
│   ├── data/                 # Datos públicos del sitio (projects.json, systems.ts)
│   ├── layouts/               # Layout base y SEO
│   ├── lib/                    # Helpers de presentación/sitio
│   ├── pages/                   # Rutas de Astro
│   └── styles/                   # Tokens de tema (global.css) y layout (portfolio.css)
├── tests/                           # Specs e2e de Playwright (Page Object Model)
├── docs/                             # Documentación del proyecto
└── public/                            # Assets estáticos
```

## Despliegue

El sitio se despliega automáticamente a GitHub Pages en cada push a `main`/`master` mediante `.github/workflows/deploy.yml` (instala con pnpm, corre typecheck, e2e con Playwright, build y publica `dist/`). También incluye `vercel.json` para despliegue alternativo en Vercel.

> **Nota sobre `.env.example`**: el archivo referencia Supabase y APIs de IA (OpenAI/Anthropic/Google). Confirmado por historial de git (`842b1c3` — "remove Supabase, go fully static") que son remanentes de una iteración anterior del proyecto: ninguna variable ahí listada es consumida por el código actual en `src/`.

## Licencia

<TODO: completar — no se encontró archivo LICENSE en el repositorio. Definir y agregar la licencia antes de publicitar el proyecto como open source.>
