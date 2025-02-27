
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@clerk/nextjs/server"

export async function GET(request: Request, { params }: { params: { companyId: string } }) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const companyId = params.companyId
    if (!companyId) {
      return new NextResponse("Company ID is required", { status: 400 })
    }

    // Verificar que la empresa existe y pertenece al usuario
    const company = await prisma.company.findUnique({
      where: {
        id: companyId,
        userId,
      },
    })

    if (!company) {
      return new NextResponse("Company not found", { status: 404 })
    }

    const contacts = await prisma.contact.findMany({
      where: {
        companyId,
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json(contacts)
  } catch (error) {
    console.error("Error fetching contacts:", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}

export async function POST(request: Request, { params }: { params: { companyId: string } }) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const companyId = params.companyId
    if (!companyId) {
      return new NextResponse("Company ID is required", { status: 400 })
    }

    // Verificar que la empresa existe y pertenece al usuario
    const company = await prisma.company.findUnique({
      where: {
        id: companyId,
        userId,
      },
    })

    if (!company) {
      return new NextResponse("Company not found", { status: 404 })
    }

    const body = await request.json()
    const { name, email, phone, role } = body;

    if (!name || !email || !role) {
      return new NextResponse("Name and email are required", { status: 400 })
    }

    const contact = await prisma.contact.create({
      data: {
        name,
        email,
        phone,
        role,
        companyId,
        userId,
      },
    })

    return NextResponse.json(contact)
  } catch (error) {
    console.error("Error creating contact:", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}

