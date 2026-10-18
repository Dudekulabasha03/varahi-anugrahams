"use client";

import React from "react";
import { ReferenceStyleNav } from "@/components/ReferenceStyleNav";
import { ContinuousCinematicHero } from "@/components/ContinuousCinematicHero";
import { ReferenceStyleIntro } from "@/components/ReferenceStyleIntro";
import { GsapCinematicScene } from "@/components/GsapCinematicScene";
import { ReferenceStyleEditorialSections } from "@/components/ReferenceStyleEditorialSections";
import { ReferenceStyleBottomSections } from "@/components/ReferenceStyleBottomSections";
import { LuxuryCursor } from "@/components/ui/LuxuryCursor";

import Link from "next/link";

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-bg text-ink overflow-x-hidden selection:bg-gold selection:text-white">
      {/* 1. Interactive Magnetic Cursor: "PLAY" over video stages, "ZOOM" over photos */}
      <LuxuryCursor />

      {/* Floating 21st.dev & ReactBits Glassy Experiment Switcher */}
      <div className="fixed bottom-6 right-6 z-40 pointer-events-auto">
        <Link
          href="/experiment"
          className="group flex items-center gap-2 px-4 py-2.5 rounded-full bg-black/85 hover:bg-black text-white border border-gold/60 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:scale-105"
        >
          <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
          <span className="text-xs font-mono tracking-wider uppercase text-gold font-medium">
            Glassy Experiment Edition →
          </span>
        </Link>
      </div>

      {/* 2. Fixed Luxury Navigation Bar */}
      <ReferenceStyleNav />

      {/* 3. Continuous Multi-Video Cinematic Hero Session:
             Arrival (7s) -> Aerial Community (3s) -> 30 FT Avenue (3.5s) -> 
             Villa Architecture (4.5s) -> Inside Interiors (3.8s) -> Rooftop Terrace (4s) */}
      <ContinuousCinematicHero />

      {/* 4. Editorial Philosophy & Staggered Word Reveal */}
      <ReferenceStyleIntro />

      {/* 5. GSAP ScrollTrigger Pinned Assembly Sequence:
             Frame-by-frame forward & reverse video scrubbing synced with 3 story beats */}
      <GsapCinematicScene />

      {/* 6. Editorial Photo Sections: Rooftop, Facade, Community, Floor Plans, Anti-Termite, Specs */}
      <ReferenceStyleEditorialSections />

      {/* 7. Masonry Photo Gallery, Accordion FAQ, Enquire Form, and Footer */}
      <ReferenceStyleBottomSections />
    </div>
  );
}
