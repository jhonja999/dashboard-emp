"use client";
import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import Image from "next/image";

export function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });

  return (
    <div ref={ref} className="py-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 px-4">
        {/* Texto */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <h2 className="text-3xl font-bold text-[#d4af37]">Nuestro Legado</h2>
          <div className="h-1 w-20 bg-[#d4af37]/50"></div>
          <p className="text-[#f4f4f4]/80 text-justify">
            Desde nuestra fundación, NinaGold ha sido pionera en minería responsable y exploración, estableciendo estándares de excelencia y sostenibilidad en toda la industria.
          </p>
          <p className="text-[#f4f4f4]/80 text-justify">
            Con más de <strong className="text-[#d4af37]">25 años</strong> de experiencia, hemos completado exitosamente más de <em className="text-[#cd7f32]">100 proyectos</em> en 12 países, entregando consistentemente resultados excepcionales a nuestros clientes y socios estratégicos.
          </p>
          <p className="text-[#f4f4f4]/80 text-justify">
            Nuestro equipo combina <span className="underline text-[#d4af37]">conocimiento tradicional con tecnología de vanguardia </span>para liberar el potencial de los recursos minerales mientras preservamos el entorno natural.
          </p>
        </motion.div>

        {/* Imagen con tarjeta */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
          transition={{ duration: 0.6 }}
          className="relative h-[400px] rounded-lg overflow-hidden"
        >
          <Image
            src="https://images.unsplash.com/photo-1523848309072-c199db53f137?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Operaciones mineras"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1c1c1c] via-[#1c1c1c]/5 to-transparent" />

          {/* Tarjeta estilizada */}
          <div className="absolute bottom-6 right-6 max-w-[280px] p-6 rounded-lg backdrop-blur-sm bg-[#1c1c1c]/60 border border-[#d4af37]/30">
            <div className="flex items-center mb-3">
              <div className="w-2 h-2 bg-[#d4af37] rounded-full mr-3" />
              <h3 className="text-xl font-bold text-[#d4af37]">
                <span className="text-2xl">+</span>25 Años
              </h3>
            </div>
            <div className="space-y-2">
              <p className="text-[#f4f4f4] text-sm font-medium">
                Excelencia en Minería
              </p>
              <div className="h-0.5 bg-[#d4af37]/50 w-8 mb-2" />
              <p className="text-[#f4f4f4]/80 text-xs">
                <em>100+</em> proyectos exitosos <br />
                <strong>12</strong> países <br />
                <span className="text-[#cd7f32]">Tecnología innovadora</span>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}