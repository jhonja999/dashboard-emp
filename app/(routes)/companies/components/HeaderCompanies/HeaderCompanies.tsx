// HeaderCompanies.tsx
"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CirclePlus } from "lucide-react";
import * as React from "react";
import { useState } from "react";
import { FormCreateCustomer } from "../FormCreateCustomer/FormCreateCustomer";

export function HeaderCompanies() {
  const [openModalCreate, setOpenModalCreate] = useState(false);

  return (
    <div className="flex items-center justify-between">
      <h2 className="text-2xl">List of companies</h2>
      <Dialog open={openModalCreate} onOpenChange={setOpenModalCreate}>
        <DialogTrigger asChild>
          <Button>
            <CirclePlus className="mr-2 h-4 w-4" />
            Create Company
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>Crea un Cliente</DialogTitle>
            <DialogDescription>
              Crea y Configura tu cliente!
            </DialogDescription>
          </DialogHeader>
          <FormCreateCustomer/>
        </DialogContent>
      </Dialog>
    </div>
  );
}