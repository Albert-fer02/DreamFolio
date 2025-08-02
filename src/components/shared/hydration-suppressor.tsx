"use client";

import { useEffect, useState } from "react";

interface HydrationSuppressorProps {
  children: React.ReactNode;
  suppressHydrationWarning?: boolean;
}

/**
 * Componente para suprimir errores de hidratación causados por extensiones del navegador
 * como Dark Reader, uBlock Origin, etc.
 */
export const HydrationSuppressor = ({ 
  children, 
  suppressHydrationWarning = true 
}: HydrationSuppressorProps) => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Pequeño delay para asegurar que la hidratación esté completa
    const timer = setTimeout(() => {
      setIsHydrated(true);
    }, 150);

    return () => clearTimeout(timer);
  }, []);

  // Durante la hidratación, renderizar un fallback simple
  if (!isHydrated) {
    return (
      <div 
        className="min-h-screen bg-background"
        suppressHydrationWarning={suppressHydrationWarning}
      >
        {/* Fallback minimalista durante la hidratación */}
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-pulse">
            <div className="w-8 h-8 bg-primary rounded-full mx-auto mb-4"></div>
            <div className="text-center text-muted-foreground">
              Loading DreamFolio...
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div suppressHydrationWarning={suppressHydrationWarning}>
      {children}
    </div>
  );
};

/**
 * Hook para detectar si hay extensiones del navegador que pueden causar problemas
 */
export const useBrowserExtensionDetection = () => {
  const [hasExtensions, setHasExtensions] = useState(false);

  useEffect(() => {
    // Detectar extensiones comunes que pueden causar problemas de hidratación
    const detectExtensions = () => {
      const extensions = [
        // Dark Reader
        document.querySelector('[data-darkreader-mode]'),
        document.querySelector('[data-darkreader-scheme]'),
        
        // uBlock Origin
        document.querySelector('#ublock0-epicker'),
        
        // AdBlock
        document.querySelector('.adblock'),
        
        // Otras extensiones comunes
        document.querySelector('[data-adblockkey]'),
        document.querySelector('[data-adblock]'),
      ];

      const hasExtension = extensions.some(ext => ext !== null);
      setHasExtensions(hasExtension);
    };

    // Ejecutar después de un pequeño delay para permitir que las extensiones se carguen
    const timer = setTimeout(detectExtensions, 200);
    return () => clearTimeout(timer);
  }, []);

  return hasExtensions;
}; 