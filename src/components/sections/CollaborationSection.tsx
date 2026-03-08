import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Code, Github, Mail, ScrollText, ShieldCheck, Wrench } from 'lucide-react';
import { Card, Badge } from '../ui';
import { withBase } from '../../lib/site';

interface EvidenceItem {
  icon: React.ReactNode;
  label: string;
  detail: string;
  href: string;
  cta: string;
}

interface PublicRepoItem {
  name: string;
  href: string;
  description: string;
}

const featuredPublicRepos: PublicRepoItem[] = [
  {
    name: 'Digital_Public_peru',
    href: 'https://github.com/Albert-fer02/Digital_Public_peru',
    description: 'Civic digital infrastructure and public-service architecture.',
  },
  {
    name: 'Dreamcoder_dots',
    href: 'https://github.com/Albert-fer02/Dreamcoder_dots',
    description: 'Arch Linux workstation and terminal engineering stack.',
  },
  {
    name: 'landyng-page-Electoral-Peru',
    href: 'https://github.com/Albert-fer02/landyng-page-Electoral-Peru',
    description: 'Electoral information landing and public-facing UI work.',
  },
  {
    name: 'CleanSweep',
    href: 'https://github.com/Albert-fer02/CleanSweep',
    description: 'AI-first dotfile manager built in Rust.',
  },
  {
    name: 'Administracion',
    href: 'https://github.com/Albert-fer02/Administracion',
    description: 'Administrative workflows and operations tooling.',
  },
  {
    name: 'pseint-web',
    href: 'https://github.com/Albert-fer02/pseint-web',
    description: 'Modern educational/web product experimentation.',
  },
];

const evidenceData: EvidenceItem[] = [
  {
    icon: <Github className="w-5 h-5" aria-hidden="true" />,
    label: 'Public Build Trail',
    detail: 'Open repositories, commit history, and architecture artifacts are visible for technical review.',
    href: 'https://github.com/Albert-fer02',
    cta: 'Review GitHub',
  },
  {
    icon: <ScrollText className="w-5 h-5" aria-hidden="true" />,
    label: 'Case-Based Documentation',
    detail: 'Project pages describe challenge, approach, and implementation direction in concise technical terms.',
    href: withBase('/projects/'),
    cta: 'Read case files',
  },
  {
    icon: <ShieldCheck className="w-5 h-5" aria-hidden="true" />,
    label: 'Reliability Constraints',
    detail: 'Work is framed around auditability, traceability, and controlled autonomy over hype metrics.',
    href: withBase('/#projects'),
    cta: 'Inspect systems',
  },
  {
    icon: <Wrench className="w-5 h-5" aria-hidden="true" />,
    label: 'Builder-Oriented Positioning',
    detail: 'Focused on developer programs, research collaborations, and early infrastructure initiatives.',
    href: withBase('/#contact'),
    cta: 'Start conversation',
  },
];

interface RepoCardProps {
  item: PublicRepoItem;
  index: number;
}

const RepoCard: React.FC<RepoCardProps> = ({ item, index }) => (
  <motion.article
    initial={{ opacity: 0, y: 28 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.08 }}
    viewport={{ once: true }}
    className="group"
  >
    <Card variant="glass" className="transition-all duration-500 hover:border-primary hover:shadow-2xl hover:shadow-primary/20 hover:scale-[1.02]">
      <div className="p-6">
        <p className="text-[10px] font-code uppercase tracking-[0.18em] text-zinc-500 mb-2">
          Public repository
        </p>
        <h3 className="font-display text-xl mb-3 group-hover:text-primary transition-colors break-all">
          {item.name}
        </h3>

        <p className="text-muted-foreground text-base leading-relaxed mb-4">
          {item.description}
        </p>

        <a
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-xs font-code uppercase tracking-[0.16em] text-zinc-400 transition-colors hover:text-primary"
        >
          Open repository
          <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
        </a>
      </div>
    </Card>
  </motion.article>
);

/* --- Main Component --- */

const CollaborationSection: React.FC = () => {
  return (
    <section
      id="collaboration"
      className="py-20 sm:py-24 bg-gradient-to-br from-background via-muted/5 to-background relative overflow-hidden"
      aria-labelledby="collaboration-heading"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" aria-hidden="true" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge variant="primary" className="mb-4">
            <Code className="w-4 h-4" aria-hidden="true" />
            COLLABORATION
          </Badge>
          <h2 id="collaboration-heading" className="text-4xl md:text-5xl font-display font-bold mb-6">
            <span className="gradient-text-cyber">Builder</span>{' '}
            <span className="gradient-text-financial">Collaboration</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto font-tech">
            Open to developer programs, applied AI research tracks, and early-stage infrastructure
            partnerships where technical rigor matters.
          </p>
        </motion.header>

        <div className="mb-10">
          <p className="text-xs font-code uppercase tracking-[0.18em] text-zinc-500 mb-4 text-center">
            Featured public repositories
          </p>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {featuredPublicRepos.map((item, index) => (
              <RepoCard key={item.name} item={item} index={index} />
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-5 mt-12">
          {evidenceData.map((item, index) => (
            <motion.a
              key={item.label}
              href={item.href}
              target={item.href.startsWith('http') ? '_blank' : undefined}
              rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-white/8 bg-white/[0.02] px-5 py-5 backdrop-blur-sm transition-colors hover:border-primary/25 hover:bg-primary/[0.04]"
            >
              <div className="flex items-center gap-3 text-primary">
                {item.icon}
                <p className="text-xs font-code uppercase tracking-[0.18em]">{item.label}</p>
              </div>
              <p className="mt-3 text-sm leading-7 text-zinc-300">{item.detail}</p>
              <p className="mt-4 inline-flex items-center gap-2 text-xs font-code uppercase tracking-[0.16em] text-zinc-400">
                {item.cta}
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </p>
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Card variant="glass" className="p-8 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border-primary/20">
            <h3 className="text-2xl font-display font-bold mb-4 gradient-text-cyber">
              Looking for a serious builder?
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
              If you run a program around AI builders, developer ecosystem initiatives, or
              applied research collaborations, this portfolio is designed to make technical review faster.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href={withBase('/#contact')}
                className="inline-flex items-center rounded-full border border-primary/25 bg-primary/[0.08] px-5 py-3 text-[11px] font-code uppercase tracking-[0.18em] text-primary transition-colors hover:border-primary/35 hover:bg-primary/[0.14] hover:text-white"
              >
                <Mail className="w-4 h-4 mr-2" aria-hidden="true" />
                Reach out
              </a>
              <a
                href="https://github.com/Albert-fer02"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full border border-white/15 bg-white/[0.03] px-5 py-3 text-[11px] font-code uppercase tracking-[0.18em] text-zinc-200 transition-colors hover:border-white/30 hover:bg-white/[0.08] hover:text-white"
              >
                <Github className="w-4 h-4 mr-2" aria-hidden="true" />
                Technical evidence
              </a>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default CollaborationSection;
