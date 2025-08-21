# 🚀 **Deployment y Configuración - DreamFolio**

*Guía completa de deployment, configuración y CI/CD para DreamFolio*

---

## 🎯 **Estrategia de Deployment**

**DreamFolio** implementa una estrategia de **deployment automatizado** con múltiples entornos, optimizaciones de producción y monitoreo continuo, utilizando las mejores prácticas de DevOps y CI/CD.

### **🚀 Objetivos de Deployment**

- **⚡ Zero-downtime** deployments
- **🔒 Environment isolation** completo
- **📊 Performance monitoring** en producción
- **🔄 Automated rollbacks** en caso de errores
- **🌍 Global CDN** para mejor performance

---

## 🏗️ **Arquitectura de Deployment**

### **🌍 Infraestructura**

#### **Hosting Principal**
```
🌐 Firebase Hosting (Principal)
├── 🚀 Edge locations globales
├── 📦 CDN automático
├── 🔒 SSL/TLS automático
└── 📊 Analytics integrados

🔄 Vercel (Alternativo)
├── 🚀 Edge Functions
├── 📦 Automatic deployments
├── 🔒 Security headers
└── 📊 Performance insights
```

#### **Base de Datos y Servicios**
```
🔥 Firebase Services
├── 🗄️ Firestore (Database)
├── 🔐 Authentication
├── 📁 Storage
├── 🔧 Functions
└── 📊 Analytics

☁️ Cloud Services
├── 🖼️ Image optimization
├── 📊 Monitoring
├── 🔒 Security scanning
└── 📈 Performance tracking
```

---

## 🔧 **Configuración de Entornos**

### **🌱 Desarrollo (Development)**

#### **Variables de Entorno**
```bash
# .env.development
NODE_ENV=development
NEXT_PUBLIC_FIREBASE_API_KEY=your_dev_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_dev_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_dev_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_dev_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_dev_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_dev_app_id

# Development specific
NEXT_PUBLIC_ANALYTICS_ID=dev_analytics_id
NEXT_PUBLIC_DEBUG_MODE=true
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

#### **Scripts de Desarrollo**
```json
// package.json
{
  "scripts": {
    "dev": "next dev --turbopack -p 9002",
    "dev:analyze": "ANALYZE=true next dev",
    "dev:debug": "NODE_OPTIONS='--inspect' next dev",
    "dev:profile": "NODE_OPTIONS='--prof' next dev"
  }
}
```

### **🧪 Staging (Pre-producción)**

#### **Variables de Entorno**
```bash
# .env.staging
NODE_ENV=staging
NEXT_PUBLIC_FIREBASE_API_KEY=your_staging_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_staging_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_staging_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_staging_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_staging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_staging_app_id

# Staging specific
NEXT_PUBLIC_ANALYTICS_ID=staging_analytics_id
NEXT_PUBLIC_DEBUG_MODE=false
NEXT_PUBLIC_API_URL=https://staging.dreamfolio.com/api
```

#### **Configuración de Staging**
```typescript
// next.config.staging.ts
const nextConfig: NextConfig = {
  ...baseConfig,
  env: {
    CUSTOM_KEY: 'staging_value',
  },
  // Configuraciones específicas de staging
  experimental: {
    ...baseConfig.experimental,
    // Habilitar features experimentales en staging
    serverComponentsExternalPackages: ['@prisma/client'],
  },
  // Headers de seguridad para staging
  async headers() {
    return [
      ...baseHeaders,
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Environment',
            value: 'staging',
          },
        ],
      },
    ];
  },
};
```

### **🚀 Producción (Production)**

#### **Variables de Entorno**
```bash
# .env.production
NODE_ENV=production
NEXT_PUBLIC_FIREBASE_API_KEY=your_prod_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_prod_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_prod_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_prod_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_prod_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_prod_app_id

# Production specific
NEXT_PUBLIC_ANALYTICS_ID=prod_analytics_id
NEXT_PUBLIC_DEBUG_MODE=false
NEXT_PUBLIC_API_URL=https://dreamfolio.com/api
```

#### **Configuración de Producción**
```typescript
// next.config.production.ts
const nextConfig: NextConfig = {
  ...baseConfig,
  // Optimizaciones de producción
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
  
  // Configuración de imágenes optimizada
  images: {
    ...baseConfig.images,
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 días
  },
  
  // Headers de seguridad completos
  async headers() {
    return [
      ...baseHeaders,
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Environment',
            value: 'production',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
};
```

---

## 🔥 **Firebase Hosting Configuration**

### **📁 firebase.json**
```json
{
  "hosting": {
    "public": "out",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**",
      "**/src/**",
      "**/docs/**",
      "**/*.md"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ],
    "headers": [
      {
        "source": "**/*.@(js|css)",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "public, max-age=31536000, immutable"
          }
        ]
      },
      {
        "source": "**/*.@(jpg|jpeg|gif|png|svg|webp|avif)",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "public, max-age=31536000, immutable"
          }
        ]
      },
      {
        "source": "**/*.@(woff|woff2|ttf|eot)",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "public, max-age=31536000, immutable"
          }
        ]
      }
    ],
    "cleanUrls": true,
    "trailingSlash": false
  },
  "firestore": {
    "rules": "firestore.rules",
    "indexes": "firestore.indexes.json"
  },
  "storage": {
    "rules": "storage.rules"
  },
  "functions": {
    "source": "functions",
    "runtime": "nodejs18"
  }
}
```

### **🔧 .firebaserc**
```json
{
  "projects": {
    "default": "dreamfolio-prod",
    "development": "dreamfolio-dev",
    "staging": "dreamfolio-staging"
  }
}
```

---

## 🚀 **Scripts de Build y Deployment**

### **📦 Build Scripts**

#### **Build de Desarrollo**
```bash
#!/bin/bash
# scripts/build-dev.sh

