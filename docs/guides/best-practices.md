# 🏆 Mejores Prácticas 2025 para Portafolios

> Guía completa con el **Bleeding Edge Stack** para construir portafolios web modernos y de alto rendimiento.

---

## 📐 Filosofía de Diseño

Como Senior Software Engineer, mi enfoque para tomar decisiones técnicas se basa en tres pilares:

| Pilar | Descripción | Aplicación |
|-------|-------------|------------|
| **Performance** | Cargar instantáneamente (< 1s) | Astro + Islands Architecture |
| **DX** | Experiencia de desarrollo fluida | TypeScript + Hot Reload + Componentes |
| **Propósito** | El sitio cumple su objetivo | SEO perfecto + Contenido visual |

> **Importante:** Un portafolio tiene un propósito muy diferente al de una aplicación SaaS. Su objetivo es cargar instantáneamente, tener un SEO perfecto y mostrar contenido visual.

---

## 🚀 Stack "Bleeding Edge" Diciembre 2025

### Tecnologías Recomendadas

| Tecnología | Versión | ¿Por qué esta versión? |
|------------|---------|------------------------|
| **Astro** | v5.16+ | "Content Layer" avanzado, View Transitions nativas mejoradas |
| **React** | v19.2 | React Compiler elimina necesidad de `useMemo`/`useCallback` manual |
| **Tailwind CSS** | v4.1 | Motor nativo Rust/Go, configuración CSS-first con `@theme` |
| **TypeScript** | v5.9 | Inferencia mejorada para promesas y arrays inmutables |
| **Motion** | v12.x | ⚠️ Rebrand de Framer Motion, bundle reducido, API simplificada |
| **Zod** | v3.25+ | Runtime + compile-time type safety |

### ⚠️ Notas de Arquitectura Técnica (Update 2025)

1. **Tailwind v4 Setup**: Ya no busques el archivo `tailwind.config.js`. En la v4, la configuración vive dentro de tu CSS usando directivas `@theme`. Es más limpio y "nativo" a la web.

2. **React Compiler**: Activa el nuevo compilador de React en tu configuración de Astro/Vite. Automatiza la memoización - código más simple, mejor rendimiento sin esfuerzo.

3. **Imports de Motion**: 
   ```typescript
   // ❌ Antes: 
   import { motion } from "motion/react"
   
   // ✅ Ahora (Motion v12+):
   import { motion } from "motion/react"
   ```

### Stack Visual

```mermaid
graph TB
    subgraph "🎯 Core (Rendimiento)"
        Astro[Astro v5.16+]
        Islands[Islands Architecture]
        Astro --> Islands
    end
    
    subgraph "⚡ Interactividad"
        React[React 19.2]
        Motion[Motion v12]
        React --> Motion
    end
    
    subgraph "🎨 Estilos"
        TW[Tailwind CSS v4.1]
        CSS[@theme CSS-first]
        TW --> CSS
    end
    
    subgraph "📝 Contenido"
        MDX[MDX]
        CC[Content Collections]
        MDX --> CC
    end
    
    subgraph "🔒 Types"
        TS[TypeScript 5.9]
        Zod[Zod Schemas]
        TS --> Zod
    end
    
    Islands --> React
    Islands --> TW
    CC --> Zod
    
    style Astro fill:#ff5a03,color:#fff
    style React fill:#61dafb,color:#000
    style TW fill:#06b6d4,color:#fff
    style TS fill:#3178c6,color:#fff
    style Motion fill:#f472b6,color:#fff
```

---


## ⚡ Core Web Vitals

Tu prioridad #1. El sitio debe cargar en menos de 1 segundo.

### Métricas Objetivo

| Métrica | Objetivo | Cómo Lograr |
|---------|----------|-------------|
| **LCP** | < 2.5s | Imágenes optimizadas, fonts preload |
| **FID** | < 100ms | Minimal JS, code splitting |
| **CLS** | < 0.1 | Dimensiones explícitas en imágenes |
| **FCP** | < 1.8s | Critical CSS inline |
| **TTFB** | < 600ms | CDN edge deployment |

### Implementación

```astro
---
// src/layouts/BaseLayout.astro

// Preload critical fonts
const fontPreloads = [
  '/fonts/inter-var.woff2',
  '/fonts/poppins-bold.woff2'
];
---

<head>
  <!-- Preload fonts -->
  {fontPreloads.map(font => (
    <link 
      rel="preload" 
      href={font} 
      as="font" 
      type="font/woff2" 
      crossorigin 
    />
  ))}
  
  <!-- Critical CSS inline -->
  <style is:inline>
    :root {
      --background: 0 0% 100%;
      --foreground: 0 0% 3.9%;
    }
    body {
      font-family: 'Inter', system-ui, sans-serif;
      background: hsl(var(--background));
    }
  </style>
</head>
```

