/* eslint-disable @next/next/no-img-element */
"use client";

import { Logo } from "./Logo";
import { Facebook, Twitter, Instagram, Linkedin, Mail } from "lucide-react";

/**
 * Footer principal de la aplicación con:
 * - Logo DFP y redes sociales
 * - Secciones: Encuéntranos, Escríbenos, Links de interés
 * - Copyright final
 * <footer className="bg-[#0e2d3c] text-white pt-12 pb-6">
 */
export function Footer() {
  return (
    <footer className="bg-[#1f405337] border-t border-[#d4af37]/20 pt-12 pb-6">
      <div className="container mx-auto px-4">
        {/* GRID PRINCIPAL: 4 columnas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Columna 1: Logo + redes sociales */}
          <div className="space-y-4">
            <div className="-mt-6">
              <Logo />
            </div>
            <div className="flex space-x-4">
              {[
                { icon: <Facebook />, href: "#" },
                { icon: <Linkedin />, href: "#" },
                { icon: <Instagram />, href: "#" },
                { icon: <Twitter />, href: "#" },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 rounded-full flex items-center justify-center border border-white/20 text-white hover:bg-white/10 transition-colors"
                >
                  {social.icon}
                  <span className="sr-only">
                    {social.href.replace(/#/g, "") || "social"}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Columna 2: Encuéntranos */}
          <div>
            <h3 className="text-white font-bold text-xl mb-4">ENCUÉNTRANOS</h3>

            <p className="text-[#f4f4f4]/70 mt-3 pb-4">
              Innovando la exploración minera con tecnología de vanguardio y
              practicas sostenibes desde 1998.
            </p>
          </div>

          {/* Columna 3: Escríbenos */}
          <div>
            <h3 className="text-white font-bold text-xl mb-4">ESCRÍBENOS</h3>
            <ul className="space-y-3 text-white/70">
              <li className="flex items-center gap-2">
                <span className="flex items-center gap-1">
                  <img
                    src="https://flagcdn.com/w20/pe.png"
                    alt="Perú"
                    className="h-4 w-4"
                  />
                  +51 (555) 123 4567
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-white/70" />
                <span>ivan@dronefilmsproject.com</span>
              </li>
            </ul>
          </div>

          {/* Columna 4: Links de interés */}
          <div>
            <h3 className="text-white font-bold text-xl mb-4">
              LINKS DE INTERÉS
            </h3>
            <ul className="space-y-3 text-white/70">
              <li>
                <a
                  href="sign-in"
                  className="hover:text-white transition-colors block"
                >
                  Zona Cliente
                </a>
              </li>
              <li>
                <a
                  href="#contacto"
                  className="hover:text-white transition-colors block"
                >
                  Contacto
                </a>
              </li>
              <li>
                <a
                  href="faqs"
                  className="hover:text-white transition-colors block"
                >
                  FAQs
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* LÍNEA FINAL */}
        <div className="border-t border-[#d4af37]/10 pt-6 text-center text-[#f4f4f4]/50">
          <p>
            &copy; {new Date().getFullYear()} UXJ4IR0. Todos los derechos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
