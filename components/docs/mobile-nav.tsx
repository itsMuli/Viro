"use client";

import * as React from "react";
import { X } from "lucide-react";
import { Sidebar } from "@/components/docs/sidebar";
import { Button } from "@/components/ui/button";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity animate-in fade-in"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="relative w-4/5 max-w-xs bg-background border-r border-border p-6 shadow-2xl flex flex-col z-50 animate-in slide-in-from-left duration-200">
        <div className="flex items-center justify-between pb-4 border-b border-border/40 mb-6">
          <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider">
            <span className="flex h-5 w-5 items-center justify-center rounded-[3px] bg-foreground text-background">
              V
            </span>
            VIRO UI
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8 text-muted-foreground"
            aria-label="Close navigation"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto pr-1">
          <Sidebar onItemClick={onClose} />
        </div>
      </div>
    </div>
  );
}
