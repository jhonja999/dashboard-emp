/**
 * Archivo: app/(routes)/companies/[companyId]/components/ContactForm/ContactForm.types.ts
 * Uso: Define los tipos de datos y las propiedades que se utilizan en el formulario de contacto (ContactForm).
 */

import type { Contact } from "@prisma/client"; // Importa el tipo Contact desde Prisma

// Define las propiedades que recibe el componente ContactForm
export interface ContactFormProps {
  initialData?: Contact | null; // Datos iniciales del contacto (en caso de edición) o null
  companyId: string;            // ID de la compañía a la que pertenece el contacto
  onSuccess?: (updatedContact: Contact) => void; // Función que se ejecuta al crear/actualizar exitosamente el contacto
  isDialog?: boolean;           // Indica si el formulario se muestra dentro de un diálogo (modal)
}

// Define los campos que se manejan en el formulario de contacto
export interface FormData {
  name: string;       // Nombre del contacto
  email: string;      // Email del contacto
  phone?: string;     // Teléfono del contacto (opcional)
  role: string;       // Rol del contacto dentro de la empresa
  startDate: Date;    // Fecha de inicio del contacto (asegúrate de que coincida con el modelo Prisma)
}
