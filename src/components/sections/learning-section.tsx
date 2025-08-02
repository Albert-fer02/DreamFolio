"use client";

import * as React from "react";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProgressRing } from "@/components/ui/lightweight-chart";

export function LearningSection() {
  const [selectedLearning, setSelectedLearning] = React.useState<string | null>(null);
  
  // Enhanced learning data with storytelling elements
  const enhancedLearningData = [
    {
      title: "Quantum Computing",
      progress: 75,
      color: "hsl(var(--chart-1))",
      timeline: "2023 - Present",
      nextMilestone: "Quantum algorithms certification",
      motivation: "Building the future of computing",
      achievement: "Implemented first quantum encryption prototype"
    },
    {
      title: "AI Ethics",
      progress: 60,
      color: "hsl(var(--chart-2))",
      timeline: "2024 - Present", 
      nextMilestone: "Research publication",
      motivation: "Responsible AI development",
      achievement: "Led 3 ethical AI workshops"
    },
    {
      title: "Advanced Cryptography",
      progress: 85,
      color: "hsl(var(--chart-3))",
      timeline: "2022 - Present",
      nextMilestone: "Zero-knowledge proofs mastery", 
      motivation: "Securing the digital world",
      achievement: "Developed custom encryption library"
    },
    {
      title: "Game Development",
      progress: 45,
      color: "hsl(var(--chart-4))",
      timeline: "2024 - Present",
      nextMilestone: "First indie game release",
      motivation: "Combining art with technology",
      achievement: "Built procedural music engine"
    }
  ];

  return (
    <section id="learning" className="py-20 sm:py-24 bg-gradient-to-br from-background to-muted/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced header with motivation */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-headline font-bold mb-4">
            Continuous Learning Journey
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-6">
            Every day is an opportunity to grow. Here's what I'm currently mastering and the milestones I'm working toward.
          </p>
          {/* Learning streak indicator */}
          <div className="inline-flex items-center gap-3 bg-orange-500/10 text-orange-600 px-6 py-3 rounded-full">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse delay-75"></div>
              <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse delay-150"></div>
            </div>
            <span className="font-semibold">247 consecutive days of learning</span>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {enhancedLearningData.map((item, index) => (
            <div 
              key={item.title} 
              className={`relative cursor-pointer transition-all duration-300 ${
                selectedLearning === item.title ? 'scale-105' : 'hover:scale-102'
              }`}
              onClick={() => setSelectedLearning(selectedLearning === item.title ? null : item.title)}
            >
              {/* Progress ring container */}
              <div className="flex flex-col items-center gap-4 p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border/30 hover:border-primary/50 transition-all">
                <ProgressRing
                  progress={item.progress}
                  size={120}
                  color={item.color}
                  animate={true}
                  className="mx-auto"
                />
                
                {/* Learning info */}
                <div className="text-center space-y-2">
                  <h3 className="font-semibold text-lg">{item.title}</h3>
                  <Badge variant="outline" className="text-xs">
                    {item.timeline}
                  </Badge>
                  
                  {/* Expanded details on selection */}
                  {selectedLearning === item.title && (
                    <div className="mt-4 space-y-3 text-sm animate-in slide-in-from-top-2">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <p className="font-medium text-primary mb-1">🎯 Next Milestone:</p>
                        <p className="text-muted-foreground">{item.nextMilestone}</p>
                      </div>
                      <div className="p-3 bg-green-500/10 rounded-lg">
                        <p className="font-medium text-green-600 mb-1">🏆 Latest Achievement:</p>
                        <p className="text-muted-foreground">{item.achievement}</p>
                      </div>
                      <div className="p-3 bg-blue-500/10 rounded-lg">
                        <p className="font-medium text-blue-600 mb-1">💡 Why This Matters:</p>
                        <p className="text-muted-foreground">{item.motivation}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Progress indicator */}
              <div className="mt-3 w-full bg-muted/30 rounded-full h-2">
                <div 
                  className="h-2 rounded-full transition-all duration-1000 ease-out"
                  style={{ 
                    width: `${item.progress}%`,
                    background: `linear-gradient(to right, ${item.color}, ${item.color}80)`
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Learning philosophy */}
        <div className="text-center bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-2xl p-8">
          <h3 className="text-2xl font-headline font-bold mb-4">Learning Philosophy</h3>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
            "The intersection of disciplines creates the most innovative solutions. Each skill I develop amplifies the others."
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>Theory + Practice</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span>Community Driven</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
              <span>Real-World Applied</span>
            </div>
          </div>
        </div>

        {/* Call to action */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Want to learn together or share knowledge?
          </p>
          <Button variant="outline" size="lg">
            Join My Learning Community
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
} 