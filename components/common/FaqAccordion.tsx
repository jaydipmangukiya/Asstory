"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export interface FaqItem {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  title?: string;
  subtitle?: string;
}

const contactFaqs = [
  {
    question: "How accurate are your property valuations?",
    answer:
      "Our AI-powered valuations have a 95% accuracy rate, validated against actual market transactions and expert assessments.",
  },
  {
    question: "How long does it take to get a valuation report?",
    answer:
      "Basic property valuations are instant. Detailed reports with market analysis are generated within 24 hours.",
  },
  {
    question: "Do you cover all cities in India?",
    answer:
      "We currently cover 50+ major cities across India, with plans to expand to more locations soon.",
  },
  {
    question: "Is my property information secure?",
    answer:
      "Yes, we use bank-level encryption and security measures to protect all your property and personal information.",
  },
];

export default function FaqAccordion({
  title = "Frequently Asked Questions",
  subtitle = "Quick answers to common questions",
}: FaqAccordionProps) {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-800 mb-4">{title}</h2>
          <p className="text-xl text-slate-600">{subtitle}</p>
        </div>

        {/* Accordion */}
        <Accordion type="single" collapsible className="space-y-4">
          {contactFaqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`faq-${index}`}
              className="border border-slate-200 rounded-xl px-4 shadow-sm"
            >
              <AccordionTrigger className="text-left text-lg font-semibold text-slate-800 hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-slate-600 leading-relaxed pt-2 text-base">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
