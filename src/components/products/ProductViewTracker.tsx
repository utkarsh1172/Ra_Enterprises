'use client';

// ── Fires a GA4 product_view event once when a product page mounts ──

import { useEffect } from 'react';
import { trackEvent } from '@/lib/analytics';

export default function ProductViewTracker({ id, name }: { id: string; name: string }) {
  useEffect(() => {
    trackEvent('product_view', { product_id: id, product_name: name });
  }, [id, name]);

  return null;
}
