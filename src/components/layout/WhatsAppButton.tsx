'use client';

// ── Floating WhatsApp button visible on all pages ─────────────

import { WhatsAppIcon } from './Icons';
import { buildWhatsAppChatUrl } from '@/utils/whatsapp';
import { trackEvent } from '@/lib/analytics';

export default function WhatsAppButton() {
  return (
    <a
      href={buildWhatsAppChatUrl()}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackEvent('whatsapp_click', { location: 'floating_button' })}
      aria-label="Chat with us on WhatsApp"
      className="
        fixed bottom-6 right-6 z-50
        bg-green-500 hover:bg-green-600
        text-white
        w-14 h-14 rounded-full
        flex items-center justify-center
        shadow-lg hover:shadow-xl
        transition-all duration-300
        hover:scale-110
        group
      "
    >
      <WhatsAppIcon className="w-7 h-7" />
      {/* Tooltip */}
      <span
        className="
          absolute right-16 bg-stone-800 text-white text-sm
          px-3 py-1.5 rounded-lg whitespace-nowrap
          opacity-0 group-hover:opacity-100
          transition-opacity duration-200
          pointer-events-none
        "
      >
        Chat on WhatsApp
      </span>
    </a>
  );
}
