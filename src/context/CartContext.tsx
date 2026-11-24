import React, { createContext, useContext, useState, useEffect } from 'react';
import { MenuItem, CartItem, CurrencyCode, TableReservation, OrderStatus } from '../types';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface CartContextType {
  // Cart operations
  cart: CartItem[];
  addToCart: (item: MenuItem, quantity?: number, specialInstructions?: string) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  deliveryFee: number;
  totalAmount: number;

  // Currency & Formatting
  currency: CurrencyCode;
  setCurrency: (c: CurrencyCode) => void;
  formatPrice: (usdPrice: number) => string;

  // Favorites / Wishlist
  favorites: string[];
  toggleFavorite: (itemId: string) => void;
  isFavorite: (itemId: string) => boolean;

  // Overlays & Modal triggers
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isPaystackOpen: boolean;
  setIsPaystackOpen: (open: boolean) => void;
  selectedFoodModal: MenuItem | null;
  setSelectedFoodModal: (item: MenuItem | null) => void;

  // Web App Modals
  isReservationOpen: boolean;
  setIsReservationOpen: (open: boolean) => void;
  activeReservation: TableReservation | null;
  saveReservation: (res: TableReservation) => void;

  isTrackingOpen: boolean;
  setIsTrackingOpen: (open: boolean) => void;
  trackedOrder: OrderStatus | null;
  trackOrderById: (orderId: string) => void;
  recentOrders: OrderStatus[];

  isVipOpen: boolean;
  setIsVipOpen: (open: boolean) => void;
  isReviewOpen: boolean;
  setIsReviewOpen: (open: boolean) => void;

  // PWA Install Prompt
  canInstallPwa: boolean;
  promptPwaInstall: () => void;

  // Toast
  toastMessage: string | null;
  showToast: (msg: string) => void;
  generateWhatsAppOrderUrl: (customerNotes?: string, deliveryAddress?: string) => string;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CURRENCY_RATES: Record<CurrencyCode, { symbol: string; rate: number; prefix: boolean }> = {
  USD: { symbol: '$', rate: 1.0, prefix: true },
  EUR: { symbol: '€', rate: 0.92, prefix: true },
  GBP: { symbol: '£', rate: 0.79, prefix: true },
  NGN: { symbol: '₦', rate: 1550, prefix: true },
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Cart state persisted to localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('pretodan_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Currency state
  const [currency, setCurrency] = useState<CurrencyCode>(() => {
    try {
      const saved = localStorage.getItem('pretodan_currency');
      return (saved as CurrencyCode) || 'USD';
    } catch {
      return 'USD';
    }
  });

  // Favorites state persisted to localStorage
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('pretodan_favorites');
      return saved ? JSON.parse(saved) : ['beef-1', 'chk-2', 'pas-1', 'sea-2'];
    } catch {
      return ['beef-1', 'chk-2', 'pas-1', 'sea-2'];
    }
  });

  // Active reservation persisted to localStorage
  const [activeReservation, setActiveReservation] = useState<TableReservation | null>(() => {
    try {
      const saved = localStorage.getItem('pretodan_reservation');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Recent Orders list for Tracker
  const [recentOrders, setRecentOrders] = useState<OrderStatus[]>(() => {
    try {
      const saved = localStorage.getItem('pretodan_orders');
      return saved ? JSON.parse(saved) : [
        {
          orderId: 'PRETO-849201',
          status: 'preparing',
          estimatedMinutes: 22,
          timestamp: 'Today, 7:15 PM',
          itemsCount: 3,
          totalFormatted: '$94.00',
          deliveryAddress: '123 Grand Continental Boulevard, Suite 4B'
        }
      ];
    } catch {
      return [];
    }
  });

  // Tracked order for tracker modal
  const [trackedOrder, setTrackedOrder] = useState<OrderStatus | null>(null);

  // Modals & Overlays
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isPaystackOpen, setIsPaystackOpen] = useState(false);
  const [selectedFoodModal, setSelectedFoodModal] = useState<MenuItem | null>(null);
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);
  const [isVipOpen, setIsVipOpen] = useState(false);
  const [isReviewOpen, setIsReviewOpen] = useState(false);

  // PWA Install prompt event
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [canInstallPwa, setCanInstallPwa] = useState(false);

  // Toast Message
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('pretodan_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('pretodan_currency', currency);
    } catch (e) {
      console.error(e);
    }
  }, [currency]);

  useEffect(() => {
    try {
      localStorage.setItem('pretodan_favorites', JSON.stringify(favorites));
    } catch (e) {
      console.error(e);
    }
  }, [favorites]);

  useEffect(() => {
    try {
      if (activeReservation) {
        localStorage.setItem('pretodan_reservation', JSON.stringify(activeReservation));
      }
    } catch (e) {
      console.error(e);
    }
  }, [activeReservation]);

  useEffect(() => {
    try {
      localStorage.setItem('pretodan_orders', JSON.stringify(recentOrders));
    } catch (e) {
      console.error(e);
    }
  }, [recentOrders]);

  // Listen for PWA beforeinstallprompt event
  useEffect(() => {
    const handleBeforeInstall = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setCanInstallPwa(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
  }, []);

  const promptPwaInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      showToast('Thank you for installing Pretodan Restaurant App! 📱');
    }
    setDeferredPrompt(null);
    setCanInstallPwa(false);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3400);
  };

  // Currency Converter Formatter
  const formatPrice = (usdPrice: number): string => {
    const config = CURRENCY_RATES[currency] || CURRENCY_RATES.USD;
    const converted = usdPrice * config.rate;
    if (currency === 'NGN') {
      return `${config.symbol}${Math.round(converted).toLocaleString()}`;
    }
    return `${config.symbol}${converted.toFixed(2)}`;
  };

  // Favorites toggle
  const toggleFavorite = (itemId: string) => {
    setFavorites((prev) => {
      const exists = prev.includes(itemId);
      if (exists) {
        showToast('Removed from your favorites');
        return prev.filter((id) => id !== itemId);
      } else {
        showToast('Added to your favorite dishes! ❤️');
        return [...prev, itemId];
      }
    });
  };

  const isFavorite = (itemId: string) => favorites.includes(itemId);

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

  const saveReservation = (res: TableReservation) => {
    setActiveReservation(res);
    showToast(`Table confirmed! Reference #${res.id} 🥂`);
  };

  const trackOrderById = (orderId: string) => {
    const found = recentOrders.find((o) => o.orderId.toUpperCase() === orderId.trim().toUpperCase());
    if (found) {
      setTrackedOrder(found);
    } else {
      // Create active tracker simulation for the ID entered
      const mockOrder: OrderStatus = {
        orderId: orderId.toUpperCase(),
        status: 'preparing',
        estimatedMinutes: 25,
        timestamp: 'Just now',
        itemsCount: 2,
        totalFormatted: formatPrice(totalAmount > 0 ? totalAmount : 75),
        deliveryAddress: RESTAURANT_INFO.addressDisplay,
      };
      setTrackedOrder(mockOrder);
    }
    setIsTrackingOpen(true);
  };

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
      message += `   Qty: ${ci.quantity} × ${formatPrice(ci.item.price)} = *${formatPrice(itemTotal)}*\n`;
      if (ci.specialInstructions) {
        message += `   _Note: ${ci.specialInstructions}_\n`;
      }
    });

    message += `\n──────────────────────\n`;
    message += `*Subtotal:* ${formatPrice(subtotal)}\n`;
    message += `*Estimated Delivery:* ${deliveryFee === 0 ? 'FREE' : formatPrice(deliveryFee)} ${deliveryFee === 0 && subtotal >= 70 ? '(Free Delivery promo!)' : ''}\n`;
    message += `*TOTAL PAYABLE:* ${formatPrice(totalAmount)}\n`;
    message += `──────────────────────\n`;

    if (deliveryAddress) {
      message += `🏠 *Delivery Address:* ${deliveryAddress}\n`;
    }
    if (customerNotes) {
      message += `📝 *Kitchen Instructions:* ${customerNotes}\n`;
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
        currency,
        setCurrency,
        formatPrice,
        favorites,
        toggleFavorite,
        isFavorite,
        isCartOpen,
        setIsCartOpen,
        isPaystackOpen,
        setIsPaystackOpen,
        selectedFoodModal,
        setSelectedFoodModal,
        isReservationOpen,
        setIsReservationOpen,
        activeReservation,
        saveReservation,
        isTrackingOpen,
        setIsTrackingOpen,
        trackedOrder,
        trackOrderById,
        recentOrders,
        isVipOpen,
        setIsVipOpen,
        isReviewOpen,
        setIsReviewOpen,
        canInstallPwa,
        promptPwaInstall,
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
