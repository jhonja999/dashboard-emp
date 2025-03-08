/**
 * Archivo: app/(routes)/faqs/page.tsx
 * Uso: Página principal de FAQs sobre exploración minera NinaGold
 *      con imagen de fondo, Navbar, acordeón derivado de `AccordionFaqs.data.tsx`
 *      y la firma final del gerente.
 */

"use client";

import React, { useEffect, useState } from "react";
import "./components/faqs.css"; // Importa el CSS para aplicar estilos
import { NavBar } from "@/components/NavBar";
import { ManagerSignature } from "./components/ManagerSignature";
import AccordionFaqs from "./components/AccordionFaqs";

// Importa tu data (solo strings) desde AccordionFaqs.data.tsx
import { faqsData } from "./components/AccordionFaqs.data";
import { Footer } from "@/components/Footer";

export default function FaqsPage() {
  // Control de renderizado en cliente
  const [isClient, setIsClient] = useState(false);

  // Aseguramos que el componente solo se muestre en el cliente
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <div
      className="faqs-wrapper min-h-screen flex flex-col"
      style={{
        // Imagen de fondo a pantalla completa
        backgroundImage:
          "url('https://images.unsplash.com/photo-1637669886956-bf0e1cc4f0d3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDI4fHx8ZW58MHx8fHx8')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Navbar no protegida */}
      <NavBar />
      

      {/* Contenido principal en un contenedor semitransparente */}
      <main className="flex-1 flex flex-col items-center justify-center bg-black/70 text-white px-4 py-8">
        <div className="max-w-2xl w-full space-y-8  mt-16">
          {/* Encabezado */}
          <header className="text-center space-y-2">
            <h5 className="text-2xl font-bold underline">
              FAQ - Exploración Minera NinaGold
            </h5>
            <p className="text-sm text-gray-200">
              Conoce más sobre nuestra Política SIG y compromisos.
            </p>
          </header>

          {/* Acordeón con las preguntas frecuentes */}
          <AccordionFaqs faqs={faqsData} />

          {/* Sección final con la firma del gerente */}
          <section className="mt-8 bg-black/30 p-4 rounded-md">
            
            {/* Firma */}
            <div className="border border-gray-500 p-4 rounded-md">
            <h6 className="text-xl font-semibold mb-2 text-center underline text-[#d4af37]">Política SIG</h6>
            <p className="leading-relaxed mb-4 text-sm text-justify">
              Nuestra Política Integrada de Calidad, Medio Ambiente, Seguridad y
              Salud en el Trabajo define los lineamientos para desarrollar
              nuestras actividades con altos estándares, prevenir riesgos y
              cumplir con la normativa vigente.
            </p>

              <ManagerSignature />
            </div>
          </section>
          
        </div>
        
      </main>
      <Footer />
    </div>
  );
}
