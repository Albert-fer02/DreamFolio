import { useCallback, useMemo } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "@/lib/animations/framer-motion";

export const useAnimations = () => {
  const { scrollYProgress } = useScroll();

  const parallaxY = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const fadeIn = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  const createStaggerAnimation = useCallback((
    itemCount: number,
    delay: number = 0.1
  ) => ({
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
  }), []);

  const createHoverAnimation = useCallback((
    scale: number = 1.05,
    duration: number = 0.2
  ) => ({
    whileHover: { scale },
    whileTap: { scale: scale * 0.95 },
    transition: { duration },
  }), []);

  const createParallaxAnimation = useCallback((
    offset: number[] = [0, 1],
    range: number[] = [-50, 50]
  ) => {
    const y = useTransform(scrollYProgress, offset, range);
    return { scrollYProgress, y };
  }, [scrollYProgress]);

  const springConfig = useMemo(() => ({
    stiffness: 100,
    damping: 20,
    mass: 1,
  }), []);

  const createSpringAnimation = useCallback((
    initialValue: number = 0,
    targetValue: number = 1
  ) => {
    const spring = useSpring(initialValue, springConfig);
    return { spring, setTarget: (value: number) => spring.set(value) };
  }, [springConfig]);

  return {
    motion,
    scrollYProgress,
    parallaxY,
    fadeIn,
    createStaggerAnimation,
    createHoverAnimation,
    createParallaxAnimation,
    createSpringAnimation,
  };
}; 