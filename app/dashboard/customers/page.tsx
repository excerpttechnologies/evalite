import { CustomerList } from "@/app/components/customers/customer-list"

export default function CustomersPage() {
  return (
    <div className="flex flex-col gap-6 p-4 md:p-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground text-balance">
          Customers
        </h2>
        <p className="text-muted-foreground text-sm mt-1">
          Manage your customers and track their balances
        </p>
      </div>
      <CustomerList />
    </div>
  )
}
