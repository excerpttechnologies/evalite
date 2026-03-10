import { BillingInterface } from "@/app/components/sales/billing-interface"

export default function SalesPage() {
  return (
    <div className="flex flex-col gap-6 p-4 md:p-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground text-balance">
          Sales / Billing
        </h2>
        <p className="text-muted-foreground text-sm mt-1">
          Create invoices and manage sales
        </p>
      </div>
      <BillingInterface />
    </div>
  )
}
