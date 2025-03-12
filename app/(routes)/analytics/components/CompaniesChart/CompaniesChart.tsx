"use client";

import React, { useMemo } from "react";
import { useTheme } from "next-themes";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

import type { CompaniesChartProps, ChartDataItem, CustomTooltipProps } from "./CompaniesChart.types";

/**
 * CompaniesChart
 * - Gráfico de doble barra que muestra:
 *   - Eventos por compañía
 *   - Empleados/Contactos por compañía
 * - Cambia colores según modo claro/oscuro.
 */
export function CompaniesChart({ companies, events }: CompaniesChartProps) {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  // Definimos colores según modo
  const colorEvents = isDarkMode ? "#f97316" : "#3b82f6"; // Naranja (oscuro) vs Azul (claro)
  const colorEmps   = isDarkMode ? "#a855f7" : "#10b981"; // Morado (oscuro) vs Verde (claro)

  // Preparar datos para Recharts
  const data: ChartDataItem[] = useMemo(() => {
    return companies.map((company) => {
      // Contar eventos de la compañía
      const eventCount = events.filter((ev) => ev.companyId === company.id).length;
      // Contar contactos (si la relación Contact existe)
      const empCount = company.Contact ? company.Contact.length : 0;

      return {
        name: company.name,
        eventCount,
        empCount,
      };
    });
  }, [companies, events]);

  // Tooltip personalizado sin `any`
  function CustomTooltip({ active, payload }: CustomTooltipProps) {
    if (!active || !payload || payload.length === 0) return null;
    const { eventCount, empCount, name } = payload[0].payload;

    return (
      <div
        className="rounded-md p-2 shadow bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700"
        style={{ pointerEvents: "auto" }}
      >
        <p className="font-bold text-sm mb-1">{name}</p>
        <p className="text-xs">Eventos: {eventCount}</p>
        <p className="text-xs">Empleados: {empCount}</p>
      </div>
    );
  }

  return (
    <div className="w-full h-[400px] my-4">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 16, right: 20, bottom: 24, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend />

          {/* Barra de eventos */}
          <Bar
            dataKey="eventCount"
            name="Eventos"
            fill={colorEvents}
            radius={[6, 6, 0, 0]}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-event-${index}`} fillOpacity={0.8} />
            ))}
          </Bar>

          {/* Barra de empleados */}
          <Bar
            dataKey="empCount"
            name="Empleados"
            fill={colorEmps}
            radius={[6, 6, 0, 0]}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-emp-${index}`} fillOpacity={0.8} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

/* "use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CompaniesChartProps } from "./CompaniesChart.types";

export function CompaniesChart(props: CompaniesChartProps) {
  const { companies, events } = props;

  const dataChart = companies.map(company => ({
    name: company.name.length > 10 ? company.name.slice(0, 10) + '...' : company.name,
    EventosPorCompany: events.filter(event => event.companyId === company.id).length
  }));

  return (
    <div className="h-[550px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart width={500} height={300} data={dataChart}>
          <CartesianGrid strokeDasharray="2 2" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="EventosPorCompany" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
} */