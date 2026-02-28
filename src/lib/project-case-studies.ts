export interface ProjectSignalMetric {
  label: string;
  value: string;
}

export interface ProjectCaseStudy {
  eyebrow: string;
  challenge: string;
  approach: string;
  outcome: string;
  evidence: string[];
  signals: string[];
  metrics: ProjectSignalMetric[];
  cardImpact: string;
  highlightRank: number;
}

const projectCaseStudies: Record<string, ProjectCaseStudy> = {
  arkonyx: {
    eyebrow: 'Core platform case study',
    challenge:
      'Turn a broad fiscal product vision into a credible operating system with clearer product boundaries, stronger architecture language, and a founder-level signal.',
    approach:
      'Position Arkonyx as the flagship system, frame it around high-integrity fiscal infrastructure, and keep the stack narrative centered on long-horizon operability instead of feature noise.',
    outcome:
      'Arkonyx now anchors the portfolio as the most serious systems play: a platform-level project that reads as a product direction, not a loose collection of experiments.',
    evidence: [
      'Presented as the lead system in both the homepage and the project catalog.',
      'Framed as autonomous fiscal infrastructure instead of an internal folder label.',
      'Kept close to your founder identity so the project reinforces your positioning.',
    ],
    signals: ['Platform strategy', 'Systems architecture', 'Founder ownership'],
    metrics: [
      { label: 'Role', value: 'Flagship system' },
      { label: 'Narrative', value: 'Core platform' },
      { label: 'Recruiter read', value: 'Founding engineer / architect' },
    ],
    cardImpact: 'Flagship product direction with the strongest founder and systems-architecture signal.',
    highlightRank: 1,
  },
  'dreamcoder-dots': {
    eyebrow: 'Environment engineering case study',
    challenge:
      'Show technical depth beyond web apps and make your personal tooling read as engineered infrastructure instead of generic dotfiles.',
    approach:
      'Elevate DreamcoderDots as a custom Arch Linux environment with modular shell tooling, GPU-driven visual polish, and a reproducible workstation setup built around GNU Stow.',
    outcome:
      'DreamcoderDots now reads as a differentiator: it proves system ownership, local tooling discipline, and taste in developer experience, which is stronger than another generic portfolio clone.',
    evidence: [
      'Public repo updated on February 22, 2026 and used as the current source of truth.',
      'GitHub language mix includes GLSL, Shell, Lua, Rust, and TypeScript.',
      'README now reflects the actual repo structure, installation flow, and workstation focus.',
    ],
    signals: ['Arch Linux', 'Developer experience', 'Terminal systems', 'Customization'],
    metrics: [
      { label: 'Primary OS', value: 'Arch Linux' },
      { label: 'Key tooling', value: 'GNU Stow + Make' },
      { label: 'Visual layer', value: 'GLSL shaders' },
    ],
    cardImpact: 'Custom Arch workstation with shell, GLSL, and reproducible dotfile orchestration.',
    highlightRank: 2,
  },
  'elect-validate': {
    eyebrow: 'Validation infrastructure case study',
    challenge:
      'Communicate that this is not a toy validator but a system designed for concurrency, auditability, and deterministic processing under pressure.',
    approach:
      'Reframe the project as Electo Suite: a burst-oriented validation pipeline with governance language, operational resilience, and clearer system intent.',
    outcome:
      'The project now signals backend seriousness and data integrity, which broadens your profile beyond interface work and into reliability-driven product engineering.',
    evidence: [
      'Public GitHub repo remains visible as proof of work.',
      'Homepage highlights it as one of the active systems next to Arkonyx.',
      'Positioning now emphasizes deterministic validation rather than a narrow tool label.',
    ],
    signals: ['Concurrency', 'Validation pipelines', 'Auditability'],
    metrics: [
      { label: 'Public signal', value: 'Visible repo' },
      { label: 'Core focus', value: 'Deterministic validation' },
      { label: 'Narrative', value: 'High-concurrency infra' },
    ],
    cardImpact: 'Concurrency-focused validation infrastructure with stronger reliability and audit signals.',
    highlightRank: 3,
  },
  'edge-traz-agro': {
    eyebrow: 'Operational resilience case study',
    challenge:
      'Show that your range includes real-world operational systems, not only software abstractions or developer tooling.',
    approach:
      'Present Edge Traz Agro as edge and traceability work tied to field operations, resilience, and system reliability in a demanding environment.',
    outcome:
      'This project gives your portfolio sector range and reinforces that you can design software for operational realities, not just polished interfaces.',
    evidence: [
      'Kept as a featured primary project in the recruiter-facing homepage.',
      'Positioned around edge workflows and resilience instead of only “agritech”.',
      'Paired with Arkonyx and Electo Suite to show domain diversity with systems consistency.',
    ],
    signals: ['Edge systems', 'Operational resilience', 'Domain adaptability'],
    metrics: [
      { label: 'Domain', value: 'Agri/edge operations' },
      { label: 'Signal', value: 'Field resilience' },
      { label: 'Portfolio role', value: 'Range proof' },
    ],
    cardImpact: 'Edge and traceability work that proves operational-system range beyond pure web products.',
    highlightRank: 4,
  },
};

export function getProjectCaseStudy(projectId: string): ProjectCaseStudy | undefined {
  return projectCaseStudies[projectId];
}

export function getProjectHighlightRank(projectId: string): number {
  return projectCaseStudies[projectId]?.highlightRank ?? Number.MAX_SAFE_INTEGER;
}
