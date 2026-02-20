"use client"

import { useState } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import {
  pendingActions,
  executedActions,
  playbooks,
  type RemediationAction,
} from "@/lib/demo-data"
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ChevronDown,
  ChevronUp,
  Undo2,
  Zap,
  Eye,
  UserCheck,
} from "lucide-react"
import { cn } from "@/lib/utils"

export function ScreenRemediation() {
  const [actionStates, setActionStates] = useState<Record<string, "pending" | "approved" | "rejected">>({})
  const [expandedAction, setExpandedAction] = useState<string | null>(null)
  const [playbookStates, setPlaybookStates] = useState<Record<string, boolean>>(
    Object.fromEntries(playbooks.map((p) => [p.id, p.enabled]))
  )

  const handleAction = (id: string, action: "approved" | "rejected") => {
    setActionStates((prev) => ({ ...prev, [id]: action }))
  }

  return (
    <ScrollArea className="h-[calc(100vh-3.5rem)]">
      <div className="p-6">
        <Tabs defaultValue="pending" className="w-full">
          <TabsList className="w-full justify-start gap-0 bg-transparent p-0 border-b border-border rounded-none">
            <TabsTrigger
              value="pending"
              className="rounded-none border-b-2 border-transparent px-4 py-2.5 text-xs data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
            >
              Pending Approval ({pendingActions.length})
            </TabsTrigger>
            <TabsTrigger
              value="executed"
              className="rounded-none border-b-2 border-transparent px-4 py-2.5 text-xs data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
            >
              Recently Executed
            </TabsTrigger>
            <TabsTrigger
              value="playbooks"
              className="rounded-none border-b-2 border-transparent px-4 py-2.5 text-xs data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
            >
              Playbook Library
            </TabsTrigger>
          </TabsList>

          {/* Pending Approval */}
          <TabsContent value="pending" className="mt-4">
            <div className="flex flex-col gap-3">
              {pendingActions.map((action) => {
                const state = actionStates[action.id] || "pending"
                const isExpanded = expandedAction === action.id
                return (
                  <div
                    key={action.id}
                    className={cn(
                      "rounded-lg border bg-card transition-all",
                      state === "approved" ? "border-[#22C55E]/30 bg-[#22C55E]/[0.02]" :
                      state === "rejected" ? "border-[#EF4444]/30 bg-[#EF4444]/[0.02] opacity-60" :
                      "border-border"
                    )}
                  >
                    <div className="p-5">
                      <div className="flex items-start gap-4">
                        <div className={cn(
                          "flex size-9 shrink-0 items-center justify-center rounded-lg",
                          state === "approved" ? "bg-[#22C55E]/10" :
                          state === "rejected" ? "bg-[#EF4444]/10" :
                          "bg-primary/10"
                        )}>
                          <ShieldCheck className={cn(
                            "size-4.5",
                            state === "approved" ? "text-[#22C55E]" :
                            state === "rejected" ? "text-[#EF4444]" :
                            "text-primary"
                          )} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">{action.type}</span>
                            {state === "approved" && (
                              <span className="flex items-center gap-1 text-[10px] font-medium text-[#22C55E]">
                                <CheckCircle2 className="size-3" /> Approved
                              </span>
                            )}
                            {state === "rejected" && (
                              <span className="flex items-center gap-1 text-[10px] font-medium text-[#EF4444]">
                                <XCircle className="size-3" /> Rejected
                              </span>
                            )}
                          </div>
                          <p className="mt-1.5 text-sm font-semibold text-foreground">{action.description}</p>
                          <p className="mt-1 text-xs text-muted-foreground">{action.trigger}</p>
                          <div className="mt-2 flex items-center gap-4">
                            <span className="text-[11px] text-muted-foreground">
                              Impact: {action.impact}
                            </span>
                            <span className="text-[11px] font-medium text-primary">
                              AI Confidence: {action.confidence}%
                            </span>
                          </div>
                        </div>

                        {state === "pending" && (
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleAction(action.id, "approved")}
                              className="rounded-md bg-[#22C55E] px-3 py-1.5 text-xs font-semibold text-[#FFFFFF] hover:bg-[#22C55E]/90 transition-colors"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => setExpandedAction(isExpanded ? null : action.id)}
                              className="rounded-md bg-[#3B82F6] px-3 py-1.5 text-xs font-semibold text-[#FFFFFF] hover:bg-[#3B82F6]/90 transition-colors"
                            >
                              Modify
                            </button>
                            <button
                              onClick={() => handleAction(action.id, "rejected")}
                              className="rounded-md border border-[#EF4444]/30 px-3 py-1.5 text-xs font-semibold text-[#EF4444] hover:bg-[#EF4444]/5 transition-colors"
                            >
                              Reject
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Expanded reasoning */}
                      {isExpanded && (
                        <div className="mt-4 rounded-md border border-primary/10 bg-primary/[0.03] p-4">
                          <p className="text-[11px] font-semibold text-foreground">AI Reasoning Chain</p>
                          <p className="mt-2 text-xs leading-relaxed text-foreground/80">
                            The agent detected behavioral anomalies correlated with threat intelligence signals. Based on the configured playbook thresholds and the {action.confidence}% confidence score, this action was recommended for human approval. The reasoning includes cross-validation against community intelligence from {Math.floor(Math.random() * 5 + 2)} other Abnormal customers.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </TabsContent>

          {/* Recently Executed */}
          <TabsContent value="executed" className="mt-4">
            <div className="flex flex-col gap-3">
              {executedActions.map((action) => (
                <div key={action.id} className="rounded-lg border border-border bg-card p-5">
                  <div className="flex items-start gap-4">
                    <div className={cn(
                      "flex size-9 shrink-0 items-center justify-center rounded-lg",
                      action.outcome === "success" ? "bg-[#22C55E]/10" :
                      action.outcome === "partial" ? "bg-[#EAB308]/10" :
                      "bg-[#EF4444]/10"
                    )}>
                      {action.outcome === "success" ? (
                        <CheckCircle2 className="size-4.5 text-[#22C55E]" />
                      ) : action.outcome === "partial" ? (
                        <AlertTriangle className="size-4.5 text-[#EAB308]" />
                      ) : (
                        <XCircle className="size-4.5 text-[#EF4444]" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-muted-foreground">{action.timestamp}</span>
                        <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">{action.type}</span>
                        <span className="text-xs font-medium text-foreground">{action.vendor}</span>
                        <span className={cn(
                          "ml-auto rounded-full px-2 py-0.5 text-[10px] font-semibold capitalize",
                          action.outcome === "success" ? "bg-[#22C55E]/10 text-[#22C55E]" :
                          action.outcome === "partial" ? "bg-[#EAB308]/10 text-[#EAB308]" :
                          "bg-[#EF4444]/10 text-[#EF4444]"
                        )}>
                          {action.outcome}
                        </span>
                      </div>
                      <p className="mt-2 text-xs leading-relaxed text-foreground/80">{action.description}</p>
                      <div className="mt-2 flex items-center gap-3">
                        {action.reversible && (
                          <button className="flex items-center gap-1 text-[10px] font-medium text-primary hover:underline">
                            <Undo2 className="size-3" /> Undo
                          </button>
                        )}
                        <button className="flex items-center gap-1 text-[10px] font-medium text-muted-foreground hover:text-foreground">
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Playbook Library */}
          <TabsContent value="playbooks" className="mt-4">
            <div className="grid grid-cols-2 gap-4">
              {playbooks.map((pb) => (
                <div key={pb.id} className="rounded-lg border border-border bg-card p-5">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <div className={cn(
                        "flex size-8 items-center justify-center rounded-lg",
                        pb.mode === "autonomous" ? "bg-[#22C55E]/10" :
                        pb.mode === "human-approval" ? "bg-primary/10" :
                        "bg-[#3B82F6]/10"
                      )}>
                        {pb.mode === "autonomous" ? <Zap className="size-4 text-[#22C55E]" /> :
                         pb.mode === "human-approval" ? <UserCheck className="size-4 text-primary" /> :
                         <Eye className="size-4 text-[#3B82F6]" />}
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-foreground">{pb.name}</h4>
                        <span className={cn(
                          "rounded-full px-2 py-0.5 text-[9px] font-medium capitalize",
                          pb.mode === "autonomous" ? "bg-[#22C55E]/10 text-[#22C55E]" :
                          pb.mode === "human-approval" ? "bg-primary/10 text-primary" :
                          "bg-[#3B82F6]/10 text-[#3B82F6]"
                        )}>
                          {pb.mode.replace("-", " ")}
                        </span>
                      </div>
                    </div>
                    <Switch
                      checked={playbookStates[pb.id]}
                      onCheckedChange={(v) => setPlaybookStates((prev) => ({ ...prev, [pb.id]: v }))}
                    />
                  </div>
                  <p className="mt-3 text-xs text-muted-foreground">{pb.description}</p>
                  <div className="mt-3 rounded-md bg-muted/50 p-2.5">
                    <p className="text-[10px] font-medium text-muted-foreground">Trigger</p>
                    <p className="mt-0.5 text-[11px] text-foreground/80">{pb.trigger}</p>
                  </div>
                  <div className="mt-2">
                    <p className="text-[10px] font-medium text-muted-foreground">Actions</p>
                    <ul className="mt-1 flex flex-col gap-1">
                      {pb.actions.map((a, i) => (
                        <li key={i} className="flex items-center gap-1.5 text-[11px] text-foreground/80">
                          <span className="size-1 rounded-full bg-muted-foreground/40" />
                          {a}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <button className="mt-3 text-[10px] font-medium text-primary hover:underline">
                    Edit Playbook
                  </button>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </ScrollArea>
  )
}
