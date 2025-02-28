import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarIcon, Mail, Phone, User, UserCircle } from "lucide-react";
import type { ContactFormProps, FormData } from "./ContactForm.types";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { cn } from "@/lib/utils";

// Roles predefinidos
const roles = [
  { value: "employee", label: "Empleado" },
  { value: "manager", label: "Gerente" },
  { value: "director", label: "Director" },
  { value: "admin", label: "Administrador" },
  { value: "other", label: "Otro" },
];

// Esquema de validación con Zod
const formSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Ingrese un email válido"),
  phone: z.string().optional(),
  role: z.string(),
  startDate: z.date({
    required_error: "La fecha de inicio es requerida",
    invalid_type_error: "Ingrese una fecha válida",
  }),
});

export function ContactForm({ initialData, companyId, onSuccess, isDialog }: ContactFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: initialData?.name || "",
    email: initialData?.email || "",
    phone: initialData?.phone || "",
    role: initialData?.role || "employee",
    startDate: initialData?.startDate ? new Date(initialData.startDate) : new Date(),
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Validación del formulario
  const validateForm = () => {
    try {
      formSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0].toString()] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  // Manejo del envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
      setLoading(true);
      if (initialData) {
        // Actualizar contacto existente
        const response = await axios.put(
          `/api/companies/${companyId}/contacts/${initialData.id}`,
          formData
        );
        toast.success("Contacto actualizado exitosamente");
        onSuccess?.(response.data);
      } else {
        // Crear nuevo contacto
        const response = await axios.post(`/api/companies/${companyId}/contacts`, formData);
        toast.success("Contacto creado exitosamente");
        onSuccess?.(response.data);
      }
      if (!isDialog) {
        router.refresh();
        router.push(`/companies/${companyId}`);
      }
    } catch (error) {
      console.error("Error saving contact:", error);
      toast.error("Error al guardar los cambios");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Campo Nombre */}
        <div className="space-y-2">
          <Label htmlFor="name" className="flex items-center gap-2">
            <User className="h-4 w-4 text-muted-foreground" />
            Nombre
          </Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            disabled={loading}
            placeholder="Nombre del contacto"
          />
          {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
        </div>

        {/* Campo Email */}
        <div className="space-y-2">
          <Label htmlFor="email" className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-muted-foreground" />
            Email
          </Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            disabled={loading}
            placeholder="email@ejemplo.com"
          />
          {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
        </div>

        {/* Campo Teléfono */}
        <div className="space-y-2">
          <Label htmlFor="phone" className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-muted-foreground " />
            Teléfono
          </Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            disabled={loading}
            placeholder="+51 999 999 999"
          />
          {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
        </div>

        {/* Campo Rol */}
        <div className="space-y-2">
          <Label htmlFor="role" className="flex items-center gap-2">
            <UserCircle className="h-4 w-4 text-muted-foreground" />
            Rol
          </Label>
          <Select
            value={formData.role}
            onValueChange={(value) => setFormData({ ...formData, role: value })}
            disabled={loading}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecciona un rol" />
            </SelectTrigger>
            <SelectContent>
              {roles.map((role) => (
                <SelectItem key={role.value} value={role.value}>
                  {role.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.role && <p className="text-sm text-destructive">{errors.role}</p>}
        </div>

        {/* Fecha de Inicio (Implementación creativa) */}
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="startDate" className="flex items-center gap-2">
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
            Fecha de Inicio
          </Label>
          <div className="relative">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !formData.startDate && "text-muted-foreground"
                  )}
                  disabled={loading}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.startDate ? (
                    format(formData.startDate, "PPP", { locale: es })
                  ) : (
                    <span>Selecciona una fecha</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={formData.startDate}
                  onSelect={(date) => setFormData({ ...formData, startDate: date || new Date() })}
                  initialFocus
                  disabled={loading}
                  locale={es}
                />
              </PopoverContent>
            </Popover>
            {errors.startDate && <p className="text-sm text-destructive mt-1">{errors.startDate}</p>
            }
            
          </div>
        </div>
      </div>

      {/* Botones de Acción */}
      <div className="flex justify-end gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => (isDialog ? onSuccess?.(initialData!) : router.back())}
          disabled={loading}
        >
          Cancelar
        </Button>
        <Button type="submit" disabled={loading}>
          {loading
            ? initialData
              ? "Actualizando..."
              : "Creando..."
            : initialData
              ? "Actualizar contacto"
              : "Crear contacto"}
        </Button>
      </div>
    </form>
  );
}