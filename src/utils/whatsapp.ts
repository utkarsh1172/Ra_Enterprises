// ============================================================
// RA A1 Masale – WhatsApp Utility
// ============================================================
// Replace WHATSAPP_NUMBER with your actual number (with country
// code, no + sign or spaces) — e.g. "919876543210"
// ============================================================

import { CartItem } from '@/types';

export const WHATSAPP_NUMBER = '919920382812';

export const BUSINESS_INFO = {
  name: 'RA A1 Masale',
  tagline: 'Finest Spices & Blends',
  address: 'Maharashtra, India',       // ← REPLACE with full address
  email: 'utkarsh117@gmail.com',
  mapEmbedUrl: '',                     // ← ADD Google Maps embed URL
};

/**
 * Build a WhatsApp chat URL with a pre-filled order message.
 * Opens wa.me with the given phone number and encoded message.
 */
export function buildWhatsAppOrderUrl(items: CartItem[]): string {
  const lines = items.map((item) => {
    const name = item.product.name;
    const size = item.selectedSize.label;
    const qty  = item.quantity;
    const price = item.selectedSize.price * qty;
    return `• ${name} (${size}) × ${qty} = ₹${price}`;
  });

  const total = items.reduce(
    (sum, item) => sum + item.selectedSize.price * item.quantity,
    0
  );

  const message =
    `Hello RA A1 Masale! 🌶️\n\n` +
    `I would like to place the following order:\n\n` +
    lines.join('\n') +
    `\n\n*Total: ₹${total}*\n\n` +
    `Please confirm availability and delivery details. Thank you!`;

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/**
 * Build a simple WhatsApp chat URL (for the floating button / contact page).
 */
export function buildWhatsAppChatUrl(message = 'Hello RA A1 Masale! 🌶️'): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
