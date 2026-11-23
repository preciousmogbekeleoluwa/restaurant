export interface MenuItem {
  id: string;
  name: string;
  category: 'chicken' | 'beef' | 'pasta' | 'seafood' | 'rice' | 'specialties' | string;
  categoryLabel: string;
  description: string;
  price: number; // formatted as $XX.00
  image: string;
  popular?: boolean;
  isSpecialOffer?: boolean;
  discountBadge?: string;
  spicyLevel?: 0 | 1 | 2 | 3;
  prepTime?: string;
  tags?: string[];
  calories?: string;
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
  selectedOptions?: string[];
  specialInstructions?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  features: string[];
  ctaText: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  content: string;
  rating: number;
  avatar: string;
  favoriteDish: string;
}

export interface HeroSlide {
  id: number;
  tagline: string;
  headline: string;
  description: string;
  primaryBtnText: string;
  primaryBtnAction: 'menu' | 'services' | 'order' | 'contact' | 'about';
  secondaryBtnText: string;
  secondaryBtnAction: 'order' | 'whatsapp' | 'contact' | 'menu' | 'about';
  heroImage: string;
  floatingBadgeText: string;
  badgeDiscount?: string;
}

export type PageRoute = 'home' | 'about' | 'services' | 'contact';
