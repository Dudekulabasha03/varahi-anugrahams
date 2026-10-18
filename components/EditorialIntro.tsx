"use client";

import React, { useEffect, useRef, useState } from "react";
import { PROJECT_CONFIG } from "@/config/projectData";

export const EditorialIntro: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
          }
        });
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const headlineText = "Villas shaped by light, space and quiet.";
  const words = headlineText.split(" ");

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-24 sm:py-32 px-6 sm:px-12 max-w-6xl mx-auto text-forest-950 dark:text-ivory-100 transition-colors"
    >
      <div className="max-w-4xl space-y-8">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2">
          <span className="w-8 h-[1px] bg-gold-500" />
          <span className="text-xs uppercase tracking-[0.25em] text-gold-600 dark:text-gold-400 font-semibold font-sans">
            The Philosophy · Varahi Anugrahams
          </span>
        </div>

        {/* Word Reveal Display Headline */}
        <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-normal leading-[1.08] tracking-tight">
          {words.map((word, i) => (
            <span
              key={i}
              className="inline-block mr-[0.3em] transition-all duration-700 ease-out"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "none" : "translateY(0.7em)",
                transitionDelay: `${i * 85}ms`,
              }}
            >
              {word}
            </span>
          ))}
        </h2>

        {/* Lead Narrative */}
        <p className="text-base sm:text-xl text-stone-600 dark:text-stone-300 font-light leading-relaxed max-w-2xl">
          Varahi Anugrahams is an exclusive gated community designed around calm, generous living.
          Nestled along R.F. Road in Tadipatri, each villa marries organic curved stone architecture,
          sheltered verandas, and private sky terraces with state-of-the-art engineering.
        </p>

        {/* Foundational Pillars */}
        <div className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-gold-400/20">
          {PROJECT_CONFIG.brand.pillars.map((pillar, idx) => (
            <div key={idx} className="space-y-1">
              <span className="text-xs uppercase tracking-[0.2em] text-gold-600 dark:text-gold-400 font-medium">
                Pillar 0{idx + 1}
              </span>
              <h3 className="font-serif text-2xl font-medium tracking-wide text-forest-950 dark:text-ivory-50">
                {pillar}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
