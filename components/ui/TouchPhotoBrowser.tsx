"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  ZoomIn,
  ZoomOut,
  Sparkles,
  Layers,
  Search,
} from "lucide-react";

export interface GalleryPhoto {
  id: string;
  src: string;
  title: string;
  category: "Exterior" | "Floorplans" | "Terrace" | "Avenue" | "Gate" | "Amenities" | "Interiors";
  caption: string;
}

const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: "facade-dusk",
    src: "/assets/exterior/signature-villa-facade.jpg",
    title: "Signature Villa Facade (Dusk)",
    category: "Exterior",
    caption: "Curved contemporary canopy, natural stone, vertical timber fins, and arched car porch with agave landscaping.",
  },
  {
    id: "ground-floor",
    src: "/assets/floorplans/ground-floor-3d.jpg",
    title: "Ground Floor Plan (23×47 ft)",
    category: "Floorplans",
    caption: "Car parking, formal living (10'1½\"×7'), main living (16'1½\"×12'3\"), pooja (4'×6'), dining, kitchen, and elder-friendly master suite.",
  },
  {
    id: "first-floor",
    src: "/assets/floorplans/first-floor-3d.jpg",
    title: "First Floor Plan (23×47 ft)",
    category: "Floorplans",
    caption: "Primary master bedroom (13'×20'), ensuite bath, child room (13'×13'), family lounge, dressing rooms, and front balcony.",
  },
  {
    id: "terrace-garden",
    src: "/assets/terrace/terrace-garden-panel.jpg",
    title: "23×30 FT Private Terrace Garden",
    category: "Terrace",
    caption: "Handcrafted timber pergola, lush green grass lawn, cascading stone fountain, and starlit open sky.",
  },
  {
    id: "anti-termite",
    src: "/assets/amenities/anti-termite-piping.jpg",
    title: "Anti-Termite Reticulation Piping System",
    category: "Amenities",
    caption: "Continuous subterranean foundation piping grid with brick supports across the 23×47 ft footprint.",
  },
  {
    id: "avenue-day",
    src: "/assets/streets/tree-lined-streets-day-panel.jpg",
    title: "30 FT Tree-Lined Boulevard",
    category: "Avenue",
    caption: "Wide paved central avenue framed by Royal Palms, landscaped curbs, and warm evening illumination.",
  },
  {
    id: "welcome-gate-dusk",
    src: "/assets/gate/welcome-gate-dusk.jpg",
    title: "Grand Welcome Gate (Twilight)",
    category: "Gate",
    caption: "Monumental illuminated entrance portal with 24/7 security cabin and controlled access.",
  },
  {
    id: "welcome-gate-day",
    src: "/assets/gate/welcome-gate-day-panel.jpg",
    title: "Daytime V-Emblem Welcome Gate",
    category: "Gate",
    caption: "Bespoke metal craftwork gate emblazoned with the signature golden 'V' insignia.",
  },
  {
    id: "master-plan",
    src: "/assets/streets/master-plan-aerial-30ft.jpg",
    title: "Drone Master Layout (30 FT Road)",
    category: "Avenue",
    caption: "Symmetrical villa master planning with underground utilities and wide central boulevard.",
  },
  {
    id: "interior-living",
    src: "/assets/interiors/living-room.jpg",
    title: "Double-Height Living Hall",
    category: "Interiors",
    caption: "Italian marble flooring, fluted timber acoustic wall cladding, and warm ambient cove lighting.",
  },
  {
    id: "interior-master",
    src: "/assets/interiors/master-bedroom.jpg",
    title: "Primary Master Bedroom Suite",
    category: "Interiors",
    caption: "Curved panoramic glass facade opening to morning sunlight and private garden balconies.",
  },
  {
    id: "interior-foyer",
    src: "/assets/interiors/foyer.jpg",
    title: "Entrance Foyer with Porthole Window",
    category: "Interiors",
    caption: "Round architectural portal casting poetic circular sunlit shadows across marble floors.",
  },
];

interface TouchPhotoBrowserProps {
  isOpen: boolean;
  onClose: () => void;
  initialPhotoIndex?: number;
}

