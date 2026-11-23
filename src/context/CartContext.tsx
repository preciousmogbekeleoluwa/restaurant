import React, { createContext, useContext, useState, useEffect } from 'react';
import { MenuItem, CartItem } from '../types';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: MenuItem, quantity?: number, specialInstructions?: string) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  deliveryFee: number;
  totalAmount: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isPaystackOpen: boolean;
  setIsPaystackOpen: (open: boolean) => void;
  selectedFoodModal: MenuItem | null;
  setSelectedFoodModal: (item: MenuItem | null) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
  generateWhatsAppOrderUrl: (customerNotes?: string, deliveryAddress?: string) => string;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('pretodan_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isPaystackOpen, setIsPaystackOpen] = useState(false);
  const [selectedFoodModal, setSelectedFoodModal] = useState<MenuItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('pretodan_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3200);
  };

  const addToCart = (item: MenuItem, quantity = 1, specialInstructions?: string) => {
    setCart((prev) => {
      const existing = prev.find((ci) => ci.item.id === item.id);
      if (existing) {
        return prev.map((ci) =>
          ci.item.id === item.id
            ? { ...ci, quantity: ci.quantity + quantity, specialInstructions: specialInstructions || ci.specialInstructions }
            : ci
        );
      }
      return [...prev, { item, quantity, specialInstructions }];
    });
    showToast(`Added "${item.name}" to your order! 🍽️`);
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => prev.filter((ci) => ci.item.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCart((prev) =>
      prev.map((ci) => (ci.item.id === itemId ? { ...ci, quantity } : ci))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalItems = cart.reduce((acc, curr) => acc + curr.quantity, 0);
  const subtotal = cart.reduce((acc, curr) => acc + curr.item.price * curr.quantity, 0);
  // Delivery fee $5, or free over $70
  const deliveryFee = subtotal > 0 ? (subtotal >= 70 ? 0 : 5) : 0;
  const totalAmount = subtotal + deliveryFee;

  const generateWhatsAppOrderUrl = (customerNotes?: string, deliveryAddress?: string) => {
    const phoneNumber = RESTAURANT_INFO.whatsappInternational;
    if (cart.length === 0) {
      return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
        `Hello ${RESTAURANT_INFO.name}! I would like to place an order from your Continental menu.`
      )}`;
    }

    let message = `🍽️ *NEW ORDER — ${RESTAURANT_INFO.name.toUpperCase()}*\n`;
    message += `📍 *Category:* Continental Restaurant\n`;
    message += `──────────────────────\n`;
    message += `*ORDER ITEMS:*\n\n`;

    cart.forEach((ci, idx) => {
      const itemTotal = ci.item.price * ci.quantity;
      message += `${idx + 1}. *${ci.item.name}*\n`;
      message += `   Qty: ${ci.quantity} × $${ci.item.price}.00 = *$${itemTotal}.00*\n`;
      if (ci.specialInstructions) {
        message += `   _Note: ${ci.specialInstructions}_\n`;
      }
    });

    message += `\n──────────────────────\n`;
    message += `*Subtotal:* $${subtotal}.00\n`;
    message += `*Estimated Delivery Fee:* $${deliveryFee}.00 ${deliveryFee === 0 && subtotal >= 70 ? '(Free Delivery applied!)' : ''}\n`;
    message += `*TOTAL PAYABLE:* $${totalAmount}.00\n`;
    message += `──────────────────────\n`;

    if (deliveryAddress) {
      message += `🏠 *Delivery Address / Notes:* ${deliveryAddress}\n`;
    }
    if (customerNotes) {
      message += `📝 *Customer Instructions:* ${customerNotes}\n`;
    }

    message += `\nPlease confirm availability and estimated preparation time. Thank you!`;

    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        deliveryFee,
        totalAmount,
        isCartOpen,
        setIsCartOpen,
        isPaystackOpen,
        setIsPaystackOpen,
        selectedFoodModal,
        setSelectedFoodModal,
        toastMessage,
        showToast,
        generateWhatsAppOrderUrl,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};
