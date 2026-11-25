import React, { useState, useEffect } from 'react';
import { PageRoute } from './types';
import { CartProvider, useCart } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { FoodDetailModal } from './components/FoodDetailModal';
import { PaystackModal } from './components/PaystackModal';
import { ReservationModal } from './components/ReservationModal';
import { OrderTrackerModal } from './components/OrderTrackerModal';
import { VipRewardsModal } from './components/VipRewardsModal';
import { ReviewModal } from './components/ReviewModal';
import { AuthModal } from './components/AuthModal';
import { MobileBottomNav } from './components/MobileBottomNav';
import { PwaInstallBanner } from './components/PwaInstallBanner';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { ContactPage } from './pages/ContactPage';
import { RESTAURANT_INFO } from './data/restaurantData';
import { MessageCircle, ArrowUp } from 'lucide-react';

const MainAppContent: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageRoute>('home');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { toastMessage } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (page: PageRoute) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-brand-charcoal text-brand-warmCream selection:bg-brand-burntOrange selection:text-white pb-16 md:pb-0">
      {/* PWA Install Promotion Banner */}
      <PwaInstallBanner />

      {/* Global Navbar */}
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />

      {/* Main Page Content */}
      <main className="flex-1">
        {currentPage === 'home' && <HomePage onNavigate={handleNavigate} />}
        {currentPage === 'about' && <AboutPage onNavigate={handleNavigate} />}
        {currentPage === 'services' && <ServicesPage onNavigate={handleNavigate} />}
        {currentPage === 'contact' && <ContactPage />}
      </main>

      {/* Global Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Web App Interactive Modals & Drawers */}
      <CartDrawer />
      <FoodDetailModal />
      <PaystackModal />
      <ReservationModal />
      <OrderTrackerModal />
      <VipRewardsModal />
      <ReviewModal />
      <AuthModal />

      {/* Mobile App Bottom Navigation Dock */}
      <MobileBottomNav currentPage={currentPage} onNavigate={handleNavigate} />

      {/* Desktop Floating Action Buttons: WhatsApp Hotline & Scroll-to-Top */}
      <div className="fixed bottom-6 right-6 z-30 hidden md:flex flex-col gap-3">
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="w-12 h-12 rounded-full bg-brand-surfaceCard border border-brand-goldenYellow/40 text-brand-goldenYellow hover:bg-brand-burntOrange hover:text-white transition-all flex items-center justify-center shadow-xl hover:scale-110 active:scale-95"
            aria-label="Scroll to top of page"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        )}

        {/* Floating WhatsApp Quick Action with Ping */}
        <a
          href={RESTAURANT_INFO.socials.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="relative w-14 h-14 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all group"
          aria-label="Chat on WhatsApp"
        >
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-400 animate-ping" />
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-300" />
          <MessageCircle className="w-7 h-7" />
          
          {/* Tooltip on hover */}
          <span className="absolute right-16 px-3 py-1.5 rounded-xl bg-brand-charcoal/95 border border-brand-goldenYellow/30 text-brand-goldenYellow text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl">
            Order on WhatsApp ({RESTAURANT_INFO.phoneDisplay})
          </span>
        </a>
      </div>

      {/* Global Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 md:bottom-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3.5 rounded-full bg-brand-surfaceCard border-2 border-brand-goldenYellow text-brand-goldenYellow font-heading font-black text-xs sm:text-sm uppercase tracking-wider shadow-glow-yellow flex items-center gap-2.5 animate-slide-up max-w-[90vw] text-center">
          <span className="w-2.5 h-2.5 rounded-full bg-brand-goldenYellow animate-ping shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <CartProvider>
      <MainAppContent />
    </CartProvider>
  );
};

export default App;
