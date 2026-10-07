"use client";

import * as React from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  showLineNumbers?: boolean;
  className?: string;
}

export function CodeBlock({
  code,
  language = "tsx",
  filename,
  showLineNumbers = true,
  className,
}: CodeBlockProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  const lines = code.trim().split("\n");

  return (
    <div
      className={cn(
        "relative rounded-[6px] border border-border/80 bg-[#0c0c0e] text-[#ededed] overflow-hidden text-xs font-mono shadow-xs",
        className
      )}
    >
      {/* Code Header Bar */}
      <div className="flex items-center justify-between px-3.5 py-2 border-b border-white/10 bg-black/40 text-[11px] text-[#88888e]">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 opacity-60">
            <span className="h-2 w-2 rounded-full bg-[#333]" />
            <span className="h-2 w-2 rounded-full bg-[#333]" />
            <span className="h-2 w-2 rounded-full bg-[#333]" />
          </div>
          {filename && (
            <span className="ml-1 text-white/70 font-mono tracking-tight text-[11px]">
              {filename}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className="uppercase text-[10px] text-white/40 tracking-wider">
            {language}
          </span>
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1.5 rounded-[4px] px-2 py-0.5 text-[11px] text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Copy code to clipboard"
          >
            {copied ? (
              <>
                <Check className="h-3 w-3 text-white stroke-[2.5]" />
                <span className="text-[10px]">Copied</span>
              </>
            ) : (
              <>
                <Copy className="h-3 w-3 stroke-[2]" />
                <span className="text-[10px]">Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code Body */}
      <div className="overflow-x-auto p-4 max-h-[460px]">
        <pre className="flex text-[12px] leading-relaxed">
          {showLineNumbers && (
            <div className="select-none pr-4 text-right text-white/20 font-mono border-r border-white/5 mr-4 flex flex-col shrink-0">
              {lines.map((_, i) => (
                <span key={i}>{i + 1}</span>
              ))}
            </div>
          )}
          <code className="text-[#ededed] flex-1 font-mono tracking-tight">
            {lines.map((line, i) => (
              <div key={i} className="whitespace-pre">
                {highlightLine(line)}
              </div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
}

// Lightweight syntax colorizer tuned for a minimalist monochrome/technical aesthetic
function highlightLine(line: string): React.ReactNode {
  if (line.trim().startsWith("//") || line.trim().startsWith("/*")) {
    return <span className="text-[#66666e] italic">{line}</span>;
  }
  
  // Highlight keywords and imports
  const parts = line.split(/(\b(?:import|export|from|default|const|let|var|function|return|interface|type|extends|as|boolean|string|number|true|false|null|undefined)\b|[{}<>()=[\]]|"[^"]*"|'[^']*'|`[^`]*`)/g);

  return parts.map((part, index) => {
    if (/^(import|export|from|default|const|let|var|function|return|interface|type|extends|as)$/.test(part)) {
      return <span key={index} className="text-[#ffffff] font-semibold">{part}</span>;
    }
    if (/^(boolean|string|number|true|false|null|undefined)$/.test(part)) {
      return <span key={index} className="text-[#a0a0a8]">{part}</span>;
    }
    if (/^["'`].*["'`]$/.test(part)) {
      return <span key={index} className="text-[#c4c4c8]">{part}</span>;
    }
    if (/^[{}<>()=[\]]$/.test(part)) {
      return <span key={index} className="text-[#757580]">{part}</span>;
    }
    return part;
  });
}
