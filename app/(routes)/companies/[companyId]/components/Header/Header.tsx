"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, Edit2, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import axios from "axios";
import { toast } from "sonner";
import { useState } from "react";

interface HeaderProps {
  companyId: string;
  onEdit: () => void;
}

export function HeaderCompanyId({ companyId, onEdit }: HeaderProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Función para eliminar la empresa
  const handleDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/companies/${companyId}`);
      toast.success("Empresa eliminada exitosamente");
      router.push("/companies");
      router.refresh();
    } catch (error) {
      console.error("Error deleting company:", error);
      toast.error("Error al eliminar la empresa");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-evenly mb-6 mt-6">
      {/* Botón de retroceso y título */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.back()}
          className="md:h-9 md:w-9 h-8 w-8"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold">Detalles de la Empresa</h1>
      </div>

      {/* Botones de edición y eliminación */}
      <div className="flex gap-2">
        {/* Botón de edición */}
        <Button
          variant="outline"
          size="icon"
          onClick={onEdit}
          className="md:h-9 md:w-9 h-8 w-8"
        >
          <Edit2 className="h-4 w-4" />
        </Button>

        {/* Diálogo de confirmación para eliminar */}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="destructive"
              size="icon"
              disabled={loading}
              className="md:h-9 md:w-9 h-8 w-8"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
              <AlertDialogDescription>
                Esta acción no se puede deshacer. Se eliminará permanentemente la
                empresa y todos sus datos asociados.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                {loading ? "Eliminando..." : "Eliminar"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}