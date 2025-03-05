/**
 * Archivo: CompanyInformation.types.ts
 * Uso: Define los tipos necesarios para el componente CompanyInformation.
 */

import type { Company } from "@prisma/client"

// Tipo de propiedades que recibe el componente CompanyInformation
export interface CompanyInformationProps {
  company: Company
}
