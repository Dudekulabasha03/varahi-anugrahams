"use client";

import React, { useEffect, useState } from "react";
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react";

export interface LightboxItem {
  src: string;
  alt: string;
  title?: string;
  caption?: string;
}

interface UniversalLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  items: LightboxItem[];
  initialIndex?: number;
}

export const UniversalLightbox: React.FC<UniversalLightboxProps> = ({
  isOpen,
  onClose,
  items,
  initialIndex = 0,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    setCurrentIndex(initialIndex);
    setIsZoomed(false);
  }, [initialIndex, isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, currentIndex, items.length]);

  if (!isOpen || items.length === 0) return null;

  const currentItem = items[currentIndex];

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setIsZoomed(false);
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : items.length - 1));
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setIsZoomed(false);
    setCurrentIndex((prev) => (prev < items.length - 1 ? prev + 1 : 0));
  };

  const toggleZoom = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsZoomed(!isZoomed);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Image Lightbox Viewer"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 sm:p-6 transition-all duration-300"
      onClick={onClose}
    >
      {/* Top Header Bar */}
      <div
        className="absolute top-0 left-0 right-0 p-4 sm:p-6 flex items-center justify-between z-10 bg-gradient-to-b from-black/80 to-transparent pointer-events-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-left">
          <p className="text-xs uppercase tracking-[0.2em] text-gold-400 font-sans">
            {currentIndex + 1} of {items.length}
          </p>
          {currentItem.title && (
            <h4 className="font-serif text-lg sm:text-xl text-ivory-50 tracking-wide">
              {currentItem.title}
            </h4>
          )}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleZoom}
            aria-label={isZoomed ? "Zoom out" : "Zoom in"}
            className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            {isZoomed ? <ZoomOut className="w-5 h-5 text-gold-300" /> : <ZoomIn className="w-5 h-5" />}
          </button>
          <button
            onClick={onClose}
            aria-label="Close lightbox"
            className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Navigation Arrows */}
      {items.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            aria-label="Previous image"
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 hover:bg-gold-500/80 text-white hover:text-black transition-all z-20"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={handleNext}
            aria-label="Next image"
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 hover:bg-gold-500/80 text-white hover:text-black transition-all z-20"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      {/* Main Media Stage */}
      <div
        className={`relative max-w-full max-h-[85vh] flex items-center justify-center overflow-auto ${
          isZoomed ? "cursor-zoom-out" : "cursor-zoom-in"
        }`}
        onClick={toggleZoom}
      >
        {currentItem.src.endsWith(".mp4") ? (
          <video
            src={currentItem.src}
            autoPlay
            controls
            playsInline
            className="max-w-full max-h-[80vh] w-auto h-auto shadow-2xl rounded-sm"
            onClick={(e) => e.stopPropagation()}
          />
        ) : (
          <img
            src={currentItem.src}
            alt={currentItem.alt}
            className={`transition-all duration-300 object-contain rounded-sm select-none ${
              isZoomed
                ? "max-w-none max-h-none w-[170vw] md:w-[150vw]"
                : "max-w-full max-h-[80vh] w-auto h-auto shadow-2xl"
            }`}
          />
        )}
      </div>

      {/* Caption Footer */}
      {currentItem.caption && (
        <div
          className="absolute bottom-4 left-4 right-4 text-center pointer-events-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <p className="text-xs sm:text-sm text-stone-300 bg-black/60 backdrop-blur-sm px-4 py-2 rounded-full inline-block border border-white/10">
            {currentItem.caption}
          </p>
        </div>
      )}
    </div>
  );
};
