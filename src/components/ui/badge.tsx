import React from 'react';
import { cn } from '../../lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'outline';
}

/**
 * Atomic Badge component for status indicators, tags, and labels.
 */
const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', children, ...props }, ref) => {
    const variants = {
      default: "bg-white/[0.03] text-zinc-300 border-white/8",
      primary: "bg-primary/[0.12] text-primary border-primary/[0.25]",
      success: "bg-primary/[0.08] text-zinc-100 border-primary/[0.2]",
      warning: "bg-accent/[0.1] text-accent border-accent/[0.24]",
      outline: "bg-transparent border-white/10 text-zinc-300",
    };

    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[11px] font-code uppercase tracking-[0.18em]",
          variants[variant],
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

export { Badge };
