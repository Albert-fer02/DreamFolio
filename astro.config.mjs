// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

const isDev = process.env.NODE_ENV === 'development';
// Vercel injects VERCEL=1 on every build automatically; no dashboard
// configuration required. Vercel serves the site from its domain root,
// while GitHub Pages serves it under /DreamFolio, so the base path must
// differ per platform rather than assume GitHub Pages by default.
const isVercel = process.env.VERCEL === '1';

// https://astro.build/config
export default defineConfig({
  site:
    process.env.SITE_URL ||
    (isVercel && process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : 'https://dreamcoder08.github.io'),
  base: process.env.SITE_BASE ?? (isDev || isVercel ? '/' : '/DreamFolio'),
  server: {
    host: true,
    port: 4321,
  },
  output: 'static',
  build: {
    inlineStylesheets: 'auto',
  },
  compressHTML: true,
  vite: {
    plugins: [tailwindcss()],
    server: {
      host: '0.0.0.0',
      port: 4321,
      strictPort: true,
      ws: {
        host: 'localhost',
        protocol: 'ws',
        clientPort: 4321,
        port: 4321,
      },
    },
  },
});
