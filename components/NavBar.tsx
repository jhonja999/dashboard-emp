"use client";

import { useState, useEffect } from "react";
import { motion, useScroll } from "framer-motion"; // Eliminamos 'useTransform' ya que no se usa
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ui/theme-toggle";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { Menu, X, LayoutDashboard } from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  id: string;
}

const navItems: NavItem[] = [
  { label: "Home", href: "/#inicio", id: "inicio" },
  { label: "About", href: "/#acerca", id: "acerca" },
  { label: "Services", href: "/#servicios", id: "servicios" },
  { label: "Projects", href: "/#proyectos", id: "proyectos" },
  { label: "Contact", href: "/#contacto", id: "contacto" },
];

export function NavBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolledOrMenuOpen, setIsScrolledOrMenuOpen] = useState(false); // Eliminamos 'activeSection' ya que no se usa
  const { scrollY } = useScroll();
  const router = useRouter();

  // Detecta si hay scroll o si el menú está abierto
  useEffect(() => {
    const handleScroll = () => {
      if (scrollY.get() > 10) {
        setIsScrolledOrMenuOpen(true);
      } else {
        setIsScrolledOrMenuOpen(false);
      }
    };

    const unsubscribeScroll = scrollY.onChange(handleScroll);

    return () => {
      unsubscribeScroll();
    };
  }, [scrollY]);

  // Detecta cambios en el estado del menú móvil
  useEffect(() => {
    if (mobileMenuOpen) {
      setIsScrolledOrMenuOpen(true);
    } else {
      if (scrollY.get() <= 10) {
        setIsScrolledOrMenuOpen(false);
      }
    }
  }, [mobileMenuOpen, scrollY]);

  return (
    <motion.nav
      className="fixed top-0 w-full z-50"
      style={{
        backgroundColor: isScrolledOrMenuOpen
          ? "rgba(17, 17, 17, 0.9)"
          : "transparent",
        backdropFilter: isScrolledOrMenuOpen ? "blur(12px)" : "none",
        borderBottom: isScrolledOrMenuOpen
          ? "1px solid rgba(212, 175, 55, 0.15)"
          : "none",
        transition: "background-color 0.3s, backdrop-filter 0.3s",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Logo />

          {/* Navegación Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className="text-[#f7f2e8] hover:text-[#d4af37] relative transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Autenticación y Cambio de Tema */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />

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

            {/* Botón Menú Móvil */}
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

        {/* Menú Móvil */}
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
                  className="text-[#f7f2e8] hover:text-[#d4af37] px-4 py-2 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}

              <SignedOut>
                <div className="pt-2 px-4">
                  <SignInButton mode="modal">
                    <Button className="w-full bg-[#d4af37] text-[#1c1c1c] hover:bg-[#b58f2d]">
                      Sign In
                    </Button>
                  </SignInButton>
                </div>
              </SignedOut>

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