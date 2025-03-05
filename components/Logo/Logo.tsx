/**
 * Archivo: Logo.tsx
 * Uso: Componente que muestra el logo de la aplicación y redirige a la página principal al hacer clic.
 */

"use client";

import Image from "next/image"; // Importa el componente Image de Next.js para optimizar imágenes
import { useRouter } from "next/navigation"; // Importa useRouter para manejar la navegación en Next.js
import { cn } from "@/lib/utils"; // Importa la función cn para combinar clases CSS

// Define las propiedades que puede recibir el componente Logo
interface LogoProps {
  className?: string; // Clase CSS adicional para personalizar estilos
}

// Componente Logo: Renderiza el logo de la aplicación y permite la navegación a la página principal al hacer clic.
export function Logo({ className }: LogoProps) {
  const router = useRouter(); // Obtiene la función de navegación de Next.js

  return (
    <div
      className={cn(
        "min-h-20 h-20 flex items-center px-6 cursor-pointer gap-2", // Clases base para el contenedor del logo
        className // Clases adicionales personalizadas
      )}
      onClick={() => router.push("/")} // Redirige a la página principal al hacer clic
    >
      <Image
        src="/logo.svg" // Ruta de la imagen del logo
        alt="NINAGOLD Logo" // Texto alternativo para la imagen
        width={30} // Ancho de la imagen
        height={30} // Alto de la imagen
        priority // Indica a Next.js que cargue esta imagen con prioridad
      />
      <h1 className="text-xl font-bold text-[#d4af37] ml-2">NINAGOLD</h1> {/* Título del logo */}
    </div>
  );
}
