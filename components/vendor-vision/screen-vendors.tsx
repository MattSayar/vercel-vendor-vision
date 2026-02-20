"use client"

import { useState } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  vendors,
  getSeverityColor,
  getSeverityDot,
  type Vendor,
  type Severity,
} from "@/lib/demo-data"
import {
  Search,
  ArrowUpDown,
  Building2,
  Mail,
  Users,
  FileWarning,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface VendorsProps {
  onNavigateToVendor: (vendorId: string) => void
}

const severityFilters: Severity[] = ["critical", "high", "medium", "low"]

type SortField = "riskScore" | "name" | "emails30d" | "openCases"

export function ScreenVendors({ onNavigateToVendor }: VendorsProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeSeverities, setActiveSeverities] = useState<Set<Severity>>(new Set(severityFilters))
  const [sortField, setSortField] = useState<SortField>("riskScore")
  const [sortAsc, setSortAsc] = useState(false)

  const toggleSeverity = (s: Severity) => {
    setActiveSeverities((prev) => {
      const next = new Set(prev)
      if (next.has(s)) next.delete(s)
      else next.add(s)
      return next
    })
  }

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortAsc((prev) => !prev)
    } else {
      setSortField(field)
      setSortAsc(false)
    }
  }

  const filteredVendors = vendors
    .filter((v) => {
      if (!activeSeverities.has(v.severity)) return false
      if (searchQuery && !v.name.toLowerCase().includes(searchQuery.toLowerCase()) && !v.domain.toLowerCase().includes(searchQuery.toLowerCase())) return false
      return true
    })
    .sort((a, b) => {
      const dir = sortAsc ? 1 : -1
      if (sortField === "name") return dir * a.name.localeCompare(b.name)
      return dir * ((b[sortField] as number) - (a[sortField] as number))
    })

  const criticalCount = vendors.filter((v) => v.severity === "critical").length
  const highCount = vendors.filter((v) => v.severity === "high").length
  const totalCases = vendors.reduce((sum, v) => sum + v.openCases, 0)

  return (
    <ScrollArea className="h-[calc(100vh-3.5rem)]">
      <div className="flex flex-col gap-6 p-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-4 gap-4">
          <SummaryCard
            icon={<Building2 className="size-4" />}
            iconBg="bg-primary/10 text-primary"
            label="Total Vendors"
            value={String(vendors.length)}
          />
          <SummaryCard
            icon={<FileWarning className="size-4" />}
            iconBg="bg-[#EF4444]/10 text-[#EF4444]"
            label="Critical Risk"
            value={String(criticalCount)}
          />
          <SummaryCard
            icon={<FileWarning className="size-4" />}
            iconBg="bg-[#F97316]/10 text-[#F97316]"
            label="High Risk"
            value={String(highCount)}
          />
          <SummaryCard
            icon={<FileWarning className="size-4" />}
            iconBg="bg-[#EAB308]/10 text-[#EAB308]"
            label="Open Cases"
            value={String(totalCases)}
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by vendor name or domain..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-8 w-full rounded-md border border-input bg-background pl-9 pr-8 text-xs text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                <X className="size-3.5" />
              </button>
            )}
          </div>
          <div className="flex items-center gap-2">
            {severityFilters.map((s) => (
              <button
                key={s}
                onClick={() => toggleSeverity(s)}
                className={cn(
                  "flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-[10px] font-semibold capitalize transition-colors",
                  activeSeverities.has(s)
                    ? getSeverityColor(s)
                    : "border-border bg-muted/50 text-muted-foreground"
                )}
              >
                <span className={cn("size-1.5 rounded-full", activeSeverities.has(s) ? getSeverityDot(s) : "bg-muted-foreground/30")} />
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Vendor Table */}
        <div className="rounded-lg border border-border bg-card">
          <div className="overflow-hidden rounded-lg">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Vendor</th>
                  <SortableHeader label="Risk Score" field="riskScore" current={sortField} asc={sortAsc} onSort={handleSort} />
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Scenario</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Industry</th>
                  <SortableHeader label="Emails (30d)" field="emails30d" current={sortField} asc={sortAsc} onSort={handleSort} />
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Contacts</th>
                  <SortableHeader label="Cases" field="openCases" current={sortField} asc={sortAsc} onSort={handleSort} />
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Contract</th>
                </tr>
              </thead>
              <tbody>
                {filteredVendors.map((v) => (
                  <tr
                    key={v.id}
                    onClick={() => onNavigateToVendor(v.id)}
                    className="border-b border-border last:border-0 cursor-pointer hover:bg-muted/30 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-xs font-bold text-primary">
                          {v.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{v.name}</p>
                          <p className="text-[10px] text-muted-foreground">{v.domain}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={cn("inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[10px] font-semibold", getSeverityColor(v.severity))}>
                        <span className={cn("size-1.5 rounded-full", getSeverityDot(v.severity))} />
                        {v.riskScore}
                      </span>
                    </td>
                    <td className="max-w-[180px] px-4 py-3 text-muted-foreground truncate">{v.scenario}</td>
                    <td className="px-4 py-3 text-muted-foreground">{v.industry}</td>
                    <td className="px-4 py-3 text-muted-foreground">{v.emails30d.toLocaleString()}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Users className="size-3" />
                        {v.internalContacts}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      {v.openCases > 0 ? (
                        <span className="rounded-full bg-[#EF4444]/10 px-2 py-0.5 text-[10px] font-medium text-[#EF4444]">
                          {v.openCases} open
                        </span>
                      ) : (
                        <span className="text-muted-foreground">0</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <span className={cn(
                        "rounded-full px-2 py-0.5 text-[10px] font-medium",
                        v.contractStatus === "Active"
                          ? "bg-[#22C55E]/10 text-[#22C55E]"
                          : "bg-muted text-muted-foreground"
                      )}>
                        {v.contractStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredVendors.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12">
              <Building2 className="size-8 text-muted-foreground/30" />
              <p className="mt-2 text-sm text-muted-foreground">No vendors match your filters</p>
            </div>
          )}
        </div>
      </div>
    </ScrollArea>
  )
}

function SummaryCard({
  icon,
  iconBg,
  label,
  value,
}: {
  icon: React.ReactNode
  iconBg: string
  label: string
  value: string
}) {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <div className="flex items-center gap-2">
        <div className={cn("flex size-7 items-center justify-center rounded-md", iconBg)}>{icon}</div>
        <span className="text-xs font-medium text-muted-foreground">{label}</span>
      </div>
      <p className="mt-3 text-2xl font-bold tracking-tight text-card-foreground">{value}</p>
    </div>
  )
}

function SortableHeader({
  label,
  field,
  current,
  asc,
  onSort,
}: {
  label: string
  field: SortField
  current: SortField
  asc: boolean
  onSort: (field: SortField) => void
}) {
  return (
    <th className="px-4 py-3 text-left font-medium text-muted-foreground">
      <button onClick={() => onSort(field)} className="flex items-center gap-1 hover:text-foreground transition-colors">
        {label}
        <ArrowUpDown className={cn("size-3", current === field ? "text-foreground" : "text-muted-foreground/40")} />
      </button>
    </th>
  )
}
