"use client"

import { ScrollArea } from "@/components/ui/scroll-area"
import { vendors, riskPostureTrend } from "@/lib/demo-data"
import {
  Shield,
  Building2,
  ShieldCheck,
  TrendingUp,
  ArrowUpRight,
  Download,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
} from "lucide-react"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip as RTooltip,
  LineChart,
  Line,
} from "recharts"
import { cn } from "@/lib/utils"

interface ReportsProps {
  onNavigateToVendor: (vendorId: string) => void
}

const topRiskVendors = [...vendors]
  .sort((a, b) => b.riskScore - a.riskScore)
  .slice(0, 7)

export function ScreenReports({ onNavigateToVendor }: ReportsProps) {
  return (
    <ScrollArea className="h-[calc(100vh-3.5rem)]">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-foreground text-balance">Supply Chain Risk Posture — Executive Summary</h1>
            <p className="mt-1 text-xs text-muted-foreground">Last updated: Feb 20, 2026 at 3:00 PM</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 rounded-md border border-input px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted transition-colors">
              <Download className="size-3" /> Export PDF
            </button>
            <button className="flex items-center gap-1.5 rounded-md border border-input px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted transition-colors">
              <Calendar className="size-3" /> Schedule Report
            </button>
          </div>
        </div>

        {/* Row 1: Executive Metrics */}
        <div className="mt-6 grid grid-cols-4 gap-4">
          <ExecCard
            icon={<Shield className="size-5" />}
            iconBg="bg-[#22C55E]/10 text-[#22C55E]"
            label="Supply Chain Risk Score"
            value="B+"
            sub={
              <span className="flex items-center gap-1 text-[#22C55E]">
                <ArrowUpRight className="size-3" /> Improving
              </span>
            }
          />
          <ExecCard
            icon={<Building2 className="size-5" />}
            iconBg="bg-primary/10 text-primary"
            label="Total Vendors"
            value="3,847"
            sub="96% continuously monitored"
          />
          <ExecCard
            icon={<ShieldCheck className="size-5" />}
            iconBg="bg-[#3B82F6]/10 text-[#3B82F6]"
            label="Incidents Prevented (30d)"
            value="23"
            sub="est. $2.1M in avoided losses"
          />
          <ExecCard
            icon={<TrendingUp className="size-5" />}
            iconBg="bg-[#818CF8]/10 text-[#818CF8]"
            label="Autonomous Resolution Rate"
            value="73%"
            sub={
              <span className="flex items-center gap-1 text-[#22C55E]">
                <ArrowUpRight className="size-3" /> from 58% last quarter
              </span>
            }
          />
        </div>

        {/* Row 2: Risk Posture Trend */}
        <div className="mt-6 rounded-lg border border-border bg-card p-5">
          <h3 className="text-sm font-semibold text-foreground">Risk Posture Trend (Quarterly)</h3>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={riskPostureTrend} margin={{ top: 15, right: 30, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} tickLine={false} axisLine={false} />
              <YAxis
                yAxisId="left"
                tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                domain={[0, 100]}
                tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(v) => `${v}%`}
              />
              <RTooltip
                contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 11 }}
              />
              <Area type="monotone" yAxisId="left" dataKey="critical" stackId="1" stroke="#EF4444" fill="#EF4444" fillOpacity={0.6} />
              <Area type="monotone" yAxisId="left" dataKey="high" stackId="1" stroke="#F97316" fill="#F97316" fillOpacity={0.5} />
              <Area type="monotone" yAxisId="left" dataKey="medium" stackId="1" stroke="#EAB308" fill="#EAB308" fillOpacity={0.4} />
              <Line type="monotone" yAxisId="right" dataKey="autoRate" stroke="#818CF8" strokeWidth={2.5} dot={{ fill: "#818CF8", r: 4 }} strokeDasharray="5 5" name="Auto Resolution %" />
            </AreaChart>
          </ResponsiveContainer>
          <div className="mt-2 flex items-center justify-center gap-6">
            <Legend color="#EF4444" label="Critical" />
            <Legend color="#F97316" label="High" />
            <Legend color="#EAB308" label="Medium" />
            <Legend color="#818CF8" label="Auto Resolution Rate" dashed />
          </div>
        </div>

        {/* Row 3: Top Risk + AI Insights */}
        <div className="mt-6 grid grid-cols-2 gap-4">
          {/* Top Risk Vendors */}
          <div className="rounded-lg border border-border bg-card p-5">
            <h3 className="text-sm font-semibold text-foreground">Top Risk Vendors</h3>
            <div className="mt-3 overflow-hidden rounded-md border border-border">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="px-3 py-2 text-left font-medium text-muted-foreground">Rank</th>
                    <th className="px-3 py-2 text-left font-medium text-muted-foreground">Vendor</th>
                    <th className="px-3 py-2 text-left font-medium text-muted-foreground">Risk Score</th>
                    <th className="px-3 py-2 text-left font-medium text-muted-foreground">Primary Risk</th>
                    <th className="px-3 py-2 text-left font-medium text-muted-foreground">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {topRiskVendors.map((v, i) => (
                    <tr
                      key={v.id}
                      className="border-b border-border last:border-0 cursor-pointer hover:bg-muted/30 transition-colors"
                      onClick={() => onNavigateToVendor(v.id)}
                    >
                      <td className="px-3 py-2.5 font-mono text-muted-foreground">#{i + 1}</td>
                      <td className="px-3 py-2.5 font-medium text-foreground">{v.name}</td>
                      <td className="px-3 py-2.5">
                        <span className={cn(
                          "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold",
                          v.riskScore >= 80 ? "bg-[#EF4444]/10 text-[#EF4444] border-[#EF4444]/20" :
                          v.riskScore >= 60 ? "bg-[#F97316]/10 text-[#F97316] border-[#F97316]/20" :
                          v.riskScore >= 40 ? "bg-[#EAB308]/10 text-[#EAB308] border-[#EAB308]/20" :
                          "bg-[#22C55E]/10 text-[#22C55E] border-[#22C55E]/20"
                        )}>
                          {v.riskScore}
                        </span>
                      </td>
                      <td className="px-3 py-2.5 text-muted-foreground max-w-[140px] truncate">{v.scenario.split(",")[0]}</td>
                      <td className="px-3 py-2.5">
                        <span className={cn(
                          "rounded-full px-2 py-0.5 text-[9px] font-medium",
                          v.openCases > 0
                            ? "bg-[#EF4444]/10 text-[#EF4444]"
                            : "bg-[#22C55E]/10 text-[#22C55E]"
                        )}>
                          {v.openCases > 0 ? `${v.openCases} case(s)` : "Monitored"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* AI Key Insights */}
          <div className="rounded-lg border border-border bg-card p-5">
            <div className="flex items-center gap-2">
              <div className="flex size-6 items-center justify-center rounded-md bg-primary/10">
                <Sparkles className="size-3.5 text-primary" />
              </div>
              <h3 className="text-sm font-semibold text-foreground">Key Insights</h3>
              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[9px] font-medium text-primary">AI Generated</span>
            </div>
            <div className="mt-4 rounded-md border-l-4 border-l-primary bg-primary/[0.03] p-4">
              <p className="text-xs leading-relaxed text-foreground/80">
                Over the past 30 days, your vendor risk posture improved from B to B+, driven primarily by the successful remediation of 23 vendor risk cases, 17 of which were resolved autonomously. Key developments:
              </p>
              <ul className="mt-3 flex flex-col gap-2.5">
                <li className="flex gap-2 text-xs leading-relaxed text-foreground/80">
                  <span className="mt-0.5 shrink-0 font-bold text-foreground">(1)</span>
                  Acme Corp remains your highest-risk vendor due to a confirmed breach — remediation is in progress with procurement engaged.
                </li>
                <li className="flex gap-2 text-xs leading-relaxed text-foreground/80">
                  <span className="mt-0.5 shrink-0 font-bold text-foreground">(2)</span>
                  4 new shadow vendors were discovered communicating with Finance employees — 2 confirmed legitimate, 2 blocked as impersonation attempts.
                </li>
                <li className="flex gap-2 text-xs leading-relaxed text-foreground/80">
                  <span className="mt-0.5 shrink-0 font-bold text-foreground">(3)</span>
                  Cross-industry intelligence from 847 Abnormal customers indicates elevated supply chain targeting in the financial services sector.
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Row 4: Compliance */}
        <div className="mt-6 rounded-lg border border-border bg-card p-5">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-foreground">Compliance & Audit Readiness</h3>
            <button className="rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">
              Generate Audit Report
            </button>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-4">
            <ComplianceCard
              framework="SOC 2 Vendor Management"
              status="compliant"
              detail="All controls met"
            />
            <ComplianceCard
              framework="NIST CSF Supply Chain"
              status="compliant"
              detail="94% coverage"
            />
            <ComplianceCard
              framework="ISO 27001 Supplier Security"
              status="warning"
              detail="2 gaps identified"
            />
          </div>
        </div>
      </div>
    </ScrollArea>
  )
}

