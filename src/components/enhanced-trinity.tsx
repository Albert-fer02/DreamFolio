"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Shield, BrainCircuit, Palette, Zap, Lock, TrendingUp, Sparkles } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const trinityData = [
  {
    icon: <Shield className="size-8 sm:size-10 md:size-12 text-azure-solid" />,
    title: "Security Enthusiast",
    description: "Learning Red Team, Basic Pentesting",
    prose: "Currently developing foundational security skills through hands-on labs and CTF challenges. Building understanding of common vulnerabilities and basic penetration testing methodologies.",
    color: "azure",
    gradient: "gradient-text-azure",
    glassClass: "glass-primary",
    stats: { projects: "15+", experience: "2 years", success: "Learning" },
    features: ["Basic Penetration Testing", "Vulnerability Assessment", "Security Fundamentals", "CTF Participation"]
  },
  {
    icon: <BrainCircuit className="size-8 sm:size-10 md:size-12 text-amethyst-solid" />,
    title: "Junior Developer", 
    description: "Web Development, Basic AI Integration",
    prose: "Building foundational web applications with modern frameworks. Learning to integrate basic AI/ML concepts and exploring fintech development patterns.",
    color: "amethyst",
    gradient: "gradient-text-amethyst",
    glassClass: "glass-secondary",
    stats: { projects: "8+", experience: "3 years", success: "Growing" },
    features: ["Web Development", "Basic AI Integration", "Database Design", "API Development"]
  },
  {
    icon: <Palette className="size-8 sm:size-10 md:size-12 text-champagne-solid" />,
    title: "Creative Learner",
    description: "Music Production, Digital Art",
    prose: "Exploring the intersection of technology and creativity through music production software and digital art tools. Building foundational skills in creative technology.",
    color: "champagne",
    gradient: "gradient-text-champagne",
    glassClass: "glass-accent",
    stats: { projects: "20+", experience: "3 years", success: "Developing" },
    features: ["Digital Music Production", "Basic Visual Effects", "Creative Software", "Learning Generative AI"]
  },
];

