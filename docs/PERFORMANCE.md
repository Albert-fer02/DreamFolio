# ⚡ **Performance y Optimización - DreamFolio**

*Guía completa de optimizaciones, bundle analysis y mejores prácticas de rendimiento*

---

## 🎯 **Estrategia de Performance**

**DreamFolio** implementa una estrategia **performance-first** que prioriza la velocidad de carga, la experiencia del usuario y la eficiencia del código, utilizando las últimas tecnologías de Next.js 15 y optimizaciones avanzadas.

### **🚀 Objetivos de Performance**

- **⚡ Core Web Vitals** optimizados (LCP < 2.5s, FID < 100ms, CLS < 0.1)
- **📦 Bundle size** < 500KB gzipped
- **🔄 First Contentful Paint** < 1.5s
- **📱 Mobile performance** priorizado
- **🎯 Lighthouse score** > 90 en todas las métricas

---

## 📦 **Bundle Optimization**

### **🔧 Next.js 15 Optimizations (Phase 1 Enhanced)**

#### **Turbopack Configuration**
```typescript
// next.config.ts
const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: [
      'lucide-react',        // Solo iconos utilizados
      'framer-motion',       // Solo animaciones necesarias
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
};
```

#### **Edge Runtime Configuration**
```typescript
// next.config.ts - Edge Runtime for global performance
const nextConfig: NextConfig = {
  runtime: 'edge', // Enable Edge Runtime
  regions: ['fra1', 'iad1', 'sin1'], // Multi-region deployment
  // ... other optimizations
};
```

#### **Webpack Bundle Splitting**
```typescript
// next.config.ts - Solo cuando no se usa Turbopack
webpack: (config, { dev, isServer }) => {
  if (!dev && !isServer) {
    config.optimization.splitChunks = {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          priority: 10,
        },
        framer: {
          test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
          name: 'framer-motion',
          chunks: 'all',
          priority: 20,
        },
        radix: {
          test: /[\\/]node_modules[\\/]@radix-ui[\\/]/,
          name: 'radix-ui',
          chunks: 'all',
          priority: 20,
        },
        firebase: {
          test: /[\\/]node_modules[\\/]firebase[\\/]/,
          name: 'firebase',
          chunks: 'all',
          priority: 20,
        },
      },
    };
  }
  return config;
}
```

### **⚡ Caching Layer (Phase 1 Implementation)**

#### **Redis Caching with Upstash**
```typescript
// lib/cache/redis.ts - Generic caching utilities
import { Redis } from '@upstash/redis'

export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// Generic caching function with TTL
export async function getCachedData<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttl: number = 3600
): Promise<T> {
  try {
    const cached = await redis.get(key);
    if (cached) {
      console.log(`Cache hit for key: ${key}`);
      return cached as T;
    }

    const data = await fetcher();
    await redis.setex(key, ttl, data);
    return data;
  } catch (error) {
    console.error('Redis caching error:', error);
    return await fetcher(); // Fallback
  }
}
```

#### **API Routes with Smart Caching**
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

#### **Database Query Caching**
```typescript
// lib/supabase/portfolio.ts
export async function getPortfolioContent(section?: string) {
  const cacheKey = section ? `portfolio:content:${section}` : 'portfolio:content:all';

  return getCachedData(cacheKey, async () => {
    const { data, error } = await supabase
      .from('portfolio_content')
      .select('*')
      .order('version', { ascending: false });

    if (error) throw error;
    return section ? data?.[0] : data;
  }, 1800); // 30 minutes TTL
}
```

#### **Cache Invalidation Strategies**
```typescript
// lib/cache/redis.ts
export async function invalidateCache(pattern: string) {
  try {
    const keys = await redis.keys(pattern);
    if (keys.length > 0) {
      await redis.del(...keys);
      console.log(`Invalidated ${keys.length} cache keys`);
    }
  } catch (error) {
    console.error('Cache invalidation error:', error);
  }
}

export async function invalidatePortfolioCache() {
  await invalidateCache('portfolio:*');
}
```

### **📊 Bundle Analysis**

#### **Scripts de Análisis**
```json
// package.json
{
  "scripts": {
    "analyze": "ANALYZE=true npm run build",
    "bundle-report": "npx @next/bundle-analyzer",
    "performance": "npm run build && npm run start"
  }
}
```

#### **Bundle Analyzer Configuration**
```typescript
// next.config.ts
if (process.env.ANALYZE === 'true') {
  const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
  config.plugins.push(
    new BundleAnalyzerPlugin({
      analyzerMode: 'server',
      analyzerPort: 8888,
      openAnalyzer: true,
    })
  );
}
```

---

## 🚀 **Code Splitting y Lazy Loading**

### **📱 Dynamic Imports**

#### **Component Lazy Loading**
```tsx
// components/heavy-component.tsx
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <Skeleton className="w-full h-64" />,
  ssr: false, // Solo client-side si es necesario
});

const LightComponent = () => {
  return (
    <div>
      <h2>Componente Ligero</h2>
      <HeavyComponent />
    </div>
  );
};
```

