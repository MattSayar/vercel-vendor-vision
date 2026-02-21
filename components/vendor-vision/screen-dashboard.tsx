"use client"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import {
  vendors,
  activityFeed,
  riskDistributionOverTime,
  getSeverityColor,
  getSeverityDot,
  type Vendor,
} from "@/lib/demo-data"
import {
  Shield,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
} from "lucide-react"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip as RTooltip,
} from "recharts"

interface DashboardProps {
  onNavigateToVendor: (vendorId: string) => void
  onNavigateToCases: (search?: string) => void
  onNavigateToVendors: () => void
  onNavigateToReports: () => void
  onNavigateToRemediation: () => void
}

const levelColors: Record<string, string> = {
  critical: "bg-danger",
  warning: "bg-orange",
  success: "bg-success",
  info: "bg-info",
}

const trendingVendors = [
  { vendor: vendors[0], change: "+18", topSignal: "Breach feed match", trend: "up" as const },       // 74 → 92
  { vendor: vendors[1], change: "+12", topSignal: "Behavioral anomaly", trend: "up" as const },      // 62 → 74
  { vendor: vendors[2], change: "+9", topSignal: "D&B score drop", trend: "up" as const },           // 59 → 68
  { vendor: vendors[3], change: "+3", topSignal: "Domain reputation change", trend: "up" as const }, // 42 → 45
  { vendor: vendors[4], change: "-5", topSignal: "Community report resolved", trend: "down" as const }, // 43 → 38
]

