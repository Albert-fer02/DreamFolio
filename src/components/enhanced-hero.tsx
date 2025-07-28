"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Shield, BrainCircuit, Palette, Zap, Code, Lock, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import TypingAnimation from "@/components/typing-animation";
import { Icons } from "@/lib/icons";

const floatingIcons = [
  { icon: Shield, color: "text-primary", delay: 0 },
  { icon: BrainCircuit, color: "text-secondary", delay: 0.5 },
  { icon: Palette, color: "text-accent", delay: 1 },
  { icon: Code, color: "text-primary", delay: 1.5 },
  { icon: Lock, color: "text-secondary", delay: 2 },
  { icon: TrendingUp, color: "text-accent", delay: 2.5 },
];

const stats = [
  { label: "Security Audits", value: "50+", color: "text-primary" },
  { label: "FinTech Projects", value: "25+", color: "text-secondary" },
  { label: "Creative Works", value: "100+", color: "text-accent" },
];

export function EnhancedHeroSection() {
  const [currentStat, setCurrentStat] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-muted/20">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />
      <div className="absolute inset-0 bg-circuit-pattern opacity-10" />
      
      {/* Floating Icons */}
      {floatingIcons.map((item, index) => (
        <motion.div
          key={index}
          className={`absolute ${item.color} opacity-20`}
          style={{
            left: `${20 + (index * 15)}%`,
            top: `${10 + (index * 10)}%`,
          }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 4,
            delay: item.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <item.icon className="w-8 h-8" />
        </motion.div>
      ))}

      {/* Cyber Scan Line */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: [
            "linear-gradient(to bottom, transparent 0%, rgba(0, 255, 255, 0.1) 50%, transparent 100%)",
            "linear-gradient(to bottom, transparent 0%, rgba(147, 51, 234, 0.1) 50%, transparent 100%)",
            "linear-gradient(to bottom, transparent 0%, rgba(0, 255, 0, 0.1) 50%, transparent 100%)",
          ],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center space-y-8">
          {/* Main Headline */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <Badge className="glass-primary text-primary border-primary/50 px-4 py-2 text-sm font-code">
                <Zap className="w-4 h-4 mr-2" />
                CYBERPUNK FINANCIAL
              </Badge>
            </motion.div>

            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-6xl md:text-8xl lg:text-9xl font-display font-bold leading-none"
            >
              <span className="gradient-text-cyber text-shadow-cyber">DREAM</span>
              <br />
              <span className="gradient-text-financial text-shadow-glow">CODER</span>
              <br />
              <span className="gradient-text-creative text-shadow-glow">08</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-xl md:text-2xl text-muted-foreground font-tech"
            >
              <TypingAnimation
                texts={[
                  "Cybersecurity Engineer",
                  "Creative Technologist", 
                  "Financial Innovator",
                  "Digital Artist",
                ]}
                className="text-primary font-code"
              />
            </motion.div>
          </motion.div>

          {/* Mission Statement */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Bridging the digital divide between{" "}
              <span className="text-primary font-semibold">security</span>,{" "}
              <span className="text-secondary font-semibold">finance</span>, and{" "}
              <span className="text-accent font-semibold">creativity</span>.
              <br />
              <span className="text-sm font-code text-primary/80">
                // Where code meets canvas, security meets innovation
              </span>
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="flex justify-center gap-8 md:gap-12"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className={`text-center ${stat.color}`}
                animate={{
                  scale: currentStat === index ? 1.1 : 1,
                  opacity: currentStat === index ? 1 : 0.7,
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-2xl md:text-3xl font-bold font-tech">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground font-code">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button 
              size="lg" 
              className="glass-primary hover-glow text-primary-foreground font-tech px-8 py-4 text-lg"
            >
              Explore My Work
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="glass hover-glow border-primary/30 text-primary font-tech px-8 py-4 text-lg"
            >
              <Icons.Github className="mr-2 w-5 h-5" />
              View Code
            </Button>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 0.8 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center"
            >
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1 h-3 bg-primary rounded-full mt-2"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Corner Decorations */}
      <div className="absolute top-8 left-8 w-32 h-32 border-l-2 border-t-2 border-primary/30" />
      <div className="absolute top-8 right-8 w-32 h-32 border-r-2 border-t-2 border-secondary/30" />
      <div className="absolute bottom-8 left-8 w-32 h-32 border-l-2 border-b-2 border-accent/30" />
      <div className="absolute bottom-8 right-8 w-32 h-32 border-r-2 border-b-2 border-primary/30" />
    </section>
  );
} 