'use client';

// ============================================================
// RA A1 Enterprises – Cart Context
// ============================================================
// Provides global cart state using React Context + useReducer.
// Persists cart to localStorage so it survives page refreshes.
// ============================================================

import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  ReactNode,
} from 'react';
import { CartAction, CartItem, CartState, Product, ProductSize } from '@/types';

// ── Reducer ─────────────────────────────────────────────────

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { product, quantity, selectedSize } = action.payload;
      const key = `${product.id}-${selectedSize.label}`;

      const existing = state.items.find(
        (i) => i.product.id === product.id && i.selectedSize.label === selectedSize.label
      );

      const updatedItems: CartItem[] = existing
        ? state.items.map((i) =>
            i.product.id === product.id && i.selectedSize.label === selectedSize.label
              ? { ...i, quantity: i.quantity + quantity }
              : i
          )
        : [...state.items, { product, quantity, selectedSize }];

      return computeTotals({ ...state, items: updatedItems });
    }

    case 'REMOVE_ITEM': {
      const updatedItems = state.items.filter(
        (i) =>
          !(i.product.id === action.payload.productId &&
            i.selectedSize.label === action.payload.sizeLabel)
      );
      return computeTotals({ ...state, items: updatedItems });
    }

    case 'UPDATE_QUANTITY': {
      const { productId, sizeLabel, quantity } = action.payload;
      const updatedItems =
        quantity <= 0
          ? state.items.filter(
              (i) => !(i.product.id === productId && i.selectedSize.label === sizeLabel)
            )
          : state.items.map((i) =>
              i.product.id === productId && i.selectedSize.label === sizeLabel
                ? { ...i, quantity }
                : i
            );
      return computeTotals({ ...state, items: updatedItems });
    }

    case 'CLEAR_CART':
      return initialState;

    default:
      return state;
  }
}

function computeTotals(state: CartState): CartState {
  const totalItems = state.items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = state.items.reduce(
    (sum, i) => sum + i.selectedSize.price * i.quantity,
    0
  );
  return { ...state, totalItems, totalPrice };
}

// ── Initial State ────────────────────────────────────────────

const initialState: CartState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
};

// ── Context ──────────────────────────────────────────────────

interface CartContextValue {
  cart: CartState;
  addToCart: (product: Product, quantity: number, selectedSize: ProductSize) => void;
  removeFromCart: (productId: string, sizeLabel: string) => void;
  updateQuantity: (productId: string, sizeLabel: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

// ── Provider ─────────────────────────────────────────────────

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, dispatch] = useReducer(cartReducer, initialState, (init) => {
    // Hydrate from localStorage on first render (client only)
    if (typeof window === 'undefined') return init;
    try {
      const stored = localStorage.getItem('ra-cart');
      if (stored) {
        const parsed = JSON.parse(stored) as CartState;
        return computeTotals(parsed);
      }
    } catch {
      // ignore malformed data
    }
    return init;
  });

  // Persist to localStorage on every change
  useEffect(() => {
    localStorage.setItem('ra-cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product, quantity: number, selectedSize: ProductSize) =>
    dispatch({ type: 'ADD_ITEM', payload: { product, quantity, selectedSize } });

  const removeFromCart = (productId: string, sizeLabel: string) =>
    dispatch({ type: 'REMOVE_ITEM', payload: { productId, sizeLabel } });

  const updateQuantity = (productId: string, sizeLabel: string, quantity: number) =>
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, sizeLabel, quantity } });

  const clearCart = () => dispatch({ type: 'CLEAR_CART' });

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

// ── Hook ─────────────────────────────────────────────────────

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used inside <CartProvider>');
  }
  return context;
}
