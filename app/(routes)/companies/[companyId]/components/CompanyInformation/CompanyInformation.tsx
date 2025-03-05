/**
 * app\(routes)\companies\[companyId]\components\CompanyInformation\CompanyInformation.tsx
 * Uso: Componente que muestra la información detallada de una empresa, incluyendo su imagen, país, sitio web, teléfono y DNI.
 */

"use client";

import type { CompanyInformationProps } from "./CompanyInformation.types"; // Tipo de propiedades que recibe el componente
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe, Phone, MapPin, IdCardIcon } from "lucide-react";
import Image from "next/image";

/**
 * Componente CompanyInformation: Renderiza un card con la información de la empresa.
 * @param {CompanyInformationProps} company - Objeto que contiene los datos de la empresa.
 */
export function CompanyInformation({ company }: CompanyInformationProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Información de la Empresa</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0">
              {/* Muestra la imagen de la empresa o un placeholder si no está disponible */}
              <Image
                src={company.imageUrl || "/placeholder.webp"}
                alt={company.name}
                width={200}
                height={200}
                className="rounded-lg object-cover"
              />
            </div>

            <div className="space-y-4">
              {/* Nombre de la empresa */}
              <h2 className="text-2xl font-bold">{company.name}</h2>

              {/* Datos relevantes de la empresa en un grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                  <span>{company.country}</span>
                </div>

                {company.website && (
                  <div className="flex items-center gap-2">
                    <Globe className="h-5 w-5 text-muted-foreground" />
                    <a
                      href={company.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      {company.website}
                    </a>
                  </div>
                )}

                {company.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="h-5 w-5 text-muted-foreground" />
                    <span>{company.phone}</span>
                  </div>
                )}

                {company.dni && (
                  <div className="flex items-center gap-2">
                    <IdCardIcon className="h-5 w-5 text-muted-foreground" />
                    <span>DNI: {company.dni}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
