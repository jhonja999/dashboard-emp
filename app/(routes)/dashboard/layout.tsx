/**
 * Archivo: layout.tsx
 * Ruta: // app/(routes)/dashboard/layout.tsx
 * Uso: Componente de layout del dashboard (Server Component) que verifica la autenticación del usuario.
 * Se utiliza Clerk para la autenticación y redirige a los usuarios no autenticados a la página de inicio de sesión.
 */

import { auth } from "@clerk/nextjs/server"; // Importa la función auth de Clerk para manejar la autenticación en el servidor
import { redirect } from "next/navigation"; // Importa redirect para redirigir a los usuarios no autenticados
import DashboardContent from "@/components/dashboard/DashboardContent"; // Importa el componente DashboardContent que envuelve el contenido interactivo (cliente)

// Componente DashboardLayout (Server Component)
// Este componente se ejecuta en el servidor y se encarga de verificar la autenticación del usuario.
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode; // Componentes hijos que se renderizarán dentro del dashboard
}) {
  // Llama a auth() para obtener el identificador del usuario autenticado.
  const { userId } = await auth();

  // Si no hay un usuario autenticado, redirige a la página de inicio de sesión.
  if (!userId) {
    redirect("/sign-in");
  }

  // Si el usuario está autenticado, renderiza el contenido del dashboard.
  // DashboardContent se encarga de la parte interactiva y del estado en el cliente.
  return <DashboardContent>{children}</DashboardContent>;
}
