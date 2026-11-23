import { MenuItem, ServiceItem, Testimonial, HeroSlide } from '../types';

/**
 * PRETODAN RESTAURANT DATA & CONFIGURATION
 * Continental Restaurant Brand Identity
 * All contact details below are editable placeholders as requested.
 */
export const RESTAURANT_INFO = {
  name: "Pretodan Restaurant",
  category: "Continental Restaurant",
  tagline: "A Taste of Excellence in Every Bite",
  phone: "+1 (555) 234-5678", // Editable Placeholder
  phoneDisplay: "+1 (555) 234-5678",
  whatsapp: "+1 (555) 234-5678", // Editable Placeholder
  whatsappInternational: "15552345678",
  location: "Metropolitan Gourmet District",
  addressDisplay: "123 Grand Continental Boulevard, Suite 100, Gourmet District", // Editable Placeholder
  email: "contact@pretodanrestaurant.com", // Editable Placeholder
  openingHours: [
    { days: "Monday – Thursday", hours: "11:00 AM – 10:00 PM" },
    { days: "Friday – Saturday", hours: "11:00 AM – 11:30 PM" },
    { days: "Sunday", hours: "12:00 PM – 9:30 PM" }
  ],
  socials: {
    instagram: "https://instagram.com/pretodanrestaurant",
    facebook: "https://facebook.com/pretodanrestaurant",
    twitter: "https://x.com/pretodanrest",
    whatsapp: "https://wa.me/15552345678"
  }
};

/**
 * EXACT HERO SLIDES SPECIFIED IN PROMPT:
 * Slide 1: "A Taste of Excellence in Every Bite."
 * Slide 2: "Where Great Food Meets Great Moments."
 * Slide 3: "Fresh Ingredients. Exceptional Flavours."
 */
export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 1,
    tagline: "CONTINENTAL CULINARY EXCELLENCE",
    headline: "A Taste of Excellence in Every Bite.",
    description: "Discover extraordinary continental cuisine, freshly prepared with passion and served with excellence.",
    primaryBtnText: "Explore Our Menu",
    primaryBtnAction: "menu",
    secondaryBtnText: "Order Now",
    secondaryBtnAction: "order",
    heroImage: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1600&q=85", // Gourmet continental prime ribeye & charred herbs
    floatingBadgeText: "CHEF'S SIGNATURE",
    badgeDiscount: "CONTINENTAL"
  },
  {
    id: 2,
    tagline: "UNFORGETTABLE DINING ATMOSPHERE",
    headline: "Where Great Food Meets Great Moments.",
    description: "Experience delicious flavours, exceptional hospitality, and unforgettable dining.",
    primaryBtnText: "Discover Our Story",
    primaryBtnAction: "about",
    secondaryBtnText: "Order Now",
    secondaryBtnAction: "order",
    heroImage: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=85", // Luxurious elegant restaurant dining hall with warm lighting
    floatingBadgeText: "PREMIUM AMBIANCE",
    badgeDiscount: "LUXURY"
  },
  {
    id: 3,
    tagline: "FARM-TO-TABLE ARTISTRY",
    headline: "Fresh Ingredients. Exceptional Flavours.",
    description: "Every dish tells a story of quality, creativity, and a passion for great food.",
    primaryBtnText: "Explore Our Services",
    primaryBtnAction: "services",
    secondaryBtnText: "Contact Us",
    secondaryBtnAction: "contact",
    heroImage: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1600&q=85", // Artisan culinary plating with fresh herbs & sauces
    floatingBadgeText: "FRESH DAILY",
    badgeDiscount: "ORGANIC"
  }
];

/**
 * MENU CATEGORIES SPECIFIED IN PROMPT:
 * - Grilled chicken
 * - Beef dishes
 * - Pasta
 * - Seafood
 * - Rice dishes
 * - Continental specialties
 */
