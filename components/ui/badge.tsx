import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "outline" | "subtle" | "destructive";
  dot?: boolean;
}

const badgeVariants: Record<NonNullable<BadgeProps["variant"]>, string> = {
  default:
    "border-transparent bg-foreground text-background",
  secondary:
    "border-border/50 bg-secondary text-secondary-foreground",
  outline:
    "border-border text-foreground bg-transparent",
  subtle:
    "border-border/40 bg-secondary/50 text-muted-foreground",
  destructive:
    "border-destructive/30 bg-destructive/10 text-foreground",
};

function Badge({
  className,
  variant = "default",
  dot = false,
  children,
  ...props
}: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-medium tracking-tight transition-colors font-mono select-none",
        badgeVariants[variant],
        className
      )}
      {...props}
    >
      {dot && (
        <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse" />
      )}
      {children}
    </div>
  );
}

export { Badge };
