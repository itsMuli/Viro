"use client";

import * as React from "react";
import {
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Check,
  ChevronLeft,
  ChevronRight,
  Download,
  Filter,
  MoreHorizontal,
  Search,
  Trash2,
  UserPlus,
  X,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export interface DataTableRow {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "Architect" | "Engineer" | "Designer";
  status: "Active" | "Pending" | "Inactive";
  created: string;
}

export const initialData: DataTableRow[] = [
  { id: "usr_101", name: "Sarah Chen", email: "sarah.chen@rose-ui.dev", role: "Architect", status: "Active", created: "Oct 12, 2026" },
  { id: "usr_102", name: "Marcus Thorne", email: "m.thorne@rose-ui.dev", role: "Admin", status: "Active", created: "Oct 10, 2026" },
  { id: "usr_103", name: "Elena Rostova", email: "elena@rose-ui.dev", role: "Engineer", status: "Pending", created: "Oct 08, 2026" },
  { id: "usr_104", name: "David Kim", email: "david.kim@rose-ui.dev", role: "Designer", status: "Active", created: "Oct 05, 2026" },
  { id: "usr_105", name: "Amara Diallo", email: "amara@rose-ui.dev", role: "Engineer", status: "Active", created: "Oct 01, 2026" },
  { id: "usr_106", name: "Liam Vance", email: "liam.v@rose-ui.dev", role: "Architect", status: "Inactive", created: "Sep 28, 2026" },
  { id: "usr_107", name: "Sofia Morales", email: "sofia.m@rose-ui.dev", role: "Engineer", status: "Active", created: "Sep 25, 2026" },
  { id: "usr_108", name: "Hiroshi Tanaka", email: "hiroshi@rose-ui.dev", role: "Admin", status: "Active", created: "Sep 20, 2026" },
];

export function DataTable() {
  const [data, setData] = React.useState<DataTableRow[]>(initialData);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [roleFilter, setRoleFilter] = React.useState<string>("All");
  const [statusFilter, setStatusFilter] = React.useState<string>("All");
  const [sortField, setSortField] = React.useState<keyof DataTableRow>("created");
  const [sortDirection, setSortDirection] = React.useState<"asc" | "desc">("desc");
  const [selectedIds, setSelectedIds] = React.useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = React.useState(1);
  const pageSize = 5;

  // Filtered & Sorted rows
  const filteredData = React.useMemo(() => {
    return data
      .filter((row) => {
        const matchesSearch =
          row.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          row.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          row.id.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesRole = roleFilter === "All" || row.role === roleFilter;
        const matchesStatus = statusFilter === "All" || row.status === statusFilter;
        return matchesSearch && matchesRole && matchesStatus;
      })
      .sort((a, b) => {
        const aVal = a[sortField];
        const bVal = b[sortField];
        if (aVal < bVal) return sortDirection === "asc" ? -1 : 1;
        if (aVal > bVal) return sortDirection === "asc" ? 1 : -1;
        return 0;
      });
  }, [data, searchQuery, roleFilter, statusFilter, sortField, sortDirection]);

  // Pagination calculation
  const totalPages = Math.max(1, Math.ceil(filteredData.length / pageSize));
  const paginatedData = React.useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [filteredData, currentPage]);

  const handleSort = (field: keyof DataTableRow) => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(new Set(paginatedData.map((d) => d.id)));
    } else {
      setSelectedIds(new Set());
    }
  };

  const handleSelectRow = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    setSelectedIds(next);
  };

  const handleDeleteSelected = () => {
    setData((prev) => prev.filter((r) => !selectedIds.has(r.id)));
    setSelectedIds(new Set());
  };

  const isAllSelected =
    paginatedData.length > 0 &&
    paginatedData.every((row) => selectedIds.has(row.id));

  return (
    <div className="space-y-4 w-full">
      {/* Table Toolbar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Left: Search input */}
        <div className="flex items-center gap-2 flex-1 max-w-sm">
          <Input
            leftIcon={<Search className="h-3.5 w-3.5" />}
            placeholder="Filter by name, email, or ID..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        {/* Right: Filters & Actions */}
        <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
          {/* Role Filter */}
          <select
            value={roleFilter}
            onChange={(e) => {
              setRoleFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="h-9 rounded-[6px] border border-input bg-background/50 px-2.5 text-xs font-mono text-foreground focus:ring-1 focus:ring-ring outline-none"
          >
            <option value="All">All Roles</option>
            <option value="Admin">Admin</option>
            <option value="Architect">Architect</option>
            <option value="Engineer">Engineer</option>
            <option value="Designer">Designer</option>
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="h-9 rounded-[6px] border border-input bg-background/50 px-2.5 text-xs font-mono text-foreground focus:ring-1 focus:ring-ring outline-none"
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Pending">Pending</option>
            <option value="Inactive">Inactive</option>
          </select>

          {(searchQuery || roleFilter !== "All" || statusFilter !== "All") && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSearchQuery("");
                setRoleFilter("All");
                setStatusFilter("All");
                setCurrentPage(1);
              }}
              className="text-muted-foreground hover:text-foreground h-9 px-2 text-xs"
            >
              <X className="h-3.5 w-3.5 mr-1" />
              Reset
            </Button>
          )}
        </div>
      </div>

      {/* Bulk Action Banner when rows are selected */}
      {selectedIds.size > 0 && (
        <div className="flex items-center justify-between rounded-[6px] border border-foreground/30 bg-secondary/80 px-4 py-2 text-xs font-mono animate-in fade-in">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-foreground">
              {selectedIds.size} row{selectedIds.size > 1 ? "s" : ""} selected
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedIds(new Set())}
              className="h-7 text-[11px]"
            >
              Clear
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={handleDeleteSelected}
              className="h-7 text-[11px] gap-1"
            >
              <Trash2 className="h-3 w-3" />
              Delete Selected
            </Button>
          </div>
        </div>
      )}

      {/* Main Table Container */}
      <div className="rounded-[8px] border border-border/80 overflow-hidden bg-card shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-secondary/40 border-b border-border/60 text-[11px] font-mono text-muted-foreground uppercase select-none">
              <tr>
                <th className="p-3.5 pl-4 w-10">
                  <Checkbox
                    checked={isAllSelected}
                    onCheckedChange={(checked) => handleSelectAll(checked === true)}
                    aria-label="Select all rows"
                  />
                </th>
                <th
                  onClick={() => handleSort("name")}
                  className="p-3.5 font-semibold cursor-pointer hover:text-foreground transition-colors"
                >
                  <div className="flex items-center gap-1.5">
                    <span>User</span>
                    {sortField === "name" ? (
                      sortDirection === "asc" ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />
                    ) : (
                      <ArrowUpDown className="h-3 w-3 opacity-30" />
                    )}
                  </div>
                </th>
                <th className="p-3.5 font-semibold">Email</th>
                <th
                  onClick={() => handleSort("role")}
                  className="p-3.5 font-semibold cursor-pointer hover:text-foreground transition-colors"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Role</span>
                    {sortField === "role" ? (
                      sortDirection === "asc" ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />
                    ) : (
                      <ArrowUpDown className="h-3 w-3 opacity-30" />
                    )}
                  </div>
                </th>
                <th className="p-3.5 font-semibold">Status</th>
                <th
                  onClick={() => handleSort("created")}
                  className="p-3.5 font-semibold cursor-pointer hover:text-foreground transition-colors"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Created</span>
                    {sortField === "created" ? (
                      sortDirection === "asc" ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />
                    ) : (
                      <ArrowUpDown className="h-3 w-3 opacity-30" />
                    )}
                  </div>
                </th>
                <th className="p-3.5 pr-4 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40 font-mono text-[11px]">
              {paginatedData.length > 0 ? (
                paginatedData.map((row) => {
                  const isSelected = selectedIds.has(row.id);
                  return (
                    <tr
                      key={row.id}
                      className={cn(
                        "transition-colors hover:bg-secondary/30",
                        isSelected && "bg-secondary/40"
                      )}
                    >
                      <td className="p-3.5 pl-4">
                        <Checkbox
                          checked={isSelected}
                          onCheckedChange={() => handleSelectRow(row.id)}
                          aria-label={`Select row ${row.name}`}
                        />
                      </td>
                      <td className="p-3.5 font-semibold text-foreground font-sans">
                        <div>{row.name}</div>
                        <div className="text-[10px] text-muted-foreground font-mono">{row.id}</div>
                      </td>
                      <td className="p-3.5 text-muted-foreground">{row.email}</td>
                      <td className="p-3.5 text-foreground">{row.role}</td>
                      <td className="p-3.5">
                        <Badge
                          variant={
                            row.status === "Active"
                              ? "outline"
                              : row.status === "Pending"
                              ? "subtle"
                              : "secondary"
                          }
                          dot={row.status === "Active"}
                          className="text-[10px] py-0"
                        >
                          {row.status}
                        </Badge>
                      </td>
                      <td className="p-3.5 text-muted-foreground">{row.created}</td>
                      <td className="p-3.5 pr-4 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-7 w-7">
                              <MoreHorizontal className="h-3.5 w-3.5" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-40">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(row.email)}>
                              Copy Email
                            </DropdownMenuItem>
                            <DropdownMenuItem>View Profile</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              destructive
                              onClick={() => {
                                setData((prev) => prev.filter((r) => r.id !== row.id));
                              }}
                            >
                              Remove User
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={7} className="p-12 text-center text-muted-foreground">
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <Search className="h-6 w-6 opacity-30" />
                      <div className="font-semibold text-foreground">No matching users found</div>
                      <p className="text-xs max-w-sm">
                        Try adjusting your search query or clear filters to see more results.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between border-t border-border/60 px-4 py-3 gap-3 text-[11px] font-mono text-muted-foreground">
          <div>
            Showing{" "}
            <span className="text-foreground font-semibold">
              {filteredData.length === 0 ? 0 : (currentPage - 1) * pageSize + 1}
            </span>{" "}
            to{" "}
            <span className="text-foreground font-semibold">
              {Math.min(currentPage * pageSize, filteredData.length)}
            </span>{" "}
            of{" "}
            <span className="text-foreground font-semibold">{filteredData.length}</span> entries
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="h-7 px-2.5 text-[11px]"
            >
              <ChevronLeft className="h-3 w-3 mr-1" />
              Previous
            </Button>
            <span className="px-2">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="h-7 px-2.5 text-[11px]"
            >
              Next
              <ChevronRight className="h-3 w-3 ml-1" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
