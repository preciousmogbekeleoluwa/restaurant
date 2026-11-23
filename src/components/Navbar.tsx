import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { PageRoute } from '../types';
import { useCart } from '../context/CartContext';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { ShoppingBag, MessageCircle, Menu, X, ArrowUpRight, PhoneCall } from 'lucide-react';

interface NavbarProps {
  currentPage: PageRoute;
  onNavigate: (page: PageRoute) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalItems, setIsCartOpen } = useCart();

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
            ? 'glass-burgundy shadow-2xl py-3 border-b border-brand-goldenYellow/20'
            : 'bg-gradient-to-b from-brand-charcoal/95 via-brand-charcoal/60 to-transparent py-4 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Pretodan Restaurant Logo / Wordmark */}
            <button
              onClick={() => handleNavClick('home')}
              className="group text-left transition-transform duration-200 active:scale-95"
              aria-label="Pretodan Restaurant Home"
            >
              <Logo className="h-10 sm:h-12" />
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 bg-brand-surfaceCard/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-brand-goldenYellow/20 shadow-inner">
              {navLinks.map((link) => {
                const isActive = currentPage === link.page;
                return (
                  <button
                    key={link.page}
                    onClick={() => handleNavClick(link.page)}
                    className={`relative px-4 py-2 rounded-full font-heading text-sm font-bold transition-all duration-200 ${
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

            {/* Right: Actions */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              {/* WhatsApp Quick Order button */}
              <a
                href={RESTAURANT_INFO.socials.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden lg:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-emerald-950/70 border border-emerald-500/40 text-emerald-400 hover:bg-emerald-900/60 transition-colors text-xs font-semibold"
                title="Chat with us on WhatsApp"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp</span>
              </a>

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

              {/* Prominent Order Now CTA Desktop */}
              <button
                onClick={() => handleNavClick('services')}
                className="hidden sm:inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-heading font-black text-sm tracking-wide bg-gradient-to-r from-brand-goldenYellow via-brand-burntOrange to-brand-goldenYellow text-brand-charcoal shadow-glow-yellow hover:scale-105 active:scale-95 transition-all duration-200"
              >
                <span>Order Now</span>
                <ArrowUpRight className="w-4 h-4 text-brand-charcoal" />
              </button>

              {/* Mobile Hamburger Navigation Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-xl bg-brand-surfaceCard border border-brand-goldenYellow/25 text-brand-goldenYellow hover:bg-brand-burntOrange hover:text-white transition-colors"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden bg-brand-charcoal/80 backdrop-blur-xl animate-fade-scale">
          <div className="flex flex-col h-full p-6 justify-between max-w-sm ml-auto bg-gradient-to-b from-brand-surfaceCard via-brand-charcoal to-brand-surfaceCard border-l border-brand-goldenYellow/20 shadow-2xl">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-brand-goldenYellow/20">
                <Logo className="h-10" />
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-full bg-brand-charcoal text-brand-goldenYellow hover:bg-brand-burntOrange hover:text-white"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Mobile Links */}
              <div className="flex flex-col space-y-2.5 mt-6">
                {navLinks.map((link) => {
                  const isActive = currentPage === link.page;
                  return (
                    <button
                      key={link.page}
                      onClick={() => handleNavClick(link.page)}
                      className={`flex items-center justify-between px-4 py-3.5 rounded-xl text-left font-heading text-lg font-bold transition-all ${
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
            </div>

            {/* Mobile Drawer Bottom Info */}
            <div className="pt-6 border-t border-brand-goldenYellow/20 space-y-3">
              <button
                onClick={() => { setIsCartOpen(true); setMobileMenuOpen(false); }}
                className="w-full py-3 px-4 rounded-xl flex items-center justify-center gap-2 bg-gradient-to-r from-brand-goldenYellow to-brand-burntOrange text-brand-charcoal font-black text-sm shadow-glow-yellow"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>View Cart ({totalItems} items)</span>
              </button>

              <a
                href={RESTAURANT_INFO.socials.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                <span>WhatsApp Ordering</span>
              </a>

              <a
                href={`tel:${RESTAURANT_INFO.phone}`}
                className="w-full py-3 px-4 rounded-xl flex items-center justify-center gap-2 bg-brand-surfaceCard border border-brand-goldenYellow/30 text-brand-goldenYellow font-bold text-sm hover:bg-brand-burntOrange hover:text-white transition-colors"
              >
                <PhoneCall className="w-5 h-5" />
                <span>Call Us ({RESTAURANT_INFO.phoneDisplay})</span>
              </a>

              <div className="text-center text-xs text-brand-warmCream/60 pt-1">
                {RESTAURANT_INFO.addressDisplay}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
