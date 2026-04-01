import { PurchaseInterface } from "@/app/components/purchases/purchase-interface"

export default function PurchasesPage() {
  return (
    <div className="flex flex-col gap-4 p-4 md:p-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground text-balance">
          Purchases
        </h2>
        <p className="text-muted-foreground text-sm mt-1">
          Record purchases and track supplier orders
        </p>
      </div>
      <PurchaseInterface />
    </div>
  )
}
