import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Code, Mail, Github, Users, Clock, Star, TrendingUp, Shield, Palette, Music } from 'lucide-react';
import { Card, Button, Badge, StatusIndicator } from '../ui';
import { cn } from '../../lib/utils';

interface CollaborationItem {
  title: string;
  description: string;
  image: string;
  hint: string;
}

interface StatItem {
  icon: React.ReactNode;
  label: string;
  value: string;
  description: string;
  color: string;
}

const collaborationData: CollaborationItem[] = [
  {
    title: "Open Source Security",
    description: "Contribute to hardening the security of popular open-source projects.",
    image: "/images/collaboration/security.jpg",
    hint: "open source"
  },
  {
    title: "AI-Powered Art Installations",
    description: "Collaborate on interactive art pieces that respond to human emotion.",
    image: "/images/collaboration/ai-art.jpg",
    hint: "ai art"
  },
  {
    title: "DeFi Platform Development",
    description: "Join forces to build the next generation of decentralized finance applications.",
    image: "/images/collaboration/defi.jpg",
    hint: "finance"
  },
  {
    title: "Platform Modern Recurse",
    description: "Produce dynamic and adaptive soundtracks for independent video games.",
    image: "/images/collaboration/plataform-modern-recurse.jpg",
    hint: "modern"
  },
];

const statsData: StatItem[] = [
  {
    icon: <Users className="w-6 h-6" aria-hidden="true" />,
    label: "Active Collaborations",
    value: "12",
    description: "Current projects",
    color: "text-primary"
  },
  {
    icon: <Clock className="w-6 h-6" aria-hidden="true" />,
    label: "Response Time",
    value: "< 4h",
    description: "Average reply",
    color: "text-green-500"
  },
  {
    icon: <Star className="w-6 h-6" aria-hidden="true" />,
    label: "Success Rate",
    value: "98%",
    description: "Project completion",
    color: "text-accent"
  },
  {
    icon: <TrendingUp className="w-6 h-6" aria-hidden="true" />,
    label: "Growth",
    value: "+47%",
    description: "This year",
    color: "text-secondary"
  }
];

const domainStats = [
  { icon: <Shield className="w-5 h-5" aria-hidden="true" />, name: "Security", projects: 8, color: "text-red-500" },
  { icon: <Code className="w-5 h-5" aria-hidden="true" />, name: "FinTech", projects: 6, color: "text-primary" },
  { icon: <Palette className="w-5 h-5" aria-hidden="true" />, name: "Creative", projects: 4, color: "text-secondary" },
  { icon: <Music className="w-5 h-5" aria-hidden="true" />, name: "Audio", projects: 3, color: "text-green-500" }
];

/* --- Sub-Components --- */

interface StatCardProps {
  stat: StatItem;
  index: number;
}

