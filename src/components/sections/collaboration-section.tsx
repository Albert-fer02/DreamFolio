"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Code, Mail, Github } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CollaborationStats } from "@/components/collaboration-stats";

const collaborationData = [
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
    title: "Plataform Modern Recurse",
    description: "Produce dynamic and adaptive soundtracks for independent video games.",
    image: "/images/collaboration/plataform-modern-recurse.jpg",
    hint: "modern"
  },
];

export function CollaborationSection() {
  const [hoveredCard, setHoveredCard] = React.useState<string | null>(null);

  return (
    <section id="collaboration" className="py-20 sm:py-24 bg-gradient-to-br from-background via-muted/5 to-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge className="glass-primary text-primary border-primary/50 px-4 py-2 text-sm font-code mb-4">
            <Code className="w-4 h-4 mr-2" />
            COLLABORATION
          </Badge>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            <span className="gradient-text-cyber">Collaboration</span>{" "}
            <span className="gradient-text-financial">Opportunities</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto font-tech">
            Join forces to build the future. From security research to creative tech, let's create something extraordinary together.
          </p>
        </motion.div>

        {/* Enhanced Cards Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {collaborationData.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              onHoverStart={() => setHoveredCard(item.title)}
              onHoverEnd={() => setHoveredCard(null)}
            >
              <Card className="group relative bg-card/50 backdrop-blur-sm border-border/30 overflow-hidden transition-all duration-500 hover:border-primary hover:shadow-2xl hover:shadow-primary/20 hover:scale-[1.02] collaboration-card">
                {/* Image Container */}
                <div className="relative overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={600}
                    height={400}
                    data-ai-hint={item.hint}
                    className="object-cover w-full h-56 transition-transform duration-700 group-hover:scale-110 collaboration-image"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Floating Badge */}
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-primary/90 text-primary-foreground backdrop-blur-sm floating-badge">
                      {item.hint}
                    </Badge>
                  </div>
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center hover-overlay">
                    <Button 
                      variant="elegant" 
                      size="lg"
                    >
                      Explore Project
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </div>
                </div>

                {/* Card Content */}
                <CardHeader className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <CardTitle className="font-headline text-xl group-hover:text-primary transition-colors">
                      {item.title}
                    </CardTitle>
                    <div className="flex gap-2">
                      {/* Status Indicator */}
                      <div className="w-3 h-3 bg-green-500 rounded-full status-indicator"></div>
                    </div>
                  </div>
                  
                  <CardDescription className="text-muted-foreground text-base leading-relaxed mb-4">
                    {item.description}
                  </CardDescription>
                  
                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Mail className="w-4 h-4 mr-2" />
                      Contact
                    </Button>
                    <Button variant="ghost" size="sm">
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>

                {/* Animated Border */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/50 transition-colors duration-500 rounded-lg" />
              </Card>
            </motion.div>
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
          <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-2xl p-8 border border-primary/20">
            <h3 className="text-2xl font-headline font-bold mb-4">
              Ready to Collaborate?
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
              Whether you have a specific project in mind or just want to explore possibilities, 
              let's start a conversation about how we can work together.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="elegant" size="lg">
                <Mail className="w-5 h-5 mr-2" />
                Start a Project
              </Button>
              <Button variant="outline" size="lg">
                <Github className="w-5 h-5 mr-2" />
                View Portfolio
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 