"use client";

import React, { useState } from "react";
import { SpotlightCard } from "./SpotlightCard";
import { Mail, Phone, Calendar, ArrowRight, CheckCircle2, Sparkles, MessageCircle } from "lucide-react";

export const GlassyContact: React.FC = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", villa: "Villa Serena", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="relative px-[5vw] py-[14vh] z-10 border-t border-white/[0.08]">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Editorial Callout */}
        <div className="lg:col-span-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.1] text-xs font-mono tracking-widest uppercase text-gold mb-4 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Private Consultations</span>
          </div>

          <h2 className="font-serif text-[clamp(36px,5vw,68px)] font-medium text-white leading-[1.05] tracking-tight">
            Get In Touch
          </h2>

          <p className="mt-4 text-stone-300 text-lg font-light leading-relaxed">
            Prefer to talk? Book a private tour or consultation with our advisory partners.
          </p>

          <div className="mt-8 space-y-4">
            <a
              href="mailto:hello@lecercle.com"
              className="group flex items-center gap-4 p-4 rounded-[16px] bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl hover:border-gold/50 transition-all"
            >
              <div className="w-12 h-12 rounded-full bg-gold/15 border border-gold/30 flex items-center justify-center text-gold group-hover:scale-105 transition-transform">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-mono uppercase text-stone-400">Direct Inquiries</p>
                <p className="text-base text-white font-medium group-hover:text-gold transition-colors">
                  hello@lecercle.com
                </p>
              </div>
            </a>

            <a
              href="https://wa.me/919492854666?text=Hello,%20I%20am%20interested%20in%20booking%20a%20private%20tour%20for%20Marbella%20villas."
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 p-4 rounded-[16px] bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl hover:border-gold/50 transition-all"
            >
              <div className="w-12 h-12 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-mono uppercase text-stone-400">WhatsApp Concierge</p>
                <p className="text-base text-white font-medium group-hover:text-emerald-400 transition-colors">
                  Instant Private Tour Booking
                </p>
              </div>
            </a>
          </div>
        </div>

        {/* Right Column: Frosted Glass Contact Form (21st.dev style) */}
        <div className="lg:col-span-7">
          <SpotlightCard className="p-8 sm:p-10" enableTilt={false}>
            {submitted ? (
              <div className="py-12 text-center animate-fade-in">
                <div className="w-16 h-16 rounded-full bg-gold/20 border border-gold/40 text-gold flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-3xl text-white">Private Tour Requested</h3>
                <p className="mt-2 text-stone-300 max-w-[420px] mx-auto text-sm font-light">
                  Thank you. Our private client advisor will contact you within 4 hours to coordinate your viewing dossier.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 text-xs font-mono uppercase tracking-widest text-gold underline hover:text-white"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-stone-400 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Lord Alistair Sterling"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-[12px] bg-white/[0.04] border border-white/[0.12] text-white placeholder-stone-500 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-stone-400 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="client@familyoffice.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-[12px] bg-white/[0.04] border border-white/[0.12] text-white placeholder-stone-500 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-stone-400 mb-2">
                      Phone / WhatsApp
                    </label>
                    <input
                      type="tel"
                      placeholder="+34 600 000 000"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-[12px] bg-white/[0.04] border border-white/[0.12] text-white placeholder-stone-500 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-stone-400 mb-2">
                      Select Residence
                    </label>
                    <select
                      value={form.villa}
                      onChange={(e) => setForm({ ...form, villa: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-[12px] bg-stone-900 border border-white/[0.12] text-white focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all text-sm"
                    >
                      <option value="Villa Serena">Villa Serena (Golden Mile)</option>
                      <option value="Casa del Sol">Casa del Sol (Los Monteros)</option>
                      <option value="Villa Andalucía">Villa Andalucía (Sierra Blanca)</option>
                      <option value="The Meridian">The Meridian (Puerto Banús)</option>
                      <option value="Villa Blanca">Villa Blanca (La Zagaleta)</option>
                      <option value="Casa Dorada">Casa Dorada (Nueva Andalucía)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-stone-400 mb-2">
                    Message / Preferred Dates
                  </label>
                  <textarea
                    rows={4}
                    placeholder="We would like to arrange a private viewing next Tuesday afternoon..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-[12px] bg-white/[0.04] border border-white/[0.12] text-white placeholder-stone-500 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all text-sm resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-full bg-gold hover:bg-gold-hover text-black font-mono font-semibold uppercase tracking-widest text-xs flex items-center justify-center gap-2 shadow-xl shadow-gold/20 transition-all"
                >
                  <span>Send Message</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
};