### Optimización de Imágenes

```astro
---
import { Image } from 'astro:assets';
import heroImage from '../assets/hero.jpg';
---

<!-- Astro optimiza automáticamente -->
<Image
  src={heroImage}
  alt="Hero background"
  width={1920}
  height={1080}
  loading="eager"  <!-- Above the fold -->
  format="webp"
/>

<!-- Below the fold - lazy load -->
<Image
  src={projectImage}
  alt="Project screenshot"
  loading="lazy"
  decoding="async"
/>
```

---

## ♿ Accesibilidad (a11y)

Un buen portafolio es accesible por teclado y lectores de pantalla.

### Checklist

- [x] **HTML Semántico**: Usar `<main>`, `<article>`, `<nav>`, `<section>`
- [x] **Heading Hierarchy**: Un solo `<h1>` por página, jerarquía lógica
- [x] **Alt Text**: Todas las imágenes con descripciones útiles
- [x] **Focus Visible**: Estados de focus visibles para navegación por teclado
- [x] **Color Contrast**: Ratio mínimo 4.5:1 para texto
- [x] **ARIA Labels**: En elementos interactivos sin texto visible
- [x] **Reduced Motion**: Respetar preferencia del usuario

### Implementación

```tsx
// Componente accessible
function NavButton({ label, onClick }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className="focus:ring-2 focus:ring-primary focus:outline-none"
    >
      <MenuIcon aria-hidden="true" />
    </button>
  );
}

// Respetar reduced motion
const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

<motion.div
  animate={prefersReducedMotion ? {} : { y: [0, -10, 0] }}
/>
```

---

## 🔍 SEO Técnico

### Configuración Básica

```astro
---
// src/layouts/BaseLayout.astro
interface Props {
  title?: string;
  description?: string;
  image?: string;
}

const { 
  title = 'Dreamcoder08 | Full Stack Developer',
  description = 'Portfolio de desarrollo web...',
  image = '/og-image.jpg'
} = Astro.props;

const canonicalURL = new URL(Astro.url.pathname, Astro.site);
---

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  
  <!-- SEO -->
  <title>{title}</title>
  <meta name="description" content={description} />
  <link rel="canonical" href={canonicalURL} />
  
  <!-- Open Graph -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content={canonicalURL} />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content={new URL(image, Astro.site)} />
  
  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={new URL(image, Astro.site)} />
</head>
```

### Sitemap Automático

```javascript
// astro.config.mjs
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://dreamfolio-astro.vercel.app',
  integrations: [sitemap()],
});
```

### robots.txt

```text
# public/robots.txt
User-agent: *
Allow: /

Sitemap: https://dreamfolio-astro.vercel.app/sitemap-index.xml
```

---

## 🌙 Dark Mode

Es casi un estándar esperado en portafolios de desarrolladores.

### Implementación con CSS Variables

```css
/* src/styles/global.css */
:root {
  --background: 0 0% 100%;
  --foreground: 0 0% 3.9%;
  --primary: 221 83% 53%;
}

.dark {
  --background: 0 0% 3.9%;
  --foreground: 0 0% 98%;
  --primary: 217 91% 60%;
}
```

### Toggle con Sistema de Usuario

```typescript
// Detectar preferencia del sistema
function getSystemTheme(): 'dark' | 'light' {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches 
    ? 'dark' 
    : 'light';
}

// Inicializar tema
function initTheme() {
  const stored = localStorage.getItem('theme');
  const theme = stored || getSystemTheme();
  
  document.documentElement.classList.toggle('dark', theme === 'dark');
}

// Toggle theme
function toggleTheme() {
  const isDark = document.documentElement.classList.toggle('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
}
```

---

## 🧩 Arquitectura de Componentes (Atomic Design)

### Utilidad `cn()` - Tailwind Inteligente

En 2025 es estándar usar una utilidad que combine `clsx` + `tailwind-merge` para resolver conflictos de clases:

```typescript
// src/lib/utils.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Uso: cn("bg-blue-500 p-4", className) 
// Si className="p-2", resultado es "bg-blue-500 p-2" (sin conflicto)
```

### Componentes Atómicos (`src/components/ui/`)

Sigue el patrón Atomic Design para componentes reutilizables:

