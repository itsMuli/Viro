"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface DateRange {
  from?: Date;
  to?: Date;
}

export interface CalendarProps {
  mode?: "single" | "range";
  selected?: Date | DateRange;
  onSelect?: (date: any) => void;
  className?: string;
  minDate?: Date;
  maxDate?: Date;
  disabledDates?: (date: Date) => boolean;
  initialMonth?: Date;
}

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const WEEKDAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

export function Calendar({
  mode = "single",
  selected,
  onSelect,
  className,
  minDate,
  maxDate,
  disabledDates,
  initialMonth,
}: CalendarProps) {
  const [currentDate, setCurrentDate] = React.useState<Date>(() => {
    if (initialMonth) return new Date(initialMonth);
    if (mode === "single" && selected instanceof Date) return new Date(selected);
    if (mode === "range" && (selected as DateRange)?.from) {
      return new Date((selected as DateRange).from!);
    }
    return new Date(2026, 9, 1);
  });

  const [today, setToday] = React.useState<Date | null>(null);

  React.useEffect(() => {
    const t = new Date();
    t.setHours(0, 0, 0, 0);
    setToday(t);
  }, []);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  // Calendar matrix calculation
  const firstDayOfMonth = new Date(year, month, 1);
  // Get weekday (0 = Sun, 1 = Mon ... adjust for Mon start)
  const startingDayIndex = (firstDayOfMonth.getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const calendarDays = React.useMemo(() => {
    const days: Array<{
      date: Date;
      isCurrentMonth: boolean;
      isToday: boolean;
    }> = [];

    // Prev month padding
    for (let i = startingDayIndex - 1; i >= 0; i--) {
      const d = new Date(year, month - 1, daysInPrevMonth - i);
      days.push({
        date: d,
        isCurrentMonth: false,
        isToday: today ? d.getTime() === today.getTime() : false,
      });
    }

    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      const d = new Date(year, month, day);
      days.push({
        date: d,
        isCurrentMonth: true,
        isToday: today ? d.getTime() === today.getTime() : false,
      });
    }

    // Next month padding to fill grid to 35 or 42
    const totalCells = days.length > 35 ? 42 : 35;
    const remaining = totalCells - days.length;
    for (let i = 1; i <= remaining; i++) {
      const d = new Date(year, month + 1, i);
      days.push({
        date: d,
        isCurrentMonth: false,
        isToday: today ? d.getTime() === today.getTime() : false,
      });
    }

    return days;
  }, [year, month, startingDayIndex, daysInMonth, daysInPrevMonth, today]);

  const isSameDay = (d1?: Date, d2?: Date) => {
    if (!d1 || !d2) return false;
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  };

  const isWithinRange = (date: Date, range?: DateRange) => {
    if (!range?.from || !range?.to) return false;
    const t = date.getTime();
    return t > range.from.getTime() && t < range.to.getTime();
  };

  const handleDayClick = (date: Date) => {
    if (disabledDates && disabledDates(date)) return;
    if (minDate && date < minDate) return;
    if (maxDate && date > maxDate) return;

    if (mode === "single") {
      onSelect?.(date);
    } else if (mode === "range") {
      const range = (selected as DateRange) || {};
      if (!range.from || (range.from && range.to)) {
        onSelect?.({ from: date, to: undefined });
      } else {
        if (date < range.from) {
          onSelect?.({ from: date, to: range.from });
        } else {
          onSelect?.({ from: range.from, to: date });
        }
      }
    }
  };

  return (
    <div
      className={cn(
        "p-4 bg-popover text-popover-foreground rounded-[8px] border border-border select-none w-[280px]",
        className
      )}
    >
      {/* Month & Year header */}
      <div className="flex items-center justify-between pb-3 border-b border-border/40">
        <div className="text-xs font-semibold tracking-tight text-foreground flex items-center gap-1.5">
          <span>{MONTH_NAMES[month]}</span>
          <span className="text-muted-foreground font-mono">{year}</span>
        </div>
        <div className="flex items-center space-x-1">
          <button
            type="button"
            onClick={prevMonth}
            aria-label="Previous month"
            className="h-7 w-7 rounded-[4px] border border-border/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={nextMonth}
            aria-label="Next month"
            className="h-7 w-7 rounded-[4px] border border-border/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
          >
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Weekday headers */}
      <div className="grid grid-cols-7 pt-3 text-center">
        {WEEKDAYS.map((day) => (
          <div
            key={day}
            className="text-[11px] font-mono text-muted-foreground/80 py-1"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-y-1 pt-1 text-center">
        {calendarDays.map(({ date, isCurrentMonth, isToday }, idx) => {
          let isSelected = false;
          let isInRange = false;
          let isRangeStart = false;
          let isRangeEnd = false;

          if (mode === "single" && selected instanceof Date) {
            isSelected = isSameDay(date, selected);
          } else if (mode === "range") {
            const range = selected as DateRange;
            if (range) {
              isRangeStart = isSameDay(date, range.from);
              isRangeEnd = isSameDay(date, range.to);
              isSelected = isRangeStart || isRangeEnd;
              isInRange = isWithinRange(date, range);
            }
          }

          const isDisabled =
            (minDate && date < minDate) ||
            (maxDate && date > maxDate) ||
            (disabledDates && disabledDates(date));

          return (
            <div
              key={idx}
              className={cn(
                "relative h-8 flex items-center justify-center",
                isInRange && "bg-secondary/70",
                isRangeStart && "rounded-l-[4px] bg-secondary/70",
                isRangeEnd && "rounded-r-[4px] bg-secondary/70"
              )}
            >
              <button
                type="button"
                disabled={isDisabled}
                onClick={() => handleDayClick(date)}
                className={cn(
                  "h-7 w-7 rounded-[4px] text-xs font-mono transition-all flex items-center justify-center relative",
                  !isCurrentMonth && "text-muted-foreground/30",
                  isCurrentMonth && "text-foreground hover:bg-secondary",
                  isSelected &&
                    "bg-foreground text-background font-semibold hover:bg-foreground hover:text-background shadow-xs",
                  isToday &&
                    !isSelected &&
                    "border border-foreground/40 font-semibold",
                  isDisabled &&
                    "opacity-20 pointer-events-none text-muted-foreground"
                )}
              >
                {date.getDate()}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
