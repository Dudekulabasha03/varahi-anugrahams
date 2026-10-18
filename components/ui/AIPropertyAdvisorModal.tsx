"use client";

import React, { useState } from "react";
import { PROJECT_CONFIG } from "@/config/projectData";
import {
  Sparkles,
  Bot,
  X,
  Send,
  Check,
  ChevronRight,
  MessageCircle,
  Calendar,
  Layers,
  ShieldCheck,
  TrendingUp,
  RotateCcw,
} from "lucide-react";
import { BorderBeam } from "./BorderBeam";
import { AIAdvisorResponse } from "@/app/api/ai-advisor/route";

interface AIPropertyAdvisorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRequestViewing: (customInterest?: string, customNote?: string) => void;
}

export const AIPropertyAdvisorModal: React.FC<AIPropertyAdvisorModalProps> = ({
  isOpen,
  onClose,
  onRequestViewing,
}) => {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AIAdvisorResponse | null>(null);

  if (!isOpen) return null;

  const presetQueries = [
    {
      label: "Joint Family with Elderly Parents",
      text: "We are a joint family of 5 with elderly parents who cannot climb stairs easily. We need a ground-floor master bedroom, elevator access, and a peaceful prayer room.",
    },
    {
      label: "Remote Executive & Nature Lover",
      text: "I am a software executive working remotely. I want an expansive master bedroom with a private balcony, quiet work lounge, and a rooftop terrace garden with a pergola for evening relaxation.",
    },
    {
      label: "Vaastu & Devotional Harmony",
      text: "We prioritize Vaastu alignment, a sacred dedicated pooja mandir blessed by Sri Aluru Kona Ranganatha Swamy, and a community with wide roads and positive energy.",
    },
    {
      label: "Structural Longevity & Durability",
      text: "I want a home with high build quality, subterranean anti-termite piping protection, private car parking, and low long-term maintenance costs.",
    },
  ];

  const handleAnalyze = async (queryText?: string) => {
    const textToSend = queryText || prompt;
    if (!textToSend.trim()) return;

    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/ai-advisor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: textToSend }),
      });

      if (res.ok) {
        const data = await res.json();
        setResult(data);
      } else {
        throw new Error("Advisor service error");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="ai-advisor-title"
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fade-in"
    >
      <div className="relative w-full max-w-3xl glass-panel-gold rounded-3xl p-6 sm:p-8 border border-gold-400/40 shadow-2xl my-auto max-h-[92vh] overflow-y-auto">
        <BorderBeam size={320} duration={14} borderWidth={2} colorFrom="#D5AE43" colorTo="#F7F0D0" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full glass-panel text-stone-300 hover:text-gold-300 hover:border-gold-400 transition-colors z-20"
          aria-label="Close AI advisor"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-6 space-y-1 pr-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-950/90 border border-gold-400/40 text-[10px] text-gold-300 font-cinzel font-bold tracking-widest uppercase">
            <Bot className="w-3.5 h-3.5 text-gold-400 animate-pulse" />
            <span>AI GATEWAY ARCHITECTURAL ADVISOR</span>
          </div>
          <h3 id="ai-advisor-title" className="font-cinzel text-xl sm:text-2xl font-bold text-ivory-50">
            Find Your Ideal Villa Configuration
          </h3>
          <p className="text-xs text-stone-300 font-light">
            Describe your family size, daily routine, or lifestyle preferences. Our AI architectural model analyzes your requirements and matches the optimal Varahi Anugrahams villa specification.
          </p>
        </div>

        {/* Input & Presets View */}
        {!result && (
          <div className="space-y-5">
            {/* Quick Presets */}
            <div className="space-y-2">
              <span className="text-[10px] uppercase tracking-wider text-gold-400 font-semibold block font-sans">
                POPULAR BUYER SCENARIOS (CLICK TO TEST)
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {presetQueries.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setPrompt(preset.text);
                      handleAnalyze(preset.text);
                    }}
                    className="p-3 rounded-xl bg-forest-950/80 border border-gold-400/20 hover:border-gold-400 text-left transition-all hover:bg-forest-900 group"
                  >
                    <p className="text-xs font-semibold text-ivory-100 group-hover:text-gold-300 flex items-center justify-between">
                      <span>{preset.label}</span>
                      <ChevronRight className="w-3.5 h-3.5 text-gold-400 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                    </p>
                    <p className="text-[11px] text-stone-400 line-clamp-1 mt-0.5 font-light">
                      {preset.text}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Freeform Prompt Area */}
            <div className="space-y-2 pt-2 border-t border-gold-400/20">
              <label className="text-[11px] uppercase tracking-wider text-gold-300 font-medium block">
                Or Describe in Your Own Words
              </label>
              <textarea
                rows={3}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g. Family of 4, need spacious bedrooms, terrace for evening tea, love natural light, need private parking for SUV..."
                className="w-full px-4 py-3 rounded-2xl bg-forest-950 border border-gold-400/30 text-ivory-100 text-xs sm:text-sm focus:outline-none focus:border-gold-400 transition-colors resize-none"
              />

              <button
                type="button"
                disabled={loading || !prompt.trim()}
                onClick={() => handleAnalyze()}
                className="w-full py-3.5 rounded-xl bg-gold-400 hover:bg-gold-300 text-forest-950 font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-gold-glow flex items-center justify-center gap-2 disabled:opacity-50 hover:scale-[1.01] active:scale-[0.99]"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-forest-950 border-t-transparent rounded-full animate-spin" />
                    <span>Analyzing Architectural Match...</span>
                  </span>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Generate AI Recommendation</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* AI Recommendation Result Card */}
        {result && (
          <div className="space-y-6 animate-fade-in">
            {/* Top Match Ribbon */}
            <div className="p-4 sm:p-5 rounded-2xl bg-forest-950/90 border border-gold-400/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-gold-400 font-semibold font-sans">
                  RECOMMENDED CONFIGURATION
                </span>
                <h4 className="font-cinzel text-lg sm:text-xl font-bold text-ivory-50 mt-0.5">
                  {result.matchTitle}
                </h4>
              </div>

              <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gold-400/15 border border-gold-400 text-gold-300 shrink-0 shadow-gold-glow">
                <TrendingUp className="w-4 h-4 text-gold-400" />
                <span className="font-mono font-bold text-sm sm:text-base">{result.matchScore}% Match</span>
              </div>
            </div>

            {/* Executive Summary */}
            <div className="glass-panel p-4 sm:p-5 rounded-2xl border border-gold-400/20 text-xs sm:text-sm text-stone-200 font-light leading-relaxed">
              <p>{result.executiveSummary}</p>
            </div>

            {/* Floor by Floor Layout Rationale */}
            <div className="space-y-3">
              <h5 className="font-cinzel text-xs uppercase tracking-wider text-gold-400 font-bold">
                Tailored Layout Allocation
              </h5>

              <div className="space-y-2.5">
                {result.floorBreakdown.map((floor, fIdx) => (
                  <div key={fIdx} className="glass-panel p-4 rounded-xl border border-gold-400/20 space-y-1.5">
                    <div className="flex items-center gap-2">
                      <Layers className="w-3.5 h-3.5 text-gold-400" />
                      <h6 className="font-cinzel text-xs font-bold text-ivory-100">{floor.level}</h6>
                    </div>
                    <p className="text-[11px] text-gold-200/90 italic font-serif pl-5.5">
                      &ldquo;{floor.rationale}&rdquo;
                    </p>
                    <ul className="pl-5.5 space-y-1 pt-1">
                      {floor.highlights.map((h, hIdx) => (
                        <li key={hIdx} className="text-[11px] text-stone-300 flex items-start gap-1.5">
                          <Check className="w-3 h-3 text-gold-400 shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended Upgrades */}
            {result.recommendedUpgrades.length > 0 && (
              <div className="space-y-2.5">
                <h5 className="font-cinzel text-xs uppercase tracking-wider text-gold-400 font-bold">
                  Recommended Custom Upgrades for You
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {result.recommendedUpgrades.map((u, i) => (
                    <div key={i} className="p-3.5 rounded-xl bg-forest-950/80 border border-gold-400/30">
                      <p className="text-xs font-bold text-gold-light flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-gold-400" />
                        <span>{u.title}</span>
                      </p>
                      <p className="text-[11px] text-stone-300 font-light mt-1 leading-relaxed">
                        {u.reason}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="pt-4 border-t border-gold-400/20 flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => {
                  setResult(null);
                  setPrompt("");
                }}
                className="text-xs text-stone-400 hover:text-gold-300 flex items-center gap-1.5 order-3 sm:order-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Ask Another Question</span>
              </button>

              <div className="flex items-center gap-2.5 w-full sm:w-auto order-1 sm:order-2">
                <a
                  href={`https://wa.me/${PROJECT_CONFIG.contact.whatsapp}?text=${encodeURIComponent(result.prefilledWhatsAppMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20BD5A] text-forest-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send to Developer</span>
                </a>

                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onRequestViewing(result.matchTitle, result.executiveSummary);
                  }}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gold-400 hover:bg-gold-300 text-forest-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-gold-glow"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book This Villa</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
