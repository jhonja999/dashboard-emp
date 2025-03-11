"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  MapPin, 
  Phone, 
  Mail, 
  FileText, 
  ChevronRight, 
  MessageCircle, 
  Clock,
  Calendar,
  Send,
  Building,
  Users,
  ExternalLink
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.1 });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      alert("¡Formulario enviado! Esto es una demostración.");
    }, 1500);
  };

  // Definición de oficinas
  const offices = [
    {
      id: "lima",
      name: "Oficina Lima",
      address: "Av. La Mar 1123, Miraflores, Lima",
      phone: "+51 (1) 555-7890",
      hours: "Lun - Vie: 9:00 - 18:00",
      mapLink: "https://maps.google.com/?q=Miraflores,Lima,Peru"
    },
    {
      id: "cajamarca",
      name: "Oficina Cajamarca",
      address: "Jr. Cruz de Piedra 608, Cajamarca",
      phone: "+51 (76) 555-4321",
      hours: "Lun - Vie: 8:30 - 17:30",
      mapLink: "https://maps.google.com/?q=Cajamarca,Peru"
    }
  ];

  // Animaciones
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 400, damping: 20 }
    }
  };

  return (
    <section ref={ref} className="py-5 relative">
      <div className="container mx-auto px-4">
        {/* Título / Introducción */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-[#d4af37] mb-2">CONTÁCTENOS</h2>
          <div className="h-1 w-24 bg-[#d4af37]/50 mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-[#f4f4f4]/80">
            Estamos disponibles para responder a sus consultas en cualquiera de nuestras oficinas o a través de nuestros canales digitales.
          </p>
        </motion.div>

        {/* Grid Principal: 2 Columnas en pantallas grandes, 1 en móviles */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          
          {/* Columna 1: Información de contacto general */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
            className="bg-[#1c1c1c] rounded-xl p-6 shadow-xl border border-[#d4af37]/20 h-full"
          >
            <h3 className="text-xl font-bold text-[#d4af37] mb-6 flex items-center justify-center">
              <Users className="mr-2 h-5 w-5" />
              <span>Atención al Cliente</span>
            </h3>

            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-6"
            >
              {/* Email */}
              <motion.div
                variants={itemVariants}
                className="flex items-start space-x-4"
              >
                <div className="bg-[#d4af37]/10 p-2 rounded-full">
                  <Mail className="h-5 w-5 text-[#d4af37]" />
                </div>
                <div>
                  <h4 className="text-[#f4f4f4] font-medium text-sm mb-1">Email General</h4>
                  <p className="text-[#f4f4f4]/70 mb-1">info@ninagold.com</p>
                  <div className="flex space-x-2 pt-1">
                    <motion.a
                      href="mailto:info@ninagold.com"
                      className="bg-[#d4af37]/10 hover:bg-[#d4af37]/20 text-[#d4af37] font-medium px-3 py-1.5 rounded-md inline-flex items-center transition-colors"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span>Enviar email</span>
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </motion.a>
                  </div>
                </div>
              </motion.div>

              {/* WhatsApp */}
              <motion.div
                variants={itemVariants}
                className="flex items-start space-x-4"
              >
                <div className="bg-[#d4af37]/10 p-2 rounded-full">
                  <MessageCircle className="h-5 w-5 text-[#d4af37]" />
                </div>
                <div>
                  <h4 className="text-[#f4f4f4] font-medium text-sm mb-1">WhatsApp</h4>
                  <p className="text-[#f4f4f4]/70 mb-1">+51 987 654 321</p>
                  <div className="flex space-x-2 pt-1">
                    <motion.a
                      href="https://wa.me/51987654321?text=Hola,%20me%20gustaría%20obtener%20más%20información"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#d4af37]/10 hover:bg-[#d4af37]/20 text-[#d4af37] font-medium px-3 py-1.5 rounded-md inline-flex items-center transition-colors"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span>Chatear ahora</span>
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </motion.a>
                  </div>
                </div>
              </motion.div>

              {/* Atención especial */}
              <motion.div
                variants={itemVariants}
                className="rounded-lg overflow-hidden border border-[#d4af37]/20 mt-6"
              >
                <div className="bg-[#d4af37]/10 px-4 py-3">
                  <h4 className="text-[#d4af37] font-medium text-sm">Atención a Proveedores</h4>
                </div>
                <div className="px-4 py-3">
                  <p className="text-[#f4f4f4]/70 text-sm mb-2">
                    Para información sobre procesos de homologación y licitaciones:
                  </p>
                  <a 
                    href="mailto:proveedores@ninagold.com" 
                    className="text-[#d4af37] text-sm inline-flex items-center hover:underline"
                  >
                    proveedores@ninagold.com
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
          
          {/* Columna 2: Formulario de contacto */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-[#1c1c1c] rounded-xl p-6 shadow-xl border border-[#d4af37]/20"
          >
            <h3 className="text-xl font-bold text-[#d4af37] mb-6 flex items-center justify-center">
              <Send className="mr-2 h-5 w-5" />
              <span>Envíe su Consulta</span>
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[#f4f4f4] text-sm font-medium">Nombre</label>
                  <Input
                    placeholder="Su nombre completo"
                    className="bg-[#1c1c1c] border-[#d4af37]/30 text-[#f4f4f4] focus:border-[#d4af37] hover:border-[#d4af37]/50 transition-colors"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[#f4f4f4] text-sm font-medium">Email</label>
                  <Input
                    type="email"
                    placeholder="ejemplo@correo.com"
                    className="bg-[#1c1c1c] border-[#d4af37]/30 text-[#f4f4f4] focus:border-[#d4af37] hover:border-[#d4af37]/50 transition-colors"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[#f4f4f4] text-sm font-medium">Teléfono</label>
                  <Input
                    placeholder="+51 900 000 000"
                    className="bg-[#1c1c1c] border-[#d4af37]/30 text-[#f4f4f4] focus:border-[#d4af37] hover:border-[#d4af37]/50 transition-colors"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[#f4f4f4] text-sm font-medium">Tipo de Consulta</label>
                  <select className="w-full h-10 px-3 py-2 rounded-md bg-[#1c1c1c] border border-[#d4af37]/30 text-[#f4f4f4] focus:border-[#d4af37] hover:border-[#d4af37]/50 transition-colors">
                    <option value="general">Información General</option>
                    <option value="technical">Soporte Técnico</option>
                    <option value="commercial">Información Comercial</option>
                    <option value="other">Otro</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[#f4f4f4] text-sm font-medium">Mensaje</label>
                <Textarea
                  placeholder="Describa su consulta en detalle"
                  className="bg-[#1c1c1c] border-[#d4af37]/30 text-[#f4f4f4] focus:border-[#d4af37] hover:border-[#d4af37]/50 transition-colors min-h-[120px]"
                  required
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-[#d4af37]/80" />
                  <p className="text-sm text-[#f4f4f4]/60">
                    Respuesta en 24-48 horas hábiles
                  </p>
                </div>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-[#d4af37] text-[#1c1c1c] hover:bg-[#cd7f32] transition-colors px-6 py-2.5 rounded-md font-medium flex items-center space-x-2 shadow-md"
                  disabled={isSubmitting}
                >
                  <span>{isSubmitting ? "Enviando..." : "Enviar Consulta"}</span>
                  <Send className="h-4 w-4 ml-1" />
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>

        {/* Sección de Oficinas */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12"
        >
          <div className="flex items-center justify-center space-x-3 mb-8">
            <div className="h-px bg-[#d4af37]/30 w-16"></div>
            <h3 className="text-xl font-bold text-[#d4af37] flex items-center">
              <Building className="mr-2 h-5 w-5" />
              <span>Nuestras Oficinas</span>
            </h3>
            <div className="h-px bg-[#d4af37]/30 w-16"></div>
          </div>

          <Tabs defaultValue={offices[0].id} className="w-full">
            <TabsList className="bg-[#1c1c1c] border border-[#d4af37]/20 p-1 mb-6 mx-auto flex justify-center">
              {offices.map(office => (
                <TabsTrigger 
                  key={office.id}
                  value={office.id}
                  className="data-[state=active]:bg-[#d4af37]/20 data-[state=active]:text-[#d4af37] px-6"
                >
                  {office.name}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {offices.map(office => (
              <TabsContent 
                key={office.id} 
                value={office.id}
                className="bg-[#1c1c1c] rounded-xl p-6 shadow-xl border border-[#d4af37]/20"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <MapPin className="h-5 w-5 text-[#d4af37] mt-0.5" />
                      <div>
                        <h4 className="text-[#f4f4f4] font-medium mb-1">Dirección</h4>
                        <p className="text-[#f4f4f4]/70">{office.address}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <Phone className="h-5 w-5 text-[#d4af37] mt-0.5" />
                      <div>
                        <h4 className="text-[#f4f4f4] font-medium mb-1">Teléfono</h4>
                        <p className="text-[#f4f4f4]/70">{office.phone}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <Clock className="h-5 w-5 text-[#d4af37] mt-0.5" />
                      <div>
                        <h4 className="text-[#f4f4f4] font-medium mb-1">Horario</h4>
                        <p className="text-[#f4f4f4]/70">{office.hours}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-center items-center">
                    <div className="bg-[#1c1c1c] border border-[#d4af37]/20 rounded-lg w-full h-56 relative overflow-hidden group">
                      {/* Placeholder para mapa (en producción, se reemplazaría por un iframe o componente de mapa) */}
                      <div className="absolute inset-0 bg-[#0f0f0f] flex items-center justify-center">
                        <div className="text-center">
                          <MapPin className="h-10 w-10 text-[#d4af37]/50 mx-auto mb-2" />
                          <p className="text-[#f4f4f4]/50 mb-4">Mapa de ubicación</p>
                          <motion.a
                            href={office.mapLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-[#d4af37]/10 text-[#d4af37] px-4 py-2 rounded-md inline-flex items-center hover:bg-[#d4af37]/20 transition-colors"
                            whileHover={{ y: -2 }}
                          >
                            <span>Ver en Google Maps</span>
                            <ExternalLink className="h-4 w-4 ml-2" />
                          </motion.a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>

        {/* Sección de Documentos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <motion.a
            href="/faqs"
            className="bg-[#1c1c1c] rounded-xl p-5 shadow-md border border-[#d4af37]/20 flex items-center justify-between group hover:border-[#d4af37]/40 hover:bg-[#1c1c1c]/80 transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center">
              <div className="bg-[#d4af37]/10 p-2 rounded-full mr-3">
                <FileText className="h-5 w-5 text-[#d4af37]" />
              </div>
              <div>
                <h4 className="text-[#f4f4f4] font-medium text-sm">Política SIG</h4>
              </div>
            </div>
            <div className="text-[#d4af37] inline-flex items-center">
              <ChevronRight className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.a>
          
          <motion.a
            href="/faqs"
            className="bg-[#1c1c1c] rounded-xl p-5 shadow-md border border-[#d4af37]/20 flex items-center justify-between group hover:border-[#d4af37]/40 hover:bg-[#1c1c1c]/80 transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center">
              <div className="bg-[#d4af37]/10 p-2 rounded-full mr-3">
                <FileText className="h-5 w-5 text-[#d4af37]" />
              </div>
              <div>
                <h4 className="text-[#f4f4f4] font-medium text-sm">Preguntas Frecuentes</h4>
              </div>
            </div>
            <div className="text-[#d4af37] inline-flex items-center">
              <ChevronRight className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.a>
          
          <motion.a
            href="/certificaciones"
            className="bg-[#1c1c1c] rounded-xl p-5 shadow-md border border-[#d4af37]/20 flex items-center justify-between group hover:border-[#d4af37]/40 hover:bg-[#1c1c1c]/80 transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center">
              <div className="bg-[#d4af37]/10 p-2 rounded-full mr-3">
                <FileText className="h-5 w-5 text-[#d4af37]" />
              </div>
              <div>
                <h4 className="text-[#f4f4f4] font-medium text-sm">Certificaciones</h4>
              </div>
            </div>
            <div className="text-[#d4af37] inline-flex items-center">
              <ChevronRight className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}