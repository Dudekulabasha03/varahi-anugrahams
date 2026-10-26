"use client";

import React, { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const SmoothScrollProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    // Only initialize smooth scroll in browser environment
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    // Initialize Lenis smooth scroll engine
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // smooth exponential ease-out
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.0,
      autoResize: true,
    });

    // Synchronize Lenis with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    // Smooth scroll for anchor navigation links (#about, #plans, #enquire, #gallery, #scene)
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a");
      if (!target) return;
      const href = target.getAttribute("href");
      if (href && href.startsWith("#") && href.length > 1) {
        const el = document.querySelector(href);
        if (el) {
          e.preventDefault();
          lenis.scrollTo(el as HTMLElement, { offset: -60, duration: 1.1 });
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
};
