import React from 'react';
import { PageRoute } from '../types';
import { useCart } from '../context/CartContext';
import { Home, Utensils, Calendar, Truck, ShoppingBag } from 'lucide-react';

interface MobileBottomNavProps {
  currentPage: PageRoute;
  onNavigate: (page: PageRoute) => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ currentPage, onNavigate }) => {
  const { totalItems, setIsCartOpen, setIsReservationOpen, setIsTrackingOpen } = useCart();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-brand-charcoal/95 backdrop-blur-xl border-t border-brand-goldenYellow/25 py-2 px-3 shadow-2xl pb-safe">
      <div className="flex items-center justify-around">
        
        {/* 1. Home Button */}
        <button
          onClick={() => { onNavigate('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className={`flex flex-col items-center justify-center p-1.5 transition-colors ${
            currentPage === 'home' ? 'text-brand-goldenYellow font-bold' : 'text-brand-warmCream/65 hover:text-brand-goldenYellow'
          }`}
        >
          <Home className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] tracking-tight">Home</span>
        </button>

        {/* 2. Menu Button */}
        <button
          onClick={() => { onNavigate('services'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className={`flex flex-col items-center justify-center p-1.5 transition-colors ${
            currentPage === 'services' ? 'text-brand-goldenYellow font-bold' : 'text-brand-warmCream/65 hover:text-brand-goldenYellow'
          }`}
        >
          <Utensils className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] tracking-tight">Menu</span>
        </button>

        {/* 3. Central Reserve Table Button */}
        <button
          onClick={() => setIsReservationOpen(true)}
          className="flex flex-col items-center justify-center -mt-5"
          aria-label="Reserve a Table"
        >
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-brand-burntOrange to-brand-goldenYellow text-brand-charcoal flex items-center justify-center shadow-glow-yellow border-2 border-brand-charcoal active:scale-95 transition-transform">
            <Calendar className="w-6 h-6 stroke-[2.2]" />
          </div>
          <span className="text-[10px] font-bold text-brand-goldenYellow tracking-tight mt-0.5">Reserve</span>
        </button>

        {/* 4. Live Order Track Button */}
        <button
          onClick={() => setIsTrackingOpen(true)}
          className="flex flex-col items-center justify-center p-1.5 text-brand-warmCream/65 hover:text-brand-goldenYellow transition-colors"
        >
          <Truck className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] tracking-tight">Track</span>
        </button>

        {/* 5. Cart Button with Live Badge */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="flex flex-col items-center justify-center p-1.5 relative text-brand-warmCream/65 hover:text-brand-goldenYellow transition-colors"
          aria-label={`Cart with ${totalItems} items`}
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5 mb-0.5" />
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-2 min-w-[16px] h-[16px] px-1 bg-gradient-to-r from-brand-burntOrange to-brand-goldenYellow text-brand-charcoal text-[10px] font-black rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </div>
          <span className="text-[10px] tracking-tight">Cart</span>
        </button>

      </div>
    </div>
  );
};
