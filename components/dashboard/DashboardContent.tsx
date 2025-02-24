// components/layout/DashboardContent.tsx (Componente Cliente)
// Este componente se encarga de renderizar el contenido interactivo del dashboard. Cambios en el navbar de dashboard importar
"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar/Navbar";
import Sidebar from "@/components/Sidebar/Sidebar";

export default function DashboardContent({
  children,
}: {
  children: React.ReactNode;
}) {
  // State to control mobile sidebar visibility
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen">
      {/* Sidebar handles its own responsive rendering */}
      <Sidebar
        isMobileOpen={isMobileSidebarOpen}
        setMobileOpen={setMobileSidebarOpen}
      />

      {/* Main content: on xl, add left margin to account for fixed sidebar */}
      <div className="flex-1 flex flex-col overflow-hidden xl:ml-64">
        <Navbar onToggleSidebar={() => setMobileSidebarOpen((prev) => !prev)} />
          {/* bg de dashboard */}
        <main className="flex-1 overflow-auto p-6 bg-slate dark:bg-secondary">
          {children}
        </main>
      </div>
    </div>
  );
}
