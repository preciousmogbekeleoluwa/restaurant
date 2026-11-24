import React, { useState } from 'react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { useCart } from '../context/CartContext';
import { DrippingSauceHeader } from '../components/DrippingSauceHeader';
import { restaurantApi } from '../services/api';
import { Phone, MessageCircle, MapPin, Mail, Clock, Send, CheckCircle2, Sparkles, Navigation, AlertCircle, Instagram, Facebook, Twitter } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { showToast } = useCart();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: 'Table Reservation',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required.';
    if (!formData.email.trim()) {
      newErrors.email = 'Email Address is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please provide a valid email address.';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required.';
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required.';
    if (!formData.message.trim()) newErrors.message = 'Message cannot be empty.';
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const response = await restaurantApi.submitContact(formData);
      if (response?.ticketId) {
        setTicketId(response.ticketId);
      }
    } catch {
      // Local fallback already handled in service
    } finally {
      setIsSubmitting(false);
      setSubmitted(true);
      showToast('Your message has been received! Our team will contact you shortly.');
    }
  };

  return (
    <div className="min-h-screen bg-brand-charcoal text-brand-warmCream pt-20">
      
      {/* 1. Header Banner */}
      <section className="relative py-24 bg-gradient-to-b from-brand-charcoal via-brand-surfaceCard to-brand-charcoal border-b border-brand-goldenYellow/20 text-center overflow-hidden">
        <div className="absolute top-0 left-0 right-0 z-20">
          <DrippingSauceHeader />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 relative z-10 pt-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-surfaceCard border border-brand-goldenYellow/40 text-brand-goldenYellow text-xs font-bold uppercase tracking-widest shadow-glow-yellow">
            <Sparkles className="w-4 h-4 text-brand-goldenYellow" />
            <span>Reservations & Inquiries</span>
          </div>

          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl uppercase text-gradient-fiery tracking-wide font-black">
            CONTACT PRETODAN RESTAURANT
          </h1>

          <p className="text-sm sm:text-lg text-brand-warmCream/85 font-light max-w-2xl mx-auto leading-relaxed">
            Have a question about table reservations, private dining, or event catering? Reach out to our hospitality team.
          </p>
        </div>
      </section>

      {/* 2. Contact Information Cards (Editable Placeholders) */}
      <section className="py-16 bg-brand-charcoal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Phone Card */}
            <div className="p-6 rounded-3xl bg-brand-surfaceCard border border-brand-goldenYellow/20 hover:border-brand-goldenYellow transition-all space-y-3 shadow-lg group">
              <div className="w-12 h-12 rounded-2xl bg-brand-charcoal border border-brand-goldenYellow/30 flex items-center justify-center text-brand-goldenYellow group-hover:scale-110 transition-transform">
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-black text-lg text-brand-goldenYellow">
                Phone Number
              </h3>
              <p className="text-xs text-brand-warmCream/70 font-light">
                Call our restaurant directly for reservations, takeaway orders, or general inquiries.
              </p>
              <div className="pt-1">
                <a
                  href={`tel:${RESTAURANT_INFO.phone}`}
                  className="font-mono font-bold text-sm text-brand-warmCream hover:text-brand-goldenYellow transition-colors flex items-center gap-1.5"
                >
                  <span>{RESTAURANT_INFO.phoneDisplay}</span>
                </a>
                <span className="text-[10px] text-brand-warmCream/40 block mt-0.5 italic">Editable placeholder</span>
              </div>
            </div>

            {/* WhatsApp Card */}
            <div className="p-6 rounded-3xl bg-brand-surfaceCard border border-brand-goldenYellow/20 hover:border-brand-goldenYellow transition-all space-y-3 shadow-lg group">
              <div className="w-12 h-12 rounded-2xl bg-emerald-950 border border-emerald-500/40 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                <MessageCircle className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-black text-lg text-brand-goldenYellow">
                WhatsApp Chat
              </h3>
              <p className="text-xs text-brand-warmCream/70 font-light">
                Instant meal ordering, inquiries, receipt confirmations, and quick kitchen chats.
              </p>
              <div className="pt-1">
                <a
                  href={RESTAURANT_INFO.socials.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono font-bold text-sm text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1.5"
                >
                  <span>{RESTAURANT_INFO.whatsapp}</span>
                </a>
                <span className="text-[10px] text-brand-warmCream/40 block mt-0.5 italic">Editable placeholder</span>
              </div>
            </div>

            {/* Email Card */}
            <div className="p-6 rounded-3xl bg-brand-surfaceCard border border-brand-goldenYellow/20 hover:border-brand-goldenYellow transition-all space-y-3 shadow-lg group">
              <div className="w-12 h-12 rounded-2xl bg-brand-charcoal border border-brand-goldenYellow/30 flex items-center justify-center text-brand-burntOrange group-hover:scale-110 transition-transform">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-black text-lg text-brand-goldenYellow">
                Email Address
              </h3>
              <p className="text-xs text-brand-warmCream/70 font-light">
                Send formal catering RFPs, event proposals, or corporate partnership queries.
              </p>
              <div className="pt-1">
                <a
                  href={`mailto:${RESTAURANT_INFO.email}`}
                  className="font-mono font-bold text-xs sm:text-sm text-brand-warmCream hover:text-brand-goldenYellow transition-colors break-all"
                >
                  {RESTAURANT_INFO.email}
                </a>
                <span className="text-[10px] text-brand-warmCream/40 block mt-0.5 italic">Editable placeholder</span>
              </div>
            </div>

            {/* Restaurant Address Card */}
            <div className="p-6 rounded-3xl bg-brand-surfaceCard border border-brand-goldenYellow/20 hover:border-brand-goldenYellow transition-all space-y-3 shadow-lg group">
              <div className="w-12 h-12 rounded-2xl bg-brand-charcoal border border-brand-goldenYellow/30 flex items-center justify-center text-brand-goldenYellow group-hover:scale-110 transition-transform">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-black text-lg text-brand-goldenYellow">
                Restaurant Address
              </h3>
              <p className="text-xs text-brand-warmCream/80 font-light leading-relaxed">
                {RESTAURANT_INFO.addressDisplay}
              </p>
              <div className="pt-1">
                <span className="text-xs font-bold text-brand-goldenYellow uppercase">
                  {RESTAURANT_INFO.location}
                </span>
                <span className="text-[10px] text-brand-warmCream/40 block mt-0.5 italic">Editable placeholder</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Contact Form & Google Maps Placeholder */}
      <section className="py-20 bg-gradient-to-b from-brand-charcoal via-brand-surfaceCard/40 to-brand-charcoal border-t border-brand-goldenYellow/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left: Interactive Contact Form (Required fields: Full Name, Email, Phone, Subject, Message, Submit button) */}
            <div className="lg:col-span-7 bg-brand-surfaceCard p-8 sm:p-10 rounded-3xl border border-brand-goldenYellow/25 shadow-2xl space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-brand-burntOrange block">
                  Get in Touch
                </span>
                <h2 className="font-heading font-black text-2xl sm:text-3xl text-brand-goldenYellow mt-1">
                  Send Us a Message
                </h2>
                <p className="text-xs text-brand-warmCream/70 mt-1">
                  Fill out the form below with your inquiry. We will respond promptly.
                </p>
              </div>

              {submitted ? (
                <div className="p-8 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-center space-y-3 animate-fade-scale">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-heading font-black text-xl text-emerald-400">
                    Thank You, {formData.fullName}!
                  </h3>
                  {ticketId && (
                    <div className="inline-block px-3 py-1 rounded-full bg-brand-charcoal border border-brand-goldenYellow/40 text-brand-goldenYellow font-mono text-xs font-bold">
                      Reference Ticket: {ticketId}
                    </div>
                  )}
                  <p className="text-xs text-brand-warmCream/90 max-w-sm mx-auto leading-relaxed">
                    Your message regarding <strong>{formData.subject}</strong> has been received by the Pretodan Restaurant team. We will contact you at {formData.phone} or {formData.email}.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setTicketId(null);
                      setFormData({
                        fullName: '',
                        email: '',
                        phone: '',
                        subject: 'Table Reservation',
                        message: '',
                      });
                    }}
                    className="mt-2 px-6 py-2.5 rounded-full bg-brand-charcoal border border-brand-goldenYellow text-brand-goldenYellow text-xs font-bold hover:bg-brand-burntOrange hover:text-white transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-brand-warmCream/80 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Alexander Hamilton"
                      className={`w-full px-4 py-3 rounded-xl bg-brand-charcoal border ${
                        errors.fullName ? 'border-brand-burntOrange ring-1 ring-brand-burntOrange' : 'border-brand-goldenYellow/25'
                      } text-xs text-brand-warmCream focus:outline-none focus:border-brand-goldenYellow`}
                    />
                    {errors.fullName && (
                      <span className="text-[11px] text-brand-burntOrange mt-1 flex items-center gap-1 font-semibold">
                        <AlertCircle className="w-3 h-3" />
                        {errors.fullName}
                      </span>
                    )}
                  </div>

                  {/* Email & Phone Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-brand-warmCream/80 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. alexander@example.com"
                        className={`w-full px-4 py-3 rounded-xl bg-brand-charcoal border ${
                          errors.email ? 'border-brand-burntOrange ring-1 ring-brand-burntOrange' : 'border-brand-goldenYellow/25'
                        } text-xs text-brand-warmCream focus:outline-none focus:border-brand-goldenYellow`}
                      />
                      {errors.email && (
                        <span className="text-[11px] text-brand-burntOrange mt-1 flex items-center gap-1 font-semibold">
                          <AlertCircle className="w-3 h-3" />
                          {errors.email}
                        </span>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-brand-warmCream/80 mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="e.g. +1 (555) 000-0000"
                        className={`w-full px-4 py-3 rounded-xl bg-brand-charcoal border ${
                          errors.phone ? 'border-brand-burntOrange ring-1 ring-brand-burntOrange' : 'border-brand-goldenYellow/25'
                        } text-xs text-brand-warmCream focus:outline-none focus:border-brand-goldenYellow`}
                      />
                      {errors.phone && (
                        <span className="text-[11px] text-brand-burntOrange mt-1 flex items-center gap-1 font-semibold">
                          <AlertCircle className="w-3 h-3" />
                          {errors.phone}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Subject Field */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-brand-warmCream/80 mb-1">
                      Subject *
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-brand-charcoal border border-brand-goldenYellow/25 text-xs text-brand-warmCream focus:outline-none focus:border-brand-goldenYellow"
                    >
                      <option value="Table Reservation">Table Reservation</option>
                      <option value="Private Dining">Private VIP Dining</option>
                      <option value="Outdoor / Event Catering">Outdoor or Event Catering</option>
                      <option value="Online Order Inquiry">Online Order Status</option>
                      <option value="General Question">General Feedback & Inquiries</option>
                    </select>
                  </div>

                  {/* Message Field */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-brand-warmCream/80 mb-1">
                      Message *
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please let us know your preferred date, number of guests, or special dietary requirements..."
                      className={`w-full px-4 py-3 rounded-xl bg-brand-charcoal border ${
                        errors.message ? 'border-brand-burntOrange ring-1 ring-brand-burntOrange' : 'border-brand-goldenYellow/25'
                      } text-xs text-brand-warmCream focus:outline-none focus:border-brand-goldenYellow`}
                    />
                    {errors.message && (
                      <span className="text-[11px] text-brand-burntOrange mt-1 flex items-center gap-1 font-semibold">
                        <AlertCircle className="w-3 h-3" />
                        {errors.message}
                      </span>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-6 rounded-full bg-gradient-to-r from-brand-goldenYellow via-brand-burntOrange to-brand-goldenYellow text-brand-charcoal font-heading font-black text-sm uppercase tracking-wider shadow-glow-yellow hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-brand-charcoal border-t-transparent rounded-full animate-spin" />
                        <span>Submitting to Kitchen Concierge...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Right: Google Maps Integration Placeholder & Social Media Links */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Google Maps Integration Placeholder */}
              <div className="rounded-3xl bg-brand-surfaceCard border border-brand-goldenYellow/25 overflow-hidden shadow-2xl">
                <div className="p-5 border-b border-brand-goldenYellow/15 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Navigation className="w-5 h-5 text-brand-goldenYellow" />
                    <span className="font-heading font-bold text-sm text-brand-goldenYellow">
                      Google Maps Integration Placeholder
                    </span>
                  </div>
                  <span className="text-[11px] text-emerald-400 font-mono flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    Open Today
                  </span>
                </div>

                {/* Dark-styled map iframe placeholder */}
                <div className="relative h-72 w-full bg-[#171513] overflow-hidden">
                  <iframe
                    title="Pretodan Restaurant Google Maps Placeholder"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d198059.84758784177!2d-0.2416815340156942!3d51.52877184061328!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d8a00baf21de75%3A0x52963a5addd52a99!2sLondon%2C%20UK!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
                    className="w-full h-full border-0 filter contrast-125 brightness-75 invert-[90%] hue-rotate-180"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                  
                  {/* Pin Overlay Badge */}
                  <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-xl bg-brand-charcoal/95 border border-brand-goldenYellow/40 text-xs shadow-2xl flex items-center justify-between">
                    <div>
                      <strong className="text-brand-goldenYellow block font-heading">
                        PRETODAN RESTAURANT
                      </strong>
                      <span className="text-[11px] text-brand-warmCream/80 block">
                        {RESTAURANT_INFO.addressDisplay}
                      </span>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-brand-goldenYellow text-brand-charcoal font-bold text-[10px] uppercase tracking-wider shrink-0 ml-2">
                      Map Pin
                    </span>
                  </div>
                </div>

                {/* Opening Hours & Directions Summary */}
                <div className="p-6 space-y-3 text-xs text-brand-warmCream/80">
                  <div className="flex items-center gap-2 text-brand-goldenYellow font-bold">
                    <Clock className="w-4 h-4" />
                    <span className="uppercase tracking-wider">Opening Hours:</span>
                  </div>
                  <div className="space-y-1 text-xs">
                    {RESTAURANT_INFO.openingHours.map((h, i) => (
                      <div key={i} className="flex justify-between border-b border-brand-goldenYellow/10 pb-1">
                        <span className="text-brand-warmCream/70">{h.days}</span>
                        <span className="font-semibold text-brand-warmCream">{h.hours}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Social Media Links Card */}
              <div className="p-6 rounded-3xl bg-brand-surfaceCard border border-brand-goldenYellow/25 space-y-4 shadow-xl">
                <h4 className="font-heading font-black text-sm uppercase tracking-wider text-brand-goldenYellow">
                  Connect With Us on Social Media
                </h4>
                <p className="text-xs text-brand-warmCream/70 font-light leading-relaxed">
                  Follow us for chef specials, seasonal menu announcements, and culinary behind-the-scenes.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
                  <a
                    href={RESTAURANT_INFO.socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-2xl bg-brand-charcoal border border-brand-goldenYellow/20 hover:border-brand-goldenYellow flex flex-col items-center justify-center gap-1.5 text-brand-goldenYellow hover:text-white hover:bg-brand-burntOrange transition-all"
                  >
                    <Instagram className="w-5 h-5" />
                    <span className="text-[10px] font-bold">Instagram</span>
                  </a>

                  <a
                    href={RESTAURANT_INFO.socials.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-2xl bg-brand-charcoal border border-brand-goldenYellow/20 hover:border-brand-goldenYellow flex flex-col items-center justify-center gap-1.5 text-brand-goldenYellow hover:text-white hover:bg-brand-burntOrange transition-all"
                  >
                    <Facebook className="w-5 h-5" />
                    <span className="text-[10px] font-bold">Facebook</span>
                  </a>

                  <a
                    href={RESTAURANT_INFO.socials.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-2xl bg-brand-charcoal border border-brand-goldenYellow/20 hover:border-brand-goldenYellow flex flex-col items-center justify-center gap-1.5 text-brand-goldenYellow hover:text-white hover:bg-brand-burntOrange transition-all"
                  >
                    <Twitter className="w-5 h-5" />
                    <span className="text-[10px] font-bold">Twitter / X</span>
                  </a>

                  <a
                    href={RESTAURANT_INFO.socials.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-2xl bg-brand-charcoal border border-brand-goldenYellow/20 hover:border-emerald-500 flex flex-col items-center justify-center gap-1.5 text-emerald-400 hover:text-white hover:bg-emerald-600 transition-all"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span className="text-[10px] font-bold">WhatsApp</span>
                  </a>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

    </div>
  );
};
