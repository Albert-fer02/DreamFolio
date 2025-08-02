export const SITE_CONFIG = {
  name: "DreamFolio",
  title: "𓂀 Dreamcoder08 𓂀",
  description: "Cybersecurity Engineer • FinTech Architect • Creative Technologist",
  url: "https://dreamfolio.vercel.app",
  ogImage: "/og-image.png",
  creator: "@dreamcoder08",
} as const;

export const NAVIGATION = {
  sections: [
    { id: "hero", label: "Home" },
    { id: "trinity", label: "Trinity" },
    { id: "tech", label: "Tech & Tools" },
    { id: "learning", label: "Learning Journey" },
    { id: "collaboration", label: "Collaboration" },
    { id: "contact", label: "Contact" },
  ],
} as const;

export const ANIMATION_CONFIG = {
  duration: {
    fast: 0.2,
    normal: 0.3,
    slow: 0.5,
    verySlow: 0.8,
  },
  easing: {
    ease: [0.25, 0.46, 0.45, 0.94],
    easeIn: [0.55, 0.055, 0.675, 0.19],
    easeOut: [0.215, 0.61, 0.355, 1],
    easeInOut: [0.645, 0.045, 0.355, 1],
  },
  stagger: {
    fast: 0.05,
    normal: 0.1,
    slow: 0.15,
  },
} as const;

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

export const COLORS = {
  primary: "hsl(var(--primary))",
  primaryForeground: "hsl(var(--primary-foreground))",
  secondary: "hsl(var(--secondary))",
  secondaryForeground: "hsl(var(--secondary-foreground))",
  muted: "hsl(var(--muted))",
  mutedForeground: "hsl(var(--muted-foreground))",
  accent: "hsl(var(--accent))",
  accentForeground: "hsl(var(--accent-foreground))",
  destructive: "hsl(var(--destructive))",
  destructiveForeground: "hsl(var(--destructive-foreground))",
  border: "hsl(var(--border))",
  input: "hsl(var(--input))",
  ring: "hsl(var(--ring))",
  background: "hsl(var(--background))",
  foreground: "hsl(var(--foreground))",
  card: "hsl(var(--card))",
  cardForeground: "hsl(var(--card-foreground))",
  popover: "hsl(var(--popover))",
  popoverForeground: "hsl(var(--popover-foreground))",
} as const;

export const GRADIENTS = {
  cyber: "linear-gradient(135deg, #ff4040 0%, #ff6b6b 100%)",
  fintech: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
  creative: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  glass: "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)",
} as const; 