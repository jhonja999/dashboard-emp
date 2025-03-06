"use client"

import { motion } from "framer-motion"
import { useRef } from "react"
import { useInView } from "framer-motion"
import Image from "next/image"

export function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })

  return (
    <div ref={ref} className="py-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 px-4">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <h2 className="text-3xl font-bold text-[#d4af37]">Nuestro Legado</h2>
          <div className="h-1 w-20 bg-[#d4af37]/50"></div>
          <p className="text-[#f4f4f4]/80">
            Desde nuestra fundación, NinaGold ha sido pionera en minería responsable y exploración, estableciendo 
            estándares de excelencia y sostenibilidad en toda la industria.
          </p>
          <p className="text-[#f4f4f4]/80">
            Con más de 25 años de experiencia, hemos completado exitosamente más de 100 proyectos en 12 países, 
            entregando consistentemente resultados excepcionales a nuestros clientes y socios estratégicos.
          </p>
          <p className="text-[#f4f4f4]/80">
            Nuestro equipo de geólogos expertos, ingenieros y especialistas ambientales combina el conocimiento 
            tradicional minero con tecnología de vanguardia para liberar el potencial de los recursos minerales 
            mientras preservamos y respetamos el entorno natural.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
          transition={{ duration: 0.6 }}
          className="relative h-[400px] rounded-lg overflow-hidden"
        >
          <Image src="https://images.unsplash.com/photo-1523848309072-c199db53f137?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Operaciones mineras" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1c1c1c] to-transparent opacity-60"></div>
          <div className="absolute bottom-0 left-0 p-6">
            <p className="text-2xl font-bold text-[#d4af37] bg-black">Más de 25 Años</p>
            <p className="text-[#f4f4f4] bg-black">de Excelencia en Minería</p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}