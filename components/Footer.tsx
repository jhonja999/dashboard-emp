"use client";
import { Logo } from "./Logo";
import { Mail, MapPin, Phone } from "lucide-react";
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin 
} from "lucide-react";

/**
 * Footer principal de la aplicación con:
 * - Iconos de Lucide React reales
 * - IDs sincronizados con el navbar
 * - Mejoras de accesibilidad
 */
export function Footer() {
  return (
    <footer className="bg-[#1c1c1c] border-t border-[#d4af37]/20 pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Columna 1: Logo + redes sociales */}
          <div className="space-y-4">
            <Logo />
            <p className="text-[#f4f4f4]/70 mt-4">
              Innovando la exploración minera con tecnología de vanguardio y practicas sostenibes desde 1998.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: <Facebook />, href: "#" },
                { icon: <Twitter />, href: "#" },
                { icon: <Instagram />, href: "#" },
                { icon: <Linkedin />, href: "#" }
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 rounded-full flex items-center justify-center border border-[#d4af37]/30 text-[#d4af37] hover:bg-[#d4af37]/20 transition-colors"
                >
                  {social.icon}
                  <span className="sr-only">
                    {social.href.replace(/#/g, '') || 'social'}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Columna 2: Navegación con IDs sincronizados */}
          <div>
            <h3 className="text-[#d4af37] font-bold text-xl mb-4">Navigation</h3>
            <ul className="space-y-3">
              {[
                { label: "Home", href: "/#inicio" },
                { label: "About", href: "/#acerca" },
                { label: "Services", href: "/#servicios" },
                { label: "Projects", href: "/#proyectos" },
                { label: "Contact", href: "/#contacto" }
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-[#f4f4f4]/70 hover:text-[#d4af37] transition-colors block"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 3: Servicios */}
          <div>
            <h3 className="text-[#d4af37] font-bold text-xl mb-4">Services</h3>
            <ul className="space-y-3">
              {[
                "Geological Mapping",
                "Resource Estimation",
                "Feasibility Studies",
                "Environmental Monitoring",
                "Project Management",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-[#f4f4f4]/70 hover:text-[#d4af37] transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 4: Contacto con iconos */}
          <div>
            <h3 className="text-[#d4af37] font-bold text-xl mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center text-[#f4f4f4]/70">
                <MapPin className="h-5 w-5 mr-3 text-[#d4af37]" />
                <span>123 Jr. Cajamarca, Cajamarca, Perú</span>
              </li>
              <li className="flex items-center text-[#f4f4f4]/70">
                <Phone className="h-5 w-5 mr-3 text-[#d4af37]" />
                <span>+1 (555) 123 4567</span>
              </li>
              <li className="flex items-center text-[#f4f4f4]/70">
                <Mail className="h-5 w-5 mr-3 text-[#d4af37]" />
                <span>info@ninagold.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copy con año dinámico */}
        <div className="border-t border-[#d4af37]/10 pt-6 text-center text-[#f4f4f4]/50">
          <p>&copy; {new Date().getFullYear()} NinaGold. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}