"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Shield, BrainCircuit, Palette, Zap, Code, Lock, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import TypingAnimation from "@/components/typing-animation";
import { Icons } from "@/lib/icons";

const floatingIcons = [
  { icon: Shield, color: "text-primary", delay: 0, label: "Security" },
  { icon: BrainCircuit, color: "text-secondary", delay: 0.5, label: "AI & ML" },
  { icon: Palette, color: "text-accent", delay: 1, label: "Design" },
  { icon: Code, color: "text-primary", delay: 1.5, label: "Development" },
  { icon: Lock, color: "text-secondary", delay: 2, label: "Cybersecurity" },
  { icon: TrendingUp, color: "text-accent", delay: 2.5, label: "Growth" },
];

const stats = [
  { label: "Security Audits", value: "50+", color: "text-primary" },
  { label: "FinTech Projects", value: "25+", color: "text-secondary" },
  { label: "Creative Works", value: "100+", color: "text-accent" },
];

// Custom hook for performance optimization
const usePerformanceOptimization = () => {
  const [isVisible, setIsVisible] = React.useState(false);
  
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    const element = document.querySelector('#hero-section');
    if (element) {
      observer.observe(element);
    }
    
    return () => observer.disconnect();
  }, []);
  
  return isVisible;
};

export function EnhancedHeroSection() {
  const [currentStat, setCurrentStat] = React.useState(0);
  const [hoveredButton, setHoveredButton] = React.useState<string | null>(null);
  const isVisible = usePerformanceOptimization();

  // Memoize stats to prevent unnecessary re-renders
  const memoizedStats = React.useMemo(() => stats, []);

  React.useEffect(() => {
    if (!isVisible) return;
    
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % memoizedStats.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [memoizedStats.length, isVisible]);

  return (
    <section id="hero-section" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 md:opacity-10 sm:opacity-5" />
      <div className="absolute inset-0 bg-circuit-pattern opacity-5 md:opacity-5 sm:opacity-3" />
      
      {/* Floating Icons */}
      {floatingIcons.map((item, index) => (
        <motion.div
          key={index}
          className={`absolute ${item.color} opacity-20 hover:opacity-40 transition-opacity duration-300 cursor-pointer`}
          style={{
            left: `${20 + (index * 15)}%`,
            top: `${10 + (index * 10)}%`,
            willChange: 'transform, opacity',
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
          whileHover={{
            scale: 1.2,
            rotate: 0,
          }}
          aria-label={item.label}
          role="img"
          tabIndex={0}
        >
          <item.icon className="w-8 h-8" />
        </motion.div>
      ))}

      {/* Cyber Scan Line */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: [
            "linear-gradient(to bottom, transparent 0%, rgba(74, 158, 255, 0.15) 50%, transparent 100%)",
            "linear-gradient(to bottom, transparent 0%, rgba(147, 51, 234, 0.15) 50%, transparent 100%)",
            "linear-gradient(to bottom, transparent 0%, rgba(245, 158, 11, 0.15) 50%, transparent 100%)",
          ],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-6xl">
        <div className="text-center space-y-8 md:space-y-12">
          {/* Main Headline */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            {/* Elegant Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
              className="flex justify-center mb-8"
            >
              <Badge className="glass-primary glow-azure text-azure-solid border-primary/30 px-8 py-4 text-sm font-code font-semibold tracking-wider shadow-xl backdrop-blur-xl">
                <Zap className="w-4 h-4 mr-3 animate-pulse" />
                DREAMFOLIO 2025
              </Badge>
            </motion.div>

            {/* Ultra Elegant Main Title */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 1.2, ease: "easeOut" }}
              className="relative text-center"
            >
              {/* Main Title with Enhanced Effects - Single Line */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
                className="relative"
              >
                <motion.h1
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-black leading-[0.9] tracking-[-0.02em] relative z-10"
                  style={{
                    background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 25%, #e2e8f0 50%, #cbd5e1 75%, #94a3b8 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    filter: 'drop-shadow(0 0 30px rgba(74, 158, 255, 0.6)) drop-shadow(0 0 60px rgba(74, 158, 255, 0.3))',
                  }}
                  aria-label="Portfolio title DREAMCODER 08"
                >
                  DREAMCODER 08
                </motion.h1>
                
                {/* Subtle glow behind the text */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.3 }}
                  transition={{ delay: 1, duration: 1 }}
                  className="absolute inset-0 blur-3xl bg-gradient-to-r from-azure-solid via-amethyst-solid to-champagne-solid rounded-full"
                  style={{ zIndex: -1 }}
                />
                
                {/* Decorative elements around the title */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 1.3, duration: 0.6 }}
                  className="absolute -left-6 top-1/2 w-2 h-2 bg-azure-solid rounded-full transform -translate-y-1/2"
                />
                <motion.div
                  initial={{ scale: 0, rotate: 180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 1.4, duration: 0.6 }}
                  className="absolute -right-6 top-1/2 w-2 h-2 bg-azure-solid rounded-full transform -translate-y-1/2"
                />
              </motion.div>
            </motion.div>

            {/* Optimized Elegant Subtitle Container */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8, ease: "easeOut" }}
              className="relative mt-6 mb-8"
            >
              {/* Simplified Decorative Elements */}
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ delay: 1.0, duration: 0.8 }}
                className="absolute top-1/2 left-0 w-12 h-px bg-gradient-to-r from-transparent via-azure-solid to-transparent transform -translate-y-1/2"
              />
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ delay: 1.0, duration: 0.8 }}
                className="absolute top-1/2 right-0 w-12 h-px bg-gradient-to-l from-transparent via-azure-solid to-transparent transform -translate-y-1/2"
              />
              
              {/* Optimized Subtitle Content */}
              <div className="relative z-10 px-4 py-3 bg-gradient-to-r from-white/3 via-white/8 to-white/3 backdrop-blur-lg rounded-lg border border-white/10 shadow-md">
                <div className="relative">
                  {/* Subtle background glow */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.2 }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                    className="absolute inset-0 bg-gradient-to-r from-azure-solid/5 to-white/5 rounded-lg blur-sm"
                  />
                  
                  {/* Main subtitle text */}
                  <div className="relative z-10 text-lg md:text-xl lg:text-2xl font-code font-medium tracking-wide text-white" 
                       style={{ 
                         textShadow: '0 0 15px rgba(74, 158, 255, 0.4), 0 0 30px rgba(74, 158, 255, 0.15)',
                       }}>
                    <TypingAnimation
                      texts={[
                        "Cybersecurity Engineer",
                        "Creative Technologist", 
                        "Financial Innovator",
                        "Digital Artist",
                      ]}
                      className=""
                    />
                  </div>
                  
                  {/* Subtle underline effect */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 1.4, duration: 0.6 }}
                    className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-azure-solid to-transparent mt-1"
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>

                      {/* Mission Statement */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="max-w-4xl mx-auto"
            role="region"
            aria-label="Portfolio mission statement"
          >
            <p className="text-lg md:text-xl text-sterling leading-relaxed">
              Bridging the digital divide between{" "}
              <span className="text-azure-solid font-semibold" style={{ filter: 'contrast(1.1)' }}>security</span>,{" "}
              <span className="text-amethyst-solid font-semibold" style={{ filter: 'contrast(1.1)' }}>finance</span>, and{" "}
              <span className="text-champagne-solid font-semibold" style={{ filter: 'contrast(1.1)' }}>creativity</span>.
              <br />
              <span className="text-sm font-code text-azure-solid/80 block mt-2">
                // Where code meets canvas, security meets innovation
              </span>
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="flex flex-wrap justify-center gap-6 md:gap-12"
            role="region"
            aria-label="Portfolio statistics"
          >
            {memoizedStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className={`text-center ${stat.color} cursor-pointer transition-all duration-300`}
                animate={{
                  scale: currentStat === index ? 1.1 : 1,
                  opacity: currentStat === index ? 1 : 0.7,
                }}
                transition={{ duration: 0.3 }}
                whileHover={{
                  scale: 1.05,
                  opacity: 1,
                }}
                onClick={() => setCurrentStat(index)}
                onKeyDown={(e) => e.key === 'Enter' && setCurrentStat(index)}
                tabIndex={0}
                role="button"
                aria-label={`${stat.label}: ${stat.value}`}
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
            className="flex flex-col sm:flex-row gap-6 justify-center items-center max-w-lg mx-auto"
          >
            <Button 
              size="lg" 
              className="elegant-button glow-azure font-tech px-8 py-4 text-lg w-full sm:w-auto hover:scale-105 transition-all duration-200"
              aria-label="Explore portfolio work and projects"
              onMouseEnter={() => setHoveredButton('explore')}
              onMouseLeave={() => setHoveredButton(null)}
            >
              Explore My Work
              <motion.div
                animate={{ x: hoveredButton === 'explore' ? 5 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ArrowRight className="ml-2 w-5 h-5" />
              </motion.div>
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="glass-button glow-amethyst border-secondary/30 text-amethyst-solid font-tech px-8 py-4 text-lg w-full sm:w-auto hover:scale-105 transition-all duration-200"
              aria-label="View source code on GitHub"
              onMouseEnter={() => setHoveredButton('github')}
              onMouseLeave={() => setHoveredButton(null)}
            >
              <motion.div
                animate={{ rotate: hoveredButton === 'github' ? 360 : 0 }}
                transition={{ duration: 0.5 }}
              >
                <Icons.Github className="mr-2 w-5 h-5" />
              </motion.div>
              View Code
            </Button>
          </motion.div>

                      {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 0.8 }}
            className="pt-8"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-6 h-10 border-2 border-azure-solid/50 rounded-full flex justify-center mx-auto glow-azure"
            >
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1 h-3 bg-azure-solid rounded-full mt-2"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>


    </section>
  );
} 