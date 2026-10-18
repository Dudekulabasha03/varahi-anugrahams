"use client";

import React, { useState } from "react";
import { PROJECT_CONFIG, Amenity } from "@/config/projectData";
import { Sparkles, Check, ShieldCheck, Sun, Moon, Maximize2, X, Search } from "lucide-react";
import { ImageLensZoom } from "./ui/ImageLensZoom";
import { BorderBeam } from "./ui/BorderBeam";
import { SpotlightCard } from "./ui/SpotlightCard";

export const Facilities: React.FC = () => {
  const [selectedAmenity, setSelectedAmenity] = useState<Amenity | null>(null);
  const [lensMode, setLensMode] = useState(false);

  return (
    <section id="amenities" className="relative py-28 sm:py-36 bg-forest-900 border-t border-gold-400/20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-gold-400/30 bg-forest-950/70 text-gold-400 text-xs uppercase tracking-widest">
            <span>Section 07</span>
            <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
            <span>Verified Amenities</span>
          </div>

          <h2 className="font-cinzel text-3xl sm:text-5xl font-bold text-ivory-50 tracking-wide">
            Attractive <span className="text-gold-gradient">Facilities</span>
          </h2>

          <p className="text-sm sm:text-base text-stone-300 font-light max-w-2xl mx-auto">
            Essential lifestyle engineering and verified facilities: anti-termite reticulation foundation piping, rooftop pergola, and cooled moonlight bedroom.
          </p>
          <div className="gold-divider w-28 mx-auto mt-4" />
        </div>

        {/* Featured Anti-Termite Reticulation Piping Showcase */}
        <div className="mb-14 max-w-5xl mx-auto rounded-3xl overflow-hidden glass-panel-gold border border-gold-400/30 p-4 sm:p-6 shadow-forest-deep relative">
          <BorderBeam size={280} duration={14} borderWidth={2} colorFrom="#D5AE43" colorTo="#F7F0D0" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Image with HD Lens or Crisp View */}
            <div className="lg:col-span-7">
              <div className="relative rounded-2xl overflow-hidden bg-forest-950 flex items-center justify-center border border-gold-400/20 min-h-[300px] sm:min-h-[380px]">
                {lensMode ? (
                  <ImageLensZoom
                    src="/assets/amenities/anti-termite-piping.jpg"
                    alt="Varahi Anugrahams Anti-Termite Reticulation Piping System - 23ft × 47ft"
                    zoomLevel={2.5}
                    lensSize={190}
                    className="w-full h-auto"
                  />
                ) : (
                  <img
                    src="/assets/amenities/anti-termite-piping.jpg"
                    alt="Varahi Anugrahams Anti-Termite Reticulation Piping System - 23ft × 47ft"
                    className="w-full h-auto object-contain crisp-image"
                  />
                )}

                {/* Lens Switcher Button */}
                <button
                  onClick={() => setLensMode(!lensMode)}
                  className="absolute bottom-3 right-3 glass-panel px-3 py-1.5 rounded-full text-xs text-gold-300 border border-gold-400/40 hover:bg-gold-400 hover:text-forest-950 transition-colors flex items-center gap-1.5 shadow-lg z-20"
                >
                  <Search className="w-3.5 h-3.5 text-gold-400" />
                  <span>{lensMode ? "Exit Lens" : "Inspect Piping Detail"}</span>
                </button>
              </div>
            </div>

            {/* Right Column: Verified Engineering Details */}
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-950/80 border border-gold-400/30 text-[10px] text-gold-300 uppercase tracking-widest font-sans">
                <ShieldCheck className="w-3.5 h-3.5 text-gold-400" />
                <span>Base Level Construction</span>
              </div>

              <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-ivory-50">
                Anti-Termite Reticulation Piping System
              </h3>

              <p className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed">
                Precision-engineered subterranean reticulation network embedded into the 23 ft &times; 47 ft villa foundation soil with brick support mounts at every junction. Enables hassle-free exterior chemical recharge without floor drilling.
              </p>

              <div className="space-y-2 pt-2 border-t border-gold-400/15">
                <div className="flex items-center gap-2 text-xs text-stone-300">
                  <Check className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                  <span>23 ft (Width) &times; 47 ft (Length) Full Foundation Grid</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-stone-300">
                  <Check className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                  <span>Pipe with Brick Support at every crossover</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-stone-300">
                  <Check className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                  <span>Lifetime structural defense against subterranean pests</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Amenities Cards Grid with Spotlight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {PROJECT_CONFIG.amenities.map((amenity) => (
            <SpotlightCard
              key={amenity.id}
              className="p-6 sm:p-8 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <span className="text-[10px] uppercase tracking-widest text-gold-400 font-semibold font-sans">
                    {amenity.tagline}
                  </span>
                  {amenity.badge && (
                    <span className="px-3 py-1 rounded-full bg-forest-950/80 border border-gold-400/30 text-[10px] text-gold-300 font-medium">
                      {amenity.badge}
                    </span>
                  )}
                </div>

                <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-ivory-50 mb-3 hover:text-gold-300 transition-colors">
                  {amenity.title}
                </h3>

                <p className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed mb-6">
                  {amenity.description}
                </p>

                {/* Features Checklist */}
                <div className="space-y-2.5 pt-4 border-t border-gold-400/15">
                  {amenity.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2.5 text-xs text-stone-300">
                      <span className="p-0.5 rounded-full bg-gold-400/20 text-gold-400 mt-0.5 shrink-0">
                        <Check className="w-3 h-3" />
                      </span>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gold-400/10 flex justify-end">
                <button
                  onClick={() => setSelectedAmenity(amenity)}
                  className="text-xs text-gold-400 hover:text-gold-200 font-medium flex items-center gap-1 transition-colors"
                >
                  <span>View Details</span>
                  <span className="text-sm">&rarr;</span>
                </button>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>

      {/* Amenity Detail Modal */}
      {selectedAmenity && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4">
          <div className="relative max-w-lg w-full glass-panel-gold rounded-3xl p-6 sm:p-8 border border-gold-400 animate-fade-in shadow-2xl">
            <button
              onClick={() => setSelectedAmenity(null)}
              className="absolute top-5 right-5 text-stone-400 hover:text-ivory-100"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-[10px] uppercase tracking-widest text-gold-400 font-semibold font-sans">
              {selectedAmenity.tagline}
            </span>
            <h3 className="font-cinzel text-xl font-bold text-ivory-50 mt-1 mb-3">
              {selectedAmenity.title}
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed mb-6">
              {selectedAmenity.description}
            </p>

            <div className="rounded-2xl overflow-hidden bg-forest-950 mb-6 border border-gold-400/30">
              <img
                src={selectedAmenity.image}
                alt={selectedAmenity.title}
                className="w-full h-56 object-contain crisp-image"
              />
            </div>

            <div className="space-y-2">
              {selectedAmenity.features.map((f, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-stone-300">
                  <Check className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                  <span>{f}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
