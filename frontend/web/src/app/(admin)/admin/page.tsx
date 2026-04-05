'use client'

import { useState } from "react"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { LucideIcon, Home, DollarSign, Users, Key } from "lucide-react"
import { RecentPropertiesTable } from "../components/recentPropertiesTable"
import { WidgetCard } from "../components/Widgets"

//  Stats Cards Data ─
const widgetsData = [
  { icon: Home, title: "Total Properties", figure: 1240, link: "/properties", linkText: "View All" },
  { icon: Users, title: "Active Clients", figure: 320, link: "/clients", linkText: "View Clients" },
  { icon: DollarSign, title: "Monthly Revenue", figure: "$45,600", link: "/revenue", linkText: "View Revenue" },
]

//  Charts Data ─
const ordersData = [
  { day: "Mon", sales: 12 },
  { day: "Tue", sales: 18 },
  { day: "Wed", sales: 25 },
  { day: "Thu", sales: 20 },
  { day: "Fri", sales: 22 },
  { day: "Sat", sales: 15 },
  { day: "Sun", sales: 19 },
]

const revenueData = [
  { month: "Jan", revenue: 12000 },
  { month: "Feb", revenue: 19000 },
  { month: "Mar", revenue: 25000 },
  { month: "Apr", revenue: 22000 },
  { month: "May", revenue: 27000 },
  { month: "Jun", revenue: 30000 },
]

const occupancyData = [
  { month: "Jan", occupancy: 60 },
  { month: "Feb", occupancy: 65 },
  { month: "Mar", occupancy: 70 },
  { month: "Apr", occupancy: 75 },
  { month: "May", occupancy: 80 },
  { month: "Jun", occupancy: 85 },
]

//  Custom Tooltip ─
interface TooltipProps {
  active?: boolean;
  payload?: Array<{ value: number; name: string }>;
  label?: string;
}

function CustomBarTooltip({ active, payload, label }: TooltipProps) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-xl bg-gray-900 text-white px-4 py-2.5 text-sm shadow-xl">
      <p className="font-bold">{label}</p>
      <p>{payload[0].value}</p>
    </div>
  )
}

//  Widget Card ─
interface WidgetCardProps {
  icon: LucideIcon
  title: string
  figure: number | string
  link: string
  linkText: string
}


//  Charts Components ─
 function SalesOverviewChart() {
  const activeDay = "Thu"
  return (
    <Card className="rounded-2xl bg-white border border-gray-100 shadow-sm flex-1">
      <CardHeader className="flex items-center justify-between pb-0 pt-5 px-6">
        <CardTitle className="text-base font-bold text-primary">Weekly Sales</CardTitle>
      </CardHeader>
      <CardContent className="px-2 pt-4 pb-2">
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={ordersData} margin={{ top: 10, right: 16, left: 0, bottom: 0 }} barCategoryGap="30%">
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
            <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#9ca3af" }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#9ca3af" }} />
            <Tooltip content={<CustomBarTooltip />} cursor={false} />
            <Bar dataKey="sales" radius={[8, 8, 0, 0]}>
              {ordersData.map((entry) => (
                <Cell key={entry.day} fill={entry.day === activeDay ? "url(#gradientActive)" : "url(#gradient)"} />
              ))}
            </Bar>
            <defs>
              <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-secondary)" stopOpacity={0.7}/>
                <stop offset="100%" stopColor="var(--color-secondary-light)" stopOpacity={0.3}/>
              </linearGradient>
              <linearGradient id="gradientActive" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.8}/>
                <stop offset="100%" stopColor="var(--color-primary-light)" stopOpacity={0.4}/>
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

 function RevenueLineChart() {
  return (
    <Card className="rounded-2xl bg-white border border-gray-100 shadow-sm flex-1">
      <CardHeader className="pb-0 pt-5 px-6">
        <CardTitle className="text-base font-bold text-primary">Monthly Revenue</CardTitle>
      </CardHeader>
      <CardContent className="px-2 pt-4 pb-2">
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={revenueData} margin={{ top: 10, right: 16, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#9ca3af" }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#9ca3af" }} />
            <Tooltip content={<CustomBarTooltip />} cursor={false} />
            <Line type="monotone" dataKey="revenue" stroke="url(#revenueGradient)" strokeWidth={3} dot={{ r: 4 }} />
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={1}/>
                <stop offset="100%" stopColor="var(--color-secondary)" stopOpacity={0.7}/>
              </linearGradient>
            </defs>
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

 function OccupancyChart() {
  return (
    <Card className="rounded-2xl bg-white border border-gray-100 shadow-sm flex-1">
      <CardHeader className="pb-0 pt-5 px-6">
        <CardTitle className="text-base font-bold text-primary">Occupancy Rate</CardTitle>
      </CardHeader>
      <CardContent className="px-2 pt-4 pb-2">
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={occupancyData} margin={{ top: 10, right: 16, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#9ca3af" }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#9ca3af" }} />
            <Tooltip content={<CustomBarTooltip />} cursor={false} />
            <Line type="monotone" dataKey="occupancy" stroke="url(#occupancyGradient)" strokeWidth={3} dot={{ r: 4 }} />
            <defs>
              <linearGradient id="occupancyGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="var(--color-secondary)" stopOpacity={0.7}/>
                <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={1}/>
              </linearGradient>
            </defs>
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}


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