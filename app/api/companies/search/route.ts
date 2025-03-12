import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // Asegúrate de tener tu prisma client en /lib/prisma
import { auth } from "@clerk/nextjs/server"; // Si usas Clerk para autenticación

/**
 * GET /api/companies/search?term=...
 * Busca compañías por ID exacto (si detecta que 'term' es un ID)
 * o por nombre (si no parece un ID).
 */
export async function GET(request: Request) {
  try {
    // Autenticación (si lo deseas)
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("No autorizado", { status: 401 });
    }

    // Obtiene el 'term' de la query
    const { searchParams } = new URL(request.url);
    const term = searchParams.get("term") || "";

    // Decide si se busca por ID o por nombre
    // (Ejemplo: si length > 10, asumimos que es un ID)
    // Ajusta la lógica según tu conveniencia
    const isIdSearch = term.length > 10;

    let companies;
    if (isIdSearch) {
      // Busca la compañía con ID exacto
      companies = await prisma.company.findMany({
        where: {
          // Filtra por userId para asegurar que el usuario actual solo vea sus compañías
          userId,
          id: term
        },
        orderBy: { createdAt: "desc" }
      });
    } else {
      // Busca compañías por nombre con contains (case-insensitive)
      companies = await prisma.company.findMany({
        where: {
          userId,
          name: {
            contains: term,
            mode: "insensitive"
          }
        },
        orderBy: { createdAt: "desc" }
      });
    }

    return NextResponse.json(companies);
  } catch (error) {
    console.error("Error searching companies:", error);
    return new NextResponse("Error interno", { status: 500 });
  }
}
