/**
 * Archivo: app/(routes)/tasks/components/Calendar.tsx
 * Uso: Componente cliente que muestra un calendario con FullCalendar y un panel lateral
 *      con una lista de eventos (tareas). Permite crear y eliminar eventos.
 */
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import multiMonthPlugin from "@fullcalendar/multimonth";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import { DateSelectArg, EventContentArg } from "@fullcalendar/core";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";

import axios from "axios";
import { toast } from "sonner"; // Para notificaciones de éxito/error
import { formatDate } from "@/lib/formatDate"; // Función para formatear fechas

import type { CalendarProps } from "./Calendar.types";
import { ModalAddEvent } from "../ModalAddEvent";
import { Trash2Icon } from "lucide-react";

/**
 * Componente principal: Calendar
 * - Muestra un panel lateral con la lista de eventos (tareas).
 * - Muestra un FullCalendar para visualizar y crear eventos.
 * - Permite eliminar eventos tanto desde el panel lateral como al hacer click en el calendario.
 */
export function Calendar({ companies, events }: CalendarProps) {
  const router = useRouter();

  // Controla la apertura del modal para crear un nuevo evento
  const [open, setOpen] = useState(false);

  // Indica si se ha confirmado la creación de un nuevo evento en el modal
  const [onSaveNewEvent, setOnSaveNewEvent] = useState(false);

  // Guarda la información de la selección de fecha en el calendario
  const [selectedItem, setSelectedItem] = useState<DateSelectArg>();

  // Objeto que almacena los datos de un nuevo evento (nombre, compañía, etc.)
  const [newEvent, setNewEvent] = useState({
    eventName: "",
    companieSelected: {
      name: "",
      id: "",
    },
  });

  // Estado de carga para mostrar un overlay mientras se procesan solicitudes (POST/DELETE)
  const [loading, setLoading] = useState(false);

  /**
   * useEffect: Se activa cuando onSaveNewEvent cambia a true, indicando que el
   * usuario confirmó la creación de un evento en el modal.
   */
  useEffect(() => {
    // Verifica que haya una selección de fecha válida en el calendario
    if (onSaveNewEvent && selectedItem?.view.calendar) {
      const createEvent = async () => {
        setLoading(true);
        try {
          // Deselecciona el rango de fechas en el calendario
          const calendarApi = selectedItem.view.calendar;
          calendarApi.unselect();

          // Calcula fecha de inicio y fin (por defecto, duración de 1 hora)
          const startDate = new Date(selectedItem.start);
          const endDate = new Date(startDate);
          endDate.setHours(startDate.getHours() + 1);

          // Obtiene los datos de la compañía y el título del evento
          const companyId = newEvent.companieSelected.id || "";
          const eventTitle = newEvent.eventName.trim() || "Evento";

          // Objeto a enviar al endpoint de creación
          const newEventPrisma = {
            companyId,
            // Se asume que agregaste companyName en tu schema, si no, omite esta línea:
            companyName: newEvent.companieSelected.name || "Sin compañía",
            title: eventTitle,
            start: startDate,
            endDate,
            allDay: false,
            timeFormat: "HH:mm",
          };

          // Llamada POST al endpoint /api/companies/[companyId]/event
          await axios.post(`/api/companies/${companyId}/event`, newEventPrisma);

          toast.success("Evento creado exitosamente");
          router.refresh(); // Actualiza la página para mostrar el nuevo evento
        } catch (error) {
          console.error("Error al crear el evento:", error);
          toast.error("Error al crear el evento");
        } finally {
          // Limpia el estado del nuevo evento y la bandera de onSaveNewEvent
          setNewEvent({
            eventName: "",
            companieSelected: { name: "", id: "" },
          });
          setOnSaveNewEvent(false);
          setLoading(false);
        }
      };

      // Llama a la función asíncrona para crear el evento
      createEvent();
    }
  }, [
    onSaveNewEvent,
    selectedItem,
    newEvent.companieSelected.id,
    newEvent.eventName,
    router,
    newEvent.companieSelected.name,
  ]);

  /**
   * handleDateClick: Maneja la selección de fecha/rango en el calendario.
   * - Abre el modal para crear un nuevo evento.
   */
  const handleDateClick = (selected: DateSelectArg) => {
    setOpen(true);
    setSelectedItem(selected);
  };

  /**
   * handleEventClick: Maneja el clic en un evento dentro del calendario.
   * - Pregunta confirmación y, si se confirma, elimina el evento.
   */
  const handleEventClick = async (selected: {
    event: { title: string; _def: { publicId: string } };
  }) => {
    if (
      window.confirm(
        `¿Estás seguro que deseas eliminar este evento: ${selected.event.title}?`
      )
    ) {
      try {
        setLoading(true);
        // Endpoint para eliminar un evento con ID publicId
        await axios.delete(`/api/event/${selected.event._def.publicId}`);
        toast.success("Evento eliminado");
        router.refresh();
      } catch (error) {
        console.error("Error al eliminar el evento:", error);
        toast.error("Algo salió mal");
      } finally {
        setLoading(false);
      }
    }
  };

  /**
   * handleListDelete: Elimina un evento directamente desde la lista de tareas
   * en el panel lateral (sin usar el calendario).
   */
  const handleListDelete = async (eventId: string, eventTitle: string) => {
    if (
      window.confirm(
        `¿Estás seguro que deseas eliminar el evento: ${eventTitle}?`
      )
    ) {
      try {
        setLoading(true);
        // Endpoint para eliminar un evento usando su ID
        await axios.delete(`/api/event/${eventId}`);
        toast.success("Evento eliminado");
        router.refresh();
      } catch (error) {
        console.error("Error al eliminar el evento:", error);
        toast.error("Algo salió mal");
      } finally {
        setLoading(false);
      }
    }
  };

  /**
   * renderEventContent: Render personalizado de cada evento dentro del calendario.
   * - Puedes ajustar estilos o layout según tus necesidades.
   */
  function renderEventContent(eventInfo: EventContentArg) {
    return (
      <div className="w-full p-1 bg-slate-500/60 dark:bg-background">
        <p>{eventInfo.event.title}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row gap-3">
      {/* Panel izquierdo: listado de eventos */}
      <div className="md:w-64 w-full md:h-auto h-auto">
        <p className="mb-3 text-xl">Listado de tareas</p>
        {/* Contenedor scrollable para eventos */}
        <div className="max-h-[70vh] overflow-y-auto space-y-2">
          {events.map((currentEvent) => (
            <div
              key={currentEvent.id}
              className="p-4 rounded-lg shadow-md mb-2 bg-slate-200 dark:bg-background"
            >
              <div className="flex justify-between items-center">
                <p className="font-bold">{currentEvent.title}</p>
                {/* Botón para eliminar */}
                <button
                  onClick={() =>
                    handleListDelete(currentEvent.id, currentEvent.title)
                  }
                  className="text-red-600 hover:text-red-400 ml-2"
                >
                  <Trash2Icon className="w-5" />
                </button>
              </div>
              {/* Fecha de inicio del evento */}
              <p>{formatDate(currentEvent.start)}</p>
              {/* Nombre de la compañía si existe */}
              {currentEvent.companyName ? (
                <p>Compañía: {currentEvent.companyName}</p>
              ) : (
                <p className="italic text-sm">Sin compañía</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Calendario principal (derecha) */}
      <div className="flex-1 calendar-container">
        <FullCalendar
          plugins={[
            dayGridPlugin,
            timeGridPlugin,
            interactionPlugin,
            listPlugin,
            multiMonthPlugin,
          ]}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right:
              "timeGridDay,timeGridWeek,dayGridMonth,multiMonthYear,listMonth",
          }}
          height="80vh"
          initialView="dayGridMonth"
          weekends={true}
          events={events}
          eventContent={renderEventContent}
          editable={true}
          selectable={true}
          selectMirror={true}
          select={handleDateClick}
          eventClick={handleEventClick}
        />
      </div>

      {/* Modal para agregar un nuevo evento */}
      <ModalAddEvent
        open={open}
        setOpen={setOpen}
        setOnSaveNewEvent={setOnSaveNewEvent}
        companies={companies}
        setNewEvent={setNewEvent}
      />

      {/* Overlay de carga si loading es true */}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30">
          <p className="bg-white px-4 py-2 rounded shadow">Procesando...</p>
        </div>
      )}
    </div>
  );
}
