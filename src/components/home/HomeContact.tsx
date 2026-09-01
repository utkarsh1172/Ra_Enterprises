'use client';

// ── Homepage contact / enquiry CTA ────────────────────────────

import Link from 'next/link';
import SectionTitle from '@/components/ui/SectionTitle';
import Reveal from '@/components/motion/Reveal';
import ContactForm from '@/components/contact/ContactForm';
import { WhatsAppIcon, PhoneIcon, EnvelopeIcon, MapPinIcon } from '@/components/layout/Icons';
import { BUSINESS_INFO, WHATSAPP_NUMBER, buildWhatsAppChatUrl } from '@/utils/whatsapp';
import { trackEvent } from '@/lib/analytics';

export default function HomeContact() {
  return (
    <section className="bg-[#3a170d] py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <Reveal>
          <SectionTitle
            label="Get In Touch"
            title="Bring Authentic Flavour Home."
            subtitle="Have a question about our masalas, bulk orders, or stockists near you? We're one message away."
            light
          />
        </Reveal>

        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal x={-20} y={0} className="flex flex-col gap-4">
            <a
              href={buildWhatsAppChatUrl()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('whatsapp_click', { location: 'home_contact' })}
              className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] p-5 text-white transition-colors hover:bg-white/[0.1]"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-green-500/90">
                <WhatsAppIcon className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-bold">Chat on WhatsApp</p>
                <p className="text-xs text-amber-100/70">Fastest way to reach us</p>
              </div>
            </a>

            <a
              href={`tel:+${WHATSAPP_NUMBER}`}
              onClick={() => trackEvent('contact_click', { method: 'phone', location: 'home_contact' })}
              className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] p-5 text-white transition-colors hover:bg-white/[0.1]"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#f5a831]/90 text-[#38170e]">
                <PhoneIcon className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-bold">+{WHATSAPP_NUMBER}</p>
                <p className="text-xs text-amber-100/70">Call us directly</p>
              </div>
            </a>

            <a
              href={`mailto:${BUSINESS_INFO.email}`}
              onClick={() => trackEvent('contact_click', { method: 'email', location: 'home_contact' })}
              className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] p-5 text-white transition-colors hover:bg-white/[0.1]"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white/15">
                <EnvelopeIcon className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-bold">{BUSINESS_INFO.email}</p>
                <p className="text-xs text-amber-100/70">Email us anytime</p>
              </div>
            </a>

            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] p-5 text-white">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white/15">
                <MapPinIcon className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-bold">{BUSINESS_INFO.address}</p>
                <p className="text-xs text-amber-100/70">Business address</p>
              </div>
            </div>

            <Link
              href="/contact"
              onClick={() => trackEvent('contact_click', { location: 'home_contact_link' })}
              className="mt-1 inline-flex items-center justify-center rounded-full bg-[#f5a831] px-6 py-3.5 text-sm font-bold text-[#38170e] transition-all hover:-translate-y-0.5 hover:bg-[#ffc45b]"
            >
              Visit Contact Page
            </Link>
          </Reveal>

          <Reveal x={20} y={0} delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
