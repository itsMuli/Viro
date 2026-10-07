import * as React from "react";
import { Info, AlertCircle, CheckCircle2, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "destructive" | "success" | "warning";
  icon?: React.ReactNode;
}

const alertVariants = {
  default: "border-border bg-card text-foreground",
  destructive: "border-destructive/40 bg-destructive/5 text-foreground",
  success: "border-border/80 bg-secondary/40 text-foreground",
  warning: "border-border bg-secondary/30 text-foreground",
};

const defaultIcons = {
  default: <Info className="h-4 w-4 shrink-0 text-foreground" />,
  destructive: <AlertCircle className="h-4 w-4 shrink-0 text-foreground" />,
  success: <CheckCircle2 className="h-4 w-4 shrink-0 text-foreground" />,
  warning: <AlertTriangle className="h-4 w-4 shrink-0 text-foreground" />,
};

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = "default", icon, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="alert"
        className={cn(
          "relative flex w-full items-start gap-3 rounded-[6px] border p-4 text-xs shadow-xs",
          alertVariants[variant],
          className
        )}
        {...props}
      >
        <div className="mt-0.5">{icon || defaultIcons[variant]}</div>
        <div className="flex-1 space-y-1 min-w-0">{children}</div>
      </div>
    );
  }
);
Alert.displayName = "Alert";

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("font-mono font-semibold tracking-tight leading-none text-foreground text-xs", className)}
    {...props}
  />
));
AlertTitle.displayName = "AlertTitle";

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-muted-foreground leading-relaxed text-[11px]", className)}
    {...props}
  />
));
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };
