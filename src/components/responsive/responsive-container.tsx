"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { useResponsive } from "@/lib/hooks/ui/use-responsive";

interface ResponsiveContainerProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: {
    mobileS?: string;
    mobileM?: string;
    mobileL?: string;
    tablet?: string;
    tabletLg?: string;
    laptop?: string;
    laptopL?: string;
    desktop?: string;
    desktopL?: string;
    fallback: string;
  };
  padding?: {
    mobileS?: string;
    mobileM?: string;
    mobileL?: string;
    tablet?: string;
    tabletLg?: string;
    laptop?: string;
    laptopL?: string;
    desktop?: string;
    desktopL?: string;
    fallback: string;
  };
  center?: boolean;
  fluid?: boolean;
  as?: keyof JSX.IntrinsicElements;
}

export const ResponsiveContainer: React.FC<ResponsiveContainerProps> = ({
  children,
  className,
  maxWidth = { fallback: "max-w-7xl" },
  padding = { fallback: "px-4" },
  center = true,
  fluid = false,
  as: Component = "div",
}) => {
  const { getResponsiveValue, deviceInfo, isTouch } = useResponsive();

  const currentMaxWidth = getResponsiveValue(maxWidth);
  const currentPadding = getResponsiveValue(padding);

  const containerClasses = cn(
    "w-full",
    !fluid && currentMaxWidth,
    currentPadding,
    center && "mx-auto",
    // Touch optimizations
    isTouch && "touch-manipulation",
    // Safe area handling for mobile devices
    deviceInfo.type === 'mobile' && [
      "safe-area-inset-x",
      deviceInfo.orientation === 'landscape' && "safe-area-inset-y"
    ],
    className
  );

  return (
    <Component className={containerClasses}>
      {children}
    </Component>
  );
};

// Preset container variants
export const MobileContainer: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => (
  <ResponsiveContainer
    maxWidth={{
      mobileS: "max-w-sm",
      mobileM: "max-w-md",
      mobileL: "max-w-lg",
      fallback: "max-w-2xl"
    }}
    padding={{
      mobileS: "px-3",
      mobileM: "px-4", 
      mobileL: "px-6",
      fallback: "px-8"
    }}
    className={className}
  >
    {children}
  </ResponsiveContainer>
);

export const ContentContainer: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => (
  <ResponsiveContainer
    maxWidth={{
      tablet: "max-w-2xl",
      laptop: "max-w-4xl",
      desktop: "max-w-6xl",
      desktopL: "max-w-7xl",
      fallback: "max-w-md"
    }}
    padding={{
      mobileS: "px-4",
      tablet: "px-6",
      laptop: "px-8",
      desktop: "px-12",
      fallback: "px-4"
    }}
    className={className}
  >
    {children}
  </ResponsiveContainer>
);

export const WideContainer: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => (
  <ResponsiveContainer
    maxWidth={{
      laptop: "max-w-6xl",
      desktop: "max-w-7xl",
      desktopL: "max-w-screen-2xl",
      fallback: "max-w-4xl"
    }}
    className={className}
  >
    {children}
  </ResponsiveContainer>
);