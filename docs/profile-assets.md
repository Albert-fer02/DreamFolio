# Perfil e identidad visual

La portada incluye un espacio de foto independiente del contenido: `src/components/ui/ProfileCard.astro`.

## Poner una fotografía real

1. Añadir una foto cuadrada a `public/images/profile/` (recomendado: WebP, 768 × 768 px).
2. En `src/lib/site.ts`, cambiar `profile.image` por su ruta y `profile.imageAlt` por una descripción real, por ejemplo `Retrato de Albert Agurto`.
3. Ajustar `profile.imagePosition` si hace falta centrar el rostro; por ejemplo `50% 35%`.

La tarjeta adapta automáticamente el encuadre a escritorio y móvil. No existe un cargador de fotos público. La insignia actual es una identidad abstracta generada para Dreamcoder, no un retrato de Albert.

## Assets

- `public/images/profile/dreamcoder-emblem.webp`: insignia optimizada (768 × 768).
- `docs/assets/dreamcoder-compass-original.png`: imagen original generada, conservada sin pérdida.
- `public/favicon.svg`: emblema vectorial de ocho puntas.
- `src/lib/icons.ts`: sistema de iconos, cuadrícula de 24 px y trazo de 1.6 px. Los glifos funcionales son propios; GitHub y X conservan formas reconocibles de sus marcas.
- `src/components/ui/Icon.astro`: componente accesible para iconos decorativos. Los enlaces y botones mantienen sus nombres en texto o `aria-label`.

No se añadieron dependencias. Se respetan las preferencias de movimiento reducido.
