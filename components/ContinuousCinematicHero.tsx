"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { PROJECT_CONFIG } from "@/config/projectData";
import { Sparkles } from "lucide-react";

interface FilmScene {
  id: string;
  tag: string;
  label: string;
  duration: number; // in seconds
  startTime?: number; // start offset in seconds
  src: string;
  poster: string;
  headline: string;
  subtitle: string;
}

const FILM_SCENES: FilmScene[] = [
  {
    id: "arrival",
    tag: "01 · Arrival",
    label: "Descent & Enclave",
    duration: 7.0, // Zooming into residential complex - 7 seconds
    startTime: 0,
    src: "/media/videos/hero-arrival.mp4",
    poster: "/media/images/residential-avenue.jpg",
    headline: "A Beautiful Way to Come Home.",
    subtitle: "Discover thoughtfully designed villa living shaped by light, space, and quiet.",
  },
  {
    id: "aerial",
    tag: "02 · Aerial Community",
    label: "Aerial View",
    duration: 3.0, // Aerial community video - 3 seconds
    startTime: 0,
    src: "/media/videos/community-drone.mp4",
    poster: "/media/images/residential-avenue.jpg",
    headline: "A Sanctuary Framed by Nature.",
    subtitle: "Lush biophilic landscape surrounding master-planned private residences.",
  },
  {
    id: "street",
    tag: "03 · Central Avenue",
    label: "30 FT Boulevard",
    duration: 3.5, // Walkthrough the street - 3.5 seconds
    startTime: 0,
    src: "/media/videos/street-walkthrough.mp4",
    poster: "/media/images/residential-avenue.jpg",
    headline: "One Gate. One 30 FT Road. Home.",
    subtitle: "Stroll down the tree-lined central avenue framed by stately royal palms.",
  },
  {
    id: "architecture",
    tag: "04 · Architecture",
    label: "Curved Facade",
    duration: 4.5, // Exterior architecture orbit - 4.5 seconds
    startTime: 0,
    src: "/media/videos/architecture-orbit.mp4",
    poster: "/media/images/villa-facade.jpg",
    headline: "Curved Stone, Warm Timber, Living Green.",
    subtitle: "Organic architectural geometry with vertical louvers and ambient lighting.",
  },
  {
    id: "interiors",
    tag: "05 · Interiors",
    label: "Living Pavilion",
    duration: 3.8, // Inside interiors video - 3.8 seconds
    startTime: 0,
    src: "/media/videos/interior-fpv.mp4",
    poster: "/media/images/villa-facade.jpg",
    headline: "Architecture of Light and Volume.",
    subtitle: "Double-height living spaces, fine dining lounge, and fluid contemporary flow.",
  },
  {
    id: "terrace",
    tag: "06 · Sky Terrace",
    label: "Rooftop Garden",
    startTime: 7.0, // Show only last 3 seconds of the 10s video directly on the terrace!
    duration: 3.0,
    src: "/media/videos/rooftop-space.mp4",
    poster: "/media/images/villa-facade.jpg",
    headline: "A Terrace Above It All.",
    subtitle: "Private 23 × 30 ft rooftop sanctuary with pergola and evening lounge.",
  },
];

