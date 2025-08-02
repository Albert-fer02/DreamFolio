"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Code, Shield, TrendingUp, Palette } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Icons } from "@/lib/icons";

const techData = [
  { icon: <Icons.ReactIcon className="size-8" />, name: "React", category: "frontend" },
  { icon: <Icons.NextjsIcon className="size-8" />, name: "Next.js", category: "frontend" },
  { icon: <Icons.NodejsIcon className="size-8" />, name: "Node.js", category: "backend" },
  { icon: <Icons.TailwindIcon className="size-8" />, name: "Tailwind CSS", category: "frontend" },
  { icon: <Icons.Code className="size-8" />, name: "Python", category: "backend" },
  { icon: <Icons.Server className="size-8" />, name: "Docker", category: "devops" },
  { icon: <Icons.Cloud className="size-8" />, name: "AWS", category: "cloud" },
  { icon: <Icons.Shield className="size-8" />, name: "Solidity", category: "blockchain" },
];

export function TechSection() {
  return (
    <section id="tech" className="py-20 sm:py-24 bg-gradient-to-br from-background via-muted/5 to-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge className="glass-primary text-primary border-primary/50 px-4 py-2 text-sm font-code mb-4">
            <Code className="w-4 h-4 mr-2" />
            TECH STACK
          </Badge>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            <span className="gradient-text-cyber">Technologies</span> &{" "}
            <span className="gradient-text-financial">Tools</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-tech">
            Building the future with cutting-edge technologies across security, finance, and creativity.
          </p>
        </motion.div>

        {/* Tech Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
          {techData.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="glass hover-lift hover-glow p-6 rounded-xl text-center transition-all duration-300 cursor-pointer">
                <div className="mb-3 group-hover:scale-110 transition-transform duration-300">
                  {tech.icon}
                </div>
                <span className="text-sm font-code text-muted-foreground group-hover:text-primary transition-colors">
                  {tech.name}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tech Categories */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8 mt-16"
        >
          {/* Security Tech */}
          <div className="glass-primary p-6 rounded-xl">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-6 h-6 text-primary" />
              <h3 className="font-tech font-semibold text-primary">Security Stack</h3>
            </div>
            <p className="text-sm text-muted-foreground font-code">
              Penetration testing, forensics, threat modeling, and secure development practices.
            </p>
          </div>

          {/* FinTech Tech */}
          <div className="glass-secondary p-6 rounded-xl">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-6 h-6 text-secondary" />
              <h3 className="font-tech font-semibold text-secondary">FinTech Stack</h3>
            </div>
            <p className="text-sm text-muted-foreground font-code">
              Blockchain, AI/ML, real-time analytics, and scalable financial systems.
            </p>
          </div>

          {/* Creative Tech */}
          <div className="glass-accent p-6 rounded-xl">
            <div className="flex items-center gap-3 mb-4">
              <Palette className="w-6 h-6 text-accent" />
              <h3 className="font-tech font-semibold text-accent">Creative Stack</h3>
            </div>
            <p className="text-sm text-muted-foreground font-code">
              Generative AI, audio processing, visual effects, and interactive experiences.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 