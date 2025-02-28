import { useState } from "react";
import {
  Mail,
  Phone,
  Pencil,
  Trash2,
  UserCircle2,
  Plus,
  MessageCircle,
  Calendar,
} from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import type { Contact } from "@prisma/client";
import { format } from "date-fns";
import { es } from "date-fns/locale";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ContactFormDialog } from "./ContactFormDialog";

interface ContactListProps {
  contacts: Contact[];
  companyId: string;
  onUpdate: () => void;
  isLoading?: boolean;
}

export function ContactList({
  contacts,
  companyId,
  onUpdate,
  isLoading,
}: ContactListProps) {
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleDelete = async (contactId: string) => {
    if (confirm("¿Estás seguro de eliminar este contacto?")) {
      try {
        await axios.delete(`/api/companies/${companyId}/contacts/${contactId}`);
        toast.success("Contacto eliminado exitosamente");
        onUpdate();
      } catch (error) {
        console.error("Error deleting contact:", error);
        toast.error("Error al eliminar el contacto");
      }
    }
  };

  const handleFormSuccess = () => {
    setIsFormOpen(false);
    setEditingContact(null);
    onUpdate();
  };

  const handleContactAction = (type: "email" | "phone", contact: Contact) => {
    if (type === "email") {
      window.location.href = `mailto:${contact.email}`;
    } else if (type === "phone" && contact.phone) {
      window.location.href = `tel:${contact.phone}`;
    }
  };

  const formatDate = (date: Date | string) => {
    return format(new Date(date), "PPP", { locale: es });
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <UserCircle2 className="h-5 w-5" />
              Contactos
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <p className="text-muted-foreground">Cargando contactos...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <UserCircle2 className="h-5 w-5" />
              Contactos
            </CardTitle>
            <Button
              onClick={() => {
                setEditingContact(null);
                setIsFormOpen(true);
              }}
              size="sm"
            >
              <Plus className="h-4 w-4 mr-2" />
              Agregar Contacto
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {contacts.length === 0 ? (
              <p className="text-muted-foreground text-center py-4">
                No hay contactos registrados
              </p>
            ) : (
              <div className="grid gap-4">
                {contacts.map((contact) => (
                  <div
                    key={contact.id}
                    className="flex flex-col md:flex-row md:items-center md:justify-between p-4 rounded-lg border bg-card space-y-4 md:space-y-0"
                  >
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-medium">{contact.name}</h3>
                        <span className="text-xs text-muted-foreground px-2 py-1 bg-muted rounded-full">
                          {contact.role}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <button
                          onClick={() => handleContactAction("email", contact)}
                          className="flex items-center gap-1 hover:text-primary transition-colors"
                        >
                          <Mail className="h-4 w-4" />
                          {contact.email}
                        </button>
                        {contact.phone && (
                          <button
                            onClick={() =>
                              handleContactAction("phone", contact)
                            }
                            className="flex items-center gap-1 hover:text-primary transition-colors"
                          >
                            <Phone className="h-4 w-4" />
                            {contact.phone}
                          </button>
                        )}
                      </div>
                      {/* Display Start Date */}
                      <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                        <Calendar className="h-4 w-4" />
                        <span className="italic">
                          Inicio: {formatDate(contact.startDate)}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 justify-end md:justify-normal">
                      <div className="flex items-center gap-2 mr-2 md:mr-4">
                        {contact.phone && (
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() =>
                              handleContactAction("phone", contact)
                            }
                            title="Llamar"
                            className="bg-green-400 hover:bg-green-700"
                          >
                            <Phone className="h-4 w-4" />
                          </Button>
                        )}
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleContactAction("email", contact)}
                          title="Enviar email"
                          className="bg-slate-400 hover:bg-slate-600"
                        >
                          <MessageCircle className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex items-center gap-2 border-l pl-2 md:pl-4">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setEditingContact(contact);
                            setIsFormOpen(true);
                          }}
                          className="bg-blue-400 hover:bg-blue-600"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(contact.id)}
                          className="bg-red-400 hover:bg-red-300"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <ContactFormDialog
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        companyId={companyId}
        contact={editingContact}
        onSuccess={handleFormSuccess}
      />
    </>
  );
}
