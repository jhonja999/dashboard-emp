/**
 * Archivo: app/(routes)/companies/[companyId]/page.tsx
 * Uso: Página que muestra los detalles de una compañía específica junto con sus contactos asociados.
 * Utiliza Clerk para la autenticación del usuario y Prisma para la interacción con la base de datos.
 */

import { prisma } from "@/lib/prisma"; // Importa Prisma para interactuar con la base de datos
import { auth } from "@clerk/nextjs/server"; // Importa Clerk para la autenticación en el servidor
import { redirect } from "next/navigation"; // Importa redirect para redirigir a otras rutas
import DashboardContent from "@/components/dashboard/DashboardContent"; // Componente que provee la estructura del dashboard
import { CompanyPageClient } from "./components/CompanyPageClient"; // Componente cliente que muestra la información de la compañía
// Definición del componente principal para la página de detalles de la compañía
export default async function CompanyIdPage({
  params,
}: {
  params: { companyId: string };
}) {
  // Obtiene el usuario autenticado
  const { userId } = await auth();
  if (!userId) {
    // Si no hay usuario autenticado, redirige a la página de inicio
    return redirect("/");
  }
  // Busca la compañía en la base de datos, incluyendo los contactos asociados
  const company = await prisma.company.findUnique({
    where: { id: params.companyId, userId },
    include: { Contact: true }, // Incluye los contactos relacionados con la compañía
  });
  // Si no se encuentra la compañía, redirige a la lista de compañías
  if (!company) {
    return redirect("/companies");
  }
  // Renderiza el contenido del dashboard y el componente que muestra la información de la compañía
  return (
    <DashboardContent>
      <CompanyPageClient company={company} />
    </DashboardContent>
  );
}
