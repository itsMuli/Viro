"use client";

import * as React from "react";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Copy,
  Globe,
  Lock,
  Mail,
  Search,
  Settings,
  Sparkles,
  Terminal,
  Trash2,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Calendar } from "@/components/ui/calendar";
import { DatePicker, DateRangePicker } from "@/components/ui/date-picker";
import { DataTable } from "@/components/ui/data-table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem, SelectLabel } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

export function ComponentDemo({ slug }: { slug: string }) {
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(undefined);
  const [dateRange, setDateRange] = React.useState<{ from?: Date; to?: Date } | undefined>(undefined);
  const [calendarDate, setCalendarDate] = React.useState<Date | undefined>(undefined);

  React.useEffect(() => {
    const now = new Date(2026, 9, 12);
    setSelectedDate(now);
    setDateRange({
      from: now,
      to: new Date(2026, 9, 19),
    });
    setCalendarDate(now);
  }, []);

  switch (slug) {
    case "button":
      return (
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button variant="default">Deploy Application</Button>
          <Button variant="secondary">Documentation</Button>
          <Button variant="outline">Inspect Code</Button>
          <Button variant="ghost">Cancel</Button>
          <Button variant="destructive">Revoke Key</Button>
        </div>
      );

    case "input":
      return (
        <div className="w-full max-w-sm space-y-3">
          <Input
            leftIcon={<Search className="h-3.5 w-3.5" />}
            placeholder="Search API endpoints..."
          />
          <Input
            leftIcon={<Mail className="h-3.5 w-3.5" />}
            placeholder="developer@domain.com"
            defaultValue="alex@viro-ui.dev"
          />
        </div>
      );

    case "card":
      return (
        <Card className="w-full max-w-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Autonomous Worker #4</CardTitle>
              <Badge dot variant="outline">Online</Badge>
            </div>
            <CardDescription>
              Orchestrates code generation and AST transformations.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-[4px] border border-border/40 bg-secondary/30 p-2.5 font-mono text-xs space-y-1">
              <div className="flex justify-between text-muted-foreground text-[11px]">
                <span>Throughput</span>
                <span className="text-foreground">2,840 req/s</span>
              </div>
              <div className="flex justify-between text-muted-foreground text-[11px]">
                <span>Memory usage</span>
                <span className="text-foreground">34.8 MB</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="justify-between">
            <span className="text-[11px] font-mono text-muted-foreground">Cluster: us-east-1</span>
            <Button size="sm">Configure</Button>
          </CardFooter>
        </Card>
      );

    case "badge":
      return (
        <div className="flex flex-wrap items-center justify-center gap-2">
          <Badge dot variant="default">Production</Badge>
          <Badge variant="secondary">TypeScript 5.7</Badge>
          <Badge variant="outline">Next.js 15</Badge>
          <Badge dot variant="subtle">Idle</Badge>
          <Badge variant="destructive">Deprecated</Badge>
        </div>
      );

    case "dialog":
      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Open Confirmation Dialog</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Revoke Production Credentials?</DialogTitle>
              <DialogDescription>
                This action is immediate. All active connections using token <code>viro_live_99</code> will be disconnected.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="ghost">Cancel</Button>
              </DialogClose>
              <Button variant="destructive">Confirm Revoke</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      );

    case "dropdown-menu":
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2">
              <span>Account Actions</span>
              <ChevronDown className="h-3.5 w-3.5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-52">
            <DropdownMenuLabel>Workspace</DropdownMenuLabel>
            <DropdownMenuItem>
              <User className="mr-2 h-3.5 w-3.5" />
              <span>Profile Settings</span>
              <DropdownMenuShortcut>⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-3.5 w-3.5" />
              <span>Preferences</span>
              <DropdownMenuShortcut>⌘,</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem destructive>
              <Trash2 className="mr-2 h-3.5 w-3.5" />
              <span>Delete Cluster</span>
              <DropdownMenuShortcut>⇧⌘D</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );

    case "tabs":
      return (
        <Tabs defaultValue="overview" className="w-full max-w-md">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <Card className="p-4 border-dashed">
              <div className="text-xs font-semibold">Active Deployments</div>
              <p className="text-[11px] text-muted-foreground mt-1">
                3 edge regions serving 100% of production traffic.
              </p>
            </Card>
          </TabsContent>
          <TabsContent value="analytics">
            <Card className="p-4 border-dashed">
              <div className="text-xs font-semibold">Real-time Telemetry</div>
              <p className="text-[11px] text-muted-foreground mt-1">
                Zero reported errors in the trailing 24 hours.
              </p>
            </Card>
          </TabsContent>
          <TabsContent value="settings">
            <Card className="p-4 border-dashed">
              <div className="text-xs font-semibold">Environment Variables</div>
              <p className="text-[11px] text-muted-foreground mt-1">
                Manage decrypted environment keys and webhook URLs.
              </p>
            </Card>
          </TabsContent>
        </Tabs>
      );

    case "tooltip":
      return (
        <TooltipProvider>
          <div className="flex items-center gap-4">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon">
                  <Terminal className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Open Terminal (Ctrl + `)</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="secondary" size="icon">
                  <Globe className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>View Production Domain</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
      );

    case "checkbox":
      return (
        <div className="space-y-3">
          <div className="flex items-center space-x-2.5">
            <Checkbox id="c1" defaultChecked />
            <label htmlFor="c1" className="text-xs font-medium cursor-pointer">
              Send weekly digest summaries
            </label>
          </div>
          <div className="flex items-center space-x-2.5">
            <Checkbox id="c2" />
            <label htmlFor="c2" className="text-xs font-medium cursor-pointer text-muted-foreground">
              Notify on failure status codes (5xx)
            </label>
          </div>
        </div>
      );

    case "switch":
      return (
        <div className="w-full max-w-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-medium">Automatic Branch Deploys</div>
              <div className="text-[11px] text-muted-foreground">Deploy pull requests immediately</div>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between border-t border-border/40 pt-3">
            <div>
              <div className="text-xs font-medium">Turbo Build Cache</div>
              <div className="text-[11px] text-muted-foreground">Share remote cache artifacts</div>
            </div>
            <Switch />
          </div>
        </div>
      );

    case "calendar":
      return (
        <div className="flex justify-center">
          <Calendar
            mode="single"
            selected={calendarDate}
            onSelect={(date) => date && setCalendarDate(date)}
          />
        </div>
      );

    case "date-picker":
      return (
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <DatePicker
            date={selectedDate}
            onSelect={setSelectedDate}
            placeholder="Select launch date"
          />
          <DateRangePicker
            range={dateRange}
            onSelect={setDateRange}
            placeholder="Select date range"
          />
        </div>
      );

    case "data-table":
      return (
        <div className="w-full">
          <DataTable />
        </div>
      );

    case "avatar":
      return (
        <div className="flex items-center gap-4">
          <Avatar status="online">
            <AvatarFallback>SC</AvatarFallback>
          </Avatar>
          <Avatar status="busy">
            <AvatarFallback>MT</AvatarFallback>
          </Avatar>
          <Avatar status="offline">
            <AvatarFallback>DK</AvatarFallback>
          </Avatar>
        </div>
      );

    case "alert":
      return (
        <div className="w-full max-w-md space-y-3">
          <Alert variant="default">
            <AlertTitle>Immutable Release Active</AlertTitle>
            <AlertDescription>
              Cluster snapshot deployed across all 32 edge regions.
            </AlertDescription>
          </Alert>
          <Alert variant="destructive">
            <AlertTitle>Deprecation Warning</AlertTitle>
            <AlertDescription>
              Legacy token v0.1 API credentials expire in 14 days.
            </AlertDescription>
          </Alert>
        </div>
      );

    case "skeleton":
      return (
        <div className="w-full max-w-sm space-y-3">
          <div className="flex items-center space-x-4">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
            </div>
          </div>
        </div>
      );

    case "select":
      return (
        <div className="w-full max-w-xs">
          <Select defaultValue="us-east">
            <SelectTrigger>
              <SelectValue placeholder="Select region" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="us-east">US East (N. Virginia)</SelectItem>
              <SelectItem value="us-west">US West (Oregon)</SelectItem>
              <SelectItem value="eu-central">EU Central (Frankfurt)</SelectItem>
              <SelectItem value="ap-southeast">AP Southeast (Singapore)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      );

    case "slider":
      return (
        <div className="w-full max-w-xs space-y-2">
          <div className="flex justify-between font-mono text-xs text-muted-foreground">
            <span>Concurrency Limit</span>
            <span className="text-foreground font-semibold">64 Threads</span>
          </div>
          <Slider defaultValue={[64]} max={128} step={1} />
        </div>
      );

    default:
      return <div>Demo unavailable</div>;
  }
}
