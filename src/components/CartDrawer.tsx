import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { X, Trash2, Plus, Minus, MessageCircle, CreditCard, ShoppingBag, ArrowRight, ShieldCheck, MapPin } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    subtotal,
    deliveryFee,
    totalAmount,
    isCartOpen,
    setIsCartOpen,
    setIsPaystackOpen,
    formatPrice,
    generateWhatsAppOrderUrl,
  } = useCart();

  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [customerNotes, setCustomerNotes] = useState('');

  if (!isCartOpen) return null;

  const handleWhatsAppCheckout = () => {
    const url = generateWhatsAppOrderUrl(customerNotes, deliveryAddress);
    window.open(url, '_blank');
  };

  const handlePaystackCheckout = () => {
    setIsPaystackOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-brand-charcoal/80 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-gradient-to-b from-brand-charcoal via-brand-surfaceCard to-brand-charcoal border-l border-brand-goldenYellow/25 shadow-2xl flex flex-col justify-between">
          
          {/* Cart Header */}
          <div className="p-6 border-b border-brand-goldenYellow/20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-brand-surfaceCard border border-brand-goldenYellow/30 text-brand-goldenYellow">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-heading font-black text-xl text-brand-goldenYellow">
                  Your Order Cart
                </h2>
                <span className="text-xs text-brand-warmCream/70 font-sans">
                  {totalItems} {totalItems === 1 ? 'item' : 'items'} selected
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {cart.length > 0 && (
                <button
                  onClick={clearCart}
                  className="text-xs text-brand-burntOrange hover:text-brand-goldenYellow transition-colors px-2 py-1"
                  title="Clear all items"
                >
                  Clear
                </button>
              )}
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 rounded-full bg-brand-surfaceCard text-brand-warmCream hover:text-brand-goldenYellow hover:bg-brand-burntOrange/20 transition-colors"
                aria-label="Close cart drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4">
                <div className="w-20 h-20 rounded-full bg-brand-surfaceCard border border-brand-goldenYellow/20 flex items-center justify-center text-brand-goldenYellow">
                  <ShoppingBag className="w-10 h-10 stroke-[1.5]" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-heading font-bold text-lg text-brand-goldenYellow">
                    Your cart is currently empty
                  </h3>
                  <p className="text-xs text-brand-warmCream/70 max-w-xs">
                    Explore our continental delicacies: grilled chicken, aged ribeye steaks, artisanal pastas, and seafood to start your order!
                  </p>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-6 py-2.5 rounded-full bg-gradient-to-r from-brand-goldenYellow to-brand-burntOrange text-brand-charcoal font-heading font-black text-xs uppercase tracking-wider shadow-glow-yellow"
                >
                  Start Ordering
                </button>
              </div>
            ) : (
              <>
                <div className="space-y-3">
                  {cart.map((cartItem) => {
                    const itemTotal = cartItem.item.price * cartItem.quantity;
                    return (
                      <div
                        key={cartItem.item.id}
                        className="p-3.5 rounded-2xl bg-brand-surfaceCard/90 border border-brand-goldenYellow/15 flex gap-3.5 items-center group hover:border-brand-goldenYellow/35 transition-colors"
                      >
                        {/* Food Thumb */}
                        <img
                          src={cartItem.item.image}
                          alt={cartItem.item.name}
                          className="w-16 h-16 rounded-xl object-cover border border-brand-goldenYellow/20 flex-shrink-0"
                        />

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-heading font-bold text-sm text-brand-warmCream truncate">
                            {cartItem.item.name}
                          </h4>
                          <span className="text-xs text-brand-goldenYellow font-mono font-bold block mt-0.5">
                            {formatPrice(cartItem.item.price)}
                          </span>
                          {cartItem.specialInstructions && (
                            <span className="text-[11px] text-brand-warmCream/60 italic truncate block">
                              Note: {cartItem.specialInstructions}
                            </span>
                          )}

                          {/* Quantity Controls */}
                          <div className="flex items-center gap-2 mt-2">
                            <div className="flex items-center bg-brand-charcoal rounded-lg border border-brand-goldenYellow/20 p-0.5">
                              <button
                                onClick={() => updateQuantity(cartItem.item.id, cartItem.quantity - 1)}
                                className="w-6 h-6 flex items-center justify-center text-brand-goldenYellow hover:bg-brand-surfaceCard rounded transition-colors"
                                aria-label="Decrease quantity"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="w-6 text-center text-xs font-mono font-bold text-brand-warmCream">
                                {cartItem.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(cartItem.item.id, cartItem.quantity + 1)}
                                className="w-6 h-6 flex items-center justify-center text-brand-goldenYellow hover:bg-brand-surfaceCard rounded transition-colors"
                                aria-label="Increase quantity"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            <span className="text-xs font-mono font-semibold text-brand-warmCream/90 ml-auto">
                              {formatPrice(itemTotal)}
                            </span>

                            <button
                              onClick={() => removeFromCart(cartItem.item.id)}
                              className="text-brand-warmCream/40 hover:text-brand-burntOrange transition-colors p-1"
                              aria-label={`Remove ${cartItem.item.name}`}
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Delivery Address & Notes Inputs */}
                <div className="pt-4 space-y-3 border-t border-brand-goldenYellow/15">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-brand-warmCream/80 mb-1 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-brand-goldenYellow" />
                      <span>Delivery Address / Location:</span>
                    </label>
                    <input
                      type="text"
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      placeholder="e.g. 123 Continental Way, Suite 4B"
                      className="w-full px-3.5 py-2 rounded-xl bg-brand-charcoal border border-brand-goldenYellow/20 focus:border-brand-goldenYellow text-xs text-brand-warmCream placeholder-brand-warmCream/40"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-brand-warmCream/80 mb-1">
                      Preparation Instructions / Preferred Time:
                    </label>
                    <input
                      type="text"
                      value={customerNotes}
                      onChange={(e) => setCustomerNotes(e.target.value)}
                      placeholder="e.g. Medium-rare steak, deliver by 7:30 PM"
                      className="w-full px-3.5 py-2 rounded-xl bg-brand-charcoal border border-brand-goldenYellow/20 focus:border-brand-goldenYellow text-xs text-brand-warmCream placeholder-brand-warmCream/40"
                    />
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Cart Footer & Checkout Buttons */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-brand-goldenYellow/20 bg-brand-charcoal/95 space-y-4">
              {/* Financial Breakdown */}
              <div className="space-y-1.5 text-xs text-brand-warmCream/80">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-mono font-semibold text-brand-warmCream">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Delivery:</span>
                  <span className="font-mono font-semibold text-brand-warmCream">
                    {deliveryFee === 0 ? 'FREE' : formatPrice(deliveryFee)}
                  </span>
                </div>
                {deliveryFee === 0 && (
                  <span className="text-[10px] text-emerald-400 block font-semibold">
                    ✨ Free delivery applied!
                  </span>
                )}
                <div className="flex justify-between pt-2 border-t border-brand-goldenYellow/20 text-sm font-bold text-brand-goldenYellow">
                  <span>Total Amount:</span>
                  <span className="font-display text-2xl font-black text-gradient-gold">
                    {formatPrice(totalAmount)}
                  </span>
                </div>
              </div>

              {/* Checkout Option 1: WhatsApp Checkout */}
              <button
                onClick={handleWhatsAppCheckout}
                className="w-full py-3.5 px-4 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-heading font-black text-sm uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 active:scale-95 transition-all"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Order via WhatsApp ({RESTAURANT_INFO.phoneDisplay})</span>
              </button>

              {/* Checkout Option 2: Online Payment / Card */}
              <button
                onClick={handlePaystackCheckout}
                className="w-full py-3 px-4 rounded-full bg-gradient-to-r from-brand-goldenYellow via-brand-burntOrange to-brand-goldenYellow text-brand-charcoal font-heading font-black text-xs uppercase tracking-wider shadow-glow-yellow hover:opacity-95 flex items-center justify-center gap-2 active:scale-95 transition-all"
              >
                <CreditCard className="w-4 h-4" />
                <span>Pay Online (Credit Card / Bank)</span>
              </button>

              <div className="text-center text-[11px] text-brand-warmCream/50 flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-brand-goldenYellow" />
                <span>Encrypted Order Security • Pretodan Restaurant</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
