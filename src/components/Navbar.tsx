import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { PageRoute, CurrencyCode } from '../types';
import { useCart } from '../context/CartContext';
import { RESTAURANT_INFO } from '../data/restaurantData';
import {
  ShoppingBag,
  MessageCircle,
  Menu,
  X,
  ArrowUpRight,
  PhoneCall,
  Calendar,
  Truck,
  Crown,
  Heart,
  Globe
} from 'lucide-react';

interface NavbarProps {
  currentPage: PageRoute;
  onNavigate: (page: PageRoute) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);

  const {
    totalItems,
    setIsCartOpen,
    currency,
    setCurrency,
    favorites,
    setIsReservationOpen,
    setIsTrackingOpen,
    setIsVipOpen
  } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { label: string; page: PageRoute }[] = [
    { label: 'Home', page: 'home' },
    { label: 'About Us', page: 'about' },
    { label: 'Our Services', page: 'services' },
    { label: 'Contact Us', page: 'contact' },
  ];

  const currencies: { code: CurrencyCode; label: string; symbol: string }[] = [
    { code: 'USD', label: 'USD ($)', symbol: '$' },
    { code: 'EUR', label: 'EUR (€)', symbol: '€' },
    { code: 'GBP', label: 'GBP (£)', symbol: '£' },
    { code: 'NGN', label: 'NGN (₦)', symbol: '₦' },
  ];

  const handleNavClick = (page: PageRoute) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'glass-burgundy shadow-2xl py-2.5 sm:py-3 border-b border-brand-goldenYellow/20'
            : 'bg-gradient-to-b from-brand-charcoal/95 via-brand-charcoal/60 to-transparent py-3.5 sm:py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Pretodan Restaurant Logo / Wordmark */}
            <button
              onClick={() => handleNavClick('home')}
              className="group text-left transition-transform duration-200 active:scale-95 shrink-0"
              aria-label="Pretodan Restaurant Home"
            >
              <Logo className="h-9 sm:h-11" />
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-1 bg-brand-surfaceCard/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-brand-goldenYellow/20 shadow-inner">
              {navLinks.map((link) => {
                const isActive = currentPage === link.page;
                return (
                  <button
                    key={link.page}
                    onClick={() => handleNavClick(link.page)}
                    className={`relative px-4 py-1.5 rounded-full font-heading text-xs uppercase tracking-wider font-bold transition-all duration-200 ${
                      isActive
                        ? 'text-brand-charcoal bg-gradient-to-r from-brand-goldenYellow to-brand-burntOrange shadow-glow-yellow'
                        : 'text-brand-warmCream/80 hover:text-brand-goldenYellow hover:bg-white/5'
                    }`}
                  >
                    {link.label}
                  </button>
                );
              })}
            </nav>

            {/* Right Web App Actions Bar */}
            <div className="flex items-center space-x-2 sm:space-x-2.5">
              
              {/* Currency Selector Pill */}
              <div className="relative hidden sm:block">
                <button
                  onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
                  className="px-2.5 py-1.5 rounded-full bg-brand-surfaceCard border border-brand-goldenYellow/25 hover:border-brand-goldenYellow text-brand-goldenYellow text-xs font-mono font-bold flex items-center gap-1 transition-colors"
                  title="Switch Currency"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>{currency}</span>
                </button>

                {currencyDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-32 rounded-2xl bg-brand-surfaceCard border border-brand-goldenYellow/30 shadow-2xl p-1 z-50 animate-fade-scale">
                    {currencies.map((curr) => (
                      <button
                        key={curr.code}
                        onClick={() => { setCurrency(curr.code); setCurrencyDropdownOpen(false); }}
                        className={`w-full px-3 py-1.5 rounded-xl text-left text-xs font-mono font-bold flex items-center justify-between transition-colors ${
                          currency === curr.code
                            ? 'bg-gradient-to-r from-brand-goldenYellow to-brand-burntOrange text-brand-charcoal'
                            : 'text-brand-warmCream hover:bg-white/5'
                        }`}
                      >
                        <span>{curr.code}</span>
                        <span>{curr.symbol}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Table Booking Concierge Button (Desktop) */}
              <button
                onClick={() => setIsReservationOpen(true)}
                className="hidden xl:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-brand-surfaceCard hover:bg-brand-burntOrange/20 border border-brand-goldenYellow/30 hover:border-brand-goldenYellow text-brand-goldenYellow text-xs font-heading font-bold uppercase tracking-wider transition-all"
                title="Book a Table"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Reserve Table</span>
              </button>

              {/* Live Order Tracker Trigger (Desktop) */}
              <button
                onClick={() => setIsTrackingOpen(true)}
                className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-brand-surfaceCard hover:bg-brand-surfaceMuted border border-brand-goldenYellow/20 hover:border-brand-goldenYellow text-brand-warmCream hover:text-brand-goldenYellow text-xs font-heading font-medium transition-colors"
                title="Track Live Order"
              >
                <Truck className="w-3.5 h-3.5 text-brand-goldenYellow" />
                <span>Track</span>
              </button>

              {/* VIP Club Modal Trigger */}
              <button
                onClick={() => setIsVipOpen(true)}
                className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-brand-surfaceCard hover:bg-brand-burntOrange/20 border border-brand-goldenYellow/25 hover:border-brand-goldenYellow text-brand-goldenYellow text-xs font-heading font-bold transition-all"
                title="VIP Club Rewards"
              >
                <Crown className="w-3.5 h-3.5" />
                <span>VIP Club</span>
              </button>

              {/* Favorites Counter Badge (Desktop) */}
              {favorites.length > 0 && (
                <button
                  onClick={() => handleNavClick('services')}
                  className="hidden sm:inline-flex items-center justify-center p-2 rounded-full bg-brand-surfaceCard border border-brand-goldenYellow/25 hover:border-brand-goldenYellow text-brand-burntOrange hover:text-white transition-colors relative"
                  title={`${favorites.length} Favorite Dishes`}
                >
                  <Heart className="w-4 h-4 fill-brand-burntOrange" />
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-brand-goldenYellow text-brand-charcoal text-[10px] font-bold flex items-center justify-center">
                    {favorites.length}
                  </span>
                </button>
              )}

              {/* Shopping Cart Drawer Trigger */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2.5 rounded-full bg-brand-surfaceCard border border-brand-goldenYellow/25 hover:border-brand-goldenYellow text-brand-goldenYellow hover:text-white transition-all duration-200 active:scale-95 shadow-md"
                aria-label={`View shopping cart with ${totalItems} items`}
              >
                <ShoppingBag className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 min-w-[20px] h-[20px] px-1 bg-gradient-to-r from-brand-burntOrange to-brand-goldenYellow text-brand-charcoal text-[11px] font-black rounded-full flex items-center justify-center animate-bounce shadow-glow-orange">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* Prominent Order Now CTA */}
              <button
                onClick={() => handleNavClick('services')}
                className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-heading font-black text-xs uppercase tracking-wider bg-gradient-to-r from-brand-goldenYellow via-brand-burntOrange to-brand-goldenYellow text-brand-charcoal shadow-glow-yellow hover:scale-105 active:scale-95 transition-all duration-200"
              >
                <span>Order Now</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-brand-charcoal" />
              </button>

              {/* Mobile Hamburger Navigation Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl bg-brand-surfaceCard border border-brand-goldenYellow/25 text-brand-goldenYellow hover:bg-brand-burntOrange hover:text-white transition-colors"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden bg-brand-charcoal/80 backdrop-blur-xl animate-fade-scale">
          <div className="flex flex-col h-full p-6 justify-between max-w-sm ml-auto bg-gradient-to-b from-brand-surfaceCard via-brand-charcoal to-brand-surfaceCard border-l border-brand-goldenYellow/20 shadow-2xl overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-5 border-b border-brand-goldenYellow/20">
                <Logo className="h-10" />
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-full bg-brand-charcoal text-brand-goldenYellow hover:bg-brand-burntOrange hover:text-white"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Currency Selector inside Mobile Drawer */}
              <div className="pt-4 flex items-center justify-between pb-3 border-b border-brand-goldenYellow/15 text-xs">
                <span className="text-brand-warmCream/70 flex items-center gap-1.5 font-bold uppercase tracking-wider text-[11px]">
                  <Globe className="w-3.5 h-3.5 text-brand-goldenYellow" />
                  <span>Currency:</span>
                </span>
                <div className="flex gap-1">
                  {currencies.map((curr) => (
                    <button
                      key={curr.code}
                      onClick={() => setCurrency(curr.code)}
                      className={`px-2 py-1 rounded-lg text-xs font-mono font-bold transition-colors ${
                        currency === curr.code
                          ? 'bg-gradient-to-r from-brand-goldenYellow to-brand-burntOrange text-brand-charcoal'
                          : 'bg-brand-charcoal border border-brand-goldenYellow/20 text-brand-warmCream'
                      }`}
                    >
                      {curr.code}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile Page Links */}
              <div className="flex flex-col space-y-2 mt-4">
                {navLinks.map((link) => {
                  const isActive = currentPage === link.page;
                  return (
                    <button
                      key={link.page}
                      onClick={() => handleNavClick(link.page)}
                      className={`flex items-center justify-between px-4 py-3 rounded-xl text-left font-heading text-base font-bold transition-all ${
                        isActive
                          ? 'bg-gradient-to-r from-brand-goldenYellow to-brand-burntOrange text-brand-charcoal shadow-glow-yellow'
                          : 'text-brand-warmCream hover:bg-white/5 hover:text-brand-goldenYellow'
                      }`}
                    >
                      <span>{link.label}</span>
                      <ArrowUpRight className="w-4 h-4 opacity-70" />
                    </button>
                  );
                })}
              </div>

              {/* Web App Quick Actions (Reservation, Track, VIP Club) */}
              <div className="pt-4 mt-4 border-t border-brand-goldenYellow/15 space-y-2">
                <button
                  onClick={() => { setIsReservationOpen(true); setMobileMenuOpen(false); }}
                  className="w-full py-2.5 px-4 rounded-xl flex items-center justify-between bg-brand-charcoal border border-brand-goldenYellow/30 text-brand-goldenYellow text-xs font-bold font-heading uppercase tracking-wider"
                >
                  <span className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>Reserve a Table</span>
                  </span>
                  <span>Book</span>
                </button>

                <button
                  onClick={() => { setIsTrackingOpen(true); setMobileMenuOpen(false); }}
                  className="w-full py-2.5 px-4 rounded-xl flex items-center justify-between bg-brand-charcoal border border-brand-goldenYellow/20 text-brand-warmCream text-xs font-heading font-medium"
                >
                  <span className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-brand-goldenYellow" />
                    <span>Live Order Tracker</span>
                  </span>
                  <span>Track</span>
                </button>

                <button
                  onClick={() => { setIsVipOpen(true); setMobileMenuOpen(false); }}
                  className="w-full py-2.5 px-4 rounded-xl flex items-center justify-between bg-brand-charcoal border border-brand-goldenYellow/20 text-brand-goldenYellow text-xs font-heading font-bold"
                >
                  <span className="flex items-center gap-2">
                    <Crown className="w-4 h-4" />
                    <span>VIP Loyalty Club</span>
                  </span>
                  <span>Perks</span>
                </button>
              </div>
            </div>

            {/* Mobile Drawer Bottom Info */}
            <div className="pt-5 border-t border-brand-goldenYellow/20 space-y-2.5">
              <button
                onClick={() => { setIsCartOpen(true); setMobileMenuOpen(false); }}
                className="w-full py-3 px-4 rounded-xl flex items-center justify-center gap-2 bg-gradient-to-r from-brand-goldenYellow to-brand-burntOrange text-brand-charcoal font-black text-xs uppercase tracking-wider shadow-glow-yellow"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>View Cart ({totalItems} items)</span>
              </button>

              <a
                href={RESTAURANT_INFO.socials.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Ordering</span>
              </a>

              <a
                href={`tel:${RESTAURANT_INFO.phone}`}
                className="w-full py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 bg-brand-surfaceCard border border-brand-goldenYellow/30 text-brand-goldenYellow font-bold text-xs hover:bg-brand-burntOrange hover:text-white transition-colors"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Call Us ({RESTAURANT_INFO.phoneDisplay})</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
