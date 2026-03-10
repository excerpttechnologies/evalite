import { InventoryTable } from "@/app/components/inventory/inventory-table"

export default function InventoryPage() {
  return (
    <div className="flex flex-col gap-6 p-4 md:p-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground text-balance">
          Inventory / Products
        </h2>
        <p className="text-muted-foreground text-sm mt-1">
          Manage your products and stock levels
        </p>
      </div>
      <InventoryTable />
    </div>
  )
}
