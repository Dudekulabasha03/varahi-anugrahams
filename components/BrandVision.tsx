"use client";

import React, { useState } from "react";
import { PROJECT_CONFIG } from "@/config/projectData";
import { Sparkles, Maximize2, ShieldCheck, Heart, Users, X } from "lucide-react";

export const BrandVision: React.FC = () => {
  const [posterModalOpen, setPosterModalOpen] = useState(false);

  return (
    <section id="vision" className="relative py-28 sm:py-36 bg-forest-900 border-t border-gold-400/20 overflow-hidden">
      {/* Background Decorative Lighting */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold-400/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-forest-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-24 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-gold-400/30 bg-forest-950/70 text-gold-400 text-xs uppercase tracking-widest">
            <span>Section 01</span>
            <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
            <span>Brand &amp; Vision</span>
          </div>

          <h2 className="font-cinzel text-3xl sm:text-5xl lg:text-6xl font-bold text-ivory-50 tracking-wide leading-tight">
            Rooted in Devotion. <br />
            <span className="text-gold-gradient">Elevated by Design.</span>
          </h2>

          <div className="gold-divider w-32 mx-auto mt-4" />
        </div>

        {/* Story Grid: Sacred Poster Showcase & Architectural Ethos */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Authentic Devotional Poster Presentation */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative group cursor-pointer w-full max-w-sm sm:max-w-md rounded-2xl overflow-hidden glass-panel-gold p-3 shadow-forest-deep transition-all duration-500 hover:border-gold-400">
              <div
                onClick={() => setPosterModalOpen(true)}
                className="relative rounded-xl overflow-hidden bg-forest-950 aspect-[3/4.6]"
              >
                <img
                  src="/assets/brand/brand-vision-poster.jpg"
                  alt="Sri Aluru Kona Ranganatha Swamy Blessings - Varahi Anugrahams Brand Poster"
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950/90 via-transparent to-transparent opacity-80" />

                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-gold-300">
                  <span className="font-serif tracking-wider">Approved Devotional Identity</span>
                  <span className="flex items-center gap-1 bg-forest-950/80 px-2.5 py-1 rounded-full border border-gold-400/40">
                    <Maximize2 className="w-3 h-3 text-gold-400" />
                    <span>Expand</span>
                  </span>
                </div>
              </div>
            </div>
            <p className="text-xs text-stone-400 mt-3 text-center italic">
              Tap image to inspect the official Sri Aluru Kona Ranganatha Swamy blessings poster
            </p>
          </div>

          {/* Right Column: Webild Text-Fill Narrative & Core Pillars */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-gold-400 text-xs sm:text-sm font-semibold tracking-widest uppercase">
                <Sparkles className="w-4 h-4" />
                <span>BRINGING NATURE TO EVERY HOME</span>
              </div>

              {/* Webild-Style Text-Fill Narrative */}
              <div className="text-fill-container space-y-4 font-editorial text-2xl sm:text-3xl lg:text-4xl text-ivory-100 font-normal leading-relaxed">
                <p>
                  <span className="text-gold-light font-semibold">VARAHI ANUGRAHAMS</span> was conceived as an ode to intentional, peaceful living in Tadipatri.
                </p>
                <p className="text-stone-300 text-xl sm:text-2xl font-sans font-light leading-relaxed">
                  More than just residences, this gated enclave combines auspicious spiritual heritage with modern biophilic architecture. Every villa is oriented to harvest natural cross-breezes, warm daylight, and panoramic views of landscaped greenery.
                </p>
              </div>
            </div>

            {/* The Three Pillars from Storyboard */}
            <div className="pt-4 border-t border-gold-400/20">
              <p className="text-xs font-cinzel uppercase tracking-[0.2em] text-gold-400 mb-6 font-semibold">
                THE THREE GUIDING PILLARS
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="glass-panel rounded-xl p-5 border border-gold-400/20 hover:border-gold-400/50 transition-all duration-300 group">
                  <div className="w-10 h-10 rounded-full bg-forest-800/80 border border-gold-400/30 flex items-center justify-center text-gold-400 mb-3 group-hover:scale-110 transition-transform shadow-gold-glow">
                    <Heart className="w-5 h-5" />
                  </div>
                  <h3 className="font-cinzel text-base font-bold text-ivory-100 mb-1">Peace</h3>
                  <p className="text-xs text-stone-300 leading-relaxed font-sans">
                    A tranquil, vehicular-calmed sanctuary away from urban hustle, sheltered in private nature.
                  </p>
                </div>

                <div className="glass-panel rounded-xl p-5 border border-gold-400/20 hover:border-gold-400/50 transition-all duration-300 group">
                  <div className="w-10 h-10 rounded-full bg-forest-800/80 border border-gold-400/30 flex items-center justify-center text-gold-400 mb-3 group-hover:scale-110 transition-transform shadow-gold-glow">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <h3 className="font-cinzel text-base font-bold text-ivory-100 mb-1">Prosperity</h3>
                  <p className="text-xs text-stone-300 leading-relaxed font-sans">
                    Harmonious Vaastu-aligned floor plans and enduring craftsmanship that grow in timeless value.
                  </p>
                </div>

                <div className="glass-panel rounded-xl p-5 border border-gold-400/20 hover:border-gold-400/50 transition-all duration-300 group">
                  <div className="w-10 h-10 rounded-full bg-forest-800/80 border border-gold-400/30 flex items-center justify-center text-gold-400 mb-3 group-hover:scale-110 transition-transform shadow-gold-glow">
                    <Users className="w-5 h-5" />
                  </div>
                  <h3 className="font-cinzel text-base font-bold text-ivory-100 mb-1">Togetherness</h3>
                  <p className="text-xs text-stone-300 leading-relaxed font-sans">
                    Thoughtful community spaces, a 30 FT avenue, and private sky terraces for shared family joy.
                  </p>
                </div>
              </div>
            </div>

            {/* Location Reference */}
            <div className="flex items-center gap-3 text-xs text-stone-400 pt-2">
              <span className="w-2 h-2 rounded-full bg-gold-400 animate-ping" />
              <span>Project Location: R.F. Road, Tadipatri — 515411, Andhra Pradesh</span>
            </div>
          </div>
        </div>
      </div>

      {/* High-Resolution Brand Poster Lightbox Modal */}
      {posterModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4">
          <div className="relative max-w-2xl w-full max-h-[92vh] flex flex-col items-center">
            <button
              onClick={() => setPosterModalOpen(false)}
              className="absolute -top-12 right-0 p-2 text-stone-300 hover:text-gold-300 transition-colors bg-forest-950/80 rounded-full border border-gold-400/30"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="overflow-auto max-h-[85vh] rounded-2xl border border-gold-400/40 shadow-2xl">
              <img
                src="/assets/brand/brand-vision-poster.jpg"
                alt="Varahi Anugrahams Full Devotional Poster"
                className="w-full h-auto object-contain"
              />
            </div>
            <p className="text-xs text-gold-300 mt-3 text-center">
              Official Devotional &amp; Brand Artwork — Sri Aluru Kona Ranganatha Swamy Blessings
            </p>
          </div>
        </div>
      )}
    </section>
  );
};
