import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { X, Plus, Minus, Flame, Clock, Sparkles, MessageCircle, ShoppingBag } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

export const FoodDetailModal: React.FC = () => {
  const { selectedFoodModal, setSelectedFoodModal, addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');

  if (!selectedFoodModal) return null;

  const item = selectedFoodModal;
  const totalPrice = item.price * quantity;

  const handleAdd = () => {
    addToCart(item, quantity, notes);
    setSelectedFoodModal(null);
    setQuantity(1);
    setNotes('');
  };

  const handleQuickWhatsApp = () => {
    const text = `Hello Pretodan Restaurant! I would like to order:\n*${item.name}*\nQuantity: ${quantity}\nTotal: $${totalPrice}.00\n${
      notes ? `Special Notes: ${notes}\n` : ''
    }Please confirm availability and preparation time.`;
    const url = `https://wa.me/${RESTAURANT_INFO.whatsappInternational}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-charcoal/85 backdrop-blur-md animate-fade-scale">
      <div className="relative w-full max-w-2xl bg-gradient-to-b from-brand-surfaceCard to-brand-charcoal rounded-3xl border border-brand-goldenYellow/35 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Close Button */}
        <button
          onClick={() => setSelectedFoodModal(null)}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-brand-charcoal/80 text-brand-warmCream hover:text-brand-goldenYellow hover:bg-brand-burntOrange/30 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header Media */}
        <div className="relative h-60 sm:h-72 w-full flex-shrink-0 overflow-hidden bg-brand-charcoal">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover filter brightness-95"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-surfaceCard via-transparent to-transparent" />
          
          {/* Category & Tags Pill */}
          <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
            <span className="px-3 py-1 rounded-full bg-brand-charcoal/90 border border-brand-goldenYellow/40 text-brand-goldenYellow text-xs font-bold uppercase tracking-wider">
              {item.categoryLabel}
            </span>
            {item.spicyLevel && item.spicyLevel > 0 ? (
              <span className="px-3 py-1 rounded-full bg-brand-burntOrange/90 text-white text-xs font-bold flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 text-brand-goldenYellow" />
                <span>{'🌶️'.repeat(item.spicyLevel)} Spice</span>
              </span>
            ) : null}
            {item.prepTime && (
              <span className="px-3 py-1 rounded-full bg-brand-charcoal/80 text-brand-warmCream/90 text-xs font-medium flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-brand-goldenYellow" />
                <span>{item.prepTime}</span>
              </span>
            )}
            {item.calories && (
              <span className="px-3 py-1 rounded-full bg-brand-charcoal/80 text-brand-goldenYellow/90 text-xs font-medium">
                {item.calories}
              </span>
            )}
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="font-heading font-black text-2xl sm:text-3xl text-brand-goldenYellow leading-tight">
                {item.name}
              </h3>
              <p className="text-sm text-brand-warmCream/80 mt-2 leading-relaxed">
                {item.description}
              </p>
            </div>
            <div className="text-right flex-shrink-0">
              <span className="text-xs text-brand-warmCream/60 block">Price</span>
              <span className="font-display text-2xl sm:text-3xl font-black text-gradient-gold">
                ${item.price}.00
              </span>
            </div>
          </div>

          {/* Customization / Special Instructions */}
          <div className="space-y-2 pt-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-brand-warmCream/70">
              Kitchen Preparation Notes / Preferences (Optional):
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Extra sauce on side, medium temperature, gluten allergy..."
              className="w-full px-4 py-2.5 rounded-xl bg-brand-charcoal border border-brand-goldenYellow/25 focus:border-brand-goldenYellow text-xs text-brand-warmCream placeholder-brand-warmCream/40 focus:outline-none"
            />
          </div>

          {/* Tags list */}
          {item.tags && item.tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 pt-1">
              {item.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-md bg-brand-charcoal border border-brand-goldenYellow/20 text-[11px] text-brand-warmCream/70"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="p-6 border-t border-brand-goldenYellow/20 bg-brand-charcoal/90 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Quantity Selector */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-warmCream/70">
              Quantity:
            </span>
            <div className="flex items-center bg-brand-surfaceCard rounded-xl border border-brand-goldenYellow/30 p-1">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-brand-goldenYellow hover:bg-brand-burntOrange/20 transition-colors"
                aria-label="Decrease quantity"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-8 text-center text-sm font-mono font-bold text-brand-warmCream">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-brand-goldenYellow hover:bg-brand-burntOrange/20 transition-colors"
                aria-label="Increase quantity"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={handleQuickWhatsApp}
              className="p-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-md transition-colors"
              title="Quick WhatsApp Order"
              aria-label="Quick WhatsApp Order"
            >
              <MessageCircle className="w-5 h-5" />
            </button>

            <button
              onClick={handleAdd}
              className="flex-1 sm:flex-none px-6 py-3 rounded-full bg-gradient-to-r from-brand-goldenYellow via-brand-burntOrange to-brand-goldenYellow text-brand-charcoal font-heading font-black text-xs uppercase tracking-wider shadow-glow-yellow hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add to Cart • ${totalPrice}.00</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
