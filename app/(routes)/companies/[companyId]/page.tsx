// app/(routes)/companies/[companyId]/page.tsx

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import DashboardContent from "@/components/dashboard/DashboardContent";
import { CompanyPageClient } from "./components/CompanyPageClient";

export default async function CompanyIdPage({
  params,
}: {
  params: { companyId: string };
}) {
  const { userId } = await auth();
  if (!userId) {
    return redirect("/");
  }

  const company = await prisma.company.findUnique({
    where: { id: params.companyId, userId },
    include: { Contact: true },
  });

  if (!company) {
    return redirect("/companies");
  }

  return (
    <DashboardContent>
      <CompanyPageClient company={company} />
    </DashboardContent>
  );
}
