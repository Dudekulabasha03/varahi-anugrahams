"use client";

import React, { useState } from "react";
import { SpotlightCard } from "./SpotlightCard";
import { 
  Bed, 
  Bath, 
  Maximize2, 
  Compass, 
  Sparkles, 
  ArrowUpRight, 
  X, 
  Check, 
  MapPin,
  Calendar
} from "lucide-react";

export interface Villa {
  id: string;
  name: string;
  tagline: string;
  location: string;
  price: string;
  beds: number;
  baths: number;
  sqm: number;
  image: string;
  features: string[];
  description: string;
}

export const MARBELLA_VILLAS: Villa[] = [
  {
    id: "villa-serena",
    name: "Villa Serena",
    tagline: "A sunlit 5-bedroom retreat with infinity pool, panoramic sea views, and private garden terraces.",
    location: "Golden Mile · Marbella",
    price: "€6,450,000",
    beds: 5,
    baths: 6,
    sqm: 750,
    image: "/media/images/villa-facade.jpg",
    features: ["Panoramic Sea Views", "Cascading Infinity Pool", "Private Garden Terraces", "Subterranean Cellar"],
    description:
      "Perched on an elevated crest along Marbella's legendary Golden Mile, Villa Serena effortlessly unites organic sandstone textures with floor-to-ceiling glass. The 5-bedroom layout features a grand open-concept salon extending directly to a horizon pool with Mediterranean coastal panoramas.",
  },
  {
    id: "casa-del-sol",
    name: "Casa del Sol",
    tagline: "Contemporary beachfront living with floor-to-ceiling glass, rooftop lounge, and direct beach access.",
    location: "Los Monteros · Marbella",
    price: "€5,800,000",
    beds: 4,
    baths: 5,
    sqm: 620,
    image: "/media/images/terrace-garden.jpg",
    features: ["Direct Beach Access", "Skyline Rooftop Lounge", "Floor-to-Ceiling Glazing", "Custom Pergola Bar"],
    description:
      "Casa del Sol redefines waterfront living in Los Monteros. Wake up to the rhythmic sound of waves and step straight from your private teak deck onto warm Mediterranean sands. The rooftop terrace is an entertainer’s paradise equipped with a slatted pergola, ambient cove illumination, and sunset vistas.",
  },
  {
    id: "villa-andalucia",
    name: "Villa Andalucía",
    tagline: "Traditional charm meets modern luxury — courtyard, olive grove, and a heated outdoor pool.",
    location: "Sierra Blanca · Marbella",
    price: "€7,200,000",
    beds: 6,
    baths: 7,
    sqm: 890,
    image: "/media/images/residential-avenue.jpg",
    features: ["Ancient Olive Grove", "Heated Swimming Pool", "Andalusian Courtyard", "Grand Entry Gate"],
    description:
      "A tribute to authentic Andalusian architectural poise, reimagined with state-of-the-art contemporary finishes. Anchored by a central courtyard with a trickling stone fountain and framed by mature centenary olive trees, this Sierra Blanca residence delivers peerless privacy.",
  },
  {
    id: "the-meridian",
    name: "The Meridian",
    tagline: "Sleek 4-bedroom penthouse villa with smart home technology and sweeping coastal views.",
    location: "Puerto Banús · Marbella",
    price: "€4,950,000",
    beds: 4,
    baths: 4,
    sqm: 510,
    image: "/media/images/floor-plans-complete.jpg",
    features: ["Full Smart Home Automation", "Private High-Speed Lift", "Wraparound Terraces", "Sub-Zero Chef Suite"],
    description:
      "An architectural masterclass suspended high above Puerto Banús marina. The Meridian offers seamless biometric access, automated shading, and integrated surround acoustics, creating an effortlessly intelligent coastal aerie.",
  },
  {
    id: "villa-blanca",
    name: "Villa Blanca",
    tagline: "Minimalist white-washed estate with private cinema, spa suite, and landscaped Mediterranean gardens.",
    location: "La Zagaleta · Benahavís",
    price: "€8,500,000",
    beds: 6,
    baths: 8,
    sqm: 980,
    image: "/media/images/welcome-arch-poster.jpg",
    features: ["Dolby Atmos Cinema", "Finnish Sauna & Spa", "Gated Ultra-Private Estate", "Sculpted Water Features"],
    description:
      "Set behind the triple-gated sanctuary of La Zagaleta, Villa Blanca is an uncompromising celebration of minimalist purity. Brilliant white facades contrast with lush cypress gardens, housing a bespoke wellness spa and private acoustic screening room.",
  },
  {
    id: "casa-dorada",
    name: "Casa Dorada",
    tagline: "Golden-hour perfection — west-facing terraces, wine cellar, and an open-plan chef's kitchen.",
    location: "Nueva Andalucía · Marbella",
    price: "€5,400,000",
    beds: 5,
    baths: 5,
    sqm: 680,
    image: "/media/images/anti-termite-system.jpg",
    features: ["West-Facing Sunset Terraces", "Climate-Controlled Wine Room", "Open-Plan Chef's Kitchen", "Infinity Plunge Pool"],
    description:
      "Oriented to capture every nuance of the Mediterranean golden hour. Casa Dorada’s expansive western terraces and bespoke outdoor kitchen allow for year-round alfresco banquets overlooking Nueva Andalucía’s golf valley.",
  },
];

