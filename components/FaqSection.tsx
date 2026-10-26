"use client";

import React, { useState } from "react";
import { Sparkles, Plus, Minus } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: "Where is the project located?",
    answer:
      "Varahi Anugrahams is situated at Nandalapadu Road Near Ananthapur Bridge Varahi Anugrahams, Tadipatri, Andhra Pradesh. Google Maps: https://www.google.com/maps?q=14.909390,77.984804 (Coordinates: 14.909390, 77.984804).",
  },
  {
    question: "What are the exact villa dimensions and plot sizes?",
    answer:
      "Each individual residence is constructed on an engineered 23 ft × 47 ft foundation footprint (~1,081 sq.ft plinth area) within an overall approx. 58′ × 30′ plot layout that accommodates the front car porch, garden, and setbacks across Ground + First Floor + Rooftop Sky Terrace.",
  },
  {
    question: "When is the possession ?",
    answer:
      "Within 10 to 12 months from the date of registration.",
  },
  {
    question: "What are the pricing and payment terms?",
    answer:
      "Pricing packages, payment stage milestones, and bank loan approvals are provided transparently during private consultation. Please submit an enquiry or connect with our sales team via WhatsApp for current availability.",
  },
  {
    question: "What makes the construction quality unique?",
    answer:
      "Every home features an advanced sub-surface anti-termite reticulation piping network with brick supports, heavy-duty RCC framing, acoustic curved masonry facades, dedicated residential elevator shafts, and underground electrical cabling along the 30 FT avenue.",
  },
  {
    question: "How can I schedule a personal site visit?",
    answer:
      "You can schedule a site visit using the enquiry form below, or directly message our promoter office at +91 9492854666 / +91 8328144746. We arrange guided walkthroughs seven days a week between 9:00 AM and 7:30 PM.",
  },
];

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 sm:py-32 px-5 sm:px-8 max-w-5xl mx-auto border-t border-gold-400/15">
      {/* Section Header */}
      <div className="max-w-3xl mb-12 sm:mb-16 space-y-4">
        <div className="inline-flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-gold-500" />
          <span className="text-xs uppercase tracking-[0.25em] text-gold-600 dark:text-gold-400 font-semibold font-sans">
            Frequently Asked Questions
          </span>
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal text-forest-950 dark:text-ivory-50 tracking-tight leading-[1.08]">
          Questions &amp; Answers.
        </h2>
        <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 font-light max-w-xl leading-relaxed">
          Everything you need to know about the planning, architecture, and purchase process at Varahi Anugrahams.
        </p>
      </div>

      {/* Accordion Panels */}
      <div className="divide-y divide-gold-400/20 border-t border-b border-gold-400/20">
        {FAQS.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div key={idx} className="py-6 sm:py-8 transition-colors">
              <button
                onClick={() => toggleIndex(idx)}
                aria-expanded={isOpen}
                className="w-full flex items-center justify-between text-left gap-4 group"
              >
                <h3 className="font-serif text-xl sm:text-2xl font-medium text-forest-950 dark:text-ivory-50 group-hover:text-gold-500 transition-colors">
                  {faq.question}
                </h3>
                <span className="p-2 rounded-full bg-gold-500/10 text-gold-500 group-hover:bg-gold-500 group-hover:text-black transition-all shrink-0">
                  {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </span>
              </button>

              {isOpen && (
                <div className="pt-4 pr-12 text-stone-600 dark:text-stone-300 font-light text-sm sm:text-base leading-relaxed animate-fade-in">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
