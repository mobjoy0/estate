import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function Stat({
  icon: Icon,
  label,
  value,
  className,
  accent,
}: {
  icon?: LucideIcon;
  label: string;
  value: string;
  className?: string;
  accent?: boolean;
}) {
  return (
    <div
      className={cn(
        "glass-soft rounded-xl p-3 transition-colors hover:bg-white/[0.07]",
        className
      )}
    >
      <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
        {Icon && <Icon className="h-3.5 w-3.5" />}
        {label}
      </div>
      <div
        className={cn(
          "mt-1 font-display text-lg font-semibold tracking-tight",
          accent ? "text-gradient" : "text-foreground"
        )}
      >
        {value}
      </div>
    </div>
  );
}
