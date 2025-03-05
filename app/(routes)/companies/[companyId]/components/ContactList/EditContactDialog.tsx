/**
 * Archivo: app/(routes)/companies/[companyId]/components/ContactList/EditContactDialog.tsx
 * Uso: Componente cliente que muestra un diálogo (modal) para editar la información de un contacto.
 *      Utiliza react-hook-form y Zod para la validación, y axios para actualizar el contacto en la base de datos.
 */

"use client";

import { useState } from "react";
import { toast } from "sonner"; // Librería para notificaciones
import axios from "axios"; // Librería para solicitudes HTTP
import * as z from "zod"; // Zod para validaciones
import { useForm } from "react-hook-form"; // Manejo de formularios en React
import { zodResolver } from "@hookform/resolvers/zod"; // Adaptador para usar Zod con react-hook-form

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"; // Componentes para crear un modal (diálogo)
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"; // Componentes de formulario
import { Input } from "@/components/ui/input"; // Componente de entrada de texto
import { Button } from "@/components/ui/button"; // Componente de botón
import { Contact } from "@prisma/client"; // Tipo Contact de Prisma

// Esquema de validación para los campos del formulario de contacto
const contactFormSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Ingrese un email válido"),
  phone: z.string().optional(),
});

// Se infiere el tipo ContactFormValues a partir del esquema definido con Zod
type ContactFormValues = z.infer<typeof contactFormSchema>;

// Define las propiedades que recibe el componente EditContactDialog
interface EditContactDialogProps {
  contact: Contact | null; // Contacto que se va a editar (o null si no hay contacto seleccionado)
  companyId: string; // ID de la compañía a la que pertenece el contacto
  onClose: () => void; // Función que se llama para cerrar el diálogo
  onSuccess: () => void; // Función que se llama cuando se actualiza el contacto exitosamente
}

// Componente EditContactDialog: Muestra un modal para editar un contacto existente.
export function EditContactDialog({
  contact,
  companyId,
  onClose,
  onSuccess,
}: EditContactDialogProps) {
  const [loading, setLoading] = useState(false);

  // Configura react-hook-form con Zod como validador
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: contact?.name || "",
      email: contact?.email || "",
      phone: contact?.phone || "",
    },
  });

  // Maneja el envío del formulario
  const onSubmit = async (data: ContactFormValues) => {
    if (!contact) return; // Si no hay contacto, no procede

    try {
      setLoading(true);
      // Envía la solicitud PUT para actualizar el contacto en la base de datos
      await axios.put(`/api/companies/${companyId}/contacts/${contact.id}`, data);
      toast.success("Contacto actualizado exitosamente");
      onSuccess(); // Llama a la función de éxito para refrescar o actualizar la lista
    } catch (error) {
      console.error("Error updating contact:", error);
      toast.error("Error al actualizar el contacto");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={!!contact} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Contacto</DialogTitle>
          <DialogDescription>Actualiza los datos del contacto</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input placeholder="Nombre del contacto" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="email@ejemplo.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Teléfono</FormLabel>
                  <FormControl>
                    <Input placeholder="+51 999 999 999" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Actualizando..." : "Actualizar"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
