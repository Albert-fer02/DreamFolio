import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Code2, Database, Globe, Layers3, Shield, Sparkles } from 'lucide-react';
import { Badge, Card, LinkButton, StatusIndicator } from '../ui';
import { withBase } from '../../lib/site';

const signalItems = [
  { label: 'Public repos', value: '11', note: 'visible proof on GitHub' },
  { label: 'Role', value: 'Systems Architect', note: 'software + infrastructure' },
  { label: 'Trajectory', value: 'Agent-Based AI', note: 'long-horizon systems' },
];

const stackItems = ['Astro', 'React 19', 'TypeScript', 'Tailwind v4', 'Schema.org', 'Content Collections'];

const iconMap = [Shield, Globe, Code2, Database, Layers3, Sparkles];

const TechTicker: React.FC = () => (
  <div
    className="w-full overflow-hidden py-8 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
    aria-label="Core stack"
  >
    <div className="relative flex max-w-[100vw]">
      <motion.div
        className="flex gap-12 sm:gap-20 whitespace-nowrap"
        animate={{ x: [0, -900] }}
        transition={{
          repeat: Infinity,
          duration: 28,
          ease: 'linear',
        }}
      >
        {[...stackItems, ...stackItems, ...stackItems].map((item, index) => {
          const Icon = iconMap[index % iconMap.length];

          return (
            <div
              key={`${item}-${index}`}
              className="group flex items-center gap-3 text-zinc-500 transition-colors duration-300 hover:text-zinc-200"
            >
              <Icon className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
              <span className="font-code text-[11px] uppercase tracking-[0.22em] sm:text-xs">
                {item}
              </span>
            </div>
          );
        })}
      </motion.div>
      <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background to-transparent" aria-hidden="true" />
      <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background to-transparent" aria-hidden="true" />
    </div>
  </div>
);

const EnhancedHeroSection: React.FC = () => {
  return (
    <section
      className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-background pt-20 lg:pt-0"
      aria-labelledby="hero-heading"
    >
      <div
        className="absolute inset-0 opacity-70"
        style={{
          background:
            'radial-gradient(circle at 82% 16%, rgba(143,175,209,0.14), transparent 24%), radial-gradient(circle at 14% 24%, rgba(184,169,138,0.08), transparent 20%), radial-gradient(circle at 62% 62%, rgba(255,255,255,0.04), transparent 26%)',
        }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.22]" aria-hidden="true" />

      <div className="container relative z-10 mx-auto flex h-full flex-col justify-center px-4 sm:px-6 lg:px-8">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="flex flex-col justify-center lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <Badge variant="primary" className="mb-6 w-fit">
                <StatusIndicator status="online" size="sm" />
                portfolio system live
              </Badge>

              <p className="mb-5 font-code text-[11px] uppercase tracking-[0.22em] text-zinc-500">
                Dreamcoder08 • founder of arkonyx • high-integrity infrastructure
              </p>

              <h1
                id="hero-heading"
                className="max-w-4xl text-5xl font-display font-extrabold leading-[0.94] tracking-[-0.04em] text-white sm:text-6xl md:text-7xl"
              >
                A portfolio built like an
                <span className="gradient-text-primary text-shadow-glow"> operating surface</span>,
                not a brochure.
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-8 text-zinc-300 sm:text-lg">
                Designing systems that compound over time. Focused on autonomous execution,
                resilient infrastructure, and product architectures that stay operable under pressure.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {signalItems.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-white/8 bg-white/[0.02] px-4 py-4 backdrop-blur-sm transition-colors duration-300 hover:border-primary/[0.18] hover:bg-primary/[0.04]"
                  >
                    <p className="font-code text-[10px] uppercase tracking-[0.18em] text-zinc-500">
                      {item.label}
                    </p>
                    <p className="mt-2 text-lg font-display font-bold text-white">{item.value}</p>
                    <p className="mt-1 text-sm text-zinc-400">{item.note}</p>
                  </div>
                ))}
              </div>

              <nav className="mt-8 flex flex-wrap gap-4" aria-label="Primary actions">
                <LinkButton href={withBase('/projects/')} variant="primary" size="lg" showArrow>
                  Open project catalog
                </LinkButton>
                <LinkButton
                  href="https://github.com/Albert-fer02"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="secondary"
                  size="lg"
                >
                  View GitHub profile
                </LinkButton>
              </nav>
            </motion.div>
          </div>

          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            >
              <Card variant="glass" className="p-7 sm:p-8">
                <div className="flex items-center justify-between border-b border-white/8 pb-5">
                  <div>
                    <p className="font-code text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                      Current positioning
                    </p>
                    <h2 className="mt-2 text-2xl font-display font-bold text-white">
                      Building systems that compound over time
                    </h2>
                  </div>
                  <div className="rounded-2xl border border-accent/[0.18] bg-accent/[0.05] p-3 text-accent">
                    <Sparkles className="h-5 w-5" aria-hidden="true" />
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  {[
                    'Founder of Arkonyx with a systems-first positioning',
                    'High-integrity infrastructure and autonomous execution as core signal',
                    'Public GitHub footprint now reflected directly inside the portfolio',
                    'Designed to convert from aesthetic interest into recruiter confidence',
                  ].map((point) => (
                    <div
                      key={point}
                      className="flex items-start gap-3 rounded-2xl border border-white/6 bg-white/[0.02] px-4 py-4 transition-colors duration-300 hover:border-primary/14 hover:bg-primary/[0.03]"
                    >
                      <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                      <p className="text-sm leading-7 text-zinc-300">{point}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-[1.5rem] border border-accent/[0.16] bg-gradient-to-br from-accent/[0.08] to-white/[0.015] p-5">
                  <p className="font-code text-[10px] uppercase tracking-[0.18em] text-zinc-500">
                    Active systems
                  </p>
                  <div className="mt-3 space-y-2 text-sm text-zinc-200">
                    <p><span className="text-accent">ARKONYX</span> — autonomous fiscal infrastructure</p>
                    <p><span className="text-primary">Electo Suite</span> — high-concurrency validation</p>
                    <p>EdgeTraz Agro — edge and IoT resilience</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-14 lg:mt-20"
        >
          <TechTicker />
        </motion.div>
      </div>
    </section>
  );
};

export default EnhancedHeroSection;
