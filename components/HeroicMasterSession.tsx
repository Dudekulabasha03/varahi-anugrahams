"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { PROJECT_CONFIG } from "@/config/projectData";
import {
  Sparkles,
  Layers,
  Compass,
  Play,
  Pause,
  ArrowRight,
  Maximize2,
  Calendar,
  MessageCircle,
  ChevronDown,
} from "lucide-react";
import { UniversalLightbox } from "./ui/UniversalLightbox";

interface Chapter {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  videoSrc: string;
  posterSrc: string;
  beats?: {
    range: [number, number];
    label: string;
    headline: string;
    description: string;
  }[];
}

const CHAPTERS: Chapter[] = [
  {
    id: "arrival",
    tag: "01 · Arrival",
    title: "A Beautiful Way to Come Home",
    subtitle: "Descent from the horizon into the gated serenity of Varahi Anugrahams.",
    videoSrc: "/media/videos/hero-arrival.mp4",
    posterSrc: "/media/images/residential-avenue.jpg",
    beats: [
      {
        range: [0, 0.5],
        label: "01 · Horizon Approach",
        headline: "A Beautiful Way to Come Home.",
        description: "Discover thoughtfully designed villa living shaped by light, space, and quiet.",
      },
      {
        range: [0.5, 1.0],
        label: "02 · The Gated Enclave",
        headline: "Peace • Prosperity • Togetherness.",
        description: "An exclusive community along R.F. Road, Tadipatri under divine blessings.",
      },
    ],
  },
  {
    id: "assembly",
    tag: "02 · Assembly",
    title: "Rising Piece by Piece",
    subtitle: "Watch the villa form seamlessly from foundational reticulation to rooftop.",
    videoSrc: "/media/videos/assembly-puzzle.mp4",
    posterSrc: "/media/images/villa-facade.jpg",
    beats: [
      {
        range: [0, 0.33],
        label: "Beat 01 · The Plot & Foundation",
        headline: "It begins with a plot of land.",
        description: "Engineered 23 × 47 ft footprint with sub-surface anti-termite reticulation and solid pile foundations.",
      },
      {
        range: [0.33, 0.66],
        label: "Beat 02 · The Assembly",
        headline: "Form, rising piece by piece.",
        description: "Acoustic curved concrete arches, structural floor slabs, and handcrafted vertical timber louvers.",
      },
      {
        range: [0.66, 1.0],
        label: "Beat 03 · The Completed Sanctuary",
        headline: "Complete. Ready to be lived in.",
        description: "Signature 3-level villa with illuminated portico, double-height living, and private sky terrace.",
      },
    ],
  },
  {
    id: "orbit",
    tag: "03 · Architecture",
    title: "Curved Stone & Warm Timber",
    subtitle: "360° sweeping orbit showcasing contemporary architectural forms.",
    videoSrc: "/media/videos/architecture-orbit.mp4",
    posterSrc: "/media/images/villa-facade.jpg",
    beats: [
      {
        range: [0, 1.0],
        label: "03 · Exterior Form",
        headline: "Curved stone, warm timber, living green.",
        description: "Organic geometry with recessed ambient cove lighting and cantilevered landscaped planter boxes.",
      },
    ],
  },
  {
    id: "street",
    tag: "04 · The Boulevard",
    title: "30 FT Tree-Lined Avenue",
    subtitle: "Stroll down the wide central road lined with stately royal palms.",
    videoSrc: "/media/videos/street-walkthrough.mp4",
    posterSrc: "/media/images/residential-avenue.jpg",
    beats: [
      {
        range: [0, 1.0],
        label: "04 · Community Avenue",
        headline: "One gate. One 30 ft road. Home.",
        description: "Heavy-duty paved avenue with underground electrical cables, modern luminaires, and 24/7 security.",
      },
    ],
  },
  {
    id: "rooftop",
    tag: "05 · Sky Terrace",
    title: "A Terrace Above It All",
    subtitle: "Cosmic descent landing upon your private 23 × 30 ft rooftop garden.",
    videoSrc: "/media/videos/rooftop-space.mp4",
    posterSrc: "/media/images/villa-facade.jpg",
    beats: [
      {
        range: [0, 1.0],
        label: "05 · Private Terrace",
        headline: "A terrace above it all.",
        description: "Open-air sanctuary featuring custom timber pergola, lush potted succulents, and starlit evening lounge.",
      },
    ],
  },
  {
    id: "interior",
    tag: "06 · The Interiors",
    title: "Double-Height Sanctuary",
    subtitle: "FPV flight through fluid living pavilions and luminous master suites.",
    videoSrc: "/media/videos/interior-fpv.mp4",
    posterSrc: "/media/images/villa-facade.jpg",
    beats: [
      {
        range: [0, 1.0],
        label: "06 · Interior Flow",
        headline: "Architecture of Light and Volume.",
        description: "Seamless open-plan design connecting dining, modular kitchen, pooja room, and private elevator.",
      },
    ],
  },
];

