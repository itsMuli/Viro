"use client";

import * as React from "react";
import { Check, Copy, Code2, Eye, RotateCcw } from "lucide-react";
import { CodeBlock } from "@/components/docs/code-block";
import { cn } from "@/lib/utils";

interface ComponentPreviewProps {
  children: React.ReactNode;
  code: string;
  title?: string;
  description?: string;
  className?: string;
  align?: "center" | "start" | "end";
}

export function ComponentPreview({
  children,
  code,
  title,
  description,
  className,
  align = "center",
}: ComponentPreviewProps) {
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">("preview");
  const [copied, setCopied] = React.useState(false);
  const [key, setKey] = React.useState(0);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  const handleReset = () => {
    setKey((prev) => prev + 1);
  };

  return (
    <div className="my-6 space-y-3">
      {(title || description) && (
        <div className="space-y-1">
          {title && (
            <h4 className="text-sm font-semibold tracking-tight text-foreground">
              {title}
            </h4>
          )}
          {description && (
            <p className="text-xs text-muted-foreground">{description}</p>
          )}
        </div>
      )}

      <div className="rounded-[8px] border border-border/80 overflow-hidden bg-card">
        {/* Toolbar */}
        <div className="flex items-center justify-between border-b border-border/60 bg-secondary/30 px-3 py-1.5 text-xs">
          {/* Preview / Code switcher */}
          <div className="flex items-center gap-1 rounded-[5px] bg-secondary/80 p-0.5 border border-border/40">
            <button
              type="button"
              onClick={() => setActiveTab("preview")}
              className={cn(
                "flex items-center gap-1.5 rounded-[4px] px-2.5 py-1 text-xs font-medium transition-all cursor-pointer",
                activeTab === "preview"
                  ? "bg-background text-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Eye className="h-3 w-3" />
              <span>Preview</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("code")}
              className={cn(
                "flex items-center gap-1.5 rounded-[4px] px-2.5 py-1 text-xs font-medium transition-all cursor-pointer",
                activeTab === "code"
                  ? "bg-background text-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Code2 className="h-3 w-3" />
              <span>Code</span>
            </button>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-1 text-muted-foreground">
            {activeTab === "preview" && (
              <button
                type="button"
                onClick={handleReset}
                title="Reset component state"
                className="flex h-7 w-7 items-center justify-center rounded-[4px] hover:text-foreground hover:bg-secondary transition-colors"
              >
                <RotateCcw className="h-3 w-3" />
              </button>
            )}
            <button
              type="button"
              onClick={handleCopy}
              className="flex items-center gap-1 rounded-[4px] px-2 py-1 text-xs hover:text-foreground hover:bg-secondary transition-colors"
            >
              {copied ? (
                <>
                  <Check className="h-3 w-3 stroke-[2.5]" />
                  <span className="text-[11px]">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="h-3 w-3" />
                  <span className="text-[11px]">Copy Code</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "preview" ? (
          <div
            key={key}
            className={cn(
              "min-h-[220px] p-8 flex items-center bg-grid-subtle relative",
              align === "center" && "justify-center",
              align === "start" && "justify-start",
              align === "end" && "justify-end",
              className
            )}
          >
            {children}
          </div>
        ) : (
          <div className="p-0">
            <CodeBlock code={code} className="border-0 rounded-none shadow-none" />
          </div>
        )}
      </div>
    </div>
  );
}
