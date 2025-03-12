// app/(routes)/analytics/page.tsx

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import DashboardContent from "@/components/dashboard/DashboardContent";
import { CompaniesChart } from "./components/CompaniesChart/CompaniesChart";


export default async function AnalyticsPage() {
  // Verifica usuario autenticado con Clerk
  const { userId } = await auth();
  if (!userId) {
    return redirect("/");
  }

  // Obtiene compañías asociadas a este usuario
  const companies = await prisma.company.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    include: {
      Contact: true,  // <<--- Asegura que vengan los contactos
    },
  });

  // Obtiene eventos (tareas) para el calendario
  const events = await prisma.event.findMany({
    orderBy: { createdAt: "desc" },
  });

  // Escoge la primera compañía, si existe
  const firstCompany = companies;

  // Si no hay compañías, muestra un mensaje
  if (!firstCompany) {
    return (
      <DashboardContent>
        <div className="rounded-lg shadow-md bg-background p-6">
          <h2 className="mb-4 text-2xl">Analytics page</h2>
          <p>No tienes compañías registradas.</p>
        </div>
      </DashboardContent>
    );
  }

  return (
    <div>
      <DashboardContent>
        <div className="rounded-lg shadow-md bg-background p-6">
          <h2 className="mb-4 text-2xl">Analytics page</h2>

          {/* Gráfico de compañías vs eventos */}
          <CompaniesChart companies={companies} events={events}/>
          
        </div>
      </DashboardContent>
    </div>
  );
}
