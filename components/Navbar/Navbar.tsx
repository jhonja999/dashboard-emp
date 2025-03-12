"use client";

import * as React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Para navegar a rutas Next.js
import { Menu, Search } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Button } from "@/components/ui/button";

interface NavbarProps {
  onToggleSidebar: () => void;
}

/**
 * Navbar con:
 * - Botón hamburguesa (para mobile) que invoca onToggleSidebar
 * - Campo de búsqueda con dropdown de rutas
 * - Cambio de tema
 * - Autenticación (UserButton)
 */
export default function Navbar({ onToggleSidebar }: NavbarProps) {
  const router = useRouter();

  // Estado para controlar el texto de búsqueda
  const [searchTerm, setSearchTerm] = useState("");

  // Rutas “ficticias” para demo (puedes ajustarlas según tu app)
  const possibleRoutes = [
    { label: "Home", href: "/" },
    { label: "Dashboard, Inicio", href: "/dashboard" },
    { label: "Companies, Compañias, Contacto, Empleado", href: "/companies" },
    { label: "Calendar, Evento, Reunión", href: "/tasks" },
    { label: "Analytics, Métricas, Metricas", href: "/analytics" },
    { label: "Gráfico, Grafico, usuarios, cantidad", href: "/analytics" },
    { label: "Faqs, Preguntas", href: "/faqs" },
    
  ];

  // Filtra rutas según el texto de búsqueda
  const filteredRoutes = searchTerm.length
    ? possibleRoutes.filter((route) =>
        route.label.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <nav className="flex items-center px-4 gap-x-4 md:px-6 justify-between w-full bg-background border-b h-20 relative">
      {/* Botón de hamburguesa para dispositivos móviles */}
      <div className="block xl:hidden">
        <Button variant="outline" onClick={onToggleSidebar}>
          <Menu className="w-6 h-6" />
        </Button>
      </div>

      {/* Contenedor de la búsqueda (visible en md en adelante) */}
      <div className="relative w-[380px] hidden md:block">
        <Input
          placeholder="Qué necesitas ver..."
          className="rounded-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search strokeWidth={1} className="absolute top-2 right-2 text-muted-foreground" />

        {/* Dropdown de sugerencias si hay texto y coincidencias */}
        {searchTerm.length > 0 && filteredRoutes.length > 0 && (
          <div
            className="absolute z-10 mt-1 w-full bg-popover border border-border 
                       rounded-md shadow-lg text-foreground"
          >
            {filteredRoutes.map((route) => (
              <button
                key={route.href}
                onClick={() => {
                  // Navegamos a la ruta y limpiamos búsqueda
                  router.push(route.href);
                  setSearchTerm("");
                }}
                className="w-full text-left px-3 py-2 hover:bg-accent hover:text-accent-foreground 
                           transition-colors rounded-md"
              >
                {route.label}
              </button>
            ))}
          </div>
        )}

        {/* Si no hay coincidencias, opcionalmente podemos mostrar un “No results” */}
        {searchTerm.length > 0 && filteredRoutes.length === 0 && (
          <div
            className="absolute z-10 mt-1 w-full bg-popover border border-border 
                       rounded-md shadow-lg text-foreground px-3 py-2"
          >
            No results
          </div>
        )}
      </div>

      {/* Sección para cambio de tema y botón de usuario */}
      <div className="flex gap-x-2 items-center">
        <ThemeToggle />
        <UserButton />
      </div>
    </nav>
  );
}
