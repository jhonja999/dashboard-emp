/**
 * Archivo: ListCompanies.tsx
 * Uso: Página del dashboard que lista las compañías asociadas al usuario autenticado.
 * Se utiliza Prisma para obtener los datos de las compañías y Clerk para la autenticación.
 */

import { prisma } from "@/lib/prisma"; // Importa Prisma para interactuar con la base de datos
import { auth } from "@clerk/nextjs/server"; // Importa la función auth de Clerk para manejar la autenticación en el servidor
import { redirect } from "next/navigation"; // Importa redirect para redirigir a los usuarios no autenticados
import { columns } from "./columns"; // Importa la configuración de columnas para la tabla de datos
import { DataTable } from "./data-table"; // Importa el componente DataTable para mostrar los datos en formato de tabla

// Componente ListCompanies: Obtiene y renderiza la lista de compañías del usuario autenticado en el dashboard.
export default async function ListCompanies() {
    // Obtiene el identificador del usuario autenticado
    const { userId } = await auth();
  
    // Si el usuario no está autenticado, redirige a la página principal
    if (!userId) {
      return redirect("/");
    }
  
    // Obtiene las compañías asociadas al usuario actual, ordenadas de forma descendente por fecha de creación
    const companies = await prisma.company.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  
    return (
      <div className="p-6">
        {/* Renderiza la tabla de datos con las columnas y la información de las compañías */}
        <DataTable columns={columns} data={companies}  />
      </div>
    );
}
