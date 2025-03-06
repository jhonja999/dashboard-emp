"use client"

import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <div className="text-center">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        <h1 className="text-4xl md:text-6xl font-bold text-[#f4f4f4] mb-6">
          DOMINANDO
          <br />
          EL ARTE DE LA
          <br />
          EXPLORACIÓN
        </h1>
        <p className="text-lg tracking-widest text-[#d4af37] mb-4">TRADICIÓN • INNOVACIÓN • EXCELENCIA</p>

        <div className="flex justify-center gap-4 mt-8">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button size="lg" className="px-8 bg-[#d4af37] text-[#1c1c1c] hover:bg-[#cd7f32] transition-colors">
              DESCUBRIR MÁS
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button variant="outline" size="lg" className="px-8 text-[#d4af37] border-[#d4af37] hover:bg-[#d4af37]/20">
              CONTÁCTANOS
            </Button>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        className="absolute -bottom-full left-1/2 transform -translate-x-1/2 text-[#d4af37]/60"
      >
        <ChevronDown className="w-8 h-8" />
      </motion.div>
    </div>
  )
}