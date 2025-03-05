/**
 * Archivo: company_api.ts
 * Uso: Define los endpoints para actualizar (PATCH) y eliminar (DELETE) una empresa en la base de datos.
 * Se utiliza Prisma como ORM y Clerk para la autenticación del usuario.
 */

import { prisma } from "@/lib/prisma" // Importa Prisma para interactuar con la base de datos
import { auth } from "@clerk/nextjs/server" // Importa Clerk para manejar la autenticación del usuario
import { NextResponse } from "next/server" // Importa NextResponse para manejar las respuestas HTTP

/**
 * Endpoint PATCH: Actualiza la información de una empresa específica.
 * @param req - Objeto de solicitud HTTP.
 * @param params - Parámetro que contiene el ID de la empresa a actualizar.
 * @returns Respuesta HTTP con los datos actualizados de la empresa o un mensaje de error.
 */
export async function PATCH(req: Request, { params }: { params: { companyId: string } }) {
  try {
    const { userId } = await auth() // Obtiene el ID del usuario autenticado
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 }) // Retorna error si el usuario no está autenticado
    }

    const body = await req.json() // Extrae el cuerpo de la solicitud
    console.log("Actualizando empresa:", params.companyId, "con datos:", body)

    // Actualiza la empresa en la base de datos si pertenece al usuario autenticado
    const company = await prisma.company.update({
      where: {
        id: params.companyId,
        userId,
      },
      data: body,
    })

    console.log("Empresa actualizada correctamente:", company)
    return NextResponse.json(company) // Retorna la empresa actualizada
  } catch (error) {
    console.error("Error al actualizar la empresa:", error)
    return new NextResponse("Internal error", { status: 500 }) // Retorna error en caso de fallo
  }
}

/**
 * Endpoint DELETE: Elimina una empresa específica.
 * @param req - Objeto de solicitud HTTP.
 * @param params - Parámetro que contiene el ID de la empresa a eliminar.
 * @returns Respuesta HTTP con los datos de la empresa eliminada o un mensaje de error.
 */
export async function DELETE(req: Request, { params }: { params: { companyId: string } }) {
  try {
    const { userId } = await auth() // Obtiene el ID del usuario autenticado
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 }) // Retorna error si el usuario no está autenticado
    }

    // Elimina la empresa de la base de datos si pertenece al usuario autenticado
    const company = await prisma.company.delete({
      where: {
        id: params.companyId,
        userId,
      },
    })

    console.log("Empresa eliminada correctamente:", company)
    return NextResponse.json(company) // Retorna la empresa eliminada
  } catch (error) {
    console.error("Error al eliminar la empresa:", error)
    return new NextResponse("Internal error", { status: 500 }) // Retorna error en caso de fallo
  }
}
