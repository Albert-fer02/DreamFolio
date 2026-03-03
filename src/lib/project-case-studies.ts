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
    eyebrow: 'Mission-Critical Infrastructure',
    challenge:
      'My challenge was to design a high-integrity fiscal operating system capable of handling autonomous execution with absolute auditability and zero-fault tolerance.',
    approach:
      'I implemented a domain-driven architecture with strict state isolation and an event-driven core. I focused on minimizing the attack surface by employing a static-first management interface.',
    outcome:
      'I delivered a resilient fiscal backbone that anchors the Arkonyx ecosystem, providing verifiable transparency and operational consistency across distributed nodes.',
    evidence: [
      'My stateless execution engine for fiscal logic validation.',
      'Cryptographically verifiable audit trails I architected for system transitions.',
      'Automated reconciliation pipelines that reduced manual oversight by 90%.',
    ],
    signals: ['Domain-Driven Design', 'Fiscal Integrity', 'Event Orchestration'],
    metrics: [
      { label: 'Architecture', value: 'Event-Driven Core' },
      { label: 'Data Integrity', value: 'Atomic Transitions' },
      { label: 'Security', value: 'Zero-Trust Surface' },
    ],
    cardImpact: 'Autonomous fiscal infrastructure I architected for high-integrity decentralized operations.',
    highlightRank: 1,
  },
  'legal-os-01': {
    eyebrow: 'Structured Intelligence System',
    challenge:
      'I needed to unify fragmented legal data and complex procedural workflows into a deterministic operating system without compromising data fidelity.',
    approach:
      'I architected a multi-layered data ingestion pipeline with automated semantic tagging and built a modular service layer using Rust and Bun for high-performance processing.',
    outcome:
      'I created a centralized legal intelligence platform that transforms raw documentation into actionable structured data, reducing procedural latency significantly.',
    evidence: [
      'My high-speed document parsing engine with semantic validation.',
      'Deterministic workflow engine I built for complex legal sequences.',
      'Unified schema I designed for cross-jurisdictional data interoperability.',
    ],
    signals: ['Data Engineering', 'Rust Performance', 'LegalTech Architecture'],
    metrics: [
      { label: 'Processing', value: 'Sub-second Parsing' },
      { label: 'Reliability', value: 'Deterministic Flows' },
      { label: 'Scale', value: 'Multi-tenant Ready' },
    ],
    cardImpact: 'Centralized legal intelligence OS I architected for high-volume data orchestration.',
    highlightRank: 2,
  },
  'edge-traz-agro': {
    eyebrow: 'Edge Computing Resilience',
    challenge:
      'I faced the challenge of maintaining data integrity and operational traceability in low-connectivity environments where field devices must operate autonomously.',
    approach:
      'I developed an offline-first synchronization protocol and leveraged lightweight containerization to ensure consistent deployment across heterogeneous hardware.',
    outcome:
      'I built a robust traceability system that ensures 100% data capture in remote operations, minimizing dependency on centralized cloud services.',
    evidence: [
      'My asynchronous sync engine with verifiable state hashes.',
      'Low-power edge worker nodes I designed for real-time telemetry.',
      'Hardened hardware-software interface for environmental resilience.',
    ],
    signals: ['Edge Computing', 'Offline-First Sync', 'IoT Resilience'],
    metrics: [
      { label: 'Uptime', value: '99.9% Edge Autonomy' },
      { label: 'Sync Latency', value: 'Optimized Burst' },
      { label: 'Data Safety', value: 'Local Redundancy' },
    ],
    cardImpact: 'Edge traceability infrastructure I built for operational resilience in distributed environments.',
    highlightRank: 3,
  },
  'dreamcoder-dots': {
    eyebrow: 'System Orchestration',
    challenge:
      'I set out to engineer a reproducible, high-performance Linux workstation environment that balances aesthetic polish with extreme operational efficiency.',
    approach:
      'I built a modular configuration system using GNU Stow and custom Shell/Lua orchestrators, integrating GLSL shader-driven visual feedback loops.',
    outcome:
      'I achieved a deterministic development environment that I can bootstrap in minutes, providing a high-signal interface for deep-work sessions.',
    evidence: [
      'Declarative system setup I designed using shell automation.',
      'GPU-accelerated terminal interface with custom GLSL integration.',
      'Modular DX tooling with unified keybinding orchestration.',
    ],
    signals: ['System Design', 'Developer Experience', 'Unix Philosophy'],
    metrics: [
      { label: 'Bootstrap', value: '< 5 min' },
      { label: 'Engine', value: 'Lua + Shell' },
      { label: 'Visuals', value: 'GLSL / GPU' },
    ],
    cardImpact: 'Deterministic Arch Linux workstation environment with custom GPU-driven orchestration.',
    highlightRank: 4,
  },
};

export function getProjectCaseStudy(projectId: string): ProjectCaseStudy | undefined {
  return projectCaseStudies[projectId];
}

export function getProjectHighlightRank(projectId: string): number {
  return projectCaseStudies[projectId]?.highlightRank ?? Number.MAX_SAFE_INTEGER;
}
