import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-azure-solid to-azure-solid/80 text-white hover:from-azure-solid/90 hover:to-azure-solid/70 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5",
        destructive:
          "bg-gradient-to-r from-red-600 to-red-500 text-white hover:from-red-700 hover:to-red-600 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5",
        outline:
          "border border-azure-solid/30 bg-background/50 backdrop-blur-sm text-azure-solid hover:bg-azure-solid/10 hover:border-azure-solid/50 shadow-md hover:shadow-lg",
        secondary:
          "bg-gradient-to-r from-platinum-solid to-platinum-solid/80 text-gray-900 hover:from-platinum-solid/90 hover:to-platinum-solid/70 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5",
        ghost: "text-azure-solid hover:bg-azure-solid/10 hover:text-azure-solid/90",
        link: "text-azure-solid underline-offset-4 hover:underline hover:text-azure-solid/80",
        elegant: "bg-gradient-to-r from-azure-solid via-azure-solid/90 to-azure-solid/80 text-white font-semibold shadow-xl hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105",
        glass: "bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 hover:border-white/30 shadow-lg hover:shadow-xl",
        gold: "bg-gradient-to-r from-gold-solid to-gold-solid/80 text-gray-900 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 hover:scale-105",
        platinum: "bg-gradient-to-r from-white via-gray-100 to-gray-200 text-gray-900 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 hover:scale-105",
        pearl: "bg-gradient-to-r from-white/90 via-white/80 to-white/70 text-gray-900 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5",
        silver: "bg-gradient-to-r from-gray-200 via-gray-100 to-white text-gray-800 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5",
        ivory: "bg-gradient-to-r from-amber-50 via-yellow-50 to-orange-50 text-gray-800 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5",
        champagne: "bg-gradient-to-r from-yellow-100 via-amber-100 to-orange-100 text-gray-900 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5",
        cream: "bg-gradient-to-r from-stone-50 via-orange-50 to-amber-50 text-gray-800 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3 text-xs",
        lg: "h-12 rounded-lg px-8 py-3 text-base",
        xl: "h-14 rounded-xl px-10 py-4 text-lg font-semibold",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