interface HeroicMasterSessionProps {
  onOpenTour?: () => void;
  onOpenInquiry?: () => void;
}

export const HeroicMasterSession: React.FC<HeroicMasterSessionProps> = ({
  onOpenTour,
  onOpenInquiry,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [floorPlansOpen, setFloorPlansOpen] = useState(false);

  const activeChapter = CHAPTERS[activeChapterIndex];

  // Smooth scroll scrubbing with Linear Interpolation (LERP)
  useEffect(() => {
    const container = containerRef.current;
    const video = videoRef.current;
    if (!container || !video) return;

    let targetTime = 0;
    let currentTime = 0;
    let animId: number;

    const renderLoop = () => {
      // Lerp smoothing (factor 0.12)
      if (video.duration && !isNaN(video.duration)) {
        currentTime += (targetTime - currentTime) * 0.12;
        if (Math.abs(targetTime - currentTime) > 0.01) {
          video.currentTime = Math.min(Math.max(0, currentTime), video.duration - 0.05);
        }
      }
      animId = requestAnimationFrame(renderLoop);
    };

    animId = requestAnimationFrame(renderLoop);

    const handleScroll = () => {
      const rect = container.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;

      if (scrollable > 0) {
        const p = Math.min(1, Math.max(0, -rect.top / scrollable));
        setScrollProgress(p);

        if (video.duration && !isNaN(video.duration)) {
          targetTime = p * video.duration;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [activeChapterIndex]);

  // Handle chapter change with smooth transition
  const handleSelectChapter = useCallback(
    (index: number) => {
      if (index === activeChapterIndex) return;
      setActiveChapterIndex(index);

      // Reset scroll progress target for the new video
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
      }
    },
    [activeChapterIndex]
  );

  // Active Story Beat determination
  const currentBeat =
    activeChapter.beats?.find(
      (b) => scrollProgress >= b.range[0] && scrollProgress <= b.range[1]
    ) || activeChapter.beats?.[0];

  return (
    <div
      ref={containerRef}
      id="heroic-session"
      className="relative w-full h-[360vh] bg-forest-950 text-white select-none"
    >
      {/* Sticky Master Cinema Stage (100vh) */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between">
        {/* Full-Screen Hardware-Accelerated Video Player */}
        <div className="absolute inset-0 z-0">
          <video
            ref={videoRef}
            key={activeChapter.videoSrc}
            src={activeChapter.videoSrc}
            poster={activeChapter.posterSrc}
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover transition-opacity duration-700 ease-out brightness-95"
          />

          {/* Luxury Vignettes & Scrims */}
          <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/35 to-forest-950/40 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-forest-950/85 via-forest-950/20 to-transparent pointer-events-none" />
        </div>

        {/* Top Header Bar inside Hero */}
        <div className="relative z-20 pt-20 sm:pt-24 px-6 sm:px-12 flex items-center justify-between">
          {/* Divine Blessing & Brand Tag */}
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-gold-400/30 text-gold-300 text-xs font-serif tracking-wider shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-gold-400" />
              <span>{PROJECT_CONFIG.brand.blessing}</span>
            </div>
            <p className="text-[10px] sm:text-xs uppercase tracking-[0.28em] text-gold-400/90 font-mono pl-1">
              VARAHI ANUGRAHAMS · TADIPATRI
            </p>
          </div>

          {/* Quick Floating Action Badges */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Direct 3D Floor Plan Inspector Trigger */}
            <button
              onClick={() => setFloorPlansOpen(true)}
              className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-gold-500/90 hover:bg-gold-400 text-forest-950 font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-gold-glow flex items-center gap-1.5 hover:scale-105 active:scale-95"
            >
              <Layers className="w-4 h-4" />
              <span className="hidden sm:inline">3D Floor Plans</span>
              <span className="sm:hidden">Plans</span>
            </button>

            {/* Direct WhatsApp Quick Connect */}
            <a
              href="https://wa.me/919492854666?text=Hello%20Rangaiah%20garu,%20I%20am%20interested%20in%20Varahi%20Anugrahams%20villas.%20Please%20share%20details."
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-emerald-600/90 hover:bg-emerald-500 text-white font-medium text-xs uppercase tracking-wider transition-all duration-300 backdrop-blur-md flex items-center gap-1.5 hover:scale-105"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Dynamic Storytelling Center-Left Stage */}
        <div className="relative z-20 px-6 sm:px-12 max-w-2xl space-y-4 my-auto">
          {currentBeat && (
            <div className="space-y-3 animate-fade-in">
              <div className="inline-flex items-center gap-2">
                <span className="text-xs uppercase tracking-[0.25em] text-gold-400 font-mono font-semibold">
                  {currentBeat.label}
                </span>
                <span className="w-6 h-[1px] bg-gold-400/50" />
              </div>

              <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-normal leading-[1.06] text-ivory-50 tracking-tight drop-shadow-md">
                {currentBeat.headline}
              </h1>

              <p className="text-sm sm:text-base md:text-lg text-stone-200/90 font-light leading-relaxed max-w-xl">
                {currentBeat.description}
              </p>
            </div>
          )}

          {/* Action CTAs */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            {onOpenInquiry ? (
              <button
                onClick={onOpenInquiry}
                className="px-6 py-3 rounded-full bg-gold-500 hover:bg-gold-400 text-forest-950 font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-gold-lg flex items-center gap-2 hover:scale-105 active:scale-95"
              >
                <Calendar className="w-4 h-4" />
                <span>Schedule a Site Visit</span>
              </button>
            ) : (
              <a
                href="#contact"
                className="px-6 py-3 rounded-full bg-gold-500 hover:bg-gold-400 text-forest-950 font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-gold-lg flex items-center gap-2 hover:scale-105 active:scale-95"
              >
                <Calendar className="w-4 h-4" />
                <span>Schedule a Site Visit</span>
              </a>
            )}

            {onOpenTour && (
              <button
                onClick={onOpenTour}
                className="px-5 py-3 rounded-full bg-black/40 hover:bg-black/60 text-ivory-50 border border-white/20 hover:border-gold-400 font-medium text-xs uppercase tracking-widest transition-all duration-300 backdrop-blur-sm flex items-center gap-2 hover:scale-105"
              >
                <Compass className="w-4 h-4 text-gold-400" />
                <span>Virtual 3D Tour</span>
              </button>
            )}
          </div>
        </div>

        {/* Bottom Interactive Area: Hover Dock & Timeline Scrubber */}
        <div className="relative z-20 px-4 sm:px-12 pb-6 space-y-4">
          {/* Chapter Selector Dock ("Hover to bring it to life") */}
          <div className="w-full">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] uppercase tracking-[0.22em] text-gold-400 font-mono font-medium">
                Hover / Select Chapter · Instant Cinematic Switch
              </span>
              <span className="text-[11px] font-mono text-stone-300 bg-black/50 px-2.5 py-0.5 rounded-full border border-white/10">
                {Math.round(scrollProgress * 100)}% Through Scene
              </span>
            </div>

            {/* Scrollable / Responsive 6-Card Thumbnail Dock */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3">
              {CHAPTERS.map((chap, idx) => {
                const isActive = activeChapterIndex === idx;
                return (
                  <div
                    key={chap.id}
                    role="button"
                    tabIndex={0}
                    onClick={() => handleSelectChapter(idx)}
                    onMouseEnter={() => handleSelectChapter(idx)}
                    className={`relative rounded-xl overflow-hidden p-2.5 sm:p-3 text-left transition-all duration-300 cursor-pointer backdrop-blur-md border ${
                      isActive
                        ? "bg-gold-500/20 border-gold-400 shadow-gold-glow scale-[1.02]"
                        : "bg-black/50 border-white/15 hover:border-gold-400/60 hover:bg-black/70"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-mono tracking-wider text-gold-400 uppercase font-semibold">
                        {chap.tag}
                      </span>
                      {isActive && (
                        <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse" />
                      )}
                    </div>
                    <h4 className="font-serif text-sm sm:text-base font-medium text-white truncate">
                      {chap.title}
                    </h4>
                    <p className="text-[10px] text-stone-300 font-light truncate">
                      {chap.subtitle}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Real-time Timeline Scrubber Bar */}
          <div className="w-full h-[3px] bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-gold-500 to-gold-300 transition-all duration-75"
              style={{ width: `${scrollProgress * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Instant Floor Plans Lightbox Dialog */}
      <UniversalLightbox
        isOpen={floorPlansOpen}
        onClose={() => setFloorPlansOpen(false)}
        items={[
          {
            src: "/media/images/floor-plans-complete.jpg",
            alt: "Varahi Anugrahams Complete 3D Isometric Floor Plans",
            title: "3D Floor Plans — Ground Floor (58' × 30') & First Floor (58' × 25')",
            caption:
              "Ground floor incorporates parking, living, dining, pooja, kitchen, utility, master suite & lift. First floor accommodates master bedroom, lounge, child room, and spacious sit-out terrace.",
          },
          {
            src: "/assets/floorplans/ground-floor-3d.jpg",
            alt: "Ground Floor Plan Close-up",
            title: "Ground Floor Layout",
            caption: "Dedicated car parking with gate, formal living, main family hall, sacred pooja, and master bedroom.",
          },
          {
            src: "/assets/floorplans/first-floor-3d.jpg",
            alt: "First Floor Plan Close-up",
            title: "First Floor Layout",
            caption: "Upper master suite, attached dressing room, private children's bedroom, and front sit-out terrace.",
          },
        ]}
      />
    </div>
  );
};
