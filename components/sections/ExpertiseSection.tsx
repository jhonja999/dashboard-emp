"use client";
import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { 
  Mountain,
  BarChart,
  Clipboard,
  Leaf,
  Settings,
  Recycle
} from "lucide-react";

const expertiseItems = [
  {
    title: "Cartografía Geológica",
    description:
      "Cartografía geológica de precisión utilizando técnicas avanzadas para identificar yacimientos minerales con una exactitud sin igual.",
    icon: <Mountain className="text-[#d4af37]" />,
  },
  {
    title: "Estimación de Recursos",
    description: "Estimación exhaustiva de recursos mediante modelos estadísticos y métodos innovadores de muestreo.",
    icon: <BarChart className="text-[#d4af37]" />,
  },
  {
    title: "Estudios de Viabilidad",
    description: "Análisis detallados de viabilidad que equilibran el potencial económico con la sostenibilidad ambiental.",
    icon: <Clipboard className="text-[#d4af37]" />,
  },
  {
    title: "Monitoreo Ambiental",
    description: "Sistemas de monitoreo ambiental de última generación que garantizan el cumplimiento normativo y la preservación ecológica.",
    icon: <Leaf className="text-[#d4af37]" />,
  },
  {
    title: "Gestión de Proyectos",
    description: "Gestión experta de proyectos que proporciona operaciones eficientes y una utilización óptima de los recursos.",
    icon: <Settings className="text-[#d4af37]" />,
  },
  {
    title: "Minería Sostenible",
    description:
      "Enfoques innovadores para una minería sostenible que minimizan el impacto ambiental y maximizan los beneficios sociales.",
    icon: <Recycle className="text-[#d4af37]" />,
  },
];

export function ExpertiseSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });

  return (
    <div ref={ref} className="py-20">
      <div className="text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-[#d4af37] mb-4"
        >
          NUESTRA EXPERIENCIA
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
          Basándonos en décadas de experiencia, ofrecemos servicios especializados adaptados para satisfacer las complejas exigencias de la exploración mineral moderna.
        </motion.p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {expertiseItems.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 * index }}
            className="bg-[#1c1c1c]/60 backdrop-blur-sm border border-[#d4af37]/20 p-6 rounded-lg hover:border-[#d4af37]/50 transition-all duration-300 group"
          >
            <div className="text-3xl mb-4">{item.icon}</div>
            <h3 className="text-xl font-bold text-[#d4af37] mb-3 group-hover:text-[#cd7f32] transition-colors">
              {item.title}
            </h3>
            <div className="w-0 h-0.5 bg-[#d4af37]/50 group-hover:w-full transition-all duration-300 mb-4" />
            <p className="text-[#f4f4f4]/80">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}