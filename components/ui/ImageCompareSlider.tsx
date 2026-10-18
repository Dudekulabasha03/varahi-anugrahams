"use client";

import React, { useState, useRef, useCallback } from "react";
import { MoveHorizontal } from "lucide-react";

interface ImageCompareSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
}

export const ImageCompareSlider: React.FC<ImageCompareSliderProps> = ({
  beforeImage,
  afterImage,
  beforeLabel = "Twilight Dusk",
  afterLabel = "Daylight",
  className = "",
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(position);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseDown={() => setIsDragging(true)}
      onMouseUp={() => setIsDragging(false)}
      onMouseLeave={() => setIsDragging(false)}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      className={`relative overflow-hidden select-none cursor-ew-resize rounded-2xl sm:rounded-3xl border border-gold-400/30 shadow-forest-deep ${className}`}
    >
      {/* After Image (Full width background) */}
      <img
        src={afterImage}
        alt={afterLabel}
        className="w-full h-full object-cover object-center crisp-image"
      />

      {/* Before Image (Clipped by slider position) */}
      <div
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        className="absolute inset-0 w-full h-full"
      >
        <img
          src={beforeImage}
          alt={beforeLabel}
          className="w-full h-full object-cover object-center crisp-image"
        />
      </div>

      {/* Floating Labels */}
      <div className="absolute top-4 left-4 z-20 pointer-events-none">
        <span className="glass-panel px-3 py-1 rounded-full border border-gold-400/40 text-[11px] font-cinzel text-gold-300 font-bold shadow-lg">
          {beforeLabel}
        </span>
      </div>

      <div className="absolute top-4 right-4 z-20 pointer-events-none">
        <span className="glass-panel px-3 py-1 rounded-full border border-gold-400/40 text-[11px] font-cinzel text-gold-300 font-bold shadow-lg">
          {afterLabel}
        </span>
      </div>

      {/* Vertical Divider Line & Handle (21st.dev style) */}
      <div
        style={{ left: `${sliderPosition}%` }}
        className="absolute top-0 bottom-0 w-[2px] bg-gradient-to-b from-gold-300 via-gold-400 to-gold-600 shadow-[0_0_12px_rgba(213,174,67,0.8)] z-20 -translate-x-1/2 flex items-center justify-center pointer-events-none"
      >
        {/* Circular Glowing Handle */}
        <div className="w-9 h-9 rounded-full bg-forest-950 border-2 border-gold-400 shadow-[0_0_20px_rgba(213,174,67,0.6)] flex items-center justify-center text-gold-300 transition-transform hover:scale-110">
          <MoveHorizontal className="w-4 h-4 text-gold-400 animate-pulse" />
        </div>
      </div>

      {/* Bottom Interaction Guide */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 pointer-events-none glass-panel px-3 py-1 rounded-full border border-gold-400/30 text-[10px] text-stone-300">
        Drag slider left / right to compare views
      </div>
    </div>
  );
};
