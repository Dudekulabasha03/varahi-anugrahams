"use client";

import React, { useState } from "react";
import { PROJECT_CONFIG } from "@/config/projectData";
import {
  PhoneCall,
  MessageCircle,
  MapPin,
  Calendar,
  Send,
  CheckCircle,
  Building,
  UserCheck,
  Clock,
  Sparkles,
  Maximize2,
  X,
} from "lucide-react";

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    interest: "Signature 3-BHK Villa",
    visitDate: "",
    message: "",
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cardModalOpen, setCardModalOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate real form validation and submission
    setTimeout(() => {
      setIsSubmitting(false);
      setFormSubmitted(true);
    }, 900);
  };

  const c = PROJECT_CONFIG.contact;

  return (
    <section id="contact" className="relative py-28 sm:py-36 bg-forest-950 border-t border-gold-400/20 overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold-400/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-gold-400/30 bg-forest-900/70 text-gold-400 text-xs uppercase tracking-widest">
            <span>Section 08</span>
            <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
            <span>Acquisition &amp; Enquiries</span>
          </div>

          <h2 className="font-cinzel text-3xl sm:text-5xl lg:text-6xl font-bold text-ivory-50 tracking-wide">
            Book Your <span className="text-gold-gradient">Dream Home</span>
          </h2>

          <p className="font-editorial text-xl sm:text-2xl italic text-gold-light/90">
            &ldquo;Visit and make it yours.&rdquo;
          </p>
          <div className="gold-divider w-28 mx-auto mt-4" />
        </div>

        {/* Contact Layout: Verified Storyboard Details & Interactive Booking Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start max-w-6xl mx-auto">
          {/* Left Column: Official Contact Card from Storyboard */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-panel-gold rounded-3xl p-6 sm:p-8 border border-gold-400/30 shadow-forest-deep space-y-6 relative overflow-hidden">
              {/* Corner Watermark */}
              <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
                <Sparkles className="w-24 h-24 text-gold-400" />
              </div>

              {/* Promoter Header */}
              <div className="border-b border-gold-400/20 pb-5">
                <span className="text-[10px] uppercase tracking-widest text-gold-400 font-semibold block font-sans">
                  PROMOTER &amp; CONTACT
                </span>
                <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-ivory-50 mt-1">
                  {c.promoter}
                </h3>
                <p className="text-xs sm:text-sm text-gold-300 font-medium flex items-center gap-1.5 mt-1">
                  <Building className="w-4 h-4 text-gold-400" />
                  <span>{c.firm}</span>
                </p>
              </div>

              {/* Address */}
              <div className="flex items-start gap-3 text-xs sm:text-sm text-stone-200">
                <MapPin className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-ivory-100">{c.address}</p>
                  <p className="text-stone-400">{c.town}</p>
                  <p className="text-stone-400">Pincode: {c.pincode}</p>
                </div>
              </div>

              {/* Phone Numbers & Direct Call Buttons */}
              <div className="space-y-3 pt-2">
                <span className="text-[11px] font-cinzel text-gold-400 uppercase tracking-wider block">
                  Direct Telephone Lines:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {c.phones.map((phone, idx) => (
                    <a
                      key={idx}
                      href={`tel:${phone}`}
                      className="px-4 py-3 rounded-xl bg-forest-900 border border-gold-400/30 hover:border-gold-400 text-gold-300 hover:text-gold-200 text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-sm"
                    >
                      <PhoneCall className="w-4 h-4 text-gold-400" />
                      <span>+91 {phone}</span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Instant WhatsApp Action */}
              <div className="pt-2">
                <a
                  href={`https://wa.me/${c.whatsapp}?text=Hello%20Rangaiah%20Kotra%20garu,%20I%20am%20interested%20in%20Varahi%20Anugrahams%20Gated%20Community%20Villa%20in%20Tadipatri.%20Please%20share%20further%20details.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20BD5A] text-forest-950 font-bold text-xs uppercase tracking-wider transition-transform hover:scale-[1.01] active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg"
                >
                  <MessageCircle className="w-4 h-4 text-forest-950" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>

              {/* Storyboard Panel 8 Thumbnail reference */}
              <div className="pt-4 border-t border-gold-400/20 flex items-center justify-between text-xs text-stone-400">
                <span>Verified Storyboard Panel 08</span>
                <button
                  onClick={() => setCardModalOpen(true)}
                  className="text-gold-400 hover:text-gold-300 flex items-center gap-1"
                >
                  <Maximize2 className="w-3 h-3" />
                  <span>Inspect Card</span>
                </button>
              </div>
            </div>

            {/* Office Timings */}
            <div className="glass-panel rounded-2xl p-4 border border-gold-400/15 flex items-center gap-3 text-xs text-stone-300">
              <Clock className="w-4 h-4 text-gold-400 shrink-0" />
              <span>Office &amp; Site Visit Hours: {c.officeHours}</span>
            </div>
          </div>

          {/* Right Column: Interactive Viewing / Booking Form */}
          <div className="lg:col-span-7">
            <div className="glass-panel-gold rounded-3xl p-6 sm:p-10 border border-gold-400/30 shadow-forest-deep">
              <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-ivory-50 mb-1">
                Request a Private Site Viewing
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 font-light mb-6">
                Fill in your details below and our team will get in touch directly to coordinate your personal tour.
              </p>

              {formSubmitted ? (
                <div className="rounded-2xl bg-forest-900 border border-gold-400 p-8 text-center space-y-4 animate-fade-in">
                  <div className="w-14 h-14 rounded-full bg-gold-400/20 border border-gold-400 flex items-center justify-center text-gold-400 mx-auto">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h4 className="font-cinzel text-xl font-bold text-ivory-50">
                    Enquiry Received
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-300 max-w-md mx-auto font-light leading-relaxed">
                    Thank you, <strong className="text-gold-light">{formData.name}</strong>. Mr. Rangaiah Kotra&apos;s team at Sri Murali Cotton Press will contact you at <strong className="text-gold-light">{formData.phone}</strong> shortly.
                  </p>
                  <button
                    onClick={() => {
                      setFormSubmitted(false);
                      setFormData({
                        name: "",
                        phone: "",
                        email: "",
                        interest: "Signature 3-BHK Villa",
                        visitDate: "",
                        message: "",
                      });
                    }}
                    className="px-6 py-2 rounded-full border border-gold-400 text-gold-300 text-xs font-semibold hover:bg-gold-400 hover:text-forest-950 transition-colors"
                  >
                    Send Another Enquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[11px] uppercase tracking-wider text-gold-300 font-medium block">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Ramesh Reddy"
                        className="w-full px-4 py-3 rounded-xl bg-forest-950 border border-gold-400/30 text-ivory-100 text-xs sm:text-sm focus:outline-none focus:border-gold-400 transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] uppercase tracking-wider text-gold-300 font-medium block">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="e.g. 94928 54666"
                        className="w-full px-4 py-3 rounded-xl bg-forest-950 border border-gold-400/30 text-ivory-100 text-xs sm:text-sm focus:outline-none focus:border-gold-400 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[11px] uppercase tracking-wider text-gold-300 font-medium block">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="yourname@gmail.com"
                        className="w-full px-4 py-3 rounded-xl bg-forest-950 border border-gold-400/30 text-ivory-100 text-xs sm:text-sm focus:outline-none focus:border-gold-400 transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] uppercase tracking-wider text-gold-300 font-medium block">
                        Preferred Viewing Date
                      </label>
                      <input
                        type="date"
                        value={formData.visitDate}
                        onChange={(e) => setFormData({ ...formData, visitDate: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-forest-950 border border-gold-400/30 text-ivory-100 text-xs sm:text-sm focus:outline-none focus:border-gold-400 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] uppercase tracking-wider text-gold-300 font-medium block">
                      Enquiry Interest
                    </label>
                    <select
                      value={formData.interest}
                      onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-forest-950 border border-gold-400/30 text-ivory-100 text-xs sm:text-sm focus:outline-none focus:border-gold-400 transition-colors"
                    >
                      <option value="Signature 3-BHK Villa">Signature 3-Level Villa (Ground + 1st + Rooftop)</option>
                      <option value="Floor Plan & Pricing Consultation">Floor Plan &amp; Pricing Consultation</option>
                      <option value="Private Site Tour">Private On-Site Community Walkthrough</option>
                      <option value="Optional Terrace Pergola & Bedroom">Terrace Pergola &amp; Moonlight Bedroom Upgrade</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] uppercase tracking-wider text-gold-300 font-medium block">
                      Message / Custom Requirement
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please let us know your preferred time or any specific questions..."
                      className="w-full px-4 py-3 rounded-xl bg-forest-950 border border-gold-400/30 text-ivory-100 text-xs sm:text-sm focus:outline-none focus:border-gold-400 transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl bg-gold-400 hover:bg-gold-300 text-forest-950 font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-gold-lg flex items-center justify-center gap-2 mt-4 hover:scale-[1.01]"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-forest-950 border-t-transparent rounded-full animate-spin" />
                        <span>Sending Request...</span>
                      </span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>SUBMIT ENQUIRY</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Storyboard Contact Lightbox Modal */}
      {cardModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4">
          <div className="relative max-w-md w-full glass-panel-gold rounded-3xl p-6 border border-gold-400 animate-fade-in text-center">
            <button
              onClick={() => setCardModalOpen(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-ivory-100"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
            <h4 className="font-cinzel text-base font-bold text-ivory-50 mb-3">
              Official Storyboard Contact Panel
            </h4>
            <div className="rounded-xl overflow-hidden bg-forest-950 border border-gold-400/30 mb-3">
              <img
                src="/assets/brand/contact-card-panel.jpg"
                alt="Storyboard Contact Card"
                className="w-full h-auto object-contain"
              />
            </div>
            <p className="text-xs text-stone-300">
              Verified original contact panel from the project storyboard.
            </p>
          </div>
        </div>
      )}
    </section>
  );
};
