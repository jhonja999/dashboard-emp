"use client"
import React, { useState } from "react";
import { PlusCircle as CirclePlus, User } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { CompanyForm } from "../FormCreateCustomer";
import { useAuth } from "@clerk/nextjs";


export function HeaderCompanies() {
  const [openModalCreate, setOpenModalCreate] = useState(false);
  const { userId } = useAuth();
  
  if (!userId) {
    return <p>No estás autenticado</p>;
  }
  


  return (
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-2xl font-bold text-gray-900">List of companies</h2>
      <Dialog open={openModalCreate} onOpenChange={setOpenModalCreate}>
        <DialogTrigger asChild>
          <Button>
            <CirclePlus className="mr-2 h-4 w-4" />
            Create Company
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>
              <div className="flex items-center gap-3">
                <User className="h-6 w-6 text-blue-500" />
                <span className="text-xl font-semibold">
                  Crear Nuevo Cliente
                </span>
              </div>
            </DialogTitle>
            <DialogDescription>Crea y Configura tu cliente!</DialogDescription>
          </DialogHeader>
          <CompanyForm userId={userId} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
