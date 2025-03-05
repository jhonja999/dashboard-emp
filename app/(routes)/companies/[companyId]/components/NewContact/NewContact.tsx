/**
 * Archivo: app/(routes)/companies/[companyId]/components/NewContact/NewContact.tsx
 * Uso: Componente cliente para crear un nuevo contacto asociado a una compañía específica.
 * Utiliza react-hook-form y Zod para validación, axios para realizar solicitudes HTTP
 * y Clerk/Next.js para la navegación.
 */

"use client"

import { useState } from "react"
import { useRouter } from "next/navigation" // Hook para la navegación de Next.js
import { toast } from "sonner" // Librería para mostrar notificaciones
import axios from "axios" // Librería para solicitudes HTTP
import * as z from "zod" // Zod para validaciones de esquema
import { useForm } from "react-hook-form" // Hook para manejar formularios
import { zodResolver } from "@hookform/resolvers/zod" // Adaptador para usar Zod con react-hook-form

import { Button } from "@/components/ui/button" // Componente de botón
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog" // Componentes para crear un modal (diálogo)
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form" // Componentes de formulario
import { Input } from "@/components/ui/input" // Componente de entrada de texto

// Esquema de validación para los campos del contacto
const contactFormSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Ingrese un email válido"),
  phone: z.string().optional(),
})

// Se infiere el tipo de ContactFormValues a partir del esquema definido con Zod
type ContactFormValues = z.infer<typeof contactFormSchema>

// Define las propiedades que recibe el componente NewContact
interface NewContactProps {
  companyId: string // ID de la compañía a la que se asocia el contacto
  onSuccess?: () => void // Callback opcional que se ejecuta tras crear un contacto con éxito
}

// Componente NewContact: Muestra un modal para crear un nuevo contacto.
export function NewContact({ companyId, onSuccess }: NewContactProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false) // Controla el estado de carga al enviar el formulario
  const [isOpen, setIsOpen] = useState(false) // Controla la visibilidad del diálogo

  // Configuración de react-hook-form con Zod como validador
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  })

  // Maneja el envío del formulario
  const onSubmit = async (data: ContactFormValues) => {
    try {
      setLoading(true)
      // Envía una solicitud POST para crear un nuevo contacto asociado a la compañía
      await axios.post(`/api/companies/${companyId}/contacts`, data)
      toast.success("Contacto creado exitosamente")
      form.reset()
      setIsOpen(false)
      onSuccess?.() // Ejecuta la callback onSuccess si está definida
      router.refresh() // Refresca la página para mostrar la información actualizada
    } catch (error) {
      console.error("Error creating contact:", error)
      toast.error("Error al crear el contacto")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Agregar Nuevo Contacto</DialogTitle>
          <DialogDescription>Ingresa los datos del nuevo contacto</DialogDescription>
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
              <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                Cancelar
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Creando..." : "Crear"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
