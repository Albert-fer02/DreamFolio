"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { NAVIGATION, SITE_CONFIG } from "@/lib/constants/config";
import { useReducedMotion } from "@/lib/hooks/use-animations";
import { Menu, X, Github, Linkedin, Twitter } from "lucide-react";

/**
 * Enhanced Header Component with Collaboration Section Highlighting
 * 
 * Features:
 * - Active section detection and highlighting
 * - Special styling for Collaboration section (accent color)
 * - Smooth scroll navigation
 * - Responsive design for mobile and desktop
 * - Animated indicators and hover effects
 */

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("hero");
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Detect active section
      const sections = NAVIGATION.sections.map(s => s.id);
      const scrollPosition = window.scrollY + 100;
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  const headerVariants = {
    initial: { y: -100, opacity: 0 },
    animate: { 
      y: 0, 
      opacity: 1,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.5,
        ease: "easeOut" as const,
      }
    },
    scrolled: {
      backgroundColor: "rgba(34, 34, 34, 0.8)",
      backdropFilter: "blur(20px)",
      borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
      transition: {
        duration: prefersReducedMotion ? 0 : 0.3,
        ease: "easeOut" as const,
      }
    }
  };

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      variants={headerVariants}
      initial="initial"
      animate={isScrolled ? "scrolled" : "animate"}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <motion.div
            className="flex items-center space-x-2"
            whileHover={{ scale: prefersReducedMotion ? 1 : 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-primary to-primary/60 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm lg:text-base">D</span>
            </div>
            <span className="text-white font-bold text-lg lg:text-xl">
              {SITE_CONFIG.title}
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {NAVIGATION.sections.map((section, index) => (
              <motion.button
                key={section.id}
                className={`transition-colors duration-200 relative group px-2 py-1 rounded-md ${
                  activeSection === section.id 
                    ? 'text-white font-semibold' 
                    : 'text-gray-300 hover:text-white'
                } ${
                  section.id === 'collaboration' ? 'font-semibold' : ''
                }`}
                onClick={() => scrollToSection(section.id)}
                whileHover={{ y: prefersReducedMotion ? 0 : -2 }}
                transition={{ duration: 0.2 }}
              >
                {section.label}
                {section.id === 'collaboration' && (
                  <motion.div
                    className="absolute -top-1 -right-1 w-2 h-2 bg-accent rounded-full"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.5 }}
                  />
                )}
                <motion.div
                  className={`absolute -bottom-1 left-0 right-0 h-0.5 origin-left ${
                    section.id === 'collaboration' ? 'bg-accent' : 'bg-primary'
                  }`}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: activeSection === section.id ? 1 : 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            ))}
          </nav>

          {/* Social Links & CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30">
                Available
              </Badge>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-300 hover:text-white"
                asChild
              >
                <a href="https://github.com/dreamcoder08" target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4" />
                </a>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-300 hover:text-white"
                asChild
              >
                <a href="https://linkedin.com/in/dreamcoder08" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="w-4 h-4" />
                </a>
              </Button>
            </div>

            <Button
              className="bg-primary hover:bg-primary/90 text-white"
              onClick={() => scrollToSection("contact")}
            >
              Get in Touch
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-300 hover:text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="lg:hidden bg-gray-900/95 backdrop-blur-lg border-t border-gray-800"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
          >
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col space-y-4">
                {NAVIGATION.sections.map((section) => (
                  <button
                    key={section.id}
                    className={`text-left transition-colors duration-200 py-2 px-3 rounded-md relative ${
                      activeSection === section.id 
                        ? 'text-white font-semibold bg-primary/10 border-l-2 border-primary' 
                        : 'text-gray-300 hover:text-white'
                    } ${
                      section.id === 'collaboration' ? 'font-semibold bg-accent/10 border-l-2 border-accent' : ''
                    }`}
                    onClick={() => scrollToSection(section.id)}
                  >
                    <div className="flex items-center justify-between">
                      <span>{section.label}</span>
                      {section.id === 'collaboration' && (
                        <motion.div
                          className="w-2 h-2 bg-accent rounded-full"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.3, delay: 0.5 }}
                        />
                      )}
                    </div>
                  </button>
                ))}
                
                <div className="pt-4 border-t border-gray-800">
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30">
                      Available
                    </Badge>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white" asChild>
                        <a href="https://github.com/dreamcoder08" target="_blank" rel="noopener noreferrer">
                          <Github className="w-4 h-4" />
                        </a>
                      </Button>
                      <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white" asChild>
                        <a href="https://linkedin.com/in/dreamcoder08" target="_blank" rel="noopener noreferrer">
                          <Linkedin className="w-4 h-4" />
                        </a>
                      </Button>
                    </div>
                  </div>
                  <Button
                    className="w-full bg-primary hover:bg-primary/90 text-white"
                    onClick={() => scrollToSection("contact")}
                  >
                    Get in Touch
                  </Button>
                </div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}; 