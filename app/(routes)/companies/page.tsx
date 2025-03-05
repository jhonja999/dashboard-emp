/**
 * Archivo: CompaniesPage.tsx
 * Uso: Página del dashboard que muestra la cabecera y la lista de compañías.
 * El componente DashboardContent envuelve el contenido interactivo del dashboard.
 */

import DashboardContent from "@/components/dashboard/DashboardContent"; // Importa el componente que provee el layout interactivo del dashboard
import { HeaderCompanies } from "./components/HeaderCompanies/HeaderCompanies"; // Importa la cabecera para la sección de compañías
import ListCompanies from "./components/ListCompanies/ListCompanies"; // Importa la lista de compañías

// Componente CompaniesPage: Renderiza la página de compañías dentro del dashboard
export default function CompaniesPage() {
  return (
    <DashboardContent>
        <HeaderCompanies /> {/* Renderiza la cabecera de la sección de compañías */}
        <ListCompanies />   {/* Renderiza la lista de compañías */}
    </DashboardContent>
  )
}
