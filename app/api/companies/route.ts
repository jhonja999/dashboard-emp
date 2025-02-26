
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@clerk/nextjs/server"

export async function POST(req: Request) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const body = await req.json()
    console.log("Received company data:", body)

    const company = await prisma.company.create({
      data: {
        ...body,
        userId,
      },
    })

    console.log("Created company:", company)
    return NextResponse.json(company)
  } catch (error) {
    console.error("Error creating company:", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}

