// import { NextResponse } from "next/server"
// import dbConnect from "@/app/lib/mongodb"
// import Sale from "@/app/models/Sale"
// import Product from "@/app/models/Product"
// import Customer from "@/app/models/Customer"

// export async function POST(req: Request) {

//   try {

//     await dbConnect()

//     const body = await req.json()

//     const { customer, product, quantity, price, date } = body

//     const total = quantity * price

//     // create sale
//     const sale = await Sale.create({
//       customer,
//       product,
//       quantity,
//       price,
//       total,
//       date
//     })

//     // reduce product stock
//     await Product.findByIdAndUpdate(product, {
//       $inc: { stock: -quantity }
//     })

//     // update customer purchases + balance
//     await Customer.findByIdAndUpdate(customer, {
//       $inc: {
//         totalPurchases: total,
//         balance: total
//       }
//     })

//     return NextResponse.json(sale)

//   } catch (error) {

//     console.error(error)

//     return NextResponse.json(
//       { error: "Failed to create sale" },
//       { status: 500 }
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







import { NextResponse } from "next/server"
import dbConnect from "@/app/lib/mongodb"
import Sale from "@/app/models/Sale"
import Product from "@/app/models/Product"
import Customer from "@/app/models/Customer"

export async function POST(req: Request) {

  try {

    await dbConnect()

    const body = await req.json()

    const { customer, product, quantity, price, date } = body

    // ✅ VALIDATION (ADD HERE)
    if (!customer || !product) {
      return NextResponse.json(
        { error: "Customer or Product missing" },
        { status: 400 }
      )
    }

    const total = quantity * price

    // create sale
    const sale = await Sale.create({
      customer,
      product,
      quantity,
      price,
      total,
      date
    })

    // reduce product stock
    await Product.findByIdAndUpdate(product, {
      $inc: { stock: -quantity }
    })

    // update customer purchases + balance
    await Customer.findByIdAndUpdate(customer, {
      $inc: {
        totalPurchases: total,
        balance: total
      }
    })

    return NextResponse.json(sale)

  } catch (error) {

    console.error(error)

    return NextResponse.json(
      { error: "Failed to create sale" },
      { status: 500 }
    )

  }

}

export async function GET() {

  try {

    await dbConnect()

    const sales = await Sale.find()
      .populate("customer")
      .populate("product")
      .sort({ date: -1 })

    return NextResponse.json(sales)

  } catch (error) {

    console.error(error)

    return NextResponse.json(
      { error: "Failed to fetch sales" },
      { status: 500 }
    )

  }

}
