"use client";

import React, { useState, useRef } from "react";
import { ZoomIn, Search } from "lucide-react";

interface ImageLensZoomProps {
  src: string;
  alt: string;
  className?: string;
  zoomLevel?: number;
  lensSize?: number;
}

export const ImageLensZoom: React.FC<ImageLensZoomProps> = ({
  src,
  alt,
  className = "",
  zoomLevel = 2.4,
  lensSize = 180,
}) => {
  const [showLens, setShowLens] = useState(false);
  const [lensPos, setLensPos] = useState({ x: 0, y: 0 });
  const [bgPos, setBgPos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Constrain lens inside bounds
    const halfLens = lensSize / 2;
    const boundedX = Math.max(halfLens, Math.min(rect.width - halfLens, x));
    const boundedY = Math.max(halfLens, Math.min(rect.height - halfLens, y));

    setLensPos({ x: boundedX, y: boundedY });

    // Calculate background position percentage
    const bgX = (x / rect.width) * 100;
    const bgY = (y / rect.height) * 100;
    setBgPos({ x: bgX, y: bgY });
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setShowLens(true)}
      onMouseLeave={() => setShowLens(false)}
      onMouseMove={handleMouseMove}
      className={`relative overflow-hidden cursor-crosshair select-none ${className}`}
    >
      {/* High-Clarity Main Image */}
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-contain object-center crisp-image"
        loading="eager"
      />

      {/* Floating Magnifier Lens (React Bits / 21st.dev style) */}
      {showLens && (
        <div
          style={{
            width: `${lensSize}px`,
            height: `${lensSize}px`,
            left: `${lensPos.x - lensSize / 2}px`,
            top: `${lensPos.y - lensSize / 2}px`,
            backgroundImage: `url(${src})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: `${containerRef.current ? containerRef.current.clientWidth * zoomLevel : 1000}px auto`,
            backgroundPosition: `${bgPos.x}% ${bgPos.y}%`,
          }}
          className="absolute pointer-events-none rounded-full border-2 border-gold-400 shadow-[0_0_25px_rgba(213,174,67,0.5),0_15px_30px_rgba(0,0,0,0.8)] z-30 transition-transform duration-75 ease-out backdrop-blur-none"
        >
          {/* Center Crosshair Marker */}
          <div className="absolute inset-0 flex items-center justify-center opacity-40">
            <div className="w-3 h-[1px] bg-gold-300" />
            <div className="h-3 w-[1px] bg-gold-300 absolute" />
          </div>
          {/* Lens HUD Ring */}
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-0.5 rounded-full bg-forest-950/90 border border-gold-400/60 text-[9px] font-mono text-gold-300">
            {zoomLevel}x HD LENS
          </div>
        </div>
      )}

      {/* Persistent Hint Pill on bottom left */}
      <div className="absolute bottom-3 left-3 pointer-events-none glass-panel px-2.5 py-1 rounded-full border border-gold-400/40 text-[10px] text-gold-300 flex items-center gap-1.5 opacity-90 shadow-lg">
        <Search className="w-3 h-3 text-gold-400" />
        <span className="hidden sm:inline">Hover with mouse to magnify labels</span>
        <span className="sm:hidden">Tap to inspect</span>
      </div>
    </div>
  );
};
