"use client";

import type React from "react";

import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Send } from "lucide-react";

export function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.1 });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulación de envío del formulario
    setTimeout(() => {
      setIsSubmitting(false);
      alert("¡Formulario enviado! Esto es una demostración.");
    }, 1500);
  };

  return (
    <div ref={ref} className="py-5">
      <div className="text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-[#d4af37] mb-4"
        >
          CONTÁCTENOS
        </motion.h2>
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: "120px" } : { width: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="h-1 bg-[#d4af37]/50 mx-auto mb-6"
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-2xl mx-auto text-[#f4f4f4]/80"
        >
          Comuníquese con nuestro equipo para discutir sus necesidades de
          exploración, oportunidades de colaboración o cualquier consulta que
          tenga.
        </motion.p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <h3 className="text-2xl font-bold text-[#d4af37] mb-6">
            Nuestra Información
          </h3>

          <div className="flex items-start space-x-4">
            <div className="bg-[#d4af37]/10 p-3 rounded-full">
              <MapPin className="h-6 w-6 text-[#d4af37]" />
            </div>
            <div>
              <h4 className="text-[#f4f4f4] font-medium mb-1">Ubicación</h4>
              <p className="text-white/70 leading-relaxed">
                Miraflores, Lima, Perú.
                <br />
                Cajamarca, Perú.
                <br />Y en donde necesites.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="bg-[#d4af37]/10 p-3 rounded-full">
              <Phone className="h-6 w-6 text-[#d4af37]" />
            </div>
            <div>
              <h4 className="text-[#f4f4f4] font-medium mb-1">Teléfono</h4>
              <p className="text-[#f4f4f4]/70">
                +51 (555) 123 4567
                <br />
                +51 (555) 765 4321
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="bg-[#d4af37]/10 p-3 rounded-full">
              <Mail className="h-6 w-6 text-[#d4af37]" />
            </div>
            <div>
              <h4 className="text-[#f4f4f4] font-medium mb-1">
                Correo Electrónico
              </h4>
              <p className="text-[#f4f4f4]/70">
                info@ninagold.com
                <br />
                contacto@ninagold.com
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-bold text-[#d4af37] mb-6">
            Envíenos un Mensaje
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Input
                  placeholder="Su Nombre"
                  className="bg-[#1c1c1c]/60 border-[#d4af37]/30 text-[#f4f4f4] focus:border-[#d4af37]"
                  required
                />
              </div>
              <div>
                <Input
                  type="email"
                  placeholder="Su Correo Electrónico"
                  className="bg-[#1c1c1c]/60 border-[#d4af37]/30 text-[#f4f4f4] focus:border-[#d4af37]"
                  required
                />
              </div>
            </div>
            <Input
              placeholder="Asunto"
              className="bg-[#1c1c1c]/60 border-[#d4af37]/30 text-[#f4f4f4] focus:border-[#d4af37]"
              required
            />
            <Textarea
              placeholder="Su Mensaje"
              className="bg-[#1c1c1c]/60 border-[#d4af37]/30 text-[#f4f4f4] focus:border-[#d4af37] min-h-[150px]"
              required
            />
            <div className="text-right">
              <Button
                type="submit"
                className="bg-[#d4af37] text-[#1c1c1c] hover:bg-[#cd7f32] transition-colors"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  "Enviando..."
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Enviar Mensaje
                  </>
                )}
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
