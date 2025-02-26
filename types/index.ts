  // types.ts
export interface Business {
    id: string;
    name: string;
    description: string;
  }


export interface Company {
  id: string;
  userId: string;
  name: string;
  country: string;
  website: string | null; // Permitir null
  phone: string | null;   // Permitir null
  dni: string | null;     // Permitir null
  createdAt: Date;
  updatedAt: Date;
  imageUrl: string | null; // Permitir null
}