export const TouchPhotoBrowser: React.FC<TouchPhotoBrowserProps> = ({
  isOpen,
  onClose,
  initialPhotoIndex = 0,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialPhotoIndex);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [zoomLevel, setZoomLevel] = useState(1);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  useEffect(() => {
    setCurrentIndex(initialPhotoIndex);
  }, [initialPhotoIndex, isOpen]);

  const filteredPhotos =
    activeCategory === "All"
      ? GALLERY_PHOTOS
      : GALLERY_PHOTOS.filter((p) => p.category === activeCategory);

  const safeIndex = Math.min(currentIndex, filteredPhotos.length - 1);
  const currentPhoto = filteredPhotos[safeIndex] || GALLERY_PHOTOS[0];

  const handleNext = () => {
    setZoomLevel(1);
    setCurrentIndex((prev) => (prev + 1) % filteredPhotos.length);
  };

  const handlePrev = () => {
    setZoomLevel(1);
    setCurrentIndex((prev) => (prev - 1 + filteredPhotos.length) % filteredPhotos.length);
  };

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filteredPhotos.length]);

  // Touch Swipe Handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  if (!isOpen) return null;

  const categories = ["All", "Exterior", "Floorplans", "Terrace", "Avenue", "Gate", "Amenities", "Interiors"];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Photo gallery browser"
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex flex-col justify-between p-2 sm:p-4 select-none animate-fade-in"
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between p-2 sm:p-4 z-20">
        <div>
          <span className="text-[10px] uppercase tracking-widest text-gold-400 font-semibold font-sans">
            ARCHITECTURAL PHOTO BROWSER
          </span>
          <p className="font-cinzel text-xs sm:text-sm font-bold text-ivory-100">
            {currentPhoto.title}
          </p>
        </div>

        {/* Zoom & Close Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setZoomLevel((z) => Math.min(z + 0.3, 2.5))}
            className="p-2 rounded-full glass-panel text-stone-300 hover:text-gold-300 transition-colors"
            title="Zoom In"
            aria-label="Zoom in"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={() => setZoomLevel(1)}
            className="px-2.5 py-1 rounded-full glass-panel text-[11px] font-mono text-stone-300 hover:text-gold-300"
            title="Reset Zoom"
            aria-label="Reset zoom"
          >
            {Math.round(zoomLevel * 100)}%
          </button>
          <button
            onClick={onClose}
            className="p-2 rounded-full glass-panel text-stone-300 hover:text-gold-300 hover:border-gold-400 transition-colors"
            aria-label="Close photo browser"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Category Filter Pills (Touch-scrollable) */}
      <div className="flex items-center gap-1.5 overflow-x-auto px-4 py-1.5 no-scrollbar justify-start sm:justify-center z-20">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setActiveCategory(cat);
              setCurrentIndex(0);
              setZoomLevel(1);
            }}
            className={`px-3 py-1 rounded-full text-xs whitespace-nowrap transition-all ${
              activeCategory === cat
                ? "bg-gold-400 text-forest-950 font-bold shadow-gold-glow"
                : "glass-panel text-stone-300 hover:text-gold-300"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Main Touch Viewing Canvas */}
      <div
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="relative flex-1 flex items-center justify-center p-2 sm:p-6 overflow-hidden"
      >
        {/* Navigation Arrow Left */}
        <button
          onClick={handlePrev}
          className="absolute left-2 sm:left-4 z-20 p-3 rounded-full glass-panel text-stone-200 hover:text-gold-300 hover:border-gold-400 transition-transform active:scale-90"
          aria-label="Previous photo"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Current Photo with Touch Zoom and Crisp Rendering */}
        <div className="relative max-h-[68vh] max-w-5xl w-full flex items-center justify-center overflow-auto">
          <img
            src={currentPhoto.src}
            alt={currentPhoto.title}
            style={{
              transform: `scale(${zoomLevel})`,
              transformOrigin: "center center",
            }}
            className="max-h-[65vh] w-auto max-w-full object-contain crisp-image transition-transform duration-150 rounded-xl shadow-2xl"
          />
        </div>

        {/* Navigation Arrow Right */}
        <button
          onClick={handleNext}
          className="absolute right-2 sm:right-4 z-20 p-3 rounded-full glass-panel text-stone-200 hover:text-gold-300 hover:border-gold-400 transition-transform active:scale-90"
          aria-label="Next photo"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Caption & Counter Strip */}
      <div className="max-w-2xl mx-auto text-center px-4 py-2 z-20">
        <p className="text-xs text-stone-300 font-light leading-relaxed">
          {currentPhoto.caption}
        </p>
        <span className="text-[11px] font-mono text-gold-400/80 mt-1 inline-block">
          {safeIndex + 1} of {filteredPhotos.length}
        </span>
      </div>

      {/* Touch-Friendly Thumbnails Strip at Bottom */}
      <div className="flex items-center gap-2 overflow-x-auto p-2 sm:p-4 max-w-4xl mx-auto no-scrollbar z-20">
        {filteredPhotos.map((photo, pIdx) => (
          <button
            key={photo.id}
            onClick={() => {
              setCurrentIndex(pIdx);
              setZoomLevel(1);
            }}
            className={`relative rounded-lg overflow-hidden shrink-0 w-14 sm:w-16 h-10 sm:h-12 border transition-all ${
              safeIndex === pIdx
                ? "border-gold-400 scale-105 shadow-gold-glow"
                : "border-transparent opacity-50 hover:opacity-100"
            }`}
          >
            <img
              src={photo.src}
              alt={photo.title}
              className="w-full h-full object-cover crisp-image"
            />
          </button>
        ))}
      </div>
    </div>
  );
};
