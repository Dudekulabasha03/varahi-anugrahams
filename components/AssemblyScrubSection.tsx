"use client";

import React, { useEffect, useRef, useState } from "react";

export const AssemblyScrubSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [activeBeat, setActiveBeat] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    const video = videoRef.current;
    if (!container || !video) return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const rect = container.getBoundingClientRect();
          const totalScrollable = rect.height - window.innerHeight;

          if (totalScrollable > 0) {
            // Compute normalized progress between 0 and 1
            const p = Math.min(1, Math.max(0, -rect.top / totalScrollable));
            setProgress(p);

            // Sync video time
            if (video.duration && !isNaN(video.duration)) {
              // Ensure video time doesn't exceed duration
              video.currentTime = Math.min(p * video.duration * 0.999, video.duration - 0.05);
            }

            // Sync active beat
            if (p < 0.33) {
              setActiveBeat(0);
            } else if (p < 0.66) {
              setActiveBeat(1);
            } else {
              setActiveBeat(2);
            }
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    // Initial sync once video metadata is loaded
    const onMetadata = () => handleScroll();
    video.addEventListener("loadedmetadata", onMetadata);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      video.removeEventListener("loadedmetadata", onMetadata);
    };
  }, []);

  const beats = [
    {
      num: "01",
      tag: "The Foundation & Idea",
      title: "It begins with a plot of land.",
      desc: "Every villa is anchored to a dedicated 23 × 47 ft plot with engineered sub-surface reticulation and solid pile foundations.",
    },
    {
      num: "02",
      tag: "The Craft & Assembly",
      title: "Form, rising piece by piece.",
      desc: "Curved acoustic concrete arches, reinforced floor plates, and handcrafted vertical timber louvers come together with architectural precision.",
    },
    {
      num: "03",
      tag: "The Living Sanctuary",
      title: "Complete. Ready to be lived in.",
      desc: "A signature 3-level sanctuary with illuminated portico, spacious double-height living pavilion, and private rooftop sky garden.",
    },
  ];

  return (
    <div
      ref={containerRef}
      id="scene"
      className="relative w-full h-[320vh] bg-stone-950 text-white"
    >
      {/* Sticky Fullscreen Stage */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between">
        {/* Background Scrubbed Video Canvas */}
        <div className="absolute inset-0 z-0">
          <video
            ref={videoRef}
            src="/media/videos/assembly-puzzle.mp4"
            poster="/media/images/villa-facade.jpg"
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover select-none brightness-90"
          />
          {/* Subtle Scrim for Storytelling Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/30 to-stone-950/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950/70 via-transparent to-transparent" />
        </div>

        {/* Top Tag */}
        <div className="relative z-10 p-6 sm:p-12 flex justify-between items-center">
          <span className="text-xs uppercase tracking-[0.25em] text-gold-400 font-semibold font-sans">
            Interactive Scroll Sequence · Building Assembly
          </span>
          <span className="text-xs font-mono text-stone-400 bg-black/40 px-3 py-1 rounded-full border border-white/10">
            {Math.round(progress * 100)}% Complete
          </span>
        </div>

        {/* Dynamic Storytelling Beats (Left-aligned) */}
        <div className="relative z-10 px-6 sm:px-12 pb-16 sm:pb-20 max-w-xl">
          {beats.map((beat, idx) => (
            <div
              key={idx}
              className={`transition-all duration-700 space-y-3 ${
                activeBeat === idx
                  ? "opacity-100 translate-y-0 relative pointer-events-auto"
                  : "opacity-0 translate-y-6 absolute pointer-events-none"
              }`}
            >
              <div className="inline-flex items-center gap-2">
                <span className="text-xs font-mono text-gold-400 font-bold tracking-widest uppercase">
                  {beat.num} · {beat.tag}
                </span>
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal leading-[1.08] text-ivory-50 tracking-tight">
                {beat.title}
              </h2>
              <p className="text-xs sm:text-sm md:text-base text-stone-300 font-light leading-relaxed max-w-md">
                {beat.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Hairline Progress Gauge (Pinned to bottom) */}
        <div className="relative z-10 w-full px-6 sm:px-12 pb-6">
          <div className="w-full h-[2px] bg-white/15 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-gold-500 to-gold-300 transition-all duration-100"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
