import { SupplierList } from "@/app/components/suppliers/supplier-list"

export default function SuppliersPage() {
  return (
    <div className="flex flex-col gap-6 p-4 md:p-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground text-balance">
          Suppliers
        </h2>
        <p className="text-muted-foreground text-sm mt-1">
          Manage your suppliers and purchase contacts
        </p>
      </div>
      <SupplierList />
    </div>
  )
}
