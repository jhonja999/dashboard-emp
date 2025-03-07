"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ui/theme-toggle";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { Menu, X, LayoutDashboard } from "lucide-react";

/**
 * Representa un ítem de navegación.
 * - label: El texto a mostrar.
 * - href: La ruta a la que se dirige el enlace.
 * - id: Identificador para hacer "scroll spy" y resaltar la sección activa.
 */
interface NavItem {
  label: string;
  href: string;
  id: string; // Se utiliza para comparar con la sección activa
}

/**
 * Items de navegación para las distintas secciones de la página.
 * Ajusta 'href' según tu routing ("/#inicio", "/#acerca", etc.) o rutas separadas.
 */
const navItems: NavItem[] = [
  { label: "Home", href: "/#inicio", id: "inicio" },
  { label: "About", href: "/#acerca", id: "acerca" },
  { label: "Services", href: "/#servicios", id: "servicios" },
  { label: "Projects", href: "/#proyectos", id: "proyectos" },
  { label: "Contact", href: "/#contacto", id: "contacto" },
];

/**
 * Barra de navegación con:
 * - Efecto "glass" (blur) al hacer scroll.
 * - Detección de sección activa (scroll spy).
 * - Integración con Clerk para autenticación.
 * - Menú responsivo para móvil.
 */
export function NavBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("inicio");
  const { scrollY } = useScroll();
  const router = useRouter();

  // Efecto "glass": cambia de transparente a un fondo oscuro con blur al hacer scroll
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ["rgba(17, 17, 17, 0)", "rgba(17, 17, 17, 0.9)"] // Un poco más oscuro que #1c1c1c
  );
  
  // Solución al problema de TypeScript con backdropBlur
  const backdropBlur = useTransform(
    scrollY, 
    [0, 100], 
    ["blur(0px)", "blur(12px)"]
  );

  // Borde sutil con opacidad que aumenta al hacer scroll
  const borderOpacity = useTransform(
    scrollY,
    [0, 100],
    [0, 0.15]
  );

  // Detecta la sección activa mientras se hace scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section[id]");
      const scrollPosition = window.scrollY + 100;

      sections.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top + window.scrollY;
        const sectionId = section.getAttribute("id") || "";

        // Ajusta la lógica según la altura de cada sección si deseas más precisión
        if (
          scrollPosition >= sectionTop &&
          scrollPosition < sectionTop + (section as HTMLElement).offsetHeight
        ) {
          setActiveSection(sectionId);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      className="fixed top-0 w-full z-50"
      style={{
        backgroundColor,
        backdropFilter: backdropBlur,
        borderBottom: `1px solid rgba(212, 175, 55, ${borderOpacity})`,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Contenedor principal: logo, nav, auth, menú móvil */}
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Logo />

          {/* Navegación de escritorio */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className={`text-[#f7f2e8] hover:text-[#d4af37] relative transition-colors ${
                  activeSection === item.id ? "text-[#d4af37]" : ""
                }`}
              >
                {item.label}
                {/* Indicador animado para la sección activa */}
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#d4af37]"
                    transition={{ type: "spring", stiffness: 300 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Autenticación y cambio de tema */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />

            {/* Si el usuario está logueado, muestra Dashboard y UserButton */}
            <SignedIn>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  className="hidden md:flex text-[#d4af37] hover:bg-[#d4af37]/10"
                  onClick={() => router.push("/dashboard")}
                >
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Dashboard
                </Button>
                <UserButton afterSignOutUrl="/" />
              </div>
            </SignedIn>

            {/* Si no está logueado, muestra Sign In */}
            <SignedOut>
              <SignInButton mode="modal">
                <Button
                  variant="outline"
                  className="hidden md:flex text-[#d4af37] border-[#d4af37] hover:bg-[#d4af37]/20"
                >
                  Sign In
                </Button>
              </SignInButton>
            </SignedOut>

            {/* Botón para abrir/cerrar menú móvil */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-[#d4af37]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>

        {/* Menú móvil */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden py-4 border-t border-[#d4af37]/20"
          >
            <div className="flex flex-col space-y-4 pt-2 pb-4">
              {navItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`text-[#f7f2e8] hover:text-[#d4af37] px-4 py-2 transition-colors ${
                    activeSection === item.id 
                      ? "text-[#d4af37] bg-[#d4af37]/10 rounded" 
                      : ""
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}

              {/* Si no está logueado: botón de Sign In en móvil */}
              <SignedOut>
                <div className="pt-2 px-4">
                  <SignInButton mode="modal">
                    <Button className="w-full bg-[#d4af37] text-[#1c1c1c] hover:bg-[#b58f2d]">
                      Sign In
                    </Button>
                  </SignInButton>
                </div>
              </SignedOut>

              {/* Si está logueado: botón de Dashboard y UserButton en móvil */}
              <SignedIn>
                <div className="flex flex-col space-y-2 px-4">
                  <div className="flex justify-center py-2">
                    <UserButton afterSignOutUrl="/" />
                  </div>
                  <Button
                    className="w-full bg-[#d4af37]/20 text-[#d4af37] hover:bg-[#d4af37]/30"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      router.push("/dashboard");
                    }}
                  >
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    Dashboard
                  </Button>
                </div>
              </SignedIn>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}