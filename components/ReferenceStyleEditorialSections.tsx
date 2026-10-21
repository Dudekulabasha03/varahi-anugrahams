"use client";

import React, { useRef, useState } from "react";
import { UniversalLightbox } from "./ui/UniversalLightbox";
import { Volume2, VolumeX, Play, Pause, Maximize2, Sparkles, Compass } from "lucide-react";
import { SpotlightCard } from "./ui/SpotlightCard";

export const ReferenceStyleEditorialSections: React.FC = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Video Player state for Aerial Community video
  const communityVideoRef = useRef<HTMLVideoElement>(null);
  const [isCommunityMuted, setIsCommunityMuted] = useState(true);
  const [isCommunityPlaying, setIsCommunityPlaying] = useState(true);

  const zoomItems = [
    {
      src: "/media/images/terrace-garden.jpg",
      alt: "Terrace Garden with Pergola & Fountain (Size: 23 ft. × 30 ft.)",
      title: "Terrace Garden with Pergola & Fountain",
      caption: "Spacious 23 ft. × 30 ft. terrace garden with wooden pergola lounge, cascading stone fountain, and sunset views.",
    },
    {
      src: "/media/images/villa-facade.jpg",
      alt: "Villa facade at dusk",
      title: "Signature Villa Facade",
      caption: "Curved textured sandstone facade with warm timber louvers and cove lighting.",
    },
    {
      src: "/media/videos/community-drone.mp4",
      alt: "Aerial Drone Community Tour of Varahi Anugrahams",
      title: "30 FT Avenue · Aerial Community Drone Tour",
      caption: "Aerial 4K cinematic perspective showcasing the 30 ft central avenue and luxury villa enclave.",
    },
    {
      src: "/media/images/welcome-arch-poster.jpg",
      alt: "Grand entrance gateway at sunset",
      title: "Monumental Entrance Gate",
      caption: "Grand arrival portal with Sri Alurukona Ranganathaswamy blessings.",
    },
    {
      src: "/media/images/floor-plans-complete.jpg",
      alt: "Ground and first floor plan",
      title: "3D Architectural Floor Plans",
      caption: "Ground Floor (~58' × 30') and First Floor (~58' × 25') layouts.",
    },
    {
      src: "/media/images/anti-termite-system.jpg",
      alt: "Anti-termite reticulation piping system",
      title: "Foundation Reticulation Engineering",
      caption: "Sub-surface porous piping grid with brick supports for 23 ft × 47 ft house.",
    },
  ];

  const handleZoom = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const specs = [
    { label: "Plot / House Size", value: "23 × 47 ft" },
    { label: "Floors", value: "G + 1 + Terrace" },
    { label: "Bedrooms", value: "3 (2 Master, 1 Child)" },
    { label: "Private Lift", value: "4′6″ × 4′6″" },
    { label: "Terrace Garden", value: "23 × 30 ft" },
    { label: "Internal Road", value: "30 ft Wide" },
    { label: "Road Facing", value: "West Facing" },
  ];

  return (
    <div className="relative z-20 bg-transparent text-ink transition-colors overflow-hidden">
      {/* Background Ambient Glow Orbs */}
      <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-gold/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-[60%] left-[-10%] w-[600px] h-[600px] bg-gold/8 rounded-full blur-[180px] pointer-events-none" />

      {/* 1. Rooftop Split Section */}
      <section className="px-[5vw] py-[12vh]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[5vw] items-center">
          <div>
            <div className="eyebrow">Rooftop</div>
            <h2
              className="font-serif font-medium leading-[1.05]"
              style={{ fontSize: "clamp(34px, 5vw, 64px)" }}
            >
              A terrace above it all.
            </h2>
            <p className="lead">
              Terrace Garden with Pergola &amp; Fountain (Size: 23 ft. × 30 ft.) — An open-sky private sanctuary complete with a slatted wooden pergola lounge, ambient warm cove lighting, and a soothing stone waterfall fountain overlooking the enclave.
            </p>
          </div>
          <SpotlightCard
            onClick={() => handleZoom(0)}
            className="cursor-pointer group"
          >
            <div className="relative overflow-hidden aspect-[4/3]">
              <img
                src="/media/images/terrace-garden.jpg"
                alt="Terrace Garden with Pergola & Fountain (Size: 23 ft. × 30 ft.)"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </SpotlightCard>
        </div>
      </section>

      {/* 2. Architecture Split Section */}
      <section className="px-[5vw] py-[12vh] pt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[5vw] items-center">
          <SpotlightCard
            onClick={() => handleZoom(1)}
            className="cursor-pointer group order-2 md:order-1"
          >
            <div className="relative overflow-hidden aspect-square">
              <img
                src="/media/images/villa-facade.jpg"
                alt="Signature Villa Facade at dusk"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </SpotlightCard>
          <div className="order-1 md:order-2">
            <div className="eyebrow">Architecture</div>
            <h2
              className="font-serif font-medium leading-[1.05]"
              style={{ fontSize: "clamp(34px, 5vw, 64px)" }}
            >
              Curved stone, warm timber, living green.
            </h2>
            <p className="lead">
              Rounded forms, slatted timber screens and planted terraces give each villa a calm,
              organic presence.
            </p>
          </div>
        </div>
      </section>

      {/* 3. The Community Section (Full-Width Cinematic Video Player) */}
      <section className="px-[5vw] py-[12vh] pt-0">
        <div className="eyebrow">The Community</div>
        <h2
          className="font-serif font-medium leading-[1.05] mb-[30px]"
          style={{ fontSize: "clamp(34px, 5vw, 64px)" }}
        >
          One gate. One 30 ft road. Home.
        </h2>
        {/* Full-Width Cinematic Aerial Community Drone Video Player with Glass Frame */}
        <SpotlightCard
          onClick={() => handleZoom(2)}
          className="relative w-full cursor-pointer group shadow-2xl"
          enableTilt={false}
        >
          <div className="relative w-full aspect-[16/9] max-h-[72vh] overflow-hidden">
            <video
              ref={communityVideoRef}
              src="/media/videos/community-drone.mp4"
              poster="/media/images/residential-avenue.jpg"
              autoPlay
              muted={isCommunityMuted}
              loop
              playsInline
              preload="metadata"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
            />
            {/* Subtle Gradient Scrim at top & bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

            {/* Top Badge */}
            <div className="absolute top-4 sm:top-6 left-4 sm:left-6 z-10 flex items-center gap-2 bg-black/60 backdrop-blur-xl px-3.5 py-1.5 rounded-full border border-white/20">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] font-mono tracking-wider uppercase text-white/90">
                Aerial Drone View
              </span>
            </div>

            {/* Controls Bar at Bottom */}
            <div
              className="absolute bottom-3 sm:bottom-6 left-3 sm:left-6 right-3 sm:right-6 z-10 flex items-center justify-between text-white pointer-events-auto gap-2"
              onClick={(e) => e.stopPropagation()}
            >
              <span className="text-[11px] sm:text-sm font-serif tracking-wide text-white/90 drop-shadow truncate max-w-[50%] sm:max-w-none">
                30 FT Central Avenue &amp; Symmetrical Villa Enclave
              </span>
              <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
                <button
                  type="button"
                  aria-label={isCommunityMuted ? "Unmute audio" : "Mute audio"}
                  onClick={() => setIsCommunityMuted(!isCommunityMuted)}
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/60 backdrop-blur-xl border border-white/20 hover:border-gold flex items-center justify-center transition-all text-white/80 hover:text-white"
                >
                  {isCommunityMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <button
                  type="button"
                  aria-label={isCommunityPlaying ? "Pause video" : "Play video"}
                  onClick={() => {
                    if (communityVideoRef.current) {
                      if (isCommunityPlaying) {
                        communityVideoRef.current.pause();
                        setIsCommunityPlaying(false);
                      } else {
                        communityVideoRef.current.play();
                        setIsCommunityPlaying(true);
                      }
                    }
                  }}
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/60 backdrop-blur-xl border border-white/20 hover:border-gold flex items-center justify-center transition-all text-white/80 hover:text-white"
                >
                  {isCommunityPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                </button>
                <button
                  type="button"
                  aria-label="Expand video in lightbox"
                  onClick={() => handleZoom(2)}
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gold hover:bg-gold-hover text-black flex items-center justify-center transition-all shadow-md"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </SpotlightCard>
      </section>

      {/* 4. Floor Plans Section */}
      <section id="plans" className="px-[5vw] py-[12vh]">
        <div className="eyebrow">Floor Plans</div>
        <h2
          className="font-serif font-medium leading-[1.05]"
          style={{ fontSize: "clamp(34px, 5vw, 64px)" }}
        >
          Ground &amp; first floor.
        </h2>
        <SpotlightCard
          onClick={() => handleZoom(4)}
          className="mt-[36px] cursor-pointer group"
          enableTilt={false}
        >
          <div className="relative aspect-[1080/788] p-4 flex items-center justify-center bg-card/60">
            <img
              src="/media/images/floor-plans-complete.jpg"
              alt="Varahi Anugrahams 3D Ground and First Floor Plans"
              className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-[1.02]"
            />
          </div>
        </SpotlightCard>
        <p className="lead mt-6">
          Ground floor: parking, living, dining, kitchen, puja, utility, master bedroom. First
          floor: lounge, master bedroom, child room, balcony. Dimensions as shown on the approved architectural drawing.
        </p>
      </section>

      {/* 5. Construction Section */}
      <section className="px-[5vw] py-[12vh] pt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[5vw] items-center">
          <div>
            <div className="eyebrow">Construction</div>
            <h2
              className="font-serif font-medium leading-[1.05]"
              style={{ fontSize: "clamp(34px, 5vw, 64px)" }}
            >
              Protected from the ground up.
            </h2>
            <p className="lead">
              An anti-termite reticulation piping system is laid beneath the 23 × 47 ft house
              footprint, with pipes supported on brick blocks.
            </p>
          </div>
          <SpotlightCard
            onClick={() => handleZoom(5)}
            className="cursor-pointer group"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <img
                src="/media/images/anti-termite-system.jpg"
                alt="Anti-termite reticulation piping system schematic"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </SpotlightCard>
        </div>
      </section>

      {/* 6. Specifications Section (Glassy Spec Tiles) */}
      <section className="px-[5vw] py-[12vh] pt-0">
        <div className="eyebrow">Specifications</div>
        <h2
          className="font-serif font-medium leading-[1.05] mb-8"
          style={{ fontSize: "clamp(34px, 5vw, 64px)" }}
        >
          The details.
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {specs.map((s, idx) => (
            <SpotlightCard key={idx} className="p-5" enableTilt={true}>
              <dt className="text-[11px] tracking-[0.18em] uppercase text-mut font-mono font-medium">
                {s.label}
              </dt>
              <dd className="font-serif font-medium text-[24px] sm:text-[28px] text-ink mt-2">
                {s.value}
              </dd>
            </SpotlightCard>
          ))}
        </div>
      </section>

      {/* Universal Lightbox Viewer */}
      <UniversalLightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        items={zoomItems}
        initialIndex={lightboxIndex}
      />
    </div>
  );
};
