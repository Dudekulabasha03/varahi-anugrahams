"use client";

import React from "react";
import { GlassyNavbar } from "@/components/experiment/GlassyNavbar";
import { GlassyHero } from "@/components/experiment/GlassyHero";
import { GlassyVillasGrid } from "@/components/experiment/GlassyVillasGrid";
import { GlassyContact } from "@/components/experiment/GlassyContact";
import Link from "next/link";
import { ArrowLeft, Sparkles, Shield, Compass } from "lucide-react";

export default function ExperimentPage() {
  return (
    <div className="relative min-h-screen bg-[#0d0b08] text-[#ede6d8] selection:bg-gold selection:text-black overflow-x-hidden">
      {/* Background Micro Noise & Ambient Light Layers */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[500px] bg-gradient-to-b from-gold/15 to-transparent blur-[160px]" />
        <div className="absolute top-[40%] right-0 w-[500px] h-[500px] bg-amber-600/10 rounded-full blur-[180px]" />
        <div className="absolute top-[75%] left-0 w-[600px] h-[600px] bg-gold/10 rounded-full blur-[180px]" />
      </div>

      {/* Floating Experiment Banner Pill */}
      <div className="fixed bottom-6 right-6 z-50 pointer-events-auto">
        <Link
          href="/"
          className="group flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-stone-900/90 border border-gold/40 text-xs font-mono tracking-wider text-stone-200 hover:text-white backdrop-blur-2xl shadow-2xl hover:border-gold transition-all"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Active Experiment Mode</span>
          <span className="text-gold group-hover:-translate-x-0.5 transition-transform">← Return</span>
        </Link>
      </div>

      {/* 1. Glassy Floating Navbar */}
      <GlassyNavbar />

      {/* 2. Glassy Cinematic Hero */}
      <GlassyHero />

      {/* 3. The 6 Marbella Villas with 21st.dev Spotlight & Tilt Cards */}
      <GlassyVillasGrid />

      {/* 4. Glassy Contact & Private Tour Booking */}
      <GlassyContact />

      {/* 5. Minimal Glassy Footer */}
      <footer className="relative z-10 border-t border-white/[0.08] px-[5vw] py-12 bg-black/60 backdrop-blur-2xl text-xs font-mono text-stone-400">
        <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="font-serif text-base tracking-[0.2em] text-white uppercase">LE CERCLE</span>
            <span>·</span>
            <span>Experimental 21st.dev / ReactBits Glass Architecture</span>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/" className="text-gold hover:underline">
              ← Return to Varahi Anugrahams Main
            </Link>
            <span>© 2026 Le Cercle Luxury Real Estate</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
