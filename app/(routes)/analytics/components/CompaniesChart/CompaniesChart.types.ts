import type { Company, Event, Contact } from "@prisma/client";
import type { TooltipProps } from "recharts";

/**
 * CompaniesChartProps
 * - Define las propiedades que recibirá el componente de gráfico.
 * - Incluye las compañías, eventos, e (opcionalmente) la relación de contactos.
 */
export interface CompaniesChartProps {
  companies: Array<
    Company & {
      // Si tu consulta ya incluye la relación con contactos:
      Contact?: Contact[];
    }
  >;
  events: Event[];
}

/**
 * ChartDataItem
 * - Estructura de datos para cada barra en el gráfico.
 */
export interface ChartDataItem {
  name: string;       // Nombre de la compañía
  eventCount: number; // Cantidad de eventos
  empCount: number;   // Cantidad de empleados/contactos
}

/**
 * CustomTooltipProps
 * - Tipado extendido para el Tooltip personalizado de Recharts.
 * - Evita el uso de `any`.
 */
export interface CustomTooltipProps extends TooltipProps<number, string> {
  payload?: Array<{
    payload: ChartDataItem;
    color: string;
  }>;
}