echo "🚀 Building DreamFolio for Development..."

# Limpiar builds anteriores
rm -rf .next out

# Instalar dependencias
npm ci

# Build de desarrollo
npm run build

# Build estático para Firebase
npm run export

echo "✅ Development build completed!"
echo "📁 Output directory: ./out"
```

#### **Build de Staging**
```bash
#!/bin/bash
# scripts/build-staging.sh

echo "🧪 Building DreamFolio for Staging..."

# Limpiar builds anteriores
rm -rf .next out

# Instalar dependencias
npm ci

# Build de staging
NODE_ENV=staging npm run build

# Build estático para Firebase
npm run export

echo "✅ Staging build completed!"
echo "📁 Output directory: ./out"
```

#### **Build de Producción**
```bash
#!/bin/bash
# scripts/build-prod.sh

echo "🚀 Building DreamFolio for Production..."

# Limpiar builds anteriores
rm -rf .next out

# Instalar dependencias
npm ci

# Build de producción
NODE_ENV=production npm run build

# Build estático para Firebase
npm run export

# Optimización adicional
npm run optimize-images
npm run compress-assets

echo "✅ Production build completed!"
echo "📁 Output directory: ./out"
```

### **🚀 Deployment Scripts**

#### **Deploy a Staging**
```bash
#!/bin/bash
# scripts/deploy-staging.sh

echo "🧪 Deploying to Staging..."

# Build de staging
./scripts/build-staging.sh

# Deploy a Firebase
firebase use staging
firebase deploy --only hosting

echo "✅ Staging deployment completed!"
echo "🌐 URL: https://staging.dreamfolio.com"
```

#### **Deploy a Producción**
```bash
#!/bin/bash
# scripts/deploy-prod.sh

echo "🚀 Deploying to Production..."

# Verificar que estamos en main branch
if [[ $(git branch --show-current) != "main" ]]; then
    echo "❌ Error: Must be on main branch to deploy to production"
    exit 1
fi

# Verificar tests
echo "🧪 Running tests..."
npm run test
if [ $? -ne 0 ]; then
    echo "❌ Tests failed. Aborting deployment."
    exit 1
fi

# Build de producción
./scripts/build-prod.sh

# Deploy a Firebase
firebase use production
firebase deploy --only hosting

# Notificar deployment
./scripts/notify-deployment.sh "production"

echo "✅ Production deployment completed!"
echo "🌐 URL: https://dreamfolio.com"
```

---

## 🔄 **CI/CD Pipeline**

### **📋 GitHub Actions**

#### **CI Pipeline**
```yaml
# .github/workflows/ci.yml
name: CI Pipeline

