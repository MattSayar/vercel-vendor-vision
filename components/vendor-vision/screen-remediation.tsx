"use client"

import { useState } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import {
  pendingActions,
  executedActions,
  playbooks,
  type ExecutedAction,
} from "@/lib/demo-data"
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ChevronDown,
  Undo2,
  Zap,
  Eye,
  UserCheck,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface ScreenRemediationProps {
  caseExecutedActions?: ExecutedAction[]
}

export function ScreenRemediation({ caseExecutedActions = [] }: ScreenRemediationProps) {
  const [actionStates, setActionStates] = useState<Record<string, "pending" | "approved" | "rejected">>({})
  const [expandedReasoning, setExpandedReasoning] = useState<string | null>(null)
  const [modifyingAction, setModifyingAction] = useState<string | null>(null)
  const [modifiedDescriptions, setModifiedDescriptions] = useState<Record<string, string>>({})
  const [modifiedImpacts, setModifiedImpacts] = useState<Record<string, string>>({})
  const [expandedExecuted, setExpandedExecuted] = useState<string | null>(null)
  const [playbookStates, setPlaybookStates] = useState<Record<string, boolean>>(
    Object.fromEntries(playbooks.map((p) => [p.id, p.enabled]))
  )

  const handleAction = (id: string, action: "approved" | "rejected") => {
    setActionStates((prev) => ({ ...prev, [id]: action }))
    setModifyingAction(null)
    setExpandedReasoning(null)
  }

  const handleUndo = (id: string) => {
    setActionStates((prev) => {
      const next = { ...prev }
      delete next[id]
      return next
    })
    setModifiedDescriptions((prev) => {
      const next = { ...prev }
      delete next[id]
      return next
    })
    setModifiedImpacts((prev) => {
      const next = { ...prev }
      delete next[id]
      return next
    })
  }

  const toggleReasoning = (id: string) => {
    setExpandedReasoning((prev) => (prev === id ? null : id))
    setModifyingAction(null)
  }

  const toggleModify = (id: string) => {
    const opening = modifyingAction !== id
    setModifyingAction(opening ? id : null)
    setExpandedReasoning(null)
    if (opening) {
      const action = pendingActions.find((a) => a.id === id)
      if (action) {
        if (!modifiedDescriptions[id]) setModifiedDescriptions((prev) => ({ ...prev, [id]: action.description }))
        if (!modifiedImpacts[id]) setModifiedImpacts((prev) => ({ ...prev, [id]: action.impact }))
      }
    }
  }

  const pendingCount = pendingActions.filter((a) => (actionStates[a.id] || "pending") === "pending").length

  return (
    <ScrollArea className="h-[calc(100vh-3.5rem)]">
      <div className="p-6">
        <Tabs defaultValue="pending" className="w-full">
          <TabsList className="w-full justify-start gap-0 bg-transparent p-0 border-b border-border rounded-none">
            <TabsTrigger
              value="pending"
              className="rounded-none border-b-2 border-transparent px-4 py-2.5 text-xs data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
            >
              Pending Approval ({pendingCount})
            </TabsTrigger>
            <TabsTrigger
              value="executed"
              className="rounded-none border-b-2 border-transparent px-4 py-2.5 text-xs data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              onClick={() => { setExpandedReasoning(null); setModifyingAction(null) }}
            >
              Recently Executed
            </TabsTrigger>
            <TabsTrigger
              value="playbooks"
              className="rounded-none border-b-2 border-transparent px-4 py-2.5 text-xs data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              onClick={() => { setExpandedReasoning(null); setModifyingAction(null) }}
            >
              Playbook Library
            </TabsTrigger>
          </TabsList>

          {/* Pending Approval */}
          <TabsContent value="pending" className="mt-4">
            <div className="flex flex-col gap-3">
              {pendingActions.map((action) => {
                const state = actionStates[action.id] || "pending"
                const isReasoningOpen = expandedReasoning === action.id
                const isModifying = modifyingAction === action.id
                const displayDescription = modifiedDescriptions[action.id] || action.description
                const displayImpact = modifiedImpacts[action.id] || action.impact
                return (
                  <div
                    key={action.id}
                    onClick={() => state === "pending" && toggleReasoning(action.id)}
                    className={cn(
                      "rounded-lg border bg-card transition-all",
                      state === "approved" ? "border-[#22C55E]/30 bg-[#22C55E]/[0.02]" :
                      state === "rejected" ? "border-[#EF4444]/30 bg-[#EF4444]/[0.02] opacity-60" :
                      "border-border hover:border-primary/20 hover:bg-muted/30 cursor-pointer"
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
                            {state === "pending" && (
                              <ChevronDown className={cn("size-3 text-muted-foreground transition-transform", isReasoningOpen && "rotate-180")} />
                            )}
                          </div>
                          <p className="mt-1.5 text-sm font-semibold text-foreground">{displayDescription}</p>
                          <p className="mt-1 text-xs text-muted-foreground">{action.trigger}</p>
                          <div className="mt-2 flex items-center gap-4">
                            <span className="text-[11px] text-muted-foreground">
                              Impact: {displayImpact}
                            </span>
                            <span className="text-[11px] font-medium text-primary">
                              AI Confidence: {action.confidence}%
                            </span>
                          </div>
                        </div>

                        {state === "pending" && (
                          <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                            <button
                              onClick={() => handleAction(action.id, "approved")}
                              className="rounded-md bg-[#22C55E] px-3 py-1.5 text-xs font-semibold text-[#FFFFFF] hover:bg-[#22C55E]/90 transition-colors"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => toggleModify(action.id)}
                              className={cn(
                                "rounded-md px-3 py-1.5 text-xs font-semibold transition-colors",
                                isModifying
                                  ? "bg-[#3B82F6] text-[#FFFFFF]"
                                  : "rounded-md bg-[#3B82F6] text-[#FFFFFF] hover:bg-[#3B82F6]/90"
                              )}
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

                      {/* AI Reasoning Chain */}
                      {isReasoningOpen && !isModifying && (
                        <div className="mt-4 rounded-md border border-primary/10 bg-primary/[0.03] p-4">
                          <p className="text-[11px] font-semibold text-foreground">AI Reasoning Chain</p>
                          <ol className="mt-3 flex flex-col gap-2.5">
                            <ReasoningStep
                              step={1}
                              title="Signal Detection"
                              detail={`Detected anomalous signals from ${action.trigger.split(":")[0].replace("Triggered by ", "")}. Initial signal confidence: ${action.confidence - 8}%.`}
                            />
                            <ReasoningStep
                              step={2}
                              title="Cross-Correlation"
                              detail={`Correlated with threat intelligence feeds and behavioral baselines. ${action.type === "Quarantine Emails" ? "Email volume spike of 340% vs. 30-day average." : action.type === "Escalate to Procurement" ? "Financial risk indicators from 2 independent sources." : "Domain reputation score decreased 15 points in 7 days."}`}
                            />
                            <ReasoningStep
                              step={3}
                              title="Community Validation"
                              detail={`Cross-validated against community intelligence from ${action.confidence > 85 ? "4" : "2"} other Abnormal customers seeing similar patterns for this vendor.`}
                            />
                            <ReasoningStep
                              step={4}
                              title="Playbook Match"
                              detail={`Matched playbook rule: "${action.type}" with confidence threshold met (${action.confidence}% >= 60% required). Action queued for human approval.`}
                            />
                            <ReasoningStep
                              step={5}
                              title="Impact Assessment"
                              detail={`Estimated impact: ${action.impact}. Action classified as reversible. No conflicting remediations in queue.`}
                            />
                          </ol>
                        </div>
                      )}

                      {/* Modify Panel */}
                      {isModifying && (
                        <div className="mt-4 rounded-md border border-[#3B82F6]/20 bg-[#3B82F6]/[0.03] p-4" onClick={(e) => e.stopPropagation()}>
                          <p className="text-[11px] font-semibold text-foreground">Modify Remediation Action</p>
                          <div className="mt-3 flex flex-col gap-3">
                            <div>
                              <label className="text-[10px] font-medium text-muted-foreground">Action Type</label>
                              <select className="mt-1 h-8 w-full rounded-md border border-input bg-background px-2.5 text-xs text-foreground focus:border-ring focus:outline-none">
                                <option>{action.type}</option>
                                <option>Quarantine Emails</option>
                                <option>Block Sender Domain</option>
                                <option>Escalate to Procurement</option>
                                <option>Enhanced Monitoring</option>
                                <option>Security Questionnaire</option>
                                <option>Restrict File Sharing</option>
                              </select>
                            </div>
                            <div>
                              <label className="text-[10px] font-medium text-muted-foreground">Description</label>
                              <textarea
                                value={modifiedDescriptions[action.id] || action.description}
                                onChange={(e) => setModifiedDescriptions((prev) => ({ ...prev, [action.id]: e.target.value }))}
                                className="mt-1 h-16 w-full rounded-md border border-input bg-background px-2.5 py-2 text-xs text-foreground resize-none focus:border-ring focus:outline-none"
                              />
                            </div>
                            <div>
                              <label className="text-[10px] font-medium text-muted-foreground">Expected Impact</label>
                              <textarea
                                value={modifiedImpacts[action.id] || action.impact}
                                onChange={(e) => setModifiedImpacts((prev) => ({ ...prev, [action.id]: e.target.value }))}
                                className="mt-1 h-12 w-full rounded-md border border-input bg-background px-2.5 py-2 text-xs text-foreground resize-none focus:border-ring focus:outline-none"
                              />
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleAction(action.id, "approved")}
                                className="rounded-md bg-[#22C55E] px-3 py-1.5 text-xs font-semibold text-[#FFFFFF] hover:bg-[#22C55E]/90 transition-colors"
                              >
                                Save & Approve
                              </button>
                              <button
                                onClick={() => setModifyingAction(null)}
                                className="rounded-md border border-input px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-muted transition-colors"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
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
              {/* Newly approved actions from pending tab */}
              {pendingActions
                .filter((a) => actionStates[a.id] === "approved")
                .map((action) => (
                  <div key={action.id} className="rounded-lg border border-[#22C55E]/30 bg-[#22C55E]/[0.02] p-5">
                    <div className="flex items-start gap-4">
                      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#22C55E]/10">
                        <CheckCircle2 className="size-4.5 text-[#22C55E]" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono text-muted-foreground">Just now</span>
                          <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">{action.type}</span>
                          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">You approved</span>
                          <span className="ml-auto rounded-full px-2 py-0.5 text-[10px] font-semibold bg-[#22C55E]/10 text-[#22C55E]">
                            success
                          </span>
                        </div>
                        <p className="mt-2 text-xs leading-relaxed text-foreground/80">
                          {modifiedDescriptions[action.id] || action.description}
                        </p>
                        <div className="mt-2 flex items-center gap-3">
                          <button onClick={() => handleUndo(action.id)} className="flex items-center gap-1 text-[10px] font-medium text-primary hover:underline">
                            <Undo2 className="size-3" /> Undo
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              {/* Actions executed from Cases page */}
              {caseExecutedActions.map((action) => {
                const isExpanded = expandedExecuted === action.id
                return (
                  <div key={action.id} className="rounded-lg border border-primary/30 bg-primary/[0.02] p-5">
                    <div className="flex items-start gap-4">
                      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#22C55E]/10">
                        <CheckCircle2 className="size-4.5 text-[#22C55E]" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono text-muted-foreground">{action.timestamp}</span>
                          <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">{action.type}</span>
                          <span className="text-xs font-medium text-foreground">{action.vendor}</span>
                          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">From Cases</span>
                          <span className="ml-auto rounded-full px-2 py-0.5 text-[10px] font-semibold bg-[#22C55E]/10 text-[#22C55E]">
                            success
                          </span>
                        </div>
                        <p className="mt-2 text-xs leading-relaxed text-foreground/80">{action.description}</p>
                        <div className="mt-2 flex items-center gap-3">
                          <button
                            onClick={() => setExpandedExecuted(isExpanded ? null : action.id)}
                            className="flex items-center gap-1 text-[10px] font-medium text-muted-foreground hover:text-foreground"
                          >
                            <ChevronDown className={cn("size-3 transition-transform", isExpanded && "rotate-180")} />
                            {isExpanded ? "Hide Details" : "View Details"}
                          </button>
                        </div>
                        {isExpanded && (
                          <div className="mt-3 rounded-md border border-border bg-muted/30 p-3">
                            <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">Actions Taken</p>
                            <ol className="mt-2 flex flex-col gap-1.5">
                              {action.actions.map((a, i) => (
                                <li key={i} className="flex items-start gap-2">
                                  <div className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-[#22C55E]/15 text-[8px] font-bold text-[#22C55E]">
                                    {"\u2713"}
                                  </div>
                                  <span className="text-[11px] leading-relaxed text-foreground/80">{a.step}</span>
                                  <span className="ml-auto shrink-0 text-[9px] font-medium capitalize text-[#22C55E]">{a.result}</span>
                                </li>
                              ))}
                            </ol>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
              {/* Pre-existing executed actions */}
              {executedActions.map((action) => {
                const isExpanded = expandedExecuted === action.id
                return (
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
                          <button
                            onClick={() => setExpandedExecuted(isExpanded ? null : action.id)}
                            className="flex items-center gap-1 text-[10px] font-medium text-muted-foreground hover:text-foreground"
                          >
                            <ChevronDown className={cn("size-3 transition-transform", isExpanded && "rotate-180")} />
                            {isExpanded ? "Hide Details" : "View Details"}
                          </button>
                        </div>

                        {/* Expanded action steps */}
                        {isExpanded && (
                          <div className="mt-3 rounded-md border border-border bg-muted/30 p-3">
                            <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">Actions Taken</p>
                            <ol className="mt-2 flex flex-col gap-1.5">
                              {action.actions.map((a, i) => (
                                <li key={i} className="flex items-start gap-2">
                                  <div className={cn(
                                    "mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full text-[8px] font-bold",
                                    a.result === "success" ? "bg-[#22C55E]/15 text-[#22C55E]" :
                                    a.result === "partial" ? "bg-[#EAB308]/15 text-[#EAB308]" :
                                    a.result === "failed" ? "bg-[#EF4444]/15 text-[#EF4444]" :
                                    "bg-muted text-muted-foreground"
                                  )}>
                                    {a.result === "success" ? "\u2713" :
                                     a.result === "partial" ? "~" :
                                     a.result === "failed" ? "\u2717" : "\u2014"}
                                  </div>
                                  <span className={cn(
                                    "text-[11px] leading-relaxed",
                                    a.result === "skipped" ? "text-muted-foreground" : "text-foreground/80"
                                  )}>
                                    {a.step}
                                  </span>
                                  <span className={cn(
                                    "ml-auto shrink-0 text-[9px] font-medium capitalize",
                                    a.result === "success" ? "text-[#22C55E]" :
                                    a.result === "partial" ? "text-[#EAB308]" :
                                    a.result === "failed" ? "text-[#EF4444]" :
                                    "text-muted-foreground"
                                  )}>
                                    {a.result}
                                  </span>
                                </li>
                              ))}
                            </ol>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
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

function ReasoningStep({ step, title, detail }: { step: number; title: string; detail: string }) {
  return (
    <li className="flex gap-3">
      <div className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-[9px] font-bold text-primary">
        {step}
      </div>
      <div>
        <p className="text-[11px] font-semibold text-foreground">{title}</p>
        <p className="mt-0.5 text-xs leading-relaxed text-foreground/70">{detail}</p>
      </div>
    </li>
  )
}
