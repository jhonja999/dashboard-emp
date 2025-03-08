import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

/**
 * GET: Lista todos los eventos del usuario autenticado
 */
export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("No autorizado", { status: 401 });
    }

    // Obtiene todos los eventos donde userId coincida
    const events = await prisma.event.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(events);
  } catch (error) {
    console.error("[GET_EVENTS_ERROR]", error);
    return new NextResponse("Error interno", { status: 500 });
  }
}

/**
 * POST: Crea un evento nuevo (no asociado a una compañía en particular).
 * Si quieres asociarlo a una company, añade un campo "companyId" en el body.
 */
export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("No autorizado", { status: 401 });
    }

    const body = await req.json();
    const {
      title,
      start,
      endDate,
      allDay,
      timeFormat,
      description,
      companyId,
      companyName,
    } = body;

    if (!title || !start) {
      return new NextResponse("Título y fecha de inicio son requeridos", {
        status: 400,
      });
    }

    // Crea el evento
    const event = await prisma.event.create({
      data: {
        userId,
        title,
        start: new Date(start),
        endDate: endDate ? new Date(endDate) : null,
        allDay: allDay ?? false,
        timeFormat: timeFormat ?? "HH:mm",
        description: description ?? "",
        companyId: companyId ?? "", // o quita esto si no se asocia
        companyName, // <--- guardamos el nombre
      },
    });

    return NextResponse.json(event);
  } catch (error) {
    console.error("[CREATE_EVENT_ERROR]", error);
    return new NextResponse("Error interno", { status: 500 });
  }
}
