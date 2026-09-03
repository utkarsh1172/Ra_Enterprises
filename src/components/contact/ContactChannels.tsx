'use client';

// ── Contact channel list (WhatsApp / phone / email / location) ──
// Shared by the Contact page and the homepage contact section so
// both stay in sync; `location` only labels the analytics event.

import ContactCard from '@/components/contact/ContactCard';
import { WhatsAppIcon, PhoneIcon, EnvelopeIcon, MapPinIcon } from '@/components/layout/Icons';
import { BUSINESS_INFO, WHATSAPP_NUMBER, buildWhatsAppChatUrl } from '@/utils/whatsapp';
import { trackEvent } from '@/lib/analytics';

/** 919920382812 → +91 99203 82812 */
function formatPhone(raw: string): string {
  const match = /^(\d{2})(\d{5})(\d{5})$/.exec(raw);
  return match ? `+${match[1]} ${match[2]} ${match[3]}` : `+${raw}`;
}

export default function ContactChannels({ location }: { location: string }) {
  return (
    <div className="flex flex-col gap-3">
      <ContactCard
        icon={WhatsAppIcon}
        title="Chat on WhatsApp"
        subtitle="Fastest way to reach us"
        href={buildWhatsAppChatUrl()}
        external
        iconClassName="bg-[#16a34a] text-white"
        onClick={() => trackEvent('whatsapp_click', { location })}
      />
      <ContactCard
        icon={PhoneIcon}
        title={formatPhone(WHATSAPP_NUMBER)}
        subtitle="Call us directly"
        href={`tel:+${WHATSAPP_NUMBER}`}
        onClick={() => trackEvent('contact_click', { method: 'phone', location })}
      />
      <ContactCard
        icon={EnvelopeIcon}
        title={BUSINESS_INFO.email}
        subtitle="Email us anytime"
        href={`mailto:${BUSINESS_INFO.email}`}
        iconClassName="bg-[#fff5df]/15 text-[#ffc45b]"
        onClick={() => trackEvent('contact_click', { method: 'email', location })}
      />
      <ContactCard
        icon={MapPinIcon}
        title={BUSINESS_INFO.address}
        subtitle="Our location"
        iconClassName="bg-[#fff5df]/15 text-[#ffc45b]"
      />
    </div>
  );
}
