"use client";

import * as React from "react";
import {
  Activity,
  ArrowRight,
  Calendar as CalendarIcon,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock,
  Layers,
  Lock,
  Search,
  Server,
  Sparkles,
  Terminal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { DatePicker } from "@/components/ui/date-picker";

export function InteractiveDemo() {
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(undefined);
  const [isDeploying, setIsDeploying] = React.useState(false);
  const [isDeployed, setIsDeployed] = React.useState(false);
  const [autoScale, setAutoScale] = React.useState(true);
  const [edgeCache, setEdgeCache] = React.useState(true);

  React.useEffect(() => {
    setSelectedDate(new Date(2026, 9, 12));
  }, []);

  const handleDeploy = () => {
    setIsDeploying(true);
    setTimeout(() => {
      setIsDeploying(false);
      setIsDeployed(true);
      setTimeout(() => setIsDeployed(false), 3000);
    }, 1200);
  };

  return (
    <section className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pb-20">
      <div className="rounded-[10px] border border-border/80 bg-card p-2 sm:p-4 shadow-2xl overflow-hidden">
        {/* Window Chrome Header */}
        <div className="flex items-center justify-between border-b border-border/60 pb-3 px-3">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 opacity-60">
              <span className="h-2.5 w-2.5 rounded-full bg-border" />
              <span className="h-2.5 w-2.5 rounded-full bg-border" />
              <span className="h-2.5 w-2.5 rounded-full bg-border" />
            </div>
            <span className="text-[11px] font-mono text-muted-foreground ml-2">
              rose-console.app/dashboard
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Badge dot variant="outline" className="text-[10px]">
              System Operational
            </Badge>
          </div>
        </div>

        {/* Demo Content Matrix */}
        <div className="p-4 sm:p-6 bg-grid-subtle">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column: Deployment Controller */}
            <div className="lg:col-span-7 space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="font-mono text-sm">Release Orchestrator</CardTitle>
                    <Badge variant="secondary">Cluster-01</Badge>
                  </div>
                  <CardDescription>
                    Configure deployment schedules, compute scaling, and regional routes.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Environment / Branch selector */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[11px] font-mono text-muted-foreground">Target Branch</label>
                      <Input defaultValue="main (v1.4.0-rc2)" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-mono text-muted-foreground">Release Date</label>
                      <DatePicker date={selectedDate} onSelect={setSelectedDate} className="w-full max-w-full" />
                    </div>
                  </div>

                  {/* Toggle controls */}
                  <div className="rounded-[6px] border border-border/60 p-3 space-y-3 bg-secondary/20">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs font-medium">Elastic Autoscaling</div>
                        <div className="text-[11px] text-muted-foreground">Scale from 2 to 64 instances on load spikes</div>
                      </div>
                      <Switch checked={autoScale} onCheckedChange={setAutoScale} />
                    </div>
                    <div className="flex items-center justify-between border-t border-border/40 pt-2.5">
                      <div>
                        <div className="text-xs font-medium">Edge Cache Warming</div>
                        <div className="text-[11px] text-muted-foreground">Pre-populate CDN endpoints across 320 cities</div>
                      </div>
                      <Switch checked={edgeCache} onCheckedChange={setEdgeCache} />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="justify-between pt-3">
                  <span className="text-[11px] font-mono text-muted-foreground">
                    Target: Production Global
                  </span>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">Simulate</Button>
                    <Button
                      size="sm"
                      isLoading={isDeploying}
                      onClick={handleDeploy}
                      disabled={isDeployed}
                    >
                      {isDeployed ? (
                        <>
                          <Check className="h-3.5 w-3.5 mr-1" />
                          Deployed
                        </>
                      ) : (
                        "Trigger Deployment"
                      )}
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </div>

            {/* Right Column: Live Telemetry & Quick Inspector */}
            <div className="lg:col-span-5 space-y-4">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="font-mono text-sm">Cluster Status</CardTitle>
                    <span className="font-mono text-[10px] text-muted-foreground">LIVE</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3 pt-0">
                  <div className="p-2.5 rounded-[4px] border border-border/40 bg-secondary/30 space-y-2 font-mono text-[11px]">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Uptime</span>
                      <span className="font-semibold text-foreground">99.994%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Global P99</span>
                      <span className="font-semibold text-foreground">11.8ms</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">TLS Cert</span>
                      <span className="font-semibold text-foreground">Valid (RSA 4096)</span>
                    </div>
                  </div>

                  <Tabs defaultValue="builds">
                    <TabsList className="grid grid-cols-2 w-full">
                      <TabsTrigger value="builds">Builds</TabsTrigger>
                      <TabsTrigger value="telemetry">Telemetry</TabsTrigger>
                    </TabsList>
                    <TabsContent value="builds" className="pt-2">
                      <div className="text-[11px] font-mono text-muted-foreground space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-foreground">#1890 · commit 78a9c</span>
                          <span className="text-muted-foreground">2m ago</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-foreground">#1889 · commit bb31f</span>
                          <span className="text-muted-foreground">41m ago</span>
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="telemetry" className="pt-2">
                      <div className="text-[11px] font-mono text-muted-foreground">
                        All telemetry queues draining normally.
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
