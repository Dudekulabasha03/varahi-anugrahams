"use client";

import React from "react";
import { PROJECT_CONFIG } from "@/config/projectData";
import { Sparkles, MapPin, Phone, Building } from "lucide-react";

export const Footer: React.FC = () => {
  const c = PROJECT_CONFIG.contact;

  return (
    <footer className="bg-forest-950 border-t border-gold-400/20 pt-16 pb-12 text-stone-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-gold-400/15">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-forest-800 border border-gold-400/50 flex items-center justify-center p-2 shadow-gold-glow">
                <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-gold-400 stroke-current" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 21c-4-4-7-8.5-7-13a7 7 0 0 1 14 0c0 4.5-3 9-7 13Z" opacity="0.3" fill="currentColor" />
                  <path d="M12 21c0-4-3-8-3-12a3 3 0 0 1 6 0c0 4-3 8-3 12Z" />
                  <path d="M12 21c-3.5-2.5-6-5-6-8a6 6 0 0 1 12 0c0 3-2.5 5.5-6 8Z" opacity="0.6" />
                </svg>
              </div>
              <div>
                <h3 className="font-cinzel text-xl font-bold tracking-widest text-gold-light">
                  {PROJECT_CONFIG.brand.name}
                </h3>
                <p className="text-[10px] tracking-[0.25em] text-gold-400 uppercase font-sans">
                  {PROJECT_CONFIG.brand.tagline}
                </p>
              </div>
            </div>

            <p className="text-xs text-stone-300 leading-relaxed max-w-sm font-light">
              A master-planned luxury gated residential enclave celebrating architectural grace, natural greenery, and generational tranquility in Tadipatri.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-900 border border-gold-400/20 text-xs text-gold-300">
              <Sparkles className="w-3.5 h-3.5 text-gold-400" />
              <span>{PROJECT_CONFIG.brand.blessing}</span>
            </div>
          </div>

          {/* Quick Section Navigation */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-cinzel text-xs uppercase tracking-widest text-gold-400 font-bold">
              The Journey
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#vision" className="hover:text-gold-300 transition-colors">01. Brand &amp; Vision</a></li>
              <li><a href="#gate" className="hover:text-gold-300 transition-colors">02. Welcome Gate</a></li>
              <li><a href="#avenue" className="hover:text-gold-300 transition-colors">03. 30 FT Tree-Lined Avenue</a></li>
              <li><a href="#villa" className="hover:text-gold-300 transition-colors">04. Signature Villa Architecture</a></li>
              <li><a href="#floorplans" className="hover:text-gold-300 transition-colors">05. Smart Floor Plans</a></li>
              <li><a href="#terrace" className="hover:text-gold-300 transition-colors">06. Private Terrace Garden</a></li>
              <li><a href="#amenities" className="hover:text-gold-300 transition-colors">07. Attractive Facilities</a></li>
              <li><a href="#contact" className="hover:text-gold-300 transition-colors">08. Book Your Dream Home</a></li>
            </ul>
          </div>

          {/* Contact Verification */}
          <div className="md:col-span-4 space-y-3 text-xs">
            <h4 className="font-cinzel uppercase tracking-widest text-gold-400 font-bold">
              Sales &amp; Site Office
            </h4>
            <div className="space-y-2 text-stone-300">
              <p className="font-bold text-ivory-100 flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-gold-400" />
                <span>{c.promoter} — {c.firm}</span>
              </p>
              <p className="flex items-start gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-gold-400 shrink-0 mt-0.5" />
                <span>{c.address}, {c.town} — {c.pincode}</span>
              </p>
              <div className="flex flex-col gap-1 pt-1">
                {c.phones.map((phone, i) => (
                  <a
                    key={i}
                    href={`tel:${phone}`}
                    className="flex items-center gap-1.5 hover:text-gold-300 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-gold-400" />
                    <span>+91 {phone}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Rights */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-400">
          <p>&copy; {new Date().getFullYear()} {PROJECT_CONFIG.brand.name}. All rights reserved.</p>
          <p className="italic">
            Visual references based on the verified Varahi Anugrahams architectural storyboard.
          </p>
        </div>
      </div>
    </footer>
  );
};
