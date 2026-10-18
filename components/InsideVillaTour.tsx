"use client";

import React, { useState, useEffect } from "react";
import { PROJECT_CONFIG, TourRoom } from "@/config/projectData";
import {
  X,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  Maximize,
  Minimize,
  Volume2,
  VolumeX,
  Compass,
  Layers,
  Sparkles,
  Info,
  Check,
  Eye,
  MapPin,
  ArrowRight
} from "lucide-react";
import { ambientSound } from "@/lib/audioSynth";
import { ThreeVillaModel } from "./ThreeVillaModel";
import { PanoramaViewer } from "./PanoramaViewer";

interface InsideVillaTourProps {
  initialRoomId?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const InsideVillaTour: React.FC<InsideVillaTourProps> = ({
  initialRoomId,
  isOpen,
  onClose,
}) => {
  const rooms = PROJECT_CONFIG.tourRooms;
  const [currentRoomIndex, setCurrentRoomIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [tourMode, setTourMode] = useState<"video" | "360" | "3d">("video");
  const [soundActive, setSoundActive] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [infoDrawerOpen, setInfoDrawerOpen] = useState(true);

  // Jump to initial room if requested
  useEffect(() => {
    if (initialRoomId) {
      const idx = rooms.findIndex((r) => r.id === initialRoomId);
      if (idx !== -1) {
        setCurrentRoomIndex(idx);
      }
    }
  }, [initialRoomId, rooms]);

  // Auto-play timer for tour sequence
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && tourMode === "video") {
      timer = setInterval(() => {
        setCurrentRoomIndex((prev) => (prev + 1) % rooms.length);
      }, 7000);
    }
    return () => clearInterval(timer);
  }, [isPlaying, tourMode, rooms.length]);

  if (!isOpen) return null;

  const currentRoom: TourRoom = rooms[currentRoomIndex] || rooms[0];

  const toggleSound = () => {
    const s = ambientSound.toggle();
    setSoundActive(s);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const handleNext = () => {
    setCurrentRoomIndex((prev) => (prev + 1) % rooms.length);
  };

  const handlePrev = () => {
    setCurrentRoomIndex((prev) => (prev - 1 + rooms.length) % rooms.length);
  };

  const progressPercent = ((currentRoomIndex + 1) / rooms.length) * 100;

  return (
    <div className="fixed inset-0 z-50 bg-forest-950/95 backdrop-blur-2xl flex flex-col justify-between overflow-hidden text-ivory-100 animate-fade-in">
      {/* Top Navigation Bar */}
      <header className="px-4 sm:px-8 py-3.5 border-b border-gold-400/20 bg-forest-950/80 backdrop-blur-md flex items-center justify-between z-30 shrink-0">
        {/* Brand & Room Info */}
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="w-8 h-8 rounded-full bg-forest-800 border border-gold-400/40 flex items-center justify-center text-gold-400 shadow-gold-glow">
            <Compass className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] sm:text-xs font-cinzel uppercase tracking-widest text-gold-400 font-bold">
                VARAHI ANUGRAHAMS &bull; VIRTUAL TOUR
              </span>
              <span className="px-2 py-0.5 rounded-full bg-forest-900 border border-gold-400/30 text-[9px] text-stone-300 hidden sm:inline">
                {currentRoom.floor}
              </span>
            </div>
            <h2 className="font-cinzel text-sm sm:text-lg font-bold text-ivory-50 leading-tight">
              {currentRoom.name}
            </h2>
          </div>
        </div>

        {/* Mode Switcher Tabs (Video vs 360 Panorama vs Real-Time 3D) */}
        <div className="hidden md:flex items-center gap-1 glass-panel-subtle p-1 rounded-full border border-gold-400/25 text-xs">
          <button
            onClick={() => {
              setTourMode("video");
              setIsPlaying(false);
            }}
            className={`px-3.5 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
              tourMode === "video"
                ? "bg-gold-400 text-forest-950 font-bold shadow-gold-glow"
                : "text-stone-300 hover:text-gold-300"
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Mode A: Cinematic</span>
          </button>

          <button
            onClick={() => {
              setTourMode("360");
              setIsPlaying(false);
            }}
            className={`px-3.5 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
              tourMode === "360"
                ? "bg-gold-400 text-forest-950 font-bold shadow-gold-glow"
                : "text-stone-300 hover:text-gold-300"
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Mode B: 360&deg; Panorama</span>
          </button>

          <button
            onClick={() => {
              setTourMode("3d");
              setIsPlaying(false);
            }}
            className={`px-3.5 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
              tourMode === "3d"
                ? "bg-gold-400 text-forest-950 font-bold shadow-gold-glow"
                : "text-stone-300 hover:text-gold-300"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Mode C: 3D Villa Model</span>
          </button>
        </div>

        {/* Global Controls & Exit */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            className={`p-2 rounded-full border transition-colors ${
              soundActive
                ? "bg-gold-400/20 border-gold-400 text-gold-300"
                : "bg-forest-900 border-gold-400/30 text-stone-300 hover:text-gold-300"
            }`}
            title="Toggle Nature Soundscape"
          >
            {soundActive ? <Volume2 className="w-4 h-4 animate-pulse" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-full bg-forest-900 border border-gold-400/30 text-stone-300 hover:text-gold-300 transition-colors hidden sm:block"
            title="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
          </button>

          {/* Return to Exterior Button */}
          <button
            onClick={onClose}
            className="px-3 sm:px-4 py-1.5 rounded-full bg-gold-400 hover:bg-gold-300 text-forest-950 text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5 shadow-gold-glow"
          >
            <X className="w-4 h-4" />
            <span className="hidden sm:inline">Return to Exterior</span>
          </button>
        </div>
      </header>

      {/* Main Viewport Section */}
      <main className="relative flex-1 w-full h-full overflow-hidden flex items-center justify-center p-2 sm:p-4">
        {/* Mode A: Cinematic Room View with Hotspots and Camera Float */}
        {tourMode === "video" && (
          <div className="relative w-full h-full rounded-2xl sm:rounded-3xl overflow-hidden glass-panel-gold border border-gold-400/40 shadow-2xl flex items-center justify-center">
            {/* Architectural Room Image with Ken Burns Float Animation */}
            <img
              key={currentRoom.id}
              src={currentRoom.image}
              alt={currentRoom.name}
              className="w-full h-full object-cover object-center animate-fade-in transition-all duration-1000 transform motion-safe:scale-105"
            />

            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-forest-950/80 via-transparent to-forest-950/30 pointer-events-none" />

            {/* Room Hotspots Linking Adjacent Rooms */}
            {currentRoom.hotspots?.map((spot, sIdx) => (
              <button
                key={sIdx}
                onClick={() => {
                  const targetIdx = rooms.findIndex((r) => r.id === spot.targetRoomId);
                  if (targetIdx !== -1) setCurrentRoomIndex(targetIdx);
                }}
                style={{ left: `${spot.position.x}%`, top: `${spot.position.y}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group"
                aria-label={`Go to ${spot.label}`}
              >
                <div className="relative flex items-center justify-center">
                  <span className="w-7 h-7 rounded-full bg-gold-400/40 animate-ping absolute" />
                  <div className="w-8 h-8 rounded-full bg-forest-950/90 border border-gold-400 text-gold-300 group-hover:bg-gold-400 group-hover:text-forest-950 flex items-center justify-center transition-all shadow-gold-glow">
                    <Compass className="w-4 h-4" />
                  </div>
                  <span className="absolute left-full ml-2.5 whitespace-nowrap bg-forest-950/90 border border-gold-400/40 text-gold-300 text-xs px-2.5 py-1 rounded-full opacity-90 group-hover:opacity-100 font-sans shadow-lg">
                    {spot.label}
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Mode B: 360-degree interactive panorama */}
        {tourMode === "360" && (
          <PanoramaViewer imageSrc={currentRoom.image} roomName={currentRoom.name} />
        )}

        {/* Mode C: Real-Time 3D Architectural Villa Model */}
        {tourMode === "3d" && (
          <ThreeVillaModel
            activeFloor={currentRoom.floor}
            onSelectRoom={(roomId) => {
              const idx = rooms.findIndex((r) => r.id === roomId);
              if (idx !== -1) setCurrentRoomIndex(idx);
            }}
          />
        )}

        {/* Floating Side Architectural Info Drawer */}
        {infoDrawerOpen && (
          <div className="absolute top-6 left-6 max-w-xs sm:max-w-sm glass-panel-gold rounded-2xl p-4 sm:p-5 border border-gold-400/40 shadow-2xl z-20 hidden md:block animate-fade-in">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] uppercase tracking-widest text-gold-400 font-semibold">
                {currentRoom.floor}
              </span>
              <button
                onClick={() => setInfoDrawerOpen(false)}
                className="text-stone-400 hover:text-ivory-100 text-xs"
              >
                &times;
              </button>
            </div>

            <h3 className="font-cinzel text-base font-bold text-ivory-50 mb-1">
              {currentRoom.headline}
            </h3>

            <p className="text-xs text-stone-300 font-light leading-relaxed mb-3">
              {currentRoom.description}
            </p>

            <div className="space-y-1.5 pt-2 border-t border-gold-400/20">
              <span className="text-[10px] font-cinzel text-gold-300 uppercase tracking-wider block">
                Highlights:
              </span>
              {currentRoom.architecturalHighlights.map((hl, i) => (
                <div key={i} className="flex items-start gap-1.5 text-[11px] text-stone-300">
                  <Check className="w-3 h-3 text-gold-400 shrink-0 mt-0.5" />
                  <span>{hl}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {!infoDrawerOpen && (
          <button
            onClick={() => setInfoDrawerOpen(true)}
            className="absolute top-6 left-6 glass-panel px-3 py-1.5 rounded-full border border-gold-400/30 text-xs text-gold-300 z-20 hidden md:flex items-center gap-1.5"
          >
            <Info className="w-3.5 h-3.5 text-gold-400" />
            <span>Room Specs</span>
          </button>
        )}
      </main>

      {/* Tour Progress Line */}
      <div className="w-full h-1 bg-forest-900 relative">
        <div
          className="h-full bg-gradient-to-r from-gold-500 to-gold-300 transition-all duration-500 shadow-gold-glow"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Bottom Room Navigation & Playback Controls */}
      <footer className="px-4 sm:px-8 py-3 bg-forest-950/90 border-t border-gold-400/20 flex flex-col gap-2.5 z-30 shrink-0">
        <div className="flex items-center justify-between gap-4">
          {/* Previous Room */}
          <button
            onClick={handlePrev}
            className="p-2 rounded-full glass-panel border border-gold-400/30 text-gold-300 hover:bg-gold-400 hover:text-forest-950 transition-colors"
            title="Previous Room"
            aria-label="Previous Room"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Center Play/Pause & Room Name Indicator */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2.5 rounded-full bg-gold-400 hover:bg-gold-300 text-forest-950 transition-transform active:scale-95 shadow-gold-glow"
              title={isPlaying ? "Pause Auto-Tour" : "Play Auto-Tour"}
              aria-label={isPlaying ? "Pause Tour" : "Play Tour"}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
            </button>

            <div className="text-center">
              <span className="text-[10px] text-stone-400 uppercase tracking-widest block font-sans">
                Room {currentRoomIndex + 1} of {rooms.length}
              </span>
              <span className="font-cinzel text-xs sm:text-sm font-bold text-ivory-100">
                {currentRoom.name}
              </span>
            </div>
          </div>

          {/* Next Room */}
          <button
            onClick={handleNext}
            className="p-2 rounded-full glass-panel border border-gold-400/30 text-gold-300 hover:bg-gold-400 hover:text-forest-950 transition-colors"
            title="Next Room"
            aria-label="Next Room"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Room Carousel Pills */}
        <div className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-none justify-start sm:justify-center">
          {rooms.map((room, idx) => (
            <button
              key={room.id}
              onClick={() => setCurrentRoomIndex(idx)}
              className={`px-3 py-1 rounded-full text-[11px] whitespace-nowrap transition-all flex items-center gap-1.5 ${
                currentRoomIndex === idx
                  ? "bg-gold-400 text-forest-950 font-bold shadow-gold-glow scale-105"
                  : "bg-forest-900/60 border border-gold-400/20 text-stone-300 hover:text-gold-300"
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-current" />
              <span>{room.name}</span>
            </button>
          ))}
        </div>
      </footer>
    </div>
  );
};
