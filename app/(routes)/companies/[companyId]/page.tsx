"use client";

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { CompanyDetails } from "@/components/CompanyDetails";

interface Params {
  params: {
    companyId: string;
  };
}

export default async function CompanyIdPage({ params }: Params) {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const { companyId } = params;

  // Obtener los detalles de la empresa desde la base de datos
  const company = await prisma.company.findUnique({
    where: {
      id: companyId,
      userId, // Asegúrate de que la empresa pertenezca al usuario autenticado
    },
  });

  if (!company) {
    return notFound();
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Detalles de la Empresa</h1>
      <CompanyDetails company={company} />
    </div>
  );
}
