import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function GET(
  request: Request,
  { params }: { params: { companyId: string } }
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Await params before accessing companyId
    const companyId = params.companyId;
    if (!companyId) {
      return new NextResponse("Company ID is required", { status: 400 });
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

    // Fetch contacts for the company
    const contacts = await prisma.contact.findMany({
      where: {
        companyId,
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(contacts);
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function POST(
  request: Request,
  { params }: { params: { companyId: string } }
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Await params before accessing companyId
    const companyId = params.companyId;
    if (!companyId) {
      return new NextResponse("Company ID is required", { status: 400 });
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
    if (!name || !email || !startDate) {
      return new NextResponse("Name, email, and start date are required", { status: 400 });
    }

    // Create the contact
    const contact = await prisma.contact.create({
      data: {
        name,
        email,
        phone,
        role,
        startDate: new Date(startDate),
        companyId,
        userId,
      },
    });

    return NextResponse.json(contact);
  } catch (error) {
    console.error("Error creating contact:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { companyId: string } }
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const companyId = params.companyId; // Acceder a params directamente
    if (!companyId) {
      return new NextResponse("Company ID is required", { status: 400 });
    }

    const body = await req.json();

    const company = await prisma.company.update({
      where: {
        id: companyId,
        userId,
      },
      data: body,
    });

    return NextResponse.json(company);
  } catch (error) {
    console.error("Error:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}