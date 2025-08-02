"use client";

import { motion } from "framer-motion";
import { ReactNode, useState, useEffect } from "react";
import { useStaggeredAnimation, useReducedMotion } from "@/lib/hooks/use-animations";
import { ANIMATION_CONFIG } from "@/lib/constants/config";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  distance?: number;
  duration?: number;
}

export const AnimatedSection = ({
  children,
  className = "",
  id,
  delay = 0,
  direction = "up",
  distance = 50,
  duration = ANIMATION_CONFIG.duration.normal,
}: AnimatedSectionProps) => {
  const { ref, isVisible } = useStaggeredAnimation();
  const prefersReducedMotion = useReducedMotion();

  const getInitialPosition = () => {
    if (prefersReducedMotion) return { opacity: 0 };
    
    switch (direction) {
      case "up":
        return { opacity: 0, y: distance };
      case "down":
        return { opacity: 0, y: -distance };
      case "left":
        return { opacity: 0, x: distance };
      case "right":
        return { opacity: 0, x: -distance };
      default:
        return { opacity: 0, y: distance };
    }
  };

  const getAnimatePosition = () => {
    if (prefersReducedMotion) return { opacity: 1 };
    
    return { opacity: 1, x: 0, y: 0 };
  };

  return (
    <motion.section
      ref={ref}
      id={id}
      className={className}
      initial={getInitialPosition()}
      animate={isVisible ? getAnimatePosition() : getInitialPosition()}
      transition={{
        duration: prefersReducedMotion ? 0 : duration,
        delay: prefersReducedMotion ? 0 : delay,
        ease: ANIMATION_CONFIG.easing.easeOut,
      }}
    >
      {children}
    </motion.section>
  );
};

interface StaggeredContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  direction?: "up" | "down" | "left" | "right";
  distance?: number;
}

export const StaggeredContainer = ({
  children,
  className = "",
  staggerDelay = ANIMATION_CONFIG.stagger.normal,
  direction = "up",
  distance = 30,
}: StaggeredContainerProps) => {
  const prefersReducedMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : staggerDelay,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: prefersReducedMotion 
      ? { opacity: 0 }
      : {
          opacity: 0,
          y: direction === "up" ? distance : direction === "down" ? -distance : 0,
          x: direction === "left" ? distance : direction === "right" ? -distance : 0,
        },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : ANIMATION_CONFIG.duration.normal,
        ease: ANIMATION_CONFIG.easing.easeOut,
      },
    },
  };

  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      {Array.isArray(children) 
        ? children.map((child, index) => (
            <motion.div key={index} variants={itemVariants}>
              {child}
            </motion.div>
          ))
        : <motion.div variants={itemVariants}>{children}</motion.div>
      }
    </motion.div>
  );
}; 