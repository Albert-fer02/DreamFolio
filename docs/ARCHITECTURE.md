# 🏗️ **Arquitectura del Sistema - DreamFolio**

*Documentación consolidada de arquitectura, estructura y mejores prácticas*

---

## 🎯 **Visión General de la Arquitectura**

**DreamFolio** implementa una arquitectura moderna basada en **Next.js 15** con **App Router**, siguiendo principios de **micro-frontends**, **componentes modulares** y **optimización de performance**.

### **🏛️ Principios Arquitectónicos**

- **🔄 Server-Side Rendering (SSR)** con hidratación optimizada
- **📱 Mobile-First** responsive design
- **🎨 Component-Based Architecture** con Radix UI
- **⚡ Performance-First** con Turbopack y optimizaciones
- **🔒 Security by Design** con headers y validaciones
- **🤖 AI-Integrated** con Genkit para funcionalidades inteligentes

---

## 🏗️ **Estructura del Proyecto**

### **📁 Organización de Directorios**

```
src/
├── app/                    # App Router (Next.js 15)
│   ├── api/               # API Routes con caching
│   │   └── portfolio/     # Portfolio data endpoints
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx           # Página principal
│   ├── admin/             # Panel administrativo
│   └── globals.css        # Estilos globales
├── components/             # Componentes reutilizables
│   ├── ui/                # Componentes base (shadcn/ui)
│   ├── features/          # Componentes específicos por feature
│   ├── sections/          # Secciones de página
│   └── shared/            # Componentes compartidos
├── hooks/                  # Custom React hooks
├── lib/                    # Utilidades y configuraciones
│   ├── auth/              # Autenticación
│   ├── firebase/          # Configuración Firebase
│   ├── animations/        # Configuración Framer Motion
│   ├── cache/             # Redis caching utilities
│   │   └── redis.ts       # Upstash Redis integration
│   ├── supabase/          # Supabase database integration
│   │   ├── config.ts      # Database configuration
│   │   └── portfolio.ts   # Portfolio data management
│   └── utils/             # Utilidades generales
└── styles/                 # Estilos adicionales

lib/                        # Shared utilities (root level)
├── cache/                  # Caching layer
├── supabase/               # Database layer
└── ...
```

### **🔧 Configuración Técnica**

#### **Next.js 15 Configuration (Phase 1 Optimized)**
```typescript
// next.config.ts
const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: [
      'lucide-react',
      'framer-motion',
      '@radix-ui/react-icons',
    ],
    serverComponentsExternalPackages: ['@upstash/redis', '@supabase/supabase-js'],
  },
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // Enhanced Security Headers (OWASP compliant)
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains; preload' },
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.googleapis.com https://*.gstatic.com http://localhost:*",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "img-src 'self' data: https: blob: https://placehold.co",
              "font-src 'self' https://fonts.gstatic.com",
              "connect-src 'self' https://*.firebase.com https://*.supabase.com https://*.upstash.com wss://*.supabase.com http://localhost:*",
              "frame-src 'none'",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'"
            ].join('; ')
          },
        ],
      },
    ];
  },
  // Optimizaciones de performance
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
  reactStrictMode: true,
};
```

#### **TypeScript Configuration (Phase 1 Optimized)**
```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

---

## 🎨 **Sistema de Componentes**

### **🏗️ Arquitectura de Componentes**

#### **1. Componentes Base (UI Layer)**
- **shadcn/ui components** con Radix UI primitives
- **Custom variants** usando Class Variance Authority
- **Responsive design** con Tailwind CSS
- **Accessibility** siguiendo WCAG 2.1 AA

#### **2. Componentes de Feature**
- **Hero Section** con animaciones avanzadas
- **Collaboration Stats** con visualización de datos
- **Tech Stack** con efectos glassmorphism
- **Contact Form** con validación Zod

#### **3. Componentes Compartidos**
- **AnimatedSection** para transiciones
- **HydrationSuppressor** para SSR issues
- **ClientOnly** para componentes client-side

### **🔗 Patrones de Comunicación**

#### **Props Drilling Minimization**
```typescript
// ✅ Bueno: Context para estado global
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// ❌ Evitar: Props drilling profundo
const DeepComponent = ({ theme, user, settings, ...props }) => {};
```

#### **Custom Hooks Pattern**
```typescript
// hooks/use-mobile.tsx
export const useMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  return isMobile;
};
```

---

## ⚡ **Optimizaciones de Performance**

### **🚀 Bundle Optimization**

#### **Code Splitting Strategy**
```typescript
// Optimización de imports
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <Skeleton />,
  ssr: false
});
```

#### **Package Import Optimization**
```typescript
// next.config.ts
experimental: {
  optimizePackageImports: [
    'lucide-react',      // Solo iconos usados
    'framer-motion',     // Solo animaciones necesarias
    '@radix-ui/react-icons',
  ],
}
```

### **🔄 Hydration Optimization**

#### **SSR-Safe Components**
```typescript
// components/shared/hydration-suppressor.tsx
export const HydrationSuppressor = ({ children }: { children: React.ReactNode }) => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return isHydrated ? <>{children}</> : null;
};
```

#### **Client-Only Components**
```typescript
// components/shared/client-only.tsx
export const ClientOnly = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return <>{children}</>;
};
```

### **⚡ Caching & Database Layer (Phase 1)**

#### **Redis Caching with Upstash**
```typescript
// lib/cache/redis.ts - Generic caching utilities
export async function getCachedData<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttl: number = 3600
): Promise<T> {
  const cached = await redis.get(key);
  if (cached) return cached as T;

  const data = await fetcher();
  await redis.setex(key, ttl, data);
  return data;
}
```

#### **Supabase Hybrid Database**
```typescript
// lib/supabase/portfolio.ts - Portfolio data management
export async function getPortfolioContent(section?: string) {
  return getCachedData(`portfolio:content:${section || 'all'}`, async () => {
    const { data, error } = await supabase
      .from('portfolio_content')
      .select('*')
      .order('version', { ascending: false });

    if (error) throw error;
    return section ? data?.[0] : data;
  }, 1800); // 30 minutes TTL
}
```

#### **API Routes with Caching**
```typescript
// src/app/api/portfolio/route.ts
export async function GET(request: NextRequest) {
  const portfolioData = await getCachedPortfolioData();

  return NextResponse.json(portfolioData, {
    headers: {
      'Cache-Control': 'public, s-maxage=1800, stale-while-revalidate=86400',
      'CDN-Cache-Control': 'max-age=3600',
    }
  });
}
```

---

## 🔒 **Seguridad y Autenticación**

### **🛡️ Security Headers**

```typescript
// next.config.ts
async headers() {
  return [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'Strict-Transport-Security',
          value: 'max-age=31536000; includeSubDomains; preload'
        },
        {
          key: 'X-DNS-Prefetch-Control',
          value: 'on'
        },
      ],
    },
  ];
}
```

### **🔐 Sistema de Autenticación**

#### **Firebase Auth Integration**
```typescript
// lib/auth/admin-auth.ts
export const adminAuth = {
  signIn: async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return { success: true, user: userCredential.user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
};
```

#### **Input Validation con Zod**
```typescript
// lib/security/input-validation.ts
export const contactSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  message: z.string().min(10).max(1000),
});

