import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { OrderStatus } from '../types';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { X, Search, CheckCircle2, Clock, ChefHat, Truck, ShoppingBag, MapPin, Phone, MessageCircle } from 'lucide-react';

export const OrderTrackerModal: React.FC = () => {
  const { isTrackingOpen, setIsTrackingOpen, trackedOrder, trackOrderById, recentOrders } = useCart();
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsTrackingOpen(false);
    };
    if (isTrackingOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isTrackingOpen, setIsTrackingOpen]);

  if (!isTrackingOpen) return null;

  const currentOrder = trackedOrder || (recentOrders.length > 0 ? recentOrders[0] : null);

  const steps = [
    { key: 'received', title: 'Order Confirmed', desc: 'Ticket sent to executive kitchen', icon: ShoppingBag },
    { key: 'preparing', title: 'Kitchen Cooking', desc: 'Flame-grilling & sauce reductions', icon: ChefHat },
    { key: 'plating', title: 'Quality Check & Plating', desc: 'Artisanal garnish and thermal seal', icon: CheckCircle2 },
    { key: 'dispatch', title: 'Out for Delivery', desc: 'In transit with thermal carrier', icon: Truck },
    { key: 'delivered', title: 'Arrived / Delivered', desc: 'Bon appétit!', icon: MapPin },
  ];

  const getStepIndex = (status: string) => {
    switch (status) {
      case 'received': return 0;
      case 'preparing': return 1;
      case 'plating': return 2;
      case 'dispatch': return 3;
      case 'delivered': return 4;
      default: return 1;
    }
  };

  const currentStepIdx = currentOrder ? getStepIndex(currentOrder.status) : 1;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      trackOrderById(searchInput.trim());
    }
  };

  return (
    <div
      onClick={() => setIsTrackingOpen(false)}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-charcoal/85 backdrop-blur-md animate-fade-scale overflow-y-auto"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-xl bg-gradient-to-b from-brand-surfaceCard via-brand-charcoal to-brand-surfaceCard rounded-3xl border border-brand-goldenYellow/40 shadow-2xl overflow-hidden flex flex-col max-h-[90vh] my-auto"
      >
        
        {/* Modal Top Header */}
        <div className="p-6 bg-brand-charcoal border-b border-brand-goldenYellow/20 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-brand-surfaceCard border border-brand-goldenYellow/35 flex items-center justify-center text-brand-goldenYellow">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-heading font-black text-xl text-brand-goldenYellow leading-tight">
                Live Order Tracker
              </h2>
              <span className="text-xs text-brand-warmCream/70 font-sans">
                Real-Time Kitchen & Dispatch Progress
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsTrackingOpen(false)}
            className="p-2 rounded-full bg-brand-surfaceCard text-brand-warmCream hover:text-brand-goldenYellow transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto">
          
          {/* Order Reference Search */}
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Enter Order Code (e.g. PRETO-849201)..."
                className="w-full px-4 py-2.5 pl-10 rounded-xl bg-brand-charcoal border border-brand-goldenYellow/25 text-xs text-brand-warmCream placeholder-brand-warmCream/40 focus:outline-none focus:border-brand-goldenYellow uppercase"
              />
              <Search className="w-4 h-4 text-brand-goldenYellow absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-goldenYellow to-brand-burntOrange text-brand-charcoal font-heading font-black text-xs uppercase tracking-wider"
            >
              Track
            </button>
          </form>

          {currentOrder ? (
            <div className="space-y-6">
              {/* Order Status Banner */}
              <div className="p-5 rounded-2xl bg-brand-charcoal border border-brand-goldenYellow/25 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] text-brand-warmCream/60 uppercase block">Active Tracking</span>
                  <span className="font-mono font-black text-lg text-brand-goldenYellow">{currentOrder.orderId}</span>
                  <span className="text-xs text-brand-warmCream/80 block mt-0.5">
                    {currentOrder.itemsCount} Items • {currentOrder.totalFormatted}
                  </span>
                </div>

                <div className="text-right sm:text-right bg-brand-surfaceCard px-4 py-2 rounded-xl border border-brand-goldenYellow/20">
                  <span className="text-[10px] text-brand-warmCream/60 uppercase block">Estimated Delivery</span>
                  <span className="font-display text-2xl font-black text-emerald-400">
                    ~{currentOrder.estimatedMinutes} mins
                  </span>
                </div>
              </div>

              {/* 5-Step Stepper */}
              <div className="space-y-4 py-2">
                {steps.map((step, idx) => {
                  const isDone = idx < currentStepIdx;
                  const isCurrent = idx === currentStepIdx;
                  const isPending = idx > currentStepIdx;
                  const Icon = step.icon;

                  return (
                    <div key={step.key} className="flex items-start gap-4 relative">
                      {/* Vertical line connecting steps */}
                      {idx < steps.length - 1 && (
                        <div
                          className={`absolute left-5 top-10 w-0.5 h-8 transition-colors ${
                            idx < currentStepIdx ? 'bg-brand-goldenYellow' : 'bg-brand-goldenYellow/20'
                          }`}
                        />
                      )}

                      {/* Step Circle Icon */}
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-2 transition-all ${
                          isDone
                            ? 'bg-brand-goldenYellow text-brand-charcoal border-brand-goldenYellow shadow-glow-yellow'
                            : isCurrent
                            ? 'bg-brand-burntOrange text-white border-brand-goldenYellow animate-pulse-glow shadow-glow-orange'
                            : 'bg-brand-charcoal text-brand-warmCream/40 border-brand-goldenYellow/20'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>

                      {/* Step Text Info */}
                      <div className="pt-1 flex-1">
                        <div className="flex items-center justify-between">
                          <h4
                            className={`font-heading font-black text-sm ${
                              isCurrent
                                ? 'text-brand-goldenYellow'
                                : isDone
                                ? 'text-brand-warmCream'
                                : 'text-brand-warmCream/50'
                            }`}
                          >
                            {step.title}
                          </h4>
                          {isCurrent && (
                            <span className="text-[10px] text-brand-burntOrange font-bold px-2 py-0.5 rounded-full bg-brand-burntOrange/10 border border-brand-burntOrange/30 animate-pulse">
                              In Progress
                            </span>
                          )}
                          {isDone && (
                            <span className="text-[10px] text-emerald-400 font-bold">
                              Completed
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-brand-warmCream/70 font-light mt-0.5">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Delivery Address & Contact Row */}
              {currentOrder.deliveryAddress && (
                <div className="p-4 rounded-xl bg-brand-charcoal/80 border border-brand-goldenYellow/20 text-xs flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-brand-goldenYellow shrink-0" />
                  <div>
                    <span className="text-brand-warmCream/60 block text-[10px] uppercase">Destination</span>
                    <span className="text-brand-warmCream font-medium">{currentOrder.deliveryAddress}</span>
                  </div>
                </div>
              )}

              {/* Help & WhatsApp Sync */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <a
                  href={RESTAURANT_INFO.socials.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-4 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-heading font-black text-xs uppercase tracking-wider shadow-md flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Order Updates via WhatsApp</span>
                </a>
                <a
                  href={`tel:${RESTAURANT_INFO.phone}`}
                  className="py-3 px-6 rounded-full bg-brand-charcoal border border-brand-goldenYellow text-brand-goldenYellow hover:bg-brand-burntOrange hover:text-white font-heading font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Kitchen</span>
                </a>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 space-y-3">
              <p className="text-xs text-brand-warmCream/70">No active order found. Please place an order first or enter your reference code.</p>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
