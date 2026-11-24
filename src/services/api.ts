/**
 * Pretodan Restaurant API Client
 * Connects frontend components to the backend API with graceful offline/local fallback.
 */

const API_BASE = (import.meta as any).env?.VITE_API_BASE_URL || '/api';

export interface ApiOrderPayload {
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    specialInstructions?: string;
  }>;
  deliveryAddress: string;
  customerNotes?: string;
  customerName?: string;
  customerPhone?: string;
  paymentMethod?: 'card' | 'bank_transfer' | 'whatsapp' | 'cash';
  paymentStatus?: 'paid' | 'pending';
}

export interface ApiReservationPayload {
  guestName: string;
  email: string;
  phone: string;
  date: string;
  timeSlot: string;
  guestsCount: number;
  seatingArea: string;
  occasion: string;
  specialRequests?: string;
}

export interface ApiReviewPayload {
  name: string;
  content: string;
  rating: number;
  favoriteDish: string;
}

export interface ApiContactPayload {
  fullName: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}

export interface ApiVipPayload {
  name: string;
  email: string;
  phone?: string;
}

export const restaurantApi = {
  // Health Check
  async checkHealth() {
    try {
      const res = await fetch(`${API_BASE}/health`, { signal: AbortSignal.timeout(4000) });
      if (!res.ok) throw new Error('Health check failed');
      return await res.json();
    } catch {
      return { status: 'offline', localFallback: true };
    }
  },

  // Menu
  async getMenu(category?: string, search?: string) {
    try {
      const params = new URLSearchParams();
      if (category && category !== 'all') params.append('category', category);
      if (search) params.append('search', search);

      const res = await fetch(`${API_BASE}/menu?${params.toString()}`, { signal: AbortSignal.timeout(5000) });
      if (!res.ok) throw new Error('Failed to fetch menu');
      const data = await res.json();
      return data.data;
    } catch (err) {
      console.warn('[Pretodan API] Menu fetch fallback to local cache:', err);
      return null; // Signals caller to use local MENU_ITEMS
    }
  },

  // Orders
  async createOrder(payload: ApiOrderPayload) {
    try {
      const res = await fetch(`${API_BASE}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(6000)
      });
      if (!res.ok) throw new Error('Failed to place order via API');
      const data = await res.json();
      return data.data;
    } catch (err) {
      console.warn('[Pretodan API] Order creation fallback:', err);
      // Fallback local simulation
      const subtotal = payload.items.reduce((sum, it) => sum + it.price * it.quantity, 0);
      const deliveryFee = subtotal >= 70 ? 0 : 12;
      const totalAmount = subtotal + deliveryFee;
      const orderId = `PRETO-${Math.floor(100000 + Math.random() * 900000)}`;

      return {
        orderId,
        status: 'preparing',
        customerName: payload.customerName || 'Pretodan Patron',
        customerPhone: payload.customerPhone || '',
        deliveryAddress: payload.deliveryAddress,
        customerNotes: payload.customerNotes || '',
        items: payload.items,
        itemsCount: payload.items.reduce((sum, it) => sum + it.quantity, 0),
        subtotal,
        deliveryFee,
        totalAmount,
        totalFormatted: `$${totalAmount}.00`,
        paymentMethod: payload.paymentMethod || 'card',
        paymentStatus: payload.paymentStatus || 'paid',
        estimatedMinutes: 25,
        timestamp: 'Just now',
        createdAt: new Date().toISOString()
      };
    }
  },

  async trackOrder(orderId: string) {
    try {
      const res = await fetch(`${API_BASE}/orders/${encodeURIComponent(orderId)}`, {
        signal: AbortSignal.timeout(5000)
      });
      if (!res.ok) throw new Error('Order not found');
      const data = await res.json();
      return data.data;
    } catch (err) {
      console.warn('[Pretodan API] Order tracker fallback:', err);
      return null;
    }
  },

  // Reservations
  async createReservation(payload: ApiReservationPayload) {
    try {
      const res = await fetch(`${API_BASE}/reservations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(6000)
      });
      if (!res.ok) throw new Error('Failed to book reservation via API');
      const data = await res.json();
      return data.data;
    } catch (err) {
      console.warn('[Pretodan API] Reservation fallback:', err);
      return {
        id: `TBL-${Math.floor(100000 + Math.random() * 900000)}`,
        ...payload,
        status: 'confirmed',
        createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      };
    }
  },

  async getReservation(id: string) {
    try {
      const res = await fetch(`${API_BASE}/reservations/${encodeURIComponent(id)}`, {
        signal: AbortSignal.timeout(5000)
      });
      if (!res.ok) throw new Error('Reservation not found');
      const data = await res.json();
      return data.data;
    } catch (err) {
      console.warn('[Pretodan API] Get reservation fallback:', err);
      return null;
    }
  },

  // Reviews
  async getReviews() {
    try {
      const res = await fetch(`${API_BASE}/reviews`, { signal: AbortSignal.timeout(5000) });
      if (!res.ok) throw new Error('Failed to fetch reviews');
      const data = await res.json();
      return data.data;
    } catch (err) {
      console.warn('[Pretodan API] Reviews fetch fallback:', err);
      return null;
    }
  },

  async submitReview(payload: ApiReviewPayload) {
    try {
      const res = await fetch(`${API_BASE}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(6000)
      });
      if (!res.ok) throw new Error('Failed to submit review');
      const data = await res.json();
      return data.data;
    } catch (err) {
      console.warn('[Pretodan API] Review submit fallback:', err);
      return {
        id: `rev-${Date.now()}`,
        name: payload.name,
        role: 'Verified Guest',
        location: 'Pretodan Dining Guest',
        content: payload.content,
        rating: payload.rating,
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
        favoriteDish: payload.favoriteDish,
        createdAt: new Date().toISOString()
      };
    }
  },

  // Contact Inquiry Form
  async submitContact(payload: ApiContactPayload) {
    try {
      const res = await fetch(`${API_BASE}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(6000)
      });
      if (!res.ok) throw new Error('Failed to submit contact message');
      const data = await res.json();
      return data;
    } catch (err) {
      console.warn('[Pretodan API] Contact submit fallback:', err);
      return {
        success: true,
        ticketId: `MSG-${Date.now().toString(36).toUpperCase()}`,
        message: 'Your inquiry has been received by Pretodan Hospitality Concierge.'
      };
    }
  },

  // VIP Club
  async joinVip(payload: ApiVipPayload) {
    try {
      const res = await fetch(`${API_BASE}/vip/join`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(6000)
      });
      if (!res.ok) throw new Error('Failed to join VIP club');
      return await res.json();
    } catch (err) {
      console.warn('[Pretodan API] VIP join fallback:', err);
      return {
        success: true,
        message: `Welcome to Pretodan VIP Club, ${payload.name}!`,
        couponCode: 'PRETOVIP15'
      };
    }
  }
};