export type ContactFormData = z.infer<typeof contactSchema>;
```

---

## 🤖 **Integración de IA**

### **🧠 Genkit AI Integration**

#### **Portfolio Update Suggestions**
```typescript
// ai/flows/suggest-portfolio-updates.ts
export const suggestPortfolioUpdates = async (currentContent: string) => {
  const model = googleAI('gemini-1.5-flash');
  
  const result = await model.generate({
    prompt: `Analyze this portfolio content and suggest improvements: ${currentContent}`,
  });
  
  return result.text;
};
```

#### **AI-Powered Admin Panel**
- **Content optimization suggestions**
- **Performance recommendations**
- **SEO improvements**
- **Accessibility enhancements**

---

## 📱 **Responsive Design Strategy**

### **🎯 Breakpoints Strategy**

```typescript
// hooks/use-responsive.ts
export const useResponsive = () => {
  const [breakpoint, setBreakpoint] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) setBreakpoint('mobile');
      else if (width < 1024) setBreakpoint('tablet');
      else setBreakpoint('desktop');
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return breakpoint;
};
```

### **📱 Mobile-First Approach**

- **Touch-friendly interactions**
- **Optimized images for mobile**
- **Progressive enhancement**
- **Performance optimization for slow networks**

---

## 🚀 **Deployment y CI/CD**

### **🔥 Firebase Hosting**

```json
// firebase.json
{
  "hosting": {
    "public": "out",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

### **🔧 Build Optimization**

```bash
# Scripts de build optimizados
npm run build          # Build de producción
npm run analyze        # Análisis de bundle
npm run performance    # Test de performance
```

---

## 📊 **Métricas y Monitoreo**

### **📈 Performance Metrics**

- **Core Web Vitals**
- **Bundle size analysis**
- **Lighthouse scores**
- **Real User Monitoring (RUM)**

### **🔍 Error Tracking**

- **Console error logging**
- **Performance monitoring**
- **User interaction tracking**
- **Accessibility violations**

---

## 🎯 **Mejores Prácticas Implementadas**

### **✅ Arquitectura**

- **Component composition** sobre inheritance
- **Custom hooks** para lógica reutilizable
- **Type safety** con TypeScript estricto
- **Performance optimization** desde el diseño

### **✅ Código**

- **ESLint** con reglas estrictas
- **Prettier** para formato consistente
- **TypeScript strict mode** habilitado
- **Error boundaries** para manejo de errores

### **✅ Testing**

- **Jest** para testing unitario
- **Testing Library** para testing de componentes
- **Coverage reports** para métricas de calidad
- **E2E testing** con Playwright (planificado)

---

## 🚀 **Roadmap de Arquitectura**

### **🔄 Q1 2025**
- [ ] **Micro-frontends architecture** implementation
- [ ] **Service Worker** para offline functionality
- [ ] **PWA** capabilities enhancement

### **🚀 Q2 2025**
- [ ] **Edge computing** con Vercel Edge Functions
- [ ] **Real-time collaboration** features
- [ ] **Advanced caching** strategies

### **🎯 Q3 2025**
- [ ] **GraphQL API** implementation
- [ ] **Multi-tenant** architecture
- [ ] **Advanced monitoring** y observability

---

<div align="center">
  <p><strong>🏗️ Arquitectura escalable y mantenible para el futuro 🏗️</strong></p>
  <p>DreamFolio - Engineering Excellence in Every Line of Code</p>
</div>
