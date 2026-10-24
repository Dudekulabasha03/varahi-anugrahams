"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Play, Pause, RotateCcw, Sparkles } from "lucide-react";

const BEATS = [
  {
    phase: "01",
    eyebrow: "01 · Layer: The Foundation",
    shortLabel: "Land",
    time: 0.0,
    title: "It begins with a plot of land.",
    subtitle: "A pristine canvas framed by royal palms and quiet morning sunlight.",
  },
  {
    phase: "02",
    eyebrow: "02 · Layer: Structural Assembly",
    shortLabel: "Assemble",
    time: 3.5,
    title: "Form, rising piece by piece.",
    subtitle: "Curved stone foundations, steel skeleton, and fluid architectural louvers.",
  },
  {
    phase: "03",
    eyebrow: "03 · Layer: Completed Villa",
    shortLabel: "Completed",
    time: 7.2,
    title: "Complete. Ready to be lived in.",
    subtitle: "Three levels of curated Mediterranean living, private rooftop lounge, and garden.",
  },
];

// Helper to strictly enforce mobile iOS/Safari autoplay and seeking properties
const ensureVideoMuted = (v: HTMLVideoElement | null) => {
  if (!v) return;
  v.muted = true;
  v.defaultMuted = true;
  v.playsInline = true;
  v.setAttribute("muted", "");
  v.setAttribute("playsinline", "");
  v.setAttribute("webkit-playsinline", "true");
  v.setAttribute("x5-playsinline", "true");
};

