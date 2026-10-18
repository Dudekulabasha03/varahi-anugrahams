# Implementation Plan: Varahi Anugrahams Experience

**Project:** Varahi Anugrahams — Cinematic Real Estate Website  
**Stack:** Next.js (App Router), React 18, TypeScript, Tailwind CSS, GSAP / ScrollTrigger, Lucide Icons  
**Target Workspace:** `/Users/mahaboobbasha/.gemini/antigravity/scratch/varahi-anugrahams`  
**Date:** October 19, 2026  

---

## 1. Architectural Strategy

We will integrate the best aspects of the **Webild Luxury Real Estate reference** and **Claude Code's hover prototype** into a modern, production-grade Next.js App Router application:

1. **Native MP4 Streaming (Zero Base64 bloat):** Instead of encoding 10+ MB of video in HTML, all 8 unique video clips will be organized into `/public/media/videos/` with immediate streaming headers, byte-range request support, and instant poster previews.
2. **Interactive Hover Cards:** Build a dedicated, ultra-responsive `<VideoHoverCard>` component with desktop hover play/pause, mobile tap-to-loop, and focus handling.
3. **Scroll-Scrubbed Architectural Assembly:** Implement a GSAP ScrollTrigger / requestAnimationFrame pinned container (`300vh` scroll length) that scrubs `Building_assembling_like_puzzle_1080p_20261019003049.mp4` smoothly across three storytelling beats.
4. **Accessible Fullscreen Lightbox & Floor Plan Inspector:** Support click-to-zoom, pan inspection, keyboard navigation (`Esc`, `ArrowLeft`, `ArrowRight`), and touch swipe.
5. **Verified Project Specifications & Data Store:** Centralize all specs in a clean TypeScript config (`src/config/projectData.ts`) so copy, numbers, and dimensions remain 100% editable without touching markup.

---

## 2. Directory & Asset Layout

```
varahi-anugrahams/
├── docs/
│   ├── REFERENCE_AUDIT.md
│   ├── ASSET_MAP.md
│   ├── CONTENT_NEEDED.md
│   └── IMPLEMENTATION_PLAN.md
├── public/
│   ├── media/
│   │   ├── videos/
│   │   │   ├── hero-arrival.mp4            # V9 (Zooming into residential complex)
│   │   │   ├── assembly-puzzle.mp4         # V1 (Building assembling like puzzle)
│   │   │   ├── architecture-orbit.mp4      # V5 (Camera orbiting concrete villa)
│   │   │   ├── community-drone.mp4         # V6 (Drone viewing modern villa complex)
│   │   │   ├── street-walkthrough.mp4      # V3 (Camera moving through residential street)
│   │   │   ├── rooftop-space.mp4           # V8 (Zooming from space to rooftop)
│   │   │   └── interior-fpv.mp4            # V7 (FPV drone touring luxury house)
│   │   └── images/
│   │       ├── welcome-arch-poster.jpg     # P1 (Entrance arch poster)
│   │       ├── floor-plans-complete.jpg    # P2 (3D Isometric floor plans)
│   │       ├── anti-termite-system.jpg     # P3 (Sub-surface reticulation grid)
│   │       ├── villa-facade.jpg            # P4 (Signature villa dusk facade)
│   │       └── residential-avenue.jpg      # P5 (30 FT palm-lined avenue)
├── components/
│   ├── Navbar.tsx                          # Minimalist luxury navigation & mobile drawer
│   ├── Hero.tsx                            # Full-screen arrival video & editorial headline
│   ├── EditorialIntro.tsx                  # Word-by-word reveal typography
│   ├── AssemblyScrubSection.tsx            # Pinned 3-beat scroll-scrubbed assembly video
│   ├── VideoHoverExplorer.tsx              # 5-card instant hover-to-play grid
│   ├── ArchitectureSection.tsx             # Villa facade & curved sandstone details
│   ├── CommunitySection.tsx                # Grand arch & 30 FT avenue showcase
│   ├── FloorPlansSection.tsx               # Ground & 1st floor interactive plan inspector
│   ├── ConstructionSection.tsx             # Anti-termite reticulation engineering
│   ├── SpecsSection.tsx                    # Clean dual-column architectural factsheet
│   ├── GallerySection.tsx                  # Masonry photo gallery with full lightbox
│   ├── FaqSection.tsx                      # Semantic collapsible accordion
│   ├── ContactSection.tsx                  # Schedule visit booking form & validation
│   ├── Footer.tsx                          # Disclaimers, copyright & brand mark
│   └── ui/
│       ├── Lightbox.tsx                    # Shared high-res modal viewer with zoom
│       └── VideoHoverCard.tsx              # High-performance zero-delay video card
└── app/
    ├── layout.tsx                          # Fonts (Cormorant Garamond + Inter), SEO metadata
    ├── page.tsx                            # Orchestrates sections in strict canonical order
    └── globals.css                         # Warm ivory / charcoal CSS variables & transitions
```

---

## 3. Step-by-Step Rollout Stages

### Stage 1: Asset Preparation & Organization
- Copy the 8 verified unique MP4 videos from `/Users/mahaboobbasha/Documents/varahi homes` into `public/media/videos/`.
- Copy the 5 user-uploaded photos into `public/media/images/`.
- Verify all file permissions and relative URL paths.

### Stage 2: Centralized Project Config
- Build `config/siteData.ts` containing all verified specifications, navigation links, gallery items, FAQ data, and editable copy.

### Stage 3: Core Interactive Component Construction
- **`<VideoHoverCard />`**: Handles `onMouseEnter`, `onMouseLeave`, `onTouchStart`, focus, silent playback promise, and poster fallback.
- **`<AssemblyScrubSection />`**: Pinned viewport with time-scrubbed video, narrative beat transitions, and progress bar.
- **`<FloorPlansSection />`**: Interactive plan inspector with level tabs, dimensions breakdown, and zoom lightbox.
- **`<Lightbox />`**: Universal full-screen dialog with pan/zoom.

### Stage 4: Assembly & Testing
- Integrate into `app/page.tsx` adhering strictly to Section 1 through Section 12 sequence.
- Start local dev server (`npm run dev`) and test forward/reverse scroll, hover triggers, mobile layout, and console health.
- Run production build (`npm run build`) to ensure 0 lint or type errors.
