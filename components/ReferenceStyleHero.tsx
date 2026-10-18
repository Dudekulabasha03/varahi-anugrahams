"use client";

import React, { useRef, useEffect } from "react";

export const ReferenceStyleHero: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <header
      id="top"
      className="relative h-screen min-h-[560px] text-white flex items-end overflow-hidden"
    >
      {/* Background Media with Gradient Vignette */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#3a3226] via-[#15120d] to-[#2b2415] overflow-hidden">
        <video
          ref={videoRef}
          src="/media/videos/hero-arrival.mp4"
          poster="/media/images/residential-avenue.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover block"
        />
        {/* Scrim Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none" />
      </div>

      {/* Hero Content Stage */}
      <div className="relative z-10 px-[5vw] pb-[9vh] max-w-[900px]">
        {/* Eyebrow */}
        <div className="eyebrow" style={{ color: "#e2cf9e" }}>
          Villa Living
        </div>

        {/* Display Headline */}
        <h1
          className="font-serif font-medium tracking-normal text-white mb-0"
          style={{ fontSize: "clamp(44px, 8vw, 104px)", lineHeight: 1.05 }}
        >
          A Beautiful Way to Come Home.
        </h1>

        {/* Subtitle */}
        <p className="my-[18px] mb-[28px] text-[18px] max-w-[460px] opacity-90 font-light leading-relaxed">
          Discover thoughtfully designed villa living.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <a href="#explore" className="btn fill">
            Explore the Project
          </a>
          <a href="#enquire" className="btn">
            Enquire
          </a>
        </div>
      </div>

      {/* Pulsing Scroll Line */}
      <div
        className="absolute bottom-[20px] left-1/2 -translate-x-1/2 w-[1px] h-[46px] bg-white/60 pointer-events-none"
        style={{
          animation: "scrollPulse 2s infinite ease-in-out",
        }}
      />
    </header>
  );
};
