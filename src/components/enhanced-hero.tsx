"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Shield, BrainCircuit, Palette, Code, Lock, TrendingUp, Sparkles, Crown, Diamond, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
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

const premiumIcons = [
  { icon: Crown, color: "text-accent", delay: 0.2, label: "Premium" },
  { icon: Diamond, color: "text-primary", delay: 0.7, label: "Excellence" },
  { icon: Star, color: "text-secondary", delay: 1.2, label: "Quality" },
  { icon: Sparkles, color: "text-accent", delay: 1.7, label: "Innovation" },
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
    <section id="hero-section" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-card to-muted">
      {/* Premium Animated Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-4 sm:opacity-6 md:opacity-8" />
      <div className="absolute inset-0 bg-circuit-pattern opacity-2 sm:opacity-3 md:opacity-4" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-transparent to-background/90" />
      
      {/* Premium Floating Particles - Hidden on mobile for performance */}
      <div className="absolute inset-0 overflow-hidden hidden md:block">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              delay: Math.random() * 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
      
      {/* Enhanced Floating Icons with Premium Effects - Responsive positioning */}
      {floatingIcons.map((item, index) => (
        <motion.div
          key={index}
          className={`absolute ${item.color} opacity-20 sm:opacity-25 hover:opacity-60 sm:hover:opacity-80 transition-all duration-700 cursor-pointer hidden sm:block`}
          style={{
            left: `${10 + (index * 12)}%`,
            top: `${8 + (index * 8)}%`,
            willChange: 'transform, opacity',
          }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 8, -8, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 6,
            delay: item.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          whileHover={{
            scale: 1.3,
            rotate: 0,
            filter: 'drop-shadow(0 0 25px currentColor) brightness(1.4)',
          }}
          aria-label={item.label}
          role="img"
          tabIndex={0}
        >
          <item.icon className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10" />
        </motion.div>
      ))}

      {/* Premium Floating Icons - Responsive positioning */}
      {premiumIcons.map((item, index) => (
        <motion.div
          key={`premium-${index}`}
          className={`absolute ${item.color} opacity-15 sm:opacity-20 hover:opacity-50 sm:hover:opacity-60 transition-all duration-700 cursor-pointer hidden md:block`}
          style={{
            right: `${8 + (index * 10)}%`,
            top: `${15 + (index * 6)}%`,
            willChange: 'transform, opacity',
          }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, -12, 12, 0],
            scale: [1, 1.03, 1],
          }}
          transition={{
            duration: 8,
            delay: item.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          whileHover={{
            scale: 1.2,
            rotate: 0,
            filter: 'drop-shadow(0 0 20px currentColor) brightness(1.3)',
          }}
          aria-label={item.label}
          role="img"
          tabIndex={0}
        >
          <item.icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
        </motion.div>
      ))}

      {/* Premium Cyber Scan Line with Enhanced Elegance */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: [
            "linear-gradient(to bottom, transparent 0%, rgba(74, 158, 255, 0.15) 50%, transparent 100%)",
            "linear-gradient(to bottom, transparent 0%, rgba(229, 231, 235, 0.12) 50%, transparent 100%)",
            "linear-gradient(to bottom, transparent 0%, rgba(255, 215, 0, 0.1) 50%, transparent 100%)",
          ],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Premium Radial Gradient Overlay */}
      <div className="absolute inset-0 bg-radial-gradient opacity-20 sm:opacity-25 md:opacity-30" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-5xl lg:max-w-6xl">
        <div className="text-center space-y-6 sm:space-y-8 md:space-y-12">
          {/* Premium Main Headline */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="space-y-6 sm:space-y-8"
          >
            {/* Ultra Premium Main Title with Enhanced Effects */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1.5, ease: "easeOut" }}
              className="relative text-center"
            >
              {/* Premium Title Container */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 1.2, ease: "easeOut" }}
                className="relative"
              >
                <motion.h1
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-black leading-[0.9] tracking-[-0.02em] relative z-10 whitespace-nowrap px-2"
                  style={{
                    background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 20%, #e2e8f0 40%, #cbd5e1 60%, #94a3b8 80%, #64748b 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    filter: 'drop-shadow(0 0 20px rgba(74, 158, 255, 0.4)) drop-shadow(0 0 40px rgba(74, 158, 255, 0.2)) drop-shadow(0 0 60px rgba(74, 158, 255, 0.1))',
                  }}
                  aria-label="Portfolio title DREAMCODER 08"
                >
                  DREAMCODER 08
                </motion.h1>
                
                {/* Premium Multi-Layer Glow behind the text */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.2 }}
                  transition={{ delay: 1.2, duration: 1.5 }}
                  className="absolute inset-0 blur-2xl sm:blur-3xl md:blur-4xl bg-gradient-to-r from-primary/20 via-secondary/15 to-accent/10 rounded-full"
                  style={{ zIndex: -1 }}
                />
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.15 }}
                  transition={{ delay: 1.4, duration: 1.5 }}
                  className="absolute inset-0 blur-3xl sm:blur-4xl md:blur-6xl bg-gradient-to-r from-primary/15 via-secondary/10 to-accent/8 rounded-full"
                  style={{ zIndex: -2 }}
                />
                
                {/* Premium Decorative elements around the title - Responsive positioning */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 1.5, duration: 0.8 }}
                  className="absolute -left-4 sm:-left-6 md:-left-8 top-1/2 w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 bg-primary rounded-full transform -translate-y-1/2 glow-primary"
                />
                <motion.div
                  initial={{ scale: 0, rotate: 180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 1.6, duration: 0.8 }}
                  className="absolute -right-4 sm:-right-6 md:-right-8 top-1/2 w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 bg-primary rounded-full transform -translate-y-1/2 glow-primary"
                />
                
                {/* Premium Corner Accents - Hidden on mobile */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 1.7, duration: 0.6 }}
                  className="absolute -top-2 sm:-top-3 md:-top-4 -left-2 sm:-left-3 md:-left-4 w-1 h-1 sm:w-1.5 sm:h-1.5 md:w-2 md:h-2 bg-accent rounded-full glow-accent hidden sm:block"
                />
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 1.8, duration: 0.6 }}
                  className="absolute -top-2 sm:-top-3 md:-top-4 -right-2 sm:-right-3 md:-right-4 w-1 h-1 sm:w-1.5 sm:h-1.5 md:w-2 md:h-2 bg-accent rounded-full glow-accent hidden sm:block"
                />
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 1.9, duration: 0.6 }}
                  className="absolute -bottom-2 sm:-bottom-3 md:-bottom-4 -left-2 sm:-left-3 md:-left-4 w-1 h-1 sm:w-1.5 sm:h-1.5 md:w-2 md:h-2 bg-secondary rounded-full glow-secondary hidden sm:block"
                />
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 2.0, duration: 0.6 }}
                  className="absolute -bottom-2 sm:-bottom-3 md:-bottom-4 -right-2 sm:-right-3 md:-right-4 w-1 h-1 sm:w-1.5 sm:h-1.5 md:w-2 md:h-2 bg-secondary rounded-full glow-secondary hidden sm:block"
                />
              </motion.div>
            </motion.div>

            {/* Ultra Premium Subtitle Container */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 1, ease: "easeOut" }}
              className="relative mt-6 sm:mt-8 mb-8 sm:mb-12"
            >
              {/* Premium Subtitle Content with Ultra Glassmorphism */}
              <div className="relative z-10 px-6 sm:px-8 md:px-10 py-6 sm:py-7 md:py-8 glass-card rounded-2xl sm:rounded-3xl border border-primary/20 shadow-2xl sm:shadow-3xl backdrop-blur-xl sm:backdrop-blur-2xl">
                <div className="relative">
                  {/* Premium Multi-layer background glow */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.2 }}
                    transition={{ delay: 1.4, duration: 1 }}
                    className="absolute inset-0 bg-gradient-to-r from-primary/8 to-secondary/4 rounded-2xl sm:rounded-3xl blur-sm sm:blur-md"
                  />
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.1 }}
                    transition={{ delay: 1.6, duration: 1 }}
                    className="absolute inset-0 bg-gradient-to-r from-accent/6 to-primary/2 rounded-2xl sm:rounded-3xl blur-md sm:blur-lg"
                  />
                  
                  {/* Premium subtitle text with enhanced effects */}
                  <div className="relative z-10 text-base sm:text-lg md:text-xl lg:text-2xl font-code font-medium tracking-wide text-foreground" 
                       style={{ 
                         textShadow: '0 0 15px rgba(74, 158, 255, 0.5), 0 0 30px rgba(74, 158, 255, 0.25)',
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
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Premium Mission Statement */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 1 }}
            className="max-w-3xl sm:max-w-4xl mx-auto px-4"
            role="region"
            aria-label="Portfolio mission statement"
          >
            <p className="text-base sm:text-lg md:text-xl text-foreground leading-relaxed font-medium">
              Bridging the digital divide between{" "}
              <span className="text-primary font-bold" style={{ filter: 'contrast(1.2)' }}>security</span>,{" "}
              <span className="text-secondary font-bold" style={{ filter: 'contrast(1.2)' }}>finance</span>, and{" "}
              <span className="text-accent font-bold" style={{ filter: 'contrast(1.2)' }}>creativity</span>.
              <br />
              <span className="text-xs sm:text-sm font-code text-primary/90 block mt-2 sm:mt-3 tracking-wider">
                // Where code meets canvas, security meets innovation
              </span>
            </p>
          </motion.div>

          {/* Premium Stats with Ultra Elegant Design */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 1 }}
            className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-12"
            role="region"
            aria-label="Portfolio statistics"
          >
            {memoizedStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className={`text-center ${stat.color} cursor-pointer transition-all duration-500 hover:scale-105 sm:hover:scale-110`}
                animate={{
                  scale: currentStat === index ? 1.05 : 1,
                  opacity: currentStat === index ? 1 : 0.8,
                }}
                transition={{ duration: 0.5 }}
                whileHover={{
                  scale: 1.02,
                  opacity: 1,
                  filter: 'drop-shadow(0 0 15px currentColor) brightness(1.2)',
                }}
                onClick={() => setCurrentStat(index)}
                onKeyDown={(e) => e.key === 'Enter' && setCurrentStat(index)}
                tabIndex={0}
                role="button"
                aria-label={`${stat.label}: ${stat.value}`}
              >
                <div className="text-xl sm:text-2xl md:text-3xl font-black font-tech mb-1">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground font-code tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Premium CTA Buttons with Ultra Elegant Variants */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 1 }}
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-8 justify-center items-center max-w-lg sm:max-w-xl mx-auto px-4"
          >
            <Button 
              variant="elegant"
              size="lg"
              className="w-full sm:w-auto font-tech hover:scale-105 sm:hover:scale-110 transition-all duration-500 shadow-xl sm:shadow-2xl hover:shadow-2xl sm:hover:shadow-3xl text-sm sm:text-base"
              aria-label="Explore portfolio work and projects"
              onMouseEnter={() => setHoveredButton('explore')}
              onMouseLeave={() => setHoveredButton(null)}
            >
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Explore My Work
              <motion.div
                animate={{ x: hoveredButton === 'explore' ? 5 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
              </motion.div>
            </Button>
            
            <Button 
              variant="glass" 
              size="lg"
              className="w-full sm:w-auto font-tech hover:scale-105 sm:hover:scale-110 transition-all duration-500 shadow-xl sm:shadow-2xl hover:shadow-2xl sm:hover:shadow-3xl text-sm sm:text-base"
              aria-label="View source code on GitHub"
              onMouseEnter={() => setHoveredButton('github')}
              onMouseLeave={() => setHoveredButton(null)}
            >
              <motion.div
                animate={{ rotate: hoveredButton === 'github' ? 360 : 0 }}
                transition={{ duration: 0.8 }}
              >
                <Icons.Github className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
              </motion.div>
              View Code
              <Diamond className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
          </motion.div>

          {/* Premium Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="pt-8 sm:pt-10 md:pt-12"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              className="w-6 h-9 sm:w-7 sm:h-10 md:w-8 md:h-12 border-2 border-primary/60 rounded-full flex justify-center mx-auto glow-primary shadow-xl sm:shadow-2xl"
            >
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2.5, repeat: Infinity }}
                className="w-1 h-3 sm:w-1.5 sm:h-4 bg-primary rounded-full mt-2"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 