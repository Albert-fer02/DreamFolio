"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
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
  Sparkles
} from "lucide-react";
import { Icons } from "@/lib/icons";

const navigationItems = [
  { name: "Home", href: "#hero", icon: Sparkles },
  { name: "Trinity", href: "#trinity", icon: Shield },
  { name: "Tech", href: "#tech", icon: Code },
  { name: "Learning", href: "#learning", icon: BrainCircuit },
  { name: "Collaboration", href: "#collaboration", icon: Palette },
  { name: "Contact", href: "#contact", icon: Mail },
];

const socialLinks = [
  { name: "GitHub", href: "https://github.com", icon: Github, color: "text-slate-300 hover:text-platinum-400" },
  { name: "LinkedIn", href: "https://linkedin.com", icon: Linkedin, color: "text-slate-300 hover:text-azure-400" },
  { name: "Email", href: "mailto:contact@dreamcoder08.com", icon: Mail, color: "text-slate-300 hover:text-silver-400" },
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
      const headerHeight = 64; // Height of the fixed header
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset - headerHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth"
      });
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
            ? "bg-black/20 backdrop-blur-xl border-b border-platinum-400/30 shadow-2xl" 
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 sm:gap-3"
            >
              <Link href="/" className="flex items-center gap-1.5 sm:gap-2">
                <div className="relative">
                  <Icons.DreamcoderLogo className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-platinum-400" />
                </div>
                <span className="text-lg sm:text-xl font-display font-bold text-platinum-300 drop-shadow-lg">
                  DreamFolio
                </span>
              </Link>
            </motion.div>

            {/* Desktop Menu */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
              {navigationItems.map((item) => (
                <motion.div
                  key={item.name}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <button
                    onClick={() => handleNavClick(item.href)}
                    className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-lg transition-all duration-300 font-tech text-xs sm:text-sm relative ${
                      activeSection === item.href.replace("#", "")
                        ? "bg-gradient-to-r from-platinum-400/20 to-azure-400/20 text-platinum-300 border border-platinum-400/30 shadow-lg shadow-platinum-400/20"
                        : "text-slate-300 hover:text-platinum-300 hover:bg-gradient-to-r hover:from-silver-400/10 hover:to-azure-400/10"
                    }`}
                  >
                    <item.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    {item.name}
                  </button>
                </motion.div>
              ))}
            </nav>

            {/* Right Side */}
            <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
              {/* Social Links - Hidden on mobile, visible on tablet and desktop */}
              <div className="hidden md:flex items-center gap-2 lg:gap-3">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-1.5 sm:p-2 rounded-lg bg-gradient-to-r from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-600/30 hover:border-platinum-400/50 transition-all duration-300 ${social.color} shadow-lg hover:shadow-platinum-400/20`}
                  >
                    <social.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </motion.a>
                ))}
              </div>

              {/* Mobile Menu Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden p-1.5 sm:p-2 rounded-lg bg-gradient-to-r from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-600/30 hover:border-platinum-400/50 transition-all duration-300 shadow-lg hover:shadow-platinum-400/20"
              >
                {isOpen ? (
                  <X className="w-4 h-4 sm:w-5 sm:h-5 text-platinum-300" />
                ) : (
                  <Menu className="w-4 h-4 sm:w-5 sm:h-5 text-platinum-300" />
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
            className="fixed top-14 sm:top-16 left-0 right-0 z-40 lg:hidden"
          >
            <div className="bg-black/20 backdrop-blur-xl border-b border-platinum-400/30 shadow-2xl">
              <div className="container mx-auto px-4 py-4 sm:py-6">
                <nav className="space-y-2 sm:space-y-4">
                  {navigationItems.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <button
                        onClick={() => handleNavClick(item.href)}
                        className={`w-full flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg transition-all duration-300 font-tech text-sm sm:text-base text-left relative ${
                          activeSection === item.href.replace("#", "")
                            ? "bg-gradient-to-r from-platinum-400/20 to-azure-400/20 text-platinum-300 border border-platinum-400/30 shadow-lg shadow-platinum-400/20"
                            : "text-slate-300 hover:text-platinum-300 hover:bg-gradient-to-r hover:from-silver-400/10 hover:to-azure-400/10"
                        }`}
                      >
                        <item.icon className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                        <span className="flex-1">{item.name}</span>
                      </button>
                    </motion.div>
                  ))}
                  
                  {/* Mobile Social Links */}
                  <div className="pt-3 sm:pt-4 border-t border-platinum-400/30">
                    <div className="flex items-center justify-center gap-3 sm:gap-4">
                      {socialLinks.map((social) => (
                        <motion.a
                          key={social.name}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className={`p-2.5 sm:p-3 rounded-lg bg-gradient-to-r from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-600/30 hover:border-platinum-400/50 transition-all duration-300 ${social.color} shadow-lg hover:shadow-platinum-400/20`}
                        >
                          <social.icon className="w-4 h-4 sm:w-5 sm:h-5" />
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
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-platinum-400 via-silver-300 to-azure-400 z-50 shadow-lg"
        style={{ 
          scaleX: scrolled ? 1 : 0,
          transformOrigin: "left"
        }}
        transition={{ duration: 0.3 }}
      />
    </>
  );
} 