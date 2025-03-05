/**
 * Archivo: Navbar.tsx
 * Ruta: // components/Navbar/Navbar.tsx
 * Uso: Componente de la barra de navegación que incluye botones para alternar la barra lateral, búsqueda, cambio de tema y autenticación de usuario.
 */

"use client";

import * as React from "react"; // Importa React para la creación del componente
import { Menu, Search } from "lucide-react"; // Importa iconos para el menú y búsqueda
import { UserButton } from "@clerk/nextjs"; // Importa el botón de usuario para la autenticación con Clerk
import { Input } from "@/components/ui/input"; // Importa el componente de entrada para la búsqueda
import { ThemeToggle } from "@/components/ui/theme-toggle"; // Importa el componente para cambiar el tema
import { Button } from "@/components/ui/button"; // Importa el componente de botón

// Define las propiedades que recibe el componente Navbar
interface NavbarProps {
  onToggleSidebar: () => void; // Función para alternar la visibilidad de la barra lateral
}

// Componente Navbar: Renderiza la barra de navegación con funcionalidades de búsqueda, cambio de tema y autenticación de usuario.
export default function Navbar({ onToggleSidebar }: NavbarProps) {
  return (
    <nav className="flex items-center px-4 gap-x-4 md:px-6 justify-between w-full bg-background border-b h-20">
      {/* Botón de hamburguesa para dispositivos móviles */}
      <div className="block xl:hidden">
        <Button variant="outline" onClick={onToggleSidebar}>
          <Menu className="w-6 h-6" /> {/* Icono de menú */}
        </Button>
      </div>

      {/* Campo de búsqueda (visible en dispositivos medianos en adelante) */}
      <div className="relative w-[380px] hidden md:block">
        <Input placeholder="Search ..." className="rounded-lg" /> {/* Input para búsqueda */}
        <Search strokeWidth={1} className="absolute top-2 right-2" /> {/* Icono de búsqueda posicionado en el input */}
      </div>

      {/* Sección para cambio de tema y botón de usuario */}
      <div className="flex gap-x-2 items-center">
        <ThemeToggle /> {/* Botón para alternar el tema (oscuro/claro) */}
        <UserButton /> {/* Botón de usuario para autenticación y perfil */}
      </div>
    </nav>
  );
}
