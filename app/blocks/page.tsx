"use client";

import * as React from "react";
import Link from "next/link";
import {
  Activity,
  ArrowRight,
  Check,
  CreditCard,
  Download,
  Eye,
  Key,
  Layers,
  Lock,
  Mail,
  Search,
  Server,
  Shield,
  Sparkles,
  Terminal,
  User,
  Users,
} from "lucide-react";
import { Header } from "@/components/docs/header";
import { Footer } from "@/components/landing/footer";
import { GithubIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/toast";
import { cn } from "@/lib/utils";

type BlockCategory = "all" | "auth" | "dashboard" | "ecommerce" | "marketing" | "saas";

export default function BlocksPage() {
  const [selectedCategory, setSelectedCategory] = React.useState<BlockCategory>("all");
  const { toast } = useToast();

  const categories = [
    { id: "all", label: "All Blocks" },
    { id: "auth", label: "Authentication" },
    { id: "dashboard", label: "Dashboard" },
    { id: "ecommerce", label: "E-Commerce" },
    { id: "marketing", label: "Marketing & Pricing" },
    { id: "saas", label: "SaaS Settings" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        {/* Title */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Badge variant="outline" dot>Composition Library</Badge>
            <span className="text-[11px] font-mono text-muted-foreground">Pre-Assembled UI Patterns</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground font-mono">
            UI Blocks
          </h1>
          <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
            Higher-order interface compositions crafted strictly with ROSE UI primitives.
            Production-ready layouts for authentication, dashboards, checkout flows, and enterprise settings.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 border-b border-border/60 pb-3 overflow-x-auto">
          {categories.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setSelectedCategory(c.id as any)}
              className={cn(
                "rounded-[5px] px-3.5 py-1.5 text-xs font-mono transition-all whitespace-nowrap cursor-pointer select-none",
                selectedCategory === c.id
                  ? "bg-foreground text-background font-semibold shadow-xs"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
              )}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* ========================================================================= */}
        {/* BLOCK 1: AUTHENTICATION (Login & SSO) */}
        {/* ========================================================================= */}
        {(selectedCategory === "all" || selectedCategory === "auth") && (
          <section className="space-y-4">
            <div className="flex items-center justify-between border-b border-border/60 pb-2">
              <div>
                <h3 className="text-sm font-semibold text-foreground font-mono">
                  01. Developer Authentication & SSO
                </h3>
                <p className="text-xs text-muted-foreground">
                  Login card with magic link, OAuth button, and terms footer.
                </p>
              </div>
              <Badge variant="outline">Authentication</Badge>
            </div>

            <div className="rounded-[8px] border border-border/80 bg-grid-subtle p-8 flex items-center justify-center">
              <Card className="w-full max-w-sm shadow-xl">
                <CardHeader className="text-center space-y-1">
                  <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-[4px] bg-foreground text-background font-mono font-bold text-sm">
                    R
                  </div>
                  <CardTitle className="text-base font-mono">Welcome to ROSE</CardTitle>
                  <CardDescription>
                    Enter your work email to access the cloud console.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <Input
                      leftIcon={<Mail className="h-3.5 w-3.5" />}
                      placeholder="name@company.com"
                      type="email"
                    />
                  </div>
                  <Button
                    className="w-full"
                    onClick={() => {
                      toast({ title: "Magic link sent", description: "Check your email for the sign-in URL." });
                    }}
                  >
                    Continue with Magic Link
                  </Button>

                  <div className="relative py-2">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-border/60" />
                    </div>
                    <div className="relative flex justify-center text-[10px] uppercase font-mono">
                      <span className="bg-card px-2 text-muted-foreground">or continue with</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" size="sm" className="w-full gap-2 font-mono text-[11px]">
                      <GithubIcon className="h-3.5 w-3.5" />
                      GitHub
                    </Button>
                    <Button variant="outline" size="sm" className="w-full gap-2 font-mono text-[11px]">
                      <Key className="h-3.5 w-3.5" />
                      SSO Key
                    </Button>
                  </div>
                </CardContent>
                <CardFooter className="justify-center text-[11px] text-muted-foreground font-mono border-t-0 pt-0">
                  By clicking continue, you agree to our Terms.
                </CardFooter>
              </Card>
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* BLOCK 2: DASHBOARD (Metrics & Activity) */}
        {/* ========================================================================= */}
        {(selectedCategory === "all" || selectedCategory === "dashboard") && (
          <section className="space-y-4">
            <div className="flex items-center justify-between border-b border-border/60 pb-2">
              <div>
                <h3 className="text-sm font-semibold text-foreground font-mono">
                  02. Executive Metrics & Telemetry
                </h3>
                <p className="text-xs text-muted-foreground">
                  High-level KPI statistics, system health pills, and recent activity log.
                </p>
              </div>
              <Badge variant="outline">Dashboard</Badge>
            </div>

            <div className="rounded-[8px] border border-border/80 bg-grid-subtle p-6 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="p-4 space-y-1">
                  <div className="text-xs font-mono text-muted-foreground flex justify-between">
                    <span>Monthly Revenue</span>
                    <span className="text-foreground">↑ 14%</span>
                  </div>
                  <div className="text-2xl font-bold font-mono text-foreground">$128,450</div>
                  <div className="text-[10px] text-muted-foreground font-mono">+12 enterprise seats added</div>
                </Card>

                <Card className="p-4 space-y-1">
                  <div className="text-xs font-mono text-muted-foreground flex justify-between">
                    <span>Active Clusters</span>
                    <Badge dot variant="outline" className="text-[9px] py-0 px-1">100%</Badge>
                  </div>
                  <div className="text-2xl font-bold font-mono text-foreground">64 / 64</div>
                  <div className="text-[10px] text-muted-foreground font-mono">Zero degraded nodes</div>
                </Card>

                <Card className="p-4 space-y-1">
                  <div className="text-xs font-mono text-muted-foreground flex justify-between">
                    <span>Global P99</span>
                    <span className="text-foreground">11.4ms</span>
                  </div>
                  <div className="text-2xl font-bold font-mono text-foreground">14.2M req</div>
                  <div className="text-[10px] text-muted-foreground font-mono">Across 32 edge regions</div>
                </Card>

                <Card className="p-4 space-y-1">
                  <div className="text-xs font-mono text-muted-foreground flex justify-between">
                    <span>Open Alerts</span>
                    <Badge variant="secondary" className="text-[9px] py-0 px-1">0 Critical</Badge>
                  </div>
                  <div className="text-2xl font-bold font-mono text-foreground">2 Warnings</div>
                  <div className="text-[10px] text-muted-foreground font-mono">Log storage 82% threshold</div>
                </Card>
              </div>

              {/* Activity Timeline */}
              <Card>
                <CardHeader className="pb-3 border-b border-border/40">
                  <CardTitle className="font-mono text-xs uppercase tracking-wider">
                    Recent Infrastructure Events
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-3 font-mono text-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-foreground" />
                      <span className="text-foreground">Production build #2918 completed</span>
                    </div>
                    <span className="text-muted-foreground text-[11px]">2m ago</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-foreground" />
                      <span className="text-foreground">SSL certificate renewed for api.rose-ui.dev</span>
                    </div>
                    <span className="text-muted-foreground text-[11px]">18m ago</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-border" />
                      <span className="text-muted-foreground">Cache cleared on edge region ap-northeast-1</span>
                    </div>
                    <span className="text-muted-foreground text-[11px]">1h ago</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* BLOCK 3: MARKETING & PRICING */}
        {/* ========================================================================= */}
        {(selectedCategory === "all" || selectedCategory === "marketing") && (
          <section className="space-y-4">
            <div className="flex items-center justify-between border-b border-border/60 pb-2">
              <div>
                <h3 className="text-sm font-semibold text-foreground font-mono">
                  03. Clean Monochrome Pricing Matrix
                </h3>
                <p className="text-xs text-muted-foreground">
                  Tiered subscription cards with feature checklists and high-contrast call-to-actions.
                </p>
              </div>
              <Badge variant="outline">Marketing</Badge>
            </div>

            <div className="rounded-[8px] border border-border/80 bg-grid-subtle p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Free / Community */}
                <Card className="flex flex-col justify-between">
                  <CardHeader>
                    <Badge variant="outline" className="w-fit text-[10px]">Community</Badge>
                    <CardTitle className="font-mono text-lg pt-2">$0</CardTitle>
                    <CardDescription>Free forever for individuals & open source</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2 text-xs font-mono text-muted-foreground">
                    <div className="flex items-center gap-2 text-foreground"><Check className="h-3.5 w-3.5" /> Unlimited Components</div>
                    <div className="flex items-center gap-2 text-foreground"><Check className="h-3.5 w-3.5" /> Full TypeScript Source</div>
                    <div className="flex items-center gap-2 text-foreground"><Check className="h-3.5 w-3.5" /> Community Discord</div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full text-xs font-mono">Get Started</Button>
                  </CardFooter>
                </Card>

                {/* Team / Pro */}
                <Card className="border-foreground flex flex-col justify-between shadow-xl relative">
                  <div className="absolute -top-3 right-4">
                    <Badge variant="default" className="text-[10px]">Recommended</Badge>
                  </div>
                  <CardHeader>
                    <Badge variant="outline" className="w-fit text-[10px]">Team Pro</Badge>
                    <CardTitle className="font-mono text-lg pt-2">$29 <span className="text-xs text-muted-foreground font-normal">/ mo</span></CardTitle>
                    <CardDescription>Engineered for high-velocity software teams</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2 text-xs font-mono text-muted-foreground">
                    <div className="flex items-center gap-2 text-foreground"><Check className="h-3.5 w-3.5" /> All Community features</div>
                    <div className="flex items-center gap-2 text-foreground"><Check className="h-3.5 w-3.5" /> 50+ Pre-composed Blocks</div>
                    <div className="flex items-center gap-2 text-foreground"><Check className="h-3.5 w-3.5" /> Figma Master Tokens</div>
                    <div className="flex items-center gap-2 text-foreground"><Check className="h-3.5 w-3.5" /> Priority Support</div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full text-xs font-mono">Upgrade to Team</Button>
                  </CardFooter>
                </Card>

                {/* Enterprise */}
                <Card className="flex flex-col justify-between">
                  <CardHeader>
                    <Badge variant="outline" className="w-fit text-[10px]">Enterprise</Badge>
                    <CardTitle className="font-mono text-lg pt-2">Custom</CardTitle>
                    <CardDescription>Dedicated infrastructure and SLA guarantees</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2 text-xs font-mono text-muted-foreground">
                    <div className="flex items-center gap-2 text-foreground"><Check className="h-3.5 w-3.5" /> Custom Token Engine</div>
                    <div className="flex items-center gap-2 text-foreground"><Check className="h-3.5 w-3.5" /> 99.99% SLA Guarantee</div>
                    <div className="flex items-center gap-2 text-foreground"><Check className="h-3.5 w-3.5" /> Security & SOC2 Review</div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full text-xs font-mono">Contact Sales</Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* BLOCK 4: SAAS SETTINGS PANEL */}
        {/* ========================================================================= */}
        {(selectedCategory === "all" || selectedCategory === "saas") && (
          <section className="space-y-4">
            <div className="flex items-center justify-between border-b border-border/60 pb-2">
              <div>
                <h3 className="text-sm font-semibold text-foreground font-mono">
                  04. Workspace Security & Telemetry Panel
                </h3>
                <p className="text-xs text-muted-foreground">
                  Settings card with switches, credential rotation, and session timeout options.
                </p>
              </div>
              <Badge variant="outline">SaaS</Badge>
            </div>

            <div className="rounded-[8px] border border-border/80 bg-grid-subtle p-8 flex items-center justify-center">
              <Card className="w-full max-w-xl">
                <CardHeader>
                  <CardTitle className="font-mono text-sm">Workspace Controls</CardTitle>
                  <CardDescription>
                    Configure token rotation and compliance controls for your organization.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 divide-y divide-border/40">
                  <div className="flex items-center justify-between pt-2">
                    <div>
                      <div className="text-xs font-semibold text-foreground">Hardware Key Enforcement</div>
                      <div className="text-[11px] text-muted-foreground">Require WebAuthn or FIDO2 keys for all admins.</div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between pt-4">
                    <div>
                      <div className="text-xs font-semibold text-foreground">Audit Log Export</div>
                      <div className="text-[11px] text-muted-foreground">Stream syslog events directly to encrypted S3.</div>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between pt-4">
                    <div>
                      <div className="text-xs font-semibold text-foreground">Automatic Session Invalidation</div>
                      <div className="text-[11px] text-muted-foreground">Expire inactive CLI sessions after 12 hours.</div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
                <CardFooter className="justify-end gap-2">
                  <Button variant="outline" size="sm">Reset Defaults</Button>
                  <Button
                    size="sm"
                    onClick={() => {
                      toast({ title: "Settings saved", description: "Workspace preferences updated successfully." });
                    }}
                  >
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}
