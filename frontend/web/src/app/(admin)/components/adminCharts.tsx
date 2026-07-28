'use client'

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
import Link from "next/link"

//  Custom Tooltip ─
interface TooltipProps {
  active?: boolean;
  payload?: Array<{ value: number; name: string }>;
  label?: string;
}

export function CustomBarTooltip({ active, payload, label }: TooltipProps) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-xl bg-gray-900 text-white px-4 py-2.5 text-sm shadow-xl">
      <p className="font-bold">{label}</p>
      <p>{payload[0].value}</p>
    </div>
  )
}

export function SalesOverviewChart({ data }: { data: any[] }) {
  const activeDay = new Date().toLocaleDateString('en-US', { weekday: 'short' })
  return (
    <Card className="rounded-2xl bg-white border border-gray-100 shadow-sm flex-1">
      <CardHeader className="flex items-center justify-between pb-0 pt-5 px-6">
        <CardTitle className="text-base font-bold text-primary">Messages (Last 7 Days)</CardTitle>
      </CardHeader>
      <CardContent className="px-2 pt-4 pb-2">
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={data} margin={{ top: 10, right: 16, left: 0, bottom: 0 }} barCategoryGap="30%">
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
            <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#9ca3af" }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#9ca3af" }} />
            <Tooltip content={<CustomBarTooltip />} cursor={false} />
            <Bar dataKey="sales" radius={[8, 8, 0, 0]}>
              {data.map((entry) => (
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

export function RevenueLineChart({ data }: { data: any[] }) {
  return (
    <Card className="rounded-2xl bg-white border border-gray-100 shadow-sm flex-1">
      <CardHeader className="pb-0 pt-5 px-6">
        <CardTitle className="text-base font-bold text-primary">Properties Listed (6 Months)</CardTitle>
      </CardHeader>
      <CardContent className="px-2 pt-4 pb-2">
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={data} margin={{ top: 10, right: 16, left: 0, bottom: 0 }}>
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

export function OccupancyChart({ data }: { data: any[] }) {
  return (
    <Card className="rounded-2xl bg-white border border-gray-100 shadow-sm flex-1">
      <CardHeader className="pb-0 pt-5 px-6">
        <CardTitle className="text-base font-bold text-primary">Property Status Distribution</CardTitle>
      </CardHeader>
      <CardContent className="px-2 pt-4 pb-2">
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={data} margin={{ top: 10, right: 16, left: 0, bottom: 0 }}>
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

export function PropertyTypeDistribution({ data }: { data: any[] }) {
  const COLORS = ['#1f4d3a', '#eab308', '#3b82f6', '#ef4444', '#8b5cf6']

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
                label={(props: any) => `${props.name || ''} ${((props.percent || 0) * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry: any, index: number) => (
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

export function TopPropertiesCard({ properties }: { properties: any[] }) {
  return (
    <Card className="rounded-2xl bg-white border border-gray-100 shadow-sm">
      <CardHeader className="pb-0 pt-5 px-6">
        <CardTitle className="text-base font-bold text-primary">Top Performing Properties</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {properties.length === 0 ? (
          <p className="text-gray-500 text-sm text-center py-8">No properties data available</p>
        ) : (
          <div className="space-y-4">
            {properties.map((property: any, index: number) => (
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

export function RecentMessagesCard({ messages }: { messages: any[] }) {
  return (
    <Card className="rounded-2xl bg-white border border-gray-100 shadow-sm">
      <CardHeader className="flex items-center justify-between pb-0 pt-5 px-6">
        <CardTitle className="text-base font-bold text-primary">Recent Messages</CardTitle>
        <Link href="/admin/messages" className="text-sm text-primary hover:underline">View All</Link>
      </CardHeader>
      <CardContent className="p-6">
        {messages.length === 0 ? (
          <p className="text-gray-500 text-sm text-center py-8">No messages available</p>
        ) : (
          <div className="space-y-3">
            {messages.map((message: any) => (
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