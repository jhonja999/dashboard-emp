/**
 * Archivo: Dashboard.tsx
 * Uso: Componente cliente que renderiza el dashboard interactivo, permitiendo la personalización del layout mediante drag-and-drop.
 * Se utiliza Swapy para la gestión del posicionamiento de los componentes del dashboard.
 */

"use client";

import { useState, useEffect, useRef } from "react"; // Importa hooks de React para manejar estado, efectos y referencias
import { createSwapy } from "swapy"; // Importa la función para crear una instancia de Swapy
import { RefreshCcw, Lock, Settings } from "lucide-react"; // Importa íconos de lucide-react

// Componentes de ejemplo utilizados en el dashboard
import { CardSummary } from "../components/CardSummary/CardSummary";
import { BookOpenCheck, UsersRound, Waypoints } from "lucide-react";
import { LastCustomers } from "../components/LastCustomers";
import SalesDistributors from "../components/SalesDistributors/SalesDistributors";
import { TotalSuscribers } from "../components/TotalSuscribers/TotalSuscribers";
import ListIntegrations from "../components/ListIntegrations/ListIntegrations";

/* =======================================
   Tipos mínimos para Swapy
   ======================================= */
type SwapySwapEvent = {
  newSlotItemMap: {
    asArray: Array<{ slot: string; item: string }>;
    asObject: Record<string, string>;
    asMap: Map<string, string>;
  };
};

type SwapyInstance = {
  enable: (enabled: boolean) => void;
  destroy: () => void;
  onSwap: (callback: (event: SwapySwapEvent) => void) => void;
};

/* =======================================
   Orden por defecto de los slots
   ======================================= */
// Define el arreglo con el orden predeterminado de los componentes en el dashboard
const defaultArrangement = [
  { slot: "CompaniesCreated", item: "CompaniesCreated" },
  { slot: "TotalRevenue", item: "TotalRevenue" },
  { slot: "BounceRate", item: "BounceRate" },
  { slot: "LastCustomers", item: "LastCustomers" },
  { slot: "SalesDistributors", item: "SalesDistributors" },
  { slot: "TotalSubscribers", item: "TotalSubscribers" },
  { slot: "ListIntegrations", item: "ListIntegrations" },
];

