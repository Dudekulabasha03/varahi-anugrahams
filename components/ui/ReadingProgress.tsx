"use client";

import React, { useEffect, useState } from "react";

export const ReadingProgress: React.FC = () => {
  const [completion, setCompletion] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const currentProgress = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight) {
        setCompletion(Number((currentProgress / scrollHeight).toFixed(3)) * 100);
      }
    };

    window.addEventListener("scroll", updateProgress, { passive: true });
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  return (
    <div
      role="progressbar"
      aria-valuenow={Math.round(completion)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Page reading progress"
      className="fixed top-0 left-0 right-0 h-[2.5px] z-50 pointer-events-none"
    >
      <div
        className="h-full bg-gradient-to-r from-gold-500 via-gold-300 to-ivory-100 transition-all duration-150 ease-out shadow-[0_0_10px_rgba(213,174,67,0.7)]"
        style={{ width: `${completion}%` }}
      />
    </div>
  );
};
