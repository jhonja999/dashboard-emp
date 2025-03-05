/**
 * Archivo: HeaderCompanies.tsx
 * Uso: Componente de cabecera para la sección de compañías. Muestra el título y un botón para abrir un modal que permite crear un nuevo cliente.
 * Se verifica la autenticación del usuario antes de mostrar el contenido.
 */

"use client";
import React, { useState } from "react";
import { AlertTriangle, PlusCircle as CirclePlus, User } from "lucide-react"; // Importa íconos de lucide-react para alertas y botones
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"; // Importa componentes del diálogo para el modal
import { DialogTrigger } from "@radix-ui/react-dialog"; // Importa el disparador del diálogo de Radix UI
import { Button } from "@/components/ui/button"; // Importa el componente Button para botones de acción
import { FormCreateCustomer } from "../FormCreateCustomer"; // Importa el formulario para crear un nuevo cliente
import { useAuth } from "@clerk/nextjs"; // Importa useAuth para obtener el estado de autenticación del usuario

export function HeaderCompanies() {
  // Estado para controlar la apertura del modal de creación de cliente
  const [openModalCreate, setOpenModalCreate] = useState(false);
  const { userId } = useAuth(); // Obtiene el ID del usuario autenticado

  // Verificación de autenticación: Si no está autenticado, se muestra un mensaje de error
  if (!userId) {
    return (
      <div className="flex items-center text-red-500 gap-2 p-4 border border-red-300 bg-red-50 rounded-lg">
        <AlertTriangle className="h-6 w-6" />
        <p>No estás autenticado</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-2xl font-bold">List of companies</h2>
      {/* Componente Dialog para abrir el modal de creación de cliente */}
      <Dialog open={openModalCreate} onOpenChange={setOpenModalCreate}>
        <DialogTrigger asChild>
          <Button>
            <CirclePlus className="mr-2 h-4 w-4" />
            Create Company
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>
              <div className="flex items-center gap-3">
                <User className="h-6 w-6 text-blue-500" />
                <span className="text-xl font-semibold">
                  Crear Nuevo Cliente
                </span>
              </div>
            </DialogTitle>
            <DialogDescription>Crea y Configura tu cliente!</DialogDescription>
          </DialogHeader>
          {/* Se pasa la función onSuccess para cerrar el modal cuando se complete la creación */}
          <FormCreateCustomer
            onSuccess={() => {
              setOpenModalCreate(false); // Cierra el modal
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
