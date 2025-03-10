"use client"

import { motion } from "framer-motion"
import { useRef } from "react"
import { useInView } from "framer-motion"
import Image from "next/image"

const projects = [
  {
    title: "Proyecto Toromocho",
    location: "Junín, Perú",
    status: "Activo",
    image: "https://plus.unsplash.com/premium_photo-1661963968707-cf062e54725b?q=80&w=2060&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Proyecto de cobre a gran escala utilizando tecnología de punta en extracción sostenible.",
  },
  {
    title: "Iniciativa Minera Quellaveco",
    location: "Moquegua, Perú",
    status: "Planificación",
    image: "https://plus.unsplash.com/premium_photo-1661951710685-a676c4190c19?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Desarrollo minero sostenible con enfoque en la participación comunitaria y responsabilidad ambiental.",
  },
  {
    title: "Exploración Las Bambas",
    location: "Apurímac, Perú",
    status: "Completado",
    image: "https://images.unsplash.com/photo-1524037755327-dc2def03712a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Proyecto premiado que muestra métodos innovadores de extracción y compromiso con las comunidades locales.",
  },
]

export function ProjectsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.1 })

  return (
    <div ref={ref} className="py-20">
      <div className="text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-[#d4af37] mb-4"
        >
          NUESTROS PROYECTOS
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
          Explore nuestro diverso portafolio de proyectos mineros en Perú que demuestran nuestra experiencia y
          compromiso con el desarrollo sostenible de recursos y el bienestar de las comunidades.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.5, delay: 0.1 * index }}
            className="bg-[#1c1c1c]/60 backdrop-blur-sm border border-[#d4af37]/20 rounded-lg overflow-hidden hover:border-[#d4af37]/50 transition-all duration-300 group"
          >
            <div className="relative aspect-video">
              <Image
                src={project.image || "/placeholder.webp"}
                alt={project.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xl font-bold text-[#d4af37] group-hover:text-[#cd7f32] transition-colors">
                  {project.title}
                </h3>
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    project.status === "Activo"
                      ? "bg-green-900/30 text-green-400"
                      : project.status === "Planificación"
                        ? "bg-yellow-900/30 text-yellow-400"
                        : "bg-blue-900/30 text-blue-400"
                  }`}
                >
                  {project.status}
                </span>
              </div>
              <div className="w-0 h-0.5 bg-[#d4af37]/50 group-hover:w-full transition-all duration-300 mb-4" />
              <p className="text-[#f4f4f4]/80 mb-4">{project.description}</p>
              <p className="text-[#d4af37]/70 text-sm">{project.location}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}