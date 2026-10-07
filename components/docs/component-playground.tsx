"use client";

import * as React from "react";
import { Sliders, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { DatePicker, DateRangePicker } from "@/components/ui/date-picker";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ComponentPlaygroundProps {
  componentName: string;
}

export function ComponentPlayground({ componentName }: ComponentPlaygroundProps) {
  // Button state
  const [btnVariant, setBtnVariant] = React.useState<"default" | "secondary" | "outline" | "ghost" | "destructive" | "link">("default");
  const [btnSize, setBtnSize] = React.useState<"sm" | "md" | "lg" | "icon">("md");
  const [btnLoading, setBtnLoading] = React.useState(false);
  const [btnDisabled, setBtnDisabled] = React.useState(false);
  const [btnText, setBtnText] = React.useState("Continue to Deploy");

  // Input state
  const [inputError, setInputError] = React.useState(false);
  const [inputDisabled, setInputDisabled] = React.useState(false);
  const [inputPlaceholder, setInputPlaceholder] = React.useState("Enter repository name...");

  // Badge state
  const [badgeVariant, setBadgeVariant] = React.useState<"default" | "secondary" | "outline" | "subtle" | "destructive">("default");
  const [badgeDot, setBadgeDot] = React.useState(true);
  const [badgeText, setBadgeText] = React.useState("Production Ready");

  // DatePicker state
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(undefined);
  const [pickerDisabled, setPickerDisabled] = React.useState(false);

  React.useEffect(() => {
    setSelectedDate(new Date(2026, 9, 12));
  }, []);

  // Switch state
  const [switchChecked, setSwitchChecked] = React.useState(true);
  const [switchDisabled, setSwitchDisabled] = React.useState(false);

  // Checkbox state
  const [checkboxChecked, setCheckboxChecked] = React.useState(true);
  const [checkboxDisabled, setCheckboxDisabled] = React.useState(false);

  const renderComponent = () => {
    switch (componentName) {
      case "button":
        return (
          <Button
            variant={btnVariant}
            size={btnSize}
            isLoading={btnLoading}
            disabled={btnDisabled}
          >
            {btnText}
          </Button>
        );

      case "input":
        return (
          <div className="w-full max-w-xs space-y-2">
            <Input
              placeholder={inputPlaceholder}
              isError={inputError}
              disabled={inputDisabled}
            />
            {inputError && (
              <p className="text-[11px] font-mono text-muted-foreground">
                Repository name already exists.
              </p>
            )}
          </div>
        );

      case "badge":
        return (
          <Badge variant={badgeVariant} dot={badgeDot}>
            {badgeText}
          </Badge>
        );

      case "card":
        return (
          <Card className="w-full max-w-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Autonomous Agent</CardTitle>
                <Badge dot variant="outline">Live</Badge>
              </div>
              <CardDescription>
                Real-time reasoning and continuous execution pipeline.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-[4px] border border-border/40 bg-secondary/40 p-2.5 font-mono text-xs">
                Latency: 142ms · Steps: 18/20
              </div>
            </CardContent>
            <CardFooter className="justify-end gap-2">
              <Button variant="outline" size="sm">Inspect</Button>
              <Button size="sm">Resume</Button>
            </CardFooter>
          </Card>
        );

      case "date-picker":
        return (
          <div className="flex flex-col items-center gap-4">
            <DatePicker
              date={selectedDate}
              onSelect={setSelectedDate}
              disabled={pickerDisabled}
            />
            <span className="font-mono text-[11px] text-muted-foreground">
              Selected: {selectedDate ? selectedDate.toLocaleDateString() : "None"}
            </span>
          </div>
        );

      case "switch":
        return (
          <div className="flex items-center gap-3">
            <Switch
              checked={switchChecked}
              onCheckedChange={setSwitchChecked}
              disabled={switchDisabled}
              id="playground-switch"
            />
            <label
              htmlFor="playground-switch"
              className="text-xs font-mono select-none cursor-pointer text-foreground"
            >
              Telemetry {switchChecked ? "Active" : "Disabled"}
            </label>
          </div>
        );

      case "checkbox":
        return (
          <div className="flex items-center gap-2.5">
            <Checkbox
              checked={checkboxChecked}
              onCheckedChange={(checked) => setCheckboxChecked(checked === true)}
              disabled={checkboxDisabled}
              id="playground-checkbox"
            />
            <label
              htmlFor="playground-checkbox"
              className="text-xs font-mono select-none cursor-pointer text-foreground"
            >
              Verify signature checksum
            </label>
          </div>
        );

      default:
        return (
          <div className="text-xs font-mono text-muted-foreground">
            Interactive playground not configured for {componentName}.
          </div>
        );
    }
  };

  return (
    <div className="my-8 rounded-[8px] border border-border/80 overflow-hidden bg-card">
      <div className="flex items-center justify-between border-b border-border/60 bg-secondary/20 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <Sliders className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="text-xs font-semibold uppercase tracking-wider font-mono text-foreground">
            Interactive Playground
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] font-mono text-muted-foreground">
          <Sparkles className="h-3 w-3 text-foreground" />
          <span>Real-time Props</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-border/60">
        {/* Controls Column */}
        <div className="p-5 space-y-4 bg-background/50 text-xs">
          <h5 className="font-mono text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
            Configuration
          </h5>

          {componentName === "button" && (
            <div className="space-y-3 font-mono">
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
                <label className="block text-muted-foreground mb-1 text-[11px]">Label</label>
                <input
                  type="text"
                  value={btnText}
                  onChange={(e) => setBtnText(e.target.value)}
                  className="w-full h-8 rounded-[4px] border border-input bg-card px-2 text-xs text-foreground focus:ring-1 focus:ring-ring outline-none font-sans"
                />
              </div>

              <div className="pt-2 space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={btnLoading}
                    onChange={(e) => setBtnLoading(e.target.checked)}
                    className="rounded-[3px]"
                  />
                  <span>isLoading</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={btnDisabled}
                    onChange={(e) => setBtnDisabled(e.target.checked)}
                    className="rounded-[3px]"
                  />
                  <span>disabled</span>
                </label>
              </div>
            </div>
          )}

          {componentName === "input" && (
            <div className="space-y-3 font-mono">
              <div>
                <label className="block text-muted-foreground mb-1 text-[11px]">Placeholder</label>
                <input
                  type="text"
                  value={inputPlaceholder}
                  onChange={(e) => setInputPlaceholder(e.target.value)}
                  className="w-full h-8 rounded-[4px] border border-input bg-card px-2 text-xs text-foreground focus:ring-1 focus:ring-ring outline-none font-sans"
                />
              </div>
              <div className="pt-2 space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={inputError}
                    onChange={(e) => setInputError(e.target.checked)}
                    className="rounded-[3px]"
                  />
                  <span>isError</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={inputDisabled}
                    onChange={(e) => setInputDisabled(e.target.checked)}
                    className="rounded-[3px]"
                  />
                  <span>disabled</span>
                </label>
              </div>
            </div>
          )}

          {componentName === "badge" && (
            <div className="space-y-3 font-mono">
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
                  className="w-full h-8 rounded-[4px] border border-input bg-card px-2 text-xs text-foreground focus:ring-1 focus:ring-ring outline-none"
                />
              </div>
              <div className="pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={badgeDot}
                    onChange={(e) => setBadgeDot(e.target.checked)}
                    className="rounded-[3px]"
                  />
                  <span>Animated Dot</span>
                </label>
              </div>
            </div>
          )}

          {componentName === "date-picker" && (
            <div className="space-y-3 font-mono">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={pickerDisabled}
                  onChange={(e) => setPickerDisabled(e.target.checked)}
                  className="rounded-[3px]"
                />
                <span>Disabled state</span>
              </label>
              <button
                type="button"
                onClick={() => setSelectedDate(new Date())}
                className="text-xs text-foreground underline hover:opacity-80"
              >
                Reset to today
              </button>
            </div>
          )}

          {componentName === "switch" && (
            <div className="space-y-3 font-mono">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={switchDisabled}
                  onChange={(e) => setSwitchDisabled(e.target.checked)}
                  className="rounded-[3px]"
                />
                <span>Disabled state</span>
              </label>
            </div>
          )}

          {componentName === "checkbox" && (
            <div className="space-y-3 font-mono">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={checkboxDisabled}
                  onChange={(e) => setCheckboxDisabled(e.target.checked)}
                  className="rounded-[3px]"
                />
                <span>Disabled state</span>
              </label>
            </div>
          )}

          {componentName === "card" && (
            <div className="text-[11px] font-mono text-muted-foreground leading-relaxed">
              Cards adapt to container layouts with flexible header, content, and footer sections.
            </div>
          )}
        </div>

        {/* Live Preview Display Column */}
        <div className="lg:col-span-2 p-8 flex items-center justify-center bg-grid-subtle min-h-[260px]">
          {renderComponent()}
        </div>
      </div>
    </div>
  );
}