const StatCard: React.FC<StatCardProps> = ({ stat, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    viewport={{ once: true }}
    className="text-center p-4 rounded-lg bg-background/20 hover:bg-background/30 transition-colors"
  >
    <div className={cn(stat.color, "mb-2 flex justify-center")}>
      {stat.icon}
    </div>
    <div className="text-2xl font-bold mb-1">{stat.value}</div>
    <div className="text-sm font-medium mb-1">{stat.label}</div>
    <div className="text-xs text-muted-foreground">{stat.description}</div>
  </motion.div>
);

interface DomainBarProps {
  domain: typeof domainStats[0];
  index: number;
  maxProjects: number;
}

const DomainBar: React.FC<DomainBarProps> = ({ domain, index, maxProjects }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    viewport={{ once: true }}
    className="flex items-center justify-between p-3 rounded-lg bg-background/20 hover:bg-background/30 transition-colors"
  >
    <div className="flex items-center gap-3">
      <div className={domain.color}>{domain.icon}</div>
      <span className="font-medium">{domain.name}</span>
    </div>
    <div className="flex items-center gap-2">
      <div className="text-sm font-code text-muted-foreground">
        {domain.projects} projects
      </div>
      <div
        className="w-16 h-2 bg-muted rounded-full overflow-hidden"
        role="progressbar"
        aria-valuenow={domain.projects}
        aria-valuemin={0}
        aria-valuemax={maxProjects}
      >
        <div
          className={cn("h-full rounded-full transition-all duration-1000", domain.color.replace('text-', 'bg-'))}
          style={{ width: `${(domain.projects / maxProjects) * 100}%` }}
        />
      </div>
    </div>
  </motion.div>
);

const CollaborationStats: React.FC = () => (
  <div className="grid md:grid-cols-2 gap-8 mt-16">
    {/* Main Stats */}
    <Card variant="glass" className="p-6">
      <h3 className="text-xl font-display font-bold mb-6 text-center gradient-text-cyber">
        Collaboration Metrics
      </h3>
      <div className="grid grid-cols-2 gap-4">
        {statsData.map((stat, index) => (
          <StatCard key={stat.label} stat={stat} index={index} />
        ))}
      </div>
    </Card>

    {/* Domain Distribution */}
    <Card variant="glass" className="p-6">
      <h3 className="text-xl font-display font-bold mb-6 text-center gradient-text-financial">
        Project Distribution
      </h3>
      <div className="space-y-4">
        {domainStats.map((domain, index) => (
          <DomainBar key={domain.name} domain={domain} index={index} maxProjects={8} />
        ))}

        {/* Total Projects */}
        <div className="mt-6 p-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg text-center">
          <div className="text-2xl font-bold text-primary mb-1">21</div>
          <div className="text-sm text-muted-foreground">Total Projects Completed</div>
        </div>
      </div>
    </Card>
  </div>
);

interface CollaborationCardProps {
  item: CollaborationItem;
  index: number;
}

const CollaborationCard: React.FC<CollaborationCardProps> = ({ item, index }) => (
  <motion.article
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: index * 0.2 }}
    viewport={{ once: true }}
    className="group"
  >
    <Card variant="glass" className="transition-all duration-500 hover:border-primary hover:shadow-2xl hover:shadow-primary/20 hover:scale-[1.02]">
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <img
          src={item.image}
          alt={`${item.title} project preview`}
          className="object-cover w-full h-56 transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" aria-hidden="true" />

        {/* Floating Badge */}
        <div className="absolute top-4 right-4">
          <Badge variant="primary">{item.hint}</Badge>
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Button variant="default" className="px-6 py-3">
            Explore Project
            <ArrowRight className="ml-2 w-5 h-5" aria-hidden="true" />
          </Button>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-display text-xl group-hover:text-primary transition-colors">
            {item.title}
          </h3>
          <StatusIndicator status="online" size="md" pulse={false} />
        </div>

        <p className="text-muted-foreground text-base leading-relaxed mb-4">
          {item.description}
        </p>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button variant="outline" size="sm" className="flex-1">
            <Mail className="w-4 h-4 mr-2" aria-hidden="true" />
            Contact
          </Button>
          <Button variant="ghost" size="sm" aria-label={`View ${item.title} details`}>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Button>
        </div>
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
        {/* Enhanced Header */}
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
            <span className="gradient-text-cyber">Collaboration</span>{" "}
            <span className="gradient-text-financial">Opportunities</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto font-tech">
            Join forces to build the future. From security research to creative tech, let's create something extraordinary together.
          </p>
        </motion.header>

        {/* Enhanced Cards Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {collaborationData.map((item, index) => (
            <CollaborationCard key={item.title} item={item} index={index} />
          ))}
        </div>

        {/* Collaboration Stats */}
        <CollaborationStats />

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Card variant="glass" className="p-8 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border-primary/20">
            <h3 className="text-2xl font-display font-bold mb-4 gradient-text-cyber">
              Ready to Collaborate?
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
              Whether you have a specific project in mind or just want to explore possibilities,
              let's start a conversation about how we can work together.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg">
                <Mail className="w-5 h-5 mr-2" aria-hidden="true" />
                Start a Project
              </Button>
              <Button variant="outline" size="lg">
                <Github className="w-5 h-5 mr-2" aria-hidden="true" />
                View Portfolio
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default CollaborationSection;