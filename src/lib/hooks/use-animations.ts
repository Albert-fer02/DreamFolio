"use client";

import { useScroll, useTransform, useSpring, useMotionValue, useMotionValueEvent } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { ANIMATION_CONFIG } from "@/lib/constants/config";

export const useHeroAnimations = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  
  const y = useTransform(scrollY, [0, 500], [0, -100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.8]);
  
  const springY = useSpring(y, {
    stiffness: 100,
    damping: 30,
  });

  return {
    containerRef,
    scrollY,
    y: springY,
    opacity,
    scale,
  };
};

export const useParallaxScroll = (speed: number = 0.5) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -100 * speed]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return { ref, y, opacity, scrollYProgress };
};

export const useMousePosition = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    if (typeof window !== 'undefined') {
      const handleMouseMove = (event: MouseEvent) => {
        mouseX.set(event.clientX);
        mouseY.set(event.clientY);
      };

      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }
  }, [mouseX, mouseY]);

  return { mouseX, mouseY, isClient };
};

export const use3DCardEffect = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-15, 15]);

  const springRotateX = useSpring(rotateX, {
    stiffness: 150,
    damping: 15,
  });

  const springRotateY = useSpring(rotateY, {
    stiffness: 150,
    damping: 15,
  });

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const normalizedX = (e.clientX - centerX) / (rect.width / 2);
      const normalizedY = (e.clientY - centerY) / (rect.height / 2);
      
      mouseX.set(normalizedX);
      mouseY.set(normalizedY);
    };

    const handleMouseLeave = () => {
      mouseX.set(0);
      mouseY.set(0);
    };

    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [mouseX, mouseY]);

  return {
    cardRef,
    rotateX: springRotateX,
    rotateY: springRotateY,
  };
};

export const useStaggeredAnimation = (delay: number = ANIMATION_CONFIG.stagger.normal) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return { ref, isVisible, delay };
};

export const useReducedMotion = () => {
  const { useSystemPreference } = require('./use-hydration-safe');
  return useSystemPreference('reduced-motion', false);
}; 