"use client"

import { useState } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  vendors,
  vendorDetailData,
  riskCases,
  getSeverityColor,
  getSeverityDot,
  getConfidenceColor,
  type Vendor,
} from "@/lib/demo-data"
import {
  TrendingUp,
  Users,
  Building2,
  Mail,
  FileWarning,
  Shield,
  ChevronDown,
  ExternalLink,
} from "lucide-react"
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RTooltip,
  BarChart,
  Bar,
} from "recharts"
import { cn } from "@/lib/utils"

interface VendorDetailProps {
  vendorId: string
  onBack: () => void
  onNavigateToCases?: (search?: string) => void
}

export function ScreenVendorDetail({ vendorId, onBack, onNavigateToCases }: VendorDetailProps) {
  const vendor = vendors.find((v) => v.id === vendorId) || vendors[0]
  const detail = vendorDetailData[vendor.id] || vendorDetailData["v1"]
  const [sourceFilter, setSourceFilter] = useState<string>("all")
  const [expandedSignals, setExpandedSignals] = useState<Set<string>>(new Set())
  const [expandedEmails, setExpandedEmails] = useState<Set<number>>(new Set())

  const radarData = [
    { subject: "Behavioral", value: vendor.riskComponents.behavioral, fullMark: 100 },
    { subject: "Threat Intel", value: vendor.riskComponents.threatIntel, fullMark: 100 },
    { subject: "Domain/Infra", value: vendor.riskComponents.domainInfra, fullMark: 100 },
    { subject: "Community", value: vendor.riskComponents.community, fullMark: 100 },
    { subject: "Financial", value: vendor.riskComponents.financial, fullMark: 100 },
  ]

  const filteredSignals = sourceFilter === "all"
    ? detail.intelSignals
    : detail.intelSignals.filter(s => s.source.toLowerCase().includes(sourceFilter))

  return (
    <ScrollArea className="h-[calc(100vh-3.5rem)]">
      <div className="p-6">
        {/* Vendor Header */}
        <div className="rounded-lg border border-border bg-card p-5">
          <div className="flex items-start gap-5">
            {/* Logo + Info */}
            <div className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-xl font-bold text-primary">
              {vendor.name.charAt(0)}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-bold text-foreground">{vendor.name}</h2>
                <span className="text-base text-muted-foreground">{vendor.domain}</span>
                <button onClick={onBack} className="ml-auto text-base text-primary hover:underline">
                  Back to Vendors
                </button>
              </div>

              {/* Risk Score Gauge */}
              <div className="mt-3 flex items-center gap-8">
                <div className="flex items-center gap-3">
                  <div className="relative flex size-16 items-center justify-center">
                    <svg className="size-16" viewBox="0 0 64 64">
                      <circle cx="32" cy="32" r="28" fill="none" stroke="var(--border)" strokeWidth="4" />
                      <circle
                        cx="32" cy="32" r="28" fill="none"
                        stroke={vendor.riskScore >= 80 ? "var(--danger)" : vendor.riskScore >= 60 ? "var(--orange)" : vendor.riskScore >= 40 ? "var(--warning)" : "var(--success)"}
                        strokeWidth="4"
                        strokeDasharray={`${(vendor.riskScore / 100) * 175.93} 175.93`}
                        strokeLinecap="round"
                        transform="rotate(-90 32 32)"
                      />
                    </svg>
                    <span className="absolute text-base font-bold text-foreground">{vendor.riskScore}</span>
                  </div>
                  <div>
                    <p className="text-base font-semibold text-foreground">Composite Risk Score</p>
                    <p className={cn("text-sm font-medium capitalize", getSeverityColor(vendor.severity).split(" ")[1])}>
                      {vendor.severity} Risk
                    </p>
                  </div>
                </div>

                <div className="h-10 w-px bg-border" />

                <div className="flex flex-wrap gap-x-6 gap-y-1 text-base">
                  <Stat label="Active Since" value={vendor.activeSince} />
                  <Stat label="Internal Contacts" value={String(vendor.internalContacts)} />
                  <Stat label="Departments" value={String(vendor.departments)} />
                  <Stat label="Open Cases" value={String(vendor.openCases)} />
                  <Stat label="Emails (30d)" value={vendor.emails30d.toLocaleString()} />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 flex items-center gap-2">
                <button className="rounded-md bg-primary px-3 py-1.5 text-base font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">
                  Create Case
                </button>
                <button className="rounded-md border border-input px-3 py-1.5 text-base font-semibold text-foreground hover:bg-muted transition-colors">
                  Quarantine Emails
                </button>
                <button className="rounded-md border border-input px-3 py-1.5 text-base font-semibold text-foreground hover:bg-muted transition-colors">
                  Request Assessment
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="overview" className="mt-6">
          <TabsList className="w-full justify-start gap-0 bg-transparent p-0 border-b border-border rounded-none">
            {["Overview", "Intelligence Signals", "Relationships", "Email Activity", "Cases", "Audit Log"].map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab.toLowerCase().replace(/ /g, "-")}
                className="rounded-none border-b-2 border-transparent px-4 py-2.5 text-base data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="mt-4">
            <div className="grid grid-cols-2 gap-6">
              {/* Risk Breakdown */}
              <div className="rounded-lg border border-border bg-card p-5">
                <h3 className="text-base font-semibold text-foreground">Risk Score Breakdown</h3>
                <ResponsiveContainer width="100%" height={240}>
                  <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="75%">
                    <PolarGrid stroke="var(--border)" />
                    <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} />
                    <PolarRadiusAxis domain={[0, 100]} tick={{ fontSize: 9 }} axisLine={false} />
                    <Radar name="Risk" dataKey="value" stroke="var(--purple)" fill="var(--purple)" fillOpacity={0.25} strokeWidth={2} />
                  </RadarChart>
                </ResponsiveContainer>
                <div className="mt-2 flex flex-col gap-2">
                  {radarData.map((d) => (
                    <div key={d.subject} className="flex items-center gap-3">
                      <span className="w-24 text-sm text-muted-foreground">{d.subject}</span>
                      <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                        <div
                          className="h-full rounded-full bg-primary/70"
                          style={{ width: `${d.value}%` }}
                        />
                      </div>
                      <span className="w-8 text-right text-sm font-semibold text-foreground">{d.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Vendor Profile */}
              <div className="rounded-lg border border-border bg-card p-5">
                <h3 className="text-base font-semibold text-foreground">Vendor Profile</h3>
                <div className="mt-4 flex flex-col gap-3">
                  <ProfileRow label="Industry" value={vendor.industry} />
                  <ProfileRow label="Company Size" value={vendor.size} />
                  <ProfileRow label="Location" value={vendor.location} />
                  <ProfileRow label="Primary Contact" value={vendor.primaryContact} />
                  <div className="h-px bg-border" />
                  <ProfileRow label="Contract Status" value={vendor.contractStatus} />
                  <ProfileRow label="Contract Value" value={vendor.contractValue} />
                  <ProfileRow label="Renewal Date" value={vendor.renewalDate} />
                </div>

                <h4 className="mt-6 text-base font-semibold text-foreground">Historical Risk Trend</h4>
                <ResponsiveContainer width="100%" height={120}>
                  <LineChart data={detail.historicalRisk} margin={{ top: 10, right: 5, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis dataKey="date" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} tickLine={false} axisLine={false} />
                    <YAxis domain={[0, 100]} tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} tickLine={false} axisLine={false} />
                    <Line type="monotone" dataKey="score" stroke="var(--danger)" strokeWidth={2} dot={{ fill: "var(--danger)", r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </TabsContent>

          {/* Intelligence Signals Tab */}
          <TabsContent value="intelligence-signals" className="mt-4">
            <div className="rounded-lg border border-border bg-card p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-foreground">Intelligence Signals</h3>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Filter by source:</span>
                  {["all", "behavioral", "breach", "dark web", "domain", "community", "financial"].map((f) => (
                    <button
                      key={f}
                      onClick={() => setSourceFilter(f)}
                      className={cn(
                        "rounded-md px-2 py-1 text-sm font-medium capitalize transition-colors",
                        sourceFilter === f
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>
              <div className="overflow-hidden rounded-md border border-border">
                <table className="w-full text-base">
                  <thead>
                    <tr className="border-b border-border bg-muted/50">
                      <th className="px-3 py-2 text-left font-medium text-muted-foreground">Timestamp</th>
                      <th className="px-3 py-2 text-left font-medium text-muted-foreground">Source</th>
                      <th className="px-3 py-2 text-left font-medium text-muted-foreground">Signal Type</th>
                      <th className="px-3 py-2 text-left font-medium text-muted-foreground">Description</th>
                      <th className="px-3 py-2 text-left font-medium text-muted-foreground">Confidence</th>
                      <th className="px-3 py-2 text-left font-medium text-muted-foreground">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSignals.map((signal) => {
                      const isExpanded = expandedSignals.has(signal.id)
                      return (
                      <tr
                        key={signal.id}
                        className="border-b border-border last:border-0 cursor-pointer hover:bg-muted/30 transition-colors"
                        onClick={() => setExpandedSignals((prev) => {
                          const next = new Set(prev)
                          next.has(signal.id) ? next.delete(signal.id) : next.add(signal.id)
                          return next
                        })}
                      >
                        <td className="px-3 py-2.5 font-mono text-muted-foreground">{signal.timestamp}</td>
                        <td className="px-3 py-2.5">
                          <span className={cn("rounded-full px-2 py-0.5 text-sm font-semibold", signal.sourceColor)}>
                            {signal.source}
                          </span>
                        </td>
                        <td className="px-3 py-2.5 text-foreground">{signal.signalType}</td>
                        <td className={cn("max-w-xs px-3 py-2.5 text-muted-foreground", isExpanded ? "whitespace-normal" : "truncate")}>{signal.description}</td>
                        <td className="px-3 py-2.5">
                          <span className={cn("font-semibold", getConfidenceColor(signal.confidence))}>
                            {signal.confidence}%
                          </span>
                        </td>
                        <td className="px-3 py-2.5">
                          <span className={cn(
                            "rounded-full px-2 py-0.5 text-sm font-medium",
                            signal.status === "Active" ? "bg-danger/10 text-danger" :
                            signal.status === "Confirmed" ? "bg-orange/10 text-orange" :
                            signal.status === "Monitoring" ? "bg-info/10 text-info" :
                            signal.status === "Clear" ? "bg-success/10 text-success" :
                            "bg-muted text-muted-foreground"
                          )}>
                            {signal.status}
                          </span>
                        </td>
                      </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>

          {/* Relationships Tab */}
          <TabsContent value="relationships" className="mt-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2 rounded-lg border border-border bg-card p-5">
                <h3 className="text-base font-semibold text-foreground">Department Communication Map</h3>
                <div className="mt-4 flex items-center justify-center">
                  {/* Network visualization with explicit dimensions */}
                  <div className="relative" style={{ width: 400, height: 300 }}>
                    {/* SVG connection lines */}
                    <svg className="absolute inset-0 pointer-events-none" width="400" height="300">
                      {detail.departmentContacts.map((dept, i) => {
                        const angle = (i * (360 / detail.departmentContacts.length) - 90) * (Math.PI / 180)
                        const radius = 100
                        return (
                          <line
                            key={dept.dept}
                            x1={200} y1={150}
                            x2={200 + Math.cos(angle) * radius}
                            y2={150 + Math.sin(angle) * radius}
                            stroke={dept.color}
                            strokeWidth={Math.max(1, dept.contacts / 5)}
                            strokeOpacity={0.4}
                          />
                        )
                      })}
                    </svg>
                    {/* Center vendor node */}
                    <div
                      className="absolute flex size-20 items-center justify-center rounded-full bg-primary text-base font-bold text-primary-foreground shadow-lg"
                      style={{ left: 200 - 40, top: 150 - 40 }}
                    >
                      {vendor.name.split(" ")[0]}
                    </div>
                    {/* Department nodes */}
                    {detail.departmentContacts.map((dept, i) => {
                      const angle = (i * (360 / detail.departmentContacts.length) - 90) * (Math.PI / 180)
                      const radius = 100
                      const x = 200 + Math.cos(angle) * radius
                      const y = 150 + Math.sin(angle) * radius
                      const nodeSize = 24 + dept.contacts * 1.5
                      return (
                        <div
                          key={dept.dept}
                          className="absolute flex flex-col items-center gap-1"
                          style={{
                            left: x - 35,
                            top: y - nodeSize / 2 - 2,
                          }}
                        >
                          <div
                            className="flex items-center justify-center rounded-full text-sm font-semibold text-white shadow-md"
                            style={{
                              backgroundColor: dept.color,
                              width: nodeSize,
                              height: nodeSize,
                            }}
                          >
                            {dept.contacts}
                          </div>
                          <span className="text-sm font-medium text-foreground whitespace-nowrap">{dept.dept}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
              <div className="rounded-lg border border-border bg-card p-5">
                <h3 className="text-base font-semibold text-foreground">Relationship Insights</h3>
                <div className="mt-4 flex flex-col gap-4">
                  <div className="rounded-md border border-orange/20 bg-orange/5 p-3">
                    <p className="text-sm font-semibold text-orange">Concentration Risk</p>
                    <p className="mt-1 text-base text-foreground/80">
                      82% of communication flows through 3 employees in Engineering. Consider diversifying vendor contacts.
                    </p>
                  </div>
                  <div className="rounded-md border border-warning/20 bg-warning/5 p-3">
                    <p className="text-sm font-semibold text-warning">Shadow Contacts</p>
                    <p className="mt-1 text-base text-foreground/80">
                      2 employees communicating with {vendor.name} are not in the vendor{"'"}s official contact list.
                    </p>
                  </div>
                  <div className="mt-2 flex flex-col gap-2">
                    <p className="text-sm font-medium text-muted-foreground">Top Contacts</p>
                    {["Sarah Chen, VP Eng", "Mike Torres, SRE Lead", "Lisa Park, Finance"].map((c) => (
                      <div key={c} className="flex items-center gap-2 rounded-md border border-border p-2">
                        <div className="flex size-6 items-center justify-center rounded-full bg-muted text-[13px] font-bold text-muted-foreground">
                          {c.charAt(0)}
                        </div>
                        <span className="text-sm text-foreground">{c}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Email Activity Tab */}
          <TabsContent value="email-activity" className="mt-4">
            <div className="rounded-lg border border-border bg-card p-5">
              <h3 className="text-base font-semibold text-foreground">Email Volume Over Time</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={detail.emailActivity} margin={{ top: 10, right: 5, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="day" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} tickLine={false} axisLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} tickLine={false} axisLine={false} />
                  <RTooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 11 }} />
                  <Bar dataKey="received" fill="var(--purple)" radius={[3, 3, 0, 0]} name="Received" />
                  <Bar dataKey="sent" fill="var(--purple)" fillOpacity={0.3} radius={[3, 3, 0, 0]} name="Sent" />
                </BarChart>
              </ResponsiveContainer>
              <div className="mt-4 grid grid-cols-3 gap-4">
                <MiniStat label="Avg Emails/Day" value="42" />
                <MiniStat label="Avg Response Time" value="2.4h" />
                <MiniStat label="Attachment Rate" value="34%" change="+12% this week" />
              </div>
            </div>

            <div className="mt-4 rounded-lg border border-border bg-card p-5">
              <h3 className="text-base font-semibold text-foreground">Recent Email Metadata</h3>
              <div className="mt-3 overflow-hidden rounded-md border border-border">
                <table className="w-full text-base">
                  <thead>
                    <tr className="border-b border-border bg-muted/50">
                      <th className="px-3 py-2 text-left font-medium text-muted-foreground">Date</th>
                      <th className="px-3 py-2 text-left font-medium text-muted-foreground">From</th>
                      <th className="px-3 py-2 text-left font-medium text-muted-foreground">To</th>
                      <th className="px-3 py-2 text-left font-medium text-muted-foreground">Subject</th>
                      <th className="px-3 py-2 text-left font-medium text-muted-foreground">Attach.</th>
                      <th className="px-3 py-2 text-left font-medium text-muted-foreground">Flag</th>
                    </tr>
                  </thead>
                  <tbody>
                    {detail.emailMetadata.map((e, i) => {
                      const isExpanded = expandedEmails.has(i)
                      return (
                      <tr
                        key={i}
                        className="border-b border-border last:border-0 cursor-pointer hover:bg-muted/30 transition-colors"
                        onClick={() => setExpandedEmails((prev) => {
                          const next = new Set(prev)
                          next.has(i) ? next.delete(i) : next.add(i)
                          return next
                        })}
                      >
                        <td className="px-3 py-2 font-mono text-muted-foreground">{e.date}</td>
                        <td className="px-3 py-2 text-foreground">{e.from}</td>
                        <td className="px-3 py-2 text-foreground">{e.to}</td>
                        <td className={cn("max-w-[200px] px-3 py-2 text-muted-foreground", isExpanded ? "whitespace-normal" : "truncate")}>{e.subject}</td>
                        <td className="px-3 py-2 text-center">{e.attachment ? "Y" : "N"}</td>
                        <td className="px-3 py-2">
                          {e.anomaly && <span className="rounded-full bg-danger/10 px-2 py-0.5 text-[13px] font-medium text-danger">Anomaly</span>}
                        </td>
                      </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>

          {/* Cases Tab */}
          <TabsContent value="cases" className="mt-4">
            {(() => {
              const vendorCases = riskCases.filter((c) => c.vendorId === vendor.id)
              const openCases = vendorCases.filter((c) => c.status === "open" || c.status === "in-progress")
              return (
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-semibold text-foreground">
                      Cases for {vendor.name} ({openCases.length} open)
                    </h3>
                    {onNavigateToCases && vendorCases.length > 0 && (
                      <button
                        onClick={() => onNavigateToCases(vendor.name)}
                        className="flex items-center gap-1.5 text-base font-medium text-primary hover:underline"
                      >
                        View all in Cases <ExternalLink className="size-3" />
                      </button>
                    )}
                  </div>
                  {vendorCases.length === 0 ? (
                    <div className="rounded-lg border border-border bg-card p-5">
                      <p className="text-base text-muted-foreground">No cases for this vendor.</p>
                    </div>
                  ) : (
                    vendorCases.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => onNavigateToCases?.(c.id)}
                        className="flex flex-col gap-2 rounded-lg border border-border bg-card p-4 text-left transition-colors hover:border-primary/20 hover:bg-muted/30"
                      >
                        <div className="flex items-center gap-2">
                          <span className={cn("inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-sm font-semibold capitalize", getSeverityColor(c.severity))}>
                            <span className={cn("size-1.5 rounded-full", getSeverityDot(c.severity))} />
                            {c.severity}
                          </span>
                          <span className="font-mono text-sm text-muted-foreground">{c.id}</span>
                          <span className={cn(
                            "rounded-full px-2 py-0.5 text-[13px] font-medium capitalize",
                            c.status === "open" ? "bg-danger/10 text-danger" :
                            c.status === "in-progress" ? "bg-primary/10 text-primary" :
                            c.status === "auto-resolved" ? "bg-success/10 text-success" :
                            "bg-muted text-muted-foreground"
                          )}>
                            {c.status}
                          </span>
                          <span className="ml-auto text-sm text-muted-foreground">{c.created}</span>
                        </div>
                        <p className="text-base leading-relaxed text-foreground/80 line-clamp-2">{c.summary}</p>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          {c.tags.map((tag) => (
                            <span key={tag} className="rounded-full bg-muted px-2 py-0.5 text-[13px] font-medium text-muted-foreground">{tag}</span>
                          ))}
                        </div>
                      </button>
                    ))
                  )}
                </div>
              )
            })()}
          </TabsContent>

          {/* Audit Log Tab */}
          <TabsContent value="audit-log" className="mt-4">
            <div className="rounded-lg border border-border bg-card p-5">
              <h3 className="text-base font-semibold text-foreground">Audit Log</h3>
              <div className="mt-3 flex flex-col gap-2">
                {detail.auditEntries.map((entry, i) => (
                  <div key={i} className="flex items-center gap-3 rounded-md border border-border p-3">
                    <span className="font-mono text-sm text-muted-foreground">{entry.date}</span>
                    <span className="text-base text-foreground">{entry.action}</span>
                    <span className="ml-auto text-sm text-muted-foreground">{entry.by}</span>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </ScrollArea>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="font-semibold text-foreground">{value}</p>
    </div>
  )
}

function ProfileRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-medium text-foreground">{value}</span>
    </div>
  )
}

function MiniStat({ label, value, change }: { label: string; value: string; change?: string }) {
  return (
    <div className="rounded-md border border-border p-3 text-center">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="mt-1 text-xl font-bold text-foreground">{value}</p>
      {change && <p className="text-sm text-orange">{change}</p>}
    </div>
  )
}

