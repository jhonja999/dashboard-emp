// app/(routes)/companies/[companyId]/components/ContactForm/ContactForm.types.ts
import type { Contact } from "@prisma/client"

export interface ContactFormProps {
  initialData?: Contact
  companyId: string
  onSuccess?: (contact: Contact) => void
  isDialog?: boolean
}

export interface FormData {
  name: string
  email: string
  phone: string
  role: string
}