export const FOOD_CATEGORIES = [
  {
    id: "all",
    name: "All Dishes",
    desc: "Browse our entire continental culinary collection.",
    itemCount: "18 Dishes"
  },
  {
    id: "chicken",
    name: "Grilled Chicken",
    desc: "Tender, marinated free-range chicken roasted and flame-grilled to perfection.",
    image: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?auto=format&fit=crop&w=800&q=80",
    itemCount: "3 Specialties"
  },
  {
    id: "beef",
    name: "Beef Dishes",
    desc: "Aged prime cuts, tender medallions, and slow-braised continental specialties.",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
    itemCount: "3 Specialties"
  },
  {
    id: "pasta",
    name: "Artisan Pasta",
    desc: "Handcrafted Italian pasta folded into rich emulsified reductions and cheeses.",
    image: "https://images.unsplash.com/photo-1621996346565-e3d5d62817d2?auto=format&fit=crop&w=800&q=80",
    itemCount: "3 Specialties"
  },
  {
    id: "seafood",
    name: "Seafood",
    desc: "Wild-caught Atlantic fish, plump king prawns, and tender calamari.",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80",
    itemCount: "3 Specialties"
  },
  {
    id: "rice",
    name: "Rice Dishes",
    desc: "Aromatic saffron grains, Mediterranean paella, and slow-simmered risottos.",
    image: "https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?auto=format&fit=crop&w=800&q=80",
    itemCount: "3 Specialties"
  },
  {
    id: "specialties",
    name: "Continental Specialties",
    desc: "Refined multi-regional European classics crafted with executive culinary flair.",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
    itemCount: "3 Specialties"
  }
];

/**
 * 18 HIGH-QUALITY CONTINENTAL MENU ITEMS
 * Prices set with realistic placeholders (matching $45 from reference menu flyer)
 */
