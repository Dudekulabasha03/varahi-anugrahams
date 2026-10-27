"use client";

import React, { useState } from "react";
import { UniversalLightbox } from "./ui/UniversalLightbox";
import { SpotlightCard } from "./ui/SpotlightCard";
import { MessageCircle, Play, Film, Image as ImageIcon, ChevronDown, ChevronUp, Layers, Phone, Mail, MapPin, Calendar, ArrowUpRight, Sparkles } from "lucide-react";

export interface GalleryItem {
  id: string;
  type: "photo" | "video";
  src: string;
  poster?: string;
  alt: string;
  title: string;
  caption: string;
  aspect: string;
}

export const ReferenceStyleBottomSections: React.FC = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Gallery expansion and filter state
  const [showAll, setShowAll] = useState(false);
  const [activeFilter, setActiveFilter] = useState<"all" | "photos" | "videos">("all");

  // Form State
  const [form, setForm] = useState({ name: "", contact: "", msg: "" });
  const [errors, setErrors] = useState<{ [k: string]: string }>({});
  const [submitted, setSubmitted] = useState(false);

  // Complete Media Inventory (6 Photos + 7 Videos)
  const allGalleryItems: GalleryItem[] = [
    // 1. Signature Villa Facade
    {
      id: "facade",
      type: "photo",
      src: "/media/images/villa-facade.jpg",
      alt: "Signature villa facade at dusk",
      title: "Signature Villa Facade at Dusk",
      caption: "Curved textured sandstone facade with warm timber louvers and ambient lighting.",
      aspect: "4/5",
    },
    // 2. 30 FT Central Avenue
    {
      id: "avenue",
      type: "photo",
      src: "/media/images/residential-avenue.jpg",
      alt: "Aerial view of 30 FT avenue and villas",
      title: "30 FT Central Palm Avenue",
      caption: "Symmetrical palm-lined avenue framed by identical luxury villas.",
      aspect: "1/1",
    },
    // 3. Terrace Garden & Pergola
    {
      id: "terrace",
      type: "photo",
      src: "/media/images/terrace-garden.jpg",
      alt: "Terrace garden with pergola and fountain (23 ft. × 30 ft.)",
      title: "Terrace Garden & Pergola (23 × 30 ft)",
      caption: "Spacious private terrace garden featuring an elegant pergola lounge and stone waterfall fountain.",
      aspect: "4/3",
    },
    // 4. Hero Arrival Tour (Video)
    {
      id: "video-arrival",
      type: "video",
      src: "/media/videos/hero-arrival.mp4",
      poster: "/media/images/residential-avenue.jpg",
      alt: "Descent & Enclave arrival video",
      title: "Arrival & Enclave Tour (Video)",
      caption: "Cinematic drone descent into the private Varahi Anugrahams gated sanctuary.",
      aspect: "16/9",
    },
    // 5. 3D Architectural Floor Plans
    {
      id: "plans",
      type: "photo",
      src: "/media/images/floor-plans-complete.jpg",
      alt: "Ground and first floor 3D architectural plans",
      title: "3D Architectural Floor Plans",
      caption: "Ground Floor (~58' × 30') and First Floor (~58' × 25') layouts.",
      aspect: "4/3",
    },
    // 6. Architecture 360° Orbit (Video)
    {
      id: "video-orbit",
      type: "video",
      src: "/media/videos/architecture-orbit.mp4",
      poster: "/media/images/villa-facade.jpg",
      alt: "360° Architectural exterior orbit video",
      title: "Architecture 360° Orbit (Video)",
      caption: "Panoramic orbit showcasing organic stone curves and timber louvers.",
      aspect: "16/9",
    },
    // 7. Monumental Entrance Gate
    {
      id: "welcome-gate",
      type: "photo",
      src: "/media/images/welcome-arch-poster.jpg",
      alt: "Entrance gateway and welcome portal",
      title: "Monumental Entrance Gate",
      caption: "Grand arrival portal with Sri Alurukona Ranganathaswamy blessings.",
      aspect: "4/5",
    },
    // 8. Foundation Reticulation System
    {
      id: "anti-termite",
      type: "photo",
      src: "/media/images/anti-termite-system.jpg",
      alt: "Sub-surface anti-termite reticulation piping network",
      title: "Foundation Reticulation Grid",
      caption: "Sub-surface piping network ensuring long-term structural foundation integrity.",
      aspect: "4/3",
    },
    // 9. Aerial Community Drone Tour (Video)
    {
      id: "video-community",
      type: "video",
      src: "/media/videos/community-drone.mp4",
      poster: "/media/images/residential-avenue.jpg",
      alt: "Aerial community drone footage",
      title: "Aerial Community Drone Tour (Video)",
      caption: "4K aerial drone perspective highlighting the 30 ft avenue and villa enclave.",
      aspect: "16/9",
    },
    // 10. 30 FT Avenue Walkthrough (Video)
    {
      id: "video-street",
      type: "video",
      src: "/media/videos/street-walkthrough.mp4",
      poster: "/media/images/residential-avenue.jpg",
      alt: "Walkthrough of 30 FT avenue",
      title: "30 FT Avenue Walkthrough (Video)",
      caption: "Pedestrian perspective gliding down the royal palm-framed residential street.",
      aspect: "16/9",
    },
    // 11. Inside Villa Interiors Tour (Video)
    {
      id: "video-interiors",
      type: "video",
      src: "/media/videos/interior-fpv.mp4",
      poster: "/media/images/villa-facade.jpg",
      alt: "Inside villa interiors FPV tour",
      title: "Inside Villa Interiors Tour (Video)",
      caption: "Fluid FPV tour through the double-height living room and dining pavilion.",
      aspect: "16/9",
    },
    // 12. Sky Terrace & Pergola Living (Video)
    {
      id: "video-terrace",
      type: "video",
      src: "/media/videos/rooftop-space.mp4",
      poster: "/media/images/terrace-garden.jpg",
      alt: "Rooftop terrace and sky garden video",
      title: "Sky Terrace & Pergola Living (Video)",
      caption: "Evening ambiance on the 23 × 30 ft private terrace lounge under the open sky.",
      aspect: "16/9",
    },
    // 13. Concrete House Assembly Sequence (Video)
    {
      id: "video-assembly",
      type: "video",
      src: "/media/videos/concrete-house-assembly.mp4",
      poster: "/media/images/villa-facade.jpg",
      alt: "Concrete house assembling piece by piece",
      title: "Piece-by-Piece Assembly Sequence (Video)",
      caption: "Step-by-step architectural assembly of the concrete villa structure.",
      aspect: "16/9",
    },
  ];

  // Filter items by category
  const filteredItems = allGalleryItems.filter((item) => {
    if (activeFilter === "photos") return item.type === "photo";
    if (activeFilter === "videos") return item.type === "video";
    return true;
  });

  // Front items (first 6 items initially, or all when expanded)
  const visibleItems = showAll ? filteredItems : filteredItems.slice(0, 6);

  const handleOpenGallery = (itemIndexInFiltered: number) => {
    setLightboxIndex(itemIndexInFiltered);
    setLightboxOpen(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [k: string]: string } = {};

    if (!form.name.trim()) {
      newErrors.name = "Please enter your name.";
    }

    if (!form.contact.trim() || !/^(\S+@\S+\.\S+|[+\d][\d\s-]{6,})$/.test(form.contact.trim())) {
      newErrors.contact = "Enter a valid phone number or email.";
    }

    if (!form.msg.trim() || form.msg.trim().length < 4) {
      newErrors.msg = "Please add a short message.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setSubmitted(true);
      const targetUrl = `https://wa.me/919492854666?text=Hello%20Rangaiah%20garu,%20my%20name%20is%20${encodeURIComponent(
        form.name.trim()
      )}.%20Contact:%20${encodeURIComponent(form.contact.trim())}.%20Message:%20${encodeURIComponent(
        form.msg.trim()
      )}`;
      if (typeof window !== "undefined") {
        window.open(targetUrl, "_blank", "noopener,noreferrer");
      }
    }
  };

  const whatsappUrl = `https://wa.me/919492854666?text=Hello%20Rangaiah%20garu,%20my%20name%20is%20${encodeURIComponent(
    form.name.trim() || "Client"
  )}.%20Contact:%20${encodeURIComponent(form.contact.trim() || "")}.%20Message:%20${encodeURIComponent(
    form.msg.trim() || "I am interested in Varahi Anugrahams villas."
  )}`;

  return (
    <>
      {/* 1. Gallery Section */}
      {/* 1. Gallery Section */}
      <section id="gallery" className="px-4 sm:px-[5vw] py-[8vh] sm:py-[12vh] bg-transparent text-ink relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-10">
          <div>
            <div className="eyebrow flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-gold" />
              <span>Project Visuals</span>
            </div>
            <h2
              className="font-serif font-medium leading-[1.05]"
              style={{ fontSize: "clamp(28px, 5vw, 64px)" }}
            >
              Moments from the project.
            </h2>
          </div>

          {/* Category Filter Pills (21st.dev Glassy Style) */}
          <div className="flex items-center gap-2 self-start md:self-auto overflow-x-auto no-scrollbar max-w-full pb-1">
            <button
              type="button"
              onClick={() => setActiveFilter("all")}
              className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs font-mono tracking-wider uppercase transition-all duration-300 border shrink-0 ${
                activeFilter === "all"
                  ? "bg-gold text-stone-950 border-gold shadow-[0_0_20px_rgba(212,175,55,0.35)] font-semibold"
                  : "bg-white/[0.04] text-stone-300 border-white/[0.1] hover:border-gold/50 backdrop-blur-md hover:text-white"
              }`}
            >
              All ({allGalleryItems.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter("photos")}
              className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider uppercase transition-all duration-300 border flex items-center gap-1.5 ${
                activeFilter === "photos"
                  ? "bg-gold text-stone-950 border-gold shadow-[0_0_20px_rgba(212,175,55,0.35)] font-semibold"
                  : "bg-white/[0.04] text-stone-300 border-white/[0.1] hover:border-gold/50 backdrop-blur-md hover:text-white"
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>Photos (6)</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter("videos")}
              className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider uppercase transition-all duration-300 border flex items-center gap-1.5 ${
                activeFilter === "videos"
                  ? "bg-gold text-stone-950 border-gold shadow-[0_0_20px_rgba(212,175,55,0.35)] font-semibold"
                  : "bg-white/[0.04] text-stone-300 border-white/[0.1] hover:border-gold/50 backdrop-blur-md hover:text-white"
              }`}
            >
              <Film className="w-3.5 h-3.5" />
              <span>Videos (7)</span>
            </button>
          </div>
        </div>

        {/* Masonry Columns matching reference .gal with Glassy Cards */}
        <div
          className="gap-[20px] transition-all duration-500"
          style={{
            columns: "3 260px",
          }}
        >
          {visibleItems.map((item, idx) => {
            const actualIndexInFiltered = filteredItems.findIndex((fi) => fi.id === item.id);
            return (
              <div
                key={item.id}
                tabIndex={0}
                role="button"
                aria-label={`Open ${item.title}`}
                onClick={() => handleOpenGallery(actualIndexInFiltered)}
                className="relative rounded-[18px] overflow-hidden cursor-pointer bg-white/[0.03] backdrop-blur-xl group mb-[20px] break-inside-avoid border border-white/[0.1] hover:border-gold/60 shadow-[0_12px_40px_rgba(0,0,0,0.35)] transition-all duration-500 hover:shadow-[0_16px_50px_rgba(212,175,55,0.15)]"
                style={{ aspectRatio: item.aspect }}
              >
                {/* Hairline top reflection */}
                <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none z-20" />

                {item.type === "video" ? (
                  <>
                    <video
                      src={item.src}
                      poster={item.poster}
                      muted
                      loop
                      playsInline
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      onMouseEnter={(e) => {
                        try {
                          e.currentTarget.play();
                        } catch {}
                      }}
                      onMouseLeave={(e) => {
                        try {
                          e.currentTarget.pause();
                        } catch {}
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/40 pointer-events-none" />

                    {/* Top Video Badge */}
                    <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 text-white shadow-lg">
                      <Film className="w-3 h-3 text-gold" />
                      <span className="text-[10px] font-mono tracking-wider uppercase text-white/95">
                        Video
                      </span>
                    </div>

                    {/* Center Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-12 h-12 rounded-full bg-gold/90 text-stone-950 flex items-center justify-center shadow-2xl transform transition-transform duration-300 group-hover:scale-115">
                        <Play className="w-5 h-5 ml-0.5 fill-current" />
                      </div>
                    </div>

                    {/* Bottom Title Label */}
                    <div className="absolute bottom-3 left-3 right-3 z-10 text-white pointer-events-none">
                      <p className="text-xs font-serif truncate text-white/90 drop-shadow">
                        {item.title}
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <img
                      src={item.src}
                      alt={item.alt}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    <div className="absolute bottom-3 left-3 right-3 z-10 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      <p className="text-xs font-serif truncate text-white/95 drop-shadow">
                        {item.title}
                      </p>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>

        {/* View More / Hide Toggle Button */}
        {filteredItems.length > 6 && (
          <div className="mt-10 text-center">
            <button
              type="button"
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-2.5 border border-white/[0.18] hover:border-gold bg-white/[0.04] hover:bg-gold hover:text-stone-950 backdrop-blur-xl transition-all duration-300 px-8 py-3.5 text-xs font-mono tracking-widest uppercase rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.3)] text-stone-200"
            >
              {showAll ? (
                <>
                  <span>Hide / View Less</span>
                  <ChevronUp className="w-4 h-4" />
                </>
              ) : (
                <>
                  <span>View More in Gallery ({filteredItems.length - 6} more)</span>
                  <ChevronDown className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        )}
      </section>

      {/* 2. FAQ Section */}
      <section id="faq" className="px-4 sm:px-[5vw] py-[8vh] sm:py-[12vh] bg-transparent text-ink pt-0 relative z-10">
        <div className="eyebrow flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-gold" />
          <span>Need Help</span>
        </div>
        <h2
          className="font-serif font-medium leading-[1.05] mb-6 sm:mb-8"
          style={{ fontSize: "clamp(28px, 5vw, 64px)" }}
        >
          Frequently asked questions.
        </h2>

        <div className="max-w-[800px] space-y-3 sm:space-y-4">
          <details className="group cursor-pointer rounded-[16px] sm:rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] hover:border-white/[0.18] p-4 sm:p-6 transition-all duration-300 shadow-[0_8px_32px_0_rgba(0,0,0,0.25)]">
            <summary className="font-serif font-medium text-[18px] sm:text-[22px] md:text-[24px] text-stone-100 list-none flex justify-between items-center select-none cursor-pointer">
              <span>Where is the project located?</span>
              <span className="text-gold text-[20px] sm:text-[24px] font-mono group-open:hidden transition-transform duration-300">+</span>
              <span className="text-gold text-[20px] sm:text-[24px] font-mono hidden group-open:inline transition-transform duration-300">–</span>
            </summary>
            <div className="mt-3 sm:mt-[14px] text-stone-300 text-sm sm:text-[16px] font-light leading-relaxed border-t border-white/[0.06] pt-3 sm:pt-4 space-y-3">
              <p>
                Nandalapadu Road Near Ananthapur Bridge Varahi Anugrahams, Tadipatri, Andhra Pradesh.
              </p>
              <a
                href="https://www.google.com/maps?q=14.909390,77.984804"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/15 text-gold border border-gold/40 hover:bg-gold hover:text-black font-sans text-xs sm:text-sm tracking-wider uppercase font-semibold transition-all duration-300 shadow-[0_2px_12px_rgba(205,162,96,0.15)] group/map"
              >
                <span>📍 View on Google Maps (14.909390, 77.984804)</span>
                <span className="text-xs transition-transform duration-200 group-hover/map:translate-x-0.5 group-hover/map:-translate-y-0.5">↗</span>
              </a>
            </div>
          </details>

          <details className="group cursor-pointer rounded-[16px] sm:rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] hover:border-white/[0.18] p-4 sm:p-6 transition-all duration-300 shadow-[0_8px_32px_0_rgba(0,0,0,0.25)]">
            <summary className="font-serif font-medium text-[18px] sm:text-[22px] md:text-[24px] text-stone-100 list-none flex justify-between items-center select-none cursor-pointer">
              <span>What are the pricing and payment terms?</span>
              <span className="text-gold text-[20px] sm:text-[24px] font-mono group-open:hidden transition-transform duration-300">+</span>
              <span className="text-gold text-[20px] sm:text-[24px] font-mono hidden group-open:inline transition-transform duration-300">–</span>
            </summary>
            <p className="mt-3 sm:mt-[14px] text-stone-300 text-sm sm:text-[16px] font-light leading-relaxed border-t border-white/[0.06] pt-3 sm:pt-4">
              Please enquire for current unit pricing, milestone-linked installment plans, and villa availability.
            </p>
          </details>

          <details className="group cursor-pointer rounded-[16px] sm:rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] hover:border-white/[0.18] p-4 sm:p-6 transition-all duration-300 shadow-[0_8px_32px_0_rgba(0,0,0,0.25)]">
            <summary className="font-serif font-medium text-[18px] sm:text-[22px] md:text-[24px] text-stone-100 list-none flex justify-between items-center select-none cursor-pointer">
              <span>When is the possession ?</span>
              <span className="text-gold text-[20px] sm:text-[24px] font-mono group-open:hidden transition-transform duration-300">+</span>
              <span className="text-gold text-[20px] sm:text-[24px] font-mono hidden group-open:inline transition-transform duration-300">–</span>
            </summary>
            <p className="mt-3 sm:mt-[14px] text-stone-300 text-sm sm:text-[16px] font-light leading-relaxed border-t border-white/[0.06] pt-3 sm:pt-4">
              Within 10 to 12 months from the date of registration.
            </p>
          </details>


        </div>
      </section>

      {/* 3. Enquire Section */}
      <section id="enquire" className="px-4 sm:px-[5vw] py-[8vh] sm:py-[12vh] bg-transparent text-ink relative z-10">
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-8 sm:mb-10">
            <div className="eyebrow flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-gold" />
              <span>Private Consultation</span>
            </div>
            <h2
              className="font-serif font-medium leading-[1.05]"
              style={{ fontSize: "clamp(28px, 5vw, 64px)" }}
            >
              Schedule a site visit.
            </h2>
            <p className="text-stone-300 text-sm sm:text-[16px] font-light mt-3 max-w-[540px]">
              Connect with our promoter office for a private walkthrough, villa specifications, and floor plan consultations.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
            {/* Form Column (7 cols) */}
            <div className="lg:col-span-7">
              <SpotlightCard
                className="p-5 sm:p-8 md:p-10 rounded-[20px] sm:rounded-[24px] bg-white/[0.03] backdrop-blur-2xl border border-white/[0.1] shadow-[0_16px_50px_rgba(0,0,0,0.4)]"
                spotlightColor="rgba(212, 175, 55, 0.12)"
              >
                {!submitted ? (
                  <form onSubmit={handleFormSubmit} className="space-y-5" noValidate>
                    <div>
                      <label className="text-[11px] font-mono tracking-[0.16em] uppercase text-stone-400 block mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        autoComplete="name"
                        placeholder="e.g. Rajesh Kumar"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full px-4 py-3.5 rounded-xl bg-white/[0.04] border border-white/[0.12] focus:border-gold focus:ring-1 focus:ring-gold text-white placeholder-stone-500 backdrop-blur-md outline-none transition-all text-sm"
                      />
                      {errors.name && (
                        <span className="text-red-400 text-xs mt-1 block">{errors.name}</span>
                      )}
                    </div>

                    <div>
                      <label className="text-[11px] font-mono tracking-[0.16em] uppercase text-stone-400 block mb-2">
                        Phone or Email
                      </label>
                      <input
                        type="text"
                        name="contact"
                        autoComplete="email"
                        placeholder="+91 98765 43210 or email@domain.com"
                        value={form.contact}
                        onChange={(e) => setForm({ ...form, contact: e.target.value })}
                        className="w-full px-4 py-3.5 rounded-xl bg-white/[0.04] border border-white/[0.12] focus:border-gold focus:ring-1 focus:ring-gold text-white placeholder-stone-500 backdrop-blur-md outline-none transition-all text-sm"
                      />
                      {errors.contact && (
                        <span className="text-red-400 text-xs mt-1 block">{errors.contact}</span>
                      )}
                    </div>

                    <div>
                      <label className="text-[11px] font-mono tracking-[0.16em] uppercase text-stone-400 block mb-2">
                        Message or Preferred Date
                      </label>
                      <textarea
                        name="msg"
                        rows={4}
                        placeholder="I would like to schedule a private walkthrough and receive detailed pricing..."
                        value={form.msg}
                        onChange={(e) => setForm({ ...form, msg: e.target.value })}
                        className="w-full px-4 py-3.5 rounded-xl bg-white/[0.04] border border-white/[0.12] focus:border-gold focus:ring-1 focus:ring-gold text-white placeholder-stone-500 backdrop-blur-md outline-none transition-all text-sm resize-none"
                      />
                      {errors.msg && (
                        <span className="text-red-400 text-xs mt-1 block">{errors.msg}</span>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      <button
                        type="submit"
                        className="px-8 py-3.5 rounded-full bg-gold hover:bg-[#e5c158] text-stone-950 font-semibold text-xs font-mono tracking-widest uppercase transition-all duration-300 shadow-[0_0_24px_rgba(212,175,55,0.35)] cursor-pointer"
                      >
                        Request a Visit
                      </button>
                      <a
                        href="https://wa.me/919492854666?text=Hello%20Rangaiah%20garu,%20I%20am%20interested%20in%20Varahi%20Anugrahams%20villas."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3.5 rounded-full bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 text-emerald-300 text-xs font-mono tracking-wider uppercase transition-all flex items-center gap-2 cursor-pointer"
                      >
                        <MessageCircle className="w-4 h-4 text-emerald-400" />
                        <span>Chat on WhatsApp</span>
                      </a>
                    </div>
                  </form>
                ) : (
                  <div className="p-6 sm:p-8 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 space-y-5 animate-in fade-in duration-300">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                        <MessageCircle className="w-5 h-5 animate-pulse" />
                      </div>
                      <div>
                        <h4 className="font-serif text-xl sm:text-2xl font-medium text-white">
                          Thank you, {form.name}.
                        </h4>
                        <p className="text-xs sm:text-sm text-emerald-400/90 font-mono tracking-wide mt-0.5">
                          Opening WhatsApp...
                        </p>
                      </div>
                    </div>

                    <p className="text-sm text-stone-300 leading-relaxed">
                      If WhatsApp didn&apos;t open automatically, tap below to chat directly with Promoter{" "}
                      <strong className="text-white">Rangaiah Kotra</strong> or connect via direct phone call:
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3 pt-1">
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs font-mono tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] group cursor-pointer"
                      >
                        <MessageCircle className="w-4 h-4 text-white" />
                        <span>Send on WhatsApp (+91 9492854666)</span>
                      </a>
                      <a
                        href="tel:+919492854666"
                        className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-gold hover:bg-[#e5c158] text-stone-950 font-semibold text-xs font-mono tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(212,175,55,0.25)] cursor-pointer"
                      >
                        <Phone className="w-4 h-4 text-stone-950" />
                        <span>Call Promoter Now</span>
                      </a>
                    </div>
                  </div>
                )}
              </SpotlightCard>
            </div>

            {/* Direct Contact & Promoter Info Cards (5 cols) */}
            <div className="lg:col-span-5 space-y-5">
              <SpotlightCard
                className="p-6 rounded-[20px] bg-white/[0.03] backdrop-blur-xl border border-white/[0.1] shadow-xl"
                spotlightColor="rgba(212, 175, 55, 0.1)"
              >
                <div className="text-[11px] font-mono tracking-[0.16em] uppercase text-gold mb-2">
                  Promoter Desk
                </div>
                <h3 className="font-serif text-2xl text-white font-medium mb-1">
                  Rangaiah Kotra
                </h3>
                <p className="text-xs text-stone-400 mb-5">
                  Sri Murali Cotton Press & Varahi Enclaves
                </p>

                <div className="space-y-3 text-sm text-stone-300">
                  <a
                    href="tel:+919492854666"
                    className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-gold/40 text-stone-200 transition-all group"
                  >
                    <span className="flex items-center gap-2.5">
                      <Phone className="w-4 h-4 text-gold" />
                      <span>+91 94928 54666</span>
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-stone-500 group-hover:text-gold transition-colors" />
                  </a>

                  <a
                    href="https://wa.me/919492854666"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-emerald-500/40 text-stone-200 transition-all group"
                  >
                    <span className="flex items-center gap-2.5">
                      <MessageCircle className="w-4 h-4 text-emerald-400" />
                      <span>WhatsApp Direct Line</span>
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-stone-500 group-hover:text-emerald-400 transition-colors" />
                  </a>
                </div>
              </SpotlightCard>

              <SpotlightCard
                className="p-6 rounded-[20px] bg-white/[0.03] backdrop-blur-xl border border-white/[0.1] shadow-xl"
                spotlightColor="rgba(212, 175, 55, 0.1)"
              >
                <div className="text-[11px] font-mono tracking-[0.16em] uppercase text-gold mb-2">
                  Site Location
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                  <p className="text-sm text-stone-300 leading-relaxed">
                    R.F. Road, Tadipatri — 515411, Anantapur District, Andhra Pradesh.
                  </p>
                </div>
              </SpotlightCard>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Luxury Footer */}
      <footer className="relative z-10 bg-black/60 backdrop-blur-2xl border-t border-white/[0.08] text-stone-400 px-4 sm:px-[5vw] py-8 sm:py-[8vh] flex flex-col sm:flex-row justify-between gap-6 text-[13px]">
        <div>
          <div className="serif text-lg sm:text-[22px] tracking-[0.2em] text-white uppercase font-serif">
            VARAHI ANUGRAHAMS
          </div>
          <p className="mt-2 text-stone-400 text-xs sm:text-[13px]">
            Promoter: Rangaiah Kotra (Sri Murali Cotton Press) · R.F. Road, Tadipatri — 515411
          </p>
          <p className="mt-2 max-w-[420px] text-[11px] sm:text-[12px] text-stone-500">
            Images and videos are artist’s impressions; final development may vary based on approved plans.
          </p>
        </div>
        <div className="text-left sm:text-right text-stone-500 text-xs sm:text-[13px] self-start sm:self-end">
          © 2026 Varahi Anugrahams. All rights reserved.
        </div>
      </footer>

      {/* Universal Lightbox Viewer */}
      <UniversalLightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        items={filteredItems.map((item) => ({
          src: item.src,
          alt: item.alt,
          title: item.title,
          caption: item.caption,
        }))}
        initialIndex={lightboxIndex}
      />
    </>
  );
};
