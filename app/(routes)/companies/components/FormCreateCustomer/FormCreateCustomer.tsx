"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { UploadButton } from "@/utils/uploadthing";
import Image from "next/image";
import { CloudUpload, Loader2, X, ImagePlus } from "lucide-react";
import { cn } from "@/lib/utils";

const countries = [
  "Perú",
  "Argentina",
  "Chile",
  "Colombia",
  "México",
  "España",
];

interface FormCreateCustomerProps {
  onSuccess?: () => void; // optional callback
}

/**
 * FormCreateCustomer - Creates a new Company (POST to /api/companies)
 */
export function FormCreateCustomer({ onSuccess }: FormCreateCustomerProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // Form data
  const [formData, setFormData] = useState({
    name: "",
    country: "",
    website: "",
    phone: "",
    dni: "",
    imageUrl: "",
  });

  // Basic field errors
  const [errors, setErrors] = useState({
    name: "",
    country: "",
    phone: "",
    dni: "",
  });

  // Very basic validation
  const validateForm = () => {
    const newErrors = {
      name: "",
      country: "",
      phone: "",
      dni: "",
    };

    // Name
    if (formData.name.length < 2) {
      newErrors.name = "El nombre debe tener al menos 2 caracteres";
    }

    // Country
    if (!formData.country) {
      newErrors.country = "Por favor selecciona un país";
    }

    // Phone
    const phoneRegex =
      /^\+?[0-9]{1,3}?[-.\s]?(\(?\d{1,4}\)?[-.\s]?)?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;
    if (formData.phone && !phoneRegex.test(formData.phone)) {
      newErrors.phone = "Formato inválido. Ej: +51 999 999 999 o 999-999-999";
    }

    // DNI
    const dniRegex = /^[0-9]{8}$/;
    if (formData.dni && !dniRegex.test(formData.dni)) {
      newErrors.dni = "El DNI debe tener exactamente 8 dígitos numéricos";
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  // Handle form submit
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setLoading(true);

      // POST to /api/companies
      const response = await axios.post("/api/companies", formData);
      console.log("Compañía creada correctamente:", response.data);
      toast.success("Cliente creado exitosamente");

      // Optional callback
      onSuccess?.();

      // Refresh / navigate
      router.refresh();
      router.push("/companies");
    } catch (error) {
      console.error("Error al crear la compañía:", error);
      toast.error("Error al crear el cliente");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl p-6 space-y-6 bg-background rounded-lg shadow-md dark:bg-secondary"
    >
      {/* Grid: 2 columns for fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Name */}
        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm font-medium text-foreground">
            Nombre de la Empresa
          </Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Ej. Mi Empresa S.A."
            disabled={loading}
            className="w-full border-input bg-background focus:border-primary focus:ring-primary"
          />
          {errors.name && (
            <p className="text-sm text-destructive">{errors.name}</p>
          )}
        </div>

        {/* Country */}
        <div className="space-y-2">
          <Label
            htmlFor="country"
            className="text-sm font-medium text-foreground"
          >
            País
          </Label>
          <Select
            value={formData.country}
            onValueChange={(value) =>
              setFormData({ ...formData, country: value })
            }
            disabled={loading}
          >
            <SelectTrigger id="country" className="w-full">
              <SelectValue placeholder="Selecciona un país" />
            </SelectTrigger>
            <SelectContent className="bg-background text-foreground">
              {countries.map((country) => (
                <SelectItem key={country} value={country}>
                  {country}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.country && (
            <p className="text-sm text-destructive">{errors.country}</p>
          )}
        </div>

        {/* Website */}
        <div className="space-y-2">
          <Label
            htmlFor="website"
            className="text-sm font-medium text-foreground"
          >
            Sitio Web
          </Label>
          <Input
            id="website"
            value={formData.website}
            onChange={(e) =>
              setFormData({ ...formData, website: e.target.value })
            }
            placeholder="https://miempresa.com"
            disabled={loading}
            className="w-full border-input bg-background focus:border-primary focus:ring-primary"
          />
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <Label
            htmlFor="phone"
            className="text-sm font-medium text-foreground"
          >
            Teléfono
          </Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            placeholder="+51 999 999 999"
            disabled={loading}
            className="w-full border-input bg-background focus:border-primary focus:ring-primary"
          />
          {errors.phone && (
            <p className="text-sm text-destructive">{errors.phone}</p>
          )}
        </div>

        {/* DNI */}
        <div className="space-y-2">
          <Label htmlFor="dni" className="text-sm font-medium text-foreground">
            DNI
          </Label>
          <Input
            id="dni"
            value={formData.dni}
            onChange={(e) => setFormData({ ...formData, dni: e.target.value })}
            placeholder="12345678"
            disabled={loading}
            className="w-full border-input bg-background focus:border-primary focus:ring-primary"
          />
          {errors.dni && (
            <p className="text-sm text-destructive">{errors.dni}</p>
          )}
        </div>
      </div>

      {/* Image Upload */}
      <div className="space-y-4">
        <Label className="flex items-center text-sm font-medium text-foreground">
          <CloudUpload className="mr-2 h-5 w-5 text-primary" />
          Imagen de Perfil
        </Label>

        <div className="flex flex-col items-center space-y-4">
          <div
            className={cn(
              "relative w-40 h-40 rounded-lg overflow-hidden",
              "bg-muted/30 border-2 border-dashed border-muted-foreground/25",
              "flex items-center justify-center",
              !formData.imageUrl && "hover:border-primary/50 transition-colors"
            )}
          >
            {formData.imageUrl ? (
              <>
                <Image
                  src={formData.imageUrl || "/placeholder.svg"}
                  alt="Company Profile"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => setFormData({ ...formData, imageUrl: "" })}
                    className="flex items-center gap-2"
                  >
                    <X className="h-4 w-4" />
                    <span>Eliminar</span>
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center gap-2 p-4">
                <UploadButton
                  endpoint="imageUploader"
                  onUploadBegin={() => {
                    setIsUploading(true);
                  }}
                  onClientUploadComplete={(res) => {
                    if (res && res[0]) {
                      setFormData({ ...formData, imageUrl: res[0].url });
                      toast.success("Imagen subida exitosamente");
                    }
                    setIsUploading(false);
                  }}
                  onUploadError={(error) => {
                    console.error("Error al subir la imagen:", error);
                    toast.error("Error al subir la imagen");
                    setIsUploading(false);
                  }}
                  appearance={{
                    button: cn(
                      "bg-primary hover:bg-primary/90 text-primary-foreground",
                      "transition-colors rounded-md px-4 py-2",
                      "flex items-center gap-2"
                    ),
                    allowedContent: "hidden",
                  }}
                  content={{
                    button({ ready }) {
                      if (!ready) return "Cargando...";

                      return (
                        <div className="flex items-center gap-2">
                          {isUploading ? (
                            <>
                              <Loader2 className="h-4 w-4 animate-spin dark:text-blue-500" />
                              <span className="dark:text-blue-500">Subiendo...</span>
                            </>
                          ) : (
                            <>
                              <ImagePlus className="h-4 w-4 dark:text-blue-500" />
                              <span className="dark:text-blue-500">Subir imagen</span>
                            </>
                          )}
                        </div>
                      );
                    },
                  }}
                />
                <p className="text-xs text-muted-foreground text-center mt-2">
                PNG, JPG o Webp
                  <br />
                  Máximo 4MB
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          disabled={loading}
          className="border-border transition-colors"
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          disabled={loading || isUploading}
          className="bg-primary hover:bg-primary/90 text-primary-foreground transition-colors"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Creando...
            </>
          ) : (
            "Crear Cliente"
          )}
        </Button>
      </div>
    </form>
  );
}