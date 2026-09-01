'use client';

// ── GA4 loader ─────────────────────────────────────────────────
// Renders nothing (and loads nothing) unless NEXT_PUBLIC_GA_ID is
// set in the environment — no fake/placeholder tracking ID ships
// in this codebase. Scripts load with next/script's
// "afterInteractive" strategy so they never block first paint/LCP.

import Script from 'next/script';
import { GA_MEASUREMENT_ID } from '@/lib/analytics';

export default function Analytics() {
  if (!GA_MEASUREMENT_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
    </>
  );
}
