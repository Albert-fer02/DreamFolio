"use client";

import React, { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useResponsiveLazyImage } from "@/lib/hooks/ui/use-lazy-load";
import { useResponsive } from "@/lib/hooks/ui/use-responsive";

interface ResponsiveImageProps {
  srcSets: {
    mobileS?: string;
    mobileM?: string; 
    mobileL?: string;
    tablet?: string;
    laptop?: string;
    desktop?: string;
    fallback: string;
  };
  alt: string;
  className?: string;
  priority?: boolean;
  quality?: number;
  placeholder?: "blur" | "empty";
  blurDataURL?: string;
  sizes?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  onLoad?: () => void;
  onError?: () => void;
  lazy?: boolean;
  aspectRatio?: string;
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
}

export const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  srcSets,
  alt,
  className,
  priority = false,
  quality = 75,
  placeholder = "empty",
  blurDataURL,
  sizes,
  fill = false,
  width,
  height,
  onLoad,
  onError,
  lazy = true,
  aspectRatio,
  objectFit = "cover",
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  const { deviceInfo, isRetina } = useResponsive();
  
  const { elementRef, src, shouldLoad, prefersReducedMotion } = useResponsiveLazyImage(
    srcSets,
    {
      threshold: deviceInfo.type === 'mobile' ? 0.1 : 0.05,
      rootMargin: deviceInfo.type === 'mobile' ? "50px" : "100px",
      triggerOnce: true,
    }
  );

  // Adjust quality based on device capabilities
  const optimizedQuality = isRetina ? Math.min(quality + 10, 100) : quality;

  // Generate responsive sizes string if not provided
  const responsiveSizes = sizes || (() => {
    switch (deviceInfo.type) {
      case 'mobile':
        return '100vw';
      case 'tablet':
        return '(max-width: 1024px) 100vw, 50vw';
      default:
        return '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw';
    }
  })();

  const handleLoad = () => {
    setImageLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setImageError(true);
    onError?.();
  };

  const imageClasses = cn(
    "transition-opacity duration-300",
    imageLoaded ? "opacity-100" : "opacity-0",
    prefersReducedMotion && "transition-none",
    className
  );

  // Container styles for aspect ratio
  const containerStyle = aspectRatio ? {
    aspectRatio,
    position: 'relative' as const,
  } : undefined;

  if (!shouldLoad && lazy && !priority) {
    return (
      <div 
        ref={elementRef as React.RefObject<HTMLDivElement>}
        className={cn(
          "bg-muted animate-pulse",
          aspectRatio && "relative",
          className
        )}
        style={containerStyle}
        aria-label={`Loading ${alt}`}
      >
        {!fill && width && height && (
          <div style={{ width, height }} />
        )}
      </div>
    );
  }

  if (imageError) {
    return (
      <div 
        className={cn(
          "bg-muted flex items-center justify-center text-muted-foreground",
          aspectRatio && "relative",
          className
        )}
        style={containerStyle}
        aria-label={`Failed to load ${alt}`}
      >
        <span className="text-sm">Image failed to load</span>
      </div>
    );
  }

  const imageElement = (
    <Image
      src={src || srcSets.fallback}
      alt={alt}
      className={imageClasses}
      priority={priority}
      quality={optimizedQuality}
      placeholder={placeholder}
      blurDataURL={blurDataURL}
      sizes={responsiveSizes}
      fill={fill}
      width={!fill ? width : undefined}
      height={!fill ? height : undefined}
      style={{ objectFit }}
      onLoad={handleLoad}
      onError={handleError}
    />
  );

  if (aspectRatio) {
    return (
      <div 
        ref={elementRef as React.RefObject<HTMLDivElement>}
        style={containerStyle}
        className={cn("relative overflow-hidden", className)}
      >
        {imageElement}
      </div>
    );
  }

  return (
    <div ref={elementRef as React.RefObject<HTMLDivElement>}>
      {imageElement}
    </div>
  );
};

// Optimized avatar component
export const ResponsiveAvatar: React.FC<{
  srcSets: ResponsiveImageProps['srcSets'];
  alt: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}> = ({ srcSets, alt, size = 'md', className }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12', 
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
  };

  return (
    <ResponsiveImage
      srcSets={srcSets}
      alt={alt}
      className={cn(
        "rounded-full object-cover",
        sizeClasses[size],
        className
      )}
      aspectRatio="1"
      priority
    />
  );
};

// Hero image component
export const ResponsiveHeroImage: React.FC<{
  srcSets: ResponsiveImageProps['srcSets'];
  alt: string;
  className?: string;
  overlay?: boolean;
}> = ({ srcSets, alt, className, overlay = false }) => {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <ResponsiveImage
        srcSets={srcSets}
        alt={alt}
        fill
        priority
        quality={85}
        className="object-cover"
        sizes="100vw"
      />
      {overlay && (
        <div className="absolute inset-0 bg-black/20" />
      )}
    </div>
  );
};