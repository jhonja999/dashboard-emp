import DashboardContent from "@/components/dashboard/DashboardContent";
import { HeaderCompanies } from "./components/HeaderCompanies/HeaderCompanies";
import ListCompanies from "./components/ListCompanies/ListCompanies";

export default function CompaniesPage() {
  return (
    <DashboardContent>
        <HeaderCompanies />
        <ListCompanies />
    </DashboardContent>
  )
}
