# Project Asset Inventory & Section Mapping

**Project:** Varahi Anugrahams — Luxury Real Estate Experience  
**Source Media Folder:** `/Users/mahaboobbasha/Documents/varahi homes`  
**User Uploaded Photos:** 5 high-resolution architectural & technical assets  
**Target Project Assets:** `/public/media/videos/` and `/public/media/images/`  
**Date:** October 19, 2026  

---

## 1. Video Asset Audit & Technical Analysis

We inspected all 9 video files located in `/Users/mahaboobbasha/Documents/varahi homes`. All video clips are 1080p Full HD (1920 × 1080), 10 seconds in duration, encoded in H.264 / AAC at ~8-12 Mbps bitrate.

| # | Original Filename | File Size | Duration | Resolution | Status & Analysis |
|---|---|---|---|---|---|
| **V1** | `Building_assembling_like_puzzle_1080p_20261019003049.mp4` | 9.77 MB | 10.00s | 1920×1080 | **Primary Assembly Asset:** Precision animated assembly from foundation to complete villa. Ideal for Section 3 pinned scroll-scrubbing. |
| **V2** | `Building_assembling_piece_by_piece_20261019003450.mp4` | 11.18 MB | 10.00s | 1920×1080 | Alternative assembly variation. Can serve as alternate or secondary sequence. |
| **V3** | `Camera_moving_through_residentia…_1080p_20261019003049.mp4` | 10.39 MB | 10.00s | 1920×1080 | **Street Walkthrough:** Eye-level forward dolly down the central 30 FT avenue with palm trees and modern villas. |
| **V4** | `Camera_moving_through_residentia…_1080p_20261019004620.mp4` | 10.39 MB | 10.00s | 1920×1080 | **Exact Duplicate:** Hash check confirms 100% bit-for-bit identical to V3 (MD5 `cadd4f398b0afcba3874c8e27dd5cb96`). Safe to discard duplicate copy. |
| **V5** | `Camera_orbiting_modern_concrete_…_20261019004203.mp4` | 10.89 MB | 10.00s | 1920×1080 | **Architecture Orbit:** 360° sweeping cinematic orbit around the signature curved facade, highlighting exterior textures and timber louvers. |
| **V6** | `Drone_viewing_modern_villa_complex_20261019004108.mp4` | 9.29 MB | 10.00s | 1920×1080 | **Aerial Community Tour:** High-angle drone panning across the master planned gated enclave. Perfect for Community hover card. |
| **V7** | `FPV_drone_touring_luxury_house_20261019005458.mp4` | 9.45 MB | 10.00s | 1920×1080 | **Interior Flow Tour:** Smooth dynamic FPV sequence through modern living spaces, high ceilings, and floor-to-ceiling glass. |
| **V8** | `Zooming_from_space_to_rooftop_20261019004754.mp4` | 14.08 MB | 10.00s | 1920×1080 | **Rooftop & Scale:** Dramatic cosmic-to-micro descent landing on the private rooftop garden and terrace. |
| **V9** | `Zooming_into_residential_complex_1080p_20261019004638.mp4` | 11.88 MB | 10.00s | 1920×1080 | **Flagship Hero Video:** Breathtaking approach zooming into the residential community from the horizon. Perfect for the main landing Hero. |

---

## 2. Photographic Asset Audit

| Image Code | User Uploaded Source File | Image Content & Verified Features | Target Canonical Path |
|---|---|---|---|
| **P1** | `media_1792352753369_35077fcb.jpg` | **Grand Entrance Poster & Cultural Heritage:** Monumental gated archway at sunset with *"VARAHI ANUGRAHAMS"*, *"BRINGING NATURE TO EVERY HOME"*, *"Peace • Prosperity • Togetherness"*, and Sri Alurukona Ranganathaswamy invocation. | `public/media/images/welcome-arch-poster.jpg` |
| **P2** | `media_1792352753371_0293e341.jpg` | **Verified 3D Floor Plans:** Ground Floor (approx 58' × 30') and First Floor (approx 58' × 25') architectural isometric layouts with exact room dimensions and compass rose. | `public/media/images/floor-plans-complete.jpg` |
| **P3** | `media_1792352753373_9442328e.jpg` | **Anti-Termite Reticulation Piping System:** Foundation-level technical diagram (23 ft × 47 ft house) showing distribution pipes with brick block supports. | `public/media/images/anti-termite-system.jpg` |
| **P4** | `media_1792352753377_d05894ba.jpg` | **Signature Villa Facade:** Frontal architectural close-up at dusk showcasing curved limestone balconies, illuminated portico, circular accent window, and timber louvers. | `public/media/images/villa-facade.jpg` |
| **P5** | `media_1792352753551_3ed39682.jpg` | **Residential Community Boulevard:** 30 FT avenue lined with identical luxury villas, royal palms, street lighting, and resident perspective. | `public/media/images/residential-avenue.jpg` |