export const MENU_ITEMS: MenuItem[] = [
  // 1. GRILLED CHICKEN DISHES
  {
    id: "chk-1",
    name: "Flame-Grilled Herb Chicken Supreme",
    category: "chicken",
    categoryLabel: "Grilled Chicken",
    description: "Half farm-raised chicken marinated in fresh rosemary, thyme, garlic and cold-pressed olive oil, flame-kissed over charred coals and glazed with natural herb pan jus. Served with golden roasted baby potatoes.",
    price: 45,
    image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=800&q=80",
    popular: true,
    isSpecialOffer: true,
    discountBadge: "CHEF'S PICK",
    spicyLevel: 1,
    prepTime: "25-30 mins",
    tags: ["Signature Grill", "Gluten-Free"],
    calories: "620 kcal"
  },
  {
    id: "chk-2",
    name: "Pretodan Crispy Wing & Drum Platter",
    category: "chicken",
    categoryLabel: "Grilled Chicken",
    description: "Signature golden crispy wings and tender drumsticks dredged in spiced flour and flash-fried to crunchy perfection. Accompanied by house burnt-orange dipping sauce and hand-cut sea salt fries.",
    price: 38,
    image: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?auto=format&fit=crop&w=800&q=80",
    popular: true,
    spicyLevel: 2,
    prepTime: "20 mins",
    tags: ["Menu Star", "Popular"],
    calories: "780 kcal"
  },
  {
    id: "chk-3",
    name: "Tuscan Stuffed Chicken Breast",
    category: "chicken",
    categoryLabel: "Grilled Chicken",
    description: "Plump organic chicken breast stuffed with sun-dried tomatoes, baby spinach, and fresh mozzarella cheese, seared in garlic butter and finished with a velvety white wine cream reduction.",
    price: 42,
    image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=800&q=80",
    spicyLevel: 0,
    prepTime: "25 mins",
    tags: ["Tuscan Classic", "Gourmet"],
    calories: "590 kcal"
  },

  // 2. BEEF DISHES
  {
    id: "beef-1",
    name: "Prime Aged Continental Ribeye Steak",
    category: "beef",
    categoryLabel: "Beef Dishes",
    description: "350g USDA Prime ribeye steak dry-aged for 28 days, seared at high heat to lock in succulent juices, topped with herb-infused compound butter, roasted asparagus, and truffle-scented mashed potatoes.",
    price: 45,
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
    popular: true,
    isSpecialOffer: true,
    discountBadge: "BEST SELLER",
    spicyLevel: 0,
    prepTime: "25-35 mins",
    tags: ["Prime Steak", "Dry Aged"],
    calories: "850 kcal"
  },
  {
    id: "beef-2",
    name: "Filet Mignon au Poivre",
    category: "beef",
    categoryLabel: "Beef Dishes",
    description: "Center-cut beef tenderloin medallion crusted with cracked Madagascar green peppercorns, flambéed with cognac, and finished in a luscious Dijon cream sauce with glazed baby carrots.",
    price: 48,
    image: "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=800&q=80",
    popular: true,
    spicyLevel: 1,
    prepTime: "30 mins",
    tags: ["French Classic", "Luxury"],
    calories: "720 kcal"
  },
  {
    id: "beef-3",
    name: "Slow-Braised Beef Short Ribs",
    category: "beef",
    categoryLabel: "Beef Dishes",
    description: "Tender bone-in beef short ribs slow-braised for six hours in rich Cabernet Sauvignon stock with aromatics until melt-in-your-mouth tender, served over creamy polenta.",
    price: 45,
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
    spicyLevel: 0,
    prepTime: "25 mins",
    tags: ["Slow Braised", "Hearty"],
    calories: "890 kcal"
  },

  // 3. PASTA
  {
    id: "pas-1",
    name: "Creamy Truffle & Seafood Fettuccine",
    category: "pasta",
    categoryLabel: "Pasta",
    description: "Hand-rolled egg fettuccine tossed in a silky black truffle and aged Parmigiano-Reggiano emulsion, loaded with pan-seared tiger prawns, sweet bay scallops, and Italian flat-leaf parsley.",
    price: 45,
    image: "https://images.unsplash.com/photo-1621996346565-e3d5d62817d2?auto=format&fit=crop&w=800&q=80",
    popular: true,
    isSpecialOffer: true,
    discountBadge: "CHEF'S SPECIAL",
    spicyLevel: 0,
    prepTime: "20 mins",
    tags: ["Italian Pasta", "Truffle"],
    calories: "680 kcal"
  },
  {
    id: "pas-2",
    name: "Slow-Cooked Beef Ragu Pappardelle",
    category: "pasta",
    categoryLabel: "Pasta",
    description: "Wide ribbon pappardelle pasta draped in a rich Bolognese ragu of braised beef brisket, San Marzano plum tomatoes, Chianti wine, and freshly grated Pecorino Romano cheese.",
    price: 36,
    image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=80",
    spicyLevel: 0,
    prepTime: "20 mins",
    tags: ["Artisan Ragu", "Comfort Food"],
    calories: "740 kcal"
  },
  {
    id: "pas-3",
    name: "Spaghetti alle Vongole e Gamberi",
    category: "pasta",
    categoryLabel: "Pasta",
    description: "Artisan bronze-die spaghetti tossed with tender clams and succulent shrimp in an aromatic emulsion of extra virgin olive oil, garlic, white wine, chili flakes, and fresh lemon zest.",
    price: 39,
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
    spicyLevel: 1,
    prepTime: "18 mins",
    tags: ["Mediterranean", "Seafood Pasta"],
    calories: "580 kcal"
  },

  // 4. SEAFOOD
  {
    id: "sea-1",
    name: "Pan-Seared Atlantic Salmon Fillet",
    category: "seafood",
    categoryLabel: "Seafood",
    description: "Crisp-skinned sustainable Norwegian Atlantic salmon fillet delicately seared to medium, paired with a lemon-dill velouté, sautéed broccolini, and warm fingerling potatoes.",
    price: 45,
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80",
    popular: true,
    spicyLevel: 0,
    prepTime: "22 mins",
    tags: ["Healthy Choice", "Omega-3 Rich"],
    calories: "560 kcal"
  },
  {
    id: "sea-2",
    name: "Garlic Butter Jumbo Tiger Prawns",
    category: "seafood",
    categoryLabel: "Seafood",
    description: "Six jumbo king tiger prawns butterflied and grilled over open flame, basted generously with garlic-herb butter and smoked paprika, served with grilled sourdough for dipping.",
    price: 45,
    image: "https://images.unsplash.com/photo-1559742811-822873691df8?auto=format&fit=crop&w=800&q=80",
    popular: true,
    isSpecialOffer: true,
    discountBadge: "HOUSE FAVORITE",
    spicyLevel: 1,
    prepTime: "20 mins",
    tags: ["King Prawns", "Signature"],
    calories: "510 kcal"
  },
  {
    id: "sea-3",
    name: "Mediterranean Herb-Crusted Seabass",
    category: "seafood",
    categoryLabel: "Seafood",
    description: "Delicate Chilean seabass fillet crusted with panko, Kalamata olives, capers, and fresh oregano, roasted until golden and served over a bed of ratatouille vegetables.",
    price: 46,
    image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80",
    spicyLevel: 0,
    prepTime: "25 mins",
    tags: ["Gourmet Fish", "Light & Fresh"],
    calories: "520 kcal"
  },

  // 5. RICE DISHES
  {
    id: "rice-1",
    name: "Continental Seafood Paella Valenciana",
    category: "rice",
    categoryLabel: "Rice Dishes",
    description: "Authentic Bomba rice infused with Spanish saffron threads, simmered in shellfish broth with calamari rings, jumbo shrimp, green peas, and pimiento peppers with a crispy caramelized socarrat base.",
    price: 45,
    image: "https://images.unsplash.com/photo-1534080564583-6be75777b70a?auto=format&fit=crop&w=800&q=80",
    popular: true,
    isSpecialOffer: true,
    discountBadge: "CHEF'S SPECIAL",
    spicyLevel: 1,
    prepTime: "30-35 mins",
    tags: ["Spanish Saffron", "Seafood Rice"],
    calories: "690 kcal"
  },
  {
    id: "rice-2",
    name: "Wild Forest Mushroom & Truffle Risotto",
    category: "rice",
    categoryLabel: "Rice Dishes",
    description: "Carnaroli risotto rice slow-cooked with roasted porcini and chanterelle mushrooms, white wine, shallots, cultured butter, and Parmigiano-Reggiano, drizzled with white truffle oil.",
    price: 38,
    image: "https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?auto=format&fit=crop&w=800&q=80",
    popular: true,
    spicyLevel: 0,
    prepTime: "25 mins",
    tags: ["Vegetarian", "Truffle Risotto"],
    calories: "610 kcal"
  },
  {
    id: "rice-3",
    name: "Herb Pilaf with Sautéed Pine Nuts & Chicken",
    category: "rice",
    categoryLabel: "Rice Dishes",
    description: "Fluffy basmati rice simmered in chicken essence with cardamom, cloves, and bay leaf, tossed with toasted golden pine nuts, sweet currants, and tender grilled chicken strips.",
    price: 34,
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
    spicyLevel: 0,
    prepTime: "20 mins",
    tags: ["Herb Pilaf", "Flavorful"],
    calories: "640 kcal"
  },

  // 6. CONTINENTAL SPECIALTIES
  {
    id: "spec-1",
    name: "Herb-Crusted Rack of Lamb",
    category: "specialties",
    categoryLabel: "Continental Specialties",
    description: "Four-bone premium Australian lamb rack crusted with Dijon mustard, parsley, and garlic brioche crumbs, roasted to rosy perfection and accompanied by mint glaze and roasted root vegetables.",
    price: 49,
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
    popular: true,
    isSpecialOffer: true,
    discountBadge: "PREMIUM SELECTION",
    spicyLevel: 0,
    prepTime: "30-35 mins",
    tags: ["Luxury Cut", "Chef Masterpiece"],
    calories: "820 kcal"
  },
  {
    id: "spec-2",
    name: "Crispy Duck Confit à l'Orange",
    category: "specialties",
    categoryLabel: "Continental Specialties",
    description: "Classic French leg of duck slow-cured and confited in its own fat until the skin is crackling crisp and the meat falls off the bone. Finished with a bitter blood-orange reduction and potato gratin.",
    price: 45,
    image: "https://images.unsplash.com/photo-1514944298352-78860714b64b?auto=format&fit=crop&w=800&q=80",
    popular: true,
    spicyLevel: 0,
    prepTime: "25 mins",
    tags: ["French Culinary", "Duck Confit"],
    calories: "790 kcal"
  },
  {
    id: "spec-3",
    name: "Veal Scaloppine al Limone",
    category: "specialties",
    categoryLabel: "Continental Specialties",
    description: "Tender milk-fed veal cutlets pan-seared in clarified butter with capers, white wine, fresh Meyer lemon juice, and chopped parsley. Served alongside buttered tagliolini pasta.",
    price: 44,
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
    spicyLevel: 0,
    prepTime: "22 mins",
    tags: ["Italian Classic", "Tender Cut"],
    calories: "630 kcal"
  }
];

