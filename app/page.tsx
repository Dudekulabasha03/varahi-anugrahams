"use client";

import React from "react";
import { ReferenceStyleNav } from "@/components/ReferenceStyleNav";
import { ContinuousCinematicHero } from "@/components/ContinuousCinematicHero";
import { ReferenceStyleIntro } from "@/components/ReferenceStyleIntro";
import { GsapCinematicScene } from "@/components/GsapCinematicScene";
import { ReferenceStyleEditorialSections } from "@/components/ReferenceStyleEditorialSections";
import { ReferenceStyleBottomSections } from "@/components/ReferenceStyleBottomSections";
import { LuxuryCursor } from "@/components/ui/LuxuryCursor";

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-bg text-ink overflow-x-hidden selection:bg-gold selection:text-white">
      {/* 1. Interactive Magnetic Cursor: "PLAY" over video stages, "ZOOM" over photos */}
      <LuxuryCursor />

      {/* Ambient Lighting Orbs (ReactBits style) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-br from-[#cda260]/10 via-[#cda260]/5 to-transparent blur-[160px]" />
        <div className="absolute top-[40%] right-[-15%] w-[55vw] h-[55vw] rounded-full bg-gradient-to-bl from-[#9c783e]/10 via-[#664b22]/5 to-transparent blur-[180px]" />
        <div className="absolute bottom-[-10%] left-[20%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-tr from-[#cda260]/8 via-[#856128]/5 to-transparent blur-[160px]" />
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
