import React from 'react';
import { PageRoute } from '../types';
import { RESTAURANT_INFO, WHY_CHOOSE_US } from '../data/restaurantData';
import { DrippingSauceHeader } from '../components/DrippingSauceHeader';
import { Sparkles, Flame, ChefHat, Heart, Award, CheckCircle2, ArrowRight, MessageCircle, Utensils, ShieldCheck, HeartHandshake, ShoppingBag } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: PageRoute) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-brand-charcoal text-brand-warmCream pt-20">
      
      {/* 1. Page Hero / Banner */}
      <section className="relative py-24 sm:py-32 overflow-hidden bg-gradient-to-b from-brand-charcoal via-brand-surfaceCard to-brand-charcoal border-b border-brand-goldenYellow/20">
        <div className="absolute top-0 left-0 right-0 z-20">
          <DrippingSauceHeader />
        </div>

        {/* Background Image with Cinematic Filter */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80"
            alt="Pretodan Restaurant Dining Hall"
            className="w-full h-full object-cover filter brightness-[0.22] contrast-125"
          />
          <div className="absolute inset-0 bg-radial-glow opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal via-transparent to-brand-charcoal/80" />
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-surfaceCard/90 border border-brand-goldenYellow/40 text-brand-goldenYellow text-xs font-bold uppercase tracking-widest shadow-glow-yellow">
            <Sparkles className="w-4 h-4 text-brand-goldenYellow" />
            <span>The Pretodan Heritage</span>
          </div>

          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl uppercase text-gradient-fiery tracking-wider font-black leading-tight text-shadow-3d">
            CULINARY EXCELLENCE. TIMELESS HOSPITALITY.
          </h1>

          <p className="text-base sm:text-xl text-brand-warmCream/90 font-light max-w-3xl mx-auto leading-relaxed">
            Welcome to PRETODAN RESTAURANT, where culinary mastery meets unforgettable hospitality. We are dedicated to the art of fine continental dining, fresh premium ingredients, and memories that linger long after the last bite.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('services')}
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-brand-goldenYellow to-brand-burntOrange text-brand-charcoal font-heading font-black text-sm uppercase tracking-wider shadow-glow-yellow hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Explore Our Menu</span>
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="px-7 py-3.5 rounded-full bg-brand-surfaceCard border-2 border-brand-goldenYellow text-brand-goldenYellow hover:bg-brand-burntOrange hover:text-white font-heading font-bold text-sm uppercase tracking-wider transition-all flex items-center gap-2"
            >
              <span>Contact Us</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 2. Restaurant Introduction & Our Story */}
      <section className="py-24 bg-brand-charcoal relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Editorial Story */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-goldenYellow block">
                Heritage & Dedication
              </span>
              <h2 className="font-display text-4xl sm:text-5xl uppercase text-gradient-fiery tracking-wide font-black">
                OUR STORY: BORN OF FLAVOUR & PASSION
              </h2>
              <p className="text-sm sm:text-base text-brand-warmCream/90 font-light leading-relaxed">
                Pretodan Restaurant emerged from a passionate pursuit of culinary distinction. We envisioned a vibrant, sophisticated dining haven where guests could escape into extraordinary continental flavours, refined technique, and the genuine warmth of heartfelt hospitality.
              </p>
              <p className="text-sm sm:text-base text-brand-warmCream/80 font-light leading-relaxed">
                Continental cuisine is an art form rooted in balance, richness, and precision. From our flame-grilled chicken dishes basted in fresh herb jus, to tender aged ribeyes, hand-rolled pastas, and Mediterranean seafood paellas, every single recipe honors culinary traditions while introducing bold, modern twists that excite today's discerning palate.
              </p>
              <p className="text-xs sm:text-sm text-brand-warmCream/60 italic border-l-2 border-brand-goldenYellow pl-4">
                Note: Exact founding timeline and corporate milestones remain fully configurable to match the restaurant owner’s official business history.
              </p>
            </div>

            {/* Visual Collage Side */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-3xl overflow-hidden border-2 border-brand-goldenYellow/30 shadow-2xl group">
                <img
                  src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80"
                  alt="Pretodan Restaurant Culinary Art"
                  className="w-full h-[440px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal via-transparent to-transparent pointer-events-none" />
              </div>
              <div className="absolute -bottom-6 -left-6 p-5 rounded-2xl bg-brand-surfaceCard border border-brand-goldenYellow text-brand-goldenYellow font-heading font-black text-xs uppercase tracking-wider shadow-glow-yellow">
                Continental Cuisine • Executive Chefs
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Our Mission & Vision */}
      <section className="py-20 bg-gradient-to-b from-brand-charcoal via-brand-surfaceCard to-brand-charcoal border-y border-brand-goldenYellow/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Our Mission */}
            <div className="p-8 sm:p-10 rounded-3xl bg-brand-charcoal/80 border border-brand-goldenYellow/25 shadow-xl space-y-4 hover:border-brand-goldenYellow transition-colors group">
              <div className="w-14 h-14 rounded-2xl bg-brand-surfaceCard border border-brand-goldenYellow/40 flex items-center justify-center text-brand-goldenYellow group-hover:scale-110 transition-transform">
                <ChefHat className="w-7 h-7" />
              </div>
              <h3 className="font-display text-3xl uppercase text-gradient-gold tracking-wide font-black">
                OUR MISSION
              </h3>
              <p className="text-sm sm:text-base text-brand-warmCream/85 font-light leading-relaxed">
                To consistently craft and serve extraordinary continental cuisine using only the freshest, high-grade ingredients; to elevate every dining occasion through attentive, graceful hospitality; and to ensure every guest departs enriched, satisfied, and eager to return.
              </p>
            </div>

            {/* Our Vision */}
            <div className="p-8 sm:p-10 rounded-3xl bg-brand-charcoal/80 border border-brand-goldenYellow/25 shadow-xl space-y-4 hover:border-brand-goldenYellow transition-colors group">
              <div className="w-14 h-14 rounded-2xl bg-brand-surfaceCard border border-brand-goldenYellow/40 flex items-center justify-center text-brand-burntOrange group-hover:scale-110 transition-transform">
                <Sparkles className="w-7 h-7" />
              </div>
              <h3 className="font-display text-3xl uppercase text-gradient-gold tracking-wide font-black">
                OUR VISION
              </h3>
              <p className="text-sm sm:text-base text-brand-warmCream/85 font-light leading-relaxed">
                To be widely recognized as a premier continental dining institution known for culinary innovation, immaculate presentation, and hospitable warmth — setting the benchmark for restaurant excellence, private dining, and bespoke catering.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Our Commitment to Quality */}
      <section className="py-24 bg-brand-charcoal relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Visual Photography Side */}
            <div className="lg:col-span-6 relative order-2 lg:order-1">
              <div className="relative rounded-3xl overflow-hidden border-2 border-brand-goldenYellow/30 shadow-2xl group">
                <img
                  src="https://images.unsplash.com/photo-1527477396000-e27163b481c2?auto=format&fit=crop&w=800&q=80"
                  alt="Pretodan Restaurant Signature Platter"
                  className="w-full h-[440px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal via-transparent to-transparent pointer-events-none" />
              </div>
            </div>

            {/* Content Side */}
            <div className="lg:col-span-6 space-y-6 order-1 lg:order-2">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-burntOrange block">
                The Gold Standard
              </span>
              <h2 className="font-display text-4xl sm:text-5xl uppercase text-gradient-fiery tracking-wide font-black">
                OUR COMMITMENT TO QUALITY
              </h2>
              <div className="space-y-4 text-sm sm:text-base text-brand-warmCream/85">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-brand-goldenYellow/20 border border-brand-goldenYellow flex items-center justify-center text-brand-goldenYellow flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-brand-goldenYellow block font-heading">Cooked Fresh, Never Pre-Packaged:</strong>
                    We prepare every order from scratch upon receiving it. Our poultry and steaks are marinated and flame-seared in real-time, our pastas tossed in reduction sauces, and our herbs cut fresh each morning.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-brand-goldenYellow/20 border border-brand-goldenYellow flex items-center justify-center text-brand-goldenYellow flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-brand-goldenYellow block font-heading">Sustainably Sourced Ingredients:</strong>
                    We partner with certified farms and ethical suppliers to source free-range chicken, dry-aged beef cuts, wild Atlantic seafood, and crisp organic vegetables.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-brand-goldenYellow/20 border border-brand-goldenYellow flex items-center justify-center text-brand-goldenYellow flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-brand-goldenYellow block font-heading">Executive Kitchen Hygiene:</strong>
                    Our culinary brigade operates under the most stringent international hygiene and sanitation protocols, ensuring pristine safety in every preparation step.
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. Our Core Values Grid */}
      <section className="py-20 bg-gradient-to-b from-brand-charcoal via-brand-surfaceCard to-brand-charcoal border-t border-brand-goldenYellow/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-goldenYellow block">
              Guiding Principles
            </span>
            <h2 className="font-display text-4xl sm:text-5xl uppercase text-gradient-fiery tracking-wide font-black">
              OUR CORE VALUES
            </h2>
            <p className="text-xs sm:text-sm text-brand-warmCream/80 font-light">
              The foundational pillars that guide every dish, every guest interaction, and every culinary standard at Pretodan Restaurant.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHY_CHOOSE_US.map((val, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-brand-surfaceCard border border-brand-goldenYellow/20 hover:border-brand-goldenYellow transition-all space-y-3"
              >
                <h4 className="font-heading font-black text-lg text-brand-goldenYellow">
                  {val.title}
                </h4>
                <p className="text-xs text-brand-warmCream/80 leading-relaxed font-light">
                  {val.desc}
                </p>
              </div>
            ))}
            {/* Added 6th Value */}
            <div className="p-6 rounded-2xl bg-brand-surfaceCard border border-brand-goldenYellow/20 hover:border-brand-goldenYellow transition-all space-y-3">
              <h4 className="font-heading font-black text-lg text-brand-goldenYellow">
                Continuous Culinary Innovation
              </h4>
              <p className="text-xs text-brand-warmCream/80 leading-relaxed font-light">
                We continuously refine our techniques, experiment with seasonal harvests, and introduce exciting culinary concepts to delight our patrons.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Compelling Call to Action */}
      <section className="py-20 bg-gradient-to-r from-brand-charcoal via-brand-surfaceCard to-brand-charcoal border-t-2 border-brand-goldenYellow text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="font-display text-4xl sm:text-6xl uppercase text-gradient-fiery tracking-wide font-black">
            READY TO TASTE EXCELLENCE?
          </h2>
          <p className="text-base sm:text-lg text-brand-warmCream/90 font-light max-w-2xl mx-auto">
            Join us at Pretodan Restaurant or place an online order today. We look forward to creating unforgettable culinary memories for you.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={() => onNavigate('services')}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-brand-goldenYellow via-brand-burntOrange to-brand-goldenYellow text-brand-charcoal font-heading font-black text-sm uppercase tracking-wider shadow-glow-yellow hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Explore Our Menu</span>
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="px-8 py-4 rounded-full bg-brand-surfaceCard border-2 border-brand-goldenYellow text-brand-goldenYellow hover:bg-brand-burntOrange hover:text-white font-heading font-bold text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2"
            >
              <span>Contact Us & Reservations</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
