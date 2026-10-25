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
    duration: 5.0, // Zooming into residential complex - 5.0s (skips last 2 seconds)
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
    duration: 5.8, // Inside interiors video - 5.8s (added 2 sec more)
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

// Helper to strictly enforce mobile iOS/Safari autoplay properties on HTML5 video elements
const ensureVideoAttrs = (video: HTMLVideoElement | null) => {
  if (!video) return;
  video.muted = true;
  video.defaultMuted = true;
  video.playsInline = true;
  video.setAttribute("muted", "");
  video.setAttribute("playsinline", "");
  video.setAttribute("webkit-playsinline", "true");
  video.setAttribute("x5-playsinline", "true");
};

export const ContinuousCinematicHero: React.FC = () => {
  const [currentSceneIdx, setCurrentSceneIdx] = useState(0);
  const [isPlaying] = useState(true);

  // Dual video player references for zero-black-flash seamless cross-fading & background prebuffering
  const videoRefA = useRef<HTMLVideoElement>(null);
  const videoRefB = useRef<HTMLVideoElement>(null);
  const [activePlayer, setActivePlayer] = useState<"A" | "B">("A");

  // Synchronized refs to eliminate race conditions and stale closure issues in rAF
  const activePlayerRef = useRef<"A" | "B">("A");
  const currentSceneIdxRef = useRef<number>(0);
  const sceneStartTimeRef = useRef<number>(performance.now());
  const isTransitioningRef = useRef<boolean>(false);

  // Direct DOM references for progress bars & cards to prevent React re-renders per frame
  const barRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Transition to a specific scene index with smooth cross-fade & background prebuffering
  const transitionToScene = useCallback(
    (nextIdx: number, isManual: boolean = false) => {
      if (!isManual && isTransitioningRef.current) return;
      isTransitioningRef.current = true;

      const targetScene = FILM_SCENES[nextIdx];
      const nextPlayer = activePlayerRef.current === "A" ? "B" : "A";
      const nextVideo = nextPlayer === "A" ? videoRefA.current : videoRefB.current;
      const prevVideo = activePlayerRef.current === "A" ? videoRefA.current : videoRefB.current;

      // Update refs immediately
      activePlayerRef.current = nextPlayer;
      currentSceneIdxRef.current = nextIdx;
      sceneStartTimeRef.current = performance.now();

      // Reset inactive progress bars directly in DOM
      barRefs.current.forEach((bar, idx) => {
        if (bar && idx !== nextIdx) {
          bar.style.width = "0%";
        }
      });

      if (nextVideo) {
        ensureVideoAttrs(nextVideo);

        const currentSrc = nextVideo.currentSrc || nextVideo.src || "";
        if (!currentSrc.includes(targetScene.src)) {
          nextVideo.src = targetScene.src;
        }

        const startOffset = targetScene.startTime || 0;
        try {
          nextVideo.currentTime = startOffset;
        } catch (_) {}

        const playPromise = nextVideo.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {});
        }
      }

      // Update React state for UI indicators
      setActivePlayer(nextPlayer);
      setCurrentSceneIdx(nextIdx);

      // After 500ms crossfade, pause previous video, prebuffer subsequent scene, and release lock
      setTimeout(() => {
        if (prevVideo) {
          prevVideo.pause();
          const followingIdx = (nextIdx + 1) % FILM_SCENES.length;
          const followingScene = FILM_SCENES[followingIdx];
          if (!prevVideo.src.includes(followingScene.src)) {
            ensureVideoAttrs(prevVideo);
            prevVideo.src = followingScene.src;
            prevVideo.preload = "auto";
            try {
              prevVideo.currentTime = followingScene.startTime || 0;
            } catch (_) {}
          }
        }
        isTransitioningRef.current = false;
      }, 500);
    },
    []
  );

  // Automatic timed progression across scenes — hybrid video + wall clock for guaranteed progression
  useEffect(() => {
    let animationFrameId: number;

    const checkProgress = () => {
      if (!isPlaying) {
        animationFrameId = requestAnimationFrame(checkProgress);
        return;
      }

      const idx = currentSceneIdxRef.current;
      const scene = FILM_SCENES[idx];
      const dur = scene.duration;
      const activeVideo = activePlayerRef.current === "A" ? videoRefA.current : videoRefB.current;

      const now = performance.now();
      const elapsedWall = Math.max(0, (now - sceneStartTimeRef.current) / 1000);

      let elapsed = elapsedWall;
      if (activeVideo && !activeVideo.paused && !isNaN(activeVideo.currentTime) && activeVideo.currentTime > 0) {
        const startOffset = scene.startTime || 0;
        const elapsedVideo = Math.max(0, activeVideo.currentTime - startOffset);
        // Blend clocks: accurately follow video frames while ensuring wall clock guarantees progression
        elapsed = Math.max(elapsedVideo, elapsedWall * 0.9);
      } else if (activeVideo && activeVideo.paused) {
        // Kickstart playback if browser paused
        ensureVideoAttrs(activeVideo);
        activeVideo.play().catch(() => {});
      }

      // Direct hardware-accelerated style update
      const activeBar = barRefs.current[idx];
      if (activeBar) {
        const p = Math.min(1, Math.max(0, elapsed / dur));
        activeBar.style.width = `${p * 100}%`;
      }

      // Time to advance!
      if (elapsed >= dur && !isTransitioningRef.current) {
        const nextIdx = (idx + 1) % FILM_SCENES.length;
        transitionToScene(nextIdx, false);
      }

      animationFrameId = requestAnimationFrame(checkProgress);
    };

    animationFrameId = requestAnimationFrame(checkProgress);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPlaying, transitionToScene]);

  // Initial playback mount
  useEffect(() => {
    // Initialize Player A with Scene 0
    if (videoRefA.current) {
      ensureVideoAttrs(videoRefA.current);
      videoRefA.current.src = FILM_SCENES[0].src;
      videoRefA.current.currentTime = FILM_SCENES[0].startTime || 0;
      const p = videoRefA.current.play();
      if (p !== undefined) {
        p.catch(() => {});
      }
    }

    // Prebuffer Scene 1 on Player B so transition is 100% instantaneous
    if (videoRefB.current) {
      ensureVideoAttrs(videoRefB.current);
      videoRefB.current.src = FILM_SCENES[1].src;
      videoRefB.current.preload = "auto";
      try {
        videoRefB.current.currentTime = FILM_SCENES[1].startTime || 0;
      } catch (_) {}
    }

    // Global touch/click unlock for mobile browsers
    const unlockMobileVideos = () => {
      if (videoRefA.current) {
        ensureVideoAttrs(videoRefA.current);
        if (activePlayerRef.current === "A" && videoRefA.current.paused) {
          videoRefA.current.play().catch(() => {});
        }
      }
      if (videoRefB.current) {
        ensureVideoAttrs(videoRefB.current);
        if (activePlayerRef.current === "B" && videoRefB.current.paused) {
          videoRefB.current.play().catch(() => {});
        }
      }
    };

    window.addEventListener("touchstart", unlockMobileVideos, { once: true, passive: true });
    window.addEventListener("click", unlockMobileVideos, { once: true, passive: true });

    return () => {
      window.removeEventListener("touchstart", unlockMobileVideos);
      window.removeEventListener("click", unlockMobileVideos);
    };
  }, []);

  // Auto-scroll active chapter card into view horizontally on mobile
  useEffect(() => {
    const activeCard = cardRefs.current[currentSceneIdx];
    if (activeCard && typeof window !== "undefined" && window.innerWidth < 768) {
      activeCard.scrollIntoView({ behavior: "smooth", inline: "nearest", block: "nearest" });
    }
  }, [currentSceneIdx]);

  return (
    <header
      id="top"
      className="relative h-[100dvh] min-h-[580px] text-white flex flex-col justify-end overflow-hidden bg-dark select-none"
    >
      {/* Dual Video Players with Hardware-Accelerated Crossfade */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#3a3226] via-[#15120d] to-[#2b2415] overflow-hidden">
        {/* Player A */}
        <video
          ref={videoRefA}
          poster="/media/images/residential-avenue.jpg"
          autoPlay
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
          autoPlay
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
              "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.2) 30%, transparent 55%, rgba(0,0,0,0.3) 100%)",
          }}
        />
      </div>

      {/* Top Floating Badges */}
      <div className="absolute top-[64px] sm:top-[85px] left-[3.5vw] sm:left-[5vw] right-[3.5vw] sm:right-[5vw] z-10 flex items-center justify-between pointer-events-auto">
        <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-[10px] sm:text-xs font-serif tracking-wider text-gold shadow-sm">
          <Sparkles className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-gold shrink-0" />
          <span className="truncate">{PROJECT_CONFIG.brand.blessing}</span>
        </div>
      </div>

      {/* Unified Bottom Controls Overlay (Zero overlap, mobile-first responsive layout) */}
      <div className="relative z-10 w-full max-w-full min-w-0 px-[3.5vw] sm:px-[5vw] pb-[max(14px,env(safe-area-inset-bottom))] flex flex-col gap-2.5 sm:gap-3.5 pointer-events-none">
        
        {/* Action Buttons Row */}
        <div className="grid grid-cols-3 gap-2 pointer-events-auto w-full max-w-full min-w-0 sm:flex sm:w-auto">
          <a
            href="#about"
            className="inline-flex items-center justify-center px-2 sm:px-6 py-2.5 sm:py-3.5 rounded-full bg-gold hover:bg-gold-hover text-stone-950 font-serif font-semibold text-[11px] sm:text-xs md:text-sm uppercase tracking-wider transition-all shadow-lg text-center truncate"
          >
            <span className="sm:hidden">Explore</span>
            <span className="hidden sm:inline">Explore Project</span>
          </a>
          <a
            href="#plans"
            className="inline-flex items-center justify-center px-2 sm:px-5 py-2.5 sm:py-3.5 rounded-full bg-stone-950/60 backdrop-blur-md border border-white/30 hover:border-gold hover:text-gold text-white font-serif font-medium text-[11px] sm:text-xs md:text-sm uppercase tracking-wider transition-all shadow-lg text-center truncate"
          >
            <span className="sm:hidden">Plans</span>
            <span className="hidden sm:inline">Floor Plans</span>
          </a>
          <a
            href="#enquire"
            className="inline-flex items-center justify-center px-2 sm:px-5 py-2.5 sm:py-3.5 rounded-full bg-stone-950/60 backdrop-blur-md border border-white/30 hover:border-gold hover:text-gold text-white font-serif font-medium text-[11px] sm:text-xs md:text-sm uppercase tracking-wider transition-all shadow-lg text-center truncate"
          >
            Enquire
          </a>
        </div>

        {/* Interactive Chapter Dock: Horizontal swipe on mobile, 6-col grid on desktop */}
        <div className="w-full max-w-full min-w-0 pointer-events-auto">
          <div className="flex md:grid md:grid-cols-6 gap-2 sm:gap-2.5 overflow-x-auto no-scrollbar snap-x snap-mandatory py-1 px-0.5">
            {FILM_SCENES.map((scene, idx) => {
              const isActive = currentSceneIdx === idx;
              return (
                <div
                  key={scene.id}
                  ref={(el) => {
                    cardRefs.current[idx] = el;
                  }}
                  role="button"
                  tabIndex={0}
                  onMouseEnter={() => {
                    if (typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches) {
                      if (currentSceneIdx !== idx) transitionToScene(idx, true);
                    }
                  }}
                  onClick={() => {
                    if (currentSceneIdx !== idx) transitionToScene(idx, true);
                  }}
                  aria-label={`Jump to ${scene.label}`}
                  className={`group relative rounded-[12px] p-2 sm:p-2.5 md:p-3 cursor-pointer backdrop-blur-xl transition-all duration-200 border text-left shadow-lg will-change-transform shrink-0 snap-start w-[130px] sm:w-[150px] md:w-auto ${
                    isActive
                      ? "bg-stone-950/90 border-gold shadow-[0_4px_20px_0_rgba(169,139,79,0.3)]"
                      : "bg-stone-950/50 border-white/[0.12] hover:border-gold/60 hover:bg-stone-950/70"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[9px] font-mono tracking-wider uppercase text-gold font-semibold truncate">
                      {scene.tag}
                    </span>
                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-gold animate-ping shrink-0" />}
                  </div>

                  <div className="text-[11px] sm:text-[12px] font-serif text-white truncate font-medium group-hover:text-gold transition-colors">
                    {scene.label}
                  </div>

                  {/* Hardware-accelerated progress bar inside card */}
                  <div className="w-full h-[2px] bg-white/20 mt-1.5 rounded-full overflow-hidden">
                    <div
                      ref={(el) => {
                        barRefs.current[idx] = el;
                      }}
                      className="h-full bg-gold transition-all duration-75"
                      style={{ width: "0%" }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
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
