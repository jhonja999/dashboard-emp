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
import { UploadCloud, X } from "lucide-react";
import Image from "next/image";

const countries = [
  "Perú",
  "Argentina",
  "Chile",
  "Colombia",
  "México",  
  "España",
  // Agrega más países si lo deseas
];

export function CompanyForm() {
  const router = useRouter();

  // Estados de carga y de la URL de imagen
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  // Estados de formulario y errores simples
  const [formData, setFormData] = useState({
    name: "",
    country: "",
    website: "",
    phone: "",
    dni: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    country: "",
  });

  // Validación básica
  const validateForm = () => {
    const newErrors = { name: "", country: "" };

    if (formData.name.length < 2) {
      newErrors.name = "El nombre debe tener al menos 2 caracteres";
    }
    if (!formData.country) {
      newErrors.country = "Por favor selecciona un país";
    }

    setErrors(newErrors);
    // Retorna true si no hay errores
    return !Object.values(newErrors).some((error) => error);
  };

  // Manejo de envío de formulario
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log("Datos del formulario:", formData);

    if (!validateForm()) {
      console.log("Validación fallida");
      return;
    }

    try {
      setLoading(true);
      // Envía datos a tu API
      const response = await axios.post("/api/companies", {
        ...formData,
        imageUrl,
      });
      console.log("Compañía creada correctamente:", response.data);
      toast.success("Cliente creado exitosamente");

      // Redireccionar o refrescar
      router.refresh();
      router.push("/companies"); // Ajusta la ruta si lo necesitas
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
      className="max-w-3xl mx-auto p-4 md:p-6 space-y-6 bg-white rounded-lg shadow-sm"
    >
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Crear Nueva Compañía</h2>
        <p className="text-sm text-gray-500">
          Completa los datos para crear una nueva compañía.
        </p>
      </div>

      {/* GRID de dos columnas en pantallas medianas en adelante */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {/* Campo: Nombre */}
        <div className="space-y-2">
          <Label htmlFor="name">Nombre de la Empresa</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            placeholder="Nombre de la Empresa"
            className="w-full"
          />
          {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
        </div>

        {/* Campo: País */}
        <div className="space-y-2">
          <Label htmlFor="country">País</Label>
          <Select
            value={formData.country}
            onValueChange={(value) =>
              setFormData({ ...formData, country: value })
            }
          >
            <SelectTrigger id="country" className="w-full">
              <SelectValue placeholder="Seleccione un país" />
            </SelectTrigger>
            <SelectContent>
              {countries.map((country) => (
                <SelectItem key={country} value={country}>
                  {country}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.country && (
            <p className="text-sm text-red-500">{errors.country}</p>
          )}
        </div>

        {/* Campo: Sitio Web */}
        <div className="space-y-2">
          <Label htmlFor="website">Sitio Web</Label>
          <Input
            id="website"
            value={formData.website}
            onChange={(e) =>
              setFormData({ ...formData, website: e.target.value })
            }
            placeholder="https://ejemplo.com"
            className="w-full"
          />
        </div>

        {/* Campo: Teléfono */}
        <div className="space-y-2">
          <Label htmlFor="phone">Teléfono</Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            placeholder="+51........"
            className="w-full"
          />
        </div>

        {/* Campo: DNI */}
        <div className="space-y-2">
          <Label htmlFor="dni">DNI</Label>
          <Input
            id="dni"
            value={formData.dni}
            onChange={(e) =>
              setFormData({ ...formData, dni: e.target.value })
            }
            placeholder="12345678"
            className="w-full"
          />
        </div>
      </div>

      {/* Imagen de Perfil (ocupa todo el ancho) - MEJORADO */}
      <div className="space-y-2">
        <Label>Imagen de Perfil</Label>
        <div className="mt-1">
          {!imageUrl ? (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer h-64">
              <UploadButton
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                  console.log("Upload completado:", res);
                  if (res && res[0]) {
                    setImageUrl(res[0].url);
                    toast.success("Imagen subida exitosamente");
                  }
                }}
                onUploadError={(error) => {
                  console.error("Error al subir la imagen:", error);
                  toast.error("Error al subir la imagen");
                }}
                className="w-full h-full ut-allowed-content:w-full ut-allowed-content:h-full ut-button:w-full ut-button:h-full ut-button:flex ut-button:flex-col ut-button:items-center ut-button:justify-center ut-button:gap-3 ut-button:bg-transparent ut-button:border-0 ut-button:shadow-none ut-button:p-0"
              />
              <div className="absolute pointer-events-none flex flex-col items-center justify-center">
                <UploadCloud className="h-12 w-12 text-gray-400 mb-2" />
                <p className="text-xs text-gray-500 mt-10">
                  PNG, JPG, GIF hasta 10MB
                </p>
              </div>
            </div>
          ) : (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center bg-gray-50 h-64 relative">
              <div className="relative mb-4">
                <Image
                  src={imageUrl}
                  alt="Previsualización"
                  width={200}
                  height={200}
                  className="w-40 h-40 object-cover rounded-md shadow-md"
                />
              </div>
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => setImageUrl("")}
                className="flex items-center gap-1"
              >
                <X className="w-4 h-4" />
                <span>Quitar imagen</span>
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Botones de acción */}
      <div className="flex flex-col sm:flex-row gap-3 sm:justify-end pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          disabled={loading}
          className="w-full sm:w-auto"
        >
          Cancelar
        </Button>
        <Button 
          type="submit" 
          disabled={loading}
          className="w-full sm:w-auto"
        >
          {loading ? "Creando..." : "Crear Cliente"}
        </Button>
      </div>
    </form>
  );
}