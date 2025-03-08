"use client";

import { useEffect, useState, useRef } from "react";
import { ParallaxSection } from "@/components/ParallaxSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { NavBar } from "@/components/NavBar";
import { AboutSection } from "@/components/sections/AboutSection";
import { ExpertiseSection } from "@/components/sections/ExpertiseSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Footer } from "@/components/Footer";

/**
 * Página de inicio "Home" principal con secciones: Hero, Acerca, Servicios, Estadísticas, Proyectos y Contacto.
 * "use client" para manejar estados/efectos en el cliente.
 */
export default function Inicio() {
  const [esCliente, setEsCliente] = useState(false);
  const seccionRef = useRef<HTMLDivElement>(null);

  // Efecto para asegurar renderizado en el cliente
  useEffect(() => {
    setEsCliente(true);
  }, []);

  // Evita mostrar contenido antes de confirmar que estamos en cliente
  if (!esCliente) return null;

  return (
    <div
      ref={seccionRef}
      className="relative overflow-x-hidden bg-[#111111]"
    >
      {/* Barra de navegación */}
      <NavBar />

      {/* Sección de inicio (Hero) */}
      <section id="inicio" className="relative">
        <ParallaxSection
          imageUrl="https://images.unsplash.com/photo-1517089152318-42ec560349c0?q=80&w=1548&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          overlayColor="rgba(17, 17, 17, 0.7)"
          height="100vh"
        >
          <HeroSection />
        </ParallaxSection>
      </section>

      {/* Sección "Acerca de" */}
      <section
        id="acerca"
        className="bg-[#111111] py-20 px-4 sm:px-6 md:px-8"
      >
        <AboutSection />
      </section>

      {/* Sección "Servicios" (Expertise) */}
      <section id="servicios" className="relative">
        <ParallaxSection
          imageUrl="https://images.unsplash.com/photo-1587919968590-fbc98cea6c9a?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          overlayColor="rgba(17, 17, 17, 0.85)"
          height="auto"
        >
          <div className="py-20 px-4 sm:px-6 md:px-8">
            <ExpertiseSection />
          </div>
        </ParallaxSection>
      </section>

      {/* Sección de estadísticas */}
      <section
        id="estadisticas"
        className="bg-[#111111]/90 backdrop-blur-sm py-20 px-4 sm:px-6 md:px-8"
      >
        <StatsSection />
      </section>

      {/* Sección de proyectos */}
      <section id="proyectos" className="relative">
        <ParallaxSection
          imageUrl="https://images.unsplash.com/photo-1599756719094-9e28479389c4?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          overlayColor="rgba(17, 17, 17, 0.85)"
          height="auto"
        >
          <div className="py-20 px-4 sm:px-6 md:px-8">
            <ProjectsSection />
          </div>
        </ParallaxSection>
      </section>

      {/* Sección de contacto */}
      <section
        id="contacto"
        className="bg-[#111111] py-20 px-4 sm:px-6 md:px-8"
      >
        <ContactSection />
      </section>

      {/* Pie de página */}
      <Footer />
    </div>
  );
}
