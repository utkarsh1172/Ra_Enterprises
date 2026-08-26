// ============================================================
// RA A1 Masale – Type Definitions
// ============================================================

export type StockStatus = 'in_stock' | 'low_stock' | 'out_of_stock';

export interface Product {
  id: string;
  slug: string;
  sku: string;
  name: string;
  nameHindi?: string;       // Hindi / regional name
  category: string;         // category slug, see Category
  subcategory?: string;
  description: string;
  longDescription: string;
  price: number;            // in INR
  discountPrice?: number;
  unit: string;             // e.g. "250g", "500g"
  availableSizes: ProductSize[];
  image: string;            // main image path under /public
  images: string[];         // gallery images
  featured: boolean;
  bestSeller: boolean;
  isNew: boolean;
  active: boolean;          // soft delete / visibility toggle
  inStock: boolean;
  stockStatus: StockStatus;
  tags: string[];

  ingredients?: string[];
  benefits?: string[];
  usageInstructions?: string;
  storageInstructions?: string;
  shelfLife?: string;
  countryOfOrigin?: string;
  manufacturer?: string;

  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
  ogImage?: string;
  canonicalPath?: string;

  createdAt: string; // ISO date
  updatedAt: string; // ISO date
  createdBy?: string;
  updatedBy?: string;
}

export interface ProductSize {
  label: string;   // "250g" | "500g" | "1kg"
  price: number;   // price for this size
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  description?: string;
  image?: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AdminUser {
  id: string;
  email: string;
  passwordHash: string;
  name?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: ProductSize;
}

export interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}

export type CartAction =
  | { type: 'ADD_ITEM'; payload: { product: Product; quantity: number; selectedSize: ProductSize } }
  | { type: 'REMOVE_ITEM'; payload: { productId: string; sizeLabel: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: string; sizeLabel: string; quantity: number } }
  | { type: 'CLEAR_CART' };
