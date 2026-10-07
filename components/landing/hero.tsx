"use client";

import Link from "next/link";
import { ArrowRight, Terminal } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function Hero() {
  return (
    <section className="relative pt-20 pb-16 md:pt-28 md:pb-20 overflow-hidden">
      {/* Subtle top subtle grid gradient */}
      <div className="absolute inset-0 bg-grid-subtle opacity-60 pointer-events-none [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]" />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center space-y-8">
        {/* Release Pill */}
        <div className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-secondary/60 px-3 py-1 text-xs font-mono text-muted-foreground shadow-xs animate-in fade-in duration-500">
          <span className="flex h-1.5 w-1.5 rounded-full bg-foreground" />
          <span>ROSE UI Release 0.2</span>
          <span className="text-border">|</span>
          <Link
            href="/docs/installation"
            className="text-foreground hover:underline flex items-center gap-1"
          >
            <span>Getting Started</span>
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        {/* Hero Headline */}
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-foreground font-mono">
            ROSE UI
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl font-medium tracking-tight text-foreground/90 max-w-2xl mx-auto">
            Beautiful building blocks for modern interfaces.
          </p>
          <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
            A custom component system for React and Next.js. Accessible, composable, and designed to be owned.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Button asChild size="lg" className="px-6 font-mono text-xs">
            <Link href="/docs/components/button" className="flex items-center gap-2">
              <span>Explore Components</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            size="lg"
            className="px-6 font-mono text-xs gap-2"
          >
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
            >
              <GithubIcon className="h-3.5 w-3.5" />
              <span>GitHub</span>
            </a>
          </Button>
        </div>

        {/* Terminal Quick Copy */}
        <div className="pt-2">
          <div className="inline-flex items-center gap-2 rounded-[6px] border border-border/60 bg-secondary/40 px-3.5 py-1.5 text-xs font-mono text-muted-foreground shadow-xs">
            <Terminal className="h-3.5 w-3.5 text-foreground" />
            <span>npx rose-ui add button date-picker</span>
          </div>
        </div>
      </div>
    </section>
  );
}
