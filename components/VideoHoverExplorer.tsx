"use client";

import React, { useRef, useState } from "react";
import { Play, Pause, Sparkles } from "lucide-react";

interface HoverCardData {
  id: string;
  category: string;
  title: string;
  videoSrc: string;
  posterSrc?: string;
  description: string;
}

const CARDS_DATA: HoverCardData[] = [
  {
    id: "arch",
    category: "Exterior Form",
    title: "Architecture",
    videoSrc: "/media/videos/architecture-orbit.mp4",
    posterSrc: "/media/images/villa-facade.jpg",
    description: "360° sweeping orbit around curved sandstone walls & warm timber louvers.",
  },
  {
    id: "community",
    category: "Master Plan",
    title: "The Community",
    videoSrc: "/media/videos/community-drone.mp4",
    posterSrc: "/media/images/residential-avenue.jpg",
    description: "High-angle drone perspective across the gated enclave and verdant landscaping.",
  },
  {
    id: "street",
    category: "Walkthrough",
    title: "The Street",
    videoSrc: "/media/videos/street-walkthrough.mp4",
    posterSrc: "/media/images/residential-avenue.jpg",
    description: "Eye-level stroll down the 30 FT central avenue framed by royal palm trees.",
  },
  {
    id: "rooftop",
    category: "Lifestyle",
    title: "The Rooftop",
    videoSrc: "/media/videos/rooftop-space.mp4",
    posterSrc: "/media/images/villa-facade.jpg",
    description: "Descent landing onto the private 23 × 30 ft sky terrace and relaxation deck.",
  },
  {
    id: "interior",
    category: "Inside the Villa",
    title: "The Interiors",
    videoSrc: "/media/videos/interior-fpv.mp4",
    posterSrc: "/media/images/villa-facade.jpg",
    description: "Dynamic FPV flight through expansive living pavilions and luminous suites.",
  },
];

interface CardProps {
  card: HoverCardData;
}

const VideoCard: React.FC<CardProps> = ({ card }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const startPlayback = () => {
    if (videoRef.current) {
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    }
  };

  const stopPlayback = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  const togglePlayback = () => {
    if (isPlaying) {
      stopPlayback();
    } else {
      startPlayback();
    }
  };

  return (
    <div
      tabIndex={0}
      role="button"
      aria-label={`Video preview of ${card.title}`}
      onMouseEnter={startPlayback}
      onMouseLeave={stopPlayback}
      onFocus={startPlayback}
      onBlur={stopPlayback}
      onClick={togglePlayback}
      className="group relative aspect-[3/4] rounded-2xl overflow-hidden bg-stone-900 border border-white/10 shadow-xl cursor-pointer transition-all duration-500 hover:scale-[1.03] hover:border-gold-400/60 hover:shadow-gold-lg select-none"
    >
      {/* Background Video Element */}
      <video
        ref={videoRef}
        src={card.videoSrc}
        poster={card.posterSrc}
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />

      {/* Atmospheric Scrim */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/20 group-hover:from-black/80 transition-colors" />

      {/* Top Status Pill */}
      <div className="absolute top-4 right-4 z-10">
        <span
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] tracking-widest uppercase font-mono font-medium backdrop-blur-md transition-all ${
            isPlaying
              ? "bg-gold-500 text-stone-950 shadow-md font-bold"
              : "bg-black/50 text-white/80 border border-white/20"
          }`}
        >
          {isPlaying ? (
            <>
              <Pause className="w-2.5 h-2.5 fill-current" />
              <span>Playing</span>
            </>
          ) : (
            <>
              <Play className="w-2.5 h-2.5 fill-current" />
              <span>Hover · Play</span>
            </>
          )}
        </span>
      </div>

      {/* Bottom Content Metadata */}
      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 z-10 flex flex-col justify-end space-y-1.5">
        <span className="text-[11px] uppercase tracking-[0.2em] text-gold-400 font-semibold font-sans">
          {card.category}
        </span>
        <h3 className="font-serif text-2xl sm:text-3xl font-medium text-white tracking-wide leading-tight group-hover:text-gold-200 transition-colors">
          {card.title}
        </h3>
        <p className="text-xs text-stone-300 font-light line-clamp-2 leading-relaxed opacity-85 group-hover:opacity-100 transition-opacity">
          {card.description}
        </p>
      </div>
    </div>
  );
};

export const VideoHoverExplorer: React.FC = () => {
  return (
    <section id="explore" className="py-24 sm:py-32 px-5 sm:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="max-w-3xl mb-12 sm:mb-16 space-y-4">
        <div className="inline-flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-gold-500" />
          <span className="text-xs uppercase tracking-[0.25em] text-gold-600 dark:text-gold-400 font-semibold font-sans">
            Interactive Video Showcase
          </span>
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal text-forest-950 dark:text-ivory-50 tracking-tight leading-[1.08]">
          Hover to bring it to life.
        </h2>
        <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 font-light max-w-xl leading-relaxed">
          Move your cursor over each architectural vignette to preview the genuine footage, from the
          initial community entrance to rooftop terrace living.
        </p>
      </div>

      {/* 5-Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 sm:gap-6">
        {CARDS_DATA.map((card) => (
          <VideoCard key={card.id} card={card} />
        ))}
      </div>
    </section>
  );
};
