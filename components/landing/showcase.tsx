"use client";

import * as React from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpDown,
  Calendar as CalendarIcon,
  Check,
  ChevronDown,
  ExternalLink,
  MoreHorizontal,
  Search,
  Sparkles,
  Terminal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
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
import { DatePicker } from "@/components/ui/date-picker";

export function Showcase() {
  const [date, setDate] = React.useState<Date | undefined>(undefined);

  React.useEffect(() => {
    setDate(new Date(2026, 9, 12));
  }, []);

  // Data Table mock data
  const tableData = [
    { id: "usr_901", name: "Sarah Chen", role: "Staff Architect", status: "Active", commits: 142 },
    { id: "usr_902", name: "David Miller", role: "DevOps Engineer", status: "Active", commits: 98 },
    { id: "usr_903", name: "Elena Rostova", role: "Security Lead", status: "Review", commits: 74 },
  ];

  return (
    <section className="py-20 border-t border-border/40">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground font-semibold">
              Showcase
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground font-mono">
              Crafted Components
            </h2>
            <p className="text-sm text-muted-foreground">
              A curated look into the first wave of available building blocks.
            </p>
          </div>
          <Button asChild variant="outline" size="sm" className="font-mono text-xs">
            <Link href="/docs/components/button" className="flex items-center gap-1.5">
              <span>View All 12 Components</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>

        {/* Components Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* 1. Button Showcase */}
          <Card className="hover:border-foreground/30 transition-colors">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="font-mono text-sm">Button</CardTitle>
                <Link href="/docs/components/button" className="text-muted-foreground hover:text-foreground">
                  <ExternalLink className="h-3.5 w-3.5" />
                </Link>
              </div>
              <CardDescription>Monochrome variants and interactive loading states.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex flex-wrap gap-2">
                <Button size="sm">Primary</Button>
                <Button variant="secondary" size="sm">Secondary</Button>
                <Button variant="outline" size="sm">Outline</Button>
              </div>
              <div className="flex flex-wrap gap-2 pt-1">
                <Button variant="ghost" size="sm">Ghost</Button>
                <Button variant="destructive" size="sm">Destructive</Button>
                <Button size="sm" isLoading>Loading</Button>
              </div>
            </CardContent>
          </Card>

          {/* 2. Input Showcase */}
          <Card className="hover:border-foreground/30 transition-colors">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="font-mono text-sm">Input</CardTitle>
                <Link href="/docs/components/input" className="text-muted-foreground hover:text-foreground">
                  <ExternalLink className="h-3.5 w-3.5" />
                </Link>
              </div>
              <CardDescription>Precision focus outlines, icons, and error states.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2.5">
              <Input
                leftIcon={<Search className="h-3.5 w-3.5" />}
                placeholder="Search packages..."
              />
              <Input
                placeholder="api_secret_key"
                defaultValue="sk_live_99214"
              />
            </CardContent>
          </Card>

          {/* 3. Date Picker Showcase */}
          <Card className="hover:border-foreground/30 transition-colors">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <CardTitle className="font-mono text-sm">Date Picker</CardTitle>
                  <Badge variant="outline" className="text-[9px] py-0 px-1">Signature</Badge>
                </div>
                <Link href="/docs/components/date-picker" className="text-muted-foreground hover:text-foreground">
                  <ExternalLink className="h-3.5 w-3.5" />
                </Link>
              </div>
              <CardDescription>Custom calendar popover with quick presets.</CardDescription>
            </CardHeader>
            <CardContent>
              <DatePicker date={date} onSelect={setDate} className="w-full max-w-full" />
            </CardContent>
          </Card>

          {/* 4. Dialog Showcase */}
          <Card className="hover:border-foreground/30 transition-colors">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="font-mono text-sm">Dialog</CardTitle>
                <Link href="/docs/components/dialog" className="text-muted-foreground hover:text-foreground">
                  <ExternalLink className="h-3.5 w-3.5" />
                </Link>
              </div>
              <CardDescription>Accessible modal overlay with backdrop blur.</CardDescription>
            </CardHeader>
            <CardContent>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="w-full">
                    Open Dialog Preview
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Rotate Secret Keys?</DialogTitle>
                    <DialogDescription>
                      This will revoke active tokens and issue a replacement pair.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="ghost">Cancel</Button>
                    </DialogClose>
                    <Button>Rotate Key</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>

          {/* 5. Dropdown Menu Showcase */}
          <Card className="hover:border-foreground/30 transition-colors">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="font-mono text-sm">Dropdown Menu</CardTitle>
                <Link href="/docs/components/dropdown-menu" className="text-muted-foreground hover:text-foreground">
                  <ExternalLink className="h-3.5 w-3.5" />
                </Link>
              </div>
              <CardDescription>Contextual actions with keyboard shortcuts.</CardDescription>
            </CardHeader>
            <CardContent>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="w-full justify-between">
                    <span>Actions Menu</span>
                    <ChevronDown className="h-3.5 w-3.5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem>Copy Public IP</DropdownMenuItem>
                  <DropdownMenuItem>View Webhooks</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem destructive>Archive Service</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardContent>
          </Card>

          {/* 6. Tabs Showcase */}
          <Card className="hover:border-foreground/30 transition-colors">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="font-mono text-sm">Tabs</CardTitle>
                <Link href="/docs/components/tabs" className="text-muted-foreground hover:text-foreground">
                  <ExternalLink className="h-3.5 w-3.5" />
                </Link>
              </div>
              <CardDescription>Segmented tab view switcher.</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid grid-cols-2 w-full">
                  <TabsTrigger value="overview">Source</TabsTrigger>
                  <TabsTrigger value="preview">Compiled</TabsTrigger>
                </TabsList>
                <TabsContent value="overview">
                  <div className="text-[11px] font-mono text-muted-foreground p-2 bg-secondary/30 rounded">
                    export default function App()
                  </div>
                </TabsContent>
                <TabsContent value="preview">
                  <div className="text-[11px] font-mono text-muted-foreground p-2 bg-secondary/30 rounded">
                    Compiled successfully in 12ms
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* 7. Data Table Showcase (Full width card) */}
        <Card className="border-border/80">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <CardTitle className="font-mono text-sm">Data Table</CardTitle>
                <CardDescription>Dense, high-contrast monospace tables with sorting and row actions.</CardDescription>
              </div>
              <Badge variant="outline" dot>3 Active Records</Badge>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-secondary/40 border-y border-border/60 text-[11px] font-mono text-muted-foreground uppercase">
                  <tr>
                    <th className="p-3 pl-6 font-semibold">User ID</th>
                    <th className="p-3 font-semibold">Member</th>
                    <th className="p-3 font-semibold">Role</th>
                    <th className="p-3 font-semibold">Status</th>
                    <th className="p-3 font-semibold">Activity</th>
                    <th className="p-3 pr-6 text-right font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40 font-mono text-[11px]">
                  {tableData.map((row) => (
                    <tr key={row.id} className="hover:bg-secondary/20 transition-colors">
                      <td className="p-3 pl-6 text-muted-foreground">{row.id}</td>
                      <td className="p-3 font-semibold text-foreground font-sans">{row.name}</td>
                      <td className="p-3 text-muted-foreground font-sans">{row.role}</td>
                      <td className="p-3">
                        <Badge
                          variant={row.status === "Active" ? "outline" : "secondary"}
                          dot={row.status === "Active"}
                          className="text-[10px]"
                        >
                          {row.status}
                        </Badge>
                      </td>
                      <td className="p-3 text-muted-foreground">{row.commits} commits</td>
                      <td className="p-3 pr-6 text-right">
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <MoreHorizontal className="h-3 w-3" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