function ExecCard({
  icon,
  iconBg,
  label,
  value,
  sub,
}: {
  icon: React.ReactNode
  iconBg: string
  label: string
  value: string
  sub: React.ReactNode
}) {
  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <div className="flex items-center gap-2.5">
        <div className={cn("flex size-9 items-center justify-center rounded-lg", iconBg)}>
          {icon}
        </div>
        <span className="text-xs font-medium text-muted-foreground">{label}</span>
      </div>
      <p className="mt-4 text-3xl font-bold tracking-tight text-foreground">{value}</p>
      <p className="mt-1.5 text-[11px] text-muted-foreground">{typeof sub === "string" ? sub : sub}</p>
    </div>
  )
}

function ComplianceCard({
  framework,
  status,
  detail,
}: {
  framework: string
  status: "compliant" | "warning"
  detail: string
}) {
  return (
    <div className={cn(
      "flex items-center gap-3 rounded-md border p-4",
      status === "compliant" ? "border-[#22C55E]/20 bg-[#22C55E]/[0.03]" : "border-[#EAB308]/20 bg-[#EAB308]/[0.03]"
    )}>
      {status === "compliant" ? (
        <CheckCircle2 className="size-5 text-[#22C55E]" />
      ) : (
        <AlertTriangle className="size-5 text-[#EAB308]" />
      )}
      <div>
        <p className="text-xs font-semibold text-foreground">{framework}</p>
        <p className={cn(
          "text-[10px] font-medium",
          status === "compliant" ? "text-[#22C55E]" : "text-[#EAB308]"
        )}>
          {status === "compliant" ? "Compliant" : "Gaps Found"} — {detail}
        </p>
      </div>
    </div>
  )
}

function Legend({ color, label, dashed }: { color: string; label: string; dashed?: boolean }) {
  return (
    <div className="flex items-center gap-1.5">
      {dashed ? (
        <div className="h-0.5 w-4" style={{ borderTop: `2px dashed ${color}` }} />
      ) : (
        <div className="size-2.5 rounded-sm" style={{ backgroundColor: color }} />
      )}
      <span className="text-[10px] text-muted-foreground">{label}</span>
    </div>
  )
}
