# Reference Audit & Interaction Architecture

**Project:** Varahi Anugrahams — Luxury Real Estate Experience  
**Reference Target:** [Webild Luxury Real Estate](https://www.webild.io/#luxury-real-estate)  
**Claude Code Prototype Reference:** `Varahi Anugrahams — A Beautiful Way to Come Home.html`  
**Date:** October 19, 2026  
**Auditor:** Senior Creative Director & Front-End Architect

---

## 1. Executive Summary & Aesthetic Analysis

The reference website architecture combines high-end editorial aesthetics with dynamic, scroll-driven and hover-driven motion mechanics. Rather than a standard transactional real-estate portal, the experience evokes a bespoke architectural monograph:

- **Atmosphere:** Serene, cinematic, understated luxury. Warm earth tones, dark nocturnal contrasts, and generous breathing room.
- **Motion Principle:** Restrained, intentional interactions. Heavy media remains stationary or subtly responsive until direct user interaction (scrubbing or hovering).
- **Core Visual Contrast:** Deep charcoal backgrounds for nocturnal/construction reveal sequences juxtaposed against warm ivory/limestone cards and editorial spreads.

---

## 2. Design System & Tokens

### Color Palette
- **Ivory Background (`--bg-primary`):** `#F6F1E7` (soft natural parchment/limestone)
- **Charcoal/Obsidian (`--bg-dark`):** `#14120E` / `#16140F` (deep warm graphite)
- **Primary Ink (`--text-primary`):** `#26231F` (rich warm black, never pure `#000`)
- **Muted Sand (`--text-muted`):** `#6E675C` / `#A89F8E`
- **Antique Gold (`--accent-gold`):** `#A98B4F` / `#C9B98F` (subtle burnished bronze/gold)
- **Card Surface (`--bg-card`):** `#EBE4D4` (light mode) / `#1F1C16` (dark mode)
- **Divider Lines (`--border-subtle`):** `#D9D0BC` / `#34301F`

### Typography Hierarchy
- **Primary Display Headings:** *Cormorant Garamond* / *Cinzel* (weights 400, 500, 600). Tight line height (`1.05 - 1.15`), high elegance, large scale (`clamp(34px, 6vw, 84px)`).
- **Body & Technical Specs:** *Inter* / *Plus Jakarta Sans* (weights 400, 500). Tabular figures for dimensions, wide letter-spacing (`0.12em - 0.25em`) for uppercase eyebrow tags.
- **Wordmark:** Cormorant Garamond tracked out to `0.28em` with pristine kerning.

---

## 3. Section-by-Section Anatomy & Animation Breakdown

### Section 1: Cinematic Hero
- **Visuals:** Full-viewport (`100vh`) high-definition aerial footage zooming towards the residential development.
- **Transitions:** Bottom-aligned gradient scrim (`linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)`).
- **Typography:** Staggered headline entrance *"A Beautiful Way to Come Home."* with gold pill eyebrow *"VILLA LIVING"*.
- **Controls:** Direct action buttons (*"Explore the Project"* scroll anchor, *"Schedule a Visit"* modal trigger) and vertical pulsing scroll indicator.

### Section 2: Editorial Introduction & Word Reveal
- **Layout:** Generous whitespace, asymmetric editorial composition.
- **Animation:** Sequential word-by-word opacity and upward translation reveal (`translateY(0.6em)` with staggered transition delays `i * 70ms`) triggered via `IntersectionObserver`.
- **Content:** Establishes the philosophy of calm, generous space and indoor-outdoor harmony.

### Section 3: Signature Architectural Reveal (Pinned Scroll-Scrubbed Scene)
- **Container:** `300vh` scroll track with `position: sticky; top: 0; height: 100vh`.
- **Media:** Building assembly sequence (`Building_assembling_like_puzzle_1080p_20261019003049.mp4`).
- **Synchronization:**
  - `0% - 33%`: Beat 01 *"01 · The Idea — It begins with a plot of land."*
  - `33% - 66%`: Beat 02 *"02 · The Assembly — Form, rising piece by piece."*
  - `66% - 100%`: Beat 03 *"03 · The Home — Complete. Ready to be lived in."*
- **Progress Gauge:** Bottom minimalist hairline progress bar tracking scroll percentage `p * 100%`.
- **Performance Safeguard:** Framerate-locked scrubbing with `requestAnimationFrame` and fallbacks for low-power or reduced-motion environments.

### Section 4: Interactive Video Explorer ("Hover to bring it to life")
- **Layout:** Responsive 5-card grid (`aspect-ratio: 3/4` or `4/5`).
- **Interactions:**
  - **Desktop Hover:** Immediate silent autoplay (`video.play()`), smooth `scale(1.06)` zoom, subtle elevation shadow, status pill transitions to *"Playing"*.
  - **Desktop Mouse Leave:** Instant pause, smooth rewind/reset to initial frame.
  - **Mobile Touch:** Single tap toggles playback loop, with accessible focus states for keyboard/assistive navigation.
- **Card Scope:**
  1. *Architecture* (Orbiting concrete villa)
  2. *The Community* (Drone aerial view)
  3. *The Street* (30 FT residential walkthrough)
  4. *The Rooftop* (Space-to-rooftop perspective)
  5. *The Interiors* (FPV drone tour through open living spaces)

### Section 5: Signature Architecture & Villa Facade
- **Layout:** 50/50 split layout. Large square/portrait image box opposite architectural narrative.
- **Details:** Highlights curved sandstone forms, vertical wood privacy louvers, ambient nighttime lighting, and landscaped portico.
- **Lightbox Integration:** Click-to-zoom modal with cursor magnification.

### Section 6: The Residential Community & Grand Entrance
- **Dual Perspective:** Side-by-side or tabbed comparison of the Grand Welcome Gate (`welcome-gate-dusk.jpg`) and the 30 FT Tree-Lined Avenue.
- **Devotional Heritage:** Respectful integration of the official blessing *"శ్రీ అలూరుకోన రంగనాథస్వామి ప్రసన్నం"* and the foundational pillars: *Peace • Prosperity • Togetherness*.

### Section 7: Interactive 3D Floor Plans
- **Display:** Ground Floor Plan and First Floor Plan rendered in crisp high resolution.
- **Interactivity:**
  - Level switcher tab (Ground Level vs. First Floor).
  - High-resolution pan-and-zoom inspection modal (`190vw` inspection mode).
  - Room-by-room dimension callouts (Living, Pooja, Kitchen, Master Suite, Sit-out).

### Section 8: Technical Engineering & Anti-Termite Reticulation
- **Engineering Graphic:** Sub-surface reticulation piping system grid.
- **Educational Narrative:** Explains the permanent sub-slab chemical recharge barrier protecting the villa structure against subterranean pests without interior drilling or disruption.

### Section 9: Property Factsheet & Specifications
- **Data Matrix:** Clean dual-column definition list (`<dl>`) with hairline gold dividers.
- **Verified Metrics:** 23 × 47 ft house footprint, 30 ft central avenue, 23 × 30 ft terrace garden, G+1+Terrace format, dedicated lift shaft (4'6" × 4'6").

### Section 10: Curated Photo Gallery
- **Masonry Layout:** Multi-ratio responsive gallery (`4/5`, `1/1`, `4/3`, `2/3`).
- **Interactive Lightbox:** Full-screen modal supporting previous/next arrows, keyboard shortcuts (`Esc`, `←`, `→`), and swipe gestures.

### Section 11: Structured FAQ
- **Accordion:** Clean semantic `<details>` / `<summary>` disclosure panels with smooth icon rotation (`+` to `–`).

### Section 12: VIP Enquiry & Site Visit Booking
- **Form Design:** Minimalist luxury form fields with floating borders and inline instant validation.
- **Validation Rules:** Strict phone/email pattern check; clear feedback states that never display a false success message if submission fails.

---

## 4. Key Strengths of Claude's Prototype to Retain & Enhance
1. **Zero-lag hover video cards:** Smooth UX where cards play instantly without clunky video player controls.
2. **Pinned assembly storytelling:** Three distinct emotional beats mapped to video frames.
3. **Restrained color harmony:** Warm ivory, deep graphite, and subdued gold.
4. **Accessible lightbox:** Keyboard navigable, full viewport inspection.

## 5. Areas for Upgrade in Next.js Production Implementation
1. **Serve MP4s natively:** Rather than base64 strings (which inflated Claude's single file to 10.7 MB and strained memory), serve optimized MP4 assets from `/public/media/videos/`.
2. **Video Posters:** Generate instant image posters for each video card to ensure zero layout shift before hover.
3. **Mobile Bottom Navigation Bar:** Quick-action bar on phones for *"Call / WhatsApp"*, *"Schedule Visit"*, and *"Floor Plans"*.
