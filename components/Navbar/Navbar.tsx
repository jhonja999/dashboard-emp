"use client";

import * as React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Para navegar a rutas Next.js
import { Menu, Search } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Button } from "@/components/ui/button";

/**
 * Props para el componente Navbar
 */
interface NavbarProps {
  onToggleSidebar: () => void; // Función que alterna la barra lateral en modo móvil
}

/**
 * Componente Navbar
 * - Botón hamburguesa (para dispositivos móviles)
 * - Campo de búsqueda con un dropdown de sugerencias
 * - Cambio de tema (ThemeToggle)
 * - Autenticación (UserButton)
 */
export default function Navbar({ onToggleSidebar }: NavbarProps) {
  const router = useRouter();

  // Estado local para el texto de búsqueda
  const [searchTerm, setSearchTerm] = useState("");

  // Rutas principales con palabras clave
  const possibleRoutes = [
    { label: "Home", href: "/" },
    { label: "Dashboard, Inicio", href: "/dashboard" },
    { label: "Companies, Compañias, Contacto, Empleado", href: "/companies" },
    { label: "Calendar, Evento, Reunión", href: "/tasks" },
    { label: "Analytics, Métricas, Metricas, Gráfico, Grafico, usuarios, cantidad", href: "/analytics" },
    { label: "Faqs, Preguntas", href: "/faqs" },
    // Rutas extras de ejemplo
    { label: "Perfil, Profile, Usuario", href: "/profile" },
    { label: "Configuración, Settings", href: "/settings" },
  ];

  /**
   * Función de filtrado de rutas:
   * - Convierte label y searchTerm a minúsculas
   * - Muestra la ruta si el searchTerm está incluido en el label
   */
  const filteredRoutes = searchTerm
    ? possibleRoutes.filter((route) =>
        route.label.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  /**
   * Detección de si el usuario ha ingresado un ID de compañía
   * (p.e. cm85u3qpk000mvktwncavtvz6).
   * Si se detecta un patrón con `searchTerm.length > 10`, por ejemplo,
   * podemos sugerir `/companies/${searchTerm}` como ruta.
   *
   * Esto es solo un ejemplo. Podrías usar una expresión regular
   * o validaciones más específicas si lo deseas.
   */
  const isCompanyId = searchTerm.match(/^[a-zA-Z0-9]{12,}$/); // Patrón simplificado
  const companyIdRoute = isCompanyId
    ? [{ label: `Ir a Compañía ID: ${searchTerm}`, href: `/companies/${searchTerm}` }]
    : [];

  // Combina las rutas filtradas con la posible ruta de ID
  const finalSuggestions = [...filteredRoutes, ...companyIdRoute];

  return (
    <nav className="flex items-center px-4 gap-x-4 md:px-6 justify-between w-full bg-background border-b h-20 relative">
      {/* Botón hamburguesa (solo se ve en pantallas pequeñas) */}
      <div className="block xl:hidden">
        <Button variant="outline" onClick={onToggleSidebar}>
          <Menu className="w-6 h-6" />
        </Button>
      </div>

      {/* Barra de búsqueda (visible en md en adelante) */}
      <div className="relative w-[380px] hidden md:block">
        <Input
          placeholder="Buscar rutas, palabras clave o ID"
          className="rounded-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {/* Icono de búsqueda */}
        <Search strokeWidth={1} className="absolute top-2 right-2 text-muted-foreground" />

        {/* Dropdown de sugerencias */}
        {searchTerm && (
          <div className="absolute z-10 mt-1 w-full bg-popover border border-border rounded-md shadow-lg text-foreground">
            {finalSuggestions.length > 0 ? (
              finalSuggestions.map((route) => (
                <button
                  key={route.href}
                  onClick={() => {
                    router.push(route.href);
                    setSearchTerm("");
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-accent hover:text-accent-foreground transition-colors rounded-md"
                >
                  {route.label}
                </button>
              ))
            ) : (
              <div className="px-3 py-2 text-sm text-muted-foreground">No results</div>
            )}
          </div>
        )}
      </div>

      {/* Sección derecha: cambio de tema y botón de usuario */}
      <div className="flex gap-x-2 items-center">
        <ThemeToggle />
        <UserButton />
      </div>
    </nav>
  );
}
