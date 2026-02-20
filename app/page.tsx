"use client"

import { useState } from "react"
import { SidebarNav, type Screen } from "@/components/vendor-vision/sidebar-nav"
import { TopBar } from "@/components/vendor-vision/top-bar"
import { ScreenDashboard } from "@/components/vendor-vision/screen-dashboard"
import { ScreenCases } from "@/components/vendor-vision/screen-cases"
import { ScreenVendors } from "@/components/vendor-vision/screen-vendors"
import { ScreenVendorDetail } from "@/components/vendor-vision/screen-vendor-detail"
import { ScreenRemediation } from "@/components/vendor-vision/screen-remediation"
import { ScreenReports } from "@/components/vendor-vision/screen-reports"

export default function VendorVisionApp() {
  const [screen, setScreen] = useState<Screen>("dashboard")
  const [timeRange, setTimeRange] = useState("30d")
  const [selectedVendorId, setSelectedVendorId] = useState("v1")

  const navigateToVendor = (vendorId: string) => {
    setSelectedVendorId(vendorId)
    setScreen("vendor-detail")
  }

  const navigateToCases = () => {
    setScreen("cases")
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <SidebarNav active={screen} onNavigate={setScreen} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <TopBar screen={screen} timeRange={timeRange} onTimeRangeChange={setTimeRange} />
        <main className="flex-1 overflow-hidden">
          {screen === "dashboard" && (
            <ScreenDashboard
              onNavigateToVendor={navigateToVendor}
              onNavigateToCases={navigateToCases}
            />
          )}
          {screen === "cases" && <ScreenCases />}
          {screen === "vendors" && (
            <ScreenVendors onNavigateToVendor={navigateToVendor} />
          )}
          {screen === "vendor-detail" && (
            <ScreenVendorDetail
              vendorId={selectedVendorId}
              onBack={() => setScreen("vendors")}
            />
          )}
          {screen === "remediation" && <ScreenRemediation />}
          {screen === "reports" && (
            <ScreenReports onNavigateToVendor={navigateToVendor} />
          )}
        </main>
      </div>
    </div>
  )
}
