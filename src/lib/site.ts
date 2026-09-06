export const siteConfig = {
  title: "Albert Agurto — Software, IA & sistemas | Dreamcoder",
  description: "Desarrollador autodidacta en Piura, Perú. Fundador de Arkelythex y creador de Drenyra. Arquitectura de software, sistemas de IA y herramientas abiertas.",
  url: "https://dreamfolio.vercel.app",
  author: "Dreamcoder08",
  // Replace this image with the owner's photograph; the frame is shared by portrait and avatar.
  profile: {
    image: "/images/profile/dreamcoder-emblem.webp",
    imageAlt: "Emblema de Dreamcoder: estrella de ocho puntas en titanio con luz cobriza",
    imagePosition: "50% 50%",
  },
  social: {
    x: "https://x.com/Dreamcoder08",
    github: "https://github.com/Dreamcoder08",
    instagram: "https://www.instagram.com/dreamcoder.08/",
    arkelythex: "https://github.com/arkelythex",
  },
};

const rawBasePath = import.meta.env.BASE_URL ?? '/';

export const basePath = rawBasePath.endsWith('/') ? rawBasePath : `${rawBasePath}/`;

export function withBase(path: string): string {
  if (!path) return basePath;
  if (/^(https?:)?\/\//.test(path) || path.startsWith('mailto:') || path.startsWith('#')) return path;
  if (path === '/') return basePath;
  const normalized = path.replace(/^\/+/, '');
  return `${basePath}${normalized}`;
}

export function withBaseAsset(path: string): string {
  return withBase(path.replace(/^\/+/, ''));
}

export function toAbsoluteSiteUrl(path: string, site: string): string {
  return new URL(withBaseAsset(path), site).toString();
}
