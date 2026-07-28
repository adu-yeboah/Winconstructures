'use client'

import { useState, useEffect } from "react"
import { Home, MessageSquare, Eye, TrendingUp } from "lucide-react"
import { RecentPropertiesTable } from "../components/recentPropertiesTable"
import { WidgetCard } from "../components/Widgets"
import { useAnalytics } from "@/hooks/useAnalytics"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "react-toastify"
import {
  SalesOverviewChart,
  RevenueLineChart,
  OccupancyChart,
  PropertyTypeDistribution,
  TopPropertiesCard,
  RecentMessagesCard
} from "../components/adminCharts"

export default function RealEstateDashboard() {
  const { getDashboardStats, loading: analyticsLoading } = useAnalytics()
  const [analytics, setAnalytics] = useState<any | null>(null)

  useEffect(() => {
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

  if (analyticsLoading) {
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
  
  const propertyTypesData = (analytics?.properties?.byType || []).map((item: { type: string; count: number }) => ({
    name: item.type,
    value: item.count,
  }))

  const topPropertiesData = analytics?.topProperties?.slice(0, 5) || []
  const recentMessagesData = analytics?.messages?.recent?.slice(0, 5) || []

  // Combined Dashboard
  return (
    <div className="relative flex flex-col gap-6 w-full">
      {/* Stats Cards */}
      <div className="flex flex-wrap justify-between gap-4 w-full relative">
        {widgetsData.map((widget, index) => (
          <WidgetCard key={index} {...widget} />
        ))}
      </div>

      {/* Charts */}
      <div className="flex flex-col lg:flex-row gap-4 w-full">
        <SalesOverviewChart data={ordersData} />
        <RevenueLineChart data={revenueData} />
        <OccupancyChart data={occupancyData} />
      </div>

      {/* Three Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Property Type Distribution */}
        <PropertyTypeDistribution data={propertyTypesData} />
        {/* Top Properties */}
        <TopPropertiesCard properties={topPropertiesData} />
        {/* Recent Messages */}
        <RecentMessagesCard messages={recentMessagesData} />
      </div>

      {/* Recent Properties Table */}
      <RecentPropertiesTable />
    </div>
  )
}