import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default async function ListCompanies() {
    const { userId } = await auth();
  
    if (!userId) {
      return redirect("/");
    }
  
    // Obtener las empresas del usuario actual
    const companies = await prisma.company.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  
    return (
      <div className="p-6">
        <DataTable columns={columns} data={companies}  />
      </div>
    );
  }