export function EnhancedTrinitySection() {
  const [hoveredCard, setHoveredCard] = React.useState<string | null>(null);
  const [selectedCard, setSelectedCard] = React.useState<number | null>(null);

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/5 to-background" />
      <div className="absolute inset-0 bg-grid-pattern opacity-5 sm:opacity-10" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <Badge className="glass-primary glow-azure text-azure-solid border-primary/50 px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-code font-semibold mb-4">
            <Zap className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
            TRINITY
          </Badge>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4 sm:mb-6 px-2">
            <span className="gradient-text-cyber">Three</span>{" "}
            <span className="gradient-text-financial">Domains</span>,{" "}
            <span className="gradient-text-creative">Infinite</span>{" "}
            <span className="gradient-text-cyber">Possibilities</span>
          </h2>
          
          <p className="text-base sm:text-lg text-sterling max-w-2xl sm:max-w-3xl mx-auto mb-4 sm:mb-6 font-tech px-4">
            Three specialized domains, infinite possibilities. Each area backed by real projects and proven results.
          </p>
          
          {/* Social proof indicator */}
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm text-azure-solid glass-primary glow-azure px-4 sm:px-6 py-2 sm:py-3 rounded-full">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="font-code font-semibold">50+ projects delivered across these domains</span>
          </div>
        </motion.div>

        {/* Trinity Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12">
          {trinityData.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group"
            >
              <Card
                className={`${item.glassClass} hover-lift hover-glow transition-all duration-500 cursor-pointer relative overflow-hidden
                  ${hoveredCard === item.title 
                    ? 'scale-105 shadow-2xl' 
                    : 'hover:scale-102'
                  }`}
                onMouseEnter={() => setHoveredCard(item.title)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => setSelectedCard(selectedCard === index ? null : index)}
              >
                {/* Success indicator */}
                <div className="absolute top-3 sm:top-4 right-3 sm:right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Badge variant="secondary" className="text-xs font-code">
                    {item.stats.experience}
                  </Badge>
                </div>

                <CardHeader className="items-center text-center pb-2 px-4 sm:px-6">
                  <motion.div 
                    className="mb-3 sm:mb-4 transition-transform duration-300 group-hover:scale-110"
                    whileHover={{ rotate: 5 }}
                  >
                    {item.icon}
                  </motion.div>
                  
                  <CardTitle className={`font-display text-lg sm:text-xl mb-2 ${item.gradient}`}>
                    {item.title}
                  </CardTitle>
                  
                  <CardDescription className={`text-${item.color}-solid font-medium mb-2 sm:mb-3 font-code text-sm sm:text-base`}>
                    {item.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="text-center px-4 sm:px-6">
                  <p className="text-sterling mb-4 sm:mb-6 leading-relaxed font-body text-sm sm:text-base">
                    {item.prose}
                  </p>
                  
                  {/* Stats Grid */}
                  <div className="grid grid-cols-3 gap-1 sm:gap-2 mb-4 sm:mb-6">
                    <div className="text-center p-1.5 sm:p-2 rounded-lg bg-background/20">
                      <div className={`text-sm sm:text-lg font-bold text-${item.color}-solid`}>
                        {item.stats.projects}
                      </div>
                      <div className="text-xs text-graphite font-code">
                        Projects
                      </div>
                    </div>
                    <div className="text-center p-1.5 sm:p-2 rounded-lg bg-background/20">
                      <div className={`text-sm sm:text-lg font-bold text-${item.color}-solid`}>
                        {item.stats.experience}
                      </div>
                      <div className="text-xs text-graphite font-code">
                        Experience
                      </div>
                    </div>
                    <div className="text-center p-1.5 sm:p-2 rounded-lg bg-background/20">
                      <div className={`text-sm sm:text-lg font-bold text-${item.color}-solid`}>
                        {item.stats.success}
                      </div>
                      <div className="text-xs text-graphite font-code">
                        Success
                      </div>
                    </div>
                  </div>

                  {/* Expanded Features */}
                  {selectedCard === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-3 sm:mt-4 space-y-2 sm:space-y-3"
                    >
                      <div className="text-xs sm:text-sm font-code text-graphite mb-2 sm:mb-3">
                        Key Capabilities:
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2">
                        {item.features.map((feature, idx) => (
                          <div key={idx} className={`text-xs p-1.5 sm:p-2 rounded bg-${item.color}/10 text-${item.color} font-code`}>
                            {feature}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                  
                  {/* Specific CTAs for each domain */}
                  <div className="space-y-2 sm:space-y-3 mt-4 sm:mt-6">
                    {index === 0 && (
                      <>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className={`w-full group-hover:bg-${item.color} group-hover:text-${item.color}-foreground transition-all font-tech text-xs sm:text-sm`}
                        >
                          View Learning Projects <ArrowRight className="ml-2 w-3 h-3 sm:w-4 sm:h-4" />
                        </Button>
                        <p className="text-xs text-graphite font-code">Latest: Basic web app security testing</p>
                      </>
                    )}
                    {index === 1 && (
                      <>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className={`w-full group-hover:bg-${item.color} group-hover:text-${item.color}-foreground transition-all font-tech text-xs sm:text-sm`}
                        >
                          See Web Projects <ArrowRight className="ml-2 w-3 h-3 sm:w-4 sm:h-4" />
                        </Button>
                        <p className="text-xs text-graphite font-code">Latest: E-commerce platform with basic features</p>
                      </>
                    )}
                    {index === 2 && (
                      <>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className={`w-full group-hover:bg-${item.color} group-hover:text-${item.color}-foreground transition-all font-tech text-xs sm:text-sm`}
                        >
                          View Creative Work <ArrowRight className="ml-2 w-3 h-3 sm:w-4 sm:h-4" />
                        </Button>
                        <p className="text-xs text-graphite font-code">Latest: Digital music composition</p>
                      </>
                    )}
                  </div>
                </CardContent>

                {/* Animated background on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br from-${item.color}/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Overall CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center px-4"
        >
          <p className="text-sterling mb-3 sm:mb-4 font-tech text-sm sm:text-base">
            Interested in collaborating across multiple domains?
          </p>
          <Button 
            size="lg" 
            className="elegant-button glow-azure font-display px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg"
          >
            <Sparkles className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
            Let's Build Something Together
            <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
} 