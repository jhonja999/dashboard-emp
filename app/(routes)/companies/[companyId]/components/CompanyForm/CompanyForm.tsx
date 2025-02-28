"use client";

import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import type { CompanyFormProps, FormData } from "./CompanyForm.types";
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

export function CompanyForm({ initialData, onSuccess, onCancel }: CompanyFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: initialData?.name || "",
    country: initialData?.country || "",
    website: initialData?.website || "",
    phone: initialData?.phone || "",
    dni: initialData?.dni || "",
    imageUrl: initialData?.imageUrl || "",
  });
  const [isUploading, setIsUploading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (initialData) {
        const response = await axios.patch(
          `/api/companies/${initialData.id}`,
          formData
        );
        console.log("Company updated:", response.data);
        toast.success("Empresa actualizada exitosamente");
        
        // Call the onSuccess callback with the updated data
        if (onSuccess) {
          onSuccess(response.data);
        }
      } else {
        // Handle create case if needed
        const response = await axios.post("/api/companies", formData);
        console.log("Company created:", response.data);
        toast.success("Empresa creada exitosamente");
        
        if (onSuccess) {
          onSuccess(response.data);
        }
      }

      router.refresh();
    } catch (error) {
      console.error("Error saving company:", error);
      toast.error("Error al guardar los cambios");
    } finally {
      setLoading(false);
    }
  };

  // Handle cancel button click
  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
        <div className="space-y-2">
          <Label htmlFor="name">Nombre de la Empresa</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            disabled={loading}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="country">País</Label>
          <Select
            value={formData.country}
            onValueChange={(value) =>
              setFormData({ ...formData, country: value })
            }
            disabled={loading}
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecciona un país" />
            </SelectTrigger>
            <SelectContent>
              {countries.map((country) => (
                <SelectItem key={country} value={country}>
                  {country}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="website">Sitio Web</Label>
          <Input
            id="website"
            value={formData.website}
            onChange={(e) =>
              setFormData({ ...formData, website: e.target.value })
            }
            disabled={loading}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Teléfono</Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            disabled={loading}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="dni">DNI</Label>
          <Input
            id="dni"
            value={formData.dni}
            onChange={(e) => setFormData({ ...formData, dni: e.target.value })}
            disabled={loading}
          />
        </div>
      </div>

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

      <div className="flex justify-end gap-4">
        <Button
          type="button"
          variant="outline"
          disabled={loading}
          onClick={handleCancel}
        >
          Cancelar
        </Button>
        <Button type="submit" disabled={loading || isUploading}>
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Guardando...
            </>
          ) : (
            "Guardar cambios"
          )}
        </Button>
      </div>
    </form>
  );
}