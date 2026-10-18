"use client";

import React from "react";
import { ArrowDown, Sparkles, Compass, ShieldCheck, Award } from "lucide-react";

export const GlassyHero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-[5vw] pt-[120px] pb-[10vh] overflow-hidden">
      {/* Background Video with Glassmorphism Overlays */}
      <div className="absolute inset-0 z-0">
        <video
          src="/media/videos/community-drone.mp4"
          autoPlay
          muted
          loop
          playsInline
          poster="/media/images/residential-avenue.jpg"
          className="w-full h-full object-cover scale-105 filter brightness-[0.45] contrast-[1.05]"
        />
        {/* Subtle Radial Vignette */}
        <div className="absolute inset-0 bg-radial-vignette pointer-events-none" />
        {/* Ambient Glass Glow Orbs */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gold/15 rounded-full blur-[160px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-[#d4af37]/10 rounded-full blur-[180px] pointer-events-none" />
      </div>

      {/* Main Glass Hero Stage */}
      <div className="relative z-10 max-w-[1100px] mx-auto text-center flex flex-col items-center">
        {/* Eyebrow Pill with Glass Reflection */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.06] border border-white/[0.15] text-xs font-mono tracking-[0.25em] uppercase text-gold mb-6 backdrop-blur-xl shadow-lg">
          <Sparkles className="w-3.5 h-3.5 text-gold animate-pulse" />
          <span>Marbella · Costa del Sol · Luxury Real Estate</span>
        </div>

        {/* Grand Headline */}
        <h1 className="font-serif text-[clamp(44px,7.5vw,98px)] font-medium text-white leading-[1.02] tracking-tight max-w-[18ch]">
          Effortless Mediterranean Living.
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-stone-300 text-lg sm:text-xl font-light leading-relaxed max-w-[680px]">
          Handpicked residences in Marbella's most coveted enclaves — from beachfront contemporary marvels in Los Monteros to timeless estates in La Zagaleta.
        </p>

        {/* Glass CTAs */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#villas"
            className="px-8 py-4 rounded-full bg-gold hover:bg-gold-hover text-black font-mono font-semibold text-xs uppercase tracking-widest transition-all shadow-xl shadow-gold/25"
          >
            Explore the 6 Villas
          </a>
          <a
            href="#contact"
            className="px-8 py-4 rounded-full bg-white/[0.05] hover:bg-white/[0.12] border border-white/[0.18] text-white font-mono text-xs uppercase tracking-widest backdrop-blur-xl transition-all"
          >
            Book Private Tour
          </a>
        </div>

        {/* Glass Stats Bar (21st.dev style) */}
        <div className="mt-16 w-full max-w-[860px] grid grid-cols-2 sm:grid-cols-4 gap-3 p-3 rounded-[24px] border border-white/[0.1] bg-white/[0.03] backdrop-blur-2xl shadow-2xl">
          <div className="p-4 text-center">
            <p className="font-serif text-2xl sm:text-3xl text-white font-medium">6</p>
            <p className="text-[11px] font-mono uppercase tracking-wider text-stone-400 mt-1">Exclusive Estates</p>
          </div>
          <div className="p-4 text-center border-l border-white/[0.08]">
            <p className="font-serif text-2xl sm:text-3xl text-gold font-medium">€4.9M – €8.5M</p>
            <p className="text-[11px] font-mono uppercase tracking-wider text-stone-400 mt-1">Price Range</p>
          </div>
          <div className="p-4 text-center border-l border-white/[0.08]">
            <p className="font-serif text-2xl sm:text-3xl text-white font-medium">100%</p>
            <p className="text-[11px] font-mono uppercase tracking-wider text-stone-400 mt-1">Prime Locations</p>
          </div>
          <div className="p-4 text-center border-l border-white/[0.08]">
            <p className="font-serif text-2xl sm:text-3xl text-white font-medium">Private</p>
            <p className="text-[11px] font-mono uppercase tracking-wider text-stone-400 mt-1">Advisory Service</p>
          </div>
        </div>

        {/* Down Scroll Pill */}
        <a
          href="#villas"
          aria-label="Scroll down"
          className="mt-12 w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-gold transition-all animate-bounce"
        >
          <ArrowDown className="w-4 h-4" />
        </a>
      </div>
    </section>
  );
};
