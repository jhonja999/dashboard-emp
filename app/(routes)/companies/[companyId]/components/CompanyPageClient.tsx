//pagina individual de cada company
"use client";

import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { toast } from "sonner";
import type { Company, Contact } from "@prisma/client";
import { CompanyInformation } from "./CompanyInformation";
import { ContactList } from "./ContactList";
import { HeaderCompanyId } from "./Header";
import { CompanyForm } from "./CompanyForm/CompanyForm";
interface CompanyPageClientProps {
  company: Company;
}

export function CompanyPageClient({ company: initialCompany }: CompanyPageClientProps) {
  const [company, /* setCompany */] = useState<Company>(initialCompany);
  const [isEditing, setIsEditing] = useState(false);
  /* const [isContactDialogOpen, setIsContactDialogOpen] = useState(false); */
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoadingContacts, setIsLoadingContacts] = useState(true);


  // Fetch contacts for the company
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

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  return (
    <div className="space-y-6">
      {/* Header Component */}
      <HeaderCompanyId companyId={company.id} onEdit={() => setIsEditing(true)} />

      {/* Company Information */}
      {/* Conditional Rendering: Edit Mode or View Mode */}
      {isEditing ? (
        <CompanyForm initialData={company}/>
      ) : (
        <CompanyInformation company={company} />
      )}

      {/* Contact List */}
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
