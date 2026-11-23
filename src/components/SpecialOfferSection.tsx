import React from 'react';
import { useCart } from '../context/CartContext';
import { Sparkles, Flame, Plus, ShoppingBag, MessageCircle } from 'lucide-react';
import { MENU_ITEMS, RESTAURANT_INFO } from '../data/restaurantData';

export const SpecialOfferSection: React.FC = () => {
  const { addToCart, setIsCartOpen } = useCart();

  // Find the signature crispy wings platter (chk-1) and pizza (piz-1)
  const starItem = MENU_ITEMS.find((item) => item.id === 'chk-1') || MENU_ITEMS[0];
  const bbqPizza = MENU_ITEMS.find((item) => item.id === 'piz-1') || MENU_ITEMS[4];
  const smashBurger = MENU_ITEMS.find((item) => item.id === 'bur-1') || MENU_ITEMS[8];

  return (
    <section className="py-20 bg-gradient-to-b from-brand-surfaceDark via-brand-burgundy/40 to-brand-surfaceDark relative overflow-hidden">
      {/* Background radial ambiance inspired by the poster */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-r from-brand-brightRed/20 via-brand-fieryOrange/20 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-richRed/70 border border-brand-goldenYellow/40 text-brand-goldenYellow text-xs font-bold uppercase tracking-widest">
            <Flame className="w-4 h-4 text-brand-fieryOrange" />
            <span>Limited Time Chef Special</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl tracking-wide uppercase text-gradient-fiery leading-tight">
            SIGNATURE COMBOS & OFFERS
          </h2>
          <p className="text-brand-warmCream/80 text-sm sm:text-base font-light">
            Crafted directly from our culinary grill. Enjoy sample promotional pricing designed for sharing with family and friends in Abuja.
          </p>
        </div>

        {/* The Menu Poster-Inspired Featured Showcase Card */}
        <div className="relative rounded-3xl bg-gradient-to-b from-brand-burgundy via-brand-surfaceCard to-brand-darkCharcoal border-2 border-brand-goldenYellow/40 p-6 sm:p-10 lg:p-12 shadow-2xl overflow-hidden">
          
          {/* Decorative Corner Ornaments */}
          <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-brand-goldenYellow" />
          <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-brand-goldenYellow" />
          <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-brand-goldenYellow" />
          <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-brand-goldenYellow" />

          {/* Banner Title Header */}
          <div className="text-center pb-8 border-b border-brand-goldenYellow/20">
            <div className="font-sans text-xs sm:text-sm tracking-[0.3em] uppercase text-brand-warmCream font-bold drop-shadow">
              PRETODAN SPECIAL
            </div>
            <div className="font-display text-5xl sm:text-7xl font-black text-gradient-fiery tracking-wider text-shadow-3d mt-1">
              RESTAURANT MENU
            </div>
          </div>

          {/* Central Grid: Visual Showcase & Menu Columns */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center py-8">
            
            {/* Centerpiece Image & Badges (Matching the user's reference flyer) */}
            <div className="lg:col-span-6 flex flex-col items-center justify-center relative order-1 lg:order-2">
              
              {/* Radial glow underneath the platter */}
              <div className="absolute w-64 sm:w-80 h-64 sm:h-80 bg-brand-fieryOrange/30 rounded-full blur-2xl -z-10" />

              {/* Badges from the flyer */}
              <div className="absolute -top-3 left-4 sm:left-10 px-4 py-2.5 rounded-full bg-brand-richRed border-2 border-brand-goldenYellow text-brand-goldenYellow text-xs font-black uppercase tracking-wider shadow-glow-yellow transform -rotate-6 z-20">
                SPECIAL OFFER
              </div>
              <div className="absolute top-4 right-4 sm:right-10 w-20 h-20 rounded-full bg-brand-brightRed border-2 border-dashed border-brand-goldenYellow text-white flex flex-col items-center justify-center transform rotate-12 shadow-glow-orange z-20">
                <span className="font-display text-lg font-black text-brand-goldenYellow leading-none">25%</span>
                <span className="text-[9px] uppercase font-bold tracking-tight">DISCOUNT</span>
              </div>

              {/* Appending Platter Visual */}
              <div className="relative w-64 sm:w-80 aspect-square rounded-full p-2 bg-gradient-to-b from-brand-goldenYellow via-brand-fieryOrange to-brand-richRed shadow-2xl">
                <img
                  src={starItem.image}
                  alt={starItem.name}
                  className="w-full h-full object-cover rounded-full border-4 border-brand-surfaceDark"
                />
              </div>

              {/* Star Dish Title & Order Button */}
              <div className="text-center mt-6 space-y-2">
                <h3 className="font-heading font-black text-xl sm:text-2xl text-brand-goldenYellow">
                  {starItem.name}
                </h3>
                <p className="text-xs sm:text-sm text-brand-warmCream/80 max-w-md">
                  Crispy seasoned wings, golden french fries, fresh herb garnish and spicy dipping sauce.
                </p>
                <div className="flex items-center justify-center gap-3 pt-2">
                  <span className="font-display text-3xl font-black text-brand-goldenYellow">
                    ₦{starItem.price.toLocaleString()}
                  </span>
                  <button
                    onClick={() => addToCart(starItem)}
                    className="px-5 py-2.5 rounded-full bg-gradient-to-r from-brand-goldenYellow to-brand-fieryOrange text-brand-darkCharcoal font-heading font-black text-xs uppercase tracking-wider hover:opacity-95 shadow-glow-yellow flex items-center gap-2 active:scale-95 transition-all"
                  >
                    <Plus className="w-4 h-4 stroke-[3]" />
                    <span>Add to Order</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Menu List Columns: Left (PIZZA) & Right (BURGER) */}
            <div className="lg:col-span-3 space-y-6 order-2 lg:order-1">
              {/* PIZZA Pill Header */}
              <div className="text-center py-2 px-6 rounded-full bg-brand-richRed/90 border border-brand-goldenYellow/40 shadow-md">
                <span className="font-display text-2xl font-black text-white tracking-widest uppercase">
                  PIZZA
                </span>
              </div>

              <div className="space-y-5 text-sm">
                <div>
                  <div className="flex items-baseline justify-between font-heading font-black text-brand-goldenYellow">
                    <span className="uppercase text-sm">{bbqPizza.name}</span>
                    <span className="text-brand-warmCream font-mono font-bold">₦{bbqPizza.price.toLocaleString()}</span>
                  </div>
                  <p className="text-[11px] text-brand-warmCream/70 mt-0.5 line-clamp-2">
                    {bbqPizza.description}
                  </p>
                  <button
                    onClick={() => addToCart(bbqPizza)}
                    className="text-[11px] font-bold text-brand-fieryOrange hover:text-brand-goldenYellow flex items-center gap-1 mt-1"
                  >
                    + Add to Order
                  </button>
                </div>

                <div>
                  <div className="flex items-baseline justify-between font-heading font-black text-brand-goldenYellow">
                    <span className="uppercase text-sm">MEAT LOVER'S</span>
                    <span className="text-brand-warmCream font-mono font-bold">₦9,500</span>
                  </div>
                  <p className="text-[11px] text-brand-warmCream/70 mt-0.5">
                    Ultimate meat lover's pizza with pepperoni, sausage, beef & cheese.
                  </p>
                  <button
                    onClick={() => {
                      const meatPizza = MENU_ITEMS.find((m) => m.id === 'piz-2');
                      if (meatPizza) addToCart(meatPizza);
                    }}
                    className="text-[11px] font-bold text-brand-fieryOrange hover:text-brand-goldenYellow flex items-center gap-1 mt-1"
                  >
                    + Add to Order
                  </button>
                </div>

                <div>
                  <div className="flex items-baseline justify-between font-heading font-black text-brand-goldenYellow">
                    <span className="uppercase text-sm">MARGHERITA</span>
                    <span className="text-brand-warmCream font-mono font-bold">₦7,500</span>
                  </div>
                  <p className="text-[11px] text-brand-warmCream/70 mt-0.5">
                    Thin crust Margherita pizza with fresh mozzarella & fragrant basil.
                  </p>
                  <button
                    onClick={() => {
                      const margPizza = MENU_ITEMS.find((m) => m.id === 'piz-3');
                      if (margPizza) addToCart(margPizza);
                    }}
                    className="text-[11px] font-bold text-brand-fieryOrange hover:text-brand-goldenYellow flex items-center gap-1 mt-1"
                  >
                    + Add to Order
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: BURGER */}
            <div className="lg:col-span-3 space-y-6 order-3">
              {/* BURGER Pill Header */}
              <div className="text-center py-2 px-6 rounded-full bg-brand-richRed/90 border border-brand-goldenYellow/40 shadow-md">
                <span className="font-display text-2xl font-black text-white tracking-widest uppercase">
                  BURGER
                </span>
              </div>

              <div className="space-y-5 text-sm">
                <div>
                  <div className="flex items-baseline justify-between font-heading font-black text-brand-goldenYellow">
                    <span className="uppercase text-sm">{smashBurger.name}</span>
                    <span className="text-brand-warmCream font-mono font-bold">₦{smashBurger.price.toLocaleString()}</span>
                  </div>
                  <p className="text-[11px] text-brand-warmCream/70 mt-0.5 line-clamp-2">
                    {smashBurger.description}
                  </p>
                  <button
                    onClick={() => addToCart(smashBurger)}
                    className="text-[11px] font-bold text-brand-fieryOrange hover:text-brand-goldenYellow flex items-center gap-1 mt-1"
                  >
                    + Add to Order
                  </button>
                </div>

                <div>
                  <div className="flex items-baseline justify-between font-heading font-black text-brand-goldenYellow">
                    <span className="uppercase text-sm">MUSHROOM SWISS</span>
                    <span className="text-brand-warmCream font-mono font-bold">₦7,500</span>
                  </div>
                  <p className="text-[11px] text-brand-warmCream/70 mt-0.5">
                    Burger topped with sautéed mushrooms, Swiss cheese & garlic mayo.
                  </p>
                  <button
                    onClick={() => {
                      const item = MENU_ITEMS.find((m) => m.id === 'bur-2');
                      if (item) addToCart(item);
                    }}
                    className="text-[11px] font-bold text-brand-fieryOrange hover:text-brand-goldenYellow flex items-center gap-1 mt-1"
                  >
                    + Add to Order
                  </button>
                </div>

                <div>
                  <div className="flex items-baseline justify-between font-heading font-black text-brand-goldenYellow">
                    <span className="uppercase text-sm">HAWAIIAN BURGER</span>
                    <span className="text-brand-warmCream font-mono font-bold">₦7,000</span>
                  </div>
                  <p className="text-[11px] text-brand-warmCream/70 mt-0.5">
                    Burger with grilled pineapple, glazed teriyaki sauce & Swiss cheese.
                  </p>
                  <button
                    onClick={() => {
                      const item = MENU_ITEMS.find((m) => m.id === 'bur-3');
                      if (item) addToCart(item);
                    }}
                    className="text-[11px] font-bold text-brand-fieryOrange hover:text-brand-goldenYellow flex items-center gap-1 mt-1"
                  >
                    + Add to Order
                  </button>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Action Footer of Card */}
          <div className="mt-8 pt-6 border-t border-brand-goldenYellow/20 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <span className="text-xs text-brand-warmCream/60 font-sans">
                * Note: Sample prices shown in Nigerian Naira (₦). All promotional bundles are fully configurable by the restaurant management.
              </span>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={RESTAURANT_INFO.socials.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-full bg-emerald-600/90 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Hotline</span>
              </a>

              <button
                onClick={() => setIsCartOpen(true)}
                className="px-5 py-2.5 rounded-full bg-brand-surfaceDark border border-brand-goldenYellow text-brand-goldenYellow hover:bg-brand-burgundy font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-colors"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>View My Order</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
