const rawBasePath = import.meta.env.BASE_URL ?? '/';

export const basePath = rawBasePath.endsWith('/') ? rawBasePath : `${rawBasePath}/`;

export function withBase(path: string): string {
  if (!path) {
    return basePath;
  }

  if (/^(https?:)?\/\//.test(path) || path.startsWith('mailto:') || path.startsWith('#')) {
    return path;
  }

  if (path === '/') {
    return basePath;
  }

  const normalized = path.replace(/^\/+/, '');

  return `${basePath}${normalized}`;
}

export function withBaseAsset(path: string): string {
  const normalized = path.replace(/^\/+/, '');
  return withBase(normalized);
}

export function toAbsoluteSiteUrl(path: string, site: string): string {
  const normalized = withBaseAsset(path);
  return new URL(normalized, site).toString();
}
