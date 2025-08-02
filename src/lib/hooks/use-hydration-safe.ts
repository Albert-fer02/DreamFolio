"use client";

import { useState, useEffect } from "react";

/**
 * Hook para manejar la hidratación de manera segura
 * Evita problemas de hidratación causados por extensiones del navegador
 */
export const useHydrationSafe = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    // Pequeño delay para asegurar que la hidratación esté completa
    const timer = setTimeout(() => {
      setIsHydrated(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return { isHydrated, isClient };
};

/**
 * Hook para valores que pueden cambiar entre servidor y cliente
 * Útil para valores como Math.random(), Date.now(), etc.
 */
export const useHydrationSafeValue = <T>(
  serverValue: T,
  clientValue: T
): T => {
  const { isHydrated } = useHydrationSafe();
  return isHydrated ? clientValue : serverValue;
};

/**
 * Hook para manejar preferencias del sistema de manera segura
 */
export const useSystemPreference = <T>(
  preferenceKey: string,
  defaultValue: T
): T => {
  const { isClient } = useHydrationSafe();
  const [value, setValue] = useState<T>(defaultValue);

  useEffect(() => {
    if (!isClient) return;

    const getPreference = (): T => {
      switch (preferenceKey) {
        case 'reduced-motion':
          return window.matchMedia('(prefers-reduced-motion: reduce)').matches as T;
        case 'color-scheme':
          return (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light') as T;
        case 'locale':
          return (navigator.language || 'en') as T;
        default:
          return defaultValue;
      }
    };

    setValue(getPreference());

    // Escuchar cambios en las preferencias
    if (preferenceKey === 'reduced-motion') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      const handleChange = (e: MediaQueryListEvent) => {
        setValue(e.matches as T);
      };
      
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }

    if (preferenceKey === 'color-scheme') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = (e: MediaQueryListEvent) => {
        setValue((e.matches ? 'dark' : 'light') as T);
      };
      
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [isClient, preferenceKey, defaultValue]);

  return value;
}; 