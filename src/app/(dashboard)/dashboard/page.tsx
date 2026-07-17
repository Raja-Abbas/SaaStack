"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { formatNumber, formatRelativeTime } from "@/lib/utils"
import {
  Users,
  DollarSign,
  CreditCard,
  Activity,
  TrendingUp,
  ArrowUpRight,
  UserPlus,
  Receipt,
  ClipboardList,
} from "lucide-react"
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

const stats = [
  {
    title: "Total Users",
    value: 1247,
    icon: Users,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    title: "Revenue",
    value: "$12,450",
    icon: DollarSign,
    color: "text-green-500",
    bg: "bg-green-500/10",
  },
  {
    title: "Active Subscriptions",
    value: 89,
    icon: CreditCard,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
  {
    title: "Activity Today",
    value: 342,
    icon: Activity,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
]

const revenueData = [
  { month: "Jan", revenue: 4200 },
  { month: "Feb", revenue: 5800 },
  { month: "Mar", revenue: 6400 },
  { month: "Apr", revenue: 8200 },
  { month: "May", revenue: 10100 },
  { month: "Jun", revenue: 12450 },
]

const userData = [
  { month: "Jan", users: 320 },
  { month: "Feb", users: 480 },
  { month: "Mar", users: 650 },
  { month: "Apr", users: 820 },
  { month: "May", users: 1040 },
  { month: "Jun", users: 1247 },
]

const activity = [
  { action: "New user signed up", user: "john@example.com", time: new Date(Date.now() - 2 * 60_000) },
  { action: "Subscription upgraded to Pro", user: "sarah@company.com", time: new Date(Date.now() - 15 * 60_000) },
  { action: "API key generated", user: "admin@startup.io", time: new Date(Date.now() - 60 * 60_000) },
  { action: "Team member invited", user: "mike@team.com", time: new Date(Date.now() - 3 * 60 * 60_000) },
  { action: "Settings updated", user: "admin@demo.com", time: new Date(Date.now() - 5 * 60 * 60_000) },
]

const quickActions = [
  { label: "Invite User", icon: UserPlus, href: "/team" },
  { label: "View Billing", icon: Receipt, href: "/billing" },
  { label: "Activity Log", icon: ClipboardList, href: "/activity" },
]

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-500">Welcome back</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="bg-white border-slate-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">{stat.title}</p>
                  <p className="text-2xl font-bold text-slate-900">
                    {typeof stat.value === "number" ? formatNumber(stat.value) : stat.value}
                  </p>
                </div>
                <div className={`rounded-lg p-3 ${stat.bg}`}>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="bg-white border-slate-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-slate-900">
              <TrendingUp className="h-4 w-4 text-blue-500" />
              Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#94a3b8" }} />
                  <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0f172a",
                      border: "1px solid #334155",
                      borderRadius: "8px",
                      color: "#f1f5f9",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    fill="url(#revenueGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-slate-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-slate-900">
              <Users className="h-4 w-4 text-blue-500" />
              User Growth
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={userData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#94a3b8" }} />
                  <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0f172a",
                      border: "1px solid #334155",
                      borderRadius: "8px",
                      color: "#f1f5f9",
                    }}
                  />
                  <Bar dataKey="users" fill="#334155" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="bg-white border-slate-200 lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-slate-900">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activity.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between border-b border-slate-100 pb-3 last:border-0 last:pb-0"
                >
                  <div>
                    <p className="text-sm font-medium text-slate-900">{item.action}</p>
                    <p className="text-xs text-slate-500">{item.user}</p>
                  </div>
                  <span className="text-xs text-slate-400 whitespace-nowrap">
                    {formatRelativeTime(item.time)}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-slate-200">
          <CardHeader>
            <CardTitle className="text-slate-900">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {quickActions.map((action) => (
                <Button
                  key={action.label}
                  variant="outline"
                  className="w-full justify-between border-slate-200 text-slate-700 hover:bg-slate-50"
                  href={action.href}
                >
                  <span className="flex items-center gap-2">
                    <action.icon className="h-4 w-4" />
                    {action.label}
                  </span>
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}