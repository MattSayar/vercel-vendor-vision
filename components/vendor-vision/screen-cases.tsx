"use client"

import { useState, useEffect } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import {
  riskCases,
  getSeverityColor,
  getSeverityDot,
  getConfidenceColor,
  type RiskCase,
  type Severity,
  type CaseStatus,
} from "@/lib/demo-data"
import {
  Sparkles,
  ChevronDown,
  CheckCircle2,
  XCircle,
  Search,
} from "lucide-react"
import { cn } from "@/lib/utils"

const statusTabs: { label: string; value: CaseStatus | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Open", value: "open" },
  { label: "In Progress", value: "in-progress" },
  { label: "Auto-Resolved", value: "auto-resolved" },
  { label: "Dismissed", value: "dismissed" },
]

const severityFilters: Severity[] = ["critical", "high", "medium", "low"]

interface ScreenCasesProps {
  initialSearch?: string
}

export function ScreenCases({ initialSearch = "" }: ScreenCasesProps) {
  const [selectedCase, setSelectedCase] = useState<RiskCase>(riskCases[0])
  const [statusFilter, setStatusFilter] = useState<CaseStatus | "all">("all")
  const [activeSeverities, setActiveSeverities] = useState<Set<Severity>>(new Set(severityFilters))
  const [searchQuery, setSearchQuery] = useState(initialSearch)

  useEffect(() => {
    setSearchQuery(initialSearch)
  }, [initialSearch])

  const [actionStates, setActionStates] = useState<Record<string, "pending" | "approved">>({})
  const [allApproved, setAllApproved] = useState(false)

  const toggleSeverity = (s: Severity) => {
    setActiveSeverities((prev) => {
      const next = new Set(prev)
      if (next.has(s)) next.delete(s)
      else next.add(s)
      return next
    })
  }

  const filteredCases = riskCases.filter((c) => {
    if (statusFilter !== "all" && c.status !== statusFilter) return false
    if (!activeSeverities.has(c.severity)) return false
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      const haystack = `${c.id} ${c.vendorName} ${c.summary} ${c.tags.join(" ")}`.toLowerCase()
      if (!haystack.includes(q)) return false
    }
    return true
  })

  const handleApproveAll = () => {
    const newStates: Record<string, "approved"> = {}
    selectedCase.recommendedActions.forEach((a) => {
      newStates[a.id] = "approved"
    })
    setActionStates((prev) => ({ ...prev, ...newStates }))
    setAllApproved(true)
  }

  const handleApproveAction = (actionId: string) => {
    setActionStates((prev) => ({ ...prev, [actionId]: prev[actionId] === "approved" ? "pending" : "approved" }))
  }

  return (
    <div className="flex h-[calc(100vh-3.5rem)]">
      {/* Left: Case List */}
      <div className="flex w-[420px] shrink-0 flex-col border-r border-border bg-card">
        {/* Filters */}
        <div className="border-b border-border p-4">
          <div className="flex items-center gap-1 overflow-x-auto">
            {statusTabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setStatusFilter(tab.value)}
                className={cn(
                  "shrink-0 rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
                  statusFilter === tab.value
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="mt-3 flex items-center gap-2">
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
          <div className="relative mt-3">
            <Search className="absolute left-2.5 top-1/2 size-3 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search within cases..."
              className="h-7 w-full rounded-md border border-input bg-background pl-7 pr-3 text-xs text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none"
            />
          </div>
        </div>

        {/* Case Cards */}
        <ScrollArea className="flex-1">
          <div className="flex flex-col">
            {filteredCases.map((c) => (
              <button
                key={c.id}
                onClick={() => { setSelectedCase(c); setAllApproved(false); setActionStates({}) }}
                className={cn(
                  "flex flex-col gap-2 border-b border-border px-4 py-3.5 text-left transition-colors",
                  selectedCase.id === c.id
                    ? "bg-primary/5 border-l-2 border-l-primary"
                    : "hover:bg-muted/50"
                )}
              >
                <div className="flex items-center gap-2">
                  <span className={cn("inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold capitalize", getSeverityColor(c.severity))}>
                    <span className={cn("size-1.5 rounded-full", getSeverityDot(c.severity))} />
                    {c.severity}
                  </span>
                  <span className="font-mono text-[10px] text-muted-foreground">{c.id}</span>
                  <span className="ml-auto text-[10px] text-muted-foreground">{c.created}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex size-6 items-center justify-center rounded-md bg-muted text-[10px] font-bold text-muted-foreground">
                    {c.vendorName.charAt(0)}
                  </div>
                  <span className="text-xs font-semibold text-foreground">{c.vendorName}</span>
                </div>
                <p className="text-[11px] leading-relaxed text-muted-foreground line-clamp-2">{c.summary}</p>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {c.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-muted px-2 py-0.5 text-[9px] font-medium text-muted-foreground">{tag}</span>
                  ))}
                  <span className={cn(
                    "ml-auto rounded-full px-2 py-0.5 text-[9px] font-medium",
                    c.statusLabel === "Awaiting Review" ? "bg-[#EF4444]/10 text-[#EF4444]" :
                    c.statusLabel === "AI Investigating" ? "bg-primary/10 text-primary" :
                    c.statusLabel === "Action Required" ? "bg-[#F97316]/10 text-[#F97316]" :
                    "bg-[#22C55E]/10 text-[#22C55E]"
                  )}>
                    {c.statusLabel}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Right: Case Detail */}
      <ScrollArea className="flex-1">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-lg font-bold text-foreground">{selectedCase.vendorName}</h2>
                <span className={cn("inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold", getSeverityColor(selectedCase.severity))}>
                  Score: {riskCases.find(c => c.id === selectedCase.id) ? vendors.find(v => v.id === selectedCase.vendorId)?.riskScore ?? "N/A" : "N/A"}
                </span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">{selectedCase.id} · Created {selectedCase.created}</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 rounded-md border border-input px-3 py-1.5">
                <span className="text-xs text-muted-foreground">Status:</span>
                <span className="text-xs font-medium capitalize text-foreground">{selectedCase.status}</span>
                <ChevronDown className="size-3 text-muted-foreground" />
              </div>
            </div>
          </div>

          {/* Recommended Actions */}
          <div className="mt-6 rounded-lg border border-border bg-card p-5">
            <h3 className="text-sm font-semibold text-foreground">Recommended Actions</h3>
            <div className="mt-3 flex flex-col gap-2.5">
              {selectedCase.recommendedActions.map((action) => {
                const isApproved = allApproved || actionStates[action.id] === "approved"
                return (
                  <div key={action.id} className="flex items-center gap-3 rounded-md border border-border p-3">
                    <Switch
                      checked={isApproved || action.checked}
                      onCheckedChange={() => handleApproveAction(action.id)}
                      disabled={allApproved}
                    />
                    <span className={cn("text-xs text-foreground/80 flex-1", isApproved && "line-through opacity-60")}>
                      {action.label}
                    </span>
                    {isApproved && (
                      <span className="flex items-center gap-1 text-[10px] font-medium text-[#22C55E]">
                        <CheckCircle2 className="size-3" /> Approved
                      </span>
                    )}
                  </div>
                )
              })}
            </div>
            <div className="mt-4 flex items-center gap-3">
              <button
                onClick={handleApproveAll}
                disabled={allApproved}
                className={cn(
                  "rounded-md px-4 py-2 text-xs font-semibold transition-colors",
                  allApproved
                    ? "bg-[#22C55E]/10 text-[#22C55E] cursor-default"
                    : "bg-primary text-primary-foreground hover:bg-primary/90"
                )}
              >
                {allApproved ? (
                  <span className="flex items-center gap-1.5"><CheckCircle2 className="size-3.5" /> All Approved</span>
                ) : "Approve All Recommended"}
              </button>
              {!allApproved && (
                <button className="rounded-md border border-input px-4 py-2 text-xs font-semibold text-foreground hover:bg-muted transition-colors">
                  Customize & Execute
                </button>
              )}
              <button className="ml-auto text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
                <XCircle className="size-3" /> Dismiss Case
              </button>
            </div>
          </div>

          {/* AI Investigation Summary */}
          <div className="mt-6 rounded-lg border-l-4 border-l-primary border border-primary/10 bg-primary/[0.03] p-5">
            <div className="flex items-center gap-2">
              <div className="flex size-6 items-center justify-center rounded-md bg-primary/10">
                <Sparkles className="size-3.5 text-primary" />
              </div>
              <h3 className="text-sm font-semibold text-foreground">AI Investigation Summary</h3>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-foreground/80">{selectedCase.aiSummary}</p>
          </div>

          {/* Evidence Timeline */}
          <div className="mt-6">
            <h3 className="text-sm font-semibold text-foreground">Evidence Timeline</h3>
            <div className="mt-3 flex flex-col gap-3">
              {selectedCase.evidence.map((ev, i) => (
                <div key={i} className="flex gap-3 rounded-lg border border-border bg-card p-3.5">
                  <div className="flex flex-col items-center">
                    <div className={cn("size-2 rounded-full mt-1", ev.sourceColor.replace("text-", "bg-"))} />
                    {i < selectedCase.evidence.length - 1 && <div className="mt-1 h-full w-px bg-border" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className={cn("text-[10px] font-semibold", ev.sourceColor)}>
                        {ev.source}
                      </Badge>
                      <span className="text-[10px] text-muted-foreground">{ev.timestamp}</span>
                      <span className={cn("ml-auto text-[10px] font-semibold", getConfidenceColor(ev.confidence))}>
                        {ev.confidence}% confidence
                      </span>
                    </div>
                    <p className="mt-1.5 text-xs leading-relaxed text-foreground/80">{ev.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}

// Import vendors for score lookup
import { vendors } from "@/lib/demo-data"
