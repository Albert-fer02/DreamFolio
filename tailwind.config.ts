import type {Config} from 'tailwindcss';
const { fontFamily } = require("tailwindcss/defaultTheme")

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      'xs': '375px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      '3xl': '1920px',
      
      // Device-specific breakpoints
      'mobile-s': '320px',
      'mobile-m': '375px',
      'mobile-l': '425px',
      'tablet': '768px',
      'tablet-lg': '1024px',
      'laptop': '1280px',
      'laptop-l': '1440px',
      'desktop': '1920px',
      'desktop-l': '2560px',
      
      // Orientation-based breakpoints
      'landscape': {'raw': '(orientation: landscape)'},
      'portrait': {'raw': '(orientation: portrait)'},
      
      // High-density displays
      'retina': {'raw': '(-webkit-min-device-pixel-ratio: 2)'},
      
      // Touch devices
      'touch': {'raw': '(hover: none) and (pointer: coarse)'},
      'no-touch': {'raw': '(hover: hover) and (pointer: fine)'},
      
      // Print styles
      'print': {'raw': 'print'},
    },
    extend: {
      fontFamily: {
        body: ['var(--font-inter)', ...fontFamily.sans],
        headline: ['var(--font-poppins)', ...fontFamily.sans],
        code: ['var(--font-jetbrains)', ...fontFamily.mono],
        tech: ['var(--font-space-grotesk)', ...fontFamily.sans],
        display: ['var(--font-space-grotesk)', ...fontFamily.sans],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
        
        // Responsive typography scales
        'display': ['clamp(2.5rem, 5vw, 4rem)', { lineHeight: '1.1' }],
        'heading': ['clamp(1.75rem, 3.5vw, 2.5rem)', { lineHeight: '1.2' }],
        'subheading': ['clamp(1.25rem, 2.5vw, 1.75rem)', { lineHeight: '1.3' }],
        'body-lg': ['clamp(1.125rem, 2vw, 1.25rem)', { lineHeight: '1.6' }],
        'body': ['clamp(1rem, 1.5vw, 1.125rem)', { lineHeight: '1.6' }],
        'caption': ['clamp(0.875rem, 1.25vw, 1rem)', { lineHeight: '1.5' }],
        
        // Mobile-optimized sizes
        'mobile-display': ['2rem', { lineHeight: '1.1' }],
        'mobile-heading': ['1.5rem', { lineHeight: '1.2' }],
        'mobile-body': ['0.875rem', { lineHeight: '1.5' }],
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
        'glow-pulse': {
          '0%, 100%': {
            boxShadow: '0 0 20px rgba(0, 255, 255, 0.3)',
          },
          '50%': {
            boxShadow: '0 0 30px rgba(0, 255, 255, 0.6)',
          },
        },
        'text-glow': {
          '0%, 100%': {
            textShadow: '0 0 10px currentColor',
          },
          '50%': {
            textShadow: '0 0 20px currentColor, 0 0 30px currentColor',
          },
        },
        'cyber-scan': {
          '0%': {
            transform: 'translateY(-100%)',
            opacity: '0',
          },
          '50%': {
            opacity: '1',
          },
          '100%': {
            transform: 'translateY(100%)',
            opacity: '0',
          },
        },
        'matrix-rain': {
          '0%': {
            transform: 'translateY(-100vh)',
          },
          '100%': {
            transform: 'translateY(100vh)',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'text-glow': 'text-glow 2s ease-in-out infinite',
        'cyber-scan': 'cyber-scan 3s linear infinite',
        'matrix-rain': 'matrix-rain 20s linear infinite',
      },
      spacing: {
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
        'safe-left': 'env(safe-area-inset-left)',
        'safe-right': 'env(safe-area-inset-right)',
      },
      minHeight: {
        'screen-safe': 'calc(100vh - env(safe-area-inset-top) - env(safe-area-inset-bottom))',
      },
      maxWidth: {
        'screen-mobile': '428px',
        'screen-tablet': '834px',
        'screen-desktop': '1440px',
      },
      utilities: {
        '.safe-area-inset-x': {
          'padding-left': 'env(safe-area-inset-left)',
          'padding-right': 'env(safe-area-inset-right)',
        },
        '.safe-area-inset-y': {
          'padding-top': 'env(safe-area-inset-top)',
          'padding-bottom': 'env(safe-area-inset-bottom)',
        },
        '.touch-manipulation': {
          'touch-action': 'manipulation',
        },
        '.will-change-scroll': {
          'will-change': 'scroll-position',
        },
        '.backface-hidden': {
          'backface-visibility': 'hidden',
        },
        '.transform-gpu': {
          'transform': 'translateZ(0)',
        },
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'), 
    require('@tailwindcss/typography'),
    // Container queries plugin (if available)
    function({ addUtilities }: { addUtilities: Function }) {
      addUtilities({
        '.container-query': {
          'container-type': 'inline-size',
        },
        '.cq-xs': {
          '@container (min-width: 20rem)': {},
        },
        '.cq-sm': {
          '@container (min-width: 24rem)': {},
        },
        '.cq-md': {
          '@container (min-width: 28rem)': {},
        },
        '.cq-lg': {
          '@container (min-width: 32rem)': {},
        },
        '.cq-xl': {
          '@container (min-width: 36rem)': {},
        },
      });
    },
  ],
} satisfies Config;
