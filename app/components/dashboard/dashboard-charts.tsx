"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { salesChartData, categoryDistribution } from "@/app/lib/mock-data"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend,
} from "recharts"

const COLORS = [
  "oklch(0.55 0.2 255)",
  "oklch(0.65 0.18 155)",
  "oklch(0.70 0.18 45)",
  "oklch(0.65 0.20 310)",
]

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ name: string; value: number; color: string }>; label?: string }) {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border bg-card p-3 shadow-md">
        <p className="text-sm font-medium text-foreground">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm text-muted-foreground">
            {entry.name}: {new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(entry.value)}
          </p>
        ))}
      </div>
    )
  }
  return null
}

export function DashboardCharts() {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="text-base">Sales & Profit Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={salesChartData}>
              <defs>
                <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="oklch(0.55 0.2 255)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="oklch(0.55 0.2 255)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="profitGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="oklch(0.65 0.18 155)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="oklch(0.65 0.18 155)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.91 0.005 250)" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="oklch(0.50 0.02 260)" />
              <YAxis tick={{ fontSize: 12 }} stroke="oklch(0.50 0.02 260)" tickFormatter={(v) => `${v / 1000}k`} />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="sales"
                stroke="oklch(0.55 0.2 255)"
                fill="url(#salesGradient)"
                strokeWidth={2}
                name="Sales"
              />
              <Area
                type="monotone"
                dataKey="profit"
                stroke="oklch(0.65 0.18 155)"
                fill="url(#profitGradient)"
                strokeWidth={2}
                name="Profit"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Inventory by Category</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={categoryDistribution}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={85}
                paddingAngle={4}
                dataKey="value"
              >
                {categoryDistribution.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number) => [`${value}%`, ""]}
                contentStyle={{
                  borderRadius: "8px",
                  border: "1px solid oklch(0.91 0.005 250)",
                  backgroundColor: "oklch(1 0 0)",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-2 flex flex-wrap justify-center gap-3">
            {categoryDistribution.map((item, index) => (
              <div key={item.name} className="flex items-center gap-1.5 text-xs">
                <div
                  className="size-2.5 rounded-full"
                  style={{ backgroundColor: COLORS[index] }}
                />
                <span className="text-muted-foreground">{item.name}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="lg:col-span-3">
        <CardHeader>
          <CardTitle className="text-base">Monthly Sales vs Profit</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={salesChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.91 0.005 250)" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="oklch(0.50 0.02 260)" />
              <YAxis tick={{ fontSize: 12 }} stroke="oklch(0.50 0.02 260)" tickFormatter={(v) => `${v / 1000}k`} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="sales" name="Sales" fill="oklch(0.55 0.2 255)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="profit" name="Profit" fill="oklch(0.65 0.18 155)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
