"use client"

import { Search, Bell, ChevronRight, Sun, Moon, X } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import type { Screen } from "./sidebar-nav"

const screenLabels: Record<Screen, string> = {
  dashboard: "Dashboard",
  cases: "AI Case Queue",
  vendors: "Vendor Directory",
  "vendor-detail": "Vendor Deep-Dive",
  remediation: "Automated Remediation",
  reports: "Executive Summary",
  "easter-egg": "Settings",
}

interface TopBarProps {
  screen: Screen
  timeRange: string
  onTimeRangeChange: (range: string) => void
  onNavigate: (screen: Screen) => void
}

const timeRanges = ["Last 24h", "7d", "30d", "90d"]

export function TopBar({ screen, timeRange, onTimeRangeChange, onNavigate }: TopBarProps) {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [globalSearch, setGlobalSearch] = useState("")
  useEffect(() => setMounted(true), [])

  return (
    <header className="flex h-14 shrink-0 items-center gap-4 border-b border-border bg-card px-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm" aria-label="Breadcrumb">
        <button onClick={() => onNavigate("dashboard")} className="text-muted-foreground hover:text-foreground transition-colors">
          VendorVision
        </button>
        <ChevronRight className="size-3 text-muted-foreground/50" />
        {screen === "vendor-detail" ? (
          <>
            <button onClick={() => onNavigate("vendors")} className="text-muted-foreground hover:text-foreground transition-colors">
              Vendor Directory
            </button>
            <ChevronRight className="size-3 text-muted-foreground/50" />
            <span className="font-medium text-foreground">{screenLabels[screen]}</span>
          </>
        ) : (
          <span className="font-medium text-foreground">{screenLabels[screen]}</span>
        )}
      </nav>

      {/* Search */}
      <div className="relative ml-auto flex items-center">
        <Search className="absolute left-3 size-3.5 text-muted-foreground" />
        <input
          type="text"
          value={globalSearch}
          onChange={(e) => setGlobalSearch(e.target.value)}
          placeholder="Search vendors, cases, indicators..."
          className="h-8 w-72 rounded-md border border-input bg-background pl-9 pr-8 text-xs text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none"
        />
        {globalSearch && (
          <button onClick={() => setGlobalSearch("")} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
            <X className="size-3.5" />
          </button>
        )}
      </div>

      {/* Theme Toggle */}
      {mounted && (
        <button
          onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
          className="flex size-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
          aria-label="Toggle theme"
        >
          {resolvedTheme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
        </button>
      )}

      {/* Notification Bell */}
      <button className="relative flex size-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground">
        <Bell className="size-4" />
        <span className="absolute -right-0.5 -top-0.5 flex size-4 items-center justify-center rounded-full bg-[#EF4444] text-[9px] font-bold text-[#FFFFFF]">
          3
        </span>
      </button>

      {/* Time Range */}
      <div className="flex items-center gap-1 rounded-md border border-input p-0.5">
        {timeRanges.map((range) => (
          <button
            key={range}
            onClick={() => onTimeRangeChange(range)}
            className={`rounded-sm px-2.5 py-1 text-xs font-medium transition-colors ${
              timeRange === range
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            {range}
          </button>
        ))}
      </div>
    </header>
  )
}
