"use client";

import * as React from "react";
import { EnhancedHeroSection } from "@/components/enhanced-hero";
import { EnhancedTrinitySection } from "@/components/enhanced-trinity";
import { EnhancedNavigation } from "@/components/enhanced-navigation";
import {
  TechSection,
  LearningSection,
  CollaborationSection,
  MissionSection,
  ContactSection,
  Footer,
  DynamicMicrocopy
} from "@/components/sections";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <EnhancedNavigation />
      <main className="flex-grow">
        <section id="hero">
          <EnhancedHeroSection />
        </section>
        <section id="trinity">
          <EnhancedTrinitySection />
        </section>
        <TechSection />
        <LearningSection />
        <CollaborationSection />
        <MissionSection />
        <ContactSection />
      </main>
      <Footer />
      <DynamicMicrocopy />
    </div>
  );
}
