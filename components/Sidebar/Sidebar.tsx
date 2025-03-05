/**
 * Archivo: Sidebar.tsx
 * Uso: Componente Sidebar que muestra la barra lateral de navegación tanto para dispositivos móviles como para escritorio.
 * components/Sidebar/Sidebar.tsx
 */

"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion"; // Importa componentes de Framer Motion para animaciones
import SidebarRoutes from "../SidebarRoutes/SidebarRoutes"; // Importa las rutas de la barra lateral
import { Logo } from "../Logo/Logo"; // Importa el componente de logo

// Define las propiedades que recibe el componente Sidebar
interface SidebarProps {
  isMobileOpen: boolean; // Indica si la barra lateral en móvil está abierta
  setMobileOpen: (open: boolean) => void; // Función para actualizar el estado de la barra lateral en móvil
}

// Componente Sidebar: Renderiza la barra lateral para dispositivos móviles y de escritorio, con animaciones para móviles.
export default function Sidebar({ isMobileOpen, setMobileOpen }: SidebarProps) {
  return (
    <>
      {/* Sidebar móvil con animaciones de Framer Motion */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ x: "-100%" }} // Estado inicial fuera de la pantalla a la izquierda
            animate={{ x: 0 }} // Anima la barra lateral hacia la posición visible
            exit={{ x: "-100%" }} // Anima la barra lateral para salir de la pantalla
            transition={{ duration: 0.3, ease: "easeInOut" }} // Configura la duración y la función de easing de la animación
            className="fixed inset-y-0 left-0 z-50 w-64 bg-background shadow-lg xl:hidden" // Estilos para el sidebar móvil
          >
            <div className="h-full flex flex-col border-r">
              <Logo className="border-b" /> {/* Muestra el logo en la parte superior */}
              <SidebarRoutes /> {/* Renderiza las rutas de la barra lateral */}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar de escritorio (siempre visible) */}
      <div className="hidden xl:flex xl:w-64 xl:fixed xl:inset-y-0 xl:left-0 xl:z-40 xl:bg-background xl:shadow-lg">
        <div className="h-full flex flex-col border-r">
          <Logo className="border-b" /> {/* Muestra el logo en la parte superior */}
          <SidebarRoutes /> {/* Renderiza las rutas de la barra lateral */}
        </div>
      </div>

      {/* Overlay para dispositivos móviles - clic para cerrar */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40 xl:hidden" // Estilo del overlay semi-transparente
          onClick={() => setMobileOpen(false)} // Cierra la barra lateral al hacer clic en el overlay
        ></div>
      )}
    </>
  );
}
