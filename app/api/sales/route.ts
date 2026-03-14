




// import { NextResponse } from "next/server"
// import dbConnect from "@/app/lib/mongodb"
// import Sale from "@/app/models/Sale"
// import Product from "@/app/models/Product"
// import Customer from "@/app/models/Customer"





// export async function POST(req: Request) {

//   try {

//     await dbConnect()

//     const body = await req.json()

//     const { customer, items } = body

//     if (!customer || !items || items.length === 0) {
//       return NextResponse.json(
//         { error: "Customer or items missing" },
//         { status: 400 }
//       )
//     }

//     const createdSales = []

//     for (const item of items) {

//       const { product, quantity, price } = item

//       const total = quantity * price

//       const sale = await Sale.create({
//         customer,
//         product,
//         quantity,
//         price,
//         total
//       })

//       // reduce stock
//       await Product.findByIdAndUpdate(product,{
//         $inc:{ stock:-quantity }
//       })

//       // update customer
//       await Customer.findByIdAndUpdate(customer,{
//         $inc:{
//           totalPurchases: total,
//           balance: total
//         }
//       })

//       createdSales.push(sale)

//     }

//     return NextResponse.json(createdSales)

//   } catch (error) {

//     console.error(error)

//     return NextResponse.json(
//       { error:"Failed to create invoice" },
//       { status:500 }
//     )

//   }

// }

// export async function GET() {

//   try {

//     await dbConnect()

//     const sales = await Sale.find()
//       .populate("customer")
//       .populate("product")
//       .sort({ date: -1 })

//     return NextResponse.json(sales)

//   } catch (error) {

//     console.error(error)

//     return NextResponse.json(
//       { error: "Failed to fetch sales" },
//       { status: 500 }
//     )

//   }

// }




//aravind

import { NextResponse } from "next/server"
import dbConnect from "@/app/lib/mongodb"
import Sale from "@/app/models/Sale"
import Product from "@/app/models/Product"
import Customer from "@/app/models/Customer"
import { getUserFromToken } from "@/app/lib/authMiddleware"

export async function POST(req: Request) {
  try {
    const auth = getUserFromToken(req)
    if ("error" in auth) return auth.error
    const userId = auth.user.id

    await dbConnect()
    const body = await req.json()
    const { customer, items } = body

    if (!customer || !items || items.length === 0) {
      return NextResponse.json(
        { error: "Customer or items missing" },
        { status: 400 }
      )
    }

    const createdSales = []

    for (const item of items) {
      const { product, quantity, price } = item
      const total = quantity * price

      // ✅ save sale with userId
      const sale = await Sale.create({
        customer,
        product,
        quantity,
        price,
        total,
        userId
      })

      // ✅ only reduce this user's product stock
      await Product.findOneAndUpdate(
        { _id: product, userId },
        { $inc: { stock: -quantity } }
      )

      // ✅ only update this user's customer
      await Customer.findOneAndUpdate(
        { _id: customer, userId },
        { $inc: { totalPurchases: total, balance: total } }
      )

      createdSales.push(sale)
    }

    return NextResponse.json(createdSales)

  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Failed to create invoice" }, { status: 500 })
  }
}

export async function GET(req: Request) {
  try {
    const auth = getUserFromToken(req)
    if ("error" in auth) return auth.error
    const userId = auth.user.id

    await dbConnect()

    // ✅ only this user's sales
    const sales = await Sale.find({ userId })
      .populate("customer")
      .populate("product")
      .sort({ date: -1 })

    return NextResponse.json(sales)

  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Failed to fetch sales" }, { status: 500 })
  }
}