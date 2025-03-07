/**
 * Archivo: app/(routes)/dashboard/layout.tsx
 * Uso: Layout del dashboard (Server Component) que verifica la autenticación
 * del usuario. Redirige a los usuarios no autenticados a la página de login.
 */

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import DashboardContent from "@/components/dashboard/DashboardContent";

// Componente DashboardLayout (Server Component)
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Verifica si hay un usuario autenticado
  const { userId } = await auth();

  // Si no hay usuario, redirige a la página de inicio de sesión
  if (!userId) {
    redirect("/sign-in");
  }

  // Si el usuario está autenticado, renderiza el contenido del dashboard
  // DashboardContent se encarga de la parte interactiva en el cliente
  return (
    <DashboardContent>
      {children}
    </DashboardContent>
  );
}
