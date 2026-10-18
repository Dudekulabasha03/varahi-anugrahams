"use client";

import React, { useState } from "react";
import { ArrowRight, ShieldCheck, Sparkles, SlidersHorizontal, Layers } from "lucide-react";
import { ImageCompareSlider } from "./ui/ImageCompareSlider";
import { BorderBeam } from "./ui/BorderBeam";

export const WelcomeGate: React.FC = () => {
  const [displayMode, setDisplayMode] = useState<"slider" | "single">("slider");
  const [singleView, setSingleView] = useState<"dusk" | "day">("dusk");

  return (
    <section id="gate" className="relative py-28 sm:py-36 bg-forest-950 border-t border-gold-400/20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-gold-400/30 bg-forest-900/70 text-gold-400 text-xs uppercase tracking-widest">
              <span>Section 02</span>
              <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
              <span>Arrival</span>
            </div>

            <h2 className="font-cinzel text-3xl sm:text-5xl font-bold text-ivory-50 tracking-wide">
              The Grand <span className="text-gold-gradient">Welcome Gate</span>
            </h2>
            <p className="text-sm sm:text-base text-stone-300 max-w-xl font-light">
              A monumental portal designed to inspire awe at every homecoming. Compare the dusk illumination against the daytime architectural V-emblem.
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center gap-2 glass-panel-subtle p-1.5 rounded-full border border-gold-400/25 text-xs">
            <button
              onClick={() => setDisplayMode("slider")}
              className={`px-3.5 py-1.5 rounded-full flex items-center gap-1.5 transition-all ${
                displayMode === "slider"
                  ? "bg-gold-400 text-forest-950 font-bold shadow-gold-glow"
                  : "text-stone-300 hover:text-gold-300"
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Interactive Compare Slider</span>
            </button>
            <button
              onClick={() => {
                setDisplayMode("single");
                setSingleView(singleView === "dusk" ? "day" : "dusk");
              }}
              className={`px-3.5 py-1.5 rounded-full flex items-center gap-1.5 transition-all ${
                displayMode === "single"
                  ? "bg-gold-400 text-forest-950 font-bold shadow-gold-glow"
                  : "text-stone-300 hover:text-gold-300"
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Toggle Single View</span>
            </button>
          </div>
        </div>

        {/* Cinematic Gate Showcase */}
        <div className="relative rounded-3xl overflow-hidden glass-panel-gold border border-gold-400/30 p-2 sm:p-4 shadow-forest-deep max-w-5xl mx-auto">
          <BorderBeam size={280} duration={14} borderWidth={2} colorFrom="#D5AE43" colorTo="#F7F0D0" />

          {displayMode === "slider" ? (
            <ImageCompareSlider
              beforeImage="/assets/gate/welcome-gate-dusk.jpg"
              afterImage="/assets/gate/welcome-gate-day-panel.jpg"
              beforeLabel="Twilight Dusk Arrival"
              afterLabel="Daytime V-Emblem"
              className="aspect-[4/3] sm:aspect-[16/10] md:aspect-[16/9] w-full"
            />
          ) : (
            <div className="relative aspect-[4/3] sm:aspect-[16/10] md:aspect-[16/9] w-full rounded-2xl overflow-hidden bg-forest-950">
              <img
                src={
                  singleView === "dusk"
                    ? "/assets/gate/welcome-gate-dusk.jpg"
                    : "/assets/gate/welcome-gate-day-panel.jpg"
                }
                alt="Varahi Anugrahams Welcome Gate"
                className="w-full h-full object-cover object-center crisp-image"
              />
              <div className="absolute top-4 left-4 glass-panel px-3 py-1 rounded-full border border-gold-400/40 text-xs text-gold-300">
                {singleView === "dusk" ? "Twilight Dusk" : "Daytime V-Emblem"}
              </div>
            </div>
          )}

          {/* Bottom Card / CTA Banner */}
          <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4 glass-panel p-5 sm:p-6 rounded-2xl border border-gold-400/30">
            <div className="space-y-1 text-center sm:text-left">
              <h3 className="font-cinzel text-base sm:text-lg font-bold text-ivory-50 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-gold-400" />
                <span>Grand Illuminated Portal with 24/7 Security</span>
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 font-light">
                Grand V-emblem security gate opening into a tranquil, landscaped private community.
              </p>
            </div>

            <a
              href="#avenue"
              className="px-6 py-3 rounded-full bg-gold-400 hover:bg-gold-300 text-forest-950 font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-gold-glow flex items-center gap-2 shrink-0 hover:scale-105 active:scale-95"
            >
              <span>ENTER THE COMMUNITY</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Storyboard Detail Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 max-w-5xl mx-auto">
          <div className="glass-panel rounded-xl p-5 border border-gold-400/15">
            <p className="text-xs font-cinzel text-gold-400 tracking-wider mb-1 uppercase font-semibold">
              Grand V-Emblem
            </p>
            <p className="text-xs text-stone-300 font-light">
              Distinctive bespoke metal craftwork gate emblazoned with the signature golden &lsquo;V&rsquo; insignia.
            </p>
          </div>

          <div className="glass-panel rounded-xl p-5 border border-gold-400/15">
            <p className="text-xs font-cinzel text-gold-400 tracking-wider mb-1 uppercase font-semibold">
              Landscaped Curbs
            </p>
            <p className="text-xs text-stone-300 font-light">
              Lush agave planters, flowering shrubs, and warm uplighting guiding vehicles gracefully inside.
            </p>
          </div>

          <div className="glass-panel rounded-xl p-5 border border-gold-400/15">
            <p className="text-xs font-cinzel text-gold-400 tracking-wider mb-1 uppercase font-semibold">
              Complete Privacy
            </p>
            <p className="text-xs text-stone-300 font-light">
              Perimeter security walls framed by dense tree foliage, insulating residents from outside commotion.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