on:
  push:
    branches: [ main, develop, feature/* ]
  pull_request:
    branches: [ main, develop ]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v4
    
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run linting
      run: npm run lint
    
    - name: Run type checking
      run: npm run typecheck
    
    - name: Run tests
      run: npm run test
    
    - name: Build application
      run: npm run build
    
    - name: Analyze bundle
      run: npm run analyze
    
    - name: Upload build artifacts
      uses: actions/upload-artifact@v4
      with:
        name: build-files
        path: .next/
```

#### **CD Pipeline**
```yaml
# .github/workflows/cd.yml
name: CD Pipeline

on:
  push:
    branches: [ main, develop ]

jobs:
  deploy-staging:
    if: github.ref == 'refs/heads/develop'
    runs-on: ubuntu-latest
    environment: staging
    
    steps:
    - uses: actions/checkout@v4
    
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Build staging
      run: NODE_ENV=staging npm run build
    
    - name: Deploy to Firebase Staging
      uses: FirebaseExtended/action-hosting-deploy@v0
      with:
        repoToken: '${{ secrets.GITHUB_TOKEN }}'
        firebaseServiceAccount: '${{ secrets.FIREBASE_SERVICE_ACCOUNT_STAGING }}'
        projectId: dreamfolio-staging
        channelId: live
    
    - name: Notify deployment
      run: |
        echo "Staging deployment completed"
        # Aquí puedes agregar notificaciones a Slack, Discord, etc.

  deploy-production:
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    environment: production
    
    steps:
    - uses: actions/checkout@v4
    
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run tests
      run: npm run test
    
    - name: Build production
      run: NODE_ENV=production npm run build
    
    - name: Deploy to Firebase Production
      uses: FirebaseExtended/action-hosting-deploy@v0
      with:
        repoToken: '${{ secrets.GITHUB_TOKEN }}'
        firebaseServiceAccount: '${{ secrets.FIREBASE_SERVICE_ACCOUNT_PRODUCTION }}'
        projectId: dreamfolio-prod
        channelId: live
    
    - name: Notify deployment
      run: |
        echo "Production deployment completed"
        # Notificaciones de producción
```

---

## 📊 **Monitoreo y Observabilidad**

### **🔍 Performance Monitoring**

#### **Core Web Vitals**
```typescript
// lib/performance/web-vitals.ts
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

export const reportWebVitals = (metric: any) => {
  // Enviar métricas a Firebase Analytics
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', metric.name, {
      event_category: 'Web Vitals',
      event_label: metric.id,
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      non_interaction: true,
    });
  }
  
  // Log en consola para desarrollo
  if (process.env.NODE_ENV === 'development') {
    console.log(metric.name, metric.value);
  }
};

// Inicializar en _app.tsx
if (typeof window !== 'undefined') {
  getCLS(reportWebVitals);
  getFID(reportWebVitals);
  getFCP(reportWebVitals);
  getLCP(reportWebVitals);
  getTTFB(reportWebVitals);
}
```

#### **Error Tracking**
```typescript
// lib/monitoring/error-tracking.ts
export const trackError = (error: Error, context?: Record<string, any>) => {
  // Enviar a Firebase Crashlytics o similar
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'exception', {
      description: error.message,
      fatal: false,
      ...context,
    });
  }
  
  // Log en consola para desarrollo
  if (process.env.NODE_ENV === 'development') {
    console.error('Error tracked:', error, context);
  }
};

// Error boundary global
window.addEventListener('error', (event) => {
  trackError(event.error, {
    filename: event.filename,
    lineno: event.lineno,
    colno: event.colno,
  });
});

window.addEventListener('unhandledrejection', (event) => {
  trackError(new Error(event.reason), {
    type: 'unhandledrejection',
  });
});
```

---

## 🔒 **Seguridad en Producción**

### **🛡️ Security Headers**

#### **Headers Completos**
```typescript
// next.config.ts
const securityHeaders = [
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains; preload'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin'
  },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: https:",
      "connect-src 'self' https://firebase.googleapis.com",
      "frame-src 'self'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join('; ')
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), payment=()'
  }
];
```

---

## 📱 **Mobile Optimization**

### **📱 PWA Configuration**

#### **manifest.json**
```json
{
  "name": "DreamFolio - Portfolio Digital",
  "short_name": "DreamFolio",
  "description": "Portfolio digital interactivo con IA integrada",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#0F1117",
  "theme_color": "#0066FF",
  "orientation": "portrait-primary",
  "icons": [
    {
      "src": "/icons/icon-72x72.png",
      "sizes": "72x72",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-96x96.png",
      "sizes": "96x96",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-128x128.png",
      "sizes": "128x128",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-144x144.png",
      "sizes": "144x144",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-152x152.png",
      "sizes": "152x152",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-384x384.png",
      "sizes": "384x384",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

---

## 🚀 **Deployment Checklist**

### **✅ Pre-deployment**

- [ ] **Tests** pasando en CI
- [ ] **Linting** sin errores
- [ ] **Type checking** exitoso
- [ ] **Build** exitoso
- [ ] **Bundle analysis** revisado
- [ ] **Security scan** completado
- [ ] **Performance testing** exitoso

### **✅ Deployment**

- [ ] **Environment variables** configuradas
- [ ] **Firebase project** seleccionado
- [ ] **Build artifacts** generados
- [ ] **Deployment** exitoso
- [ ] **Health checks** pasando
- [ ] **Monitoring** configurado

### **✅ Post-deployment**

- [ ] **Smoke tests** ejecutados
- [ ] **Performance metrics** verificados
- [ ] **Error tracking** activo
- [ ] **Analytics** funcionando
- [ ] **Backup** completado
- [ ] **Documentation** actualizada

---

## 🔮 **Roadmap de Deployment**

### **🔄 Q1 2025**
- [ ] **Automated rollbacks** implementation
- [ ] **Blue-green deployment** strategy
- [ ] **Advanced monitoring** dashboard
- [ ] **Performance budgets** automation

### **🚀 Q2 2025**
- [ ] **Multi-region** deployment
- [ ] **Edge computing** optimization
- [ ] **Advanced caching** strategies
- [ ] **Load balancing** implementation

### **🎯 Q3 2025**
- [ ] **Kubernetes** migration
- [ ] **Service mesh** implementation
- [ ] **Advanced CI/CD** pipelines
- [ ] **Infrastructure as Code** (IaC)

---

<div align="center">
  <p><strong>🚀 Deployment automatizado y optimizado para máxima eficiencia 🚀</strong></p>
  <p>DreamFolio - Deployed with Excellence</p>
</div>
