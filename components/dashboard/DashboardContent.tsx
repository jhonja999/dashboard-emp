/**
 * Archivo: DashboardContent.tsx
 * Uso: Componente cliente encargado de renderizar el contenido interactivo del dashboard, incluyendo el navbar y la sidebar.
 * Nota: Cambios en el navbar de dashboard importar.
 */

"use client";

import { useState } from "react"; // Importa useState para manejar el estado del componente
import Navbar from "@/components/Navbar/Navbar"; // Importa el componente Navbar
import Sidebar from "@/components/Sidebar/Sidebar"; // Importa el componente Sidebar

// Componente DashboardContent: Renderiza la estructura principal del dashboard con Sidebar y Navbar.
export default function DashboardContent({
  children,
}: {
  children: React.ReactNode; // Los componentes hijos que se renderizan dentro del dashboard
}) {
  // Estado para controlar la visibilidad de la sidebar en dispositivos móviles
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen">
      {/* Sidebar maneja su propio renderizado responsivo */}
      <Sidebar
        isMobileOpen={isMobileSidebarOpen}
        setMobileOpen={setMobileSidebarOpen}
      />

      {/* Contenido principal: en pantallas XL, se añade margen a la izquierda para la sidebar fija */}
      <div className="flex-1 flex flex-col overflow-hidden xl:ml-64">
        <Navbar onToggleSidebar={() => setMobileSidebarOpen((prev) => !prev)} />
        {/* Fondo de dashboard */}
        <main className="flex-1 overflow-auto p-6 bg-slate dark:bg-secondary">
          {children}
        </main>
      </div>
    </div>
  );
}
