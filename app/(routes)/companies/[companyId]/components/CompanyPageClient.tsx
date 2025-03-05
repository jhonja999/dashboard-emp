/**
 * Archivo: app/(routes)/companies/[companyId]/components/CompanyPageClient.tsx
 * Uso: Página individual de cada compañía. Muestra la información de la compañía, sus contactos y permite editar sus datos.
 */

"use client";

import { useState, useEffect, useCallback } from "react"; // Importa hooks de React para manejar estado, efectos y funciones memoizadas
import axios from "axios"; // Importa axios para realizar solicitudes HTTP
import { toast } from "sonner"; // Importa la librería sonner para mostrar notificaciones
import type { Company, Contact } from "@prisma/client"; // Importa tipos de Prisma para la compañía y contactos
import { CompanyInformation } from "./CompanyInformation"; // Componente que muestra información detallada de la compañía
import { ContactList } from "./ContactList"; // Componente que muestra la lista de contactos asociados a la compañía
import { HeaderCompanyId } from "./Header"; // Componente que muestra la cabecera con opciones para la compañía
import { CompanyForm } from "./CompanyForm/CompanyForm"; // Componente para editar la información de la compañía
// Define las propiedades que recibe el componente CompanyPageClient
interface CompanyPageClientProps {
  company: Company;
}
// Componente CompanyPageClient: Renderiza la página individual de la compañía con información, contactos y opción de edición
export function CompanyPageClient({ company: initialCompany }: CompanyPageClientProps) {
  const [company, setCompany] = useState<Company>(initialCompany); // Estado local para la compañía
  const [isEditing, setIsEditing] = useState(false); // Controla si la compañía está en modo edición
  const [/* isContactDialogOpen */, /* setIsContactDialogOpen */] = useState(false); // Estado (comentado) para un diálogo de contactos
  const [contacts, setContacts] = useState<Contact[]>([]); // Lista de contactos asociados a la compañía
  const [isLoadingContacts, setIsLoadingContacts] = useState(true); // Controla el estado de carga de contactos

  // Función para obtener los contactos de la compañía desde la API
  const fetchContacts = useCallback(async () => {
    try {
      setIsLoadingContacts(true);
      const response = await axios.get(`/api/companies/${company.id}/contacts`);
      setContacts(response.data);
    } catch (error) {
      console.error("Error fetching contacts:", error);
      toast.error("Error al cargar los contactos");
    } finally {
      setIsLoadingContacts(false);
    }
  }, [company.id]);

  // Efecto para cargar los contactos al montar el componente o cuando cambie el ID de la compañía
  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  // Maneja la actualización de la compañía (después de editarla)
  const handleCompanyUpdate = (updatedCompany: Company) => {
    setCompany(updatedCompany);
    setIsEditing(false);
    // Se podría refrescar la lista de contactos si la información de la compañía afecta a los contactos
    fetchContacts();
  };

  // Maneja la cancelación de la edición
  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      {/* Encabezado de la compañía */}
      <HeaderCompanyId companyId={company.id} onEdit={() => setIsEditing(true)} />

      {/* Información de la compañía */}
      {isEditing ? (
        <CompanyForm
          initialData={company}
          onSuccess={handleCompanyUpdate}
          onCancel={handleCancelEdit}
        />
      ) : (
        <CompanyInformation company={company} />
      )}

      {/* Lista de contactos */}
      <div className="space-y-4">
        <ContactList
          contacts={contacts}
          companyId={company.id}
          onUpdate={fetchContacts}
          isLoading={isLoadingContacts}
        />
      </div>
    </div>
  );
}
