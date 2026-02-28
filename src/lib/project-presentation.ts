export type ProjectTone =
  | 'arkonyx'
  | 'govtech'
  | 'agritech'
  | 'legaltech'
  | 'media'
  | 'systems'
  | 'design'
  | 'archive'
  | 'lab';

const toneMap: Record<string, ProjectTone> = {
  'fintech-platform': 'arkonyx',
  govtech: 'govtech',
  agritech: 'agritech',
  legaltech: 'legaltech',
  'media-tools': 'media',
  systems: 'systems',
  platform: 'systems',
  'developer-experience': 'systems',
  'knowledge-systems': 'systems',
  validation: 'govtech',
  operations: 'systems',
  portfolio: 'design',
  'design-systems': 'design',
  'creative-ui': 'design',
  audio: 'design',
  'ai-content': 'design',
  commerce: 'design',
  hospitality: 'design',
  'saas-operations': 'systems',
  'startup-ops': 'systems',
  security: 'lab',
};

export function getProjectTone(domain: string, bucket: string): ProjectTone {
  if (bucket === 'archived') {
    return 'archive';
  }

  if (bucket === 'lab') {
    return 'lab';
  }

  return toneMap[domain] ?? 'systems';
}

export function getProjectCoverClasses(tone: ProjectTone): string {
  const toneClasses: Record<ProjectTone, string> = {
    arkonyx:
      'from-white/[0.14] via-zinc-300/[0.08] to-transparent',
    govtech:
      'from-zinc-100/[0.12] via-white/[0.05] to-transparent',
    agritech:
      'from-zinc-200/[0.11] via-zinc-400/[0.05] to-transparent',
    legaltech:
      'from-zinc-100/[0.1] via-zinc-500/[0.05] to-transparent',
    media:
      'from-zinc-300/[0.1] via-zinc-100/[0.04] to-transparent',
    systems:
      'from-white/[0.08] via-zinc-500/[0.04] to-transparent',
    design:
      'from-zinc-100/[0.1] via-zinc-300/[0.05] to-transparent',
    archive:
      'from-zinc-400/[0.08] via-zinc-600/[0.04] to-transparent',
    lab:
      'from-white/[0.07] via-zinc-500/[0.03] to-transparent',
  };

  return toneClasses[tone];
}

export function getProjectToneLabel(tone: ProjectTone): string {
  const labels: Record<ProjectTone, string> = {
    arkonyx: 'Core System',
    govtech: 'Public Infrastructure',
    agritech: 'Edge Traceability',
    legaltech: 'Legal Intelligence',
    media: 'Media Tooling',
    systems: 'Systems Engineering',
    design: 'Interface Direction',
    archive: 'Archived Iteration',
    lab: 'Research Track',
  };

  return labels[tone];
}

export function getProjectSlug(title: string): string {
  return title
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
