// ── Google Analytics 4 helper ─────────────────────────────────
// GA is loaded only when NEXT_PUBLIC_GA_ID is set (see
// src/components/analytics/Analytics.tsx) — never a hard-coded ID.
// trackEvent() is a no-op (safe to call anywhere) until gtag exists.

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID;

type GtagEvent =
  | 'page_view'
  | 'product_view'
  | 'product_click'
  | 'contact_click'
  | 'whatsapp_click'
  | 'enquiry_form_submit'
  | 'explore_products_click';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(event: GtagEvent, params: Record<string, unknown> = {}): void {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  window.gtag('event', event, params);
}
