"use client"

import { useState } from "react"
import type { ExecutedAction } from "@/lib/demo-data"
import { SidebarNav, type Screen } from "@/components/vendor-vision/sidebar-nav"
import { TopBar } from "@/components/vendor-vision/top-bar"
import { ScreenDashboard } from "@/components/vendor-vision/screen-dashboard"
import { ScreenCases } from "@/components/vendor-vision/screen-cases"
import { ScreenVendors } from "@/components/vendor-vision/screen-vendors"
import { ScreenVendorDetail } from "@/components/vendor-vision/screen-vendor-detail"
import { ScreenRemediation } from "@/components/vendor-vision/screen-remediation"
import { ScreenReports } from "@/components/vendor-vision/screen-reports"
import { ScreenEasterEgg } from "@/components/vendor-vision/screen-easter-egg"

export default function VendorVisionApp() {
  const [screen, setScreen] = useState<Screen>("dashboard")
  const [timeRange, setTimeRange] = useState("30d")
  const [selectedVendorId, setSelectedVendorId] = useState("v1")
  const [caseSearchQuery, setCaseSearchQuery] = useState("")
  const [caseExecutedActions, setCaseExecutedActions] = useState<ExecutedAction[]>([])

  const handleCaseActionExecuted = (action: ExecutedAction) => {
    setCaseExecutedActions((prev) => [action, ...prev])
  }

  const navigateToVendor = (vendorId: string) => {
    setSelectedVendorId(vendorId)
    setScreen("vendor-detail")
  }

  const navigateToCases = (search?: string) => {
    setCaseSearchQuery(search || "")
    setScreen("cases")
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <SidebarNav active={screen} onNavigate={setScreen} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <TopBar screen={screen} timeRange={timeRange} onTimeRangeChange={setTimeRange} onNavigate={setScreen} />
        <main className="flex-1 overflow-hidden">
          {screen === "dashboard" && (
            <ScreenDashboard
              onNavigateToVendor={navigateToVendor}
              onNavigateToCases={navigateToCases}
              onNavigateToVendors={() => setScreen("vendors")}
              onNavigateToReports={() => setScreen("reports")}
              onNavigateToRemediation={() => setScreen("remediation")}
            />
          )}
          {screen === "cases" && <ScreenCases initialSearch={caseSearchQuery} onActionExecuted={handleCaseActionExecuted} />}
          {screen === "vendors" && (
            <ScreenVendors onNavigateToVendor={navigateToVendor} />
          )}
          {screen === "vendor-detail" && (
            <ScreenVendorDetail
              vendorId={selectedVendorId}
              onBack={() => setScreen("vendors")}
              onNavigateToCases={navigateToCases}
            />
          )}
          {screen === "remediation" && <ScreenRemediation caseExecutedActions={caseExecutedActions} />}
          {screen === "reports" && (
            <ScreenReports onNavigateToVendor={navigateToVendor} />
          )}
          {screen === "easter-egg" && <ScreenEasterEgg />}
        </main>
      </div>
    </div>
  )
}
