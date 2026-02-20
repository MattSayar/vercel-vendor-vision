"use client"

import { useState } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  vendors,
  acmeIntelSignals,
  getSeverityColor,
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
}

const emailActivityData = [
  { day: "Feb 1", sent: 12, received: 38 },
  { day: "Feb 4", sent: 15, received: 42 },
  { day: "Feb 7", sent: 8, received: 35 },
  { day: "Feb 10", sent: 22, received: 65 },
  { day: "Feb 13", sent: 18, received: 48 },
  { day: "Feb 16", sent: 45, received: 120, anomaly: true },
  { day: "Feb 19", sent: 38, received: 95 },
]

const historicalRisk = [
  { date: "Nov", score: 45 },
  { date: "Dec", score: 52 },
  { date: "Jan", score: 68 },
  { date: "Feb", score: 92 },
]

const departmentContacts = [
  { dept: "Engineering", contacts: 18, color: "#3B82F6" },
  { dept: "Finance", contacts: 14, color: "#22C55E" },
  { dept: "Legal", contacts: 8, color: "#818CF8" },
  { dept: "Operations", contacts: 7, color: "#F97316" },
]

export function ScreenVendorDetail({ vendorId, onBack }: VendorDetailProps) {
  const vendor = vendors.find((v) => v.id === vendorId) || vendors[0]
  const [sourceFilter, setSourceFilter] = useState<string>("all")

  const radarData = [
    { subject: "Behavioral", value: vendor.riskComponents.behavioral, fullMark: 100 },
    { subject: "Threat Intel", value: vendor.riskComponents.threatIntel, fullMark: 100 },
    { subject: "Domain/Infra", value: vendor.riskComponents.domainInfra, fullMark: 100 },
    { subject: "Community", value: vendor.riskComponents.community, fullMark: 100 },
    { subject: "Financial", value: vendor.riskComponents.financial, fullMark: 100 },
  ]

  const filteredSignals = sourceFilter === "all"
    ? acmeIntelSignals
    : acmeIntelSignals.filter(s => s.source.toLowerCase().includes(sourceFilter))

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
                <h2 className="text-lg font-bold text-foreground">{vendor.name}</h2>
                <span className="text-xs text-muted-foreground">{vendor.domain}</span>
                <button onClick={onBack} className="ml-auto text-xs text-primary hover:underline">
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
                        stroke={vendor.riskScore >= 80 ? "#EF4444" : vendor.riskScore >= 60 ? "#F97316" : vendor.riskScore >= 40 ? "#EAB308" : "#22C55E"}
                        strokeWidth="4"
                        strokeDasharray={`${(vendor.riskScore / 100) * 175.93} 175.93`}
                        strokeLinecap="round"
                        transform="rotate(-90 32 32)"
                      />
                    </svg>
                    <span className="absolute text-sm font-bold text-foreground">{vendor.riskScore}</span>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-foreground">Composite Risk Score</p>
                    <p className={cn("text-[10px] font-medium capitalize", getSeverityColor(vendor.severity).split(" ")[1])}>
                      {vendor.severity} Risk
                    </p>
                  </div>
                </div>

                <div className="h-10 w-px bg-border" />

                <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs">
                  <Stat label="Active Since" value={vendor.activeSince} />
                  <Stat label="Internal Contacts" value={String(vendor.internalContacts)} />
                  <Stat label="Departments" value={String(vendor.departments)} />
                  <Stat label="Open Cases" value={String(vendor.openCases)} />
                  <Stat label="Emails (30d)" value={vendor.emails30d.toLocaleString()} />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 flex items-center gap-2">
                <button className="rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">
                  Create Case
                </button>
                <button className="rounded-md border border-input px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-muted transition-colors">
                  Quarantine Emails
                </button>
                <button className="rounded-md border border-input px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-muted transition-colors">
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
                className="rounded-none border-b-2 border-transparent px-4 py-2.5 text-xs data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
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
                <h3 className="text-sm font-semibold text-foreground">Risk Score Breakdown</h3>
                <ResponsiveContainer width="100%" height={240}>
                  <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="75%">
                    <PolarGrid stroke="var(--border)" />
                    <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} />
                    <PolarRadiusAxis domain={[0, 100]} tick={{ fontSize: 9 }} axisLine={false} />
                    <Radar name="Risk" dataKey="value" stroke="#818CF8" fill="#818CF8" fillOpacity={0.25} strokeWidth={2} />
                  </RadarChart>
                </ResponsiveContainer>
                <div className="mt-2 flex flex-col gap-2">
                  {radarData.map((d) => (
                    <div key={d.subject} className="flex items-center gap-3">
                      <span className="w-24 text-[11px] text-muted-foreground">{d.subject}</span>
                      <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                        <div
                          className="h-full rounded-full bg-primary/70"
                          style={{ width: `${d.value}%` }}
                        />
                      </div>
                      <span className="w-8 text-right text-[11px] font-semibold text-foreground">{d.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Vendor Profile */}
              <div className="rounded-lg border border-border bg-card p-5">
                <h3 className="text-sm font-semibold text-foreground">Vendor Profile</h3>
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

                <h4 className="mt-6 text-xs font-semibold text-foreground">Historical Risk Trend</h4>
                <ResponsiveContainer width="100%" height={120}>
                  <LineChart data={historicalRisk} margin={{ top: 10, right: 5, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis dataKey="date" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} tickLine={false} axisLine={false} />
                    <YAxis domain={[0, 100]} tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} tickLine={false} axisLine={false} />
                    <Line type="monotone" dataKey="score" stroke="#EF4444" strokeWidth={2} dot={{ fill: "#EF4444", r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </TabsContent>

          {/* Intelligence Signals Tab */}
          <TabsContent value="intelligence-signals" className="mt-4">
            <div className="rounded-lg border border-border bg-card p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-foreground">Intelligence Signals</h3>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-muted-foreground">Filter by source:</span>
                  {["all", "behavioral", "breach", "dark web", "domain", "community", "financial"].map((f) => (
                    <button
                      key={f}
                      onClick={() => setSourceFilter(f)}
                      className={cn(
                        "rounded-md px-2 py-1 text-[10px] font-medium capitalize transition-colors",
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
                <table className="w-full text-xs">
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
                    {filteredSignals.map((signal) => (
                      <tr key={signal.id} className="border-b border-border last:border-0">
                        <td className="px-3 py-2.5 font-mono text-muted-foreground">{signal.timestamp}</td>
                        <td className="px-3 py-2.5">
                          <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-semibold", signal.sourceColor)}>
                            {signal.source}
                          </span>
                        </td>
                        <td className="px-3 py-2.5 text-foreground">{signal.signalType}</td>
                        <td className="max-w-xs px-3 py-2.5 text-muted-foreground truncate">{signal.description}</td>
                        <td className="px-3 py-2.5">
                          <span className={cn("font-semibold", getConfidenceColor(signal.confidence))}>
                            {signal.confidence}%
                          </span>
                        </td>
                        <td className="px-3 py-2.5">
                          <span className={cn(
                            "rounded-full px-2 py-0.5 text-[10px] font-medium",
                            signal.status === "Active" ? "bg-[#EF4444]/10 text-[#EF4444]" :
                            signal.status === "Confirmed" ? "bg-[#F97316]/10 text-[#F97316]" :
                            signal.status === "Monitoring" ? "bg-[#3B82F6]/10 text-[#3B82F6]" :
                            signal.status === "Clear" ? "bg-[#22C55E]/10 text-[#22C55E]" :
                            "bg-muted text-muted-foreground"
                          )}>
                            {signal.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>

          {/* Relationships Tab */}
          <TabsContent value="relationships" className="mt-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2 rounded-lg border border-border bg-card p-5">
                <h3 className="text-sm font-semibold text-foreground">Department Communication Map</h3>
                <div className="mt-4 flex items-center justify-center py-8">
                  {/* Simple network visualization */}
                  <div className="relative">
                    {/* Center vendor node */}
                    <div className="flex size-20 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground shadow-lg">
                      {vendor.name.split(" ")[0]}
                    </div>
                    {/* Department nodes */}
                    {departmentContacts.map((dept, i) => {
                      const angle = (i * (360 / departmentContacts.length) - 90) * (Math.PI / 180)
                      const radius = 120
                      const x = Math.cos(angle) * radius
                      const y = Math.sin(angle) * radius
                      return (
                        <div
                          key={dept.dept}
                          className="absolute flex flex-col items-center gap-1"
                          style={{
                            left: `calc(50% + ${x}px - 35px)`,
                            top: `calc(50% + ${y}px - 20px)`,
                          }}
                        >
                          <div
                            className="flex items-center justify-center rounded-full text-[10px] font-semibold text-[#FFFFFF] shadow-md"
                            style={{
                              backgroundColor: dept.color,
                              width: 24 + dept.contacts * 1.5,
                              height: 24 + dept.contacts * 1.5,
                            }}
                          >
                            {dept.contacts}
                          </div>
                          <span className="text-[10px] font-medium text-foreground">{dept.dept}</span>
                        </div>
                      )
                    })}
                    {/* SVG lines */}
                    <svg
                      className="absolute inset-0 pointer-events-none"
                      width="300"
                      height="300"
                      style={{ left: "calc(50% - 150px)", top: "calc(50% - 150px)" }}
                    >
                      {departmentContacts.map((dept, i) => {
                        const angle = (i * (360 / departmentContacts.length) - 90) * (Math.PI / 180)
                        const radius = 120
                        return (
                          <line
                            key={dept.dept}
                            x1="150" y1="150"
                            x2={150 + Math.cos(angle) * radius}
                            y2={150 + Math.sin(angle) * radius}
                            stroke={dept.color}
                            strokeWidth={Math.max(1, dept.contacts / 5)}
                            strokeOpacity={0.4}
                          />
                        )
                      })}
                    </svg>
                  </div>
                </div>
              </div>
              <div className="rounded-lg border border-border bg-card p-5">
                <h3 className="text-sm font-semibold text-foreground">Relationship Insights</h3>
                <div className="mt-4 flex flex-col gap-4">
                  <div className="rounded-md border border-[#F97316]/20 bg-[#F97316]/5 p-3">
                    <p className="text-[10px] font-semibold text-[#F97316]">Concentration Risk</p>
                    <p className="mt-1 text-xs text-foreground/80">
                      82% of communication flows through 3 employees in Engineering. Consider diversifying vendor contacts.
                    </p>
                  </div>
                  <div className="rounded-md border border-[#EAB308]/20 bg-[#EAB308]/5 p-3">
                    <p className="text-[10px] font-semibold text-[#EAB308]">Shadow Contacts</p>
                    <p className="mt-1 text-xs text-foreground/80">
                      2 employees communicating with {vendor.name} are not in the vendor{"'"}s official contact list.
                    </p>
                  </div>
                  <div className="mt-2 flex flex-col gap-2">
                    <p className="text-[10px] font-medium text-muted-foreground">Top Contacts</p>
                    {["Sarah Chen, VP Eng", "Mike Torres, SRE Lead", "Lisa Park, Finance"].map((c) => (
                      <div key={c} className="flex items-center gap-2 rounded-md border border-border p-2">
                        <div className="flex size-6 items-center justify-center rounded-full bg-muted text-[9px] font-bold text-muted-foreground">
                          {c.charAt(0)}
                        </div>
                        <span className="text-[11px] text-foreground">{c}</span>
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
              <h3 className="text-sm font-semibold text-foreground">Email Volume Over Time</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={emailActivityData} margin={{ top: 10, right: 5, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="day" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} tickLine={false} axisLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} tickLine={false} axisLine={false} />
                  <RTooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 11 }} />
                  <Bar dataKey="received" fill="#818CF8" radius={[3, 3, 0, 0]} name="Received" />
                  <Bar dataKey="sent" fill="#818CF8" fillOpacity={0.3} radius={[3, 3, 0, 0]} name="Sent" />
                </BarChart>
              </ResponsiveContainer>
              <div className="mt-4 grid grid-cols-3 gap-4">
                <MiniStat label="Avg Emails/Day" value="42" />
                <MiniStat label="Avg Response Time" value="2.4h" />
                <MiniStat label="Attachment Rate" value="34%" change="+12% this week" />
              </div>
            </div>

            <div className="mt-4 rounded-lg border border-border bg-card p-5">
              <h3 className="text-sm font-semibold text-foreground">Recent Email Metadata</h3>
              <div className="mt-3 overflow-hidden rounded-md border border-border">
                <table className="w-full text-xs">
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
                    {emailMetadata.map((e, i) => (
                      <tr key={i} className="border-b border-border last:border-0">
                        <td className="px-3 py-2 font-mono text-muted-foreground">{e.date}</td>
                        <td className="px-3 py-2 text-foreground">{e.from}</td>
                        <td className="px-3 py-2 text-foreground">{e.to}</td>
                        <td className="max-w-[200px] px-3 py-2 text-muted-foreground truncate">{e.subject}</td>
                        <td className="px-3 py-2 text-center">{e.attachment ? "Y" : "N"}</td>
                        <td className="px-3 py-2">
                          {e.anomaly && <span className="rounded-full bg-[#EF4444]/10 px-2 py-0.5 text-[9px] font-medium text-[#EF4444]">Anomaly</span>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>

          {/* Cases Tab */}
          <TabsContent value="cases" className="mt-4">
            <div className="rounded-lg border border-border bg-card p-5">
              <h3 className="text-sm font-semibold text-foreground">Open Cases for {vendor.name}</h3>
              <p className="mt-2 text-xs text-muted-foreground">
                {vendor.openCases > 0
                  ? `There are ${vendor.openCases} active case(s) for this vendor. Navigate to the Cases screen for full detail.`
                  : "No open cases for this vendor."}
              </p>
            </div>
          </TabsContent>

          {/* Audit Log Tab */}
          <TabsContent value="audit-log" className="mt-4">
            <div className="rounded-lg border border-border bg-card p-5">
              <h3 className="text-sm font-semibold text-foreground">Audit Log</h3>
              <div className="mt-3 flex flex-col gap-2">
                {auditEntries.map((entry, i) => (
                  <div key={i} className="flex items-center gap-3 rounded-md border border-border p-3">
                    <span className="font-mono text-[10px] text-muted-foreground">{entry.date}</span>
                    <span className="text-xs text-foreground">{entry.action}</span>
                    <span className="ml-auto text-[10px] text-muted-foreground">{entry.by}</span>
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
      <p className="text-[10px] text-muted-foreground">{label}</p>
      <p className="font-semibold text-foreground">{value}</p>
    </div>
  )
}

function ProfileRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-[11px] text-muted-foreground">{label}</span>
      <span className="text-[11px] font-medium text-foreground">{value}</span>
    </div>
  )
}

function MiniStat({ label, value, change }: { label: string; value: string; change?: string }) {
  return (
    <div className="rounded-md border border-border p-3 text-center">
      <p className="text-[10px] text-muted-foreground">{label}</p>
      <p className="mt-1 text-lg font-bold text-foreground">{value}</p>
      {change && <p className="text-[10px] text-[#F97316]">{change}</p>}
    </div>
  )
}

const emailMetadata = [
  { date: "Feb 18", from: "s.chen@acmecorp.com", to: "j.doe@company.com", subject: "RE: Q1 Integration Timeline", attachment: true, anomaly: false },
  { date: "Feb 18", from: "billing@acmecorp.com", to: "finance@company.com", subject: "Invoice #ACM-2026-0218", attachment: true, anomaly: true },
  { date: "Feb 17", from: "j.doe@company.com", to: "support@acmecorp.com", subject: "API Rate Limit Issue", attachment: false, anomaly: false },
  { date: "Feb 17", from: "noreply@acmecorp.com", to: "m.torres@company.com", subject: "Security Advisory: Action Required", attachment: true, anomaly: true },
  { date: "Feb 16", from: "s.chen@acmecorp.com", to: "engineering@company.com", subject: "Updated SDK Documentation", attachment: true, anomaly: false },
]

const auditEntries = [
  { date: "Feb 18, 2:15 PM", action: "Case #VV-2847 created — Breach indicator detected", by: "AI Agent" },
  { date: "Feb 17, 4:00 PM", action: "Risk score updated: 68 → 92 (Critical)", by: "System" },
  { date: "Feb 15, 3:00 PM", action: "Domain infrastructure change detected (SPF/MX)", by: "AI Agent" },
  { date: "Feb 10, 9:00 AM", action: "Quarterly vendor assessment completed — Score: 68", by: "Jane Doe" },
  { date: "Jan 15, 11:00 AM", action: "Vendor profile reviewed — No action required", by: "Jane Doe" },
]
