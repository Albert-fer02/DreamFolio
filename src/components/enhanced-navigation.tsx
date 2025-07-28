"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Menu, 
  X, 
  Shield, 
  BrainCircuit, 
  Palette, 
  Code, 
  Mail, 
  Github,
  Linkedin,
  Zap,
  Sparkles
} from "lucide-react";
import { Icons } from "@/lib/icons";

const navigationItems = [
  { name: "Home", href: "#hero", icon: Sparkles },
  { name: "Trinity", href: "#trinity", icon: Shield },
  { name: "Tech", href: "#tech", icon: Code },
  { name: "Learning", href: "#learning", icon: BrainCircuit },
  { name: "Contact", href: "#contact", icon: Mail },
];

const socialLinks = [
  { name: "GitHub", href: "https://github.com", icon: Github, color: "text-muted-foreground hover:text-primary" },
  { name: "LinkedIn", href: "https://linkedin.com", icon: Linkedin, color: "text-muted-foreground hover:text-secondary" },
  { name: "Email", href: "mailto:contact@dreamcoder08.com", icon: Mail, color: "text-muted-foreground hover:text-accent" },
];

export function EnhancedNavigation() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState("");

  // Handle scroll effects
  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = navigationItems.map(item => item.href.replace("#", ""));
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Desktop Navigation */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? "glass backdrop-blur-md border-b border-border/30" 
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3"
            >
              <Link href="/" className="flex items-center gap-2">
                <div className="relative">
                  <Icons.DreamcoderLogo className="h-8 w-8 text-primary glow-primary" />
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 border border-primary/30 rounded-full"
                  />
                </div>
                <span className="text-xl font-display font-bold gradient-text-cyber">
                  Dreamfolio
                </span>
              </Link>
              
              {/* Status Badge */}
              <Badge className="glass-primary text-primary border-primary/50 px-2 py-1 text-xs font-code">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse mr-1" />
                ONLINE
              </Badge>
            </motion.div>

            {/* Desktop Menu */}
            <nav className="hidden md:flex items-center gap-8">
              {navigationItems.map((item) => (
                <motion.div
                  key={item.name}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <button
                    onClick={() => handleNavClick(item.href)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 font-tech text-sm ${
                      activeSection === item.href.replace("#", "")
                        ? "glass-primary text-primary"
                        : "text-muted-foreground hover:text-primary hover:glass-primary"
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.name}
                  </button>
                </motion.div>
              ))}
            </nav>

            {/* Right Side */}
            <div className="flex items-center gap-4">
              {/* Social Links */}
              <div className="hidden sm:flex items-center gap-3">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-2 rounded-lg glass hover-glow transition-all duration-300 ${social.color}`}
                  >
                    <social.icon className="w-4 h-4" />
                  </motion.a>
                ))}
              </div>

              {/* CTA Button */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  onClick={() => handleNavClick("#contact")}
                  className="glass-primary hover-glow text-primary-foreground font-tech px-4 py-2"
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Let's Talk
                </Button>
              </motion.div>

              {/* Mobile Menu Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-2 rounded-lg glass hover-glow"
              >
                {isOpen ? (
                  <X className="w-5 h-5 text-primary" />
                ) : (
                  <Menu className="w-5 h-5 text-primary" />
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-16 left-0 right-0 z-40 md:hidden"
          >
            <div className="glass backdrop-blur-md border-b border-border/30">
              <div className="container mx-auto px-4 py-6">
                <nav className="space-y-4">
                  {navigationItems.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <button
                        onClick={() => handleNavClick(item.href)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 font-tech text-left ${
                          activeSection === item.href.replace("#", "")
                            ? "glass-primary text-primary"
                            : "text-muted-foreground hover:text-primary hover:glass-primary"
                        }`}
                      >
                        <item.icon className="w-5 h-5" />
                        {item.name}
                      </button>
                    </motion.div>
                  ))}
                  
                  {/* Mobile Social Links */}
                  <div className="pt-4 border-t border-border/30">
                    <div className="flex items-center gap-4">
                      {socialLinks.map((social) => (
                        <motion.a
                          key={social.name}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className={`p-3 rounded-lg glass hover-glow transition-all duration-300 ${social.color}`}
                        >
                          <social.icon className="w-5 h-5" />
                        </motion.a>
                      ))}
                    </div>
                  </div>
                </nav>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent z-50"
        style={{ 
          scaleX: scrolled ? 1 : 0,
          transformOrigin: "left"
        }}
        transition={{ duration: 0.3 }}
      />
    </>
  );
} 