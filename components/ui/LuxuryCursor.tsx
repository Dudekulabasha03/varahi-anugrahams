"use client";

import React, { useEffect, useState } from "react";

export const LuxuryCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [targetPos, setTargetPos] = useState({ x: -100, y: -100 });
  const [cursorType, setCursorType] = useState<"default" | "zoom" | "pointer">("default");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only enable on fine pointer devices (desktop mouse, not touch screens)
    if (typeof window === "undefined" || window.matchMedia("(pointer: coarse)").matches) return;

    const onMouseMove = (e: MouseEvent) => {
      setTargetPos({ x: e.clientX, y: e.clientY });
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

    const onMouseLeave = () => setVisible(false);
    const onMouseEnter = () => setVisible(true);

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
    };
  }, [visible]);

  // Smooth lerp trailing animation loop
  useEffect(() => {
    let animId: number;
    const lerp = () => {
      setPos((prev) => ({
        x: prev.x + (targetPos.x - prev.x) * 0.18,
        y: prev.y + (targetPos.y - prev.y) * 0.18,
      }));
      animId = requestAnimationFrame(lerp);
    };
    animId = requestAnimationFrame(lerp);
    return () => cancelAnimationFrame(animId);
  }, [targetPos]);

  if (!visible) return null;

  return (
    <div
      className="pointer-events-none fixed z-50 transition-opacity duration-300 select-none hidden md:block"
      style={{
        left: `${pos.x}px`,
        top: `${pos.y}px`,
        transform: "translate(-50%, -50%)",
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
