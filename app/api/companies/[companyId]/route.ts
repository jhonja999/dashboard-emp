
import { prisma } from "@/lib/prisma"
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export async function PATCH(req: Request, { params }: { params: { companyId: string } }) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const body = await req.json()
    console.log("Updating company:", params.companyId, "with data:", body)

    const company = await prisma.company.update({
      where: {
        id: params.companyId,
        userId,
      },
      data: body,
    })

    console.log("Company updated successfully:", company)
    return NextResponse.json(company)
  } catch (error) {
    console.error("Error updating company:", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: { params: { companyId: string } }) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const company = await prisma.company.delete({
      where: {
        id: params.companyId,
        userId,
      },
    })

    console.log("Company deleted successfully:", company)
    return NextResponse.json(company)
  } catch (error) {
    console.error("Error deleting company:", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

