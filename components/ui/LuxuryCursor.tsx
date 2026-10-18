"use client";

import React, { useEffect, useState, useRef } from "react";

export const LuxuryCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [cursorType, setCursorType] = useState<"default" | "zoom" | "pointer">("default");
  const [visible, setVisible] = useState(false);
  const posRef = useRef({ x: -100, y: -100 });
  const targetPosRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Only enable on fine pointer devices (desktop mouse, not touch screens)
    if (typeof window === "undefined" || window.matchMedia("(pointer: coarse)").matches) return;

    let animId: number;
    const onMouseMove = (e: MouseEvent) => {
      targetPosRef.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Detection logic: zoom on photos/blueprints, pointer on buttons/links
      if (
        target.closest("[data-cursor='zoom']") ||
        target.closest("[data-zoom]") ||
        target.closest(".box") ||
        (target.tagName === "IMG" && !target.closest("button") && !target.closest("a"))
      ) {
        setCursorType("zoom");
      } else if (
        target.closest("a") ||
        target.closest("button") ||
        target.closest(".btn") ||
        target.closest("summary") ||
        target.closest("input") ||
        target.closest("textarea")
      ) {
        setCursorType("pointer");
      } else {
        setCursorType("default");
      }
    };

    const lerp = () => {
      posRef.current.x += (targetPosRef.current.x - posRef.current.x) * 0.25;
      posRef.current.y += (targetPosRef.current.y - posRef.current.y) * 0.25;
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0) translate(-50%, -50%)`;
      }
      animId = requestAnimationFrame(lerp);
    };
    animId = requestAnimationFrame(lerp);

    const onMouseLeave = () => setVisible(false);
    const onMouseEnter = () => setVisible(true);

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed top-0 left-0 z-50 transition-opacity duration-300 select-none hidden md:block will-change-transform"
      style={{
        transform: "translate3d(-100px, -100px, 0) translate(-50%, -50%)",
        opacity: visible ? 1 : 0,
      }}
    >
      {cursorType === "zoom" && (
        <div className="w-14 h-14 rounded-full bg-black/80 backdrop-blur-md border border-white/50 flex items-center justify-center text-white text-[10px] tracking-[0.2em] uppercase font-sans font-medium shadow-2xl scale-105 transition-transform duration-200">
          Zoom
        </div>
      )}

      {cursorType === "pointer" && (
        <div className="w-8 h-8 rounded-full border border-gold/70 bg-gold/15 transition-all duration-200 scale-100" />
      )}

      {cursorType === "default" && (
        <div className="w-2.5 h-2.5 rounded-full bg-gold/90 shadow-sm transition-all duration-200" />
      )}
    </div>
  );
};
