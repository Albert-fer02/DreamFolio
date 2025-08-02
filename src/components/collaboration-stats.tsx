"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Clock, Star, TrendingUp, Code, Shield, Palette, Music } from 'lucide-react';

interface StatItem {
  icon: React.ReactNode;
  label: string;
  value: string;
  description: string;
  color: string;
}

const statsData: StatItem[] = [
  {
    icon: <Users className="w-6 h-6" />,
    label: "Active Collaborations",
    value: "12",
    description: "Current projects",
    color: "text-blue-500"
  },
  {
    icon: <Clock className="w-6 h-6" />,
    label: "Response Time",
    value: "< 4h",
    description: "Average reply",
    color: "text-green-500"
  },
  {
    icon: <Star className="w-6 h-6" />,
    label: "Success Rate",
    value: "98%",
    description: "Project completion",
    color: "text-yellow-300"
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    label: "Growth",
    value: "+47%",
    description: "This year",
    color: "text-gray-300"
  }
];

const domainStats = [
  {
    icon: <Shield className="w-5 h-5" />,
    name: "Security",
    projects: 8,
    color: "text-red-500"
  },
  {
    icon: <Code className="w-5 h-5" />,
    name: "FinTech",
    projects: 6,
    color: "text-blue-500"
  },
  {
    icon: <Palette className="w-5 h-5" />,
    name: "Creative",
    projects: 4,
    color: "text-gray-300"
  },
  {
    icon: <Music className="w-5 h-5" />,
    name: "Audio",
    projects: 3,
    color: "text-green-500"
  }
];

export const CollaborationStats = () => {
  return (
    <div className="grid md:grid-cols-2 gap-8 mt-16">
      {/* Main Stats */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/30">
        <CardContent className="p-6">
          <h3 className="text-xl font-headline font-bold mb-6 text-center">
            Collaboration Metrics
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {statsData.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
              >
                <div className={`${stat.color} mb-2 flex justify-center`}>
                  {stat.icon}
                </div>
                <div className="text-2xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm font-medium mb-1">{stat.label}</div>
                <div className="text-xs text-muted-foreground">{stat.description}</div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Domain Distribution */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/30">
        <CardContent className="p-6">
          <h3 className="text-xl font-headline font-bold mb-6 text-center">
            Project Distribution
          </h3>
          <div className="space-y-4">
            {domainStats.map((domain, index) => (
              <motion.div
                key={domain.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className={domain.color}>
                    {domain.icon}
                  </div>
                  <span className="font-medium">{domain.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-sm">
                    {domain.projects} projects
                  </Badge>
                  <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${domain.color.replace('text-', 'bg-')} rounded-full transition-all duration-1000`}
                      style={{ width: `${(domain.projects / 8) * 100}%` }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Total Projects */}
          <div className="mt-6 p-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg text-center">
            <div className="text-2xl font-bold text-primary mb-1">21</div>
            <div className="text-sm text-muted-foreground">Total Projects Completed</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}; 