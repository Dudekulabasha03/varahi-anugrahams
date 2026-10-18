"use client";

import React, { useState } from "react";

export const ReferenceStyleNav: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-[5vw] py-[18px] text-white bg-gradient-to-b from-black/60 to-transparent">
      {/* Brand Wordmark */}
      <a
        href="#top"
        className="font-serif tracking-[0.28em] text-[18px] text-white uppercase no-underline hover:text-gold transition-colors"
      >
        VARAHI ANUGRAHAMS
      </a>

      {/* Mobile Hamburger Toggle */}
      <button
        id="menu"
        aria-label="Menu"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen(!menuOpen)}
        className="md:hidden bg-transparent border border-white/50 text-white px-3 py-1.5 rounded-full text-xs uppercase tracking-wider"
      >
        Menu
      </button>

      {/* Nav Menu Links */}
      <ul
        id="links"
        className={`md:flex items-center gap-[28px] list-none p-0 text-[13px] tracking-[0.08em] uppercase ${
          menuOpen
            ? "flex flex-col absolute top-full left-0 right-0 bg-[#16140f]/95 p-[20px] px-[5vw] gap-4 border-b border-line"
            : "hidden md:flex"
        }`}
      >
        <li>
          <a
            href="#about"
            onClick={() => setMenuOpen(false)}
            className="no-underline hover:text-gold transition-colors"
          >
            Project
          </a>
        </li>
        <li>
          <a
            href="#explore"
            onClick={() => setMenuOpen(false)}
            className="no-underline hover:text-gold transition-colors"
          >
            Explore
          </a>
        </li>
        <li>
          <a
            href="#plans"
            onClick={() => setMenuOpen(false)}
            className="no-underline hover:text-gold transition-colors"
          >
            Plans
          </a>
        </li>
        <li>
          <a
            href="#gallery"
            onClick={() => setMenuOpen(false)}
            className="no-underline hover:text-gold transition-colors"
          >
            Gallery
          </a>
        </li>
        <li>
          <a
            href="#faq"
            onClick={() => setMenuOpen(false)}
            className="no-underline hover:text-gold transition-colors"
          >
            FAQ
          </a>
        </li>
        <li>
          <a
            href="#enquire"
            onClick={() => setMenuOpen(false)}
            className="no-underline hover:text-gold transition-colors"
          >
            Enquire
          </a>
        </li>
      </ul>
    </nav>
  );
};
