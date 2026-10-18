"use client";

import React, { useRef, useState } from "react";

interface CardInfo {
  id: string;
  tag: string;
  title: string;
  videoSrc: string;
  posterSrc?: string;
}

const CARDS: CardInfo[] = [
  {
    id: "arch",
    tag: "Exterior",
    title: "Architecture",
    videoSrc: "/media/videos/architecture-orbit.mp4",
    posterSrc: "/media/images/villa-facade.jpg",
  },
  {
    id: "community",
    tag: "Aerial",
    title: "The Community",
    videoSrc: "/media/videos/community-drone.mp4",
    posterSrc: "/media/images/residential-avenue.jpg",
  },
  {
    id: "street",
    tag: "Walkthrough",
    title: "The Street",
    videoSrc: "/media/videos/street-walkthrough.mp4",
    posterSrc: "/media/images/residential-avenue.jpg",
  },
  {
    id: "rooftop",
    tag: "Lifestyle",
    title: "The Rooftop",
    videoSrc: "/media/videos/rooftop-space.mp4",
    posterSrc: "/media/images/villa-facade.jpg",
  },
  {
    id: "interior",
    tag: "Inside",
    title: "The Interiors",
    videoSrc: "/media/videos/interior-fpv.mp4",
    posterSrc: "/media/images/villa-facade.jpg",
  },
];

const VCard: React.FC<{ card: CardInfo }> = ({ card }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleMouseEnter = () => {
    setIsPlaying(true);
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const handleTouchToggle = () => {
    if (isPlaying) {
      handleMouseLeave();
    } else {
      handleMouseEnter();
    }
  };

  return (
    <div
      tabIndex={0}
      role="button"
      data-cursor="play"
      aria-label={`Preview ${card.title} video`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleMouseEnter}
      onBlur={handleMouseLeave}
      onClick={handleTouchToggle}
      className={`vcard group relative rounded-[14px] overflow-hidden text-white cursor-pointer bg-black select-none transition-all duration-500 ${
        isPlaying ? "ring-1 ring-gold shadow-2xl" : ""
      }`}
      style={{ aspectRatio: "3/4" }}
    >
      {/* Background Media with Reference Easing & Scaling */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#3a3226] via-[#15120d] to-[#2b2415] overflow-hidden">
        <video
          ref={videoRef}
          src={card.videoSrc}
          poster={card.posterSrc}
          muted
          loop
          playsInline
          preload="metadata"
          className="w-full h-full object-cover block transition-transform duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[1.08]"
        />
        {/* Scrim matching reference HTML linear-gradient(#0000 40%, #000c) */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-500"
          style={{
            background: "linear-gradient(to bottom, rgba(0,0,0,0) 40%, rgba(0,0,0,0.85) 100%)",
          }}
        />
      </div>

      {/* Top Right Reference Hint Badge */}
      <span className="absolute top-[14px] right-[14px] z-10 text-[11px] tracking-[0.14em] uppercase px-[10px] py-[5px] border border-white/40 rounded-[20px] font-sans font-medium backdrop-blur-sm transition-all duration-300 group-hover:border-gold group-hover:text-gold group-hover:bg-black/40">
        {isPlaying ? "Playing" : "Hover · Play"}
      </span>

      {/* Bottom Caption Overlay */}
      <div className="absolute left-[20px] right-[20px] bottom-[18px] z-10 pointer-events-none transition-transform duration-500 group-hover:-translate-y-1">
        <small className="opacity-80 text-[12px] tracking-[0.12em] uppercase font-sans block mb-1">
          {card.tag}
        </small>
        <h3 className="font-serif text-[28px] font-medium leading-tight text-white group-hover:text-gold transition-colors duration-300">
          {card.title}
        </h3>
      </div>
    </div>
  );
};

export const ReferenceStyleExplore: React.FC = () => {
  return (
    <section id="explore" className="px-[5vw] py-[12vh] bg-bg text-ink">
      <div className="eyebrow">Explore</div>
      <h2
        className="font-serif font-medium leading-[1.05]"
        style={{ fontSize: "clamp(34px, 5vw, 64px)" }}
      >
        Hover to bring it to life.
      </h2>

      {/* 5-Card Responsive Grid */}
      <div
        className="grid gap-[18px] mt-[40px]"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        }}
      >
        {CARDS.map((card) => (
          <VCard key={card.id} card={card} />
        ))}
      </div>
    </section>
  );
};
