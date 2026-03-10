import { ExpenseTracker } from "@/app/components/expenses/expense-tracker"

export default function ExpensesPage() {
  return (
    <div className="flex flex-col gap-6 p-4 md:p-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground text-balance">
          Expenses
        </h2>
        <p className="text-muted-foreground text-sm mt-1">
          Track and manage your business expenses
        </p>
      </div>
      <ExpenseTracker />
    </div>
  )
}
