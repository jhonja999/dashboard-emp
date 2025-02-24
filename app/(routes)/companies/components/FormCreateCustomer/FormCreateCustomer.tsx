/**
 * FormCreateCustomer.tsx
 *
 * Componente de formulario para crear nuevos clientes en el sistema.
 * Incluye validación de campos, carga de imágenes mediante UploadThing,
 * y manejo de estado del formulario usando react-hook-form y zod.
 *
 * @requires @hookform/resolvers/zod - Para la validación del formulario
 * @requires react-hook-form - Para el manejo del estado del formulario
 * @requires uploadthing - Para la carga de imágenes
 * @requires shadcn/ui - Para los componentes de UI
 */

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FieldErrors } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { toast } from "sonner";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UploadButton } from "@/utils/uploadthing";

import { Loader2, User } from "lucide-react";

/**
 * Props del componente FormCreateCustomer.
 */
export type FormCreateCustomerProps = {
  /** Función que se ejecuta cuando el formulario se envía exitosamente */
  onSuccess?: () => void;
};

/* ------------------------------------------------------------------
   Validaciones personalizadas
   ------------------------------------------------------------------ */

// Permite URLs con o sin protocolo, por ejemplo "www.admin.com" o "https://admin.com"
const customUrlRegex = /^(?:https?:\/\/)?(www\.)?[\w-]+(\.[\w-]+)+.*$/;
const websiteSchema = z
  .string()
  .refine(
    (val) => customUrlRegex.test(val),
    "Por favor ingresa una URL válida (ej. https://admin.com)"
  );

// DNI: 8 dígitos numéricos (sin letra)
const dniSchema = z
  .string()
  .regex(/^[0-9]{8}$/, "El DNI debe tener 8 dígitos (sin letra).");

/**
 * Schema de validación para el formulario.
 * Se hace opcional el campo profileImage, para permitir no subir imagen.
 */
const formSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  country: z.string().min(2, "Por favor selecciona un país"),
  website: websiteSchema,
  phone: z
    .string()
    .min(6, "El teléfono debe tener al menos 6 caracteres")
    .regex(/^\+?[\d\s-]+$/, "Formato de teléfono inválido"),
  dni: dniSchema,
  profileImage: z.string().optional(), // El usuario puede no subir imagen
});

/**
 * Tipo inferido del schema para usar en el formulario
 */
type FormValues = z.infer<typeof formSchema>;

/**
 * Componente principal del formulario de creación de cliente.
 *
 * @param {FormCreateCustomerProps} props - Props del componente
 * @returns {JSX.Element} Formulario renderizado
 */
export function FormCreateCustomer({ onSuccess }: FormCreateCustomerProps) {
  // Estado para manejar la URL de la imagen subida
  const [imageUrl, setImageUrl] = useState<string>("");

  // Inicialización del formulario con react-hook-form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      country: "",
      website: "",
      phone: "",
      dni: "",
      profileImage: undefined,
    },
    mode: "onChange", // Valida en tiempo real
  });

  const { isValid, isSubmitting } = form.formState;

  /**
   * Manejador del envío del formulario
   * @param {FormValues} values - Valores del formulario
   */
  const onSubmit = async (values: FormValues) => {
    try {
      // Lógica para enviar los datos a tu API
      console.log("Datos del formulario:", values);

      // Notificar éxito
      toast.success("Cliente creado exitosamente");
      onSuccess?.();

      // Reset del formulario tras éxito
      form.reset();
      setImageUrl("");
    } catch (error) {
      console.error("Error al crear el cliente:", error);
      toast.error("Error al crear el cliente");
    }
  };

  /**
   * Callback para manejar errores al enviar el formulario
   */
  const onError = (errors: FieldErrors<FormValues>) => {
    toast.error("Por favor corrige los campos requeridos antes de continuar.");
    console.error("Errores en el formulario:", errors);
  };

  return (
    <div className="bg-background p-4 rounded-md shadow-sm">
      {/* Mensaje si el formulario no es válido */}
      {!isValid && (
        <p className="text-red-400 text-sm mb-2">
          Corrige los campos marcados antes de enviar.
        </p>
      )}

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, onError)}
          className="space-y-6"
        >
          <div className="grid grid-cols-2 gap-4">
            {/* Campo: Nombre de la Empresa */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre de la Empresa</FormLabel>
                  <FormControl>
                    <Input placeholder="Ingrese el nombre..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Campo: País */}
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>País</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione un país" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Spain">España</SelectItem>
                      <SelectItem value="France">Francia</SelectItem>
                      <SelectItem value="Germany">Alemania</SelectItem>
                      <SelectItem value="Italy">Italia</SelectItem>
                      <SelectItem value="Portugal">Portugal</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Campo: Sitio Web */}
            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sitio Web</FormLabel>
                  <FormControl>
                    <Input placeholder="https://..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Campo: Teléfono */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Teléfono</FormLabel>
                  <FormControl>
                    <Input placeholder="+51..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Campo: DNI */}
            <FormField
              control={form.control}
              name="dni"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>DNI</FormLabel>
                  <FormControl>
                    <Input placeholder="12345678" {...field} />
                  </FormControl>
                  <FormDescription>
                    Formato: 8 dígitos numéricos (sin letra)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Campo: Imagen de Perfil (opcional) con UploadThing */}
            <FormField
              control={form.control}
              name="profileImage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Imagen de Perfil (opcional)</FormLabel>
                  <FormControl>
                    <div className="p-3 bg-slate-700/20 rounded-lg border-dashed border-2 border-slate-300 flex flex-col gap-2 items-center justify-center text-center">
                      <UploadButton
                        endpoint="profileImage"
                        onClientUploadComplete={(res) => {
                          if (res && res.length > 0) {
                            const url = res[0].url;
                            // Actualiza el valor del formulario
                            field.onChange(url);
                            // Guarda la imagen localmente para previsualización
                            setImageUrl(url);
                            toast.success("Foto subida correctamente");
                          }
                        }}
                        onUploadError={(error: Error) => {
                          console.error("Error al subir la imagen:", error);
                          toast.error("Error al subir la imagen");
                        }}
                        // Clases para hacer el botón más visible
                        className="text-lg font-bold px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded"
                      />
                      {!imageUrl ? (
                        <div className="flex flex-col items-center text-gray-400">
                          <User className="w-8 h-8" />
                          <p className="text-sm">Sin archivos seleccionados</p>
                        </div>
                      ) : (
                        <div className="relative h-20 w-20 rounded-full overflow-hidden">
                          <Image
                            src={imageUrl}
                            alt="Imagen de perfil"
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Botones del formulario */}
          <div className="flex justify-end gap-4">
            <Button
              variant="outline"
              type="button"
              onClick={() => {
                form.reset();
                setImageUrl("");
                toast("Formulario reseteado");
              }}
            >
              Cancelar
            </Button>

            <Button
              type="submit"
              disabled={!isValid || isSubmitting}
              className="bg-blue-600 text-white hover:bg-blue-700"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Creando...</span>
                </div>
              ) : (
                "Crear Cliente"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
