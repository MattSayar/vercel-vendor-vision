"use client"

import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Inbox,
  Building2,
  Network,
  BarChart3,
  Settings,
  ShieldCheck,
} from "lucide-react"

export type Screen = "dashboard" | "cases" | "vendors" | "vendor-detail" | "remediation" | "reports"

const navItems: { id: Screen; label: string; icon: React.ElementType }[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "cases", label: "Cases", icon: Inbox },
  { id: "vendors", label: "Vendors", icon: Building2 },
  { id: "remediation", label: "Remediation", icon: Network },
  { id: "reports", label: "Reports", icon: BarChart3 },
]

interface SidebarNavProps {
  active: Screen
  onNavigate: (screen: Screen) => void
}

export function SidebarNav({ active, onNavigate }: SidebarNavProps) {
  return (
    <aside className="flex h-screen w-[220px] shrink-0 flex-col bg-sidebar text-sidebar-foreground">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 py-5">
        <div className="flex size-8 items-center justify-center rounded-lg bg-sidebar-primary">
          <ShieldCheck className="size-4.5 text-sidebar-primary-foreground" />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-semibold tracking-tight text-sidebar-foreground">
            VendorVision
          </span>
          <span className="text-[10px] font-medium uppercase tracking-widest text-sidebar-foreground/50">
            Abnormal
          </span>
        </div>
      </div>

      {/* Nav Items */}
      <nav className="mt-2 flex flex-1 flex-col gap-0.5 px-3">
        {navItems.map((item) => {
          const isActive = active === item.id || (item.id === "vendors" && active === "vendor-detail")
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground/60 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
              )}
            >
              <item.icon className="size-4" />
              {item.label}
            </button>
          )
        })}
      </nav>

      {/* User */}
      <div className="flex items-center gap-3 border-t border-sidebar-border px-5 py-4">
        <div className="flex size-8 items-center justify-center rounded-full bg-sidebar-accent text-xs font-semibold text-sidebar-accent-foreground">
          JD
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-medium text-sidebar-foreground">Jane Doe</span>
          <span className="text-[10px] text-sidebar-foreground/50">SOC Analyst</span>
        </div>
        <button className="ml-auto text-sidebar-foreground/40 hover:text-sidebar-foreground/70">
          <Settings className="size-3.5" />
        </button>
      </div>
    </aside>
  )
}
