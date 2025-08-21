"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { useResponsive } from "@/lib/hooks/ui/use-responsive";

interface ResponsiveGridProps {
  children: React.ReactNode;
  className?: string;
  columns?: {
    mobileS?: number;
    mobileM?: number;
    mobileL?: number;
    tablet?: number;
    tabletLg?: number;
    laptop?: number;
    laptopL?: number;
    desktop?: number;
    desktopL?: number;
    fallback: number;
  };
  gap?: {
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
  autoRows?: boolean;
  minItemWidth?: string;
  adaptive?: boolean;
}

export const ResponsiveGrid: React.FC<ResponsiveGridProps> = ({
  children,
  className,
  columns = { fallback: 1 },
  gap = { fallback: "gap-4" },
  autoRows = false,
  minItemWidth,
  adaptive = false,
}) => {
  const { getResponsiveValue, deviceInfo, isTouch } = useResponsive();

  const currentColumns = getResponsiveValue(columns);
  const currentGap = getResponsiveValue(gap);

  // Generate grid classes based on current columns
  const getGridClass = (cols: number) => {
    const colsMap: Record<number, string> = {
      1: "grid-cols-1",
      2: "grid-cols-2", 
      3: "grid-cols-3",
      4: "grid-cols-4",
      5: "grid-cols-5",
      6: "grid-cols-6",
      7: "grid-cols-7",
      8: "grid-cols-8",
      9: "grid-cols-9",
      10: "grid-cols-10",
      11: "grid-cols-11",
      12: "grid-cols-12",
    };
    return colsMap[cols] || "grid-cols-1";
  };

  // Adaptive grid using CSS Grid auto-fit
  const adaptiveStyle = adaptive && minItemWidth ? {
    gridTemplateColumns: `repeat(auto-fit, minmax(${minItemWidth}, 1fr))`,
  } : {};

  const gridClasses = cn(
    "grid",
    !adaptive && getGridClass(currentColumns),
    currentGap,
    autoRows && "grid-rows-auto",
    // Touch optimizations
    isTouch && "touch-none",
    // Device-specific optimizations
    deviceInfo.type === 'mobile' && "will-change-scroll",
    className
  );

  return (
    <div 
      className={gridClasses}
      style={adaptiveStyle}
    >
      {children}
    </div>
  );
};

// Auto-responsive grid that calculates optimal columns
export const AutoGrid: React.FC<{
  children: React.ReactNode;
  className?: string;
  minItemWidth?: number;
  maxColumns?: number;
  gap?: string;
}> = ({
  children,
  className,
  minItemWidth = 250,
  maxColumns = 6,
  gap = "gap-4",
}) => {
  const { width } = useResponsive();

  const calculatedColumns = Math.min(
    maxColumns,
    Math.floor(width / minItemWidth) || 1
  );

  return (
    <ResponsiveGrid
      columns={{ fallback: calculatedColumns }}
      gap={{ fallback: gap }}
      className={className}
    >
      {children}
    </ResponsiveGrid>
  );
};

// Masonry-like grid
export const MasonryGrid: React.FC<{
  children: React.ReactNode;
  className?: string;
  columnWidth?: string;
}> = ({
  children,
  className,
  columnWidth = "250px",
}) => {
  const { deviceInfo } = useResponsive();

  return (
    <div
      className={cn(
        "columns-1 xs:columns-2 md:columns-3 lg:columns-4 xl:columns-5",
        deviceInfo.type === 'mobile' && "columns-1 mobile-m:columns-2",
        className
      )}
      style={{
        columnWidth,
        columnGap: "1rem",
        columnFill: "balance",
      }}
    >
      {React.Children.map(children, (child, index) => (
        <div 
          key={index} 
          className="break-inside-avoid mb-4 inline-block w-full"
        >
          {child}
        </div>
      ))}
    </div>
  );
};