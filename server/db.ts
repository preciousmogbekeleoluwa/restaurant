import fs from 'fs';
import path from 'path';
import {
  BackendMenuItem,
  BackendOrder,
  BackendReservation,
  BackendReview,
  BackendContactMessage,
  BackendVipMember,
  BackendCustomerUser,
  INITIAL_MENU_ITEMS,
  INITIAL_REVIEWS,
  INITIAL_ORDERS,
  INITIAL_RESERVATIONS,
  INITIAL_USERS
} from './data/seedData';

interface DatabaseSchema {
  menu: BackendMenuItem[];
  orders: BackendOrder[];
  reservations: BackendReservation[];
  reviews: BackendReview[];
  contactMessages: BackendContactMessage[];
  vipMembers: BackendVipMember[];
  users: BackendCustomerUser[];
}

class Database {
  private data: DatabaseSchema;
  private dbPath: string;
  private isPersistable: boolean = true;

  constructor() {
    this.dbPath = path.resolve(process.cwd(), 'server', 'data', 'store.json');
    this.data = {
      menu: [...INITIAL_MENU_ITEMS],
      orders: [...INITIAL_ORDERS],
      reservations: [...INITIAL_RESERVATIONS],
      reviews: [...INITIAL_REVIEWS],
      contactMessages: [],
      vipMembers: [
        {
          id: 'VIP-001',
          name: 'Vivienne Montgomery',
          email: 'vivienne@example.com',
          phone: '+1 (555) 234-8901',
          tier: 'Gold Gourmet Concierge',
          points: 720,
          joinedAt: new Date().toISOString()
        }
      ],
      users: [...INITIAL_USERS]
    };

    this.loadFromDisk();
  }

  private loadFromDisk(): void {
    try {
      if (fs.existsSync(this.dbPath)) {
        const fileContent = fs.readFileSync(this.dbPath, 'utf-8');
        const parsed = JSON.parse(fileContent);
        if (parsed.menu && parsed.orders) {
          this.data = parsed;
        }
      }
    } catch (err) {
      // In serverless / read-only environment, keep in-memory data
      this.isPersistable = false;
    }
  }

