"use client";

import React, { useState, useEffect } from "react";
import {
  ColumnDef,
  SortingState,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
  ColumnFiltersState,
  flexRender,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, MoreHorizontal, Pencil } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Definimos la interfaz Company
export interface Company {
  id: string;
  userId: string;
  name: string;
  country: string;
  website: string | null; // Permitir null
  phone: string | null; // Permitir null
  dni: string | null; // Permitir null
  createdAt: Date;
  updatedAt: Date;
  imageUrl: string | null; // Permitir null
}

// Definimos las columnas de la tabla
export const columns: ColumnDef<Company>[] = [
  {
    accessorKey: "imageUrl",
    header: "Profile Image",
    cell: ({ row }) => {
      const imageUrl = row.getValue("imageUrl") as string | null;
      return (
        <div className="flex items-center justify-center">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt="Company Profile"
              width={40}
              height={40}
              className="rounded-full"
            />
          ) : (
            <Image
              src="/images/company-icon.png"
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
    accessorKey: "country",
    header: "Country",
  },
  {
    accessorKey: "phone",
    header: "Phone",
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
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const { id } = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost">
              <MoreHorizontal className="w-5 h-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link href={`/company/${id}`}>
                <Pencil className="w-4 h-4 mr-2" />
                Edit
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

// Props del DataTable
interface DataTableProps<TData> {
  columns: ColumnDef<TData>[];
  data: TData[];
}

// Componente DataTable
export function DataTable<TData>({ columns, data }: DataTableProps<TData>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [filterValue, setFilterValue] = useState("");

  // Configuración de la tabla
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    state: {
      sorting,
      columnFilters,
      globalFilter: filterValue,
    },
  });

  // Actualizar filtro global cuando cambia filterValue
  useEffect(() => {
    table.setGlobalFilter(filterValue);
  }, [filterValue, table]);

  return (
    <div className="rounded-lg border bg-white shadow-sm p-4">
      {/* Filtro de búsqueda */}
      <div className="flex items-center gap-4 mb-4">
        <Input
          placeholder="Buscar..."
          value={filterValue}
          onChange={(event) => setFilterValue(event.target.value)}
          className="w-full max-w-sm"
        />
        <Button onClick={() => setFilterValue("")} variant="outline">
          Limpiar
        </Button>
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center">
                  No hay datos disponibles.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Paginación */}
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Siguiente
          </Button>
        </div>
        <div className="text-sm text-gray-500">
          Página {table.getState().pagination.pageIndex + 1} de{" "}
          {table.getPageCount()}
        </div>
      </div>
    </div>
  );
}