/**
 * 7 CORE SERVICES SPECIFIED IN PROMPT:
 * 1. Dine-in Experience
 * 2. Takeaway Services
 * 3. Food Delivery
 * 4. Outdoor Catering
 * 5. Event Catering
 * 6. Online Food Ordering
 * 7. Private Dining
 */
export const SERVICES_LIST: ServiceItem[] = [
  {
    id: "serv-dinein",
    title: "Dine-in Experience",
    category: "Hospitality & Ambiance",
    description: "Immerse yourself in our sophisticated dining room adorned in charcoal and golden hues. Enjoy world-class table service, soft curated acoustics, and an intimate, luxurious dining atmosphere.",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
    features: ["Elegant ambient lighting", "Sommelier-recommended beverage pairing", "Attentive personal table service"],
    ctaText: "Reserve a Table"
  },
  {
    id: "serv-takeaway",
    title: "Takeaway Services",
    category: "Convenience & Speed",
    description: "Enjoy restaurant-grade continental dishes on the go. Call ahead or place an online takeaway order, packaged carefully in heat-preserving, eco-conscious containers.",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80",
    features: ["Quick curbside pickup", "Eco-friendly premium packaging", "Zero waiting time upon arrival"],
    ctaText: "Order Takeaway"
  },
  {
    id: "serv-delivery",
    title: "Food Delivery",
    category: "Doorstep Express",
    description: "Experience Pretodan’s exquisite culinary creations from the comfort of your home or office. Delivered promptly in temperature-controlled thermal carriers to ensure piping-hot freshness.",
    image: "https://images.unsplash.com/photo-1526367790999-0150786686a2?auto=format&fit=crop&w=800&q=80",
    features: ["Direct doorstep delivery", "Thermal insulated transit", "Real-time dispatch updates"],
    ctaText: "Order Delivery"
  },
  {
    id: "serv-outdoor",
    title: "Outdoor Catering",
    category: "Al Fresco Gastronomy",
    description: "Bring the culinary artistry of Pretodan into the open air. From open-fire charcoal rotisserie stations to garden cocktail soirées, we create unforgettable al fresco dining moments.",
    image: "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&w=800&q=80",
    features: ["Live open-fire grill stations", "Full outdoor tableware & setup", "Experienced mobile kitchen staff"],
    ctaText: "Inquire for Outdoor"
  },
  {
    id: "serv-event",
    title: "Event Catering",
    category: "Grand Celebrations",
    description: "Elevate weddings, executive corporate galas, and milestone celebrations. Our catering team creates bespoke multi-course menus tailored precisely to your guests' tastes.",
    image: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80",
    features: ["Custom bespoke menu design", "Plated fine dining or gourmet buffets", "Complete logistical support"],
    ctaText: "Book Event Catering"
  },
  {
    id: "serv-online",
    title: "Online Food Ordering",
    category: "Digital Ordering",
    description: "Our intuitive digital menu and instant WhatsApp ordering platform allow you to browse dishes, customize preparation instructions, and place orders in seconds.",
    image: "https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=800&q=80",
    features: ["Interactive cart & quick checkout", "One-click WhatsApp order generator", "Flexible payment options"],
    ctaText: "Order Online Now"
  },
  {
    id: "serv-private",
    title: "Private Dining",
    category: "Exclusive VIP Suites",
    description: "Host private dinners, boardroom executive luncheons, or romantic anniversary celebrations in our secluded VIP dining alcoves with a dedicated executive chef and server.",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
    features: ["Private dining suites", "Personalized custom tasting menus", "Discreet, high-touch hospitality"],
    ctaText: "Inquire for Private VIP"
  }
];

