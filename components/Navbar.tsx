"use client";

import React, { useState, useEffect } from "react";
import { PROJECT_CONFIG } from "@/config/projectData";
import { Volume2, VolumeX, Menu, X, Compass, PhoneCall } from "lucide-react";
import { ambientSound } from "@/lib/audioSynth";

interface NavbarProps {
  onOpenTour: () => void;
  onOpenInquiry?: () => void;
  onOpenAIAdvisor?: () => void;
  onOpenGallery?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenTour,
  onOpenInquiry,
  onOpenAIAdvisor,
  onOpenGallery,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [soundActive, setSoundActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleSound = () => {
    const state = ambientSound.toggle();
    setSoundActive(state);
  };

  const navLinks = [
    { name: "Project", href: "#about" },
    { name: "Assembly", href: "#scene" },
    { name: "Explore", href: "#explore" },
    { name: "Villa", href: "#villa" },
    { name: "Community", href: "#gate" },
    { name: "Plans", href: "#floorplans" },
    { name: "Engineering", href: "#construction" },
    { name: "Specs", href: "#specs" },
    { name: "Gallery", href: "#gallery" },
    { name: "FAQ", href: "#faq" },
    { name: "Enquire", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-forest-950/90 backdrop-blur-md border-b border-gold-400/20 py-3 shadow-forest-deep"
          : "bg-gradient-to-b from-forest-950/80 via-forest-950/40 to-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Wordmark */}
          <a href="#" className="flex items-center gap-3 group">
            {/* Lotus emblem svg */}
            <div className="w-9 h-9 rounded-full bg-forest-800/80 border border-gold-400/50 flex items-center justify-center p-1.5 shadow-gold-glow group-hover:scale-105 transition-transform">
              <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-gold-400 stroke-current" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 21c-4-4-7-8.5-7-13a7 7 0 0 1 14 0c0 4.5-3 9-7 13Z" opacity="0.3" fill="currentColor" />
                <path d="M12 21c0-4-3-8-3-12a3 3 0 0 1 6 0c0 4-3 8-3 12Z" />
                <path d="M12 21c-3.5-2.5-6-5-6-8a6 6 0 0 1 12 0c0 3-2.5 5.5-6 8Z" opacity="0.6" />
                <path d="M5 17c2-1 4-1 7 0 3-1 5-1 7 0" />
              </svg>
            </div>
            <div>
              <span className="font-cinzel text-lg sm:text-xl font-bold tracking-widest text-gold-light group-hover:text-gold-300 transition-colors block leading-tight">
                {PROJECT_CONFIG.brand.name}
              </span>
              <span className="text-[10px] sm:text-xs font-sans tracking-[0.25em] text-gold-400/80 uppercase block">
                {PROJECT_CONFIG.brand.tagline}
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-xs uppercase tracking-widest text-ivory-100/90 font-medium">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="hover:text-gold-300 transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-gold-400 hover:after:w-full after:transition-all"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Action CTAs & Sound Toggle */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Ambient Sound Button */}
            <button
              onClick={toggleSound}
              aria-label={soundActive ? "Mute ambient audio" : "Play ambient nature audio"}
              className={`p-2.5 rounded-full border transition-all text-xs flex items-center gap-2 ${
                soundActive
                  ? "bg-gold-400/20 border-gold-400 text-gold-300 shadow-gold-glow"
                  : "bg-forest-900/60 border-gold-400/30 text-stone-300 hover:border-gold-400/60 hover:text-gold-300"
              }`}
              title={soundActive ? "Mute Sound" : "Listen to Nature Ambience"}
            >
              {soundActive ? <Volume2 className="w-4 h-4 animate-pulse" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* AI Advisor Button */}
            {onOpenAIAdvisor && (
              <button
                onClick={onOpenAIAdvisor}
                className="px-3.5 py-2 rounded-full border border-gold-400/50 bg-forest-900/80 hover:bg-gold-400 hover:text-forest-950 text-gold-300 text-xs font-semibold tracking-wider transition-all duration-300 flex items-center gap-1.5 shadow-sm"
              >
                <span className="w-2 h-2 rounded-full bg-gold-400 animate-ping" />
                <span>AI Advisor</span>
              </button>
            )}

            {/* Virtual Tour Pill */}
            <button
              onClick={onOpenTour}
              className="px-3.5 py-2 rounded-full border border-gold-400/60 bg-forest-800/80 hover:bg-gold-400 hover:text-forest-950 text-gold-300 text-xs font-semibold tracking-wider uppercase transition-all duration-300 flex items-center gap-1.5 shadow-gold-glow"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Tour</span>
            </button>

            {/* Request Viewing CTA */}
            {onOpenInquiry ? (
              <button
                onClick={onOpenInquiry}
                className="px-4 py-2 rounded-full bg-gold-400 hover:bg-gold-300 text-forest-950 text-xs font-bold tracking-wider uppercase transition-all duration-300 shadow-gold-lg"
              >
                Request Viewing
              </button>
            ) : (
              <a
                href="#contact"
                className="px-4 py-2 rounded-full bg-gold-400 hover:bg-gold-300 text-forest-950 text-xs font-bold tracking-wider uppercase transition-all duration-300 shadow-gold-lg"
              >
                Enquire
              </a>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={toggleSound}
              className="p-2 rounded-full border border-gold-400/30 text-gold-400"
              aria-label="Toggle Sound"
            >
              {soundActive ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gold-300 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-forest-950/95 backdrop-blur-xl border-b border-gold-400/30 px-6 pt-5 pb-8 space-y-4">
          <div className="grid grid-cols-2 gap-3 text-xs uppercase tracking-wider">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 px-3 rounded-lg bg-forest-900/60 border border-gold-400/20 text-ivory-100 hover:bg-forest-800 hover:text-gold-300"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-gold-400/20 flex flex-col gap-2.5">
            {onOpenAIAdvisor && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAIAdvisor();
                }}
                className="w-full py-3 rounded-xl border border-gold-400/60 bg-forest-900 text-gold-300 text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2"
              >
                <span className="w-2 h-2 rounded-full bg-gold-400 animate-ping" />
                <span>AI Property Advisor</span>
              </button>
            )}

            {onOpenGallery && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenGallery();
                }}
                className="w-full py-3 rounded-xl border border-gold-400/40 bg-forest-900/60 text-stone-200 text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2"
              >
                <span>Browse Full Photo Gallery</span>
              </button>
            )}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTour();
              }}
              className="w-full py-3 rounded-xl border border-gold-400 bg-forest-800 text-gold-300 text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2"
            >
              <Compass className="w-4 h-4" />
              <span>Launch Virtual Tour</span>
            </button>

            {onOpenInquiry ? (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenInquiry();
                }}
                className="w-full py-3 rounded-xl bg-gold-400 text-forest-950 text-xs font-bold tracking-wider uppercase text-center shadow-gold-glow"
              >
                Request a Viewing
              </button>
            ) : (
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 rounded-xl bg-gold-400 text-forest-950 text-xs font-bold tracking-wider uppercase text-center"
              >
                Book Site Visit
              </a>
            )}

            <div className="flex justify-center pt-2">
              <a
                href={`tel:${PROJECT_CONFIG.contact.phones[0]}`}
                className="text-xs text-gold-400/90 flex items-center gap-1.5"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Call: +91 {PROJECT_CONFIG.contact.phones[0]}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
