import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-medium tracking-wide transition-colors",
  {
    variants: {
      variant: {
        default: "border-white/10 bg-white/[0.06] text-foreground/90",
        success:
          "border-emerald-400/30 bg-emerald-400/10 text-emerald-300",
        warning:
          "border-amber-400/30 bg-amber-400/10 text-amber-300",
        danger: "border-rose-400/30 bg-rose-400/10 text-rose-300",
        accent: "border-aurora-cyan/30 bg-aurora-cyan/10 text-aurora-cyan",
        gold: "border-gold/30 bg-gold/10 text-gold-soft",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
