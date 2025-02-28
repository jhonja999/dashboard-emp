// app/(routes)/companies/[companyId]/components/ContactForm/ContactForm.types.ts
import type { Contact } from "@prisma/client";

export interface ContactFormProps {
  initialData?: Contact | null;
  companyId: string;
  onSuccess?: (updatedContact: Contact) => void;
  isDialog?: boolean;
}

export interface FormData {
  name: string;
  email: string;
  phone?: string;
  role: string;
  startDate: Date; // Asegúrate de que este tipo coincida con el modelo Prisma
}