export default function Dashboard() {
  // Estado para activar/desactivar el modo drag-and-drop
  const [isDraggable, setIsDraggable] = useState(false);
  // Referencia para almacenar la instancia de Swapy
  const swapyRef = useRef<SwapyInstance | null>(null);

  /* =======================================
     Función para ubicar ítems en slots
     ======================================= */
  function applyArrangement(arrangement: { slot: string; item: string }[]) {
    arrangement.forEach(({ slot, item }) => {
      const slotEl = document.querySelector<HTMLDivElement>(
        `[data-swapy-slot="${slot}"]`
      );
      const itemEl = document.querySelector<HTMLDivElement>(
        `[data-swapy-item="${item}"]`
      );
      if (slotEl && itemEl) {
        slotEl.appendChild(itemEl); // Mueve el elemento 'item' al slot correspondiente
      }
    });
  }

  /* =======================================
     useEffect para inicializar Swapy y restaurar layout
     ======================================= */
  useEffect(() => {
    const container = document.querySelector<HTMLDivElement>(".card-container");
    if (!container) return;

    // 1. Inicializar Swapy si no existe
    if (!swapyRef.current) {
      swapyRef.current = createSwapy(container, {
        animation: "dynamic",
        enabled: false,
      });

      // 2. Escuchar evento de swap para persistir el nuevo orden
      swapyRef.current.onSwap((event) => {
        const newOrder = event.newSlotItemMap.asArray;
        localStorage.setItem("myDashboardLayout", JSON.stringify(newOrder));
      });
    }

    // 3. Restaurar orden guardado en localStorage
    const savedLayout = localStorage.getItem("myDashboardLayout");
    if (savedLayout) {
      const parsed = JSON.parse(savedLayout) as Array<{
        slot: string;
        item: string;
      }>;
      applyArrangement(parsed);
    } else {
      // Si no hay nada guardado, usar el orden por defecto
      applyArrangement(defaultArrangement);
    }

    // Limpieza: destruir la instancia de Swapy si el componente se desmonta
    return () => {
      if (swapyRef.current) {
        swapyRef.current.destroy();
      }
    };
  }, []);

  /* =======================================
     Activar / desactivar drag-and-drop
     ======================================= */
  useEffect(() => {
    if (swapyRef.current) {
      swapyRef.current.enable(isDraggable);
    }
  }, [isDraggable]);

  /* =======================================
     Función para revertir al orden por defecto
     ======================================= */
  function revertLayout() {
    localStorage.removeItem("myDashboardLayout");
    applyArrangement(defaultArrangement);
  }

  return (
    <div>
      {/* Barra de controles */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Dashboard</h2>
        <div className="flex gap-3">
          {/* Botón para bloquear o personalizar el layout */}
          <button
            onClick={() => setIsDraggable(!isDraggable)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            {isDraggable ? (
              <>
                <Lock className="w-4 h-4" />
                <span>Bloquear Layout</span>
              </>
            ) : (
              <>
                <Settings className="w-4 h-4" />
                <span>Personalizar Layout</span>
              </>
            )}
          </button>

          {/* Botón para revertir al orden por defecto */}
          <button
            onClick={revertLayout}
            className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            <RefreshCcw className="w-4 h-4" />
            <span>Revertir Layout</span>
          </button>
        </div>
      </div>

      {/* Contenedor principal con grid (por defecto 3 filas de ejemplo) */}
      <div className="card-container grid grid-cols-12 gap-4 auto-rows-auto">
        {/* Fila 1: Tres tarjetas en 3 columnas */}
        <div
          data-swapy-slot="CompaniesCreated"
          className="col-span-12 md:col-span-4"
        >
          <div data-swapy-item="CompaniesCreated">
            <CardSummary
              icon={UsersRound}
              total="12.450"
              average={15}
              title="Companies created"
              tooltipText="See all companies"
              isDraggable={isDraggable}
            />
          </div>
        </div>

        <div
          data-swapy-slot="TotalRevenue"
          className="col-span-12 md:col-span-4"
        >
          <div data-swapy-item="TotalRevenue">
            <CardSummary
              icon={Waypoints}
              total="86.5%"
              average={80}
              title="Total Revenue"
              tooltipText="See summary"
              isDraggable={isDraggable}
            />
          </div>
        </div>

        <div data-swapy-slot="BounceRate" className="col-span-12 md:col-span-4">
          <div data-swapy-item="BounceRate">
            <CardSummary
              icon={BookOpenCheck}
              total="363,95$"
              average={30}
              title="Bounce Rate"
              tooltipText="See bounce rate"
              isDraggable={isDraggable}
            />
          </div>
        </div>

        {/* Fila 2: LastCustomers y SalesDistributors en 2 columnas */}
        <div
          data-swapy-slot="LastCustomers"
          className="col-span-12 md:col-span-6"
        >
          <div data-swapy-item="LastCustomers">
            <LastCustomers />
          </div>
        </div>

        <div
          data-swapy-slot="SalesDistributors"
          className="col-span-12 md:col-span-6"
        >
          <div data-swapy-item="SalesDistributors">
            <SalesDistributors />
          </div>
        </div>

        {/* Fila 3: TotalSuscribers y ListIntegrations en 2 columnas */}
        <div
          data-swapy-slot="TotalSubscribers"
          className="col-span-12 md:col-span-6"
        >
          <div data-swapy-item="TotalSubscribers">
            <TotalSuscribers />
          </div>
        </div>

        <div
          data-swapy-slot="ListIntegrations"
          className="col-span-12 md:col-span-6"
        >
          <div data-swapy-item="ListIntegrations">
            <ListIntegrations />
          </div>
        </div>
      </div>
    </div>
  );
}
