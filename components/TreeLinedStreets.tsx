"use client";

import React, { useState } from "react";
import { PROJECT_CONFIG } from "@/config/projectData";
import { Compass, Eye, Map, Trees, Sparkles, Navigation, SlidersHorizontal } from "lucide-react";
import { ImageCompareSlider } from "./ui/ImageCompareSlider";
import { BorderBeam } from "./ui/BorderBeam";

export const TreeLinedStreets: React.FC = () => {
  const [activeView, setActiveView] = useState<"slider" | "aerial" | "street">("slider");

  return (
    <section id="avenue" className="relative py-28 sm:py-36 bg-forest-900 border-t border-gold-400/20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-gold-400/30 bg-forest-950/70 text-gold-400 text-xs uppercase tracking-widest">
              <span>Section 03</span>
              <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
              <span>Community Avenue</span>
            </div>

            <h2 className="font-cinzel text-3xl sm:text-5xl font-bold text-ivory-50 tracking-wide">
              The <span className="text-gold-gradient">30 FT Tree-Lined Boulevard</span>
            </h2>
            <p className="text-sm sm:text-base text-stone-300 max-w-xl font-light">
              Wide avenues framed by royal palms and modern street architecture. Slide between the high-altitude drone master plan and the street-level avenue perspective.
            </p>
          </div>

          {/* Perspective View Switcher */}
          <div className="glass-panel-subtle rounded-full p-1.5 flex items-center gap-1 border border-gold-400/20 text-xs">
            <button
              onClick={() => setActiveView("slider")}
              className={`px-3.5 py-2 rounded-full flex items-center gap-1.5 transition-all ${
                activeView === "slider"
                  ? "bg-gold-400 text-forest-950 font-bold shadow-gold-glow"
                  : "text-stone-300 hover:text-gold-300"
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Compare Slider</span>
            </button>
            <button
              onClick={() => setActiveView("aerial")}
              className={`px-3.5 py-2 rounded-full flex items-center gap-1.5 transition-all ${
                activeView === "aerial"
                  ? "bg-gold-400 text-forest-950 font-bold shadow-gold-glow"
                  : "text-stone-300 hover:text-gold-300"
              }`}
            >
              <Map className="w-3.5 h-3.5" />
              <span>Drone Layout</span>
            </button>
            <button
              onClick={() => setActiveView("street")}
              className={`px-3.5 py-2 rounded-full flex items-center gap-1.5 transition-all ${
                activeView === "street"
                  ? "bg-gold-400 text-forest-950 font-bold shadow-gold-glow"
                  : "text-stone-300 hover:text-gold-300"
              }`}
            >
              <Trees className="w-3.5 h-3.5" />
              <span>Street Level</span>
            </button>
          </div>
        </div>

        {/* Cinematic Media Showcase */}
        <div className="relative rounded-3xl overflow-hidden glass-panel-gold border border-gold-400/30 p-2 sm:p-4 shadow-forest-deep max-w-5xl mx-auto">
          <BorderBeam size={280} duration={14} borderWidth={2} colorFrom="#D5AE43" colorTo="#F7F0D0" />

          {activeView === "slider" ? (
            <ImageCompareSlider
              beforeImage="/assets/streets/master-plan-aerial-30ft.jpg"
              afterImage="/assets/streets/tree-lined-streets-day-panel.jpg"
              beforeLabel="Aerial Master Plan (30 FT Road)"
              afterLabel="Street-Level Boulevard View"
              className="aspect-[4/3] sm:aspect-[16/10] md:aspect-[16/9] w-full"
            />
          ) : (
            <div className="relative aspect-[4/3] sm:aspect-[16/10] md:aspect-[16/9] w-full rounded-2xl overflow-hidden bg-forest-950">
              <img
                src={
                  activeView === "aerial"
                    ? "/assets/streets/master-plan-aerial-30ft.jpg"
                    : "/assets/streets/tree-lined-streets-day-panel.jpg"
                }
                alt="Varahi Anugrahams Boulevard"
                className="w-full h-full object-cover object-center crisp-image"
              />

              {activeView === "aerial" && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1.5 pointer-events-none">
                  <span className="px-3.5 py-1.5 rounded-full bg-forest-950/90 border border-gold-400 text-gold-300 text-xs font-cinzel font-bold shadow-gold-glow">
                    30 FT CENTRAL ROAD
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Bottom Narrative Badge */}
          <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4 glass-panel p-5 sm:p-6 rounded-2xl border border-gold-400/30">
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-[11px] font-sans tracking-widest uppercase text-gold-400 font-semibold">
                COMMUNITY PLANNING
              </span>
              <h3 className="font-cinzel text-base sm:text-lg font-bold text-ivory-50">
                Symmetrical Luxury Villa Enclave &bull; 30 FT Central Avenue
              </h3>
            </div>

            <a
              href="#villa"
              className="px-5 py-2.5 rounded-full border border-gold-400 bg-forest-800/80 hover:bg-gold-400 hover:text-forest-950 text-gold-300 text-xs font-semibold tracking-wider uppercase transition-all duration-300 shadow-gold-glow flex items-center gap-2 hover:scale-105 active:scale-95"
            >
              <span>Explore The Villa</span>
              <Navigation className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Feature Badges Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mt-10 max-w-5xl mx-auto">
          <div className="glass-panel rounded-xl p-4 sm:p-5 border border-gold-400/15">
            <p className="text-xl sm:text-2xl font-cinzel font-bold text-gold-300">30 FT</p>
            <p className="text-xs text-stone-300 font-light mt-1">Wide central roadway ensuring effortless two-way traffic and parking.</p>
          </div>
          <div className="glass-panel rounded-xl p-4 sm:p-5 border border-gold-400/15">
            <p className="text-xl sm:text-2xl font-cinzel font-bold text-gold-300">100%</p>
            <p className="text-xs text-stone-300 font-light mt-1">Concealed underground utilities for wires, cables, and drainage lines.</p>
          </div>
          <div className="glass-panel rounded-xl p-4 sm:p-5 border border-gold-400/15">
            <p className="text-xl sm:text-2xl font-cinzel font-bold text-gold-300">Royal Palms</p>
            <p className="text-xs text-stone-300 font-light mt-1">Lush evergreen landscape lining every curb for natural canopy shading.</p>
          </div>
          <div className="glass-panel rounded-xl p-4 sm:p-5 border border-gold-400/15">
            <p className="text-xl sm:text-2xl font-cinzel font-bold text-gold-300">Warm Illumination</p>
            <p className="text-xs text-stone-300 font-light mt-1">Architectural street lighting creating a serene evening ambiance.</p>
          </div>
        </div>
      </div>
    </section>
  );
};
