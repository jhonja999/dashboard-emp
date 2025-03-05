/**
 * Archivo: app/(routes)/companies/[companyId]/components/CompanyForm/CompanyForm.types.ts
 * Uso: Define los tipos necesarios para el formulario de creación/edición de empresas.
 */

import type { Company } from "@prisma/client"

/**
 * Datos que se manejan en el formulario de empresa.
 */
export interface FormData {
  name: string
  country: string
  website: string
  phone: string
  dni: string
  imageUrl: string
}

/**
 * Propiedades que recibe el componente CompanyForm.
 */
export interface CompanyFormProps {
  initialData?: Company      // Datos iniciales de la empresa (en caso de edición)
  onSuccess?: (data: Company) => void // Función que se ejecuta al guardar exitosamente
  onCancel?: () => void      // Función que se ejecuta al cancelar la operación
}
