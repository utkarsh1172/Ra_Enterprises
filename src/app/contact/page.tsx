// ── Contact Page ──────────────────────────────────────────────

import type { Metadata } from 'next';
import Image from 'next/image';
import ContactChannels from '@/components/contact/ContactChannels';
import ContactForm from '@/components/contact/ContactForm';
import Reveal from '@/components/motion/Reveal';
import { SITE_URL } from '@/lib/siteUrl';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with RA A1 Enterprises for orders, bulk inquiries, or questions about our spices and masala blends. Reach us via phone, WhatsApp, or email.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact RA A1 Enterprises',
    description: 'Reach us via phone, WhatsApp, or email for orders and inquiries.',
  },
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
    { '@type': 'ListItem', position: 2, name: 'Contact', item: `${SITE_URL}/contact` },
  ],
};

export default function ContactPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#3a170d]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Subtle spice photography behind the whole dark panel */}
      <Image
        src="/images/whole-spices-bowls.jpeg"
        alt=""
        aria-hidden="true"
        fill
        sizes="100vw"
        className="object-cover object-center opacity-25"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#3a170d]/92 via-[#3a170d]/96 to-[#3a170d]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <Reveal className="text-center">
          <span className="text-eyebrow uppercase text-[#ffc45b]">Get in Touch</span>
          <h1 className="mt-3 font-serif text-h1 text-[#fff8ea]">We&apos;d Love to Hear from You</h1>
          <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-[#fce6c0]">
            Have a question about our masalas, bulk orders, or stockists near you?
            We&apos;re just a message away.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <Reveal x={-18} y={0}>
            <ContactChannels location="contact_page" />
          </Reveal>

          <Reveal x={18} y={0} delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </div>
  );
}
