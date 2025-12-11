'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { UXEnhancer } from '../../../lib/ai/ux-enhancer';
import { OptimizedImage } from '../ui/optimized-image';

interface HeroSectionProps {
  userId?: string;
  sessionId?: string;
}

/**
 * Hero Section Micro-Frontend Component
 * Exposed via Module Federation for independent deployment
 */
export default function HeroSection({ userId, sessionId }: HeroSectionProps) {
  const [personalizedContent, setPersonalizedContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const personalizeHero = async () => {
      try {
        // Get user behavior data (would come from analytics service)
        const userBehavior = {
          pages: ['home', 'portfolio'],
          timeSpent: { hero: 45, portfolio: 120 },
          interactions: ['scroll', 'hover', 'click'],
          device: 'desktop',
          location: 'unknown',
          sessionId: sessionId || 'anonymous',
          timestamp: new Date(),
        };

        // Generate personalized content
        const content = await UXEnhancer.personalizeContent(userBehavior);
        setPersonalizedContent(content);
      } catch (error) {
        console.error('Hero personalization failed:', error);
        // Fallback content
        setPersonalizedContent({
          headline: 'Welcome to DreamFolio',
          subheadline: 'Innovative solutions for the digital age',
          callToAction: 'Explore My Work',
          microcopy: {
            heroButton: 'Get Started',
            learnMore: 'Learn More',
          },
        });
      } finally {
        setLoading(false);
      }
    };

    personalizeHero();
  }, [sessionId]);

  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="animate-pulse">
          <div className="h-12 bg-slate-700 rounded w-96 mb-4"></div>
          <div className="h-6 bg-slate-700 rounded w-80 mb-8"></div>
          <div className="h-12 bg-blue-600 rounded w-48"></div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
          >
            {personalizedContent?.headline || 'Welcome to DreamFolio'}
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed"
          >
            {personalizedContent?.subheadline || 'Innovative solutions for the digital age'}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
              {personalizedContent?.callToAction || 'Explore My Work'}
            </button>

            <button className="px-8 py-4 border-2 border-white/20 text-white font-semibold rounded-lg hover:bg-white/10 transition-all duration-300 backdrop-blur-sm">
              {personalizedContent?.microcopy?.learnMore || 'Learn More'}
            </button>
          </motion.div>

          {/* Stats or Social Proof */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto"
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">50+</div>
              <div className="text-gray-400">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">10+</div>
              <div className="text-gray-400">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-pink-400 mb-2">100%</div>
              <div className="text-gray-400">Client Satisfaction</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-white/50 rounded-full mt-2"
          />
        </div>
      </motion.div>
    </section>
  );
}

// Export for Module Federation
export { HeroSection };