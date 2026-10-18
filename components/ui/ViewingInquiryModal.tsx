"use client";

import React, { useState } from "react";
import { PROJECT_CONFIG } from "@/config/projectData";
import {
  X,
  Calendar,
  Clock,
  Phone,
  Mail,
  User,
  CheckCircle,
  MessageCircle,
  Sparkles,
  Building,
  Send,
} from "lucide-react";
import { BorderBeam } from "./BorderBeam";

interface ViewingInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultInterest?: string;
  defaultMessage?: string;
}

export const ViewingInquiryModal: React.FC<ViewingInquiryModalProps> = ({
  isOpen,
  onClose,
  defaultInterest = "Signature 3-Level Villa (23×47 ft Plot)",
  defaultMessage = "",
}) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("Golden Hour (5:00 PM – 6:30 PM)");
  const [interest, setInterest] = useState(defaultInterest);
  const [message, setMessage] = useState(defaultMessage);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 750);
  };

  const whatsappText = encodeURIComponent(
    `Hello Rangaiah Kotra garu,\n\nI would like to request a site viewing for VARAHI ANUGRAHAMS.\n\n👤 Name: ${name || "Prospective Buyer"}\n📱 Phone: ${phone}\n📅 Date: ${date || "Flexible"}\n⏰ Time: ${timeSlot}\n🏡 Interest: ${interest}\n💬 Note: ${message || "Please arrange a guided walkthrough."}`
  );

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="inquiry-title"
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fade-in"
    >
      <div className="relative w-full max-w-xl glass-panel-gold rounded-3xl p-6 sm:p-8 border border-gold-400/40 shadow-2xl my-auto">
        <BorderBeam size={260} duration={12} borderWidth={2} colorFrom="#D5AE43" colorTo="#F7F0D0" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full glass-panel text-stone-300 hover:text-gold-300 hover:border-gold-400 transition-colors z-20"
          aria-label="Close inquiry form"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-6 space-y-5 animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-gold-400/20 border-2 border-gold-400 flex items-center justify-center text-gold-400 mx-auto shadow-gold-glow">
              <CheckCircle className="w-9 h-9" />
            </div>

            <div className="space-y-2">
              <span className="text-[10px] uppercase tracking-widest text-gold-400 font-semibold font-sans">
                REQUEST REGISTERED
              </span>
              <h3 className="font-cinzel text-2xl font-bold text-ivory-50">
                Viewing Scheduled
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 max-w-md mx-auto font-light leading-relaxed">
                Thank you, <strong className="text-gold-light">{name}</strong>. Your request for <strong className="text-gold-light">{interest}</strong> on <strong className="text-gold-light">{date || "your requested date"}</strong> ({timeSlot}) has been noted.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-forest-950/90 border border-gold-400/20 text-xs text-stone-300 space-y-1.5 text-left max-w-md mx-auto">
              <p className="flex items-center gap-2">
                <Building className="w-4 h-4 text-gold-400 shrink-0" />
                <span><strong>Developer:</strong> {PROJECT_CONFIG.contact.promoter} — {PROJECT_CONFIG.contact.firm}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gold-400 shrink-0" />
                <span><strong>Direct Line:</strong> +91 {PROJECT_CONFIG.contact.phones[0]}</span>
              </p>
            </div>

            {/* Direct WhatsApp Sync Button */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={`https://wa.me/${PROJECT_CONFIG.contact.whatsapp}?text=${whatsappText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl bg-[#25D366] hover:bg-[#20BD5A] text-forest-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-transform hover:scale-105"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Confirm Instantly via WhatsApp</span>
              </a>

              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="px-6 py-3 rounded-xl glass-panel text-stone-300 hover:text-gold-300 text-xs font-semibold uppercase tracking-wider transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/* Header */}
            <div className="mb-6 space-y-1">
              <div className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-gold-400 font-semibold font-sans">
                <Sparkles className="w-3.5 h-3.5" />
                <span>VIP SITE WALKTHROUGH</span>
              </div>
              <h3 id="inquiry-title" className="font-cinzel text-xl sm:text-2xl font-bold text-ivory-50">
                Request a Private Viewing
              </h3>
              <p className="text-xs text-stone-300 font-light">
                Experience the 23×47 ft villa layout, 30 FT avenue, and 23×30 ft private terrace garden firsthand in Tadipatri.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <label className="text-[11px] uppercase tracking-wider text-gold-300 font-medium flex items-center gap-1">
                    <User className="w-3 h-3 text-gold-400" />
                    <span>Full Name *</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Sudhakar Reddy"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-forest-950 border border-gold-400/30 text-ivory-100 text-xs focus:outline-none focus:border-gold-400 transition-colors"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] uppercase tracking-wider text-gold-300 font-medium flex items-center gap-1">
                    <Phone className="w-3 h-3 text-gold-400" />
                    <span>Phone Number *</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 94928 54666"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-forest-950 border border-gold-400/30 text-ivory-100 text-xs focus:outline-none focus:border-gold-400 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <label className="text-[11px] uppercase tracking-wider text-gold-300 font-medium flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-gold-400" />
                    <span>Preferred Date</span>
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-forest-950 border border-gold-400/30 text-ivory-100 text-xs focus:outline-none focus:border-gold-400 transition-colors"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] uppercase tracking-wider text-gold-300 font-medium flex items-center gap-1">
                    <Clock className="w-3 h-3 text-gold-400" />
                    <span>Time Slot</span>
                  </label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-forest-950 border border-gold-400/30 text-ivory-100 text-xs focus:outline-none focus:border-gold-400 transition-colors"
                  >
                    <option value="Morning (9:30 AM – 11:30 AM)">Morning (9:30 AM – 11:30 AM)</option>
                    <option value="Afternoon (2:00 PM – 4:00 PM)">Afternoon (2:00 PM – 4:00 PM)</option>
                    <option value="Golden Hour (5:00 PM – 6:30 PM)">Golden Hour (5:00 PM – 6:30 PM)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] uppercase tracking-wider text-gold-300 font-medium block">
                  Configuration of Interest
                </label>
                <select
                  value={interest}
                  onChange={(e) => setInterest(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-forest-950 border border-gold-400/30 text-ivory-100 text-xs focus:outline-none focus:border-gold-400 transition-colors"
                >
                  <option value="Signature 3-Level Villa (23×47 ft Plot)">Signature 3-Level Villa (23×47 ft Plot, West Facing)</option>
                  <option value="Villa with Ground Floor Master Suite & Private Lift">Villa with Ground Floor Master Suite &amp; Private Lift</option>
                  <option value="Villa with 23×30 ft Terrace Garden & Pergola">Villa with 23×30 ft Terrace Garden &amp; Pergola</option>
                  <option value="Cooled Moonlight Terrace Bedroom Upgrade">Cooled Moonlight Terrace Bedroom Upgrade</option>
                  <option value="Full Foundation Anti-Termite Reticulation System">Full Foundation Anti-Termite Reticulation System</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] uppercase tracking-wider text-gold-300 font-medium block">
                  Custom Notes or Specific Requirements
                </label>
                <textarea
                  rows={2}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="e.g. Planning for a joint family with parents, need lift consultation..."
                  className="w-full px-3.5 py-2 rounded-xl bg-forest-950 border border-gold-400/30 text-ivory-100 text-xs focus:outline-none focus:border-gold-400 transition-colors resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-between gap-3">
                <p className="text-[11px] text-stone-400">
                  Site Office: R.F. Road, Tadipatri
                </p>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 rounded-full bg-gold-400 hover:bg-gold-300 text-forest-950 font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-gold-glow flex items-center gap-2 hover:scale-105 active:scale-95 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Registering...</span>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Submit Request</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