---

## 3. Website Section Mapping

```
┌────────────────────────────────────────────────────────────────────────────────┐
│  SECTION 1: HERO (100vh Full Viewport)                                         │
│  Media: Zooming_into_residential_complex_1080p_20261019004638.mp4 (V9)         │
│  Backup Poster: public/media/images/residential-avenue.jpg                     │
└──────────────────────────────────────┬─────────────────────────────────────────┘
                                       │
┌──────────────────────────────────────▼─────────────────────────────────────────┐
│  SECTION 2: EDITORIAL PHILOSOPHY & INTRO                                      │
│  Visual: Asymmetric layout with brand tagline & typography reveal              │
└──────────────────────────────────────┬─────────────────────────────────────────┘
                                       │
┌──────────────────────────────────────▼─────────────────────────────────────────┐
│  SECTION 3: SIGNATURE ARCHITECTURAL ASSEMBLY (Pinned 300vh Scroll Scene)      │
│  Media: Building_assembling_like_puzzle_1080p_20261019003049.mp4 (V1)          │
│  Interactive scrub: Frame-by-frame synced with 3 storytelling beats            │
└──────────────────────────────────────┬─────────────────────────────────────────┘
                                       │
┌──────────────────────────────────────▼─────────────────────────────────────────┐
│  SECTION 4: INTERACTIVE VIDEO EXPLORER ("Hover to bring it to life")           │
│  Card 1 (Architecture): Camera_orbiting_modern_concrete_... (V5)               │
│  Card 2 (The Community): Drone_viewing_modern_villa_complex (V6)               │
│  Card 3 (The Street): Camera_moving_through_residential... (V3)                │
│  Card 4 (The Rooftop): Zooming_from_space_to_rooftop (V8)                      │
│  Card 5 (The Interiors): FPV_drone_touring_luxury_house (V7)                   │
└──────────────────────────────────────┬─────────────────────────────────────────┘
                                       │
┌──────────────────────────────────────▼─────────────────────────────────────────┐
│  SECTION 5: SIGNATURE VILLA ARCHITECTURE                                       │
│  Photo: villa-facade.jpg (P4) with click-to-zoom Lightbox                      │
└──────────────────────────────────────┬─────────────────────────────────────────┘
                                       │
┌──────────────────────────────────────▼─────────────────────────────────────────┐
│  SECTION 6: THE RESIDENTIAL COMMUNITY & GRAND ENTRANCE                         │
│  Photos: welcome-arch-poster.jpg (P1) & residential-avenue.jpg (P5)            │
└──────────────────────────────────────┬─────────────────────────────────────────┘
                                       │
┌──────────────────────────────────────▼─────────────────────────────────────────┐
│  SECTION 7: ARCHITECTURAL 3D FLOOR PLANS (Interactive Inspector)               │
│  Image: floor-plans-complete.jpg (P2) + ground / first level switcher tabs     │
└──────────────────────────────────────┬─────────────────────────────────────────┘
                                       │
┌──────────────────────────────────────▼─────────────────────────────────────────┐
│  SECTION 8: TECHNICAL INTEGRITY & ANTI-TERMITE SYSTEM                          │
│  Image: anti-termite-system.jpg (P3) with engineering specification callouts   │
└──────────────────────────────────────┬─────────────────────────────────────────┘
                                       │
┌──────────────────────────────────────▼─────────────────────────────────────────┐
│  SECTION 9: PROPERTY SPECIFICATION MATRIX                                      │
│  Data: 23' x 47' footprint, G+1+Terrace, 30 FT avenue, 4'6" lift shaft         │
└──────────────────────────────────────┬─────────────────────────────────────────┘
                                       │
┌──────────────────────────────────────▼─────────────────────────────────────────┐
│  SECTION 10: CURATED PHOTO & MOMENTS GALLERY                                   │
│  Grid: Multi-aspect ratio masonry with full lightbox navigation                │
└──────────────────────────────────────┬─────────────────────────────────────────┘
                                       │
┌──────────────────────────────────────▼─────────────────────────────────────────┐
│  SECTION 11: FAQ & ARCHITECTURAL INQUIRY                                       │
│  Collapsible semantic accordion panels                                         │
└──────────────────────────────────────┬─────────────────────────────────────────┘
                                       │
┌──────────────────────────────────────▼─────────────────────────────────────────┐
│  SECTION 12: VIP ENQUIRY FORM & FOOTER                                         │
│  Interactive booking form, contact validation, copyright & legal disclaimers   │
└────────────────────────────────────────────────────────────────────────────────┘
```
