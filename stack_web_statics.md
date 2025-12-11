# Stack de Tecnologías para Desarrollo Web Estático

Este documento describe el stack de tecnologías seleccionado para la creación y despliegue de sitios web estáticos modernos.

## Alojamiento (Hosting)

-   **[Vercel](https://vercel.com/):** Plataforma de despliegue continuo optimizada para frameworks de frontend y sitios estáticos. Ofrece una integración nativa con Git, despliegues automáticos y una red de distribución de contenido (CDN) global.

## Framework de Desarrollo Web

-   **[Astro](https://astro.build/):** Framework web para construir sitios rápidos y optimizados. Permite utilizar componentes de diversas librerías y frameworks como React, Angular, Svelte, Vue, etc., bajo una arquitectura de "islas" que reduce el JavaScript enviado al cliente.

## Backend como Servicio (BaaS)

-   **[Supabase](https://supabase.io/):** Alternativa de código abierto a Firebase. Provee una base de datos PostgreSQL, autenticación, almacenamiento de archivos y APIs auto-generadas, facilitando la creación de productos con funcionalidades de backend sin necesidad de gestionar un servidor.

## Gestión de Paquetes

-   **[pnpm](https://pnpm.io/):** Administrador de paquetes rápido y eficiente en el uso de espacio en disco. Se utiliza para la instalación y gestión de las dependencias del proyecto.
    -   **Comando de instalación:** `pnpm install`

## Editor de Código

-   **[Visual Studio Code](https://code.visualstudio.com/):** Editor de código fuente ligero pero potente con un ecosistema de extensiones muy completo que mejora la productividad en el desarrollo. Se asume que "windsurf" en el documento original es un error tipográfico.

## Seguridad

-   **[Cloudflare](https://www.cloudflare.com/):** Servicio que proporciona una red de entrega de contenido (CDN), mitigación de ataques DDoS, servicios de seguridad de Internet y servicios de servidor de nombres de dominio distribuidos.

## Inteligencia Artificial (Asistentes de Código)

-   **[ChatGPT](https://chat.openai.com/):** Modelo de lenguaje para la generación de código, depuración y obtención de respuestas a preguntas técnicas.
-   **[Claude](https://claude.ai/):** Asistente de IA para tareas de codificación, escritura y análisis.
-   **[Gemini](https://gemini.google.com/):** Familia de modelos de IA de Google para asistir en el desarrollo de software y otras tareas creativas.