/**
 * Archivo: app/(routes)/faqs/components/AccordionFaqs.data.tsx
 * Uso: Contiene un array de FAQs (solo strings) sobre exploración minera y política SIG.
 */

export type FaqItem = {
    id: string;
    question: string;
    answer: string;
  };
  
  export const faqsData: FaqItem[] = [
    {
      id: "1",
      question: "¿Qué es la exploración minera en NinaGold?",
      answer:
        "NinaGold se dedica a identificar y evaluar yacimientos minerales de alto valor. Utilizamos métodos geológicos y tecnología avanzada para determinar la viabilidad de un proyecto minero.",
    },
    {
      id: "2",
      question: "¿Cuáles son las etapas de exploración que sigue NinaGold?",
      answer:
        "1) Prospección: búsqueda de indicios minerales.\n2) Evaluación: muestreo y análisis geológico.\n3) Perforación: obtención de muestras profundas.\n4) Estudio de factibilidad: determinación de la rentabilidad y aspectos técnicos.",
    },
    {
      id: "3",
      question: "¿En qué consiste la Política Integrada de Calidad y Seguridad?",
      answer:
        "Nuestra política SIG integra estándares de Calidad, Medio Ambiente y Seguridad y Salud en el Trabajo. Buscamos prevenir riesgos, cumplir la normativa legal y promover la mejora continua en todos nuestros procesos.",
    },
    {
      id: "4",
      question: "¿Cómo gestionan la salud y seguridad de los trabajadores en campo?",
      answer:
        "NinaGold proporciona condiciones seguras, identifica y reduce riesgos, cumple con los requisitos legales vigentes y fomenta la participación activa de los colaboradores en la prevención de incidentes.",
    },
    {
      id: "5",
      question: "¿Qué compromisos destacan en su Política SIG?",
      answer:
        "1) Desarrollar actividades con altos estándares de Calidad, Medio Ambiente y Seguridad.\n2) Prevenir lesiones y enfermedades ocupacionales.\n3) Cumplir requisitos legales y de clientes.\n4) Promover la Mejora Continua y la consulta de los trabajadores.",
    },
    {
      id: "6",
      question: "¿Cómo se integran los aspectos medioambientales en la exploración?",
      answer:
        "Aplicamos técnicas de exploración con bajo impacto, gestionamos residuos adecuadamente y cumplimos con la normativa ambiental para minimizar la huella ecológica en cada proyecto.",
    },
    {
      id: "7",
      question: "¿Dónde puedo encontrar más información sobre la política SIG?",
      answer:
        "Puedes consultar el documento oficial en nuestras instalaciones o solicitarlo por correo electrónico. Incluye fecha de revisión, compromisos específicos y la firma del gerente general.",
    },
  ];
  