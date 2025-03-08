"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Edit, Building } from "lucide-react";
import { FormEventProps } from "./FormEvent.types";

/**
 * Esquema de validación con Zod:
 * - eventName: mínimo 2 caracteres
 * - companieSelected: requiere 'name' y 'id' (mínimo 2 caracteres en 'name')
 */
const formSchema = z.object({
  eventName: z
    .string()
    .min(2, "El nombre del evento debe tener al menos 2 caracteres"),
  companieSelected: z.object({
    name: z.string().min(2),
    id: z.string(),
  }),
});

/**
 * Componente FormEvent
 * @param companies - lista de compañías disponibles para seleccionar
 * @param setNewEvent - función para guardar los datos del evento
 * @param setOnSaveNewEvent - bandera que indica que se confirmó la creación del evento
 * @param setOpen - función para cerrar el modal o overlay
 *
 * Este componente usa `react-hook-form` + `zod` para manejar y validar el formulario.
 * Al hacer submit, llama a `onSubmit`, que actualiza el estado externo (newEvent, onSaveNewEvent).
 */
export function FormEvent(props: FormEventProps) {
  const { companies, setNewEvent, setOnSaveNewEvent, setOpen } = props;

  // Estado local para almacenar la compañía seleccionada (no imprescindible)
  const [, /* selectedCompany */ setSelectedCompany] = useState({
    name: "",
    id: "",
  });

  /**
   * Configura React Hook Form con Zod como validador:
   * - defaultValues define valores iniciales para los campos del formulario.
   */
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      eventName: "",
      companieSelected: {
        name: "",
        id: "",
      },
    },
  });

  /**
   * Maneja el envío del formulario (submit).
   * - Cierra el modal.
   * - Indica que se guardó el evento.
   * - Pasa los valores a `setNewEvent`.
   */
  function onSubmit(values: z.infer<typeof formSchema>) {
    setNewEvent(values);
    setOpen(false);
    setOnSaveNewEvent(true);
  }

  /**
   * handleCompanyChange: Actualiza la compañía en el formulario al seleccionar
   * un valor en el <Select>.
   */
  const handleCompanyChange = (newValue: string) => {
    // Busca la compañía en el array companies por nombre
    const selectedCompany = companies.find(
      (company) => company.name === newValue
    );
    if (selectedCompany) {
      // Actualiza el estado local (opcional) y los campos del formulario
      setSelectedCompany({
        name: selectedCompany.name,
        id: selectedCompany.id,
      });
      form.setValue("companieSelected.name", selectedCompany.name);
      form.setValue("companieSelected.id", selectedCompany.id);
    }
  };

  return (
    <Form {...form}>
      {/* Al hacer submit, llama a onSubmit */}
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Campo: Nombre del evento */}
        <FormField
          control={form.control}
          name="eventName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <Edit className="h-4 w-4 text-muted-foreground" />
                Nombre del Evento
              </FormLabel>
              <FormControl>
                <Input placeholder="Ej. Reunión de equipo" {...field} />
              </FormControl>
              <FormDescription className="text-sm text-muted-foreground">
                Asigna un nombre descriptivo para tu evento.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Campo: Selección de compañía */}
        <FormField
          control={form.control}
          name="companieSelected.name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <Building className="h-4 w-4 text-muted-foreground" />
                Compañía
              </FormLabel>
              <Select
                onValueChange={(newValue) => {
                  field.onChange(newValue);
                  handleCompanyChange(newValue);
                }}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona la compañía" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {companies.map((companie) => (
                    <SelectItem key={companie.id} value={companie.name}>
                      {companie.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Botón de acción (submit) */}
        <div className="flex justify-end pt-4">
          <Button type="submit" variant="default">
            Crear evento
          </Button>
        </div>
      </form>
    </Form>
  );
}
