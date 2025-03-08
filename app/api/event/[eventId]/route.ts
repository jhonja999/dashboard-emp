import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

/**
 * GET: Obtiene un evento específico por su ID
 */
export async function GET(
  _req: Request,
  { params }: { params: { eventId: string } }
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("No autorizado", { status: 401 });
    }

    const { eventId } = params;
    if (!eventId) {
      return new NextResponse("Se requiere eventId", { status: 400 });
    }

    const event = await prisma.event.findFirst({
      where: {
        id: eventId,
        userId,
      },
    });

    if (!event) {
      return new NextResponse("Evento no encontrado", { status: 404 });
    }

    return NextResponse.json(event);
  } catch (error) {
    console.error("[GET_EVENT_ERROR]", error);
    return new NextResponse("Error interno", { status: 500 });
  }
}

/**
 * PATCH: Actualiza un evento específico
 */
export async function PATCH(
  req: Request,
  { params }: { params: { eventId: string } }
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("No autorizado", { status: 401 });
    }

    const { eventId } = params;
    if (!eventId) {
      return new NextResponse("Se requiere eventId", { status: 400 });
    }

    const body = await req.json();
    const { title, start, endDate, description, allDay, timeFormat } = body;

    const updatedEvent = await prisma.event.updateMany({
      where: {
        id: eventId,
        userId,
      },
      data: {
        title,
        start: start ? new Date(start) : undefined,
        endDate: endDate ? new Date(endDate) : undefined,
        description,
        allDay,
        timeFormat,
      },
    });

    if (!updatedEvent.count) {
      return new NextResponse("Evento no encontrado", { status: 404 });
    }

    return NextResponse.json({ message: "Evento actualizado correctamente" });
  } catch (error) {
    console.error("[PATCH_EVENT_ERROR]", error);
    return new NextResponse("Error interno", { status: 500 });
  }
}

/**
 * DELETE: Elimina un evento específico
 */
export async function DELETE(
  _req: Request,
  { params }: { params: { eventId: string } }
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("No autorizado", { status: 401 });
    }

    const { eventId } = params;
    if (!eventId) {
      return new NextResponse("Se requiere eventId", { status: 400 });
    }

    const deletedEvent = await prisma.event.deleteMany({
      where: {
        id: eventId,
        userId,
      },
    });

    if (!deletedEvent.count) {
      return new NextResponse("Evento no encontrado", { status: 404 });
    }

    return NextResponse.json({ message: "Evento eliminado correctamente" });
  } catch (error) {
    console.error("[DELETE_EVENT_ERROR]", error);
    return new NextResponse("Error interno", { status: 500 });
  }
}