#### **Route-Based Code Splitting**
```tsx
// app/admin/page.tsx
import dynamic from 'next/dynamic';

const AdminPanel = dynamic(() => import('@/components/admin/AdminPanel'), {
  loading: () => <AdminSkeleton />,
  ssr: false, // Panel admin solo en client
});

export default function AdminPage() {
  return <AdminPanel />;
}
```

### **🎯 Conditional Loading**

#### **Feature-Based Loading**
```tsx
// hooks/use-feature-flag.ts
export const useFeatureFlag = (feature: string) => {
  const [isEnabled, setIsEnabled] = useState(false);
  
  useEffect(() => {
    // Cargar feature flags dinámicamente
    import('@/lib/feature-flags').then(({ getFeatureFlag }) => {
      setIsEnabled(getFeatureFlag(feature));
    });
  }, [feature]);
  
  return isEnabled;
};

// Uso en componentes
const AdvancedFeature = () => {
  const isEnabled = useFeatureFlag('advanced-feature');
  
  if (!isEnabled) return null;
  
  return <HeavyAdvancedComponent />;
};
```

---

## 🎨 **Image Optimization**

### **🖼️ Next.js Image Component**

#### **Optimized Images**
```tsx
// components/optimized-image.tsx
import Image from 'next/image';

export const OptimizedImage = ({ src, alt, ...props }) => {
  return (
    <Image
      src={src}
      alt={alt}
      width={800}
      height={600}
      quality={85}
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
      {...props}
    />
  );
};
```

#### **Responsive Images**
```tsx
// components/responsive-image.tsx
export const ResponsiveImage = ({ src, alt, className }) => {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      className={cn("object-cover", className)}
      priority={false}
    />
  );
};
```

### **🎭 Background Images**

#### **CSS Background Optimization**
```css
/* Optimización de background images */
.hero-background {
  background-image: url('/images/hero-bg.webp');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  
  /* Fallback para navegadores antiguos */
  @supports not (background-image: url('/images/hero-bg.webp')) {
    background-image: url('/images/hero-bg.jpg');
  }
}

/* Lazy loading de backgrounds */
.lazy-background {
  background-image: none;
  transition: background-image 0.3s ease;
}

.lazy-background.loaded {
  background-image: url('/images/hero-bg.webp');
}
```

---

## ⚡ **Hydration Optimization**

### **🔄 SSR-Safe Components**

#### **Hydration Suppressor**
```tsx
// components/shared/hydration-suppressor.tsx
export const HydrationSuppressor = ({ children }: { children: React.ReactNode }) => {
  const [isHydrated, setIsHydrated] = useState(false);
  
  useEffect(() => {
    setIsHydrated(true);
  }, []);
  
  return isHydrated ? <>{children}</> : null;
};

// Uso para componentes que causan hydration mismatch
const ClientOnlyComponent = () => {
  return (
    <HydrationSuppressor>
      <ComponentWithBrowserAPIs />
    </HydrationSuppressor>
  );
};
```

#### **Client-Only Components**
```tsx
// components/shared/client-only.tsx
export const ClientOnly = ({ children, fallback = null }: ClientOnlyProps) => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) return fallback;
  return <>{children}</>;
};

// Uso para componentes que requieren window/document
const BrowserComponent = () => {
  return (
    <ClientOnly fallback={<Skeleton />}>
      <ComponentThatNeedsWindow />
    </ClientOnly>
  );
};
```

### **🎯 Hydration Mismatch Prevention**

#### **Consistent Rendering**
```tsx
// hooks/use-hydration-safe.ts
export const useHydrationSafe = () => {
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  return isClient;
};

// Componente que evita hydration mismatch
const SafeComponent = () => {
  const isClient = useHydrationSafe();
  
  return (
    <div>
      <h1>Contenido Estático</h1>
      {isClient && <DynamicContent />}
    </div>
  );
};
```

---

## 🎬 **Animation Performance**

### **⚡ Framer Motion Optimizations**

#### **Performance-First Animations**
```tsx
// lib/animations/performance-optimized.ts
export const optimizedVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      // Solo animar propiedades que no causan reflow
      opacity: { duration: 0.4 },
      y: { duration: 0.6 }
    }
  }
};

// Componente optimizado
export const OptimizedAnimatedComponent = ({ children }) => {
  return (
    <motion.div
      variants={optimizedVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      // Evitar re-renders innecesarios
      layout={false}
    >
      {children}
    </motion.div>
  );
};
```

#### **Reduced Motion Support**
```tsx
// hooks/use-reduced-motion.ts
export const useReducedMotion = () => {
  const [prefersReduced, setPrefersReduced] = useState(false);
  
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReduced(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);
  
  return prefersReduced;
};

// Uso en animaciones
const AccessibleAnimation = ({ children }) => {
  const prefersReduced = useReducedMotion();
  
  if (prefersReduced) {
    return <div className="fade-in">{children}</div>;
  }
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
};
```

---

## 📱 **Mobile Performance**

### **🎯 Mobile-First Optimizations**

