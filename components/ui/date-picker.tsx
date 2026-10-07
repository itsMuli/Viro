"use client";

import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { Calendar as CalendarIcon, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar, DateRange } from "@/components/ui/calendar";

export interface DatePickerProps {
  date?: Date;
  onSelect?: (date: Date | undefined) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

function formatDate(date: Date): string {
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

export function DatePicker({
  date,
  onSelect,
  placeholder = "Select date",
  className,
  disabled = false,
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false);

  const handleSelect = (selectedDate: Date) => {
    onSelect?.(selectedDate);
    setOpen(false);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect?.(undefined);
  };

  const handlePreset = (daysToAdd: number) => {
    const d = new Date();
    d.setDate(d.getDate() + daysToAdd);
    onSelect?.(d);
    setOpen(false);
  };

  return (
    <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
      <PopoverPrimitive.Trigger asChild>
        <button
          type="button"
          disabled={disabled}
          className={cn(
            "flex h-9 w-full max-w-[240px] items-center justify-between rounded-[6px] border border-input bg-background/50 px-3 py-1 text-xs font-mono transition-colors",
            "hover:border-foreground/30 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:border-foreground",
            "disabled:cursor-not-allowed disabled:opacity-40",
            !date && "text-muted-foreground",
            className
          )}
        >
          <div className="flex items-center gap-2 truncate">
            <CalendarIcon className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
            <span className="truncate">
              {date ? formatDate(date) : placeholder}
            </span>
          </div>
          {date && (
            <span
              onClick={handleClear}
              className="ml-2 rounded-xs p-0.5 text-muted-foreground hover:bg-secondary hover:text-foreground"
            >
              <X className="h-3 w-3" />
            </span>
          )}
        </button>
      </PopoverPrimitive.Trigger>

      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          align="start"
          sideOffset={6}
          className={cn(
            "z-50 rounded-[8px] border border-border bg-popover p-0 text-popover-foreground shadow-2xl outline-none",
            "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
          )}
        >
          {/* Quick preset buttons */}
          <div className="flex items-center gap-1 border-b border-border/40 p-2 text-[11px] font-mono">
            <button
              type="button"
              onClick={() => handlePreset(0)}
              className="rounded-[4px] px-2 py-1 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
            >
              Today
            </button>
            <button
              type="button"
              onClick={() => handlePreset(1)}
              className="rounded-[4px] px-2 py-1 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
            >
              Tomorrow
            </button>
            <button
              type="button"
              onClick={() => handlePreset(7)}
              className="rounded-[4px] px-2 py-1 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
            >
              In 7 days
            </button>
          </div>

          <Calendar
            mode="single"
            selected={date}
            onSelect={handleSelect}
            className="border-0 shadow-none"
          />
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
}

export interface DateRangePickerProps {
  range?: DateRange;
  onSelect?: (range: DateRange | undefined) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export function DateRangePicker({
  range,
  onSelect,
  placeholder = "Select date range",
  className,
  disabled = false,
}: DateRangePickerProps) {
  const [open, setOpen] = React.useState(false);

  const formatRange = (r?: DateRange) => {
    if (!r?.from) return placeholder;
    if (!r.to) return `${formatDate(r.from)} — ...`;
    return `${formatDate(r.from)} — ${formatDate(r.to)}`;
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect?.(undefined);
  };

  return (
    <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
      <PopoverPrimitive.Trigger asChild>
        <button
          type="button"
          disabled={disabled}
          className={cn(
            "flex h-9 w-full max-w-[280px] items-center justify-between rounded-[6px] border border-input bg-background/50 px-3 py-1 text-xs font-mono transition-colors",
            "hover:border-foreground/30 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:border-foreground",
            "disabled:cursor-not-allowed disabled:opacity-40",
            !range?.from && "text-muted-foreground",
            className
          )}
        >
          <div className="flex items-center gap-2 truncate">
            <CalendarIcon className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
            <span className="truncate">{formatRange(range)}</span>
          </div>
          {range?.from && (
            <span
              onClick={handleClear}
              className="ml-2 rounded-xs p-0.5 text-muted-foreground hover:bg-secondary hover:text-foreground"
            >
              <X className="h-3 w-3" />
            </span>
          )}
        </button>
      </PopoverPrimitive.Trigger>

      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          align="start"
          sideOffset={6}
          className={cn(
            "z-50 rounded-[8px] border border-border bg-popover p-0 text-popover-foreground shadow-2xl outline-none",
            "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
          )}
        >
          <div className="p-2 border-b border-border/40 text-[11px] font-mono text-muted-foreground flex justify-between items-center">
            <span>Range Selection</span>
            {range?.from && range?.to && (
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-foreground font-semibold hover:underline"
              >
                Done
              </button>
            )}
          </div>
          <Calendar
            mode="range"
            selected={range}
            onSelect={onSelect}
            className="border-0 shadow-none"
          />
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
}
