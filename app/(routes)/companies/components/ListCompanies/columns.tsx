/**
 * Archivo: columns.tsx
 * Uso: Define las columnas para la tabla de compañías, incluyendo la imagen de perfil, nombre, email, teléfono, país, sitio web y acciones.
 */

"use client";

import { ArrowUpDown, MoreHorizontal, Pencil } from "lucide-react"; // Importa íconos de lucide-react para uso en la tabla
import { ColumnDef } from "@tanstack/react-table"; // Importa el tipo ColumnDef de react-table para definir columnas
import { Button } from "@/components/ui/button"; // Importa el componente Button para botones de acción y ordenamiento
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"; // Importa componentes de menú desplegable para las acciones
import Link from "next/link"; // Importa Link para navegación entre rutas
import Image from "next/image"; // Importa Image para optimización de imágenes

// Definimos la interfaz Company para tipar los datos de la compañía
interface Company {
  userId: string;
  name: string;
  id: string;
  country: string;
  website: string | null;
  phone: string | null;
  dni: string | null;
  createdAt: Date;
  updatedAt: Date;
  imageUrl: string | null;
}

// Definimos las columnas de la tabla para la gestión de compañías
export const columns: ColumnDef<Company>[] = [
  
  {
    id: "actions",
    header: "Detalle",
    cell: ({ row }) => {
      const { id } = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost">
              <MoreHorizontal className="w-5 h-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem asChild>
              <Link href={`/companies/${id}`}>
                <Pencil className="w-4 h-4 mr-2" />
                Ver Contacto y Editar
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
  {
    accessorKey: "imageUrl",
    header: "Profile Image",
    cell: ({ row }) => {
      const imageUrl = row.getValue("imageUrl") as string | null;
      return (
        <div className="flex items-center justify-center">
          {imageUrl ? (
            <Image
              src={imageUrl} // Muestra la imagen de perfil de la compañía si está disponible
              alt="Company Profile"
              width={40}
              height={40}
              className="rounded-full"
            />
          ) : (
            <Image
              src="/placeholder.webp" // Muestra una imagen por defecto si no se dispone de imagen de perfil
              alt="Default Profile"
              width={40}
              height={40}
              className="rounded-full"
            />
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        variant="ghost"
      >
        Company Name
        <ArrowUpDown className="w-4 h-4 ml-2" />
      </Button>
    ),
  },
  {
    accessorKey: "dni",
    header: "Email",
    cell: ({ row }) => {
      const email = row.getValue("dni") as string | null;
      return email ? (
        <a href={`mailto:${email}`} className="text-blue-500 underline">
          {email}
        </a>
      ) : (
        <span className="text-gray-400">No disponible</span>
      );
    },
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => {
      const phone = row.getValue("phone") as string | null;
      return phone ? (
        <span>{phone}</span>
      ) : (
        <span className="text-gray-400">No disponible</span>
      );
    },
  },
  {
    accessorKey: "country",
    header: ({ column }) => (
      <Button
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        variant="ghost"
      >
        Country
        <ArrowUpDown className="w-4 h-4 ml-2" />
      </Button>
    ),
  },
  {
    accessorKey: "website",
    header: "Website",
    cell: ({ row }) => {
      const website = row.getValue("website") as string | null;
      return website ? (
        <a
          href={website}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          {website}
        </a>
      ) : (
        <span className="text-gray-400">No disponible</span>
      );
    },
  },
];
