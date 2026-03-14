// import { NextResponse } from "next/server"
// import dbConnect from "@/app/lib/mongodb"

// import Sale from "@/app/models/Sale"
// import Expense from "@/app/models/Expense"
// import Product from "@/app/models/Product"

// export async function GET() {

//   try {

//     await dbConnect()

//     const sales = await Sale.find()
//     const expenses = await Expense.find()
//     const products = await Product.find()

//     /* ---------------- Monthly Sales ---------------- */

//     const monthlySales: any = {}

//     sales.forEach((sale) => {

//       const date = new Date(sale.date)
//       const month = date.toLocaleString("default",{month:"short"})

//       if(!monthlySales[month]){
//         monthlySales[month] = {
//           month,
//           sales:0,
//           profit:0
//         }
//       }

//       monthlySales[month].sales += sale.total || 0

//       // simple profit calculation
//       monthlySales[month].profit += (sale.total || 0) * 0.3

//     })

//     const salesChartData = Object.values(monthlySales)

//     /* ---------------- Expense Breakdown ---------------- */

//     const monthlyExpenses:any = {}

//     expenses.forEach((exp)=>{

//       const date = new Date(exp.date)
//       const month = date.toLocaleString("default",{month:"short"})

//       if(!monthlyExpenses[month]){
//         monthlyExpenses[month] = {
//           month,
//           rent:0,
//           salary:0,
//           electricity:0,
//           transport:0,
//           other:0
//         }
//       }

//       const cat = exp.category?.toLowerCase()

//       if(cat === "rent") monthlyExpenses[month].rent += exp.amount
//       else if(cat === "salary") monthlyExpenses[month].salary += exp.amount
//       else if(cat === "electricity") monthlyExpenses[month].electricity += exp.amount
//       else if(cat === "transport") monthlyExpenses[month].transport += exp.amount
//       else monthlyExpenses[month].other += exp.amount

//     })

//     const expenseChartData = Object.values(monthlyExpenses)

//     /* ---------------- Inventory Summary ---------------- */

//     const stockSummary = [
//       {
//         name:"In Stock",
//         value: products.filter(p=>p.stock > 10).length
//       },
//       {
//         name:"Low Stock",
//         value: products.filter(p=>p.stock <=10 && p.stock >0).length
//       },
//       {
//         name:"Out of Stock",
//         value: products.filter(p=>p.stock === 0).length
//       }
//     ]

//     return NextResponse.json({
//       salesChartData,
//       expenseChartData,
//       stockSummary
//     })

//   } catch (error) {

//     console.error(error)

//     return NextResponse.json(
//       {error:"Reports fetch failed"},
//       {status:500}
//     )

//   }

// }


//aravind

import { NextResponse } from "next/server"
import dbConnect from "@/app/lib/mongodb"
import Sale from "@/app/models/Sale"
import Expense from "@/app/models/Expense"
import Product from "@/app/models/Product"
import { getUserFromToken } from "@/app/lib/authMiddleware"

export async function GET(req: Request) {
  try {
    const auth = getUserFromToken(req)
    if ("error" in auth) return auth.error
    const userId = auth.user.id

    await dbConnect()

    // ✅ all 3 queries scoped to this user only
    const sales = await Sale.find({ userId })
    const expenses = await Expense.find({ userId })
    const products = await Product.find({ userId })

    /* ---------------- Monthly Sales ---------------- */
    const monthlySales: any = {}

    sales.forEach((sale) => {
      const month = new Date(sale.date).toLocaleString("default", { month: "short" })

      if (!monthlySales[month]) {
        monthlySales[month] = { month, sales: 0, profit: 0 }
      }

      monthlySales[month].sales += sale.total || 0
      monthlySales[month].profit += (sale.total || 0) * 0.3
    })

    const salesChartData = Object.values(monthlySales)

    /* ---------------- Expense Breakdown ---------------- */
    const monthlyExpenses: any = {}

    expenses.forEach((exp) => {
      const month = new Date(exp.date).toLocaleString("default", { month: "short" })

      if (!monthlyExpenses[month]) {
        monthlyExpenses[month] = {
          month, rent: 0, salary: 0, electricity: 0, transport: 0, other: 0
        }
      }

      const cat = exp.category?.toLowerCase()

      if (cat === "rent") monthlyExpenses[month].rent += exp.amount
      else if (cat === "salary") monthlyExpenses[month].salary += exp.amount
      else if (cat === "electricity") monthlyExpenses[month].electricity += exp.amount
      else if (cat === "transport") monthlyExpenses[month].transport += exp.amount
      else monthlyExpenses[month].other += exp.amount
    })

    const expenseChartData = Object.values(monthlyExpenses)

    /* ---------------- Inventory Summary ---------------- */
    const stockSummary = [
      { name: "In Stock", value: products.filter(p => p.stock > 10).length },
      { name: "Low Stock", value: products.filter(p => p.stock <= 10 && p.stock > 0).length },
      { name: "Out of Stock", value: products.filter(p => p.stock === 0).length },
    ]

    return NextResponse.json({ salesChartData, expenseChartData, stockSummary })

  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Reports fetch failed" }, { status: 500 })
  }
}