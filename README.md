# 🌟 DreamFolio - Portfolio Digital Interactivo

<div align="center">
  <img src="https://img.shields.io/badge/Next.js-15.3.3-black?style=for-the-badge&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind-3.4.1-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind" />
  <img src="https://img.shields.io/badge/Firebase-11.9.1-FFCA28?style=for-the-badge&logo=firebase" alt="Firebase" />
  <img src="https://img.shields.io/badge/AI_Powered-Genkit-FF6B6B?style=for-the-badge&logo=openai" alt="AI Powered" />
</div>


  <h3>🚀 Portfolio interactivo de última generación con IA integrada</h3>
  <p><strong>Cybersecurity Engineer • FinTech Architect • Creative Technologist</strong></p>
</div>

---

## 🎯 Descripción

**DreamFolio** es un portfolio digital de vanguardia que presenta la "Trinity of Innovation" de Dreamcoder08. Combina expertise en ciberseguridad, tecnología financiera y creatividad tecnológica en una experiencia web inmersiva con efectos glassmorphism, animaciones avanzadas y gestión inteligente de contenido potenciada por IA.

### ✨ Características Principales

#### 🎨 **Trinity of Innovation**
- **🛡️ Cyber Guardian**: Red Team, Pentesting, Forensics
- **🧠 FinTech Architect**: SaaS Contable, Analytics con IA  
- **🎭 Creative Technologist**: Música, Arte, Experiencias Visuales

#### 🔧 **Funcionalidades Técnicas**
- **🎯 Interfaz Interactiva**: Efectos glassmorphism y animaciones fluidas
- **📊 Visualización de Datos**: Gráficos dinámicos de progreso de aprendizaje
- **🤖 Panel Admin con IA**: Sugerencias inteligentes para optimización de contenido
- **📱 Responsive Design**: Optimizado para todos los dispositivos
- **🚀 Rendimiento**: Construcción optimizada con Next.js 15 y Turbopack
- **🔒 Autenticación**: Sistema seguro con Firebase Auth

## 🎬 Demo en Video

<div align="center">
  <h3>🌟 Mira DreamFolio en acción</h3>

  <!-- Video demo de DreamFolio en YouTube -->
  <a href="https://youtu.be/Yoiyec6RYgc?si=pC5ptMQGcw8h92w_" target="_blank">
    <img src="https://img.youtube.com/vi/Yoiyec6RYgc/hqdefault.jpg" alt="Demo Video DreamFolio" width="80%" style="border-radius: 12px; box-shadow: 0 8px 32px rgba(125, 249, 255, 0.3);" />
    <br>
    <strong>▶️ Ver Video Demo</strong>
  </a>
  
  <br><br>
  <code>https://youtu.be/Yoiyec6RYgc?si=pC5ptMQGcw8h92w_</code>
</div>

> 💡 **Tip:** Sube tu video a YouTube, Loom, o arrástralo a un Issue de GitHub para obtener una URL. Luego reemplaza `"TU_VIDEO_URL.mp4"` o el enlace de YouTube arriba.

## 🛠️ Stack Tecnológico

### Frontend
- **Framework**: Next.js 15.3.3 con App Router
- **UI**: React 18.3.1 + TypeScript 5
- **Styling**: Tailwind CSS + shadcn/ui components
- **Animaciones**: Lucide React + Custom CSS animations
- **Charts**: Recharts para visualización de datos

### Backend & Servicios
- **Database**: Firebase Firestore
- **Authentication**: Firebase Auth
- **AI Integration**: Google Genkit AI
- **Hosting**: Firebase Hosting
- **Forms**: React Hook Form + Zod validation

### Herramientas de Desarrollo
- **Build Tool**: Turbopack (modo desarrollo)
- **Linting**: ESLint + TypeScript compiler
- **Package Manager**: npm
- **Version Control**: Git con GitHub

## 🚀 Instalación y Configuración

### Prerrequisitos
```bash
node >= 18.0.0
npm >= 9.0.0
```

### 1. Clonar el Repositorio
```bash
git clone https://github.com/dreamcoder08/dreamfolio.git
cd dreamfolio
```

### 2. Instalar Dependencias
```bash
npm installgit commit -m "feat: mejoras UI y nuevos componentes agregados"
```

### 3. Configurar Variables de Entorno
Crear archivo `.env.local`:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=tu_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=tu_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=tu_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=tu_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=tu_app_id

# Genkit AI Configuration
GOOGLE_API_KEY=tu_google_ai_key
```

### 4. Iniciar Desarrollo
```bash
# Servidor de desarrollo (puerto 9002)
npm run dev

# Servidor AI Genkit (desarrollo)
npm run genkit:dev

