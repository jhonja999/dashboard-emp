"use client"

import { useState } from "react"
import { toast } from "sonner"
import axios from "axios"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Contact } from "@prisma/client"


const contactFormSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Ingrese un email válido"),
  phone: z.string().optional(),
})

type ContactFormValues = z.infer<typeof contactFormSchema>

interface EditContactDialogProps {
  contact: Contact | null
  companyId: string
  onClose: () => void
  onSuccess: () => void
}

export function EditContactDialog({ contact, companyId, onClose, onSuccess }: EditContactDialogProps) {
  const [loading, setLoading] = useState(false)

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: contact?.name || "",
      email: contact?.email || "",
      phone: contact?.phone || "",
    },
  })

  const onSubmit = async (data: ContactFormValues) => {
    if (!contact) return

    try {
      setLoading(true)
      await axios.put(`/api/companies/${companyId}/contacts/${contact.id}`, data)
      toast.success("Contacto actualizado exitosamente")
      onSuccess()
    } catch (error) {
      console.error("Error updating contact:", error)
      toast.error("Error al actualizar el contacto")
    } finally {
      setLoading(false)
    }
  }

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
  )
}

