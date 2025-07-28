// Optimized Framer Motion imports - only what we need
import { motion as _motion } from "framer-motion";
import { useScroll as _useScroll } from "framer-motion";
import { useTransform as _useTransform } from "framer-motion";
import { useSpring as _useSpring } from "framer-motion";
import { useMotionValue as _useMotionValue } from "framer-motion";

// Re-export only what we need
export const motion = _motion;
export const useScroll = _useScroll;
export const useTransform = _useTransform;
export const useSpring = _useSpring;
export const useMotionValue = _useMotionValue;

// Predefined animations for reuse
export const ANIMATIONS = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.6 },
  },
  slideUp: {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: -20, opacity: 0 },
    transition: { duration: 0.6 },
  },
  slideInFromLeft: {
    initial: { x: -50, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: 50, opacity: 0 },
    transition: { duration: 0.6 },
  },
  slideInFromRight: {
    initial: { x: 50, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: -50, opacity: 0 },
    transition: { duration: 0.6 },
  },
  scaleIn: {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.8, opacity: 0 },
    transition: { duration: 0.4 },
  },
  stagger: {
    container: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1,
          delayChildren: 0.2,
        },
      },
    },
    item: {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6 },
      },
    },
  },
  hover: {
    scale: 1.05,
    transition: { duration: 0.2 },
  },
  tap: {
    scale: 0.95,
    transition: { duration: 0.1 },
  },
} as const;

// Utility functions for common animations
export const createStaggerAnimation = (itemCount: number, delay: number = 0.1) => ({
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: delay,
        delayChildren: 0.2,
      },
    },
  },
  item: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  },
});

export const createHoverAnimation = (scale: number = 1.05, duration: number = 0.2) => ({
  whileHover: { scale },
  whileTap: { scale: scale * 0.95 },
  transition: { duration },
});

export const createParallaxAnimation = (offset: number[] = [0, 1], range: number[] = [-50, 50]) => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, offset, range);
  return { scrollYProgress, y };
}; 