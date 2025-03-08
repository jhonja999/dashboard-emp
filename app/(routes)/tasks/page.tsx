/**
 * Archivo: app/(routes)/tasks/page.tsx
 * Uso: Página que lista las tareas/eventos y muestra el calendario.
 */

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import DashboardContent from "@/components/dashboard/DashboardContent";
import { Calendar } from "./components/Calendar";

export default async function TasksPage() {
  // Verifica usuario autenticado con Clerk
  const { userId } = await auth();
  if (!userId) {
    return redirect("/"); // O a "/sign-in" si prefieres
  }

  // Obtiene compañías asociadas a este usuario
  const companies = await prisma.company.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });

  // Obtiene eventos (tareas) para el calendario
  const events = await prisma.event.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <DashboardContent>
      <Calendar companies={companies} events={events} />
    </DashboardContent>
  );
}
