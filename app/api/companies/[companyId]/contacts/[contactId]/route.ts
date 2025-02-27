
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@clerk/nextjs/server";

export async function GET(request: Request, { params }: { params: { companyId: string; contactId: string } }) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const { companyId, contactId } = params
    if (!companyId || !contactId) {
      return new NextResponse("Company ID and Contact ID are required", { status: 400 })
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

    const contact = await prisma.contact.findUnique({
      where: {
        id: contactId,
        companyId,
        userId,
      },
    })

    if (!contact) {
      return new NextResponse("Contact not found", { status: 404 })
    }

    return NextResponse.json(contact)
  } catch (error) {
    console.error("Error fetching contact:", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { companyId: string; contactId: string } }) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const { companyId, contactId } = params
    if (!companyId || !contactId) {
      return new NextResponse("Company ID and Contact ID are required", { status: 400 })
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
    const { name, email, phone, role } = body

    if (!name || !email || !role) {
      return new NextResponse("Name and email are required", { status: 400 })
    }

    // Verificar que el contacto existe y pertenece al usuario y a la empresa
    const existingContact = await prisma.contact.findUnique({
      where: {
        id: contactId,
        companyId,
        userId,
      },
    })

    if (!existingContact) {
      return new NextResponse("Contact not found", { status: 404 })
    }

    const updatedContact = await prisma.contact.update({
      where: {
        id: contactId,
      },
      data: {
        name,
        email,
        phone,
        role,
      },
    })

    return NextResponse.json(updatedContact)
  } catch (error) {
    console.error("Error updating contact:", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { companyId: string; contactId: string } }) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const { companyId, contactId } = params
    if (!companyId || !contactId) {
      return new NextResponse("Company ID and Contact ID are required", { status: 400 })
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

    // Verificar que el contacto existe y pertenece al usuario y a la empresa
    const existingContact = await prisma.contact.findUnique({
      where: {
        id: contactId,
        companyId,
        userId,
      },
    })

    if (!existingContact) {
      return new NextResponse("Contact not found", { status: 404 })
    }

    await prisma.contact.delete({
      where: {
        id: contactId,
      },
    })

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error("Error deleting contact:", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}

