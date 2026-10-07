"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "default"
    | "secondary"
    | "outline"
    | "ghost"
    | "destructive"
    | "link";
  size?: "sm" | "md" | "lg" | "icon";
  asChild?: boolean;
  isLoading?: boolean;
}

const variantStyles: Record<NonNullable<ButtonProps["variant"]>, string> = {
  default:
    "bg-foreground text-background hover:opacity-90 active:scale-[0.98] border border-transparent shadow-sm",
  secondary:
    "bg-secondary text-secondary-foreground hover:bg-secondary/80 active:scale-[0.98] border border-border/40",
  outline:
    "border border-border bg-transparent text-foreground hover:bg-secondary/60 hover:border-foreground/40 active:scale-[0.98]",
  ghost:
    "text-foreground hover:bg-secondary/60 active:scale-[0.98]",
  destructive:
    "bg-destructive text-destructive-foreground hover:opacity-90 active:scale-[0.98] border border-border/20",
  link:
    "text-foreground underline-offset-4 hover:underline p-0 h-auto font-normal",
};

const sizeStyles: Record<NonNullable<ButtonProps["size"]>, string> = {
  sm: "h-8 px-3 text-xs tracking-tight rounded-[5px] gap-1.5",
  md: "h-9 px-4 text-xs font-medium tracking-tight rounded-[6px] gap-2",
  lg: "h-11 px-5 text-sm font-medium tracking-tight rounded-[6px] gap-2.5",
  icon: "h-9 w-9 p-0 rounded-[6px] justify-center items-center shrink-0",
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "md",
      asChild = false,
      isLoading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const classes = cn(
      "inline-flex items-center justify-center whitespace-nowrap transition-all duration-150 select-none cursor-pointer",
      "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1",
      "disabled:pointer-events-none disabled:opacity-40 disabled:cursor-not-allowed",
      variantStyles[variant],
      sizeStyles[size],
      className
    );

    if (asChild) {
      return (
        <Slot ref={ref as any} className={classes} {...props}>
          {children}
        </Slot>
      );
    }

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={classes}
        {...props}
      >
        {isLoading && (
          <Loader2 className="h-3.5 w-3.5 animate-spin shrink-0" />
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
