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
import { CloudUpload, X } from "lucide-react";

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

  // Image state
  const [imageUrl, setImageUrl] = useState("");

  // Form data
  const [formData, setFormData] = useState({
    name: "",
    country: "",
    website: "",
    phone: "",
    dni: "",
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
    if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Formato inválido. Ej: +51 999 999 999 o 999-999-999";
    }

    // DNI
    const dniRegex = /^[0-9]{8}$/;
    if (!dniRegex.test(formData.dni)) {
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
      const response = await axios.post("/api/companies", {
        ...formData,
        imageUrl,
      });
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
          {!imageUrl ? (
            <UploadButton
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                if (res && res[0]) {
                  setImageUrl(res[0].url);
                  toast.success("Imagen subida exitosamente");
                }
              }}
              onUploadError={(error) => {
                console.error("Error al subir la imagen:", error);
                toast.error("Error al subir la imagen");
              }}
              className="bg-primary hover:bg-primary/90 text-primary-foreground dark:bg-secondary dark:hover:bg-secondary/90 dark:text-secondary-foreground px-6 py-3 rounded-md border-2 border-dotted border-primary transition-colors flex items-center justify-center gap-2 z-50"
              content={{
                button({ ready }) {
                  if (!ready) return "Cargando...";
                  return "Subir imagen";
                },
              }}
            />
          ) : (
            <div className="space-y-2">
              <Image
                src={imageUrl}
                alt="Previsualización"
                width={200}
                height={200}
                className="w-40 h-40 object-cover rounded-md shadow-md border-2 border-border"
              />
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => setImageUrl("")}
                className="flex items-center gap-2"
              >
                <X className="h-4 w-4" />
                <span>Quitar Imagen</span>
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 sm:justify-end pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          disabled={loading}
          className="w-full sm:w-auto border-border transition-colors"
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          disabled={loading}
          className="w-full sm:w-auto bg-primary hover:bg-primary/90 border-primary text-primary-foreground transition-colors"
        >
          {loading ? "Creando..." : "Crear Cliente"}
        </Button>
      </div>
    </form>
  );
}
