import { Building } from "lucide-react";
import { CustomIcon } from "@/components/CustomIcon";
import CustomersTable from "../CustomersTable/CustomersTable";

export function LastCustomers() {
  return (
    <div className="p-5 rounded-lg shadow-sm bg-background">
      <div className="flex items-center gap-x-2">
        <CustomIcon icon={Building} />
        <p className="text-lg font-semibold text-primary">Last customers</p>
      </div>
      <div>
        <CustomersTable />
      </div>
    </div>
  );
}
