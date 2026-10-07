"use client";

import * as React from "react";
import {
  Check,
  Copy,
  Layers,
  RotateCcw,
  Sliders,
  Sparkles,
  Terminal,
} from "lucide-react";
import { Header } from "@/components/docs/header";
import { Footer } from "@/components/landing/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { DatePicker } from "@/components/ui/date-picker";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { CodeBlock } from "@/components/docs/code-block";
import { useToast } from "@/components/ui/toast";
import { cn } from "@/lib/utils";

type LabComponent = "button" | "input" | "badge" | "card" | "date-picker" | "tabs";

export default function LabPage() {
  const [selectedComp, setSelectedComp] = React.useState<LabComponent>("button");
  const { toast } = useToast();

  // General controls
  const [radiusIndex, setRadiusIndex] = React.useState<number>(2); // 0=0px, 1=4px, 2=6px, 3=8px, 4=12px, 5=9999px
  const radiusValues = ["0px", "4px", "6px", "8px", "12px", "9999px"];
  const radiusClasses = ["rounded-none", "rounded-[4px]", "rounded-[6px]", "rounded-[8px]", "rounded-[12px]", "rounded-full"];

  // Button controls
  const [btnVariant, setBtnVariant] = React.useState<"default" | "secondary" | "outline" | "ghost" | "destructive" | "link">("default");
  const [btnSize, setBtnSize] = React.useState<"sm" | "md" | "lg">("md");
  const [btnText, setBtnText] = React.useState("Continue to Deploy");
  const [btnLoading, setBtnLoading] = React.useState(false);
  const [btnDisabled, setBtnDisabled] = React.useState(false);

  // Input controls
  const [inputPlaceholder, setInputPlaceholder] = React.useState("Search packages...");
  const [inputError, setInputError] = React.useState(false);
  const [inputDisabled, setInputDisabled] = React.useState(false);

  // Badge controls
  const [badgeVariant, setBadgeVariant] = React.useState<"default" | "secondary" | "outline" | "subtle" | "destructive">("default");
  const [badgeDot, setBadgeDot] = React.useState(true);
  const [badgeText, setBadgeText] = React.useState("Production Ready");

  // DatePicker state
  const [date, setDate] = React.useState<Date | undefined>(undefined);
  React.useEffect(() => {
    setDate(new Date(2026, 9, 12));
  }, []);

  // Generated code string computation
  const generatedCode = React.useMemo(() => {
    const radiusStyle = radiusIndex !== 2 ? ` className="${radiusClasses[radiusIndex]}"` : "";

    switch (selectedComp) {
      case "button": {
        const props: string[] = [];
        if (btnVariant !== "default") props.push(`variant="${btnVariant}"`);
        if (btnSize !== "md") props.push(`size="${btnSize}"`);
        if (btnLoading) props.push("isLoading");
        if (btnDisabled) props.push("disabled");
        if (radiusStyle) props.push(radiusStyle.trim());
        const propsStr = props.length > 0 ? " " + props.join(" ") : "";
        return `<Button${propsStr}>
  ${btnText}
</Button>`;
      }
      case "input": {
        const props: string[] = [`placeholder="${inputPlaceholder}"`];
        if (inputError) props.push("isError");
        if (inputDisabled) props.push("disabled");
        if (radiusStyle) props.push(radiusStyle.trim());
        return `<Input ${props.join(" ")} />`;
      }
      case "badge": {
        const props: string[] = [];
        if (badgeVariant !== "default") props.push(`variant="${badgeVariant}"`);
        if (badgeDot) props.push("dot");
        if (radiusStyle) props.push(radiusStyle.trim());
        const propsStr = props.length > 0 ? " " + props.join(" ") : "";
        return `<Badge${propsStr}>
  ${badgeText}
</Badge>`;
      }
      case "card":
        return `<Card${radiusStyle}>
  <CardHeader>
    <CardTitle>Autonomous Agent</CardTitle>
    <CardDescription>Real-time reasoning stream</CardDescription>
  </CardHeader>
  <CardContent>
    <p className="text-xs font-mono">Status: Active (14ms)</p>
  </CardContent>
  <CardFooter>
    <Button size="sm">Resume</Button>
  </CardFooter>
</Card>`;
      case "date-picker":
        return `<DatePicker
  placeholder="Select date"
/>`;
      case "tabs":
        return `<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Overview</TabsTrigger>
    <TabsTrigger value="tab2">Analytics</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Content A</TabsContent>
  <TabsContent value="tab2">Content B</TabsContent>
</Tabs>`;
      default:
        return "";
    }
  }, [
    selectedComp,
    btnVariant,
    btnSize,
    btnText,
    btnLoading,
    btnDisabled,
    inputPlaceholder,
    inputError,
    inputDisabled,
    badgeVariant,
    badgeDot,
    badgeText,
    radiusIndex,
  ]);

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(generatedCode);
      toast({
        title: "Code copied",
        description: "Component JSX snippet copied to clipboard.",
        variant: "success",
      });
    } catch {
      // fallback
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {/* Lab Header */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Badge variant="outline" dot>Component Studio</Badge>
            <span className="text-[11px] font-mono text-muted-foreground">Interactive Design Token Lab</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground font-mono">
            Component Lab
          </h1>
          <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
            Interactively configure variants, sizes, border radiuses, and states in real-time.
            Inspect the live rendered element and copy the clean generated JSX.
          </p>
        </div>

        {/* Component Selector Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-border/60">
          {(["button", "input", "badge", "card", "date-picker", "tabs"] as LabComponent[]).map((comp) => (
            <button
              key={comp}
              type="button"
              onClick={() => setSelectedComp(comp)}
              className={cn(
                "rounded-[5px] px-3 py-1.5 text-xs font-mono capitalize transition-all select-none cursor-pointer whitespace-nowrap",
                selectedComp === comp
                  ? "bg-foreground text-background font-semibold shadow-xs"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
              )}
            >
              {comp.replace("-", " ")}
            </button>
          ))}
        </div>

        {/* Studio Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Controls Panel (Left) */}
          <div className="lg:col-span-5 rounded-[8px] border border-border/80 bg-card p-5 space-y-5 text-xs">
            <div className="flex items-center justify-between border-b border-border/60 pb-3">
              <div className="flex items-center gap-2">
                <Sliders className="h-4 w-4 text-muted-foreground" />
                <h3 className="font-mono font-semibold text-foreground uppercase tracking-wider text-xs">
                  Configuration
                </h3>
              </div>
              <span className="text-[10px] font-mono text-muted-foreground uppercase">
                {selectedComp}
              </span>
            </div>

            {/* Radius Slider (Universal) */}
            <div className="space-y-2">
              <div className="flex justify-between font-mono text-[11px]">
                <span className="text-muted-foreground">Border Radius</span>
                <span className="text-foreground font-semibold">{radiusValues[radiusIndex]}</span>
              </div>
              <input
                type="range"
                min="0"
                max="5"
                step="1"
                value={radiusIndex}
                onChange={(e) => setRadiusIndex(parseInt(e.target.value))}
                className="w-full accent-foreground cursor-pointer"
              />
              <div className="flex justify-between text-[9px] font-mono text-muted-foreground/60 px-0.5">
                <span>0px</span>
                <span>4px</span>
                <span>6px</span>
                <span>8px</span>
                <span>12px</span>
                <span>Pill</span>
              </div>
            </div>

            {/* Component-Specific Controls */}
            {selectedComp === "button" && (
              <div className="space-y-4 pt-2 border-t border-border/40 font-mono">
                <div>
                  <label className="block text-muted-foreground mb-1 text-[11px]">Variant</label>
                  <select
                    value={btnVariant}
                    onChange={(e) => setBtnVariant(e.target.value as any)}
                    className="w-full h-8 rounded-[4px] border border-input bg-card px-2 text-xs text-foreground focus:ring-1 focus:ring-ring outline-none"
                  >
                    <option value="default">Default</option>
                    <option value="secondary">Secondary</option>
                    <option value="outline">Outline</option>
                    <option value="ghost">Ghost</option>
                    <option value="destructive">Destructive</option>
                    <option value="link">Link</option>
                  </select>
                </div>

                <div>
                  <label className="block text-muted-foreground mb-1 text-[11px]">Size</label>
                  <select
                    value={btnSize}
                    onChange={(e) => setBtnSize(e.target.value as any)}
                    className="w-full h-8 rounded-[4px] border border-input bg-card px-2 text-xs text-foreground focus:ring-1 focus:ring-ring outline-none"
                  >
                    <option value="sm">Small (sm)</option>
                    <option value="md">Medium (md)</option>
                    <option value="lg">Large (lg)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-muted-foreground mb-1 text-[11px]">Button Text</label>
                  <input
                    type="text"
                    value={btnText}
                    onChange={(e) => setBtnText(e.target.value)}
                    className="w-full h-8 rounded-[4px] border border-input bg-card px-2 text-xs text-foreground font-sans focus:ring-1 focus:ring-ring outline-none"
                  />
                </div>

                <div className="space-y-2 pt-1">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={btnLoading}
                      onChange={(e) => setBtnLoading(e.target.checked)}
                      className="rounded-[3px]"
                    />
                    <span>isLoading state</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={btnDisabled}
                      onChange={(e) => setBtnDisabled(e.target.checked)}
                      className="rounded-[3px]"
                    />
                    <span>disabled state</span>
                  </label>
                </div>
              </div>
            )}

            {selectedComp === "input" && (
              <div className="space-y-4 pt-2 border-t border-border/40 font-mono">
                <div>
                  <label className="block text-muted-foreground mb-1 text-[11px]">Placeholder</label>
                  <input
                    type="text"
                    value={inputPlaceholder}
                    onChange={(e) => setInputPlaceholder(e.target.value)}
                    className="w-full h-8 rounded-[4px] border border-input bg-card px-2 text-xs text-foreground font-sans focus:ring-1 focus:ring-ring outline-none"
                  />
                </div>

                <div className="space-y-2 pt-1">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={inputError}
                      onChange={(e) => setInputError(e.target.checked)}
                      className="rounded-[3px]"
                    />
                    <span>isError state</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={inputDisabled}
                      onChange={(e) => setInputDisabled(e.target.checked)}
                      className="rounded-[3px]"
                    />
                    <span>disabled state</span>
                  </label>
                </div>
              </div>
            )}

            {selectedComp === "badge" && (
              <div className="space-y-4 pt-2 border-t border-border/40 font-mono">
                <div>
                  <label className="block text-muted-foreground mb-1 text-[11px]">Variant</label>
                  <select
                    value={badgeVariant}
                    onChange={(e) => setBadgeVariant(e.target.value as any)}
                    className="w-full h-8 rounded-[4px] border border-input bg-card px-2 text-xs text-foreground focus:ring-1 focus:ring-ring outline-none"
                  >
                    <option value="default">Default</option>
                    <option value="secondary">Secondary</option>
                    <option value="outline">Outline</option>
                    <option value="subtle">Subtle</option>
                    <option value="destructive">Destructive</option>
                  </select>
                </div>

                <div>
                  <label className="block text-muted-foreground mb-1 text-[11px]">Label</label>
                  <input
                    type="text"
                    value={badgeText}
                    onChange={(e) => setBadgeText(e.target.value)}
                    className="w-full h-8 rounded-[4px] border border-input bg-card px-2 text-xs text-foreground font-sans focus:ring-1 focus:ring-ring outline-none"
                  />
                </div>

                <label className="flex items-center gap-2 cursor-pointer pt-1">
                  <input
                    type="checkbox"
                    checked={badgeDot}
                    onChange={(e) => setBadgeDot(e.target.checked)}
                    className="rounded-[3px]"
                  />
                  <span>Animated Pulse Dot</span>
                </label>
              </div>
            )}
          </div>

          {/* Live Preview & Code Generation (Right) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Live Preview Stage */}
            <div className="rounded-[8px] border border-border/80 bg-card overflow-hidden">
              <div className="flex items-center justify-between border-b border-border/60 bg-secondary/30 px-4 py-2">
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-muted-foreground">
                  Live Preview
                </span>
                <span className="text-[10px] font-mono text-muted-foreground">Interactive</span>
              </div>
              <div className="min-h-[220px] p-8 flex items-center justify-center bg-grid-subtle">
                {selectedComp === "button" && (
                  <Button
                    variant={btnVariant}
                    size={btnSize}
                    isLoading={btnLoading}
                    disabled={btnDisabled}
                    className={radiusClasses[radiusIndex]}
                  >
                    {btnText}
                  </Button>
                )}

                {selectedComp === "input" && (
                  <div className="w-full max-w-xs">
                    <Input
                      placeholder={inputPlaceholder}
                      isError={inputError}
                      disabled={inputDisabled}
                      className={radiusClasses[radiusIndex]}
                    />
                  </div>
                )}

                {selectedComp === "badge" && (
                  <Badge
                    variant={badgeVariant}
                    dot={badgeDot}
                    className={radiusClasses[radiusIndex]}
                  >
                    {badgeText}
                  </Badge>
                )}

                {selectedComp === "card" && (
                  <Card className={cn("w-full max-w-sm", radiusClasses[radiusIndex])}>
                    <CardHeader>
                      <CardTitle>Autonomous Agent</CardTitle>
                      <CardDescription>Real-time reasoning stream</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs font-mono text-muted-foreground">
                        Status: Active (14ms latency)
                      </p>
                    </CardContent>
                    <CardFooter className="justify-end gap-2">
                      <Button size="sm">Resume</Button>
                    </CardFooter>
                  </Card>
                )}

                {selectedComp === "date-picker" && (
                  <DatePicker date={date} onSelect={setDate} />
                )}

                {selectedComp === "tabs" && (
                  <Tabs defaultValue="tab1" className="w-[300px]">
                    <TabsList className="grid grid-cols-2 w-full">
                      <TabsTrigger value="tab1">Overview</TabsTrigger>
                      <TabsTrigger value="tab2">Telemetry</TabsTrigger>
                    </TabsList>
                    <TabsContent value="tab1" className="p-3 border rounded text-xs text-muted-foreground">
                      Overview metrics active.
                    </TabsContent>
                    <TabsContent value="tab2" className="p-3 border rounded text-xs text-muted-foreground">
                      Telemetry logging online.
                    </TabsContent>
                  </Tabs>
                )}
              </div>
            </div>

            {/* Generated Code Snippet */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-semibold text-foreground uppercase tracking-wider">
                  Generated Code
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopyCode}
                  className="h-7 text-xs font-mono gap-1.5"
                >
                  <Copy className="h-3 w-3" />
                  <span>Copy Code</span>
                </Button>
              </div>
              <CodeBlock code={generatedCode} language="tsx" />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