export function ScreenDashboard({ onNavigateToVendor, onNavigateToCases, onNavigateToVendors, onNavigateToReports, onNavigateToRemediation }: DashboardProps) {
  return (
    <ScrollArea className="h-[calc(100vh-3.5rem)]">
      <div className="flex flex-col gap-6 p-6">
        {/* Row 1: Key Metrics */}
        <div className="grid grid-cols-4 gap-4">
          <MetricCard
            icon={<Shield className="size-4" />}
            iconBg="bg-primary/10 text-primary"
            label="Total Vendors Monitored"
            value="3,847"
            sub="142 new this month"
            onClick={onNavigateToVendors}
          />
          <MetricCard
            icon={<AlertTriangle className="size-4" />}
            iconBg="bg-danger/10 text-danger"
            label="Active Risk Cases"
            value="23"
            sub="5 Critical · 8 High · 10 Medium"
            onClick={() => onNavigateToCases()}
          />
          <MetricCard
            icon={<CheckCircle2 className="size-4" />}
            iconBg="bg-success/10 text-success"
            label="Auto-Resolved (30d)"
            value="187"
            sub="73% autonomous resolution rate"
            onClick={onNavigateToReports}
          />
          <MetricCard
            icon={<Clock className="size-4" />}
            iconBg="bg-info/10 text-info"
            label="Avg. Time to Remediate"
            value="14 min"
            sub={
              <span className="flex items-center gap-1">
                <ArrowDownRight className="size-3 text-success" />
                89% vs. manual baseline
              </span>
            }
            onClick={onNavigateToRemediation}
          />
        </div>

        {/* Row 2: Heatmap + Activity Feed */}
        <div className="grid grid-cols-5 gap-4">
          {/* Vendor Risk Heatmap */}
          <div className="col-span-3 rounded-lg border border-border bg-card p-5">
            <h3 className="mb-4 text-base font-semibold text-card-foreground">Vendor Ecosystem Risk Map</h3>
            <div className="grid grid-cols-4 gap-2">
              {[...vendors].sort((a, b) => b.riskScore - a.riskScore).map((v) => (
                <VendorTile key={v.id} vendor={v} onClick={() => onNavigateToVendor(v.id)} />
              ))}
            </div>
          </div>

          {/* AI Activity Feed */}
          <div className="col-span-2 rounded-lg border border-border bg-card p-5">
            <h3 className="mb-4 text-base font-semibold text-card-foreground">AI Activity Feed</h3>
            <div className="flex flex-col gap-3">
              {activityFeed.map((item) => {
                // Build linked description: vendor names → vendor page, case numbers → cases page
                const linkify = (text: string) => {
                  const tokens = text.split(/(#VV-\d+)/g)
                  return tokens.map((token, i) => {
                    const caseMatch = token.match(/^#VV-\d+$/)
                    if (caseMatch) {
                      return (
                        <button key={`c${i}`} onClick={() => onNavigateToCases(token.replace("#", ""))} className="font-semibold text-primary hover:underline">
                          {token}
                        </button>
                      )
                    }
                    return <span key={`t${i}`}>{token}</span>
                  })
                }

                const vendorParts = item.description.split(item.vendor)
                return (
                <div key={item.id} className="flex gap-3">
                  <div className="flex flex-col items-center pt-1">
                    <div className={`size-2 rounded-full ${levelColors[item.level]}`} />
                    <div className="mt-1 h-full w-px bg-border" />
                  </div>
                  <div className="flex-1 pb-3">
                    <span className="text-sm font-medium text-muted-foreground">{item.time}</span>
                    <p className="mt-0.5 text-base leading-relaxed text-foreground/80">
                      {vendorParts.map((part, i) => (
                        <span key={i}>
                          {linkify(part)}
                          {i < vendorParts.length - 1 && (
                            <button
                              onClick={() => onNavigateToVendor(item.vendorId)}
                              className="font-semibold text-primary hover:underline"
                            >
                              {item.vendor}
                            </button>
                          )}
                        </span>
                      ))}
                    </p>
                  </div>
                </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Row 3: Trending + Chart */}
        <div className="grid grid-cols-5 gap-4">
          {/* Trending Risk Vendors */}
          <div className="col-span-3 rounded-lg border border-border bg-card p-5">
            <h3 className="mb-4 text-base font-semibold text-card-foreground">Trending Risk Vendors</h3>
            <div className="overflow-hidden rounded-md border border-border">
              <table className="w-full text-base">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="px-3 py-2 text-left font-medium text-muted-foreground">Vendor Name</th>
                    <th className="px-3 py-2 text-left font-medium text-muted-foreground">Risk Score</th>
                    <th className="px-3 py-2 text-left font-medium text-muted-foreground">Change (30d)</th>
                    <th className="px-3 py-2 text-left font-medium text-muted-foreground">Top Signal</th>
                    <th className="px-3 py-2 text-left font-medium text-muted-foreground">Cases</th>
                  </tr>
                </thead>
                <tbody>
                  {trendingVendors.map(({ vendor, change, topSignal, trend }) => (
                    <tr
                      key={vendor.id}
                      className="border-b border-border last:border-0 hover:bg-muted/30 cursor-pointer transition-colors"
                      onClick={() => onNavigateToVendor(vendor.id)}
                    >
                      <td className="px-3 py-2.5 font-medium text-foreground">{vendor.name}</td>
                      <td className="px-3 py-2.5">
                        <span className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-sm font-semibold ${getSeverityColor(vendor.severity)}`}>
                          <span className={`size-1.5 rounded-full ${getSeverityDot(vendor.severity)}`} />
                          {vendor.riskScore}
                        </span>
                      </td>
                      <td className="px-3 py-2.5">
                        <span className={`flex items-center gap-0.5 font-medium ${trend === "up" ? "text-danger" : "text-success"}`}>
                          {trend === "up" ? <ArrowUpRight className="size-3" /> : <ArrowDownRight className="size-3" />}
                          {change}
                        </span>
                      </td>
                      <td className="px-3 py-2.5 text-muted-foreground">{topSignal}</td>
                      <td className="px-3 py-2.5 text-muted-foreground">{vendor.openCases}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Risk Distribution Chart */}
          <div className="col-span-2 rounded-lg border border-border bg-card p-5">
            <h3 className="mb-4 text-base font-semibold text-card-foreground">Risk Distribution Over Time</h3>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={riskDistributionOverTime} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="date" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} tickLine={false} axisLine={false} />
                <RTooltip
                  contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 11 }}
                  labelStyle={{ fontWeight: 600, marginBottom: 4 }}
                />
                <Area type="monotone" dataKey="critical" stackId="1" stroke="var(--danger)" fill="var(--danger)" fillOpacity={0.6} />
                <Area type="monotone" dataKey="high" stackId="1" stroke="var(--orange)" fill="var(--orange)" fillOpacity={0.5} />
                <Area type="monotone" dataKey="medium" stackId="1" stroke="var(--warning)" fill="var(--warning)" fillOpacity={0.4} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </ScrollArea>
  )
}

// ---- Sub-components ----

function MetricCard({
  icon,
  iconBg,
  label,
  value,
  sub,
  onClick,
}: {
  icon: React.ReactNode
  iconBg: string
  label: string
  value: string
  sub: React.ReactNode
  onClick?: () => void
}) {
  return (
    <div
      onClick={onClick}
      className={`rounded-lg border border-border bg-card p-4 ${onClick ? "cursor-pointer hover:border-primary/30 transition-colors" : ""}`}
    >
      <div className="flex items-center gap-2">
        <div className={`flex size-7 items-center justify-center rounded-md ${iconBg}`}>{icon}</div>
        <span className="text-base font-medium text-muted-foreground">{label}</span>
      </div>
      <p className="mt-3 text-2xl font-bold tracking-tight text-card-foreground">{value}</p>
      <p className="mt-1 text-sm text-muted-foreground">{typeof sub === "string" ? sub : sub}</p>
    </div>
  )
}

function VendorTile({ vendor, onClick }: { vendor: Vendor; onClick: () => void }) {
  const sizeClass =
    vendor.severity === "critical"
      ? "col-span-2 row-span-2"
      : vendor.severity === "high"
        ? "col-span-2"
        : ""

  const borderColor =
    vendor.severity === "critical"
      ? "border-danger/30 bg-danger/5"
      : vendor.severity === "high"
        ? "border-orange/30 bg-orange/5"
        : vendor.severity === "medium"
          ? "border-warning/30 bg-warning/5"
          : "border-success/20 bg-success/5"

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          onClick={onClick}
          className={`flex flex-col justify-between rounded-md border p-2.5 text-left transition-all hover:shadow-md ${sizeClass} ${borderColor}`}
        >
          <span className="text-sm font-medium text-foreground truncate">{vendor.name}</span>
          <div className="mt-2 flex items-center justify-between">
            <span className={`text-base font-bold ${vendor.severity === "critical" ? "text-danger" : vendor.severity === "high" ? "text-orange" : vendor.severity === "medium" ? "text-warning" : "text-success"}`}>
              {vendor.riskScore}
            </span>
            <span className={`rounded-sm px-1.5 py-0.5 text-[13px] font-medium capitalize ${getSeverityColor(vendor.severity)}`}>
              {vendor.severity}
            </span>
          </div>
        </button>
      </TooltipTrigger>
      <TooltipContent side="top" className="max-w-[200px]">
        <p className="font-semibold">{vendor.name}</p>
        <p className="text-sm">Risk: {vendor.riskScore} | {vendor.emails30d} emails/30d | {vendor.openCases} cases</p>
      </TooltipContent>
    </Tooltip>
  )
}

