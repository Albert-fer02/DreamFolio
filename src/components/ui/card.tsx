import React from 'react';
import { cn } from '../../lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass';
}

/**
 * Card container component with glassmorphism variant.
 * Uses composition pattern - compose with CardHeader, CardBody, etc.
 */
const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', children, ...props }, ref) => {
    const variants = {
      default: "rounded-3xl border border-white/8 bg-zinc-950/80 shadow-[0_18px_44px_rgba(0,0,0,0.3)]",
      glass: "glass rounded-[1.75rem]",
    };

    return (
      <div
        ref={ref}
        className={cn(variants[variant], "relative overflow-hidden", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

/**
 * Card header section
 */
const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("px-6 pt-6", className)} {...props} />
  )
);
CardHeader.displayName = 'CardHeader';

/**
 * Card body/content section
 */
const CardBody = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6", className)} {...props} />
  )
);
CardBody.displayName = 'CardBody';

/**
 * Card footer section
 */
const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("px-6 pb-6", className)} {...props} />
  )
);
CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardBody, CardFooter };
