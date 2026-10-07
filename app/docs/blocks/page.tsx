"use client";

import * as React from "react";
import {
  Activity,
  ArrowUpRight,
  Check,
  CreditCard,
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
} from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function BlocksPage() {
  return (
    <div className="space-y-12 max-w-4xl">
      {/* Page Title */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Badge variant="outline" dot>Pre-composed</Badge>
          <span className="text-[11px] font-mono text-muted-foreground">Production Patterns</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground font-mono">
          UI Blocks
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Comprehensive, production-ready interface patterns constructed entirely using VIRO UI primitives.
          Copy and drop straight into your SaaS, internal tools, or developer products.
        </p>
      </div>

      {/* Block 1: Developer Authentication Block */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-border/60 pb-2">
          <div>
            <h2 className="text-base font-semibold text-foreground font-mono">
              01. Developer Authentication
            </h2>
            <p className="text-xs text-muted-foreground">
              Minimal login card with OAuth providers, magic link email, and monochrome focus states.
            </p>
          </div>
          <Badge variant="secondary">Authentication</Badge>
        </div>

        <div className="rounded-[8px] border border-border/80 bg-grid-subtle p-8 flex items-center justify-center">
          <Card className="w-full max-w-sm shadow-xl">
            <CardHeader className="text-center space-y-1">
              <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-[4px] bg-foreground text-background font-mono font-bold text-sm">
                V
              </div>
              <CardTitle className="text-base font-mono">Welcome to Viro</CardTitle>
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
              <Button className="w-full">Continue with Magic Link</Button>

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

      {/* Block 2: Infrastructure Metrics Dashboard */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-border/60 pb-2">
          <div>
            <h2 className="text-base font-semibold text-foreground font-mono">
              02. Infrastructure Overview
            </h2>
            <p className="text-xs text-muted-foreground">
              Technical telemetry grid with live throughput stats, resource distribution, and region status.
            </p>
          </div>
          <Badge variant="secondary">Dashboard</Badge>
        </div>

        <div className="rounded-[8px] border border-border/80 bg-grid-subtle p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="p-4 pb-2">
                <div className="flex items-center justify-between text-muted-foreground">
                  <span className="text-xs font-mono">Global Requests</span>
                  <Activity className="h-4 w-4" />
                </div>
                <div className="text-2xl font-bold font-mono tracking-tight text-foreground mt-1">
                  12.4M
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-muted-foreground">
                  <span className="text-foreground font-semibold">↑ +8.2%</span> vs last hour
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="p-4 pb-2">
                <div className="flex items-center justify-between text-muted-foreground">
                  <span className="text-xs font-mono">Active Clusters</span>
                  <Server className="h-4 w-4" />
                </div>
                <div className="text-2xl font-bold font-mono tracking-tight text-foreground mt-1">
                  48 / 48
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-muted-foreground">
                  <Badge dot variant="outline" className="text-[10px] py-0 px-1.5">100% Health</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="p-4 pb-2">
                <div className="flex items-center justify-between text-muted-foreground">
                  <span className="text-xs font-mono">P99 Latency</span>
                  <Shield className="h-4 w-4" />
                </div>
                <div className="text-2xl font-bold font-mono tracking-tight text-foreground mt-1">
                  14.2ms
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-muted-foreground">
                  Edge routing active
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Block 3: Security & Telemetry Settings */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-border/60 pb-2">
          <div>
            <h2 className="text-base font-semibold text-foreground font-mono">
              03. Workspace Security Panel
            </h2>
            <p className="text-xs text-muted-foreground">
              Form pattern featuring binary switches, API token revoke workflows, and confirmation triggers.
            </p>
          </div>
          <Badge variant="secondary">Settings</Badge>
        </div>

        <div className="rounded-[8px] border border-border/80 bg-grid-subtle p-8 flex items-center justify-center">
          <Card className="w-full max-w-lg">
            <CardHeader>
              <CardTitle>Security Configuration</CardTitle>
              <CardDescription>
                Configure multi-factor authentication and token rotation rules for your organization.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 divide-y divide-border/40">
              <div className="flex items-center justify-between pt-2">
                <div className="space-y-0.5">
                  <div className="text-xs font-semibold">Enforce Hardware Keys</div>
                  <div className="text-[11px] text-muted-foreground">Require WebAuthn or FIDO2 keys for all admins.</div>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between pt-4">
                <div className="space-y-0.5">
                  <div className="text-xs font-semibold">Audit Log Export</div>
                  <div className="text-[11px] text-muted-foreground">Stream syslog events directly to AWS S3.</div>
                </div>
                <Switch />
              </div>

              <div className="flex items-center justify-between pt-4">
                <div className="space-y-0.5">
                  <div className="text-xs font-semibold">Automatic Session Invalidation</div>
                  <div className="text-[11px] text-muted-foreground">Expire inactive CLI sessions after 12 hours.</div>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
            <CardFooter className="justify-end gap-2">
              <Button variant="outline" size="sm">Reset Defaults</Button>
              <Button size="sm">Save Changes</Button>
            </CardFooter>
          </Card>
        </div>
      </section>
    </div>
  );
}