/**
 * 5 WHY CHOOSE US HIGHLIGHTS SPECIFIED IN PROMPT:
 * 1. Fresh and Quality Ingredients
 * 2. Exceptional Taste
 * 3. Professional Food Preparation
 * 4. Excellent Customer Service
 * 5. Memorable Dining Experience
 */
export const WHY_CHOOSE_US = [
  {
    title: "Fresh and Quality Ingredients",
    desc: "We source our poultry, prime meats, seafood, and seasonal produce daily from certified growers, ensuring pristine freshness and optimal natural flavors in every course.",
    icon: "ShieldCheck"
  },
  {
    title: "Exceptional Taste",
    desc: "Every recipe is a masterclass in balance, texture, and depth. From slow-simmered reductions to open-flame grilling, our flavours linger on the palate and inspire repeat visits.",
    icon: "Flame"
  },
  {
    title: "Professional Food Preparation",
    desc: "Our culinary brigade operates under rigorous standards of hygiene, technique, and temperature precision, delivering consistent excellence in every single plate.",
    icon: "ChefHat"
  },
  {
    title: "Excellent Customer Service",
    desc: "Genuine warmth and respectful hospitality are at the core of Pretodan. From the moment you arrive or reach out, your comfort and satisfaction are our highest priority.",
    icon: "HeartHandshake"
  },
  {
    title: "Memorable Dining Experience",
    desc: "We craft more than meals; we create atmosphere. The combination of elegant charcoal decor, glowing amber lighting, and exquisite culinary art makes every visit unforgettable.",
    icon: "Sparkles"
  }
];

