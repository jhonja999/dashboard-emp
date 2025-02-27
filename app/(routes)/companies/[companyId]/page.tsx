import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { CompanyPageClient } from "./components/CompanyPageClient";
import { ThemeToggle } from "@/components/ui/theme-toggle";

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
    where: { id: params.companyId, userId },
    include: { Contact: true }, // Fetch associated contacts
  });

  // Si no se encuentra la empresa, redirigir a inicio
  if (!company) {
    return redirect("/companies");
  }

  return (
    <div>
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>
      <CompanyPageClient company={company} />
    </div>
  );
}