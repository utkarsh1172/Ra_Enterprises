// ============================================================
// RA Enterprises – Type Definitions
// ============================================================

export interface Product {
  id: string;
  slug: string;
  name: string;
  nameHindi?: string;       // Hindi / regional name
  category: ProductCategory;
  description: string;
  longDescription: string;
  price: number;            // in INR
  unit: string;             // e.g. "250g", "500g"
  availableSizes: ProductSize[];
  image: string;            // path under /public
  images: string[];         // gallery images
  featured: boolean;
  inStock: boolean;
  tags: string[];
}

export interface ProductSize {
  label: string;   // "250g" | "500g" | "1kg"
  price: number;   // price for this size
}

export type ProductCategory =
  | 'masala-blends'
  | 'pure-spices'
  | 'specialty';

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
