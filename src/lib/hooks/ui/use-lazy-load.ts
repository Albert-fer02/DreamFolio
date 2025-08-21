"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useResponsive } from "./use-responsive";

interface LazyLoadOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  fallbackDelay?: number;
  respectMotionPreference?: boolean;
}

export const useLazyLoad = (options: LazyLoadOptions = {}) => {
  const {
    threshold = 0.1,
    rootMargin = "50px",
    triggerOnce = true,
    fallbackDelay = 100,
    respectMotionPreference = true,
  } = options;

  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);
  const elementRef = useRef<HTMLElement>(null);
  const { deviceInfo, isTouch } = useResponsive();

  // Check for reduced motion preference
  const prefersReducedMotion = respectMotionPreference && 
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const shouldLoad = isIntersecting || (triggerOnce && hasIntersected);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Mobile optimization: Use higher threshold for touch devices
    const effectiveThreshold = isTouch ? Math.max(threshold, 0.2) : threshold;
    
    // Adjust root margin for mobile devices
    const effectiveRootMargin = deviceInfo.type === 'mobile' ? "30px" : rootMargin;

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          const isVisible = entry.isIntersecting;
          setIsIntersecting(isVisible);
          
          if (isVisible && !hasIntersected) {
            setHasIntersected(true);
            if (triggerOnce) {
              observer.unobserve(element);
            }
          }
        },
        { 
          threshold: effectiveThreshold,
          rootMargin: effectiveRootMargin,
        }
      );

      observer.observe(element);

      return () => {
        observer.unobserve(element);
      };
    } else {
      // Fallback for browsers without IntersectionObserver
      const timer = setTimeout(() => {
        setIsIntersecting(true);
        setHasIntersected(true);
      }, fallbackDelay);

      return () => clearTimeout(timer);
    }
  }, [threshold, rootMargin, triggerOnce, fallbackDelay, hasIntersected, isTouch, deviceInfo.type]);

  return {
    elementRef,
    isIntersecting,
    hasIntersected,
    shouldLoad,
    prefersReducedMotion,
  };
};

// Image lazy loading hook with responsive sizes
export const useResponsiveLazyImage = (
  srcSets: {
    mobileS?: string;
    mobileM?: string;
    mobileL?: string;
    tablet?: string;
    laptop?: string;
    desktop?: string;
    fallback: string;
  },
  options: LazyLoadOptions = {}
) => {
  const { getResponsiveValue } = useResponsive();
  const { elementRef, shouldLoad, prefersReducedMotion } = useLazyLoad(options);
  
  const currentSrc = getResponsiveValue(srcSets);
  
  return {
    elementRef,
    src: shouldLoad ? currentSrc : undefined,
    shouldLoad,
    prefersReducedMotion,
  };
};

// Component lazy loading hook
export const useComponentLazyLoad = <T extends Record<string, any>>(
  importFn: () => Promise<{ default: React.ComponentType<T> }>,
  options: LazyLoadOptions = {}
) => {
  const [Component, setComponent] = useState<React.ComponentType<T> | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { shouldLoad } = useLazyLoad(options);

  useEffect(() => {
    if (shouldLoad && !Component && !loading) {
      setLoading(true);
      setError(null);
      
      importFn()
        .then((module) => {
          setComponent(() => module.default);
        })
        .catch((err) => {
          setError(err instanceof Error ? err : new Error('Failed to load component'));
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [shouldLoad, Component, loading, importFn]);

  return {
    Component,
    loading,
    error,
    shouldLoad,
  };
};

// Viewport-based preloading
export const useViewportPreload = (
  preloadFn: () => void | Promise<void>,
  options: LazyLoadOptions & { preloadMargin?: string } = {}
) => {
  const { preloadMargin = "200px", ...lazyOptions } = options;
  const preloadExecuted = useRef(false);
  
  const { elementRef, isIntersecting } = useLazyLoad({
    ...lazyOptions,
    rootMargin: preloadMargin,
  });

  useEffect(() => {
    if (isIntersecting && !preloadExecuted.current) {
      preloadExecuted.current = true;
      
      const result = preloadFn();
      if (result instanceof Promise) {
        result.catch(console.error);
      }
    }
  }, [isIntersecting, preloadFn]);

  return { elementRef };
};