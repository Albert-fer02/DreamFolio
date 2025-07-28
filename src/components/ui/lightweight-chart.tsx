"use client";

import { memo } from "react";
import { cn } from "@/lib/utils";

interface ProgressRingProps {
  progress: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  className?: string;
  showPercentage?: boolean;
  animate?: boolean;
}

export const ProgressRing = memo<ProgressRingProps>(({
  progress,
  size = 120,
  strokeWidth = 8,
  color = "hsl(var(--primary))",
  className,
  showPercentage = true,
  animate = true,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className={cn("relative inline-block", className)}>
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="hsl(var(--muted))"
          strokeWidth={strokeWidth}
          fill="transparent"
          className="opacity-30"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className={cn(
            "transition-all duration-1000 ease-out",
            animate && "animate-pulse"
          )}
        />
      </svg>
      
      {/* Center content */}
      {showPercentage && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              {progress}%
            </div>
            <div className="text-xs text-muted-foreground">
              complete
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

ProgressRing.displayName = "ProgressRing";

// Componente para múltiples rings (reemplaza PieChart)
interface MultiProgressRingProps {
  data: Array<{
    title: string;
    progress: number;
    color: string;
  }>;
  size?: number;
  className?: string;
}

export const MultiProgressRing = memo<MultiProgressRingProps>(({
  data,
  size = 120,
  className,
}) => {
  return (
    <div className={cn("grid grid-cols-2 lg:grid-cols-4 gap-8", className)}>
      {data.map((item, index) => (
        <div key={item.title} className="flex flex-col items-center gap-4">
          <ProgressRing
            progress={item.progress}
            size={size}
            color={item.color}
            animate={false}
          />
          <div className="text-center">
            <h3 className="font-semibold text-lg">{item.title}</h3>
          </div>
        </div>
      ))}
    </div>
  );
});

MultiProgressRing.displayName = "MultiProgressRing"; 