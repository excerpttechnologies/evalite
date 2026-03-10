// Mock data for evaLite demo application

export const products = [
  { id: 1, name: "Paracetamol 500mg", category: "Medicine", purchasePrice: 25, sellingPrice: 40, stock: 250, status: "In Stock" },
  { id: 2, name: "Rice Bag 25kg", category: "Grocery", purchasePrice: 1200, sellingPrice: 1450, stock: 18, status: "In Stock" },
  { id: 3, name: "Mobile Charger", category: "Electronics", purchasePrice: 180, sellingPrice: 350, stock: 3, status: "Low Stock" },
  { id: 4, name: "Notebook A4 200pg", category: "Stationery", purchasePrice: 45, sellingPrice: 80, stock: 120, status: "In Stock" },
  { id: 5, name: "Amoxicillin 250mg", category: "Medicine", purchasePrice: 35, sellingPrice: 55, stock: 80, status: "In Stock" },
  { id: 6, name: "Wheat Flour 10kg", category: "Grocery", purchasePrice: 400, sellingPrice: 520, stock: 45, status: "In Stock" },
  { id: 7, name: "USB Cable Type-C", category: "Electronics", purchasePrice: 90, sellingPrice: 180, stock: 2, status: "Low Stock" },
  { id: 8, name: "Ball Pen Blue (10)", category: "Stationery", purchasePrice: 30, sellingPrice: 60, stock: 200, status: "In Stock" },
  { id: 9, name: "Cough Syrup 100ml", category: "Medicine", purchasePrice: 55, sellingPrice: 85, stock: 60, status: "In Stock" },
  { id: 10, name: "Sugar 5kg", category: "Grocery", purchasePrice: 250, sellingPrice: 320, stock: 30, status: "In Stock" },
  { id: 11, name: "Earphones Wired", category: "Electronics", purchasePrice: 120, sellingPrice: 250, stock: 0, status: "Out of Stock" },
  { id: 12, name: "Printer Paper A4", category: "Stationery", purchasePrice: 280, sellingPrice: 380, stock: 15, status: "In Stock" },
]

export const customers = [
  { id: 1, name: "Rajesh Kumar", phone: "+91 98765 43210", totalPurchases: 45200, balance: 3500, email: "rajesh@email.com", address: "12, MG Road, Delhi", transactions: [
    { date: "2026-03-01", invoice: "INV-1042", amount: 2450, status: "Paid" },
    { date: "2026-02-25", invoice: "INV-1038", amount: 3500, status: "Pending" },
    { date: "2026-02-18", invoice: "INV-1031", amount: 5200, status: "Paid" },
  ]},
  { id: 2, name: "Priya Sharma", phone: "+91 87654 32109", totalPurchases: 32800, balance: 0, email: "priya@email.com", address: "45, Park Street, Mumbai", transactions: [
    { date: "2026-03-03", invoice: "INV-1045", amount: 1800, status: "Paid" },
    { date: "2026-02-20", invoice: "INV-1035", amount: 4200, status: "Paid" },
  ]},
  { id: 3, name: "Amit Patel", phone: "+91 76543 21098", totalPurchases: 78500, balance: 12000, email: "amit@email.com", address: "78, Ring Road, Ahmedabad", transactions: [
    { date: "2026-03-04", invoice: "INV-1048", amount: 12000, status: "Pending" },
    { date: "2026-02-28", invoice: "INV-1040", amount: 8500, status: "Paid" },
    { date: "2026-02-15", invoice: "INV-1029", amount: 6300, status: "Paid" },
  ]},
  { id: 4, name: "Sunita Verma", phone: "+91 65432 10987", totalPurchases: 21500, balance: 1500, email: "sunita@email.com", address: "23, Anna Nagar, Chennai", transactions: [
    { date: "2026-03-02", invoice: "INV-1043", amount: 1500, status: "Pending" },
    { date: "2026-02-22", invoice: "INV-1036", amount: 3200, status: "Paid" },
  ]},
  { id: 5, name: "Vikram Singh", phone: "+91 54321 09876", totalPurchases: 56200, balance: 0, email: "vikram@email.com", address: "56, Banjara Hills, Hyderabad", transactions: [
    { date: "2026-03-05", invoice: "INV-1050", amount: 7800, status: "Paid" },
    { date: "2026-02-26", invoice: "INV-1039", amount: 4500, status: "Paid" },
  ]},
  { id: 6, name: "Meera Joshi", phone: "+91 43210 98765", totalPurchases: 18900, balance: 2800, email: "meera@email.com", address: "34, FC Road, Pune", transactions: [
    { date: "2026-03-01", invoice: "INV-1041", amount: 2800, status: "Pending" },
  ]},
]

export const suppliers = [
  { id: 1, name: "MedPharma Distributors", contact: "+91 11234 56789", email: "med@pharma.com", address: "Industrial Area, Delhi", totalPurchases: 125000, lastOrder: "2026-03-02" },
  { id: 2, name: "FreshGrain Supplies", contact: "+91 22345 67890", email: "fresh@grain.com", address: "APMC Market, Mumbai", totalPurchases: 89000, lastOrder: "2026-02-28" },
  { id: 3, name: "TechHub Electronics", contact: "+91 33456 78901", email: "tech@hub.com", address: "SP Road, Bangalore", totalPurchases: 67500, lastOrder: "2026-03-01" },
  { id: 4, name: "PaperWorld Stationery", contact: "+91 44567 89012", email: "paper@world.com", address: "Chandni Chowk, Delhi", totalPurchases: 34200, lastOrder: "2026-02-20" },
  { id: 5, name: "Bharat Wholesale", contact: "+91 55678 90123", email: "bharat@wholesale.com", address: "Nehru Place, Delhi", totalPurchases: 210000, lastOrder: "2026-03-04" },
]

export const recentTransactions = [
  { id: 1, customer: "Rajesh Kumar", invoice: "INV-1050", amount: 7800, status: "Paid", date: "2026-03-05", type: "Sale" },
  { id: 2, customer: "Amit Patel", invoice: "INV-1048", amount: 12000, status: "Pending", date: "2026-03-04", type: "Sale" },
  { id: 3, customer: "Priya Sharma", invoice: "INV-1045", amount: 1800, status: "Paid", date: "2026-03-03", type: "Sale" },
  { id: 4, customer: "Sunita Verma", invoice: "INV-1043", amount: 1500, status: "Pending", date: "2026-03-02", type: "Sale" },
  { id: 5, customer: "Rajesh Kumar", invoice: "INV-1042", amount: 2450, status: "Paid", date: "2026-03-01", type: "Sale" },
  { id: 6, customer: "Meera Joshi", invoice: "INV-1041", amount: 2800, status: "Pending", date: "2026-03-01", type: "Sale" },
  { id: 7, customer: "Vikram Singh", invoice: "INV-1039", amount: 4500, status: "Paid", date: "2026-02-26", type: "Sale" },
  { id: 8, customer: "Priya Sharma", invoice: "INV-1035", amount: 4200, status: "Paid", date: "2026-02-20", type: "Sale" },
]

export const purchases = [
  { id: 1, supplier: "MedPharma Distributors", product: "Paracetamol 500mg", quantity: 500, price: 25, total: 12500, date: "2026-03-02" },
  { id: 2, supplier: "FreshGrain Supplies", product: "Rice Bag 25kg", quantity: 20, price: 1200, total: 24000, date: "2026-02-28" },
  { id: 3, supplier: "TechHub Electronics", product: "Mobile Charger", quantity: 50, price: 180, total: 9000, date: "2026-03-01" },
  { id: 4, supplier: "PaperWorld Stationery", product: "Notebook A4 200pg", quantity: 200, price: 45, total: 9000, date: "2026-02-20" },
  { id: 5, supplier: "Bharat Wholesale", product: "Sugar 5kg", quantity: 100, price: 250, total: 25000, date: "2026-03-04" },
  { id: 6, supplier: "MedPharma Distributors", product: "Cough Syrup 100ml", quantity: 100, price: 55, total: 5500, date: "2026-02-25" },
  { id: 7, supplier: "FreshGrain Supplies", product: "Wheat Flour 10kg", quantity: 50, price: 400, total: 20000, date: "2026-02-22" },
]

export const expenses = [
  { id: 1, category: "Rent", amount: 25000, date: "2026-03-01", notes: "Shop rent for March 2026" },
  { id: 2, category: "Electricity", amount: 4500, date: "2026-03-03", notes: "Electricity bill February" },
  { id: 3, category: "Transport", amount: 3200, date: "2026-02-28", notes: "Delivery vehicle fuel" },
  { id: 4, category: "Salary", amount: 45000, date: "2026-03-01", notes: "Staff salary (3 employees)" },
  { id: 5, category: "Transport", amount: 1500, date: "2026-02-15", notes: "Courier charges" },
  { id: 6, category: "Maintenance", amount: 2000, date: "2026-02-20", notes: "AC repair" },
  { id: 7, category: "Internet", amount: 1200, date: "2026-03-02", notes: "Broadband monthly bill" },
  { id: 8, category: "Salary", amount: 45000, date: "2026-02-01", notes: "Staff salary (3 employees)" },
]

export const salesChartData = [
  { month: "Oct", sales: 125000, profit: 32000 },
  { month: "Nov", sales: 148000, profit: 38000 },
  { month: "Dec", sales: 175000, profit: 45000 },
  { month: "Jan", sales: 162000, profit: 41000 },
  { month: "Feb", sales: 189000, profit: 52000 },
  { month: "Mar", sales: 210000, profit: 58000 },
]

export const categoryDistribution = [
  { name: "Medicine", value: 35, fill: "var(--color-chart-1)" },
  { name: "Grocery", value: 28, fill: "var(--color-chart-2)" },
  { name: "Electronics", value: 20, fill: "var(--color-chart-3)" },
  { name: "Stationery", value: 17, fill: "var(--color-chart-4)" },
]

export const monthlyExpenses = [
  { month: "Oct", rent: 25000, electricity: 3800, transport: 2500, salary: 45000, other: 3000 },
  { month: "Nov", rent: 25000, electricity: 4200, transport: 3100, salary: 45000, other: 2500 },
  { month: "Dec", rent: 25000, electricity: 4000, transport: 3500, salary: 45000, other: 4000 },
  { month: "Jan", rent: 25000, electricity: 3500, transport: 2800, salary: 45000, other: 3200 },
  { month: "Feb", rent: 25000, electricity: 4100, transport: 4700, salary: 45000, other: 3200 },
  { month: "Mar", rent: 25000, electricity: 4500, transport: 3200, salary: 45000, other: 3200 },
]

export const businessSettings = {
  name: "Krishna General Store",
  gst: "07AABCU9603R1ZM",
  address: "42, Lajpat Nagar, New Delhi - 110024",
  phone: "+91 98765 12345",
  email: "krishna.store@email.com",
  currency: "INR",
  invoiceTheme: "Classic",
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount)
}
