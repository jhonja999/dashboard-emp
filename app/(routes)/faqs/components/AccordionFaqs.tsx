"use client";

import * as React from "react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

interface FaqAccordionProps {
  faqs: {
    question: string;
    answer: React.ReactNode;
  }[];
}

/**
 * FaqAccordion
 * - Muestra una lista de preguntas y respuestas dentro de un acordeón.
 * - Cada item se renderiza con su título (Trigger) y contenido (Content).
 */
export default function AccordionFaqs({ faqs }: FaqAccordionProps) {
    return (
      <Accordion type="single" collapsible className="w-full space-y-2">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`faq-${index}`}>
            <AccordionTrigger className="font-semibold text-lg">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="leading-relaxed text-sm text-justify">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    );
  }