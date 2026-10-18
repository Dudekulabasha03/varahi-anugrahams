"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Sparkles, Compass } from "lucide-react";

export const GlassyNavbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-[5vw] py-5 flex items-center justify-between pointer-events-none transition-all duration-300">
      {/* Floating Glass Island (21st.dev style) */}
      <nav
        className={`w-full max-w-[1240px] mx-auto flex items-center justify-between px-6 py-3.5 rounded-full border border-white/[0.12] bg-stone-950/40 backdrop-blur-2xl pointer-events-auto transition-all duration-500 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] ${
          scrolled ? "bg-stone-950/80 border-gold/30 py-3" : ""
        }`}
      >
        {/* Brand */}
        <div className="flex items-center gap-3">
          <Link href="/experiment" className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-gold animate-pulse" />
            <span className="font-serif text-lg tracking-[0.25em] uppercase text-white font-semibold">
              LE CERCLE
            </span>
          </Link>
          <span className="hidden sm:inline-block text-[11px] font-mono text-stone-400 border-l border-white/20 pl-3 uppercase">
            Marbella Edition
          </span>
        </div>

        {/* Center Nav Links */}
        <div className="hidden md:flex items-center gap-8 text-xs font-mono uppercase tracking-widest text-stone-300">
          <a href="#villas" className="hover:text-gold transition-colors">
            Our Villas
          </a>
          <a href="#locations" className="hover:text-gold transition-colors">
            Locations
          </a>
          <a href="#contact" className="hover:text-gold transition-colors">
            Private Tour
          </a>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Back to main website switcher */}
          <Link
            href="/"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] text-xs font-mono tracking-wider text-stone-300 hover:text-white transition-all"
            title="Return to primary Varahi Anugrahams website"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-gold" />
            <span className="hidden sm:inline">Varahi Main</span>
          </Link>

          <a
            href="#contact"
            className="px-4 py-2 rounded-full bg-gold hover:bg-gold-hover text-black text-xs font-mono font-semibold uppercase tracking-wider transition-all shadow-md shadow-gold/20"
          >
            Inquire
          </a>
        </div>
      </nav>
    </header>
  );
};
