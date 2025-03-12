"use client";

import React, { useMemo, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from "recharts";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Search, Calendar, Users, XCircle, ChartColumnIncreasing } from "lucide-react";
import { toast } from "sonner";

// Tipado mejorado para Company
interface Company {
  id: string;
  name: string;
  Contact: { id: string }[]; // Elimina el uso de any
}

interface Event {
  id: string;
  companyId: string;
}

interface CompaniesChartProps {
  companies: Company[];
  events: Event[];
}

export function CompaniesChart({ companies, events }: CompaniesChartProps) {
  const router = useRouter();
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  const colorEvents = isDarkMode ? "#f97316" : "#3b82f6";
  const colorEmps = isDarkMode ? "#a855f7" : "#10b981";

  const [searchTerm, setSearchTerm] = useState("");

  const chartData = useMemo(() => {
    return companies
      .filter((c) =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .map((company) => ({
        id: company.id,
        name: company.name,
        eventCount: events.filter((ev) => ev.companyId === company.id).length,
        empCount: company.Contact?.length ?? 0 // Tipado correcto
      }));
  }, [companies, events, searchTerm]);

  const CustomTooltip = ({
    active,
    payload
  }: {
    active?: boolean;
    payload?: Array<{
      value: number;
      name: string;
      color: string;
      payload: { name: string; eventCount: number; empCount: number };
    }>;
  }) => {
    if (!active || !payload || payload.length === 0) return null;
    const { name, eventCount, empCount } = payload[0].payload;

    const bg = isDarkMode ? "bg-[#1f2937]" : "bg-white";
    const text = isDarkMode ? "text-gray-200" : "text-gray-800";
    const border = isDarkMode ? "border-gray-600" : "border-gray-300";

    return (
      <motion.div
        className={`rounded-md p-3 shadow-lg border ${bg} ${text} ${border} space-y-2 text-sm`}
        initial={{ opacity: 0, y: 8, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.2 }}
      >
        <p className="font-bold text-base">{name}</p>
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5" style={{ color: colorEvents }} />
          <span className="font-medium">Eventos:</span>
          <span className="text-lg">{eventCount}</span>
        </div>
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5" style={{ color: colorEmps }} />
          <span className="font-medium">Empleados:</span>
          <span className="text-lg">{empCount}</span>
        </div>
      </motion.div>
    );
  };

  const handleBarClick = (data: { id: string; name: string }) => {
    const toastId = toast(
      <div className="flex flex-col items-start space-y-3 p-4">
        <p className="text-base font-semibold">
          ¿Ver detalles de <span className="text-blue-500">{data.name}</span>?
        </p>
        <div className="flex space-x-3">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            onClick={() => {
              router.push(`/companies/${data.id}`);
              toast.dismiss(toastId);
            }}
          >
            Confirmar
          </button>
          <button
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
            onClick={() => toast.dismiss(toastId)}
          >
            Cancelar
          </button>
        </div>
      </div>,
      {
        position: "top-center",
        duration: 6000,
        icon: <ChartColumnIncreasing className="h-6 w-6 text-blue-500" />,
        style: {
          backgroundColor: isDarkMode ? "#1f2937" : "white",
          color: isDarkMode ? "white" : "black",
          border: isDarkMode ? "1px solid #374151" : "1px solid #e5e7eb",
          width: "320px"
        }
      }
    );
  };

  return (
    <div className="w-full space-y-7">
      {/* Título y descripción mejorada */}
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">
          Comparativa de <span className="text-blue-500">Eventos</span> y{" "}
          <span className="text-purple-500">Empleados</span> por Compañía
        </h2>
        <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400">
          Analiza métricas clave:{" "}
          <strong className="font-semibold text-blue-500">eventos realizados</strong> y{" "}
          <strong className="font-semibold text-purple-500">empleados registrados</strong>.{" "}
          <br className="hidden sm:inline" />
          Haz clic en cualquier barra para ver detalles completos.
        </p>
      </div>

      {/* Búsqueda responsiva */}
      <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar compañía..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-3 py-2 rounded-md border border-gray-300 
                       focus:outline-none focus:border-blue-400 dark:bg-[#1c1c1c]
                       dark:border-gray-600 dark:focus:border-blue-500 
                       transition-colors text-sm sm:text-base"
          />
        </div>
        {searchTerm && (
          <button
            onClick={() => setSearchTerm("")}
            className="flex items-center gap-1 text-red-600 hover:text-red-800 
                       transition-colors mt-2 sm:mt-0"
          >
            <XCircle className="h-5 w-5" />
            <span className="font-medium text-sm sm:text-base">Limpiar búsqueda</span>
          </button>
        )}
      </div>

      {/* Gráfico responsivo */}
      <div className="h-[450px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 30, right: 20, left: 10, bottom: 20 }}
            barCategoryGap={24}
          >
            <CartesianGrid strokeDasharray="4 4" className="opacity-30" />
            <XAxis 
              dataKey="name" 
              angle={-45} 
              textAnchor="end" 
              height={60} 
              tickMargin={16}
              tickFormatter={(value) => value.slice(0, 12) + (value.length > 12 ? "..." : "")}
            />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              verticalAlign="top" 
              wrapperStyle={{ paddingTop: "20px" }}
            />

            {/* Barra de Eventos */}
            <Bar
              dataKey="eventCount"
              name="Eventos"
              fill={colorEvents}
              radius={[6, 6, 0, 0]}
              barSize={24}
              onClick={(barData) => handleBarClick(barData)}
            >
              {chartData.map((entry) => (
                <Cell key={`evt-${entry.id}`} cursor="pointer" />
              ))}
            </Bar>

            {/* Barra de Empleados */}
            <Bar
              dataKey="empCount"
              name="Empleados"
              fill={colorEmps}
              radius={[6, 6, 0, 0]}
              barSize={24}
              onClick={(barData) => handleBarClick(barData)}
            >
              {chartData.map((entry) => (
                <Cell key={`emp-${entry.id}`} cursor="pointer" />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
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