export const GlassyVillasGrid: React.FC = () => {
  const [selectedVilla, setSelectedVilla] = useState<Villa | null>(null);
  const [filter, setFilter] = useState<string>("all");

  const filteredVillas = MARBELLA_VILLAS.filter((villa) => {
    if (filter === "all") return true;
    if (filter === "sea") return villa.features.some((f) => f.includes("Sea") || f.includes("Beach"));
    if (filter === "pool") return villa.features.some((f) => f.includes("Pool"));
    return true;
  });

  return (
    <section id="villas" className="relative px-[5vw] py-[14vh] z-10">
      {/* Editorial Header */}
      <div className="max-w-[760px] mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.1] text-xs font-mono tracking-widest uppercase text-gold mb-4 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Curated Portfolio</span>
        </div>
        <h2 className="font-serif text-[clamp(36px,5.5vw,72px)] font-medium text-white leading-[1.05] tracking-tight">
          Our Villas
        </h2>
        <p className="mt-4 text-stone-300 text-lg sm:text-xl font-light leading-relaxed">
          Handpicked residences in Marbella's most coveted locations, each designed for effortless Mediterranean living.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 mb-10 overflow-x-auto pb-2 scrollbar-none">
        {[
          { key: "all", label: "All Residences (6)" },
          { key: "sea", label: "Sea & Beachfront" },
          { key: "pool", label: "Private Infinity Pools" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className={`px-5 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all backdrop-blur-md border ${
              filter === tab.key
                ? "bg-gold text-black border-gold font-semibold shadow-lg shadow-gold/20"
                : "bg-white/[0.04] text-stone-300 border-white/[0.08] hover:border-white/20 hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 21st.dev Style Glassy Spotlight Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredVillas.map((villa) => (
          <SpotlightCard
            key={villa.id}
            onClick={() => setSelectedVilla(villa)}
            className="group cursor-pointer flex flex-col justify-between hover:border-gold/40 hover:shadow-[0_12px_40px_0_rgba(169,139,79,0.15)]"
          >
            <div>
              {/* Media Container with Glass Frame */}
              <div className="relative aspect-[16/11] overflow-hidden m-3 rounded-[14px]">
                <img
                  src={villa.image}
                  alt={villa.name}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                {/* Top Location Pill */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[11px] font-sans text-stone-200">
                  <MapPin className="w-3 h-3 text-gold" />
                  <span>{villa.location}</span>
                </div>

                {/* Price Tag */}
                <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-gold/90 backdrop-blur-md text-black font-mono text-xs font-semibold shadow-md">
                  {villa.price}
                </div>
              </div>

              {/* Text Info */}
              <div className="p-5 pt-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-2xl text-white group-hover:text-gold transition-colors">
                    {villa.name}
                  </h3>
                  <div className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center text-white/70 group-hover:border-gold group-hover:text-gold group-hover:bg-gold/10 transition-all">
                    <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>

                <p className="mt-2 text-sm text-stone-300 font-light leading-relaxed line-clamp-2">
                  {villa.tagline}
                </p>
              </div>
            </div>

            {/* Bottom Specs Bar */}
            <div className="px-5 pb-5 pt-3 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono text-stone-400">
              <span className="flex items-center gap-1.5">
                <Bed className="w-3.5 h-3.5 text-gold/80" />
                {villa.beds} Beds
              </span>
              <span className="flex items-center gap-1.5">
                <Bath className="w-3.5 h-3.5 text-gold/80" />
                {villa.baths} Baths
              </span>
              <span className="flex items-center gap-1.5">
                <Maximize2 className="w-3.5 h-3.5 text-gold/80" />
                {villa.sqm} m²
              </span>
            </div>
          </SpotlightCard>
        ))}
      </div>

      {/* Glass Dossier Modal / Drawer */}
      {selectedVilla && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-xl p-4 sm:p-6 animate-fade-in"
          onClick={() => setSelectedVilla(null)}
        >
          <div
            className="relative w-full max-w-[800px] max-h-[90vh] overflow-y-auto rounded-[24px] border border-white/20 bg-stone-900/90 backdrop-blur-2xl p-6 sm:p-8 shadow-2xl text-white"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedVilla(null)}
              className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-20"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Image Preview */}
            <div className="relative rounded-[16px] overflow-hidden aspect-[16/9] mb-6">
              <img
                src={selectedVilla.image}
                alt={selectedVilla.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-gold">
                    {selectedVilla.location}
                  </span>
                  <h3 className="font-serif text-3xl sm:text-4xl">{selectedVilla.name}</h3>
                </div>
                <div className="px-4 py-2 rounded-full bg-gold text-black font-mono font-semibold text-sm">
                  {selectedVilla.price}
                </div>
              </div>
            </div>

            {/* Specs Row */}
            <div className="grid grid-cols-3 gap-3 p-4 rounded-[14px] bg-white/[0.05] border border-white/10 text-center mb-6">
              <div>
                <p className="text-[11px] font-mono text-stone-400 uppercase">Bedrooms</p>
                <p className="font-serif text-xl sm:text-2xl mt-0.5">{selectedVilla.beds} Suites</p>
              </div>
              <div className="border-x border-white/10">
                <p className="text-[11px] font-mono text-stone-400 uppercase">Bathrooms</p>
                <p className="font-serif text-xl sm:text-2xl mt-0.5">{selectedVilla.baths} Bath</p>
              </div>
              <div>
                <p className="text-[11px] font-mono text-stone-400 uppercase">Built Area</p>
                <p className="font-serif text-xl sm:text-2xl mt-0.5">{selectedVilla.sqm} m²</p>
              </div>
            </div>

            {/* Description */}
            <p className="text-stone-300 text-base font-light leading-relaxed mb-6">
              {selectedVilla.description}
            </p>

            {/* Features Pill Grid */}
            <div className="mb-8">
              <h4 className="text-xs font-mono uppercase tracking-widest text-gold mb-3">
                Key Highlights
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedVilla.features.map((feat, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 p-2.5 rounded-[10px] bg-white/[0.03] border border-white/[0.08] text-sm text-stone-200"
                  >
                    <Check className="w-4 h-4 text-gold flex-shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-white/10">
              <a
                href="#contact"
                onClick={() => setSelectedVilla(null)}
                className="btn fill w-full sm:w-auto text-center justify-center flex-1"
              >
                Book Private Viewing
              </a>
              <a
                href="mailto:hello@lecercle.com?subject=Inquiry%20for%20"
                className="btn w-full sm:w-auto text-center justify-center border-white/30 hover:border-gold"
              >
                Email hello@lecercle.com
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
