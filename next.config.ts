import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: [
      'lucide-react',
      'framer-motion',
      '@radix-ui/react-icons',
    ],
    serverComponentsExternalPackages: ['@upstash/redis', '@supabase/supabase-js'],
    // React 19 + Next.js 16 features
    reactCompiler: true, // Enable React Compiler for automatic optimizations
    serverActions: {
      allowedOrigins: ['localhost:3000', 'localhost:9002', '.vercel.app'],
    },
    // WebAssembly support
    esmExternals: 'loose',
  },
  // Configuración de Turbopack (estable)
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
  // Configuración webpack solo cuando no se usa Turbopack
  ...(process.env.TURBOPACK !== 'true' && {
    webpack: (config, { dev, isServer }) => {
      // WebAssembly support
      config.experiments = {
        ...config.experiments,
        asyncWebAssembly: true,
        layers: true,
      };

      config.module.rules.push({
        test: /\.wasm$/,
        type: 'webassembly/async',
      });

      // Module Federation Configuration
      if (!isServer) {
        config.plugins.push(
          new config.webpack.container.ModuleFederationPlugin({
            name: 'dreamfolio_host',
            filename: 'static/chunks/remoteEntry.js',
            remotes: {
              portfolio: `portfolio@http://localhost:3001/_next/static/chunks/remoteEntry.js`,
              admin: `admin@http://localhost:3002/_next/static/chunks/remoteEntry.js`,
              analytics: `analytics@http://localhost:3003/_next/static/chunks/remoteEntry.js`,
            },
            exposes: {
              './HeroSection': './src/components/sections/hero-section.tsx',
              './Navigation': './src/components/layout/navigation.tsx',
              './Footer': './src/components/sections/footer.tsx',
              './ContactForm': './src/components/features/contact/contact-form.tsx',
            },
            shared: {
              react: {
                singleton: true,
                eager: true,
                requiredVersion: '^19.0.0',
              },
              'react-dom': {
                singleton: true,
                eager: true,
                requiredVersion: '^19.0.0',
              },
              next: {
                singleton: true,
                eager: true,
                requiredVersion: '^15.0.0',
              },
              'framer-motion': {
                singleton: true,
                requiredVersion: '^12.0.0',
              },
              'tailwindcss': {
                singleton: true,
                requiredVersion: '^3.0.0',
              },
            },
          })
        );
      }

      // Optimizaciones específicas para producción
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
            lucide: {
              test: /[\\/]node_modules[\\/]lucide-react[\\/]/,
              name: 'lucide-react',
              chunks: 'all',
              priority: 20,
            },
          },
        };
      }

      // Bundle analyzer (solo en desarrollo)
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

      return config;
    },
  }),
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
    // Optimización de imágenes con AI-powered processing
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // ⚠️ SECURITY WARNING: These should be false in production
  typescript: {
    ignoreBuildErrors: process.env.NODE_ENV === 'development', // Solo en desarrollo
  },
  eslint: {
    ignoreDuringBuilds: process.env.NODE_ENV === 'development', // Solo en desarrollo
  },
  
  // 🔒 Enhanced Security headers (OWASP compliant)
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
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.googleapis.com https://*.gstatic.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "img-src 'self' data: https: blob:",
              "font-src 'self' https://fonts.gstatic.com",
              "connect-src 'self' https://*.firebase.com https://*.supabase.com https://*.upstash.com",
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
  // Optimizaciones de caching
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
  // Edge Runtime avanzado para AI integration
  runtime: 'edge',
  regions: ['fra1', 'iad1', 'sin1', 'gru1', 'hnd1'],

  // Optimizaciones de desarrollo
  reactStrictMode: true,
};

export default nextConfig;
