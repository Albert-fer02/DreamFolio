/** @type {import('next').NextConfig} */
const nextConfig = {
  // Micro-frontend specific configuration
  basePath: '/portfolio',
  assetPrefix: '/portfolio',

  experimental: {
    optimizePackageImports: [
      'lucide-react',
      'framer-motion',
      '@radix-ui/react-icons',
    ],
    serverComponentsExternalPackages: ['@upstash/redis', '@supabase/supabase-js'],
  },

  webpack: (config, { isServer }) => {
    // Module Federation Configuration for Portfolio Micro-Frontend
    if (!isServer) {
      config.plugins.push(
        new config.webpack.container.ModuleFederationPlugin({
          name: 'portfolio',
          filename: 'static/chunks/remoteEntry.js',
          exposes: {
            './PortfolioSection': './src/components/portfolio/portfolio-section.tsx',
            './PortfolioGrid': './src/components/portfolio/portfolio-grid.tsx',
            './ProjectCard': './src/components/portfolio/project-card.tsx',
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

    return config;
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
        pathname: '/**',
      },
    ],
    formats: ['image/webp', 'image/avif'],
  },
};

module.exports = nextConfig;