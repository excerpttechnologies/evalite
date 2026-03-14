// import { NextResponse } from "next/server"
// import dbConnect from "@/app/lib/mongodb"
// import Settings from "@/app/models/Settings"

// export async function GET(){

//   await dbConnect()

//   const settings = await Settings.findOne()

//   return NextResponse.json(settings || {})

// }

// export async function POST(req:Request){

//   await dbConnect()

//   const body = await req.json()

//   let settings = await Settings.findOne()

//   if(settings){

//     settings = await Settings.findByIdAndUpdate(
//       settings._id,
//       body,
//       {new:true}
//     )

//   }else{

//     settings = await Settings.create(body)

//   }

//   return NextResponse.json(settings)

// }




//aravind


import { NextResponse } from "next/server"
import dbConnect from "@/app/lib/mongodb"
import Settings from "@/app/models/Settings"
import { getUserFromToken } from "@/app/lib/authMiddleware"

export async function GET(req: Request) {
  try {
    const auth = getUserFromToken(req)
    if ("error" in auth) return auth.error
    const userId = auth.user.id

    await dbConnect()

    // ✅ only this user's settings
    const settings = await Settings.findOne({ userId })

    return NextResponse.json(settings || {})

  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const auth = getUserFromToken(req)
    if ("error" in auth) return auth.error
    const userId = auth.user.id

    await dbConnect()
    const body = await req.json()

    // ✅ find settings only for this user
    let settings = await Settings.findOne({ userId })

    if (settings) {
      // ✅ update only this user's settings
      settings = await Settings.findByIdAndUpdate(
        settings._id,
        { ...body, userId },
        { new: true }
      )
    } else {
      // ✅ create settings with userId
      settings = await Settings.create({ ...body, userId })
    }

    return NextResponse.json(settings)

  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Failed to save settings" }, { status: 500 })
  }
}