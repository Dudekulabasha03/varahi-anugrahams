"use client";

import React, { useState } from "react";
import { ShieldCheck, CheckCircle2, ZoomIn, Layers, Wrench, Droplets, Clock } from "lucide-react";
import { UniversalLightbox } from "./ui/UniversalLightbox";

export const ConstructionSection: React.FC = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const features = [
    {
      icon: <Layers className="w-5 h-5 text-gold-400" />,
      title: "Sub-Surface Reticulation Grid",
      description:
        "A precision network of specialized porous reticulation pipes laid directly across the 23 ft × 47 ft foundation footprint before flooring.",
    },
    {
      icon: <Wrench className="w-5 h-5 text-gold-400" />,
      title: "Engineered Brick Block Supports",
      description:
        "Every pipe intersection is elevated on solid masonry brick blocks, guaranteeing uniform slope, structural rigidity, and optimal chemical diffusion.",
    },
    {
      icon: <Droplets className="w-5 h-5 text-gold-400" />,
      title: "Exterior Recharge Portals",
      description:
        "Scheduled chemical recharging is performed seamlessly from discreet exterior service junction boxes outside the villa walls.",
    },
    {
      icon: <Clock className="w-5 h-5 text-gold-400" />,
      title: "Zero Interior Disruption",
      description:
        "Eliminates the traditional, destructive practice of drilling through finished Italian marble or tiles, protecting your interior aesthetics for decades.",
    },
  ];

  return (
    <section id="construction" className="py-24 sm:py-32 px-5 sm:px-8 max-w-7xl mx-auto border-t border-gold-400/15">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left Column: Narrative */}
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-forest-900/60 border border-gold-400/30 text-gold-400 text-xs uppercase tracking-widest font-sans">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Structural Longevity · Base Level Engineering</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-forest-950 dark:text-ivory-50 tracking-tight leading-[1.1]">
            Protected from the ground up.
          </h2>

          <p className="text-base sm:text-lg text-stone-600 dark:text-stone-300 font-light leading-relaxed">
            True luxury begins where no one sees. Every villa at Varahi Anugrahams incorporates an
            advanced anti-termite reticulation piping system engineered beneath the foundation soil,
            ensuring permanent defense against subterranean pests.
          </p>

          {/* Key Advantages Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-4">
            {features.map((item, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-forest-950/40 dark:bg-stone-900/40 border border-gold-400/20 space-y-2">
                <div className="p-2 rounded-lg bg-gold-400/10 inline-block">{item.icon}</div>
                <h4 className="font-serif text-lg font-medium text-forest-950 dark:text-ivory-100">
                  {item.title}
                </h4>
                <p className="text-xs text-stone-600 dark:text-stone-400 font-light leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Engineering Graphic with Click-to-Zoom */}
        <div className="relative group">
          <div
            role="button"
            tabIndex={0}
            onClick={() => setLightboxOpen(true)}
            onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setLightboxOpen(true)}
            className="relative rounded-2xl overflow-hidden border border-gold-400/30 shadow-2xl bg-stone-900 cursor-zoom-in transition-all duration-300 hover:scale-[1.01] hover:border-gold-400"
          >
            <img
              src="/media/images/anti-termite-system.jpg"
              alt="Anti Termite Reticulation Piping System for 23 ft x 47 ft house"
              className="w-full h-auto object-cover select-none"
            />

            {/* Hover Magnifier Tag */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-500 text-stone-950 text-xs font-bold uppercase tracking-wider shadow-lg">
                <ZoomIn className="w-4 h-4" />
                <span>Click to Inspect Diagram</span>
              </span>
            </div>

            {/* Bottom Caption Pill */}
            <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-black/70 backdrop-blur-md border border-white/10 flex items-center justify-between">
              <span className="text-xs text-ivory-100 font-sans">
                Anti-Termite Reticulation Piping System (23 ft × 47 ft House)
              </span>
              <span className="text-[10px] text-gold-400 font-mono uppercase tracking-wider">
                Full Schematic
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox for Engineering Diagram */}
      <UniversalLightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        items={[
          {
            src: "/media/images/anti-termite-system.jpg",
            alt: "Anti Termite Reticulation Piping System for 23 ft x 47 ft House",
            title: "Foundation Reticulation Engineering",
            caption:
              "Detailed schematic showing sub-surface perforated piping grid with brick supports laid across the 23 ft × 47 ft villa footprint.",
          },
        ]}
      />
    </section>
  );
};
