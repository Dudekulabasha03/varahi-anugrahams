"use client";

import React, { useRef } from "react";

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
  enableTilt?: boolean;
}

export const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className = "",
  spotlightColor = "rgba(169, 139, 79, 0.18)",
  enableTilt = false,
  ...props
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (spotlightRef.current) {
      spotlightRef.current.style.opacity = "1";
      spotlightRef.current.style.background = `radial-gradient(600px circle at ${x}px ${y}px, ${spotlightColor}, transparent 40%)`;
    }

    if (enableTilt) {
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const tiltX = ((y - centerY) / centerY) * -4;
      const tiltY = ((x - centerX) / centerX) * 4;
      cardRef.current.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
    }
  };

  const handleMouseLeave = () => {
    if (spotlightRef.current) {
      spotlightRef.current.style.opacity = "0";
    }
    if (enableTilt && cardRef.current) {
      cardRef.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative rounded-[20px] overflow-hidden border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl transition-transform duration-150 ease-out shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] hover:border-gold/40 will-change-transform ${className}`}
      style={enableTilt ? { transformStyle: "preserve-3d" } : undefined}
      {...props}
    >
      {/* 21st.dev Mouse Spotlight Layer (hardware accelerated via direct DOM style) */}
      <div
        ref={spotlightRef}
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 rounded-[20px] z-10 opacity-0"
      />

      {/* Glass Top Edge Reflection Highlight */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent z-20" />

      {/* Content wrapper */}
      <div className="relative z-20 h-full">{children}</div>
    </div>
  );
};
