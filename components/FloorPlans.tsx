"use client";

import React, { useState } from "react";
import { PROJECT_CONFIG, FloorPlanDetail } from "@/config/projectData";
import { Maximize2, Compass, Layers, Check, ZoomIn, ZoomOut, X, Search, Sparkles, Calendar } from "lucide-react";
import { ImageLensZoom } from "./ui/ImageLensZoom";
import { BorderBeam } from "./ui/BorderBeam";

interface FloorPlansProps {
  onOpenTour: (roomId?: string) => void;
  onOpenInquiry?: (interest?: string, note?: string) => void;
}

export const FloorPlans: React.FC<FloorPlansProps> = ({ onOpenTour, onOpenInquiry }) => {
  const [activeFloorId, setActiveFloorId] = useState<"ground" | "first">("ground");
  const [viewMode, setViewMode] = useState<"single" | "dual">("single");
  const [zoomModalOpen, setZoomModalOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [selectedRoomIndex, setSelectedRoomIndex] = useState<number | null>(null);

  const activePlan: FloorPlanDetail =
    PROJECT_CONFIG.floorPlans.find((p) => p.id === activeFloorId) || PROJECT_CONFIG.floorPlans[0];

  const currentDisplayImage =
    viewMode === "dual"
      ? "/media/images/floor-plans-complete.jpg"
      : activePlan.image;

  return (
    <section id="floorplans" className="relative py-28 sm:py-36 bg-forest-900 border-t border-gold-400/20 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-gold-400/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-gold-400/30 bg-forest-950/70 text-gold-400 text-xs uppercase tracking-widest">
            <span>Section 05</span>
            <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
            <span>Architectural Layouts</span>
          </div>

          <h2 className="font-cinzel text-3xl sm:text-5xl font-bold text-ivory-50 tracking-wide">
            Smart <span className="text-gold-gradient">Floor Plans</span>
          </h2>

          <p className="text-sm sm:text-base text-stone-300 font-light max-w-2xl mx-auto">
            Interactive 3D architectural floor plans for the 23 ft &times; 47 ft villa. Use the HD magnifier lens to inspect exact room dimensions and layout flow in razor-sharp clarity.
          </p>
          <div className="gold-divider w-28 mx-auto mt-4" />
        </div>

        {/* View Mode & Floor Selector Controls (21st.dev style tabs) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          {/* Floor Switcher */}
          <div className="glass-panel p-1 rounded-full border border-gold-400/30 inline-flex gap-1.5 shadow-lg">
            {PROJECT_CONFIG.floorPlans.map((floor) => (
              <button
                key={floor.id}
                onClick={() => {
                  setActiveFloorId(floor.id);
                  setViewMode("single");
                  setSelectedRoomIndex(null);
                }}
                className={`px-5 sm:px-7 py-2.5 rounded-full text-xs font-cinzel font-bold uppercase tracking-wider transition-all duration-300 ${
                  activeFloorId === floor.id && viewMode === "single"
                    ? "bg-gold-400 text-forest-950 shadow-gold-glow"
                    : "text-stone-300 hover:text-gold-300"
                }`}
              >
                {floor.name}
              </button>
            ))}
          </div>

          {/* Dual Overview Toggle */}
          <button
            onClick={() => {
              setViewMode(viewMode === "dual" ? "single" : "dual");
            }}
            className={`px-5 py-2.5 rounded-full text-xs font-cinzel font-bold uppercase tracking-wider transition-all duration-300 border ${
              viewMode === "dual"
                ? "bg-gold-400 text-forest-950 border-gold-400 shadow-gold-glow"
                : "glass-panel text-stone-300 border-gold-400/30 hover:text-gold-300"
            }`}
          >
            <span>Dual Floor Overview</span>
          </button>
        </div>

        {/* Main Floor Plan Viewer Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Interactive HD Architectural Diagram with Magnifier Lens */}
          <div className="lg:col-span-7 flex flex-col items-center">
            <div className="relative w-full rounded-3xl overflow-hidden glass-panel-gold border border-gold-400/40 p-4 sm:p-6 shadow-forest-deep">
              {/* 21st.dev Animated Border Beam */}
              <BorderBeam size={300} duration={14} borderWidth={2} colorFrom="#D5AE43" colorTo="#F7F0D0" />

              {/* HD Image Lens Zoom Component */}
              <div className="relative rounded-2xl overflow-hidden bg-forest-950 flex items-center justify-center p-2 min-h-[420px] sm:min-h-[520px]">
                <ImageLensZoom
                  src={currentDisplayImage}
                  alt={`${activePlan.name} - Varahi Anugrahams Architectural Layout`}
                  zoomLevel={2.6}
                  lensSize={200}
                  className="max-h-[500px] w-auto"
                />

                {/* Floating Fullscreen Zoom Trigger */}
                <button
                  onClick={() => setZoomModalOpen(true)}
                  className="absolute top-4 right-4 glass-panel px-3 py-1.5 rounded-full text-xs text-gold-300 border border-gold-400/40 hover:bg-gold-400 hover:text-forest-950 transition-colors flex items-center gap-1.5 z-20 shadow-lg"
                  title="Open Fullscreen Lightbox"
                >
                  <Maximize2 className="w-3.5 h-3.5 text-gold-400" />
                  <span>Expand Plan</span>
                </button>
              </div>

              {/* Bottom Specs Ribbon */}
              <div className="flex items-center justify-between pt-4 mt-4 border-t border-gold-400/20 text-xs text-stone-300">
                <div className="flex items-center gap-2">
                  <span className="font-cinzel text-gold-300 font-bold">
                    {viewMode === "dual" ? "Ground & First Floor Side-by-Side" : activePlan.name}
                  </span>
                  <span className="text-[10px] text-stone-400 hidden sm:inline">&bull; West Road Facing</span>
                </div>
                <span className="text-ivory-100 font-mono font-medium">Plot: {activePlan.sqft}</span>
              </div>
            </div>

            <p className="text-xs text-stone-400 mt-3 text-center italic flex items-center gap-1.5">
              <Search className="w-3.5 h-3.5 text-gold-400" />
              <span>Hover your cursor over the plan to magnify room dimensions in ultra-sharp clarity</span>
            </p>
          </div>

          {/* Right Column: Room Mapping & Interior Linkage */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-panel rounded-2xl p-6 border border-gold-400/20 relative overflow-hidden">
              <span className="text-[11px] font-sans tracking-widest uppercase text-gold-400 font-semibold">
                DIMENSIONS &amp; SPECIFICATIONS
              </span>
              <h3 className="font-cinzel text-xl font-bold text-ivory-50 mt-1 mb-4">
                {activePlan.title}
              </h3>

              <div className="space-y-2.5">
                {activePlan.highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-stone-200 font-light">
                    <span className="p-0.5 rounded-full bg-gold-400/20 text-gold-400 mt-0.5 shrink-0">
                      <Check className="w-3 h-3" />
                    </span>
                    <span className="font-medium text-ivory-100">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Room Breakdown Explorer */}
            <div className="glass-panel rounded-2xl p-6 border border-gold-400/20">
              <h4 className="font-cinzel text-xs uppercase tracking-wider text-gold-300 font-semibold mb-3 flex items-center justify-between">
                <span>Room Dimension Directory</span>
                <span className="text-[10px] text-stone-400 font-sans tracking-normal">Click to highlight</span>
              </h4>

              <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
                {activePlan.rooms.map((room, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedRoomIndex(idx)}
                    className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                      selectedRoomIndex === idx
                        ? "bg-forest-800 border-gold-400 shadow-gold-glow"
                        : "bg-forest-950/60 border-gold-400/10 hover:border-gold-400/30"
                    }`}
                  >
                    <div>
                      <p className="text-xs font-semibold text-ivory-100">{room.name}</p>
                      <p className="text-[11px] text-stone-300 font-mono font-medium">{room.description}</p>
                    </div>

                    {room.tourSceneId && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenTour(room.tourSceneId);
                        }}
                        className="px-3 py-1 rounded-lg bg-gold-400/20 hover:bg-gold-400 hover:text-forest-950 text-gold-300 text-[10px] uppercase font-bold tracking-wider transition-colors shrink-0 ml-2 shadow-sm"
                        title="View room in virtual tour"
                      >
                        Tour Room
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {onOpenInquiry && (
                <div className="pt-4 mt-3 border-t border-gold-400/20">
                  <button
                    onClick={() =>
                      onOpenInquiry(
                        `${activePlan.name} (${activePlan.sqft})`,
                        `Interested in exploring the ${activePlan.name} room dimensions and structural options.`
                      )
                    }
                    className="w-full py-3 rounded-xl bg-gold-400 hover:bg-gold-300 text-forest-950 font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-gold-glow flex items-center justify-center gap-2"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Schedule Walkthrough for {activePlan.name}</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* High-Resolution Zoom Lightbox Modal */}
      {zoomModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4">
          <div className="relative max-w-5xl w-full max-h-[94vh] flex flex-col items-center">
            {/* Modal Controls Bar */}
            <div className="w-full flex items-center justify-between mb-3 px-2">
              <div className="flex items-center gap-2">
                <span className="font-cinzel text-gold-300 text-sm font-bold uppercase">{activePlan.name}</span>
                <span className="text-xs text-stone-400 font-mono">| Ultra HD Blueprint View</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setZoomLevel((z) => Math.min(z + 0.3, 3))}
                  className="px-3 py-1.5 rounded-lg bg-forest-900 border border-gold-400/40 text-gold-300 hover:bg-forest-800 text-xs flex items-center gap-1 font-mono"
                  aria-label="Zoom in"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                  <span>+{Math.round(zoomLevel * 100)}%</span>
                </button>
                <button
                  onClick={() => setZoomLevel(1)}
                  className="px-3 py-1.5 rounded-lg bg-forest-900 border border-gold-400/40 text-stone-300 hover:text-gold-300 text-xs font-mono"
                  aria-label="Reset zoom"
                >
                  100% Reset
                </button>
                <button
                  onClick={() => {
                    setZoomModalOpen(false);
                    setZoomLevel(1);
                  }}
                  className="p-2 rounded-lg bg-forest-900 border border-gold-400/40 text-stone-300 hover:text-gold-300"
                  aria-label="Close modal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Zoomable Image Container */}
            <div className="overflow-auto max-h-[82vh] w-full rounded-2xl border border-gold-400/40 bg-forest-950 p-6 flex items-center justify-center">
              <img
                src={currentDisplayImage}
                alt={activePlan.name}
                style={{ transform: `scale(${zoomLevel})`, transformOrigin: "center center" }}
                className="max-h-[75vh] w-auto object-contain transition-transform duration-200 crisp-image"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
