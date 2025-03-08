"use client";

import Image from "next/image";
import * as React from "react";

/**
 * ManagerSignature
 * Muestra la fecha de revisión, el nombre de la empresa y una firma placeholder.
 */
export function ManagerSignature() {
  return (
    <div className="mt-6 border-t pt-4 text-center space-y-1">
      {/* Datos de revisión */}
      <p className="italic text-sm">Fecha de revisión: 24-01-2025 | Rev.: 02</p>

      {/* Nombre de la empresa / gerente */}
      <p className="font-semibold">NINA GOLD PERU E.I.R.L.</p>
      <p className="text-sm">Gerente General - NINA GOLD PERU E.I.R.L.</p>

      {/* Imagen de firma placeholder */}
      <div className="flex justify-center mt-2">
        <Image
          src="https://via.placeholder.com/150x50"
          alt="Firma del gerente"
          className="border border-gray-300"
          width={50}
          height={50}
        />
      </div>
    </div>
  );
}
