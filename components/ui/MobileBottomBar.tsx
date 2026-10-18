"use client";

import React from "react";
import { Bot, Calendar, Phone, MessageCircle, Image as ImageIcon } from "lucide-react";
import { PROJECT_CONFIG } from "@/config/projectData";

interface MobileBottomBarProps {
  onOpenInquiry: () => void;
  onOpenAIAdvisor: () => void;
  onOpenGallery: () => void;
}

export const MobileBottomBar: React.FC<MobileBottomBarProps> = ({
  onOpenInquiry,
  onOpenAIAdvisor,
  onOpenGallery,
}) => {
  return (
    <aside
      aria-label="Mobile quick actions"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-forest-950/95 border-t border-gold-400/30 backdrop-blur-xl px-3 py-2 flex items-center justify-between gap-1.5 shadow-[0_-10px_25px_rgba(0,0,0,0.6)]"
    >
      {/* AI Advisor Button */}
      <button
        onClick={onOpenAIAdvisor}
        className="flex-1 flex flex-col items-center justify-center py-1.5 px-2 rounded-xl bg-forest-900 border border-gold-400/30 text-gold-300 hover:text-gold-200 transition-colors"
      >
        <Bot className="w-4 h-4 text-gold-400 animate-pulse" />
        <span className="text-[10px] font-semibold mt-0.5 whitespace-nowrap">AI Advisor</span>
      </button>

      {/* Gallery Button */}
      <button
        onClick={onOpenGallery}
        className="flex-1 flex flex-col items-center justify-center py-1.5 px-2 rounded-xl bg-forest-900 border border-gold-400/20 text-stone-300 hover:text-gold-300 transition-colors"
      >
        <ImageIcon className="w-4 h-4 text-gold-400" />
        <span className="text-[10px] font-semibold mt-0.5 whitespace-nowrap">Gallery</span>
      </button>

      {/* Main CTA: Request Viewing */}
      <button
        onClick={onOpenInquiry}
        className="flex-[1.4] flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-gold-400 hover:bg-gold-300 text-forest-950 font-bold text-xs uppercase tracking-wider shadow-gold-glow transition-transform active:scale-95"
      >
        <Calendar className="w-3.5 h-3.5" />
        <span className="whitespace-nowrap">Viewing</span>
      </button>

      {/* Direct WhatsApp Callout */}
      <a
        href={`https://wa.me/${PROJECT_CONFIG.contact.whatsapp}?text=${encodeURIComponent("Hello Rangaiah Kotra garu, I am interested in Varahi Anugrahams villas in Tadipatri. Please share details.")}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center justify-center py-1.5 px-2.5 rounded-xl bg-[#25D366]/20 border border-[#25D366]/40 text-[#25D366] transition-transform active:scale-90"
        title="WhatsApp"
        aria-label="Contact developer on WhatsApp"
      >
        <MessageCircle className="w-4 h-4" />
        <span className="text-[10px] font-semibold mt-0.5">Chat</span>
      </a>

      {/* Phone Call Button */}
      <a
        href={`tel:${PROJECT_CONFIG.contact.phones[0]}`}
        className="flex flex-col items-center justify-center py-1.5 px-2.5 rounded-xl bg-forest-900 border border-gold-400/20 text-stone-300 hover:text-gold-300 transition-transform active:scale-90"
        title="Call Site Office"
        aria-label="Call site office directly"
      >
        <Phone className="w-4 h-4 text-gold-400" />
        <span className="text-[10px] font-semibold mt-0.5">Call</span>
      </a>
    </aside>
  );
};
