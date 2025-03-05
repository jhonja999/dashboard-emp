/**
 * Archivo: app/(routes)/companies/[companyId]/components/ContactList/ContactList.types.ts
 * Uso: Define los tipos de datos para los contactos y las propiedades que utiliza el componente ContactList.
 */

// Tipo Contact: Representa la información de un contacto asociado a una compañía
export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  companyId: string;
}

// Tipo ContactListProps: Define las propiedades que recibe el componente ContactList
export interface ContactListProps {
  companyId: string; // ID de la compañía a la que pertenecen los contactos
  contacts: Contact[]; // Lista de contactos
}
