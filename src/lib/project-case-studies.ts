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
      'Designing a high-integrity fiscal operating system capable of handling autonomous execution with absolute auditability and zero-fault tolerance in decentralized environments.',
    approach:
      'Implemented a domain-driven architecture with strict state isolation and an event-driven core. Focused on minimizing the attack surface by employing a static-first management interface and type-safe protocols.',
    outcome:
      'A resilient fiscal backbone that anchors the Arkonyx ecosystem. The system provides verifiable transparency and operational consistency across distributed nodes, ensuring long-term architectural stability.',
    evidence: [
      'Stateless execution engine for fiscal logic validation.',
      'Cryptographically verifiable audit trails for all system transitions.',
      'Automated reconciliation pipelines reducing manual oversight by 90%.',
    ],
    signals: ['Domain-Driven Design', 'Fiscal Integrity', 'Event Orchestration'],
    metrics: [
      { label: 'Architecture', value: 'Event-Driven Core' },
      { label: 'Data Integrity', value: 'Atomic Transitions' },
      { label: 'Security', value: 'Zero-Trust Surface' },
    ],
    cardImpact: 'Autonomous fiscal infrastructure architected for high-integrity decentralized operations.',
    highlightRank: 1,
  },
  'legal-os-01': {
    eyebrow: 'Structured Intelligence System',
    challenge:
      'Unifying fragmented legal data and complex procedural workflows into a deterministic operating system without compromising data fidelity or compliance.',
    approach:
      'Architected a multi-layered data ingestion pipeline with automated semantic tagging. Built a modular service layer using Rust and Bun to ensure high-performance document processing and state management.',
    outcome:
      'A centralized legal intelligence platform that transforms raw documentation into actionable structured data, significantly reducing procedural latency in high-volume environments.',
    evidence: [
      'High-speed document parsing engine with semantic validation.',
      'Deterministic workflow engine for complex legal sequences.',
      'Unified schema for cross-jurisdictional data interoperability.',
    ],
    signals: ['Data Engineering', 'Rust Performance', 'LegalTech Architecture'],
    metrics: [
      { label: 'Processing', value: 'Sub-second Parsing' },
      { label: 'Reliability', value: 'Deterministic Flows' },
      { label: 'Scale', value: 'Multi-tenant Ready' },
    ],
    cardImpact: 'Centralized legal intelligence OS architected for high-volume data orchestration.',
    highlightRank: 2,
  },
  'edge-traz-agro': {
    eyebrow: 'Edge Computing Resilience',
    challenge:
      'Maintaining data integrity and operational traceability in low-connectivity environments where field devices must operate autonomously under harsh conditions.',
    approach:
      'Developed an offline-first synchronization protocol with conflict resolution at the edge. Leveraged lightweight containerization to ensure consistent deployment across heterogeneous hardware.',
    outcome:
      'A robust traceability system that ensures 100% data capture in remote operations. The architecture minimizes dependency on centralized cloud services, increasing regional uptime.',
    evidence: [
      'Asynchronous sync engine with verifiable state hashes.',
      'Low-power edge worker nodes for real-time telemetry processing.',
      'Hardened hardware-software interface for environmental resilience.',
    ],
    signals: ['Edge Computing', 'Offline-First Sync', 'IoT Resilience'],
    metrics: [
      { label: 'Uptime', value: '99.9% Edge Autonomy' },
      { label: 'Sync Latency', value: 'Optimized Burst' },
      { label: 'Data Safety', value: 'Local Redundancy' },
    ],
    cardImpact: 'Edge traceability infrastructure built for operational resilience in distributed environments.',
    highlightRank: 3,
  },
  'dreamcoder-dots': {
    eyebrow: 'System Orchestration',
    challenge:
      'Engineering a reproducible, high-performance Linux workstation environment that balances aesthetic polish with extreme operational efficiency.',
    approach:
      'Built a modular configuration system using GNU Stow and custom Shell/Lua orchestrators. Integrated GLSL shader-driven visual feedback loops into the window management layer.',
    outcome:
      'A deterministic development environment that can be bootstrapped in minutes. The system provides a high-signal interface that reduces cognitive friction during deep-work sessions.',
    evidence: [
      'Declarative system setup using shell-based automation.',
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
