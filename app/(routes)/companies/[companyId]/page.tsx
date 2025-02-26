import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { CompanyPageClient } from "./components/CompanyPageClient";

export default async function CompanyIdPage({
  params,
}: {
  params: { companyId: string };
}) {
  // Obtener usuario autenticado
  const { userId } = await auth();

  // Si no hay usuario, redirigir a la página de inicio
  if (!userId) {
    return redirect("/");
  }

  // Buscar la compañía en la base de datos
  const company = await prisma.company.findUnique({
    where: {
      id: params.companyId,
      userId: userId, // 🔹 Corregido: Falta el userId en la condición
    },
  });

  // Si no se encuentra la empresa, redirigir a inicio
  if (!company) {
    return redirect("/companies");
  }

  return (
    <CompanyPageClient company={company} />
  );
}
