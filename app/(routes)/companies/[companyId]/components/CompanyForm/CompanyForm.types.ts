import type { Company } from "@prisma/client"

export interface CompanyFormProps {
  initialData: Company | null
  onSuccess?: (updatedCompany: Company) => void
}

export interface FormData {
  name: string
  country: string
  website?: string
  phone?: string
  dni?: string
  imageUrl?: string
}