export const ContinuousCinematicHero: React.FC = () => {
  const [currentSceneIdx, setCurrentSceneIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [sceneProgress, setSceneProgress] = useState(0); // 0 to 1

  // Dual video player references for zero-black-flash seamless cross-fading
  const videoRefA = useRef<HTMLVideoElement>(null);
  const videoRefB = useRef<HTMLVideoElement>(null);
  const [activePlayer, setActivePlayer] = useState<"A" | "B">("A");

  const currentScene = FILM_SCENES[currentSceneIdx];

  // Transition to a specific scene index with smooth cross-fade
  const transitionToScene = useCallback(
    (nextIdx: number) => {
      const targetScene = FILM_SCENES[nextIdx];
      const nextPlayer = activePlayer === "A" ? "B" : "A";
      const nextVideo = nextPlayer === "A" ? videoRefA.current : videoRefB.current;
      const prevVideo = activePlayer === "A" ? videoRefA.current : videoRefB.current;

      if (nextVideo) {
        nextVideo.src = targetScene.src;
        nextVideo.currentTime = targetScene.startTime || 0;
        nextVideo
          .play()
          .then(() => {
            setActivePlayer(nextPlayer);
            setCurrentSceneIdx(nextIdx);
            setSceneProgress(0);
            // After fade transition, pause previous
            setTimeout(() => {
              if (prevVideo) prevVideo.pause();
            }, 600);
          })
          .catch(() => {
            setActivePlayer(nextPlayer);
            setCurrentSceneIdx(nextIdx);
          });
      } else {
        setCurrentSceneIdx(nextIdx);
      }
    },
    [activePlayer]
  );

  // Automatic timed progression across scenes
  useEffect(() => {
    let animationFrameId: number;

    const checkProgress = () => {
      if (!isPlaying) {
        animationFrameId = requestAnimationFrame(checkProgress);
        return;
      }

      const activeVideo = activePlayer === "A" ? videoRefA.current : videoRefB.current;
      if (activeVideo && !activeVideo.paused) {
        const startOffset = currentScene.startTime || 0;
        const elapsed = activeVideo.currentTime - startOffset;
        const dur = currentScene.duration;
        const p = Math.min(1, Math.max(0, elapsed / dur));
        setSceneProgress(p);

        if (elapsed >= dur) {
          // Advance to next scene
          const nextIdx = (currentSceneIdx + 1) % FILM_SCENES.length;
          transitionToScene(nextIdx);
          return;
        }
      }

      animationFrameId = requestAnimationFrame(checkProgress);
    };

    animationFrameId = requestAnimationFrame(checkProgress);
    return () => cancelAnimationFrame(animationFrameId);
  }, [currentSceneIdx, activePlayer, isPlaying, currentScene.duration, currentScene.startTime, transitionToScene]);

  // Initial playback
  useEffect(() => {
    if (videoRefA.current) {
      videoRefA.current.src = FILM_SCENES[0].src;
      videoRefA.current.currentTime = FILM_SCENES[0].startTime || 0;
      videoRefA.current.play().catch(() => {});
    }
  }, []);

  return (
    <header
      id="top"
      className="relative h-screen min-h-[580px] text-white flex items-end overflow-hidden bg-dark select-none"
    >
      {/* Dual Video Players with Hardware-Accelerated Crossfade */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#3a3226] via-[#15120d] to-[#2b2415] overflow-hidden">
        {/* Player A */}
        <video
          ref={videoRefA}
          poster="/media/images/residential-avenue.jpg"
          muted
          playsInline
          preload="auto"
          className={`absolute inset-0 w-full h-full object-cover block transition-opacity duration-700 ease-in-out ${
            activePlayer === "A" ? "opacity-100 z-1" : "opacity-0 z-0 pointer-events-none"
          }`}
        />

        {/* Player B */}
        <video
          ref={videoRefB}
          poster="/media/images/villa-facade.jpg"
          muted
          playsInline
          preload="auto"
          className={`absolute inset-0 w-full h-full object-cover block transition-opacity duration-700 ease-in-out ${
            activePlayer === "B" ? "opacity-100 z-1" : "opacity-0 z-0 pointer-events-none"
          }`}
        />

        {/* Clean Scrim Gradient — Unobstructed Center & Maximum Video Clarity */}
        <div
          className="absolute inset-0 pointer-events-none z-2"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.15) 25%, transparent 50%, rgba(0,0,0,0.25) 100%)",
          }}
        />
      </div>

      {/* Top Floating Badges (Play button completely removed as requested) */}
      <div className="absolute top-[80px] sm:top-[90px] left-[5vw] right-[5vw] z-10 flex items-center justify-between pointer-events-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-xs font-serif tracking-wider text-gold shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-gold" />
          <span>{PROJECT_CONFIG.brand.blessing}</span>
        </div>
      </div>

      {/* Hero Action Buttons Stage (Sentence and titles removed for clean, unobstructed cinematic view) */}
      <div className="relative z-10 px-[5vw] pb-[13vh] sm:pb-[14vh]">
        <div className="flex flex-wrap items-center gap-3">
          <a href="#about" className="btn fill shadow-lg backdrop-blur-sm">
            Explore the Project
          </a>
          <a href="#plans" className="btn bg-black/30 backdrop-blur-md border-white/40 hover:border-gold text-white shadow-lg">
            Floor Plans
          </a>
          <a href="#enquire" className="btn bg-black/30 backdrop-blur-md border-white/40 hover:border-gold text-white shadow-lg">
            Enquire
          </a>
        </div>
      </div>

      {/* Bottom Interactive Chapter Navigation Dock ("Hover / Click Scene") */}
      <div className="absolute left-[5vw] right-[5vw] bottom-[28px] z-20 pointer-events-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {FILM_SCENES.map((scene, idx) => {
            const isActive = currentSceneIdx === idx;
            return (
              <div
                key={scene.id}
                role="button"
                tabIndex={0}
                onMouseEnter={() => transitionToScene(idx)}
                onClick={() => transitionToScene(idx)}
                aria-label={`Jump to ${scene.label}`}
                className={`group relative rounded-[8px] p-2 sm:p-2.5 cursor-pointer backdrop-blur-md transition-all duration-300 border text-left ${
                  isActive
                    ? "bg-black/80 border-gold shadow-lg"
                    : "bg-black/45 border-white/15 hover:border-gold/60 hover:bg-black/65"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[9px] font-mono tracking-wider uppercase text-gold font-semibold">
                    {scene.tag}
                  </span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-gold animate-ping" />}
                </div>

                <div className="text-[11px] sm:text-[12px] font-serif text-white truncate font-medium group-hover:text-gold transition-colors">
                  {scene.label}
                </div>

                {/* Progress bar inside active card */}
                <div className="w-full h-[2px] bg-white/20 mt-1.5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gold transition-all duration-75"
                    style={{
                      width: isActive ? `${sceneProgress * 100}%` : "0%",
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pulsing Scroll Indicator */}
      <div
        className="hidden md:block absolute bottom-[8px] left-1/2 -translate-x-1/2 w-[1px] h-[36px] bg-white/40 pointer-events-none"
        style={{ animation: "scrollPulse 2s infinite ease-in-out" }}
      />
    </header>
  );
};
