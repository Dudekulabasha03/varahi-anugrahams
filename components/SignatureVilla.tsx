"use client";

import React, { useState } from "react";
import { Compass, Sparkles, Info, Eye, Layers, Search, Crosshair, Calendar } from "lucide-react";
import { ImageLensZoom } from "./ui/ImageLensZoom";
import { BorderBeam } from "./ui/BorderBeam";

interface SignatureVillaProps {
  onOpenTour: (roomId?: string) => void;
  onOpenInquiry?: (interest?: string, note?: string) => void;
}

interface Hotspot {
  id: string;
  title: string;
  tag: string;
  description: string;
  x: number; // percentage
  y: number; // percentage
  targetRoomId: string;
}

export const SignatureVilla: React.FC<SignatureVillaProps> = ({ onOpenTour, onOpenInquiry }) => {
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);
  const [interactiveMode, setInteractiveMode] = useState<"hotspots" | "lens">("hotspots");

  const hotspots: Hotspot[] = [
    {
      id: "curved-roof",
      title: "Curved Contemporary Canopy",
      tag: "Architectural Roofline",
      description: "Dramatic cantilevered curved slab with integrated warm recessed LED cove illumination.",
      x: 52,
      y: 22,
      targetRoomId: "terrace",
    },
    {
      id: "timber-fins",
      title: "Vertical Timber Privacy Fins",
      tag: "Solar Shading",
      description: "Warm architectural louvers framing the curved cylindrical stair and room volume.",
      x: 31,
      y: 48,
      targetRoomId: "master",
    },
    {
      id: "balcony-greenery",
      title: "Landscaped Balcony Terraces",
      tag: "Biophilic Living",
      description: "Continuous cantilevered concrete planter troughs cascading with lush greenery and vines.",
      x: 55,
      y: 40,
      targetRoomId: "balcony",
    },
    {
      id: "porthole",
      title: "Circular Architectural Porthole",
      tag: "Signature Window",
      description: "Round black-framed porthole window admitting filtered natural light into the entrance foyer.",
      x: 41,
      y: 75,
      targetRoomId: "foyer",
    },
    {
      id: "car-porch",
      title: "Arched Covered Car Porch",
      tag: "Ground Floor Entry",
      description: "Spacious vehicle garage with curved masonry arch, warm downlights, and secure gate.",
      x: 60,
      y: 80,
      targetRoomId: "porch",
    },
  ];

  return (
    <section id="villa" className="relative py-28 sm:py-36 bg-forest-950 border-t border-gold-400/20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-gold-400/30 bg-forest-900/70 text-gold-400 text-xs uppercase tracking-widest">
            <span>Section 04</span>
            <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
            <span>Exterior Architecture</span>
          </div>

          <h2 className="font-cinzel text-3xl sm:text-5xl font-bold text-ivory-50 tracking-wide">
            The <span className="text-gold-gradient">Signature Villa</span>
          </h2>

          <p className="text-sm sm:text-base text-stone-300 font-light max-w-2xl mx-auto">
            A bespoke three-level residence marrying sculpted organic geometry, warm natural stone, and living landscape.
          </p>

          {/* Interactive Mode Toggle */}
          <div className="pt-2 flex justify-center">
            <div className="glass-panel p-1 rounded-full border border-gold-400/30 inline-flex gap-1.5 shadow-lg text-xs">
              <button
                onClick={() => setInteractiveMode("hotspots")}
                className={`px-4 py-2 rounded-full font-cinzel font-bold tracking-wider transition-all flex items-center gap-1.5 ${
                  interactiveMode === "hotspots"
                    ? "bg-gold-400 text-forest-950 shadow-gold-glow"
                    : "text-stone-300 hover:text-gold-300"
                }`}
              >
                <Crosshair className="w-3.5 h-3.5" />
                <span>Interactive Hotspots</span>
              </button>
              <button
                onClick={() => setInteractiveMode("lens")}
                className={`px-4 py-2 rounded-full font-cinzel font-bold tracking-wider transition-all flex items-center gap-1.5 ${
                  interactiveMode === "lens"
                    ? "bg-gold-400 text-forest-950 shadow-gold-glow"
                    : "text-stone-300 hover:text-gold-300"
                }`}
              >
                <Search className="w-3.5 h-3.5" />
                <span>HD Magnifier Lens</span>
              </button>
            </div>
          </div>
        </div>

        {/* Interactive Facade Stage */}
        <div className="relative rounded-3xl overflow-hidden glass-panel-gold border border-gold-400/30 p-2 sm:p-4 shadow-forest-deep max-w-5xl mx-auto">
          <BorderBeam size={320} duration={14} borderWidth={2} colorFrom="#D5AE43" colorTo="#F7F0D0" />

          {interactiveMode === "lens" ? (
            <div className="relative rounded-2xl overflow-hidden bg-forest-950 flex items-center justify-center min-h-[460px] sm:min-h-[580px]">
              <ImageLensZoom
                src="/assets/exterior/signature-villa-facade.jpg"
                alt="Varahi Anugrahams Signature Villa Exterior Facade"
                zoomLevel={2.5}
                lensSize={210}
                className="w-full h-auto max-h-[680px]"
              />
            </div>
          ) : (
            <div className="relative rounded-2xl overflow-hidden bg-forest-950 flex items-center justify-center">
              {/* Main Architectural Image with Crisp Rendering */}
              <img
                src="/assets/exterior/signature-villa-facade.jpg"
                alt="Varahi Anugrahams Signature Villa Exterior Facade"
                className="w-full h-auto max-h-[680px] object-contain object-center crisp-image"
              />

              {/* Interactive Hotspot Buttons */}
              {hotspots.map((spot) => (
                <div
                  key={spot.id}
                  style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
                >
                  <button
                    onClick={() => setActiveHotspot(activeHotspot?.id === spot.id ? null : spot)}
                    className={`group relative p-2.5 rounded-full transition-all duration-300 ${
                      activeHotspot?.id === spot.id
                        ? "bg-gold-400 text-forest-950 scale-125 shadow-gold-glow"
                        : "bg-forest-950/80 text-gold-300 border border-gold-400/60 hover:bg-gold-400 hover:text-forest-950"
                    }`}
                    aria-label={`Inspect ${spot.title}`}
                  >
                    <span className="absolute inset-0 rounded-full bg-gold-400/40 animate-ping pointer-events-none" />
                    <Sparkles className="w-4 h-4" />

                    <span className="hidden md:group-hover:block absolute left-full ml-3 top-1/2 -translate-y-1/2 whitespace-nowrap bg-forest-950/90 border border-gold-400/40 px-3 py-1 rounded-full text-xs text-gold-300 font-sans font-medium pointer-events-none shadow-lg">
                      {spot.title}
                    </span>
                  </button>
                </div>
              ))}

              {/* Active Hotspot Detail Card Popup */}
              {activeHotspot && (
                <div className="absolute top-6 left-6 right-6 sm:right-auto sm:max-w-sm z-30 glass-panel-gold p-5 rounded-2xl border border-gold-400 animate-fade-in shadow-2xl">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <span className="text-[10px] uppercase tracking-widest text-gold-400 font-semibold">
                      {activeHotspot.tag}
                    </span>
                    <button
                      onClick={() => setActiveHotspot(null)}
                      className="text-stone-400 hover:text-ivory-100 text-xs"
                    >
                      ✕
                    </button>
                  </div>

                  <h4 className="font-cinzel text-base font-bold text-ivory-50 mb-1.5">
                    {activeHotspot.title}
                  </h4>
                  <p className="text-xs text-stone-300 leading-relaxed font-light mb-4">
                    {activeHotspot.description}
                  </p>

                  <button
                    onClick={() => onOpenTour(activeHotspot.targetRoomId)}
                    className="w-full py-2.5 rounded-xl bg-gold-400 hover:bg-gold-300 text-forest-950 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-gold-glow"
                  >
                    <Compass className="w-3.5 h-3.5" />
                    <span>Tour This Space</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Bottom Callout Bar */}
          <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4 glass-panel p-5 sm:p-6 rounded-2xl border border-gold-400/30">
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-[11px] font-sans tracking-widest uppercase text-gold-400 font-semibold">
                ARCHITECTURAL SIGNATURE
              </span>
              <h3 className="font-cinzel text-base sm:text-lg font-bold text-ivory-50">
                Curved Concrete Facade &bull; Wooden Fins &bull; Garden Balconies &bull; Car Porch
              </h3>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
              {onOpenInquiry && (
                <button
                  onClick={() => onOpenInquiry("Signature 3-Level Villa (23×47 ft Plot)", "Interested in scheduling a site walkthrough for the signature curved facade villa.")}
                  className="w-full sm:w-auto px-5 py-3 rounded-full border border-gold-400/80 bg-forest-900/90 hover:bg-gold-400 hover:text-forest-950 text-gold-300 font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-gold-glow flex items-center justify-center gap-2"
                >
                  <Calendar className="w-3.5 h-3.5 text-gold-400" />
                  <span>Request Viewing</span>
                </button>
              )}

              <button
                onClick={() => onOpenTour()}
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-gold-400 hover:bg-gold-300 text-forest-950 font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-gold-glow flex items-center justify-center gap-2 group hover:scale-105 active:scale-95"
              >
                <Compass className="w-4 h-4 group-hover:rotate-45 transition-transform" />
                <span>EXPLORE THIS VILLA</span>
              </button>
            </div>
          </div>
        </div>

        {/* Architectural Features Pill Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mt-10 max-w-5xl mx-auto">
          <div className="glass-panel rounded-xl p-4 border border-gold-400/15">
            <h4 className="font-cinzel text-xs font-bold text-gold-300 uppercase mb-1">Curved Roofline</h4>
            <p className="text-xs text-stone-300 font-light">Organic continuous canopy that shields private terraces from harsh sun.</p>
          </div>
          <div className="glass-panel rounded-xl p-4 border border-gold-400/15">
            <h4 className="font-cinzel text-xs font-bold text-gold-300 uppercase mb-1">Natural Stone</h4>
            <p className="text-xs text-stone-300 font-light">Textured limestone and travertine finishes crafted for generational durability.</p>
          </div>
          <div className="glass-panel rounded-xl p-4 border border-gold-400/15">
            <h4 className="font-cinzel text-xs font-bold text-gold-300 uppercase mb-1">Wooden Fins</h4>
            <p className="text-xs text-stone-300 font-light">Natural timber battens balancing solar shading with intimate privacy.</p>
          </div>
          <div className="glass-panel rounded-xl p-4 border border-gold-400/15">
            <h4 className="font-cinzel text-xs font-bold text-gold-300 uppercase mb-1">Porthole Window</h4>
            <p className="text-xs text-stone-300 font-light">Iconic circular portal connecting the street landscape to the warm foyer.</p>
          </div>
        </div>
      </div>
    </section>
  );
};
