import * as z from "zod"

export const companyFormSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  country: z.string().min(1, "Por favor selecciona un país"),
  website: z.string().url("URL inválida").optional().or(z.literal("")),
  phone: z
    .string()
    .regex(/^\+?[0-9\s-]{8,}$/, "Formato de teléfono inválido")
    .optional(),
  dni: z
    .string()
    .regex(/^[0-9]{8}$/, "El DNI debe tener 8 dígitos")
    .optional(),
  imageUrl: z.string().optional(),
})

export type CompanyFormValues = z.infer<typeof companyFormSchema>

