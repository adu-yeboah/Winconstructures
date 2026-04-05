'use client'

import { LucideIcon, Home, DollarSign, Users, Key } from "lucide-react"
import { RecentPropertiesTable } from "../components/recentPropertiesTable"
import { WidgetCard } from "../components/widgets"
import { SalesOverviewChart, RevenueLineChart, OccupancyChart } from "../components/adminCharts"

//  Stats Cards Data ─
const widgetsData = [
  { icon: Home, title: "Total Properties", figure: 1240, link: "/properties", linkText: "View All" },
  { icon: Users, title: "Active Clients", figure: 320, link: "/clients", linkText: "View Clients" },
  { icon: DollarSign, title: "Monthly Revenue", figure: "$45,600", link: "/revenue", linkText: "View Revenue" },
]

//  Combined Dashboard ─
export default function RealEstateDashboard() {
  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Stats Cards */}
      <div className="flex justify-between flex-wrap gap-4 w-full">
        {widgetsData.map((widget, index) => (
          <WidgetCard key={index} {...widget} />
        ))}
      </div>

      {/* Charts */}
      <div className="flex flex-col lg:flex-row gap-4 w-full">
        <SalesOverviewChart />
        <RevenueLineChart />
        <OccupancyChart />
      </div>

      {/* Recent Transactions Table */}
      <RecentPropertiesTable />
    </div>
  )
}