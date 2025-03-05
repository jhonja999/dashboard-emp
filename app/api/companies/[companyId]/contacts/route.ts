// Archivo: api_contacts.ts
// Uso: Controlador de API para gestionar contactos dentro de una compañía en una aplicación Next.js con Prisma y Clerk.

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

// Método GET: Obtiene todos los contactos de una compañía específica
export async function GET(
  request: Request,
  { params }: { params: { companyId: string } }
) {
  try {
    // Autenticación del usuario
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("No autorizado", { status: 401 });
    }

    // Validación de parámetros
    const companyId = params.companyId;
    if (!companyId) {
      return new NextResponse("Se requiere Company ID", { status: 400 });
    }

    // Verifica que la compañía pertenece al usuario autenticado
    const company = await prisma.company.findUnique({
      where: {
        id: companyId,
        userId,
      },
    });
    if (!company) {
      return new NextResponse("Compañía no encontrada", { status: 404 });
    }

    // Obtiene los contactos de la compañía
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
    console.error("Error al obtener los contactos:", error);
    return new NextResponse("Error interno", { status: 500 });
  }
}

// Método POST: Crea un nuevo contacto dentro de una compañía
export async function POST(
  request: Request,
  { params }: { params: { companyId: string } }
) {
  try {
    // Autenticación del usuario
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("No autorizado", { status: 401 });
    }

    // Validación de parámetros
    const companyId = params.companyId;
    if (!companyId) {
      return new NextResponse("Se requiere Company ID", { status: 400 });
    }

    // Verifica que la compañía pertenece al usuario autenticado
    const company = await prisma.company.findUnique({
      where: {
        id: companyId,
        userId,
      },
    });
    if (!company) {
      return new NextResponse("Compañía no encontrada", { status: 404 });
    }

    // Obtiene y valida los datos del cuerpo de la solicitud
    const body = await request.json();
    const { name, email, phone, role, startDate } = body;
    if (!name || !email || !startDate) {
      return new NextResponse("Nombre, correo y fecha de inicio son obligatorios", { status: 400 });
    }

    // Crea un nuevo contacto en la base de datos
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
    console.error("Error al crear el contacto:", error);
    return new NextResponse("Error interno", { status: 500 });
  }
}

// Método PATCH: Actualiza la información de una compañía específica
export async function PATCH(
  req: Request,
  { params }: { params: { companyId: string } }
) {
  try {
    // Autenticación del usuario
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("No autorizado", { status: 401 });
    }

    // Validación de parámetros
    const companyId = params.companyId;
    if (!companyId) {
      return new NextResponse("Se requiere Company ID", { status: 400 });
    }

    // Obtiene los datos del cuerpo de la solicitud
    const body = await req.json();

    // Actualiza la información de la compañía en la base de datos
    const company = await prisma.company.update({
      where: {
        id: companyId,
        userId,
      },
      data: body,
    });

    return NextResponse.json(company);
  } catch (error) {
    console.error("Error al actualizar la compañía:", error);
    return new NextResponse("Error interno", { status: 500 });
  }
}
