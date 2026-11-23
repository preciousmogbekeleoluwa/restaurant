import React, { useState } from 'react';
import { Logo } from './Logo';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { PageRoute } from '../types';
import { useCart } from '../context/CartContext';
import { MapPin, Phone, Mail, Clock, MessageCircle, Send, Heart, Instagram, Facebook, Twitter, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageRoute) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [emailInput, setEmailInput] = useState('');
  const { showToast } = useCart();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      showToast('Thank you for subscribing to Pretodan VIP culinary updates!');
      setEmailInput('');
    }
  };

  return (
    <footer className="bg-gradient-to-b from-brand-charcoal via-brand-surfaceCard to-brand-charcoal border-t border-brand-goldenYellow/25 pt-16 pb-12 text-brand-warmCream relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-burntOrange/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-brand-goldenYellow/20">
          
          {/* Col 1: Brand Info & Wordmark */}
          <div className="lg:col-span-4 space-y-4">
            <button
              onClick={() => onNavigate('home')}
              className="text-left"
              aria-label="Pretodan Restaurant Home"
            >
              <Logo className="h-12" />
            </button>
            <p className="text-brand-goldenYellow font-serif italic text-base">
              "{RESTAURANT_INFO.tagline}"
            </p>
            <p className="text-brand-warmCream/75 text-sm leading-relaxed max-w-sm font-light">
              A premier continental dining destination celebrating extraordinary flavours, prime ingredients, and memorable hospitality. From grilled chicken and aged steaks to artisanal pastas and fresh seafood.
            </p>
            
            {/* Social Icons */}
            <div className="flex items-center space-x-3 pt-2">
              <a
                href={RESTAURANT_INFO.socials.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-brand-surfaceCard border border-brand-goldenYellow/30 text-emerald-400 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all shadow-sm"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href={RESTAURANT_INFO.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-brand-surfaceCard border border-brand-goldenYellow/30 text-brand-goldenYellow flex items-center justify-center hover:bg-brand-burntOrange hover:text-white transition-all shadow-sm"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={RESTAURANT_INFO.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-brand-surfaceCard border border-brand-goldenYellow/30 text-brand-goldenYellow flex items-center justify-center hover:bg-brand-burntOrange hover:text-white transition-all shadow-sm"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={RESTAURANT_INFO.socials.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-brand-surfaceCard border border-brand-goldenYellow/30 text-brand-goldenYellow flex items-center justify-center hover:bg-brand-burntOrange hover:text-white transition-all shadow-sm"
                aria-label="Twitter / X"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-heading font-black text-sm uppercase tracking-wider text-brand-goldenYellow border-b border-brand-goldenYellow/20 pb-2">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="text-brand-warmCream/80 hover:text-brand-goldenYellow transition-colors flex items-center gap-1.5"
                >
                  <span>Home</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="text-brand-warmCream/80 hover:text-brand-goldenYellow transition-colors flex items-center gap-1.5"
                >
                  <span>About Us</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="text-brand-warmCream/80 hover:text-brand-goldenYellow transition-colors flex items-center gap-1.5"
                >
                  <span>Our Services</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="text-brand-warmCream/80 hover:text-brand-goldenYellow transition-colors flex items-center gap-1.5"
                >
                  <span>Contact Us</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="text-brand-burntOrange hover:text-brand-goldenYellow font-bold transition-colors flex items-center gap-1"
                >
                  <span>Order Now</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Opening Hours */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-heading font-black text-sm uppercase tracking-wider text-brand-goldenYellow border-b border-brand-goldenYellow/20 pb-2">
              Opening Hours
            </h4>
            <div className="space-y-2 text-xs">
              {RESTAURANT_INFO.openingHours.map((slot, index) => (
                <div key={index} className="flex flex-col py-1 border-b border-white/5">
                  <span className="text-brand-warmCream/70 font-light">{slot.days}</span>
                  <span className="font-semibold text-brand-goldenYellow">{slot.hours}</span>
                </div>
              ))}
            </div>
            <div className="pt-2 text-xs text-brand-warmCream/60 italic">
              * Kitchen last order 30 minutes before closing.
            </div>
          </div>

          {/* Col 4: Contact & Newsletter */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-heading font-black text-sm uppercase tracking-wider text-brand-goldenYellow border-b border-brand-goldenYellow/20 pb-2">
              Contact & Location
            </h4>
            <div className="space-y-2 text-xs text-brand-warmCream/85">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-brand-goldenYellow shrink-0 mt-0.5" />
                <span>{RESTAURANT_INFO.addressDisplay}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-brand-goldenYellow shrink-0" />
                <a href={`tel:${RESTAURANT_INFO.phone}`} className="hover:text-brand-goldenYellow transition-colors">
                  {RESTAURANT_INFO.phoneDisplay}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand-goldenYellow shrink-0" />
                <a href={`mailto:${RESTAURANT_INFO.email}`} className="hover:text-brand-goldenYellow transition-colors break-all">
                  {RESTAURANT_INFO.email}
                </a>
              </div>
            </div>

            {/* Newsletter input */}
            <form onSubmit={handleSubscribe} className="pt-3 space-y-2">
              <label className="text-[11px] font-bold text-brand-goldenYellow uppercase tracking-wider block">
                VIP Culinary Club
              </label>
              <div className="flex items-center">
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="Enter your email..."
                  className="w-full px-3 py-2 text-xs rounded-l-xl bg-brand-surfaceCard border border-brand-goldenYellow/30 text-brand-warmCream placeholder-brand-warmCream/40 focus:outline-none focus:border-brand-goldenYellow"
                />
                <button
                  type="submit"
                  className="px-3.5 py-2 rounded-r-xl bg-gradient-to-r from-brand-goldenYellow to-brand-burntOrange text-brand-charcoal hover:opacity-90 font-bold transition-opacity"
                  aria-label="Subscribe"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </div>

        </div>

        {/* Bottom Credits & Placeholder Notice */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-brand-warmCream/60 gap-4">
          <p>© {new Date().getFullYear()} Pretodan Restaurant. All Rights Reserved. Continental Fine Dining.</p>
          <p className="italic text-[11px] text-brand-warmCream/50">
            * Business address and contact details shown are editable placeholders.
          </p>
        </div>
      </div>
    </footer>
  );
};
