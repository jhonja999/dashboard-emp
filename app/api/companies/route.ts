/**
 * Archivo: company_api.ts
 * Uso: Define el endpoint para crear (POST) una empresa en la base de datos.
 * Se utiliza Prisma como ORM y Clerk para la autenticación del usuario.
 */

import { NextResponse } from "next/server" // Importa NextResponse para manejar las respuestas HTTP
import { prisma } from "@/lib/prisma" // Importa Prisma para interactuar con la base de datos
import { auth } from "@clerk/nextjs/server" // Importa Clerk para gestionar la autenticación del usuario

/**
 * Endpoint POST: Crea una nueva empresa en la base de datos.
 * @param req - Objeto de solicitud HTTP que contiene los datos de la empresa.
 * @returns Respuesta HTTP con los datos de la empresa creada o un mensaje de error.
 */
export async function POST(req: Request) {
  try {
    const { userId } = await auth() // Obtiene el ID del usuario autenticado
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 }) // Retorna error si el usuario no está autenticado
    }

    const body = await req.json() // Extrae los datos de la solicitud
    console.log("Received company data:", body) // Muestra en consola los datos recibidos

    // Crea una nueva empresa asociada al usuario autenticado
    const company = await prisma.company.create({
      data: {
        ...body,
        userId,
      },
    })

    console.log("Created company:", company) // Muestra en consola la empresa creada
    return NextResponse.json(company) // Retorna la respuesta con la empresa creada en formato JSON
  } catch (error) {
    console.error("Error creating company:", error) // Muestra en consola el error si ocurre alguno
    return new NextResponse("Internal Error", { status: 500 }) // Retorna respuesta de error interno
  }
}
