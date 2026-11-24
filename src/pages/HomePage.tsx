import React, { useState } from 'react';
import { HeroSlider } from '../components/HeroSlider';
import { FOOD_CATEGORIES, MENU_ITEMS, WHY_CHOOSE_US, TESTIMONIALS, SERVICES_LIST, RESTAURANT_INFO } from '../data/restaurantData';
import { PageRoute, MenuItem } from '../types';
import { useCart } from '../context/CartContext';
import {
  Sparkles,
  Flame,
  Plus,
  ArrowRight,
  MessageCircle,
  Star,
  ChefHat,
  ShieldCheck,
  HeartHandshake,
  Utensils,
  Check,
  Clock,
  ShoppingBag,
  Eye,
  Award,
  Heart,
  Calendar,
  Truck,
  Crown
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: PageRoute) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const {
    addToCart,
    setSelectedFoodModal,
    setIsCartOpen,
    formatPrice,
    favorites,
    toggleFavorite,
    isFavorite,
    setIsReservationOpen,
    setIsTrackingOpen,
    setIsVipOpen,
    setIsReviewOpen
  } = useCart();

  // Filter menu items by category or favorites
  const filteredItems = selectedCategory === 'all'
    ? MENU_ITEMS
    : selectedCategory === 'favorites'
    ? MENU_ITEMS.filter((item) => favorites.includes(item.id))
    : MENU_ITEMS.filter((item) => item.category === selectedCategory);

  const getWhyChooseIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldCheck': return <ShieldCheck className="w-8 h-8 text-brand-goldenYellow" />;
      case 'Flame': return <Flame className="w-8 h-8 text-brand-burntOrange" />;
      case 'ChefHat': return <ChefHat className="w-8 h-8 text-brand-goldenYellow" />;
      case 'HeartHandshake': return <HeartHandshake className="w-8 h-8 text-brand-goldenYellow" />;
      case 'Sparkles': return <Sparkles className="w-8 h-8 text-brand-burntOrange" />;
      default: return <Sparkles className="w-8 h-8 text-brand-goldenYellow" />;
    }
  };

  return (
    <div className="min-h-screen bg-brand-charcoal text-brand-warmCream">
      {/* 1. Hero Section — Highest Priority Visual Centerpiece */}
      <HeroSlider onNavigate={onNavigate} />

      {/* 2. Welcome Section: "Welcome to Pretodan Restaurant" */}
      <section className="py-24 relative overflow-hidden bg-gradient-to-b from-brand-charcoal via-brand-surfaceCard to-brand-charcoal border-b border-brand-goldenYellow/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Visual Collage with Circular Medallion Accent */}
            <div className="lg:col-span-6 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Main Food Preparation Image */}
                <div className="rounded-3xl overflow-hidden border-2 border-brand-goldenYellow/30 shadow-2xl group">
                  <img
                    src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80"
                    alt="Pretodan Restaurant Continental Plating"
                    className="w-full h-[460px] object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/80 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Floating Experience Badge */}
                <div className="absolute -bottom-6 -right-4 sm:-right-6 p-5 rounded-2xl bg-brand-surfaceCard border border-brand-goldenYellow/40 shadow-glow-yellow max-w-xs space-y-2">
                  <div className="flex items-center gap-2 text-brand-goldenYellow font-bold text-xs uppercase tracking-wider">
                    <Award className="w-4 h-4 text-brand-goldenYellow" />
                    <span>Culinary Mastery</span>
                  </div>
                  <p className="text-xs text-brand-warmCream/90 font-light">
                    Every recipe balances timeless European culinary technique with modern gastronomic artistry.
                  </p>
                  <div className="flex items-center gap-2 text-[11px] text-brand-goldenYellow font-bold pt-1 border-t border-brand-goldenYellow/20">
                    <span>Fresh Daily</span>
                    <span className="text-brand-burntOrange">•</span>
                    <span>Executive Chefs</span>
                  </div>
                </div>

                {/* Circular Dish Stamp Top Left */}
                <div className="absolute -top-6 -left-4 sm:-left-6 w-24 h-24 rounded-full bg-gradient-to-br from-brand-burntOrange to-brand-goldenYellow border-2 border-brand-warmCream text-brand-charcoal flex flex-col items-center justify-center shadow-glow-orange font-display">
                  <span className="text-2xl font-black leading-none">100%</span>
                  <span className="text-[9px] uppercase tracking-wider font-sans font-bold">FRESH</span>
                </div>
              </div>
            </div>

            {/* Welcome Editorial Copy */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-surfaceCard border border-brand-goldenYellow/30 text-brand-goldenYellow text-xs font-bold uppercase tracking-widest">
                <ChefHat className="w-4 h-4 text-brand-goldenYellow" />
                <span>Welcome to Pretodan Restaurant</span>
              </div>

              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl tracking-wide uppercase text-gradient-fiery leading-tight font-black">
                PASSION FOR EXCELLENT CONTINENTAL CUISINE
              </h2>

              <p className="text-brand-warmCream/90 font-light text-base sm:text-lg leading-relaxed">
                Welcome to <strong className="text-brand-goldenYellow font-semibold">Pretodan Restaurant</strong>, where culinary artistry and genuine hospitality come together. Founded with a steadfast dedication to continental gastronomic excellence, we bring you an exquisite journey of flavours inspired by the finest European and international traditions.
              </p>

              <p className="text-brand-warmCream/80 font-light text-sm sm:text-base leading-relaxed">
                From our prime-aged steaks flame-seared with rosemary butter, to delicate seafood paellas, hand-rolled pastas, and our signature crispy herb-roasted chicken, every dish is crafted from fresh, meticulously sourced ingredients and prepared by passionate culinary professionals.
              </p>

              {/* Three Welcome Feature Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-brand-goldenYellow/15">
                <div className="p-3 rounded-xl bg-brand-surfaceCard/60 border border-brand-goldenYellow/15">
                  <span className="font-display text-2xl text-brand-goldenYellow block">PRIME</span>
                  <span className="text-xs text-brand-warmCream/70 font-light">Hand-selected meats & seafood</span>
                </div>
                <div className="p-3 rounded-xl bg-brand-surfaceCard/60 border border-brand-goldenYellow/15">
                  <span className="font-display text-2xl text-brand-burntOrange block">SCRATCH</span>
                  <span className="text-xs text-brand-warmCream/70 font-light">Freshly cooked on every order</span>
                </div>
                <div className="p-3 rounded-xl bg-brand-surfaceCard/60 border border-brand-goldenYellow/15">
                  <span className="font-display text-2xl text-brand-goldenYellow block">WARMTH</span>
                  <span className="text-xs text-brand-warmCream/70 font-light">Unmatched luxury hospitality</span>
                </div>
              </div>

              {/* Interactive Welcome CTAs: Table Reservation & Menu */}
              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4">
                <button
                  onClick={() => setIsReservationOpen(true)}
                  className="px-7 py-3 rounded-full bg-gradient-to-r from-brand-goldenYellow via-brand-burntOrange to-brand-goldenYellow text-brand-charcoal font-heading font-black text-xs uppercase tracking-wider shadow-glow-yellow hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Reserve a Table</span>
                </button>

                <button
                  onClick={() => onNavigate('services')}
                  className="px-7 py-3 rounded-full bg-brand-surfaceCard border-2 border-brand-goldenYellow text-brand-goldenYellow hover:bg-brand-burntOrange hover:text-white transition-all font-heading font-bold text-xs uppercase tracking-wider flex items-center gap-2"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Explore Menu</span>
                </button>

                <button
                  onClick={() => setIsTrackingOpen(true)}
                  className="px-5 py-3 rounded-full bg-brand-charcoal border border-brand-goldenYellow/30 text-brand-warmCream hover:text-brand-goldenYellow transition-colors font-heading text-xs font-bold flex items-center gap-2"
                >
                  <Truck className="w-3.5 h-3.5 text-brand-goldenYellow" />
                  <span>Track Order</span>
                </button>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 3. Featured Dishes Showcase (Includes all 6 required categories + Favorites!) */}
      <section className="py-24 relative bg-brand-charcoal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-surfaceCard border border-brand-goldenYellow/30 text-brand-burntOrange text-xs font-bold uppercase tracking-widest">
              <Utensils className="w-4 h-4 text-brand-burntOrange" />
              <span>Continental Gastronomy Showcase</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl tracking-wide uppercase text-gradient-fiery font-black">
              OUR FEATURED DISHES
            </h2>
            <p className="text-sm sm:text-base text-brand-warmCream/80 font-light">
              Meticulously prepared with passion and served with artistic finesse. Explore our grilled chicken, prime beef, artisanal pastas, fresh seafood, aromatic rice dishes, and continental specialties.
            </p>
          </div>

          {/* Category Filter Tabs (With My Favorites tab) */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
            {FOOD_CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full font-heading text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-200 ${
                    isSelected
                      ? 'bg-gradient-to-r from-brand-goldenYellow to-brand-burntOrange text-brand-charcoal shadow-glow-yellow scale-105'
                      : 'bg-brand-surfaceCard text-brand-warmCream/80 hover:text-brand-goldenYellow border border-brand-goldenYellow/20 hover:border-brand-goldenYellow/50'
                  }`}
                >
                  {cat.name}
                </button>
              );
            })}

            {/* Favorites Tab */}
            {favorites.length > 0 && (
              <button
                onClick={() => setSelectedCategory('favorites')}
                className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full font-heading text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-200 flex items-center gap-1.5 ${
                  selectedCategory === 'favorites'
                    ? 'bg-brand-burntOrange text-white shadow-glow-orange scale-105'
                    : 'bg-brand-surfaceCard text-brand-warmCream/80 hover:text-brand-burntOrange border border-brand-goldenYellow/20'
                }`}
              >
                <Heart className="w-3.5 h-3.5 fill-current" />
                <span>My Favorites ({favorites.length})</span>
              </button>
            )}
          </div>

          {/* Dishes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((dish) => (
              <div
                key={dish.id}
                className="group rounded-3xl bg-brand-surfaceCard border border-brand-goldenYellow/20 hover:border-brand-goldenYellow overflow-hidden shadow-menu-card hover:shadow-2xl transition-all duration-300 flex flex-col justify-between relative"
              >
                {/* Dish Visual Header */}
                <div className="relative h-64 overflow-hidden bg-brand-charcoal">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out filter brightness-95"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-surfaceCard via-transparent to-transparent pointer-events-none" />

                  {/* Category Pill Tag */}
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-brand-charcoal/85 backdrop-blur-md border border-brand-goldenYellow/40 text-[10px] font-bold text-brand-goldenYellow uppercase tracking-wider">
                    {dish.categoryLabel}
                  </span>

                  {/* Favorite Heart Toggle Button */}
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

                  {/* Special Badge if any */}
                  {dish.discountBadge && (
                    <span className="absolute bottom-4 left-4 px-3 py-1 rounded-full bg-gradient-to-r from-brand-burntOrange to-brand-goldenYellow text-brand-charcoal font-black text-[10px] uppercase tracking-wider shadow-md">
                      {dish.discountBadge}
                    </span>
                  )}

                  {/* Quick View Button on Hover */}
                  <button
                    onClick={() => setSelectedFoodModal(dish)}
                    className="absolute bottom-4 right-4 p-2.5 rounded-full bg-brand-charcoal/90 text-brand-goldenYellow border border-brand-goldenYellow/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:scale-110 shadow-lg"
                    aria-label={`View details of ${dish.name}`}
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>

                {/* Dish Details */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <h3
                        onClick={() => setSelectedFoodModal(dish)}
                        className="font-heading font-black text-lg text-brand-warmCream group-hover:text-brand-goldenYellow transition-colors cursor-pointer line-clamp-1"
                      >
                        {dish.name}
                      </h3>
                      {/* Dynamic Currency Price */}
                      <span className="font-display text-2xl font-black text-brand-goldenYellow shrink-0">
                        {formatPrice(dish.price)}
                      </span>
                    </div>

                    <p className="text-xs text-brand-warmCream/75 font-light leading-relaxed line-clamp-3">
                      {dish.description}
                    </p>
                  </div>

                  {/* Meta Tags & Action */}
                  <div className="pt-4 border-t border-brand-goldenYellow/15 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[11px] text-brand-warmCream/60 font-sans">
                      <Clock className="w-3.5 h-3.5 text-brand-goldenYellow" />
                      <span>{dish.prepTime}</span>
                    </div>

                    {/* Order Now button */}
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

          {filteredItems.length === 0 && (
            <div className="text-center py-16 space-y-3">
              <p className="text-brand-warmCream/60 text-sm">No dishes found in this category.</p>
              <button
                onClick={() => setSelectedCategory('all')}
                className="px-5 py-2 rounded-full bg-brand-surfaceCard border border-brand-goldenYellow text-brand-goldenYellow text-xs font-bold"
              >
                View All Dishes
              </button>
            </div>
          )}

          {/* Bottom Menu Action */}
          <div className="mt-14 text-center">
            <button
              onClick={() => onNavigate('services')}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-brand-surfaceCard border-2 border-brand-goldenYellow text-brand-goldenYellow hover:bg-brand-burntOrange hover:text-white font-heading font-black text-sm uppercase tracking-wider transition-all shadow-lg hover:scale-105 active:scale-95"
            >
              <span>Explore Complete Menu & Services</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>

      {/* 4. Why Choose Us (Exact 5 Highlights from Prompt) */}
      <section className="py-24 relative bg-gradient-to-b from-brand-charcoal via-brand-surfaceCard to-brand-charcoal border-y border-brand-goldenYellow/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-surfaceCard border border-brand-goldenYellow/30 text-brand-goldenYellow text-xs font-bold uppercase tracking-widest">
              <Sparkles className="w-4 h-4 text-brand-goldenYellow" />
              <span>The Pretodan Standard</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl tracking-wide uppercase text-gradient-fiery font-black">
              WHY CHOOSE US
            </h2>
            <p className="text-sm sm:text-base text-brand-warmCream/80 font-light">
              We stand apart through our uncompromising dedication to culinary brilliance, premium ingredients, and extraordinary guest experiences.
            </p>
          </div>

          {/* 5 Highlights Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {WHY_CHOOSE_US.map((item, index) => (
              <div
                key={index}
                className="p-8 rounded-3xl bg-brand-surfaceCard border border-brand-goldenYellow/20 hover:border-brand-goldenYellow transition-all duration-300 space-y-4 hover:shadow-2xl group"
              >
                <div className="w-14 h-14 rounded-2xl bg-brand-charcoal border border-brand-goldenYellow/30 flex items-center justify-center group-hover:scale-110 transition-transform shadow-md">
                  {getWhyChooseIcon(item.icon)}
                </div>
                <h3 className="font-heading font-black text-xl text-brand-goldenYellow group-hover:text-brand-burntOrange transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-brand-warmCream/80 font-light leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}

            {/* VIP Club Highlight Card */}
            <div className="p-8 rounded-3xl bg-gradient-to-br from-brand-burntOrange/20 via-brand-surfaceCard to-brand-charcoal border border-brand-goldenYellow/40 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-brand-goldenYellow text-xs font-bold uppercase tracking-wider">
                  <Crown className="w-4 h-4" />
                  <span>VIP Culinary Club</span>
                </div>
                <span className="font-display text-3xl text-gradient-gold font-black uppercase">
                  EARN REWARDS ON EVERY ORDER
                </span>
                <p className="text-sm text-brand-warmCream/80 font-light">
                  Join Pretodan VIP Club. Earn points on every meal, unlock free dishes, and enjoy 15% member discounts.
                </p>
              </div>
              <button
                onClick={() => setIsVipOpen(true)}
                className="w-full py-3 rounded-full bg-gradient-to-r from-brand-goldenYellow to-brand-burntOrange text-brand-charcoal font-heading font-black text-xs uppercase tracking-wider shadow-glow-yellow hover:scale-105 active:scale-95 transition-all text-center"
              >
                View VIP Member Perks
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 5. Services Preview */}
      <section className="py-24 bg-brand-charcoal relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <div className="space-y-3 max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-burntOrange block">
                Comprehensive Hospitality
              </span>
              <h2 className="font-display text-4xl sm:text-5xl uppercase text-gradient-fiery tracking-wide font-black">
                OUR SERVICES PREVIEW
              </h2>
              <p className="text-sm sm:text-base text-brand-warmCream/80 font-light">
                From luxury dine-in and private VIP dinners to event catering and express doorstep delivery.
              </p>
            </div>
            <button
              onClick={() => onNavigate('services')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-surfaceCard border border-brand-goldenYellow/30 text-brand-goldenYellow hover:bg-brand-goldenYellow hover:text-brand-charcoal font-heading font-bold text-xs uppercase tracking-wider transition-all self-start md:self-auto"
            >
              <span>View All 7 Services</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES_LIST.slice(0, 4).map((service) => (
              <div
                key={service.id}
                onClick={() => onNavigate('services')}
                className="group cursor-pointer rounded-3xl bg-brand-surfaceCard border border-brand-goldenYellow/20 hover:border-brand-goldenYellow overflow-hidden shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-surfaceCard via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-brand-charcoal/90 border border-brand-goldenYellow/30 text-[10px] font-bold text-brand-goldenYellow uppercase">
                    {service.category}
                  </span>
                </div>

                <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-heading font-black text-base text-brand-warmCream group-hover:text-brand-goldenYellow transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs text-brand-warmCream/70 font-light line-clamp-2 mt-1">
                      {service.description}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-brand-goldenYellow/10 flex items-center justify-between text-xs text-brand-goldenYellow font-bold">
                    <span>{service.ctaText}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. Testimonials (With "Leave a Review" Interactive Web App Action) */}
      <section className="py-24 bg-gradient-to-b from-brand-charcoal via-brand-surfaceCard to-brand-charcoal border-t border-brand-goldenYellow/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row items-center justify-between mb-14 gap-6">
            <div className="text-center sm:text-left space-y-2 max-w-xl">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-surfaceCard border border-brand-goldenYellow/30 text-brand-goldenYellow text-xs font-bold uppercase tracking-widest">
                <Star className="w-4 h-4 fill-brand-goldenYellow text-brand-goldenYellow" />
                <span>Guest Impressions</span>
              </div>
              <h2 className="font-display text-4xl sm:text-5xl uppercase text-gradient-fiery tracking-wide font-black">
                WHAT OUR GUESTS SAY
              </h2>
              <p className="text-xs sm:text-sm text-brand-warmCream/65 font-light italic">
                * Sample placeholder reviews for demonstration.
              </p>
            </div>

            {/* Leave a Review Button */}
            <button
              onClick={() => setIsReviewOpen(true)}
              className="px-6 py-3 rounded-full bg-brand-surfaceCard hover:bg-brand-burntOrange border border-brand-goldenYellow/40 text-brand-goldenYellow hover:text-white font-heading font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-md shrink-0"
            >
              <Star className="w-4 h-4 fill-current" />
              <span>Leave a Review</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.id}
                className="p-8 rounded-3xl bg-brand-surfaceCard border border-brand-goldenYellow/20 hover:border-brand-goldenYellow transition-all duration-300 flex flex-col justify-between space-y-6 shadow-xl"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-1">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-brand-goldenYellow text-brand-goldenYellow" />
                    ))}
                  </div>
                  <p className="text-sm text-brand-warmCream/90 font-light italic leading-relaxed">
                    "{t.content}"
                  </p>
                </div>

                <div className="pt-4 border-t border-brand-goldenYellow/15 flex items-center gap-4">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-brand-goldenYellow"
                  />
                  <div>
                    <h4 className="font-heading font-black text-sm text-brand-goldenYellow">
                      {t.name}
                    </h4>
                    <span className="text-xs text-brand-warmCream/60 block font-light">
                      {t.role}
                    </span>
                    <span className="text-[10px] text-brand-burntOrange block">
                      Favorite: {t.favoriteDish}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 7. Final Call to Action: "Good Food. Great Moments. Only at Pretodan." */}
      <section className="py-24 relative overflow-hidden bg-gradient-to-r from-brand-charcoal via-brand-surfaceCard to-brand-charcoal border-t-2 border-brand-goldenYellow text-center">
        <div className="absolute inset-0 bg-radial-glow opacity-80 pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-surfaceCard border border-brand-goldenYellow/30 text-brand-goldenYellow text-xs font-bold uppercase tracking-widest shadow-glow-yellow">
            <Sparkles className="w-4 h-4 text-brand-goldenYellow" />
            <span>Join Us for an Unforgettable Meal</span>
          </div>

          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl uppercase text-gradient-fiery tracking-wide font-black leading-tight text-shadow-3d">
            GOOD FOOD. GREAT MOMENTS. ONLY AT PRETODAN.
          </h2>

          <p className="text-base sm:text-xl text-brand-warmCream/90 font-light max-w-2xl mx-auto leading-relaxed">
            Whether you are reserving a table for an intimate dinner, ordering your favorite continental feast to your door, or tracking live delivery, experience our culinary distinction today.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => setIsCartOpen(true)}
              className="w-full sm:w-auto px-10 py-4 rounded-full bg-gradient-to-r from-brand-goldenYellow via-brand-burntOrange to-brand-goldenYellow text-brand-charcoal font-heading font-black text-sm uppercase tracking-wider shadow-glow-yellow hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Order Now</span>
            </button>

            <button
              onClick={() => setIsReservationOpen(true)}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-brand-surfaceCard border-2 border-brand-goldenYellow text-brand-goldenYellow hover:bg-brand-burntOrange hover:text-white font-heading font-bold text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Reserve a Table</span>
            </button>

            <button
              onClick={() => onNavigate('contact')}
              className="w-full sm:w-auto px-7 py-4 rounded-full bg-brand-charcoal border border-brand-goldenYellow/40 text-brand-warmCream hover:text-brand-goldenYellow font-heading font-bold text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2"
            >
              <span>Contact Us</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Contact quick links */}
          <div className="pt-6 text-xs text-brand-warmCream/60">
            <span>Questions or bookings? Call </span>
            <a href={`tel:${RESTAURANT_INFO.phone}`} className="text-brand-goldenYellow font-bold hover:underline">
              {RESTAURANT_INFO.phoneDisplay}
            </a>
            <span> or message on </span>
            <a href={RESTAURANT_INFO.socials.whatsapp} target="_blank" rel="noopener noreferrer" className="text-emerald-400 font-bold hover:underline">
              WhatsApp
            </a>
          </div>

        </div>
      </section>

    </div>
  );
};
