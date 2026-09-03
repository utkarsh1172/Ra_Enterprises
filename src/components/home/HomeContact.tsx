'use client';

// ── Homepage contact / enquiry CTA ────────────────────────────
// Mirrors the Contact page composition using the same shared
// ContactChannels + ContactForm components.

import Link from 'next/link';
import SectionTitle from '@/components/ui/SectionTitle';
import Reveal from '@/components/motion/Reveal';
import ContactChannels from '@/components/contact/ContactChannels';
import ContactForm from '@/components/contact/ContactForm';
import { ArrowRightIcon } from '@/components/layout/Icons';
import { trackEvent } from '@/lib/analytics';

export default function HomeContact() {
  return (
    <section className="bg-[#3a170d] py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <Reveal>
          <SectionTitle
            label="Get In Touch"
            title="Bring Authentic Flavour Home."
            subtitle="Have a question about our masalas, bulk orders, or stockists near you? We're one message away."
            light
          />
        </Reveal>

        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <Reveal x={-18} y={0} className="flex flex-col gap-3">
            <ContactChannels location="home_contact" />

            <Link
              href="/contact"
              onClick={() => trackEvent('contact_click', { location: 'home_contact_link' })}
              className="group mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-[#f5a831] px-6 py-3.5 text-sm font-bold text-[#38170e] transition-all hover:-translate-y-0.5 hover:bg-[#ffc45b]"
            >
              Visit Contact Page
              <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>

          <Reveal x={18} y={0} delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
