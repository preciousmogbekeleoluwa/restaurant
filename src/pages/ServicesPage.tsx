import React, { useState } from 'react';
import { SERVICES_LIST, MENU_ITEMS, RESTAURANT_INFO, FOOD_CATEGORIES } from '../data/restaurantData';
import { PageRoute, MenuItem } from '../types';
import { useCart } from '../context/CartContext';
import { DrippingSauceHeader } from '../components/DrippingSauceHeader';
import {
  Sparkles,
  Flame,
  Plus,
  Search,
  MessageCircle,
  ShoppingBag,
  ArrowRight,
  Clock,
  Check,
  Filter,
  Utensils,
  PhoneCall,
  Calendar,
  Heart,
  Eye
} from 'lucide-react';

interface ServicesPageProps {
  onNavigate: (page: PageRoute) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onNavigate }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const {
    addToCart,
    setSelectedFoodModal,
    setIsCartOpen,
    formatPrice,
    favorites,
    toggleFavorite,
    isFavorite,
    setIsReservationOpen,
    setIsTrackingOpen
  } = useCart();

  // Filter menu items by category and search, or favorites
  const filteredMenuItems = MENU_ITEMS.filter((item) => {
    const matchesCategory =
      activeCategory === 'all'
        ? true
        : activeCategory === 'favorites'
        ? favorites.includes(item.id)
        : item.category === activeCategory;

    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const categories = [
    { id: 'all', label: 'All Dishes' },
    { id: 'chicken', label: 'Grilled Chicken' },
    { id: 'beef', label: 'Beef Dishes' },
    { id: 'pasta', label: 'Pasta' },
    { id: 'seafood', label: 'Seafood' },
    { id: 'rice', label: 'Rice Dishes' },
    { id: 'specialties', label: 'Continental Specialties' },
  ];

  const handleServiceAction = (serviceId: string, serviceTitle: string, ctaText: string) => {
    if (serviceId === 'serv-dinein' || serviceId === 'serv-private') {
      setIsReservationOpen(true);
    } else if (ctaText.toLowerCase().includes('order')) {
      setIsCartOpen(true);
    } else {
      onNavigate('contact');
    }
  };

  const handleWhatsAppOrder = () => {
    const message = `Hello Pretodan Restaurant! I would like to place an order from your Continental menu. Please share availability.`;
    window.open(`https://wa.me/${RESTAURANT_INFO.whatsappInternational}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-brand-charcoal text-brand-warmCream pt-20">
      
      {/* 1. Page Header Banner */}
      <section className="relative py-24 bg-gradient-to-b from-brand-charcoal via-brand-surfaceCard to-brand-charcoal border-b border-brand-goldenYellow/20 text-center overflow-hidden">
        <div className="absolute top-0 left-0 right-0 z-20">
          <DrippingSauceHeader />
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 relative z-10 pt-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-surfaceCard border border-brand-goldenYellow/40 text-brand-goldenYellow text-xs font-bold uppercase tracking-widest shadow-glow-yellow">
            <Sparkles className="w-4 h-4 text-brand-goldenYellow" />
            <span>Continental Culinary & Hospitality Services</span>
          </div>
          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl uppercase text-gradient-fiery tracking-wide font-black">
            OUR SERVICES & CULINARY OFFERINGS
          </h1>
          <p className="text-sm sm:text-lg text-brand-warmCream/85 font-light max-w-2xl mx-auto leading-relaxed">
            From world-class dining room hospitality and private dining to grand event catering, doorstep delivery, and convenient digital food ordering.
          </p>
        </div>
      </section>

      {/* 2. All 7 Services Showcase (Exact services requested by prompt) */}
      <section className="py-24 bg-brand-charcoal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-burntOrange block">
              What We Offer
            </span>
            <h2 className="font-display text-4xl sm:text-5xl uppercase text-gradient-fiery tracking-wide font-black">
              COMPREHENSIVE RESTAURANT SERVICES
            </h2>
            <p className="text-xs sm:text-sm text-brand-warmCream/70 font-light">
              Explore our core culinary offerings and dining solutions. Tailored with care for every guest and occasion.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES_LIST.map((service) => (
              <div
                key={service.id}
                className="group rounded-3xl bg-brand-surfaceCard border border-brand-goldenYellow/20 overflow-hidden flex flex-col justify-between hover:border-brand-goldenYellow hover:shadow-2xl transition-all duration-300"
              >
                {/* Service Image */}
                <div className="relative h-56 w-full overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-surfaceCard via-transparent to-transparent" />
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-brand-charcoal/90 border border-brand-goldenYellow/40 text-[10px] font-bold text-brand-goldenYellow uppercase">
                    {service.category}
                  </span>
                </div>

                {/* Service Details */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                  <div className="space-y-3">
                    <h3 className="font-heading font-black text-xl text-brand-goldenYellow group-hover:text-brand-burntOrange transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-brand-warmCream/80 font-light leading-relaxed">
                      {service.description}
                    </p>

                    {/* Service Feature Highlights */}
                    <div className="space-y-1.5 pt-2">
                      {service.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-center gap-2 text-xs text-brand-warmCream/70">
                          <Check className="w-3.5 h-3.5 text-brand-goldenYellow shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA Action */}
                  <div className="pt-4 border-t border-brand-goldenYellow/15">
                    <button
                      onClick={() => handleServiceAction(service.id, service.title, service.ctaText)}
                      className="w-full py-2.5 px-4 rounded-full bg-brand-charcoal hover:bg-brand-burntOrange border border-brand-goldenYellow/40 hover:border-brand-goldenYellow text-brand-goldenYellow hover:text-white font-heading font-bold text-xs uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 shadow-sm"
                    >
                      <span>{service.ctaText}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 3. DEDICATED ORDERING SECTION with Prominent Order Now & WhatsApp Ordering Option */}
      <section className="py-20 relative overflow-hidden bg-gradient-to-b from-brand-charcoal via-brand-surfaceCard to-brand-charcoal border-y-2 border-brand-goldenYellow">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-brand-surfaceCard border border-brand-goldenYellow/30 p-8 sm:p-12 shadow-2xl relative overflow-hidden">
            
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-brand-burntOrange/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-brand-goldenYellow/15 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              
              <div className="lg:col-span-8 space-y-4 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-charcoal border border-brand-goldenYellow/40 text-brand-goldenYellow text-xs font-bold uppercase tracking-widest">
                  <Flame className="w-4 h-4 text-brand-burntOrange" />
                  <span>Instant Ordering & WhatsApp Delivery</span>
                </div>

                <h2 className="font-display text-3xl sm:text-5xl uppercase text-gradient-fiery tracking-wide font-black leading-tight">
                  ORDER YOUR CONTINENTAL MEAL IN MINUTES
                </h2>

                <p className="text-sm sm:text-base text-brand-warmCream/85 font-light leading-relaxed max-w-xl">
                  Choose your preferred way to order. Browse our interactive digital menu with instant cart checkout, or chat directly with our hospitality team on WhatsApp for customized orders.
                </p>

                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                  {/* Prominent Order Now Button */}
                  <button
                    onClick={() => setIsCartOpen(true)}
                    className="px-8 py-4 rounded-full bg-gradient-to-r from-brand-goldenYellow via-brand-burntOrange to-brand-goldenYellow text-brand-charcoal font-heading font-black text-sm uppercase tracking-wider shadow-glow-yellow hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Order Now (Online Cart)</span>
                  </button>

                  {/* Prominent WhatsApp Ordering Option */}
                  <button
                    onClick={handleWhatsAppOrder}
                    className="px-8 py-4 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-heading font-black text-sm uppercase tracking-wider shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Order via WhatsApp</span>
                  </button>

                  {/* Table Reservation Button */}
                  <button
                    onClick={() => setIsReservationOpen(true)}
                    className="px-6 py-4 rounded-full bg-brand-charcoal border border-brand-goldenYellow text-brand-goldenYellow hover:bg-brand-burntOrange hover:text-white font-heading font-bold text-sm uppercase tracking-wider transition-all flex items-center gap-2"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Book a Table</span>
                  </button>
                </div>
              </div>

              {/* Quick Info Box */}
              <div className="lg:col-span-4 bg-brand-charcoal/80 p-6 rounded-2xl border border-brand-goldenYellow/25 space-y-3 text-xs">
                <h4 className="font-heading font-bold text-sm text-brand-goldenYellow uppercase tracking-wider">
                  Ordering Highlights
                </h4>
                <div className="space-y-2 text-brand-warmCream/80">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-brand-goldenYellow shrink-0" />
                    <span>Instant order confirmation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-brand-goldenYellow shrink-0" />
                    <span>Thermal packaging for hot arrival</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-brand-goldenYellow shrink-0" />
                    <span>Multi-currency checkout (USD, EUR, GBP, NGN)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-brand-goldenYellow shrink-0" />
                    <span>Live order tracking stepper</span>
                  </div>
                </div>
                <div className="pt-2 border-t border-brand-goldenYellow/20 text-brand-goldenYellow font-bold">
                  Hotline: {RESTAURANT_INFO.phoneDisplay}
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 4. Complete Interactive Continental Menu */}
      <section className="py-24 bg-brand-charcoal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-burntOrange block">
              Continental Selection
            </span>
            <h2 className="font-display text-4xl sm:text-5xl uppercase text-gradient-fiery tracking-wide font-black">
              EXPLORE OUR COMPLETE MENU
            </h2>
            <p className="text-xs sm:text-sm text-brand-warmCream/80 font-light">
              Filter by dish category or search for your favorite continental plate below.
            </p>
          </div>

          {/* Search Bar & Filter Tabs */}
          <div className="space-y-6 mb-12">
            {/* Search Input */}
            <div className="max-w-md mx-auto relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search dishes (e.g. Ribeye, Salmon, Paella)..."
                className="w-full px-5 py-3 pl-12 rounded-full bg-brand-surfaceCard border border-brand-goldenYellow/30 text-sm text-brand-warmCream placeholder-brand-warmCream/40 focus:outline-none focus:border-brand-goldenYellow focus:shadow-glow-yellow transition-all"
              />
              <Search className="w-5 h-5 text-brand-goldenYellow absolute left-4 top-1/2 -translate-y-1/2" />
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
              {categories.map((cat) => {
                const isSelected = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-4 sm:px-5 py-2 rounded-full font-heading text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                      isSelected
                        ? 'bg-gradient-to-r from-brand-goldenYellow to-brand-burntOrange text-brand-charcoal shadow-glow-yellow scale-105'
                        : 'bg-brand-surfaceCard text-brand-warmCream/80 hover:text-brand-goldenYellow border border-brand-goldenYellow/20 hover:border-brand-goldenYellow/50'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}

              {/* Favorites Filter Tab */}
              {favorites.length > 0 && (
                <button
                  onClick={() => setActiveCategory('favorites')}
                  className={`px-4 sm:px-5 py-2 rounded-full font-heading text-xs font-bold uppercase tracking-wider transition-all duration-200 flex items-center gap-1.5 ${
                    activeCategory === 'favorites'
                      ? 'bg-brand-burntOrange text-white shadow-glow-orange scale-105'
                      : 'bg-brand-surfaceCard text-brand-warmCream/80 hover:text-brand-burntOrange border border-brand-goldenYellow/20'
                  }`}
                >
                  <Heart className="w-3.5 h-3.5 fill-current" />
                  <span>Favorites ({favorites.length})</span>
                </button>
              )}
            </div>
          </div>

          {/* Filtered Menu Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredMenuItems.map((dish) => (
              <div
                key={dish.id}
                className="group rounded-3xl bg-brand-surfaceCard border border-brand-goldenYellow/20 hover:border-brand-goldenYellow overflow-hidden shadow-menu-card hover:shadow-2xl transition-all duration-300 flex flex-col justify-between relative"
              >
                <div className="relative h-60 overflow-hidden bg-brand-charcoal">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out filter brightness-95"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-surfaceCard via-transparent to-transparent pointer-events-none" />
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-brand-charcoal/85 backdrop-blur-md border border-brand-goldenYellow/40 text-[10px] font-bold text-brand-goldenYellow uppercase tracking-wider">
                    {dish.categoryLabel}
                  </span>

                  {/* Favorite Toggle Button */}
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleFavorite(dish.id); }}
                    className="absolute top-4 right-4 p-2 rounded-full bg-brand-charcoal/80 hover:bg-brand-charcoal text-brand-goldenYellow hover:scale-110 active:scale-90 transition-all shadow-md z-10"
                    title={isFavorite(dish.id) ? "Remove from Favorites" : "Add to Favorites"}
                    aria-label={`Favorite ${dish.name}`}
                  >
                    <Heart
                      className={`w-4 h-4 transition-colors ${
                        isFavorite(dish.id)
                          ? 'fill-brand-burntOrange text-brand-burntOrange'
                          : 'text-brand-warmCream hover:text-brand-goldenYellow'
                      }`}
                    />
                  </button>

                  {dish.discountBadge && (
                    <span className="absolute bottom-4 left-4 px-3 py-1 rounded-full bg-gradient-to-r from-brand-burntOrange to-brand-goldenYellow text-brand-charcoal font-black text-[10px] uppercase tracking-wider shadow-md">
                      {dish.discountBadge}
                    </span>
                  )}

                  {/* Quick View */}
                  <button
                    onClick={() => setSelectedFoodModal(dish)}
                    className="absolute bottom-4 right-4 p-2.5 rounded-full bg-brand-charcoal/90 text-brand-goldenYellow border border-brand-goldenYellow/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:scale-110 shadow-lg"
                    aria-label={`View details of ${dish.name}`}
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <h3
                        onClick={() => setSelectedFoodModal(dish)}
                        className="font-heading font-black text-lg text-brand-warmCream group-hover:text-brand-goldenYellow transition-colors cursor-pointer line-clamp-1"
                      >
                        {dish.name}
                      </h3>
                      {/* Dynamic Currency Formatted Price */}
                      <span className="font-display text-2xl font-black text-brand-goldenYellow shrink-0">
                        {formatPrice(dish.price)}
                      </span>
                    </div>
                    <p className="text-xs text-brand-warmCream/75 font-light leading-relaxed line-clamp-3">
                      {dish.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-brand-goldenYellow/15 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[11px] text-brand-warmCream/60 font-sans">
                      <Clock className="w-3.5 h-3.5 text-brand-goldenYellow" />
                      <span>{dish.prepTime}</span>
                    </div>

                    <button
                      onClick={() => addToCart(dish, 1)}
                      className="px-4 py-2 rounded-full bg-gradient-to-r from-brand-goldenYellow to-brand-burntOrange hover:opacity-95 text-brand-charcoal font-heading font-black text-xs uppercase tracking-wider shadow-glow-orange hover:shadow-glow-yellow transition-all duration-200 active:scale-95 flex items-center gap-1.5"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Order Now</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredMenuItems.length === 0 && (
            <div className="text-center py-16 space-y-4">
              <p className="text-brand-warmCream/60 text-sm">No dishes matched "{searchQuery}".</p>
              <button
                onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
                className="px-6 py-2 rounded-full bg-brand-surfaceCard border border-brand-goldenYellow text-brand-goldenYellow text-xs font-bold"
              >
                Reset Search Filters
              </button>
            </div>
          )}

        </div>
      </section>

    </div>
  );
};
