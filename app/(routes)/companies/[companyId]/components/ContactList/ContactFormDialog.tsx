/**
 * Archivo: app/(routes)/companies/[companyId]/components/ContactFormDialog/ContactFormDialog.tsx
 * Uso: Componente cliente que muestra un diálogo (modal) para crear o editar un contacto de una compañía.
 *      Utiliza el formulario ContactForm para gestionar la creación/edición de contactos.
 */

"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"; // Componentes de diálogo para mostrar el modal
import { ContactForm } from "../ContactForm/ContactForm"; // Formulario para crear o editar un contacto
import type { Contact } from "@prisma/client"; // Tipo de contacto de Prisma

// Define las propiedades que recibe el componente ContactFormDialog
interface ContactFormDialogProps {
  open: boolean; // Controla si el diálogo está abierto o cerrado
  onOpenChange: (open: boolean) => void; // Función para actualizar el estado de apertura del diálogo
  companyId: string; // ID de la compañía a la que pertenece el contacto
  contact: Contact | null; // Contacto existente (para editar) o null (para crear uno nuevo)
  onSuccess: () => void; // Callback que se ejecuta al crear o actualizar exitosamente el contacto
}

// Componente ContactFormDialog: Muestra un modal con el formulario para crear o editar un contacto.
export function ContactFormDialog({
  open,
  onOpenChange,
  companyId,
  contact,
  onSuccess,
}: ContactFormDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{contact ? "Editar Contacto" : "Agregar Nuevo Contacto"}</DialogTitle>
          <DialogDescription>
            {contact
              ? "Actualiza los datos del contacto"
              : "Ingresa los datos del nuevo contacto"}
          </DialogDescription>
        </DialogHeader>
        {/* Se utiliza el componente ContactForm para manejar la creación o edición de contactos */}
        <ContactForm
          initialData={contact || undefined}
          companyId={companyId}
          onSuccess={onSuccess}
          isDialog
        />
      </DialogContent>
    </Dialog>
  );
}
