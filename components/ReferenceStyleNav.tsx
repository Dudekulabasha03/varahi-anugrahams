"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, Menu, X } from "lucide-react";

export const ReferenceStyleNav: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-[5vw] py-5 flex items-center justify-between pointer-events-none transition-all duration-300">
      {/* Floating Glass Island (21st.dev style) */}
      <nav
        className={`w-full max-w-[1240px] mx-auto flex items-center justify-between px-6 py-3.5 rounded-full border border-white/[0.12] bg-stone-950/50 backdrop-blur-2xl pointer-events-auto transition-all duration-500 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] ${
          scrolled ? "bg-stone-950/85 border-gold/30 py-3" : ""
        }`}
      >
        {/* Brand */}
        <div className="flex items-center gap-3">
          <a href="#top" className="flex items-center gap-2 group">
            <span className="w-2.5 h-2.5 rounded-full bg-gold animate-pulse" />
            <span className="font-serif text-lg tracking-[0.25em] uppercase text-white font-semibold group-hover:text-gold transition-colors">
              VARAHI ANUGRAHAMS
            </span>
          </a>
          <span className="hidden lg:inline-block text-[11px] font-mono text-stone-400 border-l border-white/20 pl-3 uppercase tracking-wider">
            Tadipatri · Gated Luxury
          </span>
        </div>

        {/* Center Nav Links */}
        <ul className="hidden md:flex items-center gap-7 list-none p-0 text-xs font-mono uppercase tracking-widest text-stone-300">
          <li>
            <a href="#about" className="hover:text-gold transition-colors">
              Project
            </a>
          </li>
          <li>
            <a href="#scene" className="hover:text-gold transition-colors">
              Assembly
            </a>
          </li>
          <li>
            <a href="#plans" className="hover:text-gold transition-colors">
              Plans
            </a>
          </li>
          <li>
            <a href="#gallery" className="hover:text-gold transition-colors">
              Gallery
            </a>
          </li>
          <li>
            <a href="#faq" className="hover:text-gold transition-colors">
              FAQ
            </a>
          </li>
        </ul>

        {/* Right CTA / Mobile Toggle */}
        <div className="flex items-center gap-3">
          <a
            href="#enquire"
            className="px-5 py-2 rounded-full bg-gold hover:bg-gold-hover text-black text-xs font-mono font-semibold uppercase tracking-wider transition-all shadow-md shadow-gold/20"
          >
            Enquire
          </a>

          {/* Mobile Menu Button */}
          <button
            type="button"
            aria-label="Toggle Navigation Menu"
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden w-9 h-9 rounded-full bg-white/[0.08] border border-white/15 flex items-center justify-center text-white"
          >
            {menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div className="md:hidden fixed inset-x-[5vw] top-[85px] p-6 rounded-[24px] bg-stone-950/95 border border-white/15 backdrop-blur-2xl shadow-2xl z-50 pointer-events-auto animate-fade-in text-center">
          <ul className="space-y-5 text-sm font-mono uppercase tracking-wider text-stone-200">
            <li>
              <a href="#about" onClick={() => setMenuOpen(false)} className="hover:text-gold block py-1">
                The Project
              </a>
            </li>
            <li>
              <a href="#scene" onClick={() => setMenuOpen(false)} className="hover:text-gold block py-1">
                Assembly Scene
              </a>
            </li>
            <li>
              <a href="#plans" onClick={() => setMenuOpen(false)} className="hover:text-gold block py-1">
                Floor Plans
              </a>
            </li>
            <li>
              <a href="#gallery" onClick={() => setMenuOpen(false)} className="hover:text-gold block py-1">
                Gallery &amp; Videos
              </a>
            </li>
            <li>
              <a href="#faq" onClick={() => setMenuOpen(false)} className="hover:text-gold block py-1">
                FAQ
              </a>
            </li>
            <li>
              <a href="#enquire" onClick={() => setMenuOpen(false)} className="hover:text-gold block py-1 text-gold">
                Enquire Now
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};
