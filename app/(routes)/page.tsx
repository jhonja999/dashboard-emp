/* 
Home
placeholders 

imageUrl="https://images.unsplash.com/photo-1517089152318-42ec560349c0?q=80&w=1548&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

imageUrl="https://images.unsplash.com/photo-1587919968590-fbc98cea6c9a?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

imageUrl="https://images.unsplash.com/photo-1599756719094-9e28479389c4?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

*/
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
 * Componente principal de la página de inicio.
 * Incluye todas las secciones: Hero, Acerca de, Servicios, Estadísticas, Proyectos y Contacto.
 * Se utiliza un estado para controlar el renderizado en el lado del cliente.
 */
export default function Inicio() {
  const [esCliente, setEsCliente] = useState(false);
  const seccionRef = useRef<HTMLDivElement>(null);

  // Efecto que asegura que el componente se renderice solo en el cliente
  useEffect(() => {
    setEsCliente(true);
  }, []);

  // Si todavía no se confirma el renderizado en el cliente, no mostramos nada
  if (!esCliente) return null;

  return (
    <div ref={seccionRef} className="relative">
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

      {/* Sección de "Acerca de" */}
      <section id="acerca" className="bg-[#111111]">
        <AboutSection />
      </section>

      {/* Sección de "Servicios" (Expertise) */}
      <section id="servicios" className="relative">
        <ParallaxSection
          imageUrl="https://images.unsplash.com/photo-1587919968590-fbc98cea6c9a?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          overlayColor="rgba(17, 17, 17, 0.85)"
          height="auto"
        >
          <ExpertiseSection />
        </ParallaxSection>
      </section>

      {/* Sección de estadísticas */}
      <section
        id="estadisticas"
        className="bg-[#111111]/90 backdrop-blur-sm py-12"
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
          <ProjectsSection />
        </ParallaxSection>
      </section>

      {/* Sección de contacto */}
      <section id="contacto" className="bg-[#111111]">
        <ContactSection />
      </section>

      {/* Pie de página */}
      <Footer />
    </div>
  );
}
