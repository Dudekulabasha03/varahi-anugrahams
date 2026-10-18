"use client";

import React, { useState } from "react";
import { Sparkles, Compass, Moon, Sun, Trees, Droplets, Search, Eye } from "lucide-react";
import { ImageLensZoom } from "./ui/ImageLensZoom";
import { BorderBeam } from "./ui/BorderBeam";
import { SpotlightCard } from "./ui/SpotlightCard";

interface TerraceGardenProps {
  onOpenTour: (roomId?: string) => void;
}

export const TerraceGarden: React.FC<TerraceGardenProps> = ({ onOpenTour }) => {
  const [useLens, setUseLens] = useState(false);

  return (
    <section id="terrace" className="relative py-28 sm:py-36 bg-forest-950 border-t border-gold-400/20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-gold-400/30 bg-forest-900/70 text-gold-400 text-xs uppercase tracking-widest">
            <span>Section 06</span>
            <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
            <span>Outdoor Living</span>
          </div>

          <h2 className="font-cinzel text-3xl sm:text-5xl font-bold text-ivory-50 tracking-wide">
            Private <span className="text-gold-gradient">Terrace Garden</span>
          </h2>

          <p className="text-sm sm:text-base text-stone-300 font-light max-w-2xl mx-auto">
            An expansive 23 &times; 30 FT rooftop sanctuary crowned with a timber pergola, natural green lawn, and cascading water fountain under the open sky.
          </p>

          {/* Clarity Toggle */}
          <div className="pt-2 flex justify-center">
            <button
              onClick={() => setUseLens(!useLens)}
              className={`px-4 py-1.5 rounded-full text-xs font-cinzel font-bold tracking-wider transition-all flex items-center gap-1.5 border ${
                useLens
                  ? "bg-gold-400 text-forest-950 border-gold-400 shadow-gold-glow"
                  : "glass-panel text-stone-300 border-gold-400/30 hover:text-gold-300"
              }`}
            >
              <Search className="w-3.5 h-3.5" />
              <span>{useLens ? "HD Lens Active" : "Enable HD Magnifier"}</span>
            </button>
          </div>
        </div>

        {/* Cinematic Terrace Visual Stage */}
        <div className="relative rounded-3xl overflow-hidden glass-panel-gold border border-gold-400/30 p-2 sm:p-4 shadow-forest-deep max-w-5xl mx-auto">
          <BorderBeam size={300} duration={14} borderWidth={2} colorFrom="#D5AE43" colorTo="#F7F0D0" />

          {useLens ? (
            <div className="relative rounded-2xl overflow-hidden bg-forest-950 flex items-center justify-center min-h-[440px] sm:min-h-[540px]">
              <ImageLensZoom
                src="/assets/terrace/terrace-garden-panel.jpg"
                alt="Varahi Anugrahams 23x30 Ft Private Terrace Garden with Pergola, Lawn and Fountain"
                zoomLevel={2.4}
                lensSize={200}
                className="w-full h-auto max-h-[640px]"
              />
            </div>
          ) : (
            <div className="relative rounded-2xl overflow-hidden bg-forest-950 flex items-center justify-center">
              <img
                src="/assets/terrace/terrace-garden-panel.jpg"
                alt="Varahi Anugrahams 23x30 Ft Private Terrace Garden with Pergola, Lawn and Fountain"
                className="w-full h-auto max-h-[640px] object-contain object-center crisp-image"
              />

              {/* Floating Dimension Callout Badge */}
              <div className="absolute top-4 left-4 glass-panel px-4 py-2 rounded-full border border-gold-400/40 text-xs text-gold-300 flex items-center gap-2 shadow-gold-glow pointer-events-none">
                <Sparkles className="w-4 h-4 text-gold-400" />
                <span className="font-cinzel font-bold">Size: 23 FT. &times; 30 FT.</span>
                <span className="text-stone-300 hidden sm:inline">(690 Sq. Ft. Private Sky Sanctuary)</span>
              </div>
            </div>
          )}

          {/* Bottom Narrative Strip */}
          <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4 glass-panel p-5 sm:p-6 rounded-2xl border border-gold-400/30">
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-[11px] font-sans tracking-widest uppercase text-gold-400 font-semibold">
                ROOFTOP EXPERIENCE
              </span>
              <h3 className="font-cinzel text-base sm:text-lg font-bold text-ivory-50">
                Timber Pergola &bull; Green Grass Lawn &bull; Soothing Water Fountain
              </h3>
            </div>

            <button
              onClick={() => onOpenTour("terrace")}
              className="px-6 py-3 rounded-full bg-gold-400 hover:bg-gold-300 text-forest-950 font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-gold-glow flex items-center gap-2 shrink-0 group hover:scale-105 active:scale-95"
            >
              <Compass className="w-4 h-4 group-hover:rotate-45 transition-transform" />
              <span>Tour Terrace Garden</span>
            </button>
          </div>
        </div>

        {/* 4 Storyboard Verified Features Grid with Spotlight Cards (21st.dev style) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 max-w-5xl mx-auto">
          <SpotlightCard className="p-5">
            <div className="w-10 h-10 rounded-full bg-forest-800 border border-gold-400/30 flex items-center justify-center text-gold-400 mb-3 shadow-gold-glow">
              <Sparkles className="w-5 h-5" />
            </div>
            <h4 className="font-cinzel text-sm font-bold text-ivory-100 mb-1">Architectural Pergola</h4>
            <p className="text-xs text-stone-300 font-light leading-relaxed">
              Treated timber pergola with comfortable resort-grade seating designed for tranquil evenings.
            </p>
          </SpotlightCard>

          <SpotlightCard className="p-5">
            <div className="w-10 h-10 rounded-full bg-forest-800 border border-gold-400/30 flex items-center justify-center text-gold-400 mb-3 shadow-gold-glow">
              <Trees className="w-5 h-5" />
            </div>
            <h4 className="font-cinzel text-sm font-bold text-ivory-100 mb-1">Green Grass Lawn</h4>
            <p className="text-xs text-stone-300 font-light leading-relaxed">
              Manicured natural soft turf lawn bringing biophilic greenery directly into your daily lifestyle.
            </p>
          </SpotlightCard>

          <SpotlightCard className="p-5">
            <div className="w-10 h-10 rounded-full bg-forest-800 border border-gold-400/30 flex items-center justify-center text-gold-400 mb-3 shadow-gold-glow">
              <Droplets className="w-5 h-5" />
            </div>
            <h4 className="font-cinzel text-sm font-bold text-ivory-100 mb-1">Stone Water Fountain</h4>
            <p className="text-xs text-stone-300 font-light leading-relaxed">
              Cascading ambient fountain creating relaxing acoustic ripples and cooling the rooftop microclimate.
            </p>
          </SpotlightCard>

          <SpotlightCard className="p-5">
            <div className="w-10 h-10 rounded-full bg-forest-800 border border-gold-400/30 flex items-center justify-center text-gold-400 mb-3 shadow-gold-glow">
              <Moon className="w-5 h-5" />
            </div>
            <h4 className="font-cinzel text-sm font-bold text-ivory-100 mb-1">Cooled Moonlight Suite</h4>
            <p className="text-xs text-stone-300 font-light leading-relaxed">
              Optional starlit terrace bedroom offering panoramic night sky vistas to beat summer heat.
            </p>
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
};
