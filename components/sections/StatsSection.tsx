"use client"

import { motion } from "framer-motion"
import { useRef } from "react"
import { useInView } from "framer-motion"

const stats = [
  { value: "25+", label: "Años de Experiencia" },
  { value: "100+", label: "Proyectos Completados" },
  { value: "20+", label: "Socios en la Industria" },
  { value: "15", label: "Regiones de Perú" },
]

export function StatsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })

  return (
    <div ref={ref} className="py-16">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto ">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{
              duration: 0.4,
              delay: index * 0.1,
              type: "spring",
              stiffness: 100,
            }}
            className="text-center"
          >
            <motion.p
              className="text-5xl font-bold text-[#d4af37] mb-2"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
            >
              {stat.value}
            </motion.p>
            <p className="text-[#f4f4f4]/70 uppercase tracking-wider text-sm">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}