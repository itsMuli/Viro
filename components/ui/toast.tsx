"use client";

import * as React from "react";
import { Check, Info, X, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Toast {
  id: string;
  title: string;
  description?: string;
  variant?: "default" | "success" | "destructive" | "info";
  duration?: number;
}

interface ToastContextType {
  toasts: Toast[];
  toast: (options: Omit<Toast, "id">) => void;
  dismiss: (id: string) => void;
}

const ToastContext = React.createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<Toast[]>([]);

  const dismiss = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = React.useCallback(
    ({ title, description, variant = "default", duration = 4000 }: Omit<Toast, "id">) => {
      const id = Math.random().toString(36).substring(2, 9);
      const newToast: Toast = { id, title, description, variant, duration };

      setToasts((prev) => [...prev, newToast]);

      if (duration > 0) {
        setTimeout(() => {
          dismiss(id);
        }, duration);
      }
    },
    [dismiss]
  );

  return (
    <ToastContext.Provider value={{ toasts, toast, dismiss }}>
      {children}
      {/* Toast Viewport Fixed Container */}
      <div
        aria-live="polite"
        className="fixed bottom-4 right-4 z-50 flex max-w-sm flex-col gap-2 pointer-events-none"
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            role="status"
            className={cn(
              "pointer-events-auto flex items-start gap-3 rounded-[6px] border p-3.5 shadow-xl transition-all duration-200 animate-in slide-in-from-bottom-3",
              t.variant === "destructive"
                ? "border-destructive bg-card text-foreground"
                : "border-border bg-card text-card-foreground"
            )}
          >
            {/* Status Icon */}
            <div className="mt-0.5 shrink-0">
              {t.variant === "success" && (
                <div className="flex h-4 w-4 items-center justify-center rounded-full bg-foreground text-background">
                  <Check className="h-2.5 w-2.5 stroke-[3]" />
                </div>
              )}
              {t.variant === "destructive" && (
                <div className="flex h-4 w-4 items-center justify-center rounded-full bg-foreground text-background">
                  <X className="h-2.5 w-2.5 stroke-[3]" />
                </div>
              )}
              {(t.variant === "default" || t.variant === "info") && (
                <div className="flex h-4 w-4 items-center justify-center rounded-full border border-foreground/40 text-foreground">
                  <Info className="h-2.5 w-2.5" />
                </div>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 space-y-0.5 min-w-0">
              <div className="text-xs font-semibold tracking-tight text-foreground font-mono">
                {t.title}
              </div>
              {t.description && (
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  {t.description}
                </p>
              )}
            </div>

            {/* Dismiss */}
            <button
              type="button"
              onClick={() => dismiss(t.id)}
              className="text-muted-foreground hover:text-foreground p-0.5 transition-colors"
              aria-label="Dismiss toast"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