# Servidor AI Genkit (watch mode)
npm run genkit:watch
```

### 5. Build de Producción
```bash
npm run build
npm run start
```

## 📁 Estructura del Proyecto

```
DreamFolio/
├── 📁 src/
│   ├── 📁 app/                 # App Router de Next.js
│   │   ├── 📁 admin/           # Panel de administración
│   │   ├── layout.tsx          # Layout principal
│   │   ├── page.tsx           # Página principal del portfolio
│   │   └── globals.css        # Estilos globales
│   ├── 📁 ai/                 # Integración IA con Genkit
│   │   ├── 📁 flows/          # Flujos de IA
│   │   ├── genkit.ts          # Configuración Genkit
│   │   └── dev.ts            # Servidor desarrollo IA
│   ├── 📁 components/         # Componentes reutilizables
│   │   ├── 📁 ui/            # shadcn/ui components
│   │   ├── icons.tsx          # Iconos personalizados
│   │   └── typing-animation.tsx
│   ├── 📁 hooks/             # Custom React hooks
│   └── 📁 lib/               # Utilidades y configuraciones
├── 📁 docs/                  # Documentación del proyecto
├── 📋 package.json           # Dependencias y scripts
├── 🔧 next.config.ts         # Configuración Next.js
├── 🎨 tailwind.config.ts     # Configuración Tailwind
└── 📝 README.md             # Este archivo
```

## 🎨 Guía de Diseño

### Paleta de Colores
- **Primary**: Electric Blue (#7DF9FF) - Innovación digital
- **Background**: Dark Gray (#222222) - Experiencia dark mode sofisticada  
- **Accent**: Coral Red (#FF4040) - Elementos interactivos destacados

### Tipografía
- **Headlines**: Poppins (sans-serif) - Look contemporáneo y preciso
- **Body**: Inter (sans-serif) - Claridad y legibilidad moderna

### Efectos Visuales
- **Glassmorphism**: Efectos de cristal en tarjetas
- **Hover Effects**: Animaciones fluidas en interacciones
- **Grid Layouts**: Diseño moderno basado en grilla
- **Gradients**: Gradientes dinámicos para elementos destacados

## 🔧 Scripts Disponibles

```bash
# Desarrollo
npm run dev              # Servidor desarrollo con Turbopack (puerto 9002)
npm run genkit:dev       # Servidor IA Genkit modo desarrollo
npm run genkit:watch     # Servidor IA Genkit con watch mode

# Producción
npm run build           # Build optimizado para producción
npm run start          # Servidor de producción

# Calidad de Código
npm run lint           # Linting con ESLint
npm run typecheck      # Verificación de tipos TypeScript
```

## 🤖 Funcionalidades de IA

### Panel de Administración Inteligente
- **Sugerencias de Contenido**: IA analiza tendencias digitales actuales
- **Optimización de Engagement**: Recomendaciones basadas en analytics
- **Gestión Dinámica**: Actualización en tiempo real del portfolio

### Flujos de IA Implementados
- `suggest-portfolio-updates.ts`: Sugerencias inteligentes de actualizaciones
- Análisis de datos de usuario para mejoras de UX
- Generación de contenido optimizado para SEO

## 📊 Secciones del Portfolio

### 🏛️ Trinity Display
Presenta las tres especialidades principales con tarjetas interactivas y efectos parallax.

### 🛠️ Tech & Tools 
Grid dinámico de tecnologías y herramientas con efectos de aparición progresiva.

### 📈 Learning Journey
Visualización del progreso de aprendizaje mediante gráficos radiales dinámicos.

### 🤝 Collaboration Showcase
Oportunidades de colaboración con tarjetas elegantes y efectos hover.

### 🌐 Social Connection
Badges dinámicos para plataformas sociales configurables desde Firestore.

### 📧 Contact Form
Formulario de contacto directo con validación y entrega segura.

## 🔒 Seguridad

- **Firebase Auth**: Autenticación segura para panel admin
- **Validación**: Zod schemas para validación de formularios
- **Environment Variables**: Configuración segura de variables sensibles
- **HTTPS**: Certificados SSL automáticos con Firebase Hosting

## 📈 Performance

- **Turbopack**: Build tool de próxima generación para desarrollo rápido
- **Image Optimization**: Optimización automática de imágenes con Next.js
- **Code Splitting**: Carga dinámica de componentes
- **SSR/SSG**: Renderizado optimizado para SEO y performance

## 🌐 Deployment

### Firebase Hosting
```bash
# Instalar Firebase CLI
npm install -g firebase-tools

# Login y deploy
firebase login
firebase deploy
```

### Variables de Entorno de Producción
Configurar en Firebase Console o tu plataforma de hosting preferida.

## 🤝 Contribuciones

Este es un proyecto de portfolio personal, pero si tienes sugerencias o encuentras bugs:

1. Fork el proyecto
2. Crea una feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la branch (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 📞 Contacto

**Dreamcoder08** - Cybersecurity Engineer, FinTech Architect, Creative Technologist

- 💼 [LinkedIn](https://linkedin.com/in/dreamcoder08)
- 🐙 [GitHub](https://github.com/dreamcoder08)
- 🐦 [Twitter](https://twitter.com/dreamcoder08)
- 🎵 [SoundCloud](https://soundcloud.com/dreamcoder08)
- 📧 Email: contacto a través del formulario web

---

<div align="center">
  <p><strong>🚀 "Bridging the Digital Divide Between Security, Finance, and Creativity" 🚀</strong></p>
  <p>Hecho con ❤️ usando Next.js, TypeScript, y mucho ☕</p>
</div>
