"use client";

import React, { useState } from "react";
import { UniversalLightbox } from "./ui/UniversalLightbox";
import { MessageCircle, Play, Film, Image as ImageIcon, ChevronDown, ChevronUp, Layers } from "lucide-react";

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
    }
  };

  const whatsappUrl = `https://wa.me/919492854666?text=Hello%20Rangaiah%20garu,%20my%20name%20is%20${encodeURIComponent(
    form.name || "Client"
  )}.%20Contact:%20${encodeURIComponent(form.contact || "")}.%20Message:%20${encodeURIComponent(
    form.msg || "I am interested in Varahi Anugrahams villas."
  )}`;

  return (
    <>
      {/* 1. Gallery Section */}
      <section id="gallery" className="px-[5vw] py-[12vh] bg-bg text-ink">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="eyebrow">Gallery</div>
            <h2
              className="font-serif font-medium leading-[1.05]"
              style={{ fontSize: "clamp(34px, 5vw, 64px)" }}
            >
              Moments from the project.
            </h2>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 self-start md:self-auto flex-wrap">
            <button
              type="button"
              onClick={() => setActiveFilter("all")}
              className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider uppercase transition-all border ${
                activeFilter === "all"
                  ? "bg-gold text-white border-gold shadow-sm"
                  : "bg-card text-ink border-line hover:border-gold"
              }`}
            >
              All ({allGalleryItems.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter("photos")}
              className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider uppercase transition-all border flex items-center gap-1.5 ${
                activeFilter === "photos"
                  ? "bg-gold text-white border-gold shadow-sm"
                  : "bg-card text-ink border-line hover:border-gold"
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>Photos (6)</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter("videos")}
              className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider uppercase transition-all border flex items-center gap-1.5 ${
                activeFilter === "videos"
                  ? "bg-gold text-white border-gold shadow-sm"
                  : "bg-card text-ink border-line hover:border-gold"
              }`}
            >
              <Film className="w-3.5 h-3.5" />
              <span>Videos (7)</span>
            </button>
          </div>
        </div>

        {/* Masonry Columns matching reference .gal */}
        <div
          className="gap-[16px] transition-all duration-500"
          style={{
            columns: "3 240px",
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
                className="relative rounded-[14px] overflow-hidden cursor-pointer bg-card group mb-[16px] break-inside-avoid border border-line/40 shadow-sm"
                style={{ aspectRatio: item.aspect }}
              >
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
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/35 pointer-events-none" />

                    {/* Top Video Badge */}
                    <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20 text-white">
                      <Film className="w-3 h-3 text-gold" />
                      <span className="text-[10px] font-mono tracking-wider uppercase text-white/90">
                        Video
                      </span>
                    </div>

                    {/* Center Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-12 h-12 rounded-full bg-gold/90 text-black flex items-center justify-center shadow-xl transform transition-transform duration-300 group-hover:scale-110">
                        <Play className="w-5 h-5 ml-0.5 fill-black" />
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
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    <div className="absolute bottom-3 left-3 right-3 z-10 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      <p className="text-xs font-serif truncate text-white/90 drop-shadow">
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
              className="btn inline-flex items-center gap-2 border-ink/40 hover:border-gold hover:bg-gold hover:text-white transition-all px-8 py-3.5 text-xs font-mono tracking-widest uppercase rounded-full shadow-sm bg-bg"
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
      <section id="faq" className="px-[5vw] py-[12vh] bg-bg text-ink pt-0">
        <div className="eyebrow">FAQ</div>
        <h2
          className="font-serif font-medium leading-[1.05] mb-[24px]"
          style={{ fontSize: "clamp(34px, 5vw, 64px)" }}
        >
          Questions.
        </h2>

        <div className="max-w-[760px] divide-y divide-line border-t border-b border-line">
          <details className="py-[20px] group cursor-pointer">
            <summary className="font-serif font-medium text-[24px] text-ink list-none flex justify-between items-center select-none">
              <span>Where is the project located?</span>
              <span className="text-gold text-[24px] font-mono group-open:hidden">+</span>
              <span className="text-gold text-[24px] font-mono hidden group-open:inline">–</span>
            </summary>
            <p className="mt-[10px] text-mut text-[16px] font-light leading-relaxed">
              Varahi Anugrahams is situated along R.F. Road, Tadipatri — 515411, Andhra Pradesh.
            </p>
          </details>

          <details className="py-[20px] group cursor-pointer">
            <summary className="font-serif font-medium text-[24px] text-ink list-none flex justify-between items-center select-none">
              <span>What are the pricing and payment terms?</span>
              <span className="text-gold text-[24px] font-mono group-open:hidden">+</span>
              <span className="text-gold text-[24px] font-mono hidden group-open:inline">–</span>
            </summary>
            <p className="mt-[10px] text-mut text-[16px] font-light leading-relaxed">
              Please enquire for current pricing, installment milestones, and availability.
            </p>
          </details>

          <details className="py-[20px] group cursor-pointer">
            <summary className="font-serif font-medium text-[24px] text-ink list-none flex justify-between items-center select-none">
              <span>When is possession?</span>
              <span className="text-gold text-[24px] font-mono group-open:hidden">+</span>
              <span className="text-gold text-[24px] font-mono hidden group-open:inline">–</span>
            </summary>
            <p className="mt-[10px] text-mut text-[16px] font-light leading-relaxed">
              Possession timelines and stage approvals will be shared upon private consultation.
            </p>
          </details>

          <details className="py-[20px] group cursor-pointer">
            <summary className="font-serif font-medium text-[24px] text-ink list-none flex justify-between items-center select-none">
              <span>Can I schedule a site visit?</span>
              <span className="text-gold text-[24px] font-mono group-open:hidden">+</span>
              <span className="text-gold text-[24px] font-mono hidden group-open:inline">–</span>
            </summary>
            <p className="mt-[10px] text-mut text-[16px] font-light leading-relaxed">
              Yes — use the enquiry form below or connect with our promoter office on WhatsApp.
            </p>
          </details>
        </div>
      </section>

      {/* 3. Enquire Section */}
      <section id="enquire" className="px-[5vw] py-[12vh] bg-card text-ink">
        <div className="eyebrow">Enquire</div>
        <h2
          className="font-serif font-medium leading-[1.05]"
          style={{ fontSize: "clamp(34px, 5vw, 64px)" }}
        >
          Schedule a site visit.
        </h2>

        {!submitted ? (
          <form onSubmit={handleFormSubmit} className="grid gap-[16px] max-w-[560px] mt-[30px]" noValidate>
            <label className="text-[12px] tracking-[0.12em] uppercase text-mut font-sans grid gap-[6px]">
              Name
              <input
                type="text"
                name="name"
                autoComplete="name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="font-inherit px-[14px] py-[13px] border border-line rounded-[8px] bg-bg text-ink"
              />
              <span className="text-[#c0533a] text-[13px] min-h-[1em]">{errors.name}</span>
            </label>

            <label className="text-[12px] tracking-[0.12em] uppercase text-mut font-sans grid gap-[6px]">
              Phone or email
              <input
                type="text"
                name="contact"
                autoComplete="email"
                value={form.contact}
                onChange={(e) => setForm({ ...form, contact: e.target.value })}
                className="font-inherit px-[14px] py-[13px] border border-line rounded-[8px] bg-bg text-ink"
              />
              <span className="text-[#c0533a] text-[13px] min-h-[1em]">{errors.contact}</span>
            </label>

            <label className="text-[12px] tracking-[0.12em] uppercase text-mut font-sans grid gap-[6px]">
              Message
              <textarea
                name="msg"
                rows={4}
                value={form.msg}
                onChange={(e) => setForm({ ...form, msg: e.target.value })}
                className="font-inherit px-[14px] py-[13px] border border-line rounded-[8px] bg-bg text-ink resize-none"
              />
              <span className="text-[#c0533a] text-[13px] min-h-[1em]">{errors.msg}</span>
            </label>

            <div className="flex flex-wrap items-center gap-3">
              <button className="btn fill" type="submit">
                Request a Visit
              </button>
              <a
                href="https://wa.me/919492854666?text=Hello%20Rangaiah%20garu,%20I%20am%20interested%20in%20Varahi%20Anugrahams%20villas."
                target="_blank"
                rel="noopener noreferrer"
                className="btn inline-flex items-center gap-2 text-emerald-800 border-emerald-800 hover:bg-emerald-800 hover:text-white"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </form>
        ) : (
          <div className="max-w-[560px] mt-[30px] p-[20px] rounded-[10px] bg-[#2f6b4033] border border-[#2f6b4055] space-y-4">
            <h4 className="font-serif text-2xl font-medium text-ink">Thank you, {form.name}.</h4>
            <p className="text-sm text-mut leading-relaxed">
              Your inquiry has been formatted. You can connect directly with Promoter{" "}
              <strong>Rangaiah Kotra</strong> right now on WhatsApp:
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn fill inline-flex items-center gap-2 bg-emerald-700 border-emerald-700 text-white"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Send via WhatsApp (+91 9492854666)</span>
            </a>
          </div>
        )}
      </section>

      {/* 4. Footer */}
      <footer className="bg-dark text-[#cfc6b2] px-[5vw] py-[8vh] flex justify-between flex-wrap gap-[24px] text-[14px]">
        <div>
          <div className="serif text-[22px] tracking-[0.2em] text-white uppercase">
            VARAHI ANUGRAHAMS
          </div>
          <p className="mt-2 text-[#a89f8e] text-[13px]">
            Promoter: Rangaiah Kotra (Sri Murali Cotton Press) · R.F. Road, Tadipatri — 515411
          </p>
          <p className="mt-[10px] max-w-[420px] text-[12px] opacity-70">
            Images and videos are artist’s impressions; the final development may vary.
          </p>
        </div>
        <div className="text-right text-[#a89f8e] text-[13px] self-end">
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
