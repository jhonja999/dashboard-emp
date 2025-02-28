import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function GET(
  request: Request,
  { params }: { params: { companyId: string; contactId: string } }
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Await params before accessing companyId and contactId
    const { companyId, contactId } = params;
    if (!companyId || !contactId) {
      return new NextResponse("Company ID and Contact ID are required", { status: 400 });
    }

    // Verify company belongs to the user
    const company = await prisma.company.findUnique({
      where: {
        id: companyId,
        userId,
      },
    });

    if (!company) {
      return new NextResponse("Company not found", { status: 404 });
    }

    // Fetch the specific contact
    const contact = await prisma.contact.findUnique({
      where: {
        id: contactId,
        companyId,
        userId,
      },
    });

    if (!contact) {
      return new NextResponse("Contact not found", { status: 404 });
    }

    return NextResponse.json(contact);
  } catch (error) {
    console.error("Error fetching contact:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { companyId: string; contactId: string } }
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Await params before accessing companyId and contactId
    const { companyId, contactId } = params;
    if (!companyId || !contactId) {
      return new NextResponse("Company ID and Contact ID are required", { status: 400 });
    }

    // Verify company belongs to the user
    const company = await prisma.company.findUnique({
      where: {
        id: companyId,
        userId,
      },
    });

    if (!company) {
      return new NextResponse("Company not found", { status: 404 });
    }

    // Parse request body
    const body = await request.json();
    const { name, email, phone, role, startDate } = body;

    // Validate required fields
    if (!name || !email || !role) {
      return new NextResponse("Name, email, and role are required", { status: 400 });
    }

    // Update the contact
    const updatedContact = await prisma.contact.update({
      where: {
        id: contactId,
      },
      data: {
        name,
        email,
        phone,
        role,
        startDate,
      },
    });

    return NextResponse.json(updatedContact);
  } catch (error) {
    console.error("Error updating contact:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { companyId: string; contactId: string } }
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Await params before accessing companyId and contactId
    const { companyId, contactId } = params;
    if (!companyId || !contactId) {
      return new NextResponse("Company ID and Contact ID are required", { status: 400 });
    }

    // Verify company belongs to the user
    const company = await prisma.company.findUnique({
      where: {
        id: companyId,
        userId,
      },
    });

    if (!company) {
      return new NextResponse("Company not found", { status: 404 });
    }

    // Delete the contact
    await prisma.contact.delete({
      where: {
        id: contactId,
      },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("Error deleting contact:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}