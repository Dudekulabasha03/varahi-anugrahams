"use client";

import React, { useState } from "react";
import { Sparkles, ZoomIn } from "lucide-react";
import { UniversalLightbox, LightboxItem } from "./ui/UniversalLightbox";

export const GallerySection: React.FC = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const galleryItems: (LightboxItem & { aspect: string; tag: string })[] = [
    {
      src: "/media/images/villa-facade.jpg",
      alt: "Varahi Anugrahams Signature Villa Facade at Dusk",
      title: "Signature Villa Facade",
      caption: "Curved textured sandstone facade with warm architectural illumination and vertical timber fins.",
      aspect: "aspect-[4/5]",
      tag: "Architecture",
    },
    {
      src: "/media/images/welcome-arch-poster.jpg",
      alt: "Varahi Anugrahams Monumental Entrance Arch & Divine Invocation",
      title: "Monumental Entrance Gate",
      caption: "Grand arrival portal with Sri Alurukona Ranganathaswamy divine blessings and sunset boulevard view.",
      aspect: "aspect-[2/3]",
      tag: "Arrival Portal",
    },
    {
      src: "/media/images/residential-avenue.jpg",
      alt: "30 FT Wide Tree-Lined Residential Avenue",
      title: "30 FT Central Boulevard",
      caption: "Symmetrical avenue of luxury villas framed by royal palm trees and modern luminaires.",
      aspect: "aspect-[4/3]",
      tag: "The Community",
    },
    {
      src: "/media/images/floor-plans-complete.jpg",
      alt: "3D Isometric Ground and First Floor Plans",
      title: "3D Architectural Floor Plans",
      caption: "Complete 3D layout showing parking, living pavilion, pooja room, and master suites.",
      aspect: "aspect-[16/10]",
      tag: "Layout",
    },
    {
      src: "/assets/interiors/living-room.jpg",
      alt: "Double-Height Contemporary Living Pavilion",
      title: "Double-Height Living Pavilion",
      caption: "Expansive living spaces filled with natural light and fluted timber wall accents.",
      aspect: "aspect-[4/3]",
      tag: "Interiors",
    },
    {
      src: "/media/images/anti-termite-system.jpg",
      alt: "Sub-Surface Anti-Termite Reticulation System",
      title: "Foundation Reticulation System",
      caption: "Porous sub-slab piping grid with brick supports protecting structure foundation.",
      aspect: "aspect-[4/3]",
      tag: "Engineering",
    },
    {
      src: "/assets/interiors/master-bedroom.jpg",
      alt: "Master Bedroom Suite with Walk-In Wardrobe",
      title: "Master Bedroom Suite",
      caption: "Spacious private bedroom retreat with wide glass doors opening to private balconies.",
      aspect: "aspect-[4/3]",
      tag: "Interiors",
    },
    {
      src: "/assets/terrace/terrace-garden-panel.jpg",
      alt: "Private Rooftop Sky Terrace and Pergola",
      title: "Rooftop Terrace Garden",
      caption: "23 × 30 ft open-air terrace with timber pergola and tranquil evening lounge seating.",
      aspect: "aspect-[16/9]",
      tag: "Lifestyle",
    },
  ];

  const handleOpenItem = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <section id="gallery" className="py-24 sm:py-32 px-5 sm:px-8 max-w-7xl mx-auto border-t border-gold-400/15">
      {/* Section Header */}
      <div className="max-w-3xl mb-12 sm:mb-16 space-y-4">
        <div className="inline-flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-gold-500" />
          <span className="text-xs uppercase tracking-[0.25em] text-gold-600 dark:text-gold-400 font-semibold font-sans">
            Visual Portfolio
          </span>
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal text-forest-950 dark:text-ivory-50 tracking-tight leading-[1.08]">
          Moments from the project.
        </h2>
        <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 font-light max-w-xl leading-relaxed">
          Explore genuine photography, 3D renderings, and technical blueprints captured directly from the
          Varahi Anugrahams development.
        </p>
      </div>

      {/* Masonry / Responsive Grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 sm:gap-6 space-y-5 sm:space-y-6">
        {galleryItems.map((item, idx) => (
          <div
            key={idx}
            tabIndex={0}
            role="button"
            aria-label={`Open ${item.title}`}
            onClick={() => handleOpenItem(idx)}
            onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && handleOpenItem(idx)}
            className="group relative rounded-2xl overflow-hidden bg-stone-900 border border-white/10 shadow-lg cursor-zoom-in break-inside-avoid transition-all duration-300 hover:scale-[1.02] hover:border-gold-400/60"
          >
            <img
              src={item.src}
              alt={item.alt}
              loading="lazy"
              className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
            />

            {/* Hover Scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-5 flex flex-col justify-between">
              <div className="flex justify-end">
                <span className="p-2 rounded-full bg-black/60 text-gold-300 backdrop-blur-sm">
                  <ZoomIn className="w-4 h-4" />
                </span>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-widest text-gold-400 font-mono font-medium">
                  {item.tag}
                </span>
                <h4 className="font-serif text-xl text-white font-medium">{item.title}</h4>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Universal Lightbox Modal */}
      <UniversalLightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        items={galleryItems}
        initialIndex={lightboxIndex}
      />
    </section>
  );
};
