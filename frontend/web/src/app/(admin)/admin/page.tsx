'use client'

import Link from "next/link"
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
  PieChart,
  Pie,
  Legend,
} from "recharts"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Home, MessageSquare, Eye, TrendingUp } from "lucide-react"
import { RecentPropertiesTable } from "../components/recentPropertiesTable"
import { WidgetCard } from "../components/Widgets"
import { useAnalytics, DashboardStats } from "@/hooks/useAnalytics"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "react-toastify"

export default function RealEstateDashboard() {
  const { getDashboardStats, loading: analyticsLoading } = useAnalytics()
  const [mounted, setMounted] = useState(false)
  const [analytics, setAnalytics] = useState<DashboardStats | null>(null)

  useEffect(() => {
    setMounted(true)
    // Load data on mount
    const loadData = async () => {
      try {
        const stats = await getDashboardStats()
        setAnalytics(stats)
      } catch (error) {
        toast.error('Failed to load dashboard data')
        console.error('Dashboard load error:', error)
      }
    }
    loadData()
  }, [])

  // Don't render until mounted (prevents hydration issues)
  if (!mounted || analyticsLoading) {
    return (
      <div className="flex flex-col gap-6 w-full">
        <div className="flex justify-between flex-wrap gap-4 w-full">
          {[1, 2, 3, 4].map((i) => (
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

  // Use real analytics data
  const totalProperties = analytics?.overview?.totalProperties || 0
  const totalMessages = analytics?.overview?.totalMessages || 0
  const totalViews = analytics?.overview?.totalViews || 0
  const avgViews = analytics?.overview?.avgViewsPerProperty || 0
  const forSaleProperties = analytics?.properties?.byStatus?.forSale || 0
  const forRentProperties = analytics?.properties?.byStatus?.forRent || 0

  // Stats Cards Data - using real analytics
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
      title: "Total Messages",
      figure: totalMessages,
      link: "/admin/messages",
      linkText: "View Messages"
    },
    {
      icon: Eye,
      title: "Total Views",
      figure: totalViews,
      link: "/admin/properties",
      linkText: "Analytics"
    },
    {
      icon: TrendingUp,
      title: "Avg Views/Property",
      figure: avgViews,
      link: "/admin/properties",
      linkText: "Details"
    },
  ]

  // Transform analytics data for charts
  const ordersData = analytics?.trends?.monthlyMessages
    ?.slice()
    .reverse()
    .slice(0, 7)
    .map((item: { month: string; count: number }) => ({
      day: new Date(item.month).toLocaleDateString('en-US', { weekday: 'short' }),
      sales: item.count || 0,
    })) || [
      { day: 'Mon', sales: 0 },
      { day: 'Tue', sales: 0 },
      { day: 'Wed', sales: 0 },
      { day: 'Thu', sales: 0 },
      { day: 'Fri', sales: 0 },
      { day: 'Sat', sales: 0 },
      { day: 'Sun', sales: 0 },
    ]

  const revenueData = analytics?.trends?.monthlyProperties
    ?.slice()
    .reverse()
    .slice(0, 6)
    .map((item: { month: string; count: number }) => ({
      month: new Date(item.month + '-01').toLocaleDateString('en-US', { month: 'short' }),
      revenue: (item.count || 0) * 1000, // Rough estimate
    })) || [
      { month: 'Jan', revenue: 0 },
      { month: 'Feb', revenue: 0 },
      { month: 'Mar', revenue: 0 },
      { month: 'Apr', revenue: 0 },
      { month: 'May', revenue: 0 },
      { month: 'Jun', revenue: 0 },
    ]

  const occupancyData = [
    { month: "Jan", occupancy: (forSaleProperties / totalProperties) * 100 || 0 },
    { month: "Feb", occupancy: ((forSaleProperties + forRentProperties) / totalProperties) * 100 || 0 },
    { month: "Mar", occupancy: (forSaleProperties / totalProperties) * 100 || 0 },
    { month: "Apr", occupancy: ((forSaleProperties + forRentProperties) / totalProperties) * 100 || 0 },
    { month: "May", occupancy: (forSaleProperties / totalProperties) * 100 || 0 },
    { month: "Jun", occupancy: ((forSaleProperties + forRentProperties) / totalProperties) * 100 || 0 },
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
    const activeDay = new Date().toLocaleDateString('en-US', { weekday: 'short' })
    return (
      <Card className="rounded-2xl bg-white border border-gray-100 shadow-sm flex-1">
        <CardHeader className="flex items-center justify-between pb-0 pt-5 px-6">
          <CardTitle className="text-base font-bold text-primary">Messages (Last 7 Days)</CardTitle>
        </CardHeader>
        <CardContent className="px-2 pt-4 pb-2">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={ordersData} margin={{ top: 10, right: 16, left: 0, bottom: 0 }} barCategoryGap="30%">
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#9ca3af" }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#9ca3af" }} />
              <Tooltip content={<CustomBarTooltip />} cursor={false} />
              <Bar dataKey="sales" radius={[8, 8, 0, 0]}>
                {ordersData.map((entry: { day: string; sales: number }) => (
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
          <CardTitle className="text-base font-bold text-primary">Properties Listed (6 Months)</CardTitle>
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
          <CardTitle className="text-base font-bold text-primary">Property Status Distribution</CardTitle>
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

  // Top Performing Properties Component
  function TopPropertiesCard() {
    const topProperties = analytics?.topProperties?.slice(0, 5) || []

    return (
      <Card className="rounded-2xl bg-white border border-gray-100 shadow-sm">
        <CardHeader className="pb-0 pt-5 px-6">
          <CardTitle className="text-base font-bold text-primary">Top Performing Properties</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {topProperties.length === 0 ? (
            <p className="text-gray-500 text-sm text-center py-8">No properties data available</p>
          ) : (
            <div className="space-y-4">
              {topProperties.map((property: { title: string; viewCount: number; id: number }, index: number) => (
                <div key={property.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 text-sm">{property.title}</p>
                      <p className="text-xs text-gray-500">{property.location}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-primary text-lg">{property.viewCount}</p>
                    <p className="text-xs text-gray-500">views</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    )
  }

  // Property Type Distribution Component
  function PropertyTypeDistribution() {
    const propertyTypes = analytics?.properties?.byType || []
    const COLORS = ['#1f4d3a', '#eab308', '#3b82f6', '#ef4444', '#8b5cf6']

    const data = propertyTypes.map((item: { name: string; value: number }) => ({
      name: item.type,
      value: item.count,
    }))

    return (
      <Card className="rounded-2xl bg-white border border-gray-100 shadow-sm">
        <CardHeader className="pb-0 pt-5 px-6">
          <CardTitle className="text-base font-bold text-primary">Property Types Distribution</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {data.length === 0 ? (
            <p className="text-gray-500 text-sm text-center py-8">No property type data available</p>
          ) : (
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }: { name: string; percent?: number }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {data.map((entry: { name: string; value: number; color: string }, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>
    )
  }

  // Recent Messages Component
  function RecentMessagesCard() {
    const recentMessages = analytics?.messages?.recent?.slice(0, 5) || []

    return (
      <Card className="rounded-2xl bg-white border border-gray-100 shadow-sm">
        <CardHeader className="flex items-center justify-between pb-0 pt-5 px-6">
          <CardTitle className="text-base font-bold text-primary">Recent Messages</CardTitle>
          <Link href="/admin/messages" className="text-sm text-primary hover:underline">View All</Link>
        </CardHeader>
        <CardContent className="p-6">
          {recentMessages.length === 0 ? (
            <p className="text-gray-500 text-sm text-center py-8">No messages available</p>
          ) : (
            <div className="space-y-3">
              {recentMessages.map((message: { id: number; title: string; subject: string; date: string }) => (
                <div key={message.id} className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 text-sm">{message.title}</p>
                      <p className="text-xs text-gray-500 mt-1">{message.subject}</p>
                      <p className="text-xs text-gray-400 mt-1">{message.email}</p>
                    </div>
                    <p className="text-xs text-gray-400">
                      {new Date(message.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
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

      {/* Three Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Property Type Distribution */}
        <PropertyTypeDistribution />
        {/* Top Properties */}
        <TopPropertiesCard />
        {/* Recent Messages */}
        <RecentMessagesCard />
      </div>

      {/* Recent Properties Table */}
      <RecentPropertiesTable />
    </div>
  )
}