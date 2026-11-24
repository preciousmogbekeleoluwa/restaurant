import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { TableReservation } from '../types';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { X, Calendar, Clock, Users, MapPin, Sparkles, CheckCircle2, MessageCircle, Download, Wine, PartyPopper } from 'lucide-react';
import confetti from 'canvas-confetti';

export const ReservationModal: React.FC = () => {
  const { isReservationOpen, setIsReservationOpen, activeReservation, saveReservation } = useCart();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsReservationOpen(false);
    };
    if (isReservationOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isReservationOpen, setIsReservationOpen]);
  
  const [formData, setFormData] = useState({
    guestName: '',
    email: '',
    phone: '',
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Tomorrow default
    timeSlot: '7:30 PM',
    guestsCount: 2,
    seatingArea: 'Main Dining Hall',
    occasion: 'Celebration / Romantic Dinner',
    specialRequests: '',
  });

  const [confirmedReservation, setConfirmedReservation] = useState<TableReservation | null>(activeReservation);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isReservationOpen) return null;

  const timeSlots = [
    '12:00 PM', '1:00 PM', '2:00 PM', // Lunch
    '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM' // Dinner
  ];

  const seatingAreas = [
    { id: 'Main Dining Hall', desc: 'Lively atmospheric setting with amber lighting' },
    { id: 'Romantic Terrace', desc: 'Open-air al fresco dining with garden views' },
    { id: 'Private VIP Suite', desc: 'Secluded luxury alcove for exclusive gatherings' },
    { id: "Chef's Tasting Table", desc: 'Front-row view of executive culinary plating' }
  ];

  const occasions = [
    'Celebration / Romantic Dinner',
    'Anniversary',
    'Birthday Party',
    'Executive Business Dinner',
    'Casual Gathering'
  ];

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.guestName.trim()) errs.guestName = 'Name is required';
    if (!formData.email.trim()) errs.email = 'Email is required';
    if (!formData.phone.trim()) errs.phone = 'Phone number is required';
    return errs;
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const newReservation: TableReservation = {
        id: `TBL-${Math.floor(100000 + Math.random() * 900000)}`,
        guestName: formData.guestName,
        email: formData.email,
        phone: formData.phone,
        date: formData.date,
        timeSlot: formData.timeSlot,
        guestsCount: Number(formData.guestsCount),
        seatingArea: formData.seatingArea,
        occasion: formData.occasion,
        specialRequests: formData.specialRequests,
        createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        status: 'confirmed',
      };

      saveReservation(newReservation);
      setConfirmedReservation(newReservation);
      setIsSubmitting(false);

      // Trigger celebration confetti
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#F5A900', '#E87516', '#F5E9D2', '#FFFFFF'],
      });
    }, 900);
  };

  const handleWhatsAppSync = (res: TableReservation) => {
    const text = `🍽️ *TABLE RESERVATION — PRETODAN RESTAURANT*\n` +
      `Booking Ref: *${res.id}*\n` +
      `Guest Name: *${res.guestName}*\n` +
      `Party Size: *${res.guestsCount} Guests*\n` +
      `Date & Time: *${res.date} at ${res.timeSlot}*\n` +
      `Seating Area: *${res.seatingArea}*\n` +
      `Occasion: *${res.occasion}*\n` +
      (res.specialRequests ? `Special Requests: ${res.specialRequests}\n` : '') +
      `\nPlease verify our table reservation. Thank you!`;

    window.open(`https://wa.me/${RESTAURANT_INFO.whatsappInternational}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div
      onClick={() => setIsReservationOpen(false)}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-charcoal/85 backdrop-blur-md animate-fade-scale overflow-y-auto"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl bg-gradient-to-b from-brand-surfaceCard via-brand-charcoal to-brand-surfaceCard rounded-3xl border border-brand-goldenYellow/40 shadow-2xl overflow-hidden flex flex-col max-h-[90vh] my-auto"
      >
        
        {/* Modal Header */}
        <div className="p-6 bg-brand-charcoal border-b border-brand-goldenYellow/20 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-brand-surfaceCard border border-brand-goldenYellow/35 flex items-center justify-center text-brand-goldenYellow">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-heading font-black text-xl text-brand-goldenYellow leading-tight">
                Table Reservation Concierge
              </h2>
              <span className="text-xs text-brand-warmCream/70 font-sans">
                Pretodan Continental Restaurant • VIP Table Booking
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsReservationOpen(false)}
            className="p-2 rounded-full bg-brand-surfaceCard text-brand-warmCream hover:text-brand-goldenYellow transition-colors"
            aria-label="Close reservation modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto space-y-6">
          {confirmedReservation ? (
            /* Digital Confirmation Voucher Pass */
            <div className="space-y-6 text-center animate-fade-scale">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center mx-auto text-emerald-400">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 block mb-1">
                  Reservation Confirmed
                </span>
                <h3 className="font-display text-3xl sm:text-4xl text-gradient-fiery uppercase font-black">
                  WE LOOK FORWARD TO HOSTING YOU
                </h3>
                <p className="text-xs sm:text-sm text-brand-warmCream/80 max-w-md mx-auto mt-1">
                  A table has been provisionally reserved for your party at Pretodan Restaurant.
                </p>
              </div>

              {/* Luxury Pass Card */}
              <div className="p-6 rounded-3xl bg-brand-charcoal border-2 border-dashed border-brand-goldenYellow/40 max-w-md mx-auto text-left relative overflow-hidden shadow-2xl space-y-4">
                <div className="flex items-center justify-between border-b border-brand-goldenYellow/20 pb-3">
                  <div>
                    <span className="text-[10px] text-brand-warmCream/60 uppercase block">Booking Reference</span>
                    <span className="font-mono font-black text-lg text-brand-goldenYellow">{confirmedReservation.id}</span>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-950 border border-emerald-500/40 text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                    Confirmed
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-brand-warmCream/60 block text-[11px]">Guest Name</span>
                    <strong className="text-brand-warmCream font-semibold">{confirmedReservation.guestName}</strong>
                  </div>
                  <div>
                    <span className="text-brand-warmCream/60 block text-[11px]">Party Size</span>
                    <strong className="text-brand-goldenYellow font-semibold">{confirmedReservation.guestsCount} Guests</strong>
                  </div>
                  <div>
                    <span className="text-brand-warmCream/60 block text-[11px]">Date & Time</span>
                    <strong className="text-brand-warmCream font-semibold">{confirmedReservation.date} • {confirmedReservation.timeSlot}</strong>
                  </div>
                  <div>
                    <span className="text-brand-warmCream/60 block text-[11px]">Seating Area</span>
                    <strong className="text-brand-burntOrange font-semibold">{confirmedReservation.seatingArea}</strong>
                  </div>
                </div>

                {confirmedReservation.specialRequests && (
                  <div className="pt-2 border-t border-brand-goldenYellow/10 text-xs">
                    <span className="text-brand-warmCream/60 block text-[11px]">Special Requests:</span>
                    <span className="text-brand-warmCream/85 italic">{confirmedReservation.specialRequests}</span>
                  </div>
                )}

                <div className="pt-3 border-t border-brand-goldenYellow/20 flex items-center justify-between text-[11px] text-brand-warmCream/60">
                  <span>Pretodan Continental Restaurant</span>
                  <span>{RESTAURANT_INFO.phoneDisplay}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => handleWhatsAppSync(confirmedReservation)}
                  className="w-full sm:w-auto px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-heading font-black text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send Confirmation via WhatsApp</span>
                </button>

                <button
                  onClick={() => setConfirmedReservation(null)}
                  className="w-full sm:w-auto px-6 py-3 rounded-full bg-brand-surfaceCard border border-brand-goldenYellow/40 text-brand-goldenYellow hover:bg-brand-burntOrange hover:text-white font-heading font-bold text-xs uppercase tracking-wider transition-all"
                >
                  Book Another Table
                </button>
              </div>
            </div>
          ) : (
            /* Booking Form */
            <form onSubmit={handleBookingSubmit} className="space-y-5">
              {/* Party Size & Occasion Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-brand-warmCream/80 mb-1 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-brand-goldenYellow" />
                    <span>Party Size *</span>
                  </label>
                  <select
                    value={formData.guestsCount}
                    onChange={(e) => setFormData({ ...formData, guestsCount: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 rounded-xl bg-brand-charcoal border border-brand-goldenYellow/25 text-xs text-brand-warmCream focus:outline-none focus:border-brand-goldenYellow font-medium"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12].map((num) => (
                      <option key={num} value={num}>{num} {num === 1 ? 'Guest (Solo Dining)' : 'Guests'}</option>
                    ))}
                    <option value={15}>15+ Guests (Private Event)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-brand-warmCream/80 mb-1 flex items-center gap-1.5">
                    <PartyPopper className="w-3.5 h-3.5 text-brand-goldenYellow" />
                    <span>Occasion</span>
                  </label>
                  <select
                    value={formData.occasion}
                    onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-brand-charcoal border border-brand-goldenYellow/25 text-xs text-brand-warmCream focus:outline-none focus:border-brand-goldenYellow font-medium"
                  >
                    {occasions.map((occ) => (
                      <option key={occ} value={occ}>{occ}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Date & Time Slot Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-brand-warmCream/80 mb-1 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-brand-goldenYellow" />
                    <span>Preferred Date *</span>
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-brand-charcoal border border-brand-goldenYellow/25 text-xs text-brand-warmCream focus:outline-none focus:border-brand-goldenYellow font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-brand-warmCream/80 mb-1 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-brand-goldenYellow" />
                    <span>Time Slot *</span>
                  </label>
                  <select
                    value={formData.timeSlot}
                    onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-brand-charcoal border border-brand-goldenYellow/25 text-xs text-brand-warmCream focus:outline-none focus:border-brand-goldenYellow font-medium"
                  >
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Seating Area Choice */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-warmCream/80 mb-2 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-brand-goldenYellow" />
                  <span>Choose Seating Atmosphere</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {seatingAreas.map((area) => {
                    const isSelected = formData.seatingArea === area.id;
                    return (
                      <button
                        type="button"
                        key={area.id}
                        onClick={() => setFormData({ ...formData, seatingArea: area.id })}
                        className={`p-3 rounded-2xl border text-left transition-all ${
                          isSelected
                            ? 'bg-gradient-to-r from-brand-surfaceCard to-brand-charcoal border-brand-goldenYellow shadow-glow-yellow'
                            : 'bg-brand-charcoal/60 border-brand-goldenYellow/15 hover:border-brand-goldenYellow/40'
                        }`}
                      >
                        <strong className={`block text-xs font-heading ${isSelected ? 'text-brand-goldenYellow' : 'text-brand-warmCream'}`}>
                          {area.id}
                        </strong>
                        <span className="text-[11px] text-brand-warmCream/60 font-light block mt-0.5">
                          {area.desc}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Guest Details Grid */}
              <div className="pt-2 border-t border-brand-goldenYellow/15 space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-goldenYellow block">
                  Guest Contact Details
                </span>

                <div>
                  <input
                    type="text"
                    value={formData.guestName}
                    onChange={(e) => setFormData({ ...formData, guestName: e.target.value })}
                    placeholder="Full Name (e.g. Lord Harrington)"
                    className={`w-full px-4 py-2.5 rounded-xl bg-brand-charcoal border ${
                      errors.guestName ? 'border-brand-burntOrange' : 'border-brand-goldenYellow/25'
                    } text-xs text-brand-warmCream focus:outline-none focus:border-brand-goldenYellow`}
                  />
                  {errors.guestName && <span className="text-[10px] text-brand-burntOrange mt-1 block">{errors.guestName}</span>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="Email Address"
                      className={`w-full px-4 py-2.5 rounded-xl bg-brand-charcoal border ${
                        errors.email ? 'border-brand-burntOrange' : 'border-brand-goldenYellow/25'
                      } text-xs text-brand-warmCream focus:outline-none focus:border-brand-goldenYellow`}
                    />
                    {errors.email && <span className="text-[10px] text-brand-burntOrange mt-1 block">{errors.email}</span>}
                  </div>

                  <div>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="Phone Number"
                      className={`w-full px-4 py-2.5 rounded-xl bg-brand-charcoal border ${
                        errors.phone ? 'border-brand-burntOrange' : 'border-brand-goldenYellow/25'
                      } text-xs text-brand-warmCream focus:outline-none focus:border-brand-goldenYellow`}
                    />
                    {errors.phone && <span className="text-[10px] text-brand-burntOrange mt-1 block">{errors.phone}</span>}
                  </div>
                </div>

                <div>
                  <textarea
                    rows={2}
                    value={formData.specialRequests}
                    onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                    placeholder="Dietary preferences, champagne request, candle, high chair..."
                    className="w-full px-4 py-2 rounded-xl bg-brand-charcoal border border-brand-goldenYellow/25 text-xs text-brand-warmCream focus:outline-none focus:border-brand-goldenYellow"
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-6 rounded-full bg-gradient-to-r from-brand-goldenYellow via-brand-burntOrange to-brand-goldenYellow text-brand-charcoal font-heading font-black text-sm uppercase tracking-wider shadow-glow-yellow hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-brand-charcoal border-t-transparent rounded-full animate-spin" />
                    <span>Reserving Your Table...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Confirm Table Reservation</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
