"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Shield, BrainCircuit, Palette, Zap, Lock, TrendingUp, Sparkles } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const trinityData = [
  {
    icon: <Shield className="size-12 text-azure-solid" />,
    title: "Cyber Guardian",
    description: "Red Team, Pentesting, Forensics",
    prose: "Expert in offensive security, simulating advanced threats to identify and mitigate vulnerabilities before they are exploited.",
    color: "azure",
    gradient: "gradient-text-azure",
    glassClass: "glass-primary",
    stats: { projects: "50+", experience: "5+ years", success: "99.8%" },
    features: ["Penetration Testing", "Threat Modeling", "Incident Response", "Security Audits"]
  },
  {
    icon: <BrainCircuit className="size-12 text-amethyst-solid" />,
    title: "FinTech Architect", 
    description: "Accountings Pro SaaS, AI Analytics",
    prose: "Developing secure and scalable financial software solutions, leveraging AI to provide deep market insights and analytics.",
    color: "amethyst",
    gradient: "gradient-text-amethyst",
    glassClass: "glass-secondary",
    stats: { projects: "25+", experience: "3+ years", success: "100%" },
    features: ["Blockchain Development", "AI/ML Integration", "Real-time Analytics", "Regulatory Compliance"]
  },
  {
    icon: <Palette className="size-12 text-champagne-solid" />,
    title: "Creative Technologist",
    description: "Music, Art, Visuals",
    prose: "Fusing technology with creativity to produce immersive music, generative art, and compelling visual experiences.",
    color: "champagne",
    gradient: "gradient-text-champagne",
    glassClass: "glass-accent",
    stats: { projects: "100+", experience: "7+ years", success: "95%" },
    features: ["Generative AI", "Audio Processing", "Visual Effects", "Interactive Experiences"]
  },
];

export function EnhancedTrinitySection() {
  const [hoveredCard, setHoveredCard] = React.useState<string | null>(null);
  const [selectedCard, setSelectedCard] = React.useState<number | null>(null);

  return (
    <section className="py-20 sm:py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/5 to-background" />
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge className="glass-primary glow-azure text-azure-solid border-primary/50 px-6 py-3 text-sm font-code font-semibold mb-4">
            <Zap className="w-4 h-4 mr-2" />
            TRINITY
          </Badge>
          
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            <span className="gradient-text-cyber">Three</span>{" "}
            <span className="gradient-text-financial">Domains</span>,{" "}
            <span className="gradient-text-creative">Infinite</span>{" "}
            <span className="gradient-text-cyber">Possibilities</span>
          </h2>
          
          <p className="text-lg text-sterling max-w-3xl mx-auto mb-6 font-tech">
            Three specialized domains, infinite possibilities. Each area backed by real projects and proven results.
          </p>
          
          {/* Social proof indicator */}
          <div className="inline-flex items-center gap-2 text-sm text-azure-solid glass-primary glow-azure px-6 py-3 rounded-full">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="font-code font-semibold">50+ projects delivered across these domains</span>
          </div>
        </motion.div>

        {/* Trinity Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
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
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Badge variant="secondary" className="text-xs font-code">
                    {item.stats.experience}
                  </Badge>
                </div>

                <CardHeader className="items-center text-center pb-2">
                  <motion.div 
                    className="mb-4 transition-transform duration-300 group-hover:scale-110"
                    whileHover={{ rotate: 5 }}
                  >
                    {item.icon}
                  </motion.div>
                  
                  <CardTitle className={`font-display text-xl mb-2 ${item.gradient}`}>
                    {item.title}
                  </CardTitle>
                  
                  <CardDescription className={`text-${item.color}-solid font-medium mb-3 font-code`}>
                    {item.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="text-center">
                  <p className="text-sterling mb-6 leading-relaxed font-body">
                    {item.prose}
                  </p>
                  
                  {/* Stats Grid */}
                  <div className="grid grid-cols-3 gap-2 mb-6">
                    <div className="text-center p-2 rounded-lg bg-background/20">
                      <div className={`text-lg font-bold text-${item.color}-solid`}>
                        {item.stats.projects}
                      </div>
                      <div className="text-xs text-graphite font-code">
                        Projects
                      </div>
                    </div>
                    <div className="text-center p-2 rounded-lg bg-background/20">
                      <div className={`text-lg font-bold text-${item.color}-solid`}>
                        {item.stats.experience}
                      </div>
                      <div className="text-xs text-graphite font-code">
                        Experience
                      </div>
                    </div>
                    <div className="text-center p-2 rounded-lg bg-background/20">
                      <div className={`text-lg font-bold text-${item.color}-solid`}>
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
                      className="mt-4 space-y-3"
                    >
                      <div className="text-sm font-code text-graphite mb-3">
                        Key Capabilities:
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {item.features.map((feature, idx) => (
                          <div key={idx} className={`text-xs p-2 rounded bg-${item.color}/10 text-${item.color} font-code`}>
                            {feature}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                  
                  {/* Specific CTAs for each domain */}
                  <div className="space-y-3 mt-6">
                    {index === 0 && (
                      <>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className={`w-full group-hover:bg-${item.color} group-hover:text-${item.color}-foreground transition-all font-tech`}
                        >
                          View Security Projects <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                        <p className="text-xs text-graphite font-code">Latest: Advanced threat simulation</p>
                      </>
                    )}
                    {index === 1 && (
                      <>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className={`w-full group-hover:bg-${item.color} group-hover:text-${item.color}-foreground transition-all font-tech`}
                        >
                          See FinTech Solutions <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                        <p className="text-xs text-graphite font-code">Latest: AI-powered analytics platform</p>
                      </>
                    )}
                    {index === 2 && (
                      <>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className={`w-full group-hover:bg-${item.color} group-hover:text-${item.color}-foreground transition-all font-tech`}
                        >
                          Listen to My Music <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                        <p className="text-xs text-graphite font-code">Latest: Generative ambient collection</p>
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
          className="text-center"
        >
          <p className="text-sterling mb-4 font-tech">
            Interested in collaborating across multiple domains?
          </p>
          <Button 
            size="lg" 
            className="elegant-button glow-azure font-display px-8 py-4 text-lg"
          >
            <Sparkles className="mr-2 w-5 h-5" />
            Let's Build Something Together
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
} 