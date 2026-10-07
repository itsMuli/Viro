import Link from "next/link";
import { ArrowRight, Layers, ShieldCheck, Terminal, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export function BlocksPreview() {
  const blockItems = [
    {
      title: "Authentication Cards",
      description: "Magic link input, social OAuth providers, OTP input, and monochrome terms notice.",
      category: "Auth",
      badge: "Production Ready",
    },
    {
      title: "Infrastructure Telemetry",
      description: "Resource graphs, P99 latency cards, health status pills, and edge routing indicators.",
      category: "Dashboard",
      badge: "Real-time",
    },
    {
      title: "Workspace Security Panel",
      description: "Hardware key enforcement toggles, audit stream configurations, and token rotation.",
      category: "Settings",
      badge: "Enterprise",
    },
  ];

  return (
    <section className="py-20 border-t border-border/40 bg-secondary/10">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground font-semibold">
              Blocks
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground font-mono">
              Ready-to-Ship Compositions
            </h2>
            <p className="text-sm text-muted-foreground">
              Higher-order interface sections built strictly with ROSE UI primitives.
            </p>
          </div>
          <Button asChild size="sm" className="font-mono text-xs">
            <Link href="/blocks" className="flex items-center gap-1.5">
              <span>Explore All Blocks</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blockItems.map((block, i) => (
            <Card key={i} className="hover:border-foreground/30 transition-colors">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-[10px] font-mono">
                    {block.category}
                  </Badge>
                  <span className="text-[10px] font-mono text-muted-foreground">
                    {block.badge}
                  </span>
                </div>
                <CardTitle className="font-mono text-sm pt-2">{block.title}</CardTitle>
                <CardDescription className="text-xs">{block.description}</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <Link
                  href="/docs/blocks"
                  className="inline-flex items-center gap-1 text-xs font-mono text-foreground hover:underline font-medium"
                >
                  <span>Preview Block</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
