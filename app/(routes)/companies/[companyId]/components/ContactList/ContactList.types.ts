// app/(routes)/companies/[companyId]/components/ContactList/ContactList.types.ts
export interface Contact {
    id: string;
    name: string;
    email: string;
    phone: string;
    position: string;
    companyId: string;
  }
  
  export interface ContactListProps {
    companyId: string;
    contacts: Contact[];
  }