| Componente | Descripción | Archivo |
|------------|-------------|---------|
| **Button** | Variantes, tamaños, loading | `ui/button.tsx` |
| **Input** | Label, error, a11y | `ui/input.tsx` |
| **Textarea** | Label, error, resize | `ui/textarea.tsx` |
| **Card** | Glassmorphism, slots | `ui/card.tsx` |
| **Badge** | Status tags, variantes | `ui/badge.tsx` |
| **StatusIndicator** | Pulse animation | `ui/status-indicator.tsx` |
| **LinkButton** | CTAs con arrow | `ui/link-button.tsx` |

### Patrón de Composición (Slots)

```tsx
// ❌ Mal - Prop drilling
<Card title="Hola" content="Mundo" footerText="Click" />

// ✅ Bien - Composición
<Card>
  <CardHeader>Hola</CardHeader>
  <CardBody>Mundo</CardBody>
  <CardFooter>Click</CardFooter>
</Card>
```

### Custom Hooks - Separar Lógica de UI

```typescript
// hooks/useContactForm.ts
export function useContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  // ... toda la lógica
  return { isSubmitting, submitStatus, handleFormSubmit, register, errors };
}

// El componente solo tiene JSX
const ContactSection = () => {
  const { register, errors, isSubmitting, handleFormSubmit } = useContactForm();
  return <form onSubmit={handleFormSubmit}>...</form>;
};
```

### Barrel Exports

```typescript
// src/components/ui/index.ts
export { Button } from './button';
export { Input } from './input';
export { Card, CardHeader, CardBody, CardFooter } from './card';
// ... etc

// Uso limpio
import { Button, Input, Card } from '../ui';
```

---

## 🏛️ Arquitectura \"Feature-First\"

### ❌ No Usar Clean Architecture

Clean Architecture está diseñada para **lógica de negocio compleja**. En un portafolio, tu "lógica de negocio" es simplemente mostrar texto e imágenes.

Implementar Casos de Uso, Entidades, Repositorios y DTOs para leer un archivo Markdown es un **anti-patrón** llamado *Over-engineering*.

### ✅ Usar Feature-First / Colocation

```text
src/
├── components/       # UI Reutilizable
├── content/          # Tu "Base de datos" (Markdown/MDX)
├── layouts/          # Plantillas base
├── pages/            # Rutas del sistema
└── styles/           # CSS global
```

### Principios Clave

| Principio | Aplicación |
|-----------|------------|
| **KISS** | No crear abstracciones hasta necesitarlas |
| **Separation of Concerns** | Data (Content Collections) vs UI (Componentes) |
| **Colocation** | Mantener archivos relacionados juntos |

---

## 📝 Content Collections (Astro)

Para proyectos y contenido estructurado, usa Content Collections con Zod:

```typescript
// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    technologies: z.array(z.string()),
    image: z.string().optional(),
    liveUrl: z.string().url().optional(),
    githubUrl: z.string().url().optional(),
    featured: z.boolean().default(false),
    publishedAt: z.date(),
  }),
});

export const collections = { projects };
```

```markdown
---
# src/content/projects/my-project.md
title: "Mi Proyecto"
description: "Descripción del proyecto..."
technologies: ["React", "TypeScript", "Tailwind"]
featured: true
publishedAt: 2024-01-15
---

## Contenido MDX con componentes
```

---

## 🔗 View Transitions API

Astro soporta View Transitions nativas para transiciones de página tipo SPA:

```astro
---
// src/layouts/BaseLayout.astro
import { ViewTransitions } from 'astro:transitions';
---

<head>
  <ViewTransitions />
</head>
```

```astro
<!-- Transición personalizada para elemento -->
<h1 transition:name="page-title">
  {title}
</h1>

<Image
  src={image}
  transition:name={`project-${slug}`}
  transition:animate="fade"
/>
```

---

## 📊 Checklist Final

### Performance
- [ ] Lighthouse Performance > 95
- [ ] LCP < 2.5s
- [ ] CLS < 0.1
- [ ] JS Bundle < 100KB total

### SEO
- [ ] Meta tags configurados
- [ ] Open Graph tags
- [ ] sitemap.xml generado
- [ ] robots.txt

### Accesibilidad
- [ ] HTML semántico
- [ ]ading hierarchy correcto
- [ ] Focus visible en todos los elementos
- [ ] Reduced motion respetado

### DX
- [ ] TypeScript strict
- [ ] ESLint + Prettier configurados
- [ ] Hot reload funcional
- [ ] Documentación actualizada

---

## 📚 Referencias

- [Astro Documentation](https://docs.astro.build)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
- [Web.dev Vitals](https://web.dev/vitals/)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [Islands Architecture](https://www.patterns.dev/posts/islands-architecture)
