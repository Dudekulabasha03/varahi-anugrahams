"use client";

import React, { useEffect, useRef, useState } from "react";

export const ReferenceStyleScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [activeBeat, setActiveBeat] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    const video = videoRef.current;
    if (!container) return;

    let tick = false;

    const handleScroll = () => {
      if (!tick) {
        requestAnimationFrame(() => {
          const r = container.getBoundingClientRect();
          const scrollable = r.height - window.innerHeight;
          if (scrollable > 0) {
            const p = Math.min(1, Math.max(0, -r.top / scrollable));
            setProgress(p);

            const beatIdx = p < 0.33 ? 0 : p < 0.66 ? 1 : 2;
            setActiveBeat(beatIdx);

            if (video && video.duration && !isNaN(video.duration)) {
              video.currentTime = p * video.duration * 0.999;
            }
          }
          tick = false;
        });
        tick = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    const onMetadata = () => handleScroll();
    if (video) video.addEventListener("loadedmetadata", onMetadata);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (video) video.removeEventListener("loadedmetadata", onMetadata);
    };
  }, []);

  const beats = [
    { num: "01 · The Idea", title: "It begins with a plot of land." },
    { num: "02 · The Assembly", title: "Form, rising piece by piece." },
    { num: "03 · The Home", title: "Complete. Ready to be lived in." },
  ];

  return (
    <div
      ref={containerRef}
      id="scene"
      className="relative h-[320vh] p-0 bg-dark text-white select-none"
    >
      {/* Sticky Pin Container */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Background Media */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#3a3226] via-[#15120d] to-[#2b2415] overflow-hidden">
          <video
            ref={videoRef}
            src="/media/videos/assembly-puzzle.mp4"
            poster="/media/images/villa-facade.jpg"
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover block"
          />
          {/* Scrim Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30 pointer-events-none" />
        </div>



        {/* Storytelling Beats */}
        {beats.map((beat, i) => (
          <div
            key={i}
            className={`absolute left-[5vw] bottom-[12vh] max-w-[520px] transition-all duration-600 z-10 ${
              activeBeat === i
                ? "opacity-100 translate-y-0 pointer-events-auto"
                : "opacity-0 translate-y-[20px] pointer-events-none"
            }`}
          >
            <div className="eyebrow" style={{ color: "var(--gold)" }}>
              {beat.num}
            </div>
            <h2
              className="font-serif font-medium leading-[1.05]"
              style={{ fontSize: "clamp(32px, 5vw, 64px)" }}
            >
              {beat.title}
            </h2>
          </div>
        ))}

        {/* Minimalist Progress Bar */}
        <div className="absolute left-[5vw] right-[5vw] bottom-[5vh] h-[2px] bg-white/20 z-10">
          <i
            id="prog"
            className="block h-full bg-gold transition-all duration-75"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};
