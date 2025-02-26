"use client"

import { useState } from "react"
import type { Company } from "@prisma/client"
import { CompanyForm } from "./CompanyForm"
import { CompanyInformation } from "./CompanyInformation"
import { HeaderCompanyId } from "./Header/Header"

interface CompanyPageClientProps {
  company: Company
}

export function CompanyPageClient({ company }: CompanyPageClientProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [currentCompany, setCurrentCompany] = useState(company)

  const handleEditSuccess = (updatedCompany: Company) => {
    setCurrentCompany(updatedCompany)
    setIsEditing(false)
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <HeaderCompanyId companyId={company.id} onEdit={() => setIsEditing(true)} />

      <div className="space-y-6">
        {isEditing ? (
          <CompanyForm initialData={currentCompany} onSuccess={handleEditSuccess} />
        ) : (
          <CompanyInformation company={currentCompany} />
        )}
      </div>
    </div>
  )
}

