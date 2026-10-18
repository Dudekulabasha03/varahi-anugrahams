"use client";

import React from "react";
import { PROJECT_CONFIG } from "@/config/projectData";
import { Sparkles } from "lucide-react";

export const SpecsSection: React.FC = () => {
  const specs = [
    { label: "Plot / House Size", value: "23 × 47 ft", detail: "Net plinth footprint (58' × 30' total plot)" },
    { label: "Configuration", value: "Ground + 1 + Terrace", detail: "3 distinct luxury levels" },
    { label: "Bedrooms", value: "3 Suites", detail: "2 Master suites + 1 children's bedroom" },
    { label: "Residential Elevator", value: "4'6\" × 4'6\"", detail: "Dedicated shaft serving all 3 floors" },
    { label: "Rooftop Sky Garden", value: "23 × 30 ft", detail: "Open terrace with pergola & fountain" },
    { label: "Central Avenue", value: "30 FT Wide", detail: "Heavy-duty paved road with royal palms" },
    { label: "Road Orientation", value: "West Facing", detail: "Designed in accordance with Vastu principles" },
    { label: "Security & Access", value: "24/7 Gated", detail: "Monitored portal & underground utilities" },
  ];

  return (
    <section id="specs" className="py-24 sm:py-32 px-5 sm:px-8 max-w-7xl mx-auto border-t border-gold-400/15">
      <div className="max-w-3xl mb-12 sm:mb-16 space-y-4">
        <div className="inline-flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-gold-500" />
          <span className="text-xs uppercase tracking-[0.25em] text-gold-600 dark:text-gold-400 font-semibold font-sans">
            Property Specifications
          </span>
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal text-forest-950 dark:text-ivory-50 tracking-tight leading-[1.08]">
          The architectural details.
        </h2>
        <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 font-light max-w-xl leading-relaxed">
          Every dimension has been verified from approved working drawings to ensure uncompromising comfort,
          structural balance, and timeless aesthetic value.
        </p>
      </div>

      {/* Specifications Grid Definition List */}
      <dl className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border-t border-b border-gold-400/20">
        {specs.map((item, idx) => (
          <div
            key={idx}
            className="p-6 sm:p-8 border-b md:border-b-0 md:border-r border-gold-400/20 last:border-r-0 hover:bg-gold-500/5 transition-colors"
          >
            <dt className="text-xs font-sans uppercase tracking-[0.18em] text-stone-500 dark:text-stone-400 mb-2">
              {item.label}
            </dt>
            <dd className="font-serif text-2xl sm:text-3xl font-medium text-forest-950 dark:text-ivory-50 mb-1">
              {item.value}
            </dd>
            <p className="text-xs text-stone-500 dark:text-stone-400 font-light leading-relaxed">
              {item.detail}
            </p>
          </div>
        ))}
      </dl>
    </section>
  );
};
