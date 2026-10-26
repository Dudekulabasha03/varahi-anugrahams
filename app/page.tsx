"use client";

import React from "react";
import { SmoothScrollProvider } from "@/components/ui/SmoothScrollProvider";
import { ReferenceStyleNav } from "@/components/ReferenceStyleNav";
import { ContinuousCinematicHero } from "@/components/ContinuousCinematicHero";
import { ReferenceStyleIntro } from "@/components/ReferenceStyleIntro";
import { GsapCinematicScene } from "@/components/GsapCinematicScene";
import { ReferenceStyleEditorialSections } from "@/components/ReferenceStyleEditorialSections";
import { ReferenceStyleBottomSections } from "@/components/ReferenceStyleBottomSections";
import { LuxuryCursor } from "@/components/ui/LuxuryCursor";

export default function HomePage() {
  return (
    <SmoothScrollProvider>
      <div className="relative min-h-screen bg-bg text-ink overflow-x-hidden selection:bg-gold selection:text-white">
        {/* 1. Interactive Magnetic Cursor: "PLAY" over video stages, "ZOOM" over photos */}
        <LuxuryCursor />

        {/* Ambient Lighting Orbs (Zero-blur CSS radial gradients for ultra-fast 120fps scrolling on mobile & desktop) */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <div
            className="absolute top-[-10%] left-[-10%] w-[70vw] h-[70vw] pointer-events-none"
            style={{
              background: "radial-gradient(circle at center, rgba(205, 162, 96, 0.08) 0%, rgba(205, 162, 96, 0.02) 40%, transparent 70%)",
            }}
          />
          <div
            className="absolute top-[40%] right-[-15%] w-[65vw] h-[65vw] pointer-events-none"
            style={{
              background: "radial-gradient(circle at center, rgba(156, 120, 62, 0.07) 0%, rgba(102, 75, 34, 0.02) 40%, transparent 70%)",
            }}
          />
          <div
            className="absolute bottom-[-10%] left-[20%] w-[60vw] h-[60vw] pointer-events-none"
            style={{
              background: "radial-gradient(circle at center, rgba(205, 162, 96, 0.06) 0%, rgba(133, 97, 40, 0.02) 40%, transparent 70%)",
            }}
          />
        </div>

      {/* 2. Fixed Luxury Navigation Bar */}
      <ReferenceStyleNav />

      {/* 3. Continuous Multi-Video Cinematic Hero Session:
             Arrival (7s) -> Aerial Community (3s) -> 30 FT Avenue (3.5s) -> 
             Villa Architecture (4.5s) -> Inside Interiors (51.5s Walkthrough) */}
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
  </SmoothScrollProvider>
  );
}