export const GsapCinematicScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressBarRef = useRef<HTMLSpanElement>(null);
  const progressWrapperRef = useRef<HTMLDivElement>(null);

  const [activeBeat, setActiveBeat] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  // Jump smoothly to a specific phase
  const jumpToPhase = useCallback((beatIdx: number) => {
    const video = videoRef.current;
    if (!video) return;

    ensureVideoMuted(video);
    const targetBeat = BEATS[beatIdx];
    if (targetBeat) {
      try {
        video.currentTime = targetBeat.time;
      } catch (_) {}
      setActiveBeat(beatIdx);
      if (progressBarRef.current && video.duration) {
        progressBarRef.current.style.width = `${(targetBeat.time / video.duration) * 100}%`;
      }
      video
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  }, []);

  // Toggle play/pause for mobile users who want to watch the building assemble automatically
  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    ensureVideoMuted(video);
    if (video.paused) {
      if (video.currentTime >= (video.duration || 10) - 0.2) {
        video.currentTime = 0;
      }
      video
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    } else {
      video.pause();
      setIsPlaying(false);
    }
  }, []);

  // Replay sequence from beginning
  const replaySequence = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    ensureVideoMuted(video);
    video.currentTime = 0;
    setActiveBeat(0);
    if (progressBarRef.current) progressBarRef.current.style.width = "0%";
    video
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => setIsPlaying(false));
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Prevent iOS Safari dynamic address-bar resize jitter on pinned elements
    ScrollTrigger.config({
      ignoreMobileResize: true,
    });

    const container = containerRef.current;
    const video = videoRef.current;
    const bar = progressBarRef.current;
    const barWrapper = progressWrapperRef.current;

    if (!container || !video) return;

    ensureVideoMuted(video);
    video.preload = "auto";
    video.load();

    const onMetadata = () => {
      setVideoLoaded(true);
      ScrollTrigger.refresh();
    };

    video.addEventListener("loadedmetadata", onMetadata);
    if (video.readyState >= 1) {
      setVideoLoaded(true);
    }

    // Touch unlock decoder priming for mobile Safari & Chrome
    const primeDecoder = () => {
      ensureVideoMuted(video);
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // Once unlocked, pause at current time
            if (video.paused === false && !isPlaying) {
              video.pause();
            }
          })
          .catch(() => {});
      }
    };

    window.addEventListener("touchstart", primeDecoder, { once: true, passive: true });
    window.addEventListener("click", primeDecoder, { once: true, passive: true });

    // Non-blocking seek queue to prevent mobile GPU decoder stalls
    let isSeeking = false;
    let targetTime = 0;

    const safeSeek = (time: number) => {
      if (!video || !video.duration || isNaN(video.duration)) return;
      targetTime = Math.min(Math.max(0, time), video.duration - 0.05);

      if (!isSeeking && video.readyState >= 2) {
        isSeeking = true;
        try {
          video.currentTime = targetTime;
        } catch (_) {
          isSeeking = false;
        }
      }
    };

    const onSeeked = () => {
      isSeeking = false;
      if (Math.abs(video.currentTime - targetTime) > 0.08) {
        isSeeking = true;
        try {
          video.currentTime = targetTime;
        } catch (_) {
          isSeeking = false;
        }
      }
    };

    video.addEventListener("seeked", onSeeked);

    // Video timeupdate listener for mobile autoplay mode
    const onTimeUpdate = () => {
      if (!video || isNaN(video.duration) || !video.duration) return;
      const t = video.currentTime;
      const dur = video.duration;
      const p = t / dur;

      if (bar) {
        bar.style.width = `${p * 100}%`;
      }

      if (p < 0.33) {
        setActiveBeat(0);
      } else if (p < 0.68) {
        setActiveBeat(1);
      } else {
        setActiveBeat(2);
      }

      if (t >= dur - 0.1) {
        setIsPlaying(false);
      }
    };

    video.addEventListener("timeupdate", onTimeUpdate);

    // ScrollTrigger Pinned Assembly Sequence with comfortable mobile scroll length
    const isMobile = window.innerWidth < 768;
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: isMobile ? "+=180%" : "+=140%", // Comfortable scroll distance on touch devices
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        scrub: isMobile ? 0.4 : 0.2, // Smoother scrub on mobile
        onUpdate: (self) => {
          const p = self.progress;

          // Only scrub if user is actively scrolling (not in manual play mode)
          if (video.paused && video.duration && !isNaN(video.duration)) {
            safeSeek(p * video.duration);
          }

          // Update progress bar
          if (bar) {
            bar.style.width = `${p * 100}%`;
          }

          // Fade out the progress bar when nearing the transition to the next section
          if (barWrapper) {
            barWrapper.style.opacity = p > 0.9 ? `${Math.max(0, (1 - p) / 0.1)}` : "1";
          }

          // Update active beat with a clean exit before unpinning
          if (p < 0.32) {
            setActiveBeat(0);
          } else if (p < 0.66) {
            setActiveBeat(1);
          } else if (p < 0.90) {
            setActiveBeat(2);
          } else {
            setActiveBeat(-1);
          }
        },
      });
    }, container);

    return () => {
      video.removeEventListener("loadedmetadata", onMetadata);
      video.removeEventListener("seeked", onSeeked);
      video.removeEventListener("timeupdate", onTimeUpdate);
      window.removeEventListener("touchstart", primeDecoder);
      window.removeEventListener("click", primeDecoder);
      ctx.revert();
    };
  }, [isPlaying]);

  return (
    <div
      ref={containerRef}
      id="scene"
      className="relative w-full h-[100dvh] min-h-[580px] bg-[#0b0907] text-white select-none overflow-hidden"
    >
      {/* Full-Screen Hardware-Accelerated Video — 100% Unobstructed */}
      <div className="absolute inset-0 bg-[#0b0907] overflow-hidden">
        <video
          ref={videoRef}
          src="/media/videos/assembly-puzzle.mp4"
          poster="/media/images/villa-facade.jpg"
          autoPlay
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover block will-change-transform brightness-100"
        />
        {/* Subtle Bottom & Left Scrim only for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Top Floating Glass Header: Phase Badges & Play Control */}
      <div className="absolute top-[68px] sm:top-[85px] inset-x-[4vw] sm:inset-x-[5vw] z-20 flex items-center justify-between gap-2 pointer-events-auto">
        
        {/* Phase Navigation Pills (Tappable on mobile & desktop) */}
        <div className="flex items-center gap-1.5 sm:gap-2 p-1 rounded-full bg-black/60 backdrop-blur-xl border border-white/15 shadow-xl overflow-x-auto no-scrollbar max-w-full">
          <div className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider text-gold border-r border-white/10">
            <Sparkles className="w-3 h-3 text-gold" />
            <span>Assembly</span>
          </div>
          {BEATS.map((b, idx) => {
            const isCurrent = activeBeat === idx;
            return (
              <button
                key={b.phase}
                type="button"
                onClick={() => jumpToPhase(idx)}
                className={`px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-mono uppercase tracking-wider transition-all whitespace-nowrap ${
                  isCurrent
                    ? "bg-gold text-stone-950 font-bold shadow-md shadow-gold/30"
                    : "text-stone-300 hover:text-white hover:bg-white/10"
                }`}
              >
                <span className="font-semibold">{b.phase}</span>
                <span className="ml-1 text-[9px] sm:text-[11px] opacity-90">{b.shortLabel}</span>
              </button>
            );
          })}
        </div>

        {/* Floating Play / Pause / Replay Controls */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause Assembly Animation" : "Play Assembly Animation"}
            className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-full bg-black/60 hover:bg-stone-900/80 backdrop-blur-xl border border-white/20 text-white hover:border-gold text-[10px] sm:text-xs font-mono uppercase tracking-wider transition-all shadow-xl"
          >
            {isPlaying ? (
              <>
                <Pause className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-gold fill-gold" />
                <span className="hidden xs:inline">Pause</span>
              </>
            ) : (
              <>
                <Play className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-gold fill-gold" />
                <span>Play</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={replaySequence}
            aria-label="Replay Assembly Sequence"
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/60 hover:bg-stone-900/80 backdrop-blur-xl border border-white/20 text-stone-300 hover:text-gold hover:border-gold flex items-center justify-center transition-all shadow-xl"
          >
            <RotateCcw className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
          </button>
        </div>
      </div>

      {/* Storytelling Narrative Beat (Single keyed container for zero text overlap) */}
      {activeBeat >= 0 && activeBeat < BEATS.length && (
        <div
          key={activeBeat}
          className="absolute left-[5vw] right-[5vw] bottom-[10vh] sm:bottom-[12vh] max-w-[560px] z-20 pointer-events-auto transition-opacity duration-300"
        >
          <div className="eyebrow !mb-1.5 sm:!mb-2" style={{ color: "var(--gold)" }}>
            {BEATS[activeBeat].eyebrow}
          </div>
          <h2 className="font-serif font-medium leading-[1.08] text-white text-2xl sm:text-4xl md:text-5xl">
            {BEATS[activeBeat].title}
          </h2>
          <p className="mt-1.5 sm:mt-2 text-stone-300 text-xs sm:text-sm font-light max-w-[460px] leading-relaxed line-clamp-2 sm:line-clamp-none">
            {BEATS[activeBeat].subtitle}
          </p>
        </div>
      )}

      {/* Minimalist Progress Hairline (Cleanly fades near the end) */}
      <div
        ref={progressWrapperRef}
        className="absolute left-[5vw] right-[5vw] bottom-[max(20px,env(safe-area-inset-bottom))] h-[2px] bg-white/20 z-20 transition-opacity duration-300 pointer-events-none"
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