  private saveToDisk(): void {
    if (!this.isPersistable) return;
    try {
      const dir = path.dirname(this.dbPath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(this.dbPath, JSON.stringify(this.data, null, 2), 'utf-8');
    } catch {
      // If disk is read-only (e.g. Vercel Lambda), smoothly continue in memory
      this.isPersistable = false;
    }
  }

  // --- MENU ---
  getMenu(category?: string, search?: string): BackendMenuItem[] {
    let result = [...this.data.menu];
    if (category && category !== 'all') {
      result = result.filter(item => item.category.toLowerCase() === category.toLowerCase());
    }
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        item => item.name.toLowerCase().includes(q) || item.description.toLowerCase().includes(q)
      );
    }
    return result;
  }

  getMenuItemById(id: string): BackendMenuItem | undefined {
    return this.data.menu.find(item => item.id === id);
  }

  // --- ORDERS ---
  getOrders(): BackendOrder[] {
    return [...this.data.orders].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  getOrderByReference(orderId: string): BackendOrder | undefined {
    const cleanId = orderId.trim().toUpperCase();
    return this.data.orders.find(o => o.orderId.toUpperCase() === cleanId);
  }

  createOrder(orderData: Omit<BackendOrder, 'orderId' | 'createdAt' | 'status'> & { orderId?: string; status?: BackendOrder['status'] }): BackendOrder {
    const orderId = orderData.orderId || `PRETO-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder: BackendOrder = {
      ...orderData,
      orderId,
      status: orderData.status || 'received',
      createdAt: new Date().toISOString()
    };
    this.data.orders.unshift(newOrder);
    this.saveToDisk();
    return newOrder;
  }

  updateOrderStatus(orderId: string, status: BackendOrder['status']): BackendOrder | null {
    const order = this.getOrderByReference(orderId);
    if (!order) return null;
    order.status = status;
    this.saveToDisk();
    return order;
  }

  // --- RESERVATIONS ---
  getReservations(): BackendReservation[] {
    return [...this.data.reservations].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  getReservationById(id: string): BackendReservation | undefined {
    const cleanId = id.trim().toUpperCase();
    return this.data.reservations.find(r => r.id.toUpperCase() === cleanId);
  }

  createReservation(resData: Omit<BackendReservation, 'id' | 'createdAt' | 'status'> & { id?: string }): BackendReservation {
    const id = resData.id || `TBL-${Math.floor(100000 + Math.random() * 900000)}`;
    const newRes: BackendReservation = {
      ...resData,
      id,
      status: 'confirmed',
      createdAt: new Date().toISOString()
    };
    this.data.reservations.unshift(newRes);
    this.saveToDisk();
    return newRes;
  }

  // --- REVIEWS ---
  getReviews(): BackendReview[] {
    return [...this.data.reviews].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  createReview(reviewData: Omit<BackendReview, 'id' | 'createdAt' | 'role' | 'avatar' | 'location'> & { role?: string; avatar?: string; location?: string }): BackendReview {
    const newReview: BackendReview = {
      id: `rev-${Date.now()}`,
      name: reviewData.name,
      role: reviewData.role || 'Verified Guest',
      location: reviewData.location || 'Pretodan Dining Guest',
      content: reviewData.content,
      rating: reviewData.rating,
      avatar: reviewData.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      favoriteDish: reviewData.favoriteDish,
      createdAt: new Date().toISOString()
    };
    this.data.reviews.unshift(newReview);
    this.saveToDisk();
    return newReview;
  }

  // --- CONTACT INQUIRIES ---
  getContactMessages(): BackendContactMessage[] {
    return [...this.data.contactMessages];
  }

  createContactMessage(msgData: Omit<BackendContactMessage, 'id' | 'createdAt' | 'status'>): BackendContactMessage {
    const newMsg: BackendContactMessage = {
      ...msgData,
      id: `MSG-${Date.now().toString(36).toUpperCase()}`,
      status: 'unread',
      createdAt: new Date().toISOString()
    };
    this.data.contactMessages.unshift(newMsg);
    this.saveToDisk();
    return newMsg;
  }

  // --- VIP MEMBERS ---
  getVipMembers(): BackendVipMember[] {
    return [...this.data.vipMembers];
  }

  registerVip(memberData: { name: string; email: string; phone?: string }): BackendVipMember {
    const existing = this.data.vipMembers.find(m => m.email.toLowerCase() === memberData.email.toLowerCase());
    if (existing) {
      return existing;
    }
    const newMember: BackendVipMember = {
      id: `VIP-${Math.floor(100 + Math.random() * 900)}`,
      name: memberData.name,
      email: memberData.email,
      phone: memberData.phone,
      tier: 'Gold Gourmet Concierge',
      points: 250, // Welcome bonus
      joinedAt: new Date().toISOString()
    };
    this.data.vipMembers.unshift(newMember);
    this.saveToDisk();
    return newMember;
  }

  // --- CUSTOMER USERS / AUTH ---
  getUsers(): BackendCustomerUser[] {
    return [...(this.data.users || [])];
  }

  getUserByEmail(email: string): BackendCustomerUser | undefined {
    return (this.data.users || []).find(u => u.email.toLowerCase() === email.trim().toLowerCase());
  }

  getUserById(id: string): BackendCustomerUser | undefined {
    return (this.data.users || []).find(u => u.id === id);
  }

  registerCustomerUser(data: {
    name: string;
    email: string;
    phone: string;
    deliveryAddress?: string;
    dietaryPreferences?: string;
    password?: string;
  }): BackendCustomerUser {
    const existing = this.getUserByEmail(data.email);
    if (existing) {
      return existing;
    }
    const newUser: BackendCustomerUser = {
      id: `USR-${Math.floor(1000 + Math.random() * 9000)}`,
      name: data.name.trim(),
      email: data.email.trim(),
      phone: data.phone.trim(),
      deliveryAddress: data.deliveryAddress || '123 Grand Continental Boulevard',
      dietaryPreferences: data.dietaryPreferences || 'Chef Special',
      password: data.password,
      tier: 'Gold Gourmet Concierge',
      points: 500, // 500 Welcome points
      joinedAt: new Date().toISOString()
    };
    if (!this.data.users) this.data.users = [];
    this.data.users.unshift(newUser);
    this.saveToDisk();
    return newUser;
  }

  updateCustomerUser(id: string, updates: Partial<BackendCustomerUser>): BackendCustomerUser | null {
    const user = this.getUserById(id);
    if (!user) return null;
    Object.assign(user, updates);
    this.saveToDisk();
    return user;
  }

  // --- STATS ---
  getStats() {
    return {
      totalDishes: this.data.menu.length,
      totalOrders: this.data.orders.length,
      totalReservations: this.data.reservations.length,
      totalReviews: this.data.reviews.length,
      averageRating: (
        this.data.reviews.reduce((acc, r) => acc + r.rating, 0) / (this.data.reviews.length || 1)
      ).toFixed(1)
    };
  }
}

export const db = new Database();
