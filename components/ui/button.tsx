"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-aurora-cyan to-aurora-blue text-aurora-ink shadow-[0_8px_30px_-8px_rgba(94,234,212,0.6)] hover:shadow-[0_10px_40px_-8px_rgba(96,165,250,0.7)]",
        gold: "bg-gradient-to-r from-gold-soft to-gold text-aurora-ink shadow-[0_8px_30px_-10px_rgba(212,180,131,0.7)] hover:brightness-110",
        glass:
          "glass-soft text-foreground hover:bg-white/[0.09] border border-white/10",
        outline:
          "border border-white/15 bg-transparent text-foreground hover:bg-white/[0.06]",
        ghost: "text-foreground/80 hover:bg-white/[0.06] hover:text-foreground",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-8 px-3.5 text-xs",
        lg: "h-12 px-7 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
