import { NextResponse } from "next/server"
import dbConnect from "@/app/lib/mongodb"
import Settings from "@/app/models/Settings"

export async function GET(){

  await dbConnect()

  const settings = await Settings.findOne()

  return NextResponse.json(settings || {})

}

export async function POST(req:Request){

  await dbConnect()

  const body = await req.json()

  let settings = await Settings.findOne()

  if(settings){

    settings = await Settings.findByIdAndUpdate(
      settings._id,
      body,
      {new:true}
    )

  }else{

    settings = await Settings.create(body)

  }

  return NextResponse.json(settings)

}