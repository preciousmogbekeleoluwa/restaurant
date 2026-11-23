import React, { useState, useEffect, useRef } from 'react';
import { HERO_SLIDES, RESTAURANT_INFO } from '../data/restaurantData';
import { PageRoute } from '../types';
import { useCart } from '../context/CartContext';
import { DrippingSauceHeader } from './DrippingSauceHeader';
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight, Utensils, Pause, Play, ShoppingBag } from 'lucide-react';

interface HeroSliderProps {
  onNavigate: (page: PageRoute) => void;
}

export const HeroSlider: React.FC<HeroSliderProps> = ({ onNavigate }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const { setIsCartOpen } = useCart();
  const slideDuration = 6500; // 6.5s comfortable interval
  const timerRef = useRef<number | null>(null);

  const totalSlides = HERO_SLIDES.length;

  // Handle slide transitions & live progress indicator
  useEffect(() => {
    if (isPaused) return;

    setProgress(0);
    const interval = 50; // update progress every 50ms
    const step = (100 * interval) / slideDuration;

    timerRef.current = window.setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          triggerNextSlide();
          return 0;
        }
        return prev + step;
      });
    }, interval);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentSlide, isPaused, totalSlides]);

  const triggerNextSlide = () => {
    setIsAnimating(true);
    setCurrentSlide((curr) => (curr + 1) % totalSlides);
    setProgress(0);
    setTimeout(() => setIsAnimating(false), 900);
  };

  const triggerPrevSlide = () => {
    setIsAnimating(true);
    setCurrentSlide((curr) => (curr - 1 + totalSlides) % totalSlides);
    setProgress(0);
    setTimeout(() => setIsAnimating(false), 900);
  };

  const goToSlide = (index: number) => {
    if (index === currentSlide) return;
    setIsAnimating(true);
    setCurrentSlide(index);
    setProgress(0);
    setTimeout(() => setIsAnimating(false), 900);
  };

  const handleAction = (action: string) => {
    if (action === 'order') {
      setIsCartOpen(true);
    } else if (action === 'menu' || action === 'services') {
      onNavigate('services');
    } else if (action === 'about') {
      onNavigate('about');
    } else if (action === 'contact') {
      onNavigate('contact');
    }
  };

  const active = HERO_SLIDES[currentSlide];

  return (
    <section
      className="relative w-full min-h-[92vh] lg:min-h-screen flex items-center justify-center overflow-hidden bg-brand-charcoal pt-24 pb-16 lg:py-0 select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Pretodan Restaurant Featured Highlights"
    >
      {/* Signature dripping sauce header at the top edge mirroring menu flyer */}
      <div className="absolute top-0 left-0 right-0 z-20">
        <DrippingSauceHeader />
      </div>

      {/* Multi-layered cinematic background images with Ken Burns zoom & pan effect */}
      {HERO_SLIDES.map((slide, index) => {
        const isCurrent = index === currentSlide;
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isCurrent ? 'opacity-100 z-0' : 'opacity-0 -z-10 pointer-events-none'
            }`}
          >
            <img
              src={slide.heroImage}
              alt={slide.headline}
              className={`w-full h-full object-cover object-center filter brightness-[0.38] contrast-110 transition-transform duration-[7500ms] ease-out ${
                isCurrent ? 'scale-110 translate-x-1.5 translate-y-1' : 'scale-100'
              }`}
            />
            {/* Dark gradient vignettes for pristine text contrast */}
            <div className="absolute inset-0 bg-hero-vignette opacity-90" />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal via-transparent to-brand-charcoal/70" />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-charcoal/90 via-brand-charcoal/40 to-transparent" />
          </div>
        );
      })}

      {/* Subtle radial golden glow in center */}
      <div className="absolute inset-0 bg-radial-glow pointer-events-none opacity-60 z-0" />

      {/* Main Slide Content: Staggered Entrance Animations (Slider Revolution Style) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Text Column: Staggered entrance */}
          <div className="lg:col-span-8 text-center lg:text-left space-y-6">
            
            {/* Tagline Badge */}
            <div
              key={`tagline-${currentSlide}`}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-surfaceCard/90 border border-brand-goldenYellow/40 text-brand-goldenYellow text-xs font-bold uppercase tracking-widest shadow-glow-yellow animate-slide-up"
            >
              <Sparkles className="w-3.5 h-3.5 text-brand-goldenYellow animate-spin-slow" />
              <span>{active.tagline}</span>
            </div>

            {/* Main Headline */}
            <h1
              key={`headline-${currentSlide}`}
              className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-wide uppercase text-gradient-fiery font-black leading-[0.98] drop-shadow-2xl animate-slide-up [animation-delay:150ms]"
            >
              {active.headline}
            </h1>

            {/* Description Subtext */}
            <p
              key={`desc-${currentSlide}`}
              className="text-base sm:text-xl lg:text-2xl text-brand-warmCream/90 font-light max-w-2xl leading-relaxed mx-auto lg:mx-0 animate-slide-up [animation-delay:300ms]"
            >
              {active.description}
            </p>

            {/* Call To Action Buttons */}
            <div
              key={`cta-${currentSlide}`}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4 animate-slide-up [animation-delay:450ms]"
            >
              {/* Primary CTA */}
              <button
                onClick={() => handleAction(active.primaryBtnAction)}
                className="group relative px-8 py-4 rounded-full font-heading font-black text-sm uppercase tracking-wider bg-gradient-to-r from-brand-goldenYellow via-brand-burntOrange to-brand-goldenYellow bg-[length:200%_auto] hover:bg-right text-brand-charcoal shadow-glow-yellow transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2"
              >
                <span>{active.primaryBtnText}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Secondary CTA */}
              <button
                onClick={() => handleAction(active.secondaryBtnAction)}
                className="px-7 py-4 rounded-full font-heading font-bold text-sm uppercase tracking-wider bg-brand-surfaceCard/80 hover:bg-brand-burntOrange/20 border-2 border-brand-goldenYellow text-brand-goldenYellow hover:text-white transition-all duration-200 hover:scale-105 active:scale-95 flex items-center gap-2 backdrop-blur-sm shadow-md"
              >
                {active.secondaryBtnAction === 'order' ? (
                  <ShoppingBag className="w-4 h-4 text-brand-goldenYellow" />
                ) : (
                  <Utensils className="w-4 h-4 text-brand-goldenYellow" />
                )}
                <span>{active.secondaryBtnText}</span>
              </button>
            </div>

            {/* Quick Selling Points Row */}
            <div className="pt-6 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-brand-warmCream/75 font-sans border-t border-brand-goldenYellow/15">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brand-goldenYellow shadow-glow-yellow animate-ping" />
                <span>100% Fresh Daily Ingredients</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brand-burntOrange shadow-glow-orange" />
                <span>Award-Winning Executive Chefs</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brand-goldenYellow shadow-glow-yellow" />
                <span>Continental Fine Dining</span>
              </div>
            </div>

          </div>

          {/* Right Column: Circular Floating Plate Badge (inspired by reference menu image) */}
          <div className="hidden lg:flex lg:col-span-4 justify-center items-center relative">
            <div className="relative w-80 h-80">
              {/* Outer Glowing Rings */}
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-brand-goldenYellow/40 animate-spin-slow" />
              <div className="absolute -inset-4 rounded-full bg-gradient-to-tr from-brand-burntOrange/20 via-brand-goldenYellow/10 to-transparent blur-xl" />
              
              {/* Circular Dish Frame matching menu card */}
              <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-brand-goldenYellow shadow-2xl group cursor-pointer"
                   onClick={() => handleAction('menu')}>
                <img
                  src={active.heroImage}
                  alt={active.headline}
                  className="w-full h-full object-cover group-hover:scale-115 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/80 via-transparent to-transparent" />
                
                {/* Floating Price/Badge Tag on Plate */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-brand-charcoal/90 border border-brand-goldenYellow text-center shadow-lg whitespace-nowrap">
                  <span className="font-display text-sm tracking-wider text-brand-goldenYellow font-bold block">
                    {active.floatingBadgeText}
                  </span>
                  <span className="text-[10px] text-brand-warmCream uppercase tracking-widest font-sans font-semibold">
                    {active.badgeDiscount}
                  </span>
                </div>
              </div>

              {/* Decorative culinary badge */}
              <div className="absolute -top-3 -right-3 w-16 h-16 rounded-full bg-gradient-to-br from-brand-burntOrange to-brand-goldenYellow text-brand-charcoal font-black flex flex-col items-center justify-center shadow-glow-orange animate-float-slow">
                <span className="text-[10px] font-bold uppercase leading-none">PREMIUM</span>
                <span className="text-xs font-display font-black leading-none mt-0.5">DINING</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Slider Controls: Arrow Navigation */}
      <button
        onClick={triggerPrevSlide}
        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 p-3 sm:p-3.5 rounded-full bg-brand-surfaceCard/70 hover:bg-brand-burntOrange text-brand-goldenYellow hover:text-white border border-brand-goldenYellow/30 backdrop-blur-md transition-all duration-200 active:scale-95 shadow-xl hover:scale-110"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      <button
        onClick={triggerNextSlide}
        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 p-3 sm:p-3.5 rounded-full bg-brand-surfaceCard/70 hover:bg-brand-burntOrange text-brand-goldenYellow hover:text-white border border-brand-goldenYellow/30 backdrop-blur-md transition-all duration-200 active:scale-95 shadow-xl hover:scale-110"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Bottom Slider Indicators & Controls Bar */}
      <div className="absolute bottom-6 left-0 right-0 z-20">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between sm:justify-center gap-6">
          
          {/* Pause / Play Toggle for Accessibility & Reduced Motion */}
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="p-2 rounded-full bg-brand-surfaceCard/60 hover:bg-brand-surfaceCard border border-brand-goldenYellow/25 text-brand-goldenYellow text-xs transition-colors"
            aria-label={isPaused ? "Play slideshow" : "Pause slideshow"}
            title={isPaused ? "Resume auto-rotation" : "Pause auto-rotation"}
          >
            {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
          </button>

          {/* Interactive Slide Progress Indicators */}
          <div className="flex items-center gap-3">
            {HERO_SLIDES.map((slide, idx) => {
              const isCurrent = idx === currentSlide;
              return (
                <button
                  key={slide.id}
                  onClick={() => goToSlide(idx)}
                  className="group relative flex items-center gap-2 py-2"
                  aria-label={`Go to slide ${idx + 1}: ${slide.headline}`}
                >
                  <div
                    className={`h-2.5 rounded-full transition-all duration-300 relative overflow-hidden ${
                      isCurrent ? 'w-16 sm:w-24 bg-brand-surfaceCard border border-brand-goldenYellow/50' : 'w-3 sm:w-4 bg-brand-warmCream/25 hover:bg-brand-goldenYellow/60'
                    }`}
                  >
                    {isCurrent && (
                      <div
                        className="h-full bg-gradient-to-r from-brand-goldenYellow to-brand-burntOrange transition-all duration-75"
                        style={{ width: `${progress}%` }}
                      />
                    )}
                  </div>
                  <span
                    className={`text-[11px] font-mono font-bold transition-colors ${
                      isCurrent ? 'text-brand-goldenYellow' : 'text-brand-warmCream/40 group-hover:text-brand-warmCream'
                    }`}
                  >
                    0{idx + 1}
                  </span>
                </button>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};
