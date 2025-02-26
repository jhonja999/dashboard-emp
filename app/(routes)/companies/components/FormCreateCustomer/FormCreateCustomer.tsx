"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { UploadButton } from "@uploadthing/react";
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
import { UploadCloud, X } from "lucide-react";

const countries = [
  "Argentina",
  "Chile",
  "Colombia",
  "México",
  "Perú",
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
      className="max-w-3xl mx-auto p-6 space-y-6 bg-white rounded shadow-sm"
    >
      <h2 className="text-xl font-semibold">Crear Nueva Compañía</h2>
      <p className="text-sm text-gray-500">
        Completa los datos para crear una nueva compañía.
      </p>

      {/* GRID de dos columnas en pantallas medianas en adelante */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            <SelectTrigger id="country">
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
            placeholder="+1234567890"
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
          />
        </div>

        {/* Imagen de Perfil (ocupa 2 columnas) */}
        <div className="space-y-2 col-span-1 md:col-span-2">
          <Label>Imagen de Perfil</Label>
          <div className="border rounded-lg p-4 text-center">
            <UploadButton
              endpoint="imageUploader" // Ajusta a tu endpoint de UploadThing
              onClientUploadComplete={(res) => {
                console.log("Upload completado:", res);
                if (res?.[0]) {
                  setImageUrl(res[0].url);
                  toast.success("Imagen subida exitosamente");
                }
              }}
              onUploadError={(error: Error) => {
                console.error("Error al subir la imagen:", error);
                toast.error("Error al subir la imagen");
              }}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 rounded hover:bg-blue-400"
            >
              <UploadCloud className="w-4 h-4" />
              <span>Choose File</span>
            </UploadButton>

            {imageUrl && (
              <div className="mt-4 flex flex-col items-center">
                <img
                  src={imageUrl}
                  alt="Previsualización"
                  className="w-24 h-24 object-cover rounded-md border"
                />
                <Button
                  variant="destructive"
                  onClick={() => setImageUrl("")}
                  className="mt-2"
                >
                  <X className="w-4 h-4 mr-1" />
                  Quitar imagen
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Botones de acción */}
      <div className="flex gap-4 justify-end">
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            // Ejemplo: volver atrás
            router.back();
          }}
          disabled={loading}
        >
          Cancelar
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? "Creando..." : "Crear Cliente"}
        </Button>
      </div>
    </form>
  );
}
