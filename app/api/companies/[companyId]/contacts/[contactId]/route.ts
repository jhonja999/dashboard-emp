// Archivo: api_[contactId].ts
// Uso: Controlador de API para gestionar contactos dentro de una compañía en una aplicación Next.js con Prisma y Clerk.

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

// Método GET: Obtiene un contacto específico dentro de una compañía
export async function GET(
  request: Request,
  { params }: { params: { companyId: string; contactId: string } }
) {
  try {
    // Autenticación del usuario
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("No autorizado", { status: 401 });
    }

    // Validación de parámetros
    const { companyId, contactId } = params;
    if (!companyId || !contactId) {
      return new NextResponse("Se requieren Company ID y Contact ID", { status: 400 });
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

    // Obtiene el contacto dentro de la compañía
    const contact = await prisma.contact.findUnique({
      where: {
        id: contactId,
        companyId,
        userId,
      },
    });
    if (!contact) {
      return new NextResponse("Contacto no encontrado", { status: 404 });
    }

    return NextResponse.json(contact);
  } catch (error) {
    console.error("Error al obtener el contacto:", error);
    return new NextResponse("Error interno", { status: 500 });
  }
}

// Método PUT: Actualiza la información de un contacto
export async function PUT(
  request: Request,
  { params }: { params: { companyId: string; contactId: string } }
) {
  try {
    // Autenticación del usuario
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("No autorizado", { status: 401 });
    }

    // Validación de parámetros
    const { companyId, contactId } = params;
    if (!companyId || !contactId) {
      return new NextResponse("Se requieren Company ID y Contact ID", { status: 400 });
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
    if (!name || !email || !role) {
      return new NextResponse("Nombre, correo y rol son obligatorios", { status: 400 });
    }

    // Actualiza el contacto en la base de datos
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
    console.error("Error al actualizar el contacto:", error);
    return new NextResponse("Error interno", { status: 500 });
  }
}

// Método DELETE: Elimina un contacto de la base de datos
export async function DELETE(
  request: Request,
  { params }: { params: { companyId: string; contactId: string } }
) {
  try {
    // Autenticación del usuario
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("No autorizado", { status: 401 });
    }

    // Validación de parámetros
    const { companyId, contactId } = params;
    if (!companyId || !contactId) {
      return new NextResponse("Se requieren Company ID y Contact ID", { status: 400 });
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

    // Elimina el contacto de la base de datos
    await prisma.contact.delete({
      where: {
        id: contactId,
      },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("Error al eliminar el contacto:", error);
    return new NextResponse("Error interno", { status: 500 });
  }
}
