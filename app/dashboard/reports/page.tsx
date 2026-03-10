import { ReportsCharts } from "@/app/components/reports/reports-charts"

export default function ReportsPage() {
  return (
    <div className="flex flex-col gap-6 p-4 md:p-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground text-balance">
          Reports
        </h2>
        <p className="text-muted-foreground text-sm mt-1">
          Business analytics and performance insights
        </p>
      </div>
      <ReportsCharts />
    </div>
  )
}
