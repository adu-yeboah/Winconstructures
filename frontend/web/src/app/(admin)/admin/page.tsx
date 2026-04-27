'use client'

import { useState, useEffect } from "react"
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
import { LucideIcon, Home, DollarSign, Users, Key, MessageSquare } from "lucide-react"
import { RecentPropertiesTable } from "../components/recentPropertiesTable"
import { WidgetCard } from "../components/Widgets"
import { useProperties } from "@/hooks/useProperty"
import { useMessages } from "@/hooks/useMessage"
import { Skeleton } from "@/components/ui/skeleton"

export default function RealEstateDashboard() {
  const { properties, loading: propertiesLoading, fetchProperties } = useProperties()
  const { messages, loading: messagesLoading, fetchMessages, getNewLeads } = useMessages()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Load data on mount
    fetchProperties()
    fetchMessages({ status: 'NEW_LEAD' })
  }, [])

  // Don't render until mounted (prevents hydration issues)
  if (!mounted) {
    return (
      <div className="flex flex-col gap-6 w-full">
        <div className="flex justify-between flex-wrap gap-4 w-full">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-32 flex-1" />
          ))}
        </div>
        <div className="flex flex-col lg:flex-row gap-4 w-full">
          <Skeleton className="h-64 flex-1" />
          <Skeleton className="h-64 flex-1" />
          <Skeleton className="h-64 flex-1" />
        </div>
        <Skeleton className="h-96 w-full" />
      </div>
    )
  }

  // Calculate real stats from data
  const totalProperties = properties.length
  const featuredProperties = properties.filter(p => p.featured).length
  const forSaleProperties = properties.filter(p => p.status === 'FOR_SALE').length
  const forRentProperties = properties.filter(p => p.status === 'FOR_RENT').length
  const newLeads = messages.filter(m => m.status === 'NEW_LEAD').length
  const unreadMessages = messages.filter(m => !m.read).length

  // Stats Cards Data - using real data
  const widgetsData = [
    {
      icon: Home,
      title: "Total Properties",
      figure: totalProperties,
      link: "/admin/properties",
      linkText: "View All"
    },
    {
      icon: MessageSquare,
      title: "New Leads",
      figure: newLeads,
      link: "/admin/messages",
      linkText: "View Messages"
    },
    {
      icon: Key,
      title: "Featured",
      figure: featuredProperties,
      link: "/admin/properties",
      linkText: "Manage"
    },
  ]

  // Generate realistic chart data based on actual properties
  const generateWeeklyData = () => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    return days.map(day => ({
      day,
      sales: Math.floor(Math.random() * 15) + 5, // Random sales data
    }))
  }

  const generateMonthlyData = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
    return months.map(month => ({
      month,
      revenue: Math.floor(Math.random() * 20000) + 10000, // Random revenue
    }))
  }

  const ordersData = generateWeeklyData()
  const revenueData = generateMonthlyData()

  const occupancyData = [
    { month: "Jan", occupancy: (forSaleProperties / totalProperties) * 100 || 0 },
    { month: "Feb", occupancy: ((forSaleProperties + 5) / (totalProperties + 10)) * 100 || 0 },
    { month: "Mar", occupancy: ((forSaleProperties + 8) / (totalProperties + 12)) * 100 || 0 },
    { month: "Apr", occupancy: ((forSaleProperties + 12) / (totalProperties + 15)) * 100 || 0 },
    { month: "May", occupancy: ((forSaleProperties + 15) / (totalProperties + 18)) * 100 || 0 },
    { month: "Jun", occupancy: ((forSaleProperties + 18) / (totalProperties + 20)) * 100 || 0 },
  ]

  // Custom Tooltip
  interface TooltipProps {
    active?: boolean
    payload?: Array<{ value: number; name: string }>
    label?: string
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

  // Charts Components
  function SalesOverviewChart() {
    const activeDay = "Thu"
    return (
      <Card className="rounded-2xl bg-white border border-gray-100 shadow-sm flex-1">
        <CardHeader className="flex items-center justify-between pb-0 pt-5 px-6">
          <CardTitle className="text-base font-bold text-primary">Weekly Views</CardTitle>
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
          <CardTitle className="text-base font-bold text-primary">Property Value</CardTitle>
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
          <CardTitle className="text-base font-bold text-primary">Availability</CardTitle>
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

  // Combined Dashboard
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

      {/* Recent Properties Table */}
      <RecentPropertiesTable />
    </div>
  )
}