"use client";

import React, { useEffect, useRef, useState } from "react";

export const ReferenceStyleIntro: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setInView(true);
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const headline = "Villas shaped by light, space and quiet.";
  const words = headline.split(" ");

  return (
    <section
      ref={sectionRef}
      id="about"
      className="px-[5vw] py-[12vh] bg-bg text-ink transition-colors"
    >
      <div className="eyebrow">The Project</div>
      <h2
        className="font-serif font-medium leading-[1.05] max-w-[15em]"
        style={{ fontSize: "clamp(34px, 6vw, 76px)" }}
      >
        {words.map((word, i) => (
          <span
            key={i}
            className="inline-block mr-[0.25em] transition-all duration-700"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "none" : "translateY(0.6em)",
              transitionDelay: `${i * 70}ms`,
            }}
          >
            {word}
          </span>
        ))}
      </h2>
      <p className="lead">
        Varahi Anugrahams is a villa development designed around calm, generous living.
        Project details, location and specifications will be added here once confirmed.
      </p>
    </section>
  );
};
