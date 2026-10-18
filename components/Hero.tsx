"use client";

import React, { useRef, useEffect } from "react";
import { PROJECT_CONFIG } from "@/config/projectData";
import { ArrowDown, Sparkles, Compass } from "lucide-react";

interface HeroProps {
  onOpenTour?: () => void;
  onOpenInquiry?: () => void;
  onOpenAIAdvisor?: () => void;
  onOpenGallery?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenTour,
  onOpenInquiry,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Attempt silent autoplay
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Fallback gracefully if browser policy restricts
      });
    }
  }, []);

  return (
    <header id="top" className="relative w-full h-screen min-h-[600px] flex items-end justify-start overflow-hidden bg-forest-950 text-white">
      {/* Background Architectural Video */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          src="/media/videos/hero-arrival.mp4"
          poster="/media/images/residential-avenue.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover select-none"
        />
        {/* Cinematic Vignette & Readability Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950/95 via-forest-950/40 to-forest-950/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-forest-950/80 via-transparent to-forest-950/30" />
      </div>

      {/* Hero Content Stage */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-5 sm:px-8 pb-16 sm:pb-24">
        {/* Divine Invocation Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-gold-400/30 mb-5 sm:mb-6 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-gold-400" />
          <span className="text-xs sm:text-sm font-serif tracking-widest text-gold-light">
            {PROJECT_CONFIG.brand.blessing}
          </span>
          <span className="hidden md:inline text-xs text-stone-300 font-sans tracking-normal border-l border-gold-400/30 pl-2">
            Sri Aluru Kona Ranganatha Swamy Blessings
          </span>
        </div>

        {/* Brand Tagline Eyebrow */}
        <p className="text-xs sm:text-sm uppercase tracking-[0.28em] text-gold-400 font-medium mb-3">
          {PROJECT_CONFIG.brand.name} · VILLA LIVING
        </p>

        {/* Display Headline */}
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-medium tracking-tight text-ivory-50 leading-[1.05] max-w-4xl mb-4 sm:mb-6">
          A Beautiful Way to Come Home.
        </h1>

        {/* Supporting Line */}
        <p className="text-base sm:text-lg md:text-xl text-stone-200/90 font-light max-w-xl leading-relaxed mb-8">
          Discover thoughtfully designed villa living shaped by light, space, and quiet in Tadipatri.
        </p>

        {/* Primary Action Buttons */}
        <div className="flex flex-wrap items-center gap-3.5 sm:gap-4">
          <a
            href="#explore"
            className="px-7 py-3.5 rounded-full bg-gold-500 hover:bg-gold-400 text-forest-950 font-bold text-xs sm:text-sm tracking-widest uppercase transition-all duration-300 shadow-gold-lg hover:scale-[1.02] active:scale-[0.98] inline-flex items-center gap-2"
          >
            <span>Explore the Project</span>
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </a>

          {onOpenInquiry ? (
            <button
              onClick={onOpenInquiry}
              className="px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-ivory-50 border border-white/25 hover:border-gold-400 font-medium text-xs sm:text-sm tracking-widest uppercase transition-all duration-300 backdrop-blur-sm hover:scale-[1.02] active:scale-[0.98]"
            >
              Enquire
            </button>
          ) : (
            <a
              href="#enquire"
              className="px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-ivory-50 border border-white/25 hover:border-gold-400 font-medium text-xs sm:text-sm tracking-widest uppercase transition-all duration-300 backdrop-blur-sm hover:scale-[1.02] active:scale-[0.98]"
            >
              Enquire
            </a>
          )}

          {onOpenTour && (
            <button
              onClick={onOpenTour}
              className="px-6 py-3.5 rounded-full bg-forest-900/60 hover:bg-forest-900/90 text-gold-300 border border-gold-400/40 font-medium text-xs sm:text-sm tracking-widest uppercase transition-all duration-300 backdrop-blur-sm inline-flex items-center gap-2 hover:scale-[1.02]"
            >
              <Compass className="w-4 h-4 text-gold-400" />
              <span>Virtual Tour</span>
            </button>
          )}
        </div>
      </div>

      {/* Subtle Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-70 hover:opacity-100 transition-opacity pointer-events-none">
        <span className="text-[10px] uppercase tracking-[0.2em] text-stone-300">Scroll</span>
        <div className="w-[1px] h-9 bg-gradient-to-b from-gold-400 via-stone-300 to-transparent animate-pulse" />
      </div>
    </header>
  );
};
