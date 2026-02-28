import React from 'react';
import { cn } from '../../lib/utils';
import { ArrowRight } from 'lucide-react';

export interface LinkButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  showArrow?: boolean;
}

/**
 * Styled anchor/link component for CTAs and navigation.
 * Includes optional arrow icon for action buttons.
 */
const LinkButton = React.forwardRef<HTMLAnchorElement, LinkButtonProps>(
  ({ className, variant = 'primary', size = 'md', showArrow = false, children, ...props }, ref) => {
    const variants = {
      primary: "bg-primary text-black border border-primary/40 shadow-[0_20px_55px_rgba(143,175,209,0.16)] hover:bg-[#a5bdd6] hover:-translate-y-0.5 hover:shadow-[0_24px_65px_rgba(143,175,209,0.24)]",
      secondary: "bg-accent/[0.04] border border-accent/[0.18] text-zinc-100 hover:text-white hover:bg-accent/[0.09] hover:border-accent/[0.28]",
      ghost: "text-zinc-400 hover:text-primary underline-offset-4 hover:underline",
    };

    const sizes = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-base",
      lg: "px-8 py-4 text-lg",
    };

    return (
      <a
        ref={ref}
        className={cn(
          "inline-flex items-center gap-2 font-display font-semibold rounded-full transition-all duration-300",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/[0.55] focus-visible:ring-offset-2 focus-visible:ring-offset-black",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {children}
        {showArrow && <ArrowRight className="w-4 h-4" aria-hidden="true" />}
      </a>
    );
  }
);

LinkButton.displayName = 'LinkButton';

export { LinkButton };
