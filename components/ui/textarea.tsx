import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  isError?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, isError, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-[6px] border border-input bg-background/50 px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground/60 transition-colors",
          "hover:border-foreground/30 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:border-foreground",
          "disabled:cursor-not-allowed disabled:opacity-40",
          isError && "border-destructive focus-visible:ring-destructive",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