/**
 * PROFESSIONAL PLACEHOLDER TESTIMONIALS
 * Clearly designated as sample customer reviews until real testimonials are provided.
 */
export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t-1",
    name: "Eleanor Vance",
    role: "Culinary Writer & Gastronomy Editor",
    location: "Sample Review • Verified Guest",
    content: "The Prime Ribeye at Pretodan is simply phenomenal — seared to perfection with incredible tenderness. The ambiance, with its elegant charcoal and gold aesthetic, feels truly world-class.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    favoriteDish: "Prime Aged Continental Ribeye Steak"
  },
  {
    id: "t-2",
    name: "Marcus Sterling",
    role: "Architect & Corporate Host",
    location: "Sample Review • Verified Guest",
    content: "We reserved Pretodan for our firm's executive dinner. The seafood paella and herb-crusted rack of lamb received unanimous praise. Their service is remarkably attentive and polished.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    favoriteDish: "Continental Seafood Paella Valenciana"
  },
  {
    id: "t-3",
    name: "Sophia Kensington",
    role: "Private Client & Food Enthusiast",
    location: "Sample Review • Verified Guest",
    content: "The delivery service is immaculate. Our meals arrived piping hot, exquisitely plated, and bursting with flavor. The WhatsApp ordering process made the entire experience seamless.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
    favoriteDish: "Pan-Seared Atlantic Salmon Fillet"
  }
];
