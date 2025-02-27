import type { Company } from "@prisma/client";

export interface FormData {
  name: string;
  country: string;
  website: string;
  phone: string;
  dni: string;
  imageUrl: string;
}

export interface CompanyFormProps {
  initialData?: Company;
  onSuccess?: (data: Company) => void;
  onCancel?: () => void;
}