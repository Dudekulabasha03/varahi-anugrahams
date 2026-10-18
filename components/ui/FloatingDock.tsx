"use client";

import React, { useState, useEffect } from "react";
import {
  Compass,
  Home,
  MapPin,
  Trees,
  Layers,
  LayoutGrid,
  Sun,
  Shield,
  PhoneCall,
  Volume2,
  VolumeX,
  Bot,
  Image as ImageIcon,
} from "lucide-react";
import { ambientSound } from "@/lib/audioSynth";

interface FloatingDockProps {
  onOpenTour: () => void;
  onOpenInquiry?: () => void;
  onOpenAIAdvisor?: () => void;
  onOpenGallery?: () => void;
}

export const FloatingDock: React.FC<FloatingDockProps> = ({
  onOpenTour,
  onOpenInquiry,
  onOpenAIAdvisor,
  onOpenGallery,
}) => {
  const [soundActive, setSoundActive] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const sections = ["vision", "gate", "avenue", "villa", "floorplans", "terrace", "amenities", "contact"];
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleSound = () => {
    const s = ambientSound.toggle();
    setSoundActive(s);
  };

  const navItems = [
    { id: "vision", label: "Vision", icon: Home, href: "#vision" },
    { id: "gate", label: "Gate", icon: MapPin, href: "#gate" },
    { id: "avenue", label: "30 FT Avenue", icon: Trees, href: "#avenue" },
    { id: "villa", label: "Signature Villa", icon: Layers, href: "#villa" },
    { id: "floorplans", label: "Floor Plans", icon: LayoutGrid, href: "#floorplans" },
    { id: "terrace", label: "Terrace Garden", icon: Sun, href: "#terrace" },
    { id: "amenities", label: "Facilities", icon: Shield, href: "#amenities" },
    { id: "contact", label: "Enquire", icon: PhoneCall, href: "#contact" },
  ];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 hidden md:block">
      <div className="glass-panel-gold rounded-full px-4 py-2 border border-gold-400/40 shadow-2xl flex items-center gap-1.5 backdrop-blur-xl">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <a
              key={item.id}
              href={item.href}
              className={`group relative p-2.5 rounded-full transition-all duration-300 ${
                isActive
                  ? "bg-gold-400 text-forest-950 font-bold scale-110 shadow-gold-glow"
                  : "text-stone-300 hover:text-gold-300 hover:bg-forest-800/80"
              }`}
              aria-label={item.label}
            >
              <Icon className="w-4 h-4" />
              {/* Tooltip on hover */}
              <span className="absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap px-2.5 py-0.5 rounded-full bg-forest-950/95 border border-gold-400/40 text-[10px] text-gold-300 font-sans opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
                {item.label}
              </span>
            </a>
          );
        })}

        {/* AI Advisor Button */}
        {onOpenAIAdvisor && (
          <button
            onClick={onOpenAIAdvisor}
            className="group relative p-2.5 rounded-full text-gold-300 hover:bg-forest-800 transition-colors"
            aria-label="AI Property Advisor"
          >
            <Bot className="w-4 h-4 text-gold-400 animate-pulse" />
            <span className="absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap px-2.5 py-0.5 rounded-full bg-forest-950/95 border border-gold-400/40 text-[10px] text-gold-300 font-sans opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
              AI Advisor
            </span>
          </button>
        )}

        {/* Gallery Button */}
        {onOpenGallery && (
          <button
            onClick={onOpenGallery}
            className="group relative p-2.5 rounded-full text-stone-300 hover:text-gold-300 hover:bg-forest-800 transition-colors"
            aria-label="HD Photo Gallery"
          >
            <ImageIcon className="w-4 h-4" />
            <span className="absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap px-2.5 py-0.5 rounded-full bg-forest-950/95 border border-gold-400/40 text-[10px] text-gold-300 font-sans opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
              Gallery
            </span>
          </button>
        )}

        <div className="w-[1px] h-5 bg-gold-400/30 mx-1" />

        {/* Ambient Sound Icon */}
        <button
          onClick={toggleSound}
          className={`p-2.5 rounded-full transition-colors ${
            soundActive
              ? "bg-gold-400/20 text-gold-300 border border-gold-400"
              : "text-stone-300 hover:text-gold-300 hover:bg-forest-800"
          }`}
          title={soundActive ? "Mute Ambience" : "Play Ambience"}
        >
          {soundActive ? <Volume2 className="w-4 h-4 animate-pulse text-gold-400" /> : <VolumeX className="w-4 h-4" />}
        </button>

        {/* Quick Tour Launcher */}
        <button
          onClick={onOpenTour}
          className="ml-1 px-4 py-1.5 rounded-full bg-gold-400 hover:bg-gold-300 text-forest-950 text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-gold-glow flex items-center gap-1.5 hover:scale-105 active:scale-95"
        >
          <Compass className="w-3.5 h-3.5" />
          <span>Tour</span>
        </button>
      </div>
    </div>
  );
};