#### **Touch-Friendly Interactions**
```css
/* Optimizaciones para dispositivos táctiles */
.touch-target {
  min-height: 44px;        /* Apple HIG recommendation */
  min-width: 44px;
  touch-action: manipulation; /* Evitar zoom en tap */
}

/* Optimización de scroll en mobile */
.mobile-scroll {
  -webkit-overflow-scrolling: touch; /* iOS momentum scroll */
  scroll-behavior: smooth;
}
```

#### **Mobile-Specific Loading**
```tsx
// hooks/use-mobile-optimization.ts
export const useMobileOptimization = () => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const isMobileDevice = /mobile|android|iphone|ipad|phone/i.test(userAgent);
      setIsMobile(isMobileDevice);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  return isMobile;
};

// Componente optimizado para mobile
const MobileOptimizedComponent = () => {
  const isMobile = useMobileOptimization();
  
  if (isMobile) {
    return <MobileVersion />;
  }
  
  return <DesktopVersion />;
};
```

---

## 🔍 **Performance Monitoring**

### **📊 Core Web Vitals**

#### **LCP (Largest Contentful Paint)**
```typescript
// lib/performance/web-vitals.ts
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

export const reportWebVitals = (metric: any) => {
  switch (metric.name) {
    case 'LCP':
      console.log('LCP:', metric.value);
      // Enviar a analytics
      break;
    case 'FID':
      console.log('FID:', metric.value);
      break;
    case 'CLS':
      console.log('CLS:', metric.value);
      break;
  }
};

// Inicializar en _app.tsx
getCLS(reportWebVitals);
getFID(reportWebVitals);
getFCP(reportWebVitals);
getLCP(reportWebVitals);
getTTFB(reportWebVitals);
```

#### **Performance Observer**
```typescript
// lib/performance/performance-observer.ts
export const observePerformance = () => {
  if ('PerformanceObserver' in window) {
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (entry.entryType === 'navigation') {
          const navEntry = entry as PerformanceNavigationTiming;
          console.log('Page Load Time:', navEntry.loadEventEnd - navEntry.loadEventStart);
        }
      });
    });
    
    observer.observe({ entryTypes: ['navigation', 'resource'] });
  }
};
```

### **📈 Bundle Size Monitoring**

#### **Bundle Analyzer Integration**
```typescript
// next.config.ts
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  // ... resto de la configuración
});
```

#### **Size Limit Configuration**
```json
// .size-limit.json
[
  {
    "path": ".next/static/chunks/**/*.js",
    "limit": "500 KB"
  },
  {
    "path": ".next/static/css/**/*.css",
    "limit": "100 KB"
  }
]
```

---

## 🚀 **Build Optimization**

### **🔧 Production Build**

#### **Environment-Specific Configs**
```typescript
// next.config.ts
const nextConfig: NextConfig = {
  // Optimizaciones solo en producción
  ...(process.env.NODE_ENV === 'production' && {
    compress: true,
    poweredByHeader: false,
    generateEtags: false,
    onDemandEntries: {
      maxInactiveAge: 25 * 1000,
      pagesBufferLength: 2,
    },
  }),
  
  // Configuración de imágenes
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
};
```

#### **Build Scripts Optimization**
```json
// package.json
{
  "scripts": {
    "build": "next build",
    "build:analyze": "ANALYZE=true next build",
    "build:production": "NODE_ENV=production next build",
    "start:production": "NODE_ENV=production next start"
  }
}
```

---

## 📊 **Performance Metrics Dashboard**

### **🎯 Key Performance Indicators**

#### **Loading Performance**
- **First Contentful Paint (FCP)**: < 1.5s
- **Largest Contentful Paint (LCP)**: < 2.5s
- **Time to Interactive (TTI)**: < 3.8s

#### **Runtime Performance**
- **First Input Delay (FID)**: < 100ms
- **Cumulative Layout Shift (CLS)**: < 0.1
- **Total Blocking Time (TBT)**: < 300ms

#### **Bundle Performance**
- **Total Bundle Size**: < 500KB gzipped
- **JavaScript Bundle**: < 300KB gzipped
- **CSS Bundle**: < 100KB gzipped

---

## 🎯 **Performance Roadmap**

### **🔄 Q1 2025**
- [ ] **Service Worker** implementation
- [ ] **Advanced caching** strategies
- [ ] **Real User Monitoring (RUM)**

### **⚡ Q2 2025**
- [ ] **Edge computing** optimization
- [ ] **CDN integration** avanzada
- [ ] **Performance budgets** automation

### **🚀 Q3 2025**
- [ ] **WebAssembly** integration
- [ ] **Advanced prefetching** strategies
- [ ] **Performance testing** automation

---

## 📚 **Recursos y Herramientas**

### **🔍 Performance Testing**
- **Lighthouse CI** para CI/CD
- **WebPageTest** para testing real
- **GTmetrix** para análisis detallado
- **PageSpeed Insights** para métricas Google

### **📊 Monitoring Tools**
- **Vercel Analytics** para métricas reales
- **Sentry** para error tracking
- **LogRocket** para session replay
- **New Relic** para APM

---

<div align="center">
  <p><strong>⚡ Performance optimizado para la mejor experiencia del usuario ⚡</strong></p>
  <p>DreamFolio - Speed Meets Excellence</p>
</div>
