"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { ContactForm } from "../ContactForm/ContactForm"
import type { Contact } from "@prisma/client"

interface ContactFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  companyId: string
  contact: Contact | null
  onSuccess: () => void
}

export function ContactFormDialog({ open, onOpenChange, companyId, contact, onSuccess }: ContactFormDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{contact ? "Editar Contacto" : "Agregar Nuevo Contacto"}</DialogTitle>
          <DialogDescription>
            {contact ? "Actualiza los datos del contacto" : "Ingresa los datos del nuevo contacto"}
          </DialogDescription>
        </DialogHeader>
        <ContactForm initialData={contact || undefined} companyId={companyId} onSuccess={onSuccess} isDialog />
      </DialogContent>
    </Dialog>
  )
}

