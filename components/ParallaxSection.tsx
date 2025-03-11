"use client"

import type React from "react"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

interface ParallaxSectionProps {
  imageUrl: string
  children: React.ReactNode
  overlayColor?: string
  height?: string
  textPosition?: "top" | "center" | "bottom"
  parallaxIntensity?: number // Nueva prop para controlar la intensidad del efecto
}

export function ParallaxSection({
  imageUrl,
  children,
  overlayColor = "rgba(28, 28, 28, 0.7)",
  height = "100vh",
  textPosition = "center",
  parallaxIntensity = 10, // Valor por defecto más sutil
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  // Rango de movimiento más sutil basado en la intensidad
  const parallaxY = useTransform(scrollYProgress, [0, 1], [`-${parallaxIntensity}%`, `${parallaxIntensity}%`])

  const getTextPosition = () => {
    switch (textPosition) {
      case "top":
        return "items-start pt-32"
      case "bottom":
        return "items-end pb-32"
      default:
        return "items-center"
    }
  }

  return (
    <section 
      ref={ref} 
      className={`relative flex ${getTextPosition()} overflow-hidden will-change-transform`} 
      style={{ height }}
    >
      {/* Usamos will-change-transform para mejorar el rendimiento */}
      <motion.div 
        className="absolute inset-0 w-full h-full z-0"
        style={{ y: parallaxY }}
        initial={{ y: `-${parallaxIntensity}%` }}
      >
        <div 
          className="w-full h-[120%] bg-cover bg-center"
          style={{ 
            backgroundImage: `url(${imageUrl})`,
            willChange: "transform" 
          }} 
        />
      </motion.div>

      <div 
        className="absolute inset-0 w-full h-full z-0" 
        style={{ backgroundColor: overlayColor }}
      />

      <div className="container mx-auto px-4 relative z-10 w-full">
        {children}
      </div>
    </section>
  )
}