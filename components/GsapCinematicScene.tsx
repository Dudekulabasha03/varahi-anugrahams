"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const GsapCinematicScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressBarRef = useRef<HTMLSpanElement>(null);
  const progressWrapperRef = useRef<HTMLDivElement>(null);

  const [activeBeat, setActiveBeat] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    const video = videoRef.current;
    const bar = progressBarRef.current;
    const barWrapper = progressWrapperRef.current;

    if (!container || !video) return;

    const ctx = gsap.context(() => {
      // Pinned ScrollTrigger on container itself with clean exit
      ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: "+=130%", // Snappy, comfortable scroll distance
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        scrub: 0.25,
        onUpdate: (self) => {
          const p = self.progress;

          // Scrub video progress fast and smoothly
          if (video.duration && !isNaN(video.duration)) {
            video.currentTime = Math.min(p * video.duration * 0.999, video.duration - 0.05);
          }

          // Update progress bar
          if (bar) {
            bar.style.width = `${p * 100}%`;
          }

          // Fade out the progress bar when nearing the transition to the next section
          if (barWrapper) {
            barWrapper.style.opacity = p > 0.88 ? `${Math.max(0, (1 - p) / 0.12)}` : "1";
          }

          // Update active beat with a clean exit before unpinning
          if (p < 0.30) {
            setActiveBeat(0);
          } else if (p < 0.60) {
            setActiveBeat(1);
          } else if (p < 0.88) {
            setActiveBeat(2);
          } else {
            // Smooth exit: fade out beat 3 before section unpins to prevent any overlap
            setActiveBeat(-1);
          }
        },
      });
    }, container);

    return () => {
      ctx.revert();
    };
  }, []);

  const beats = [
    {
      eyebrow: "01 · The Idea",
      title: "It begins with a plot of land.",
    },
    {
      eyebrow: "02 · The Assembly",
      title: "Form, rising piece by piece.",
    },
    {
      eyebrow: "03 · The Home",
      title: "Complete. Ready to be lived in.",
    },
  ];

  return (
    <div
      ref={containerRef}
      id="scene"
      className="relative w-full h-screen bg-[#0b0907] text-white select-none overflow-hidden"
    >
      {/* Full-Screen Hardware-Accelerated Video — 100% Unobstructed */}
      <div className="absolute inset-0 bg-[#0b0907] overflow-hidden">
        <video
          ref={videoRef}
          src="/media/videos/assembly-puzzle.mp4"
          poster="/media/images/villa-facade.jpg"
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover block will-change-transform brightness-100"
        />
        {/* Subtle Bottom & Left Scrim only for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Storytelling Narrative Beats (Smooth fade in and clean exit before unpin) */}
      {beats.map((beat, i) => (
        <div
          key={i}
          className={`absolute left-[5vw] bottom-[12vh] max-w-[540px] transition-all duration-500 z-20 ${
            activeBeat === i
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 translate-y-[20px] pointer-events-none"
          }`}
        >
          <div className="eyebrow" style={{ color: "var(--gold)" }}>
            {beat.eyebrow}
          </div>
          <h2
            className="font-serif font-medium leading-[1.05]"
            style={{ fontSize: "clamp(32px, 5vw, 64px)" }}
          >
            {beat.title}
          </h2>
        </div>
      ))}

      {/* Minimalist Progress Hairline (Cleanly fades near the end) */}
      <div
        ref={progressWrapperRef}
        className="absolute left-[5vw] right-[5vw] bottom-[5vh] h-[2px] bg-white/20 z-20 transition-opacity duration-300 pointer-events-none"
      >
        <span
          ref={progressBarRef}
          className="block h-full bg-gold transition-all duration-75"
          style={{ width: "0%" }}
        />
      </div>
    </div>
  );
};
