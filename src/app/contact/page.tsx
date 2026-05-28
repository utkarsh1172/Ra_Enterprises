'use client';

// ── Contact Page ──────────────────────────────────────────────

import { useState } from 'react';
import { MapPinIcon, PhoneIcon, EnvelopeIcon, WhatsAppIcon } from '@/components/layout/Icons';
import { BUSINESS_INFO, WHATSAPP_NUMBER, buildWhatsAppChatUrl } from '@/utils/whatsapp';
import SectionTitle from '@/components/ui/SectionTitle';
import Button from '@/components/ui/Button';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Build a WhatsApp message with the form data
    const msg =
      `Hello RA Enterprises! 🌶️\n\n` +
      `Name: ${form.name}\n` +
      `Email: ${form.email}\n` +
      `Phone: ${form.phone}\n\n` +
      `Message:\n${form.message}`;
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`,
      '_blank'
    );
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen bg-[#faf9f6]">
      {/* Page header */}
      <div className="relative bg-gradient-to-br from-amber-950 to-red-950 py-20 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle, #f59e0b 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        <div className="relative z-10">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-amber-400 mb-3">
            Get in Touch
          </span>
          <h1 className="text-4xl md:text-5xl font-bold font-serif text-white">Contact Us</h1>
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="h-px w-12 bg-amber-500" />
            <span className="text-amber-500 text-lg">✦</span>
            <div className="h-px w-12 bg-amber-500" />
          </div>
          <p className="mt-5 text-amber-200 max-w-xl mx-auto">
            Have a question or want to place a bulk order? We&apos;d love to hear from you.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid lg:grid-cols-2 gap-12">

        {/* Contact information */}
        <div>
          <SectionTitle
            label="Reach Us"
            title="We're Here to Help"
            centered={false}
          />

          <div className="space-y-5 mb-8">
            {/* Address */}
            <div className="flex items-start gap-4 bg-white p-4 rounded-xl border border-amber-100 shadow-sm">
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                <MapPinIcon className="w-5 h-5 text-amber-700" />
              </div>
              <div>
                <p className="font-semibold text-stone-800 text-sm">Our Address</p>
                <p className="text-gray-600 text-sm mt-1">
                  {BUSINESS_INFO.address}
                  {/* Replace with: Street, City, State, PIN */}
                </p>
              </div>
            </div>

            {/* Phone / WhatsApp */}
            <div className="flex items-start gap-4 bg-white p-4 rounded-xl border border-amber-100 shadow-sm">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                <WhatsAppIcon className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="font-semibold text-stone-800 text-sm">WhatsApp / Phone</p>
                <a
                  href={`tel:+${WHATSAPP_NUMBER}`}
                  className="text-gray-600 text-sm mt-1 block hover:text-amber-700 transition-colors"
                >
                  +{WHATSAPP_NUMBER}
                </a>
                <a
                  href={buildWhatsAppChatUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 mt-2 bg-green-500 text-white text-xs font-semibold px-3 py-1.5 rounded-full hover:bg-green-600 transition-colors"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5" />
                  Chat Now
                </a>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-4 bg-white p-4 rounded-xl border border-amber-100 shadow-sm">
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                <EnvelopeIcon className="w-5 h-5 text-amber-700" />
              </div>
              <div>
                <p className="font-semibold text-stone-800 text-sm">Email</p>
                <a
                  href={`mailto:${BUSINESS_INFO.email}`}
                  className="text-gray-600 text-sm mt-1 block hover:text-amber-700 transition-colors"
                >
                  {BUSINESS_INFO.email}
                </a>
              </div>
            </div>
          </div>

          {/* Business hours */}
          <div className="bg-amber-50 rounded-xl p-5 border border-amber-100">
            <h3 className="font-semibold text-stone-800 mb-3 text-sm">Business Hours</h3>
            <div className="space-y-1.5 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Monday – Saturday</span>
                <span className="font-medium text-stone-700">9:00 AM – 7:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Sunday</span>
                <span className="font-medium text-stone-700">10:00 AM – 2:00 PM</span>
              </div>
            </div>
          </div>

          {/* Google Maps embed placeholder */}
          <div className="mt-6 rounded-xl overflow-hidden border border-amber-100 shadow-sm aspect-[4/3] bg-amber-50 flex flex-col items-center justify-center">
            {BUSINESS_INFO.mapEmbedUrl ? (
              <iframe
                src={BUSINESS_INFO.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            ) : (
              <>
                <MapPinIcon className="w-10 h-10 text-amber-400 mb-3" />
                <p className="text-sm text-amber-600 font-medium">Google Maps</p>
                <p className="text-xs text-amber-400 mt-1">
                  [ Add mapEmbedUrl in utils/whatsapp.ts ]
                </p>
              </>
            )}
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-2xl shadow-md border border-amber-100 p-8">
          <h2 className="text-xl font-bold font-serif text-stone-800 mb-6">
            Send Us a Message
          </h2>

          {submitted ? (
            <div className="text-center py-12">
              <span className="text-5xl block mb-4">✅</span>
              <h3 className="text-xl font-bold text-green-700 mb-2">Message Sent!</h3>
              <p className="text-gray-600 text-sm">
                We&apos;ve opened WhatsApp with your message. We&apos;ll get back to you shortly!
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-6 text-amber-700 text-sm font-medium hover:text-amber-900 transition-colors cursor-pointer"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1" htmlFor="name">
                  Your Name *
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1" htmlFor="email">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1" htmlFor="phone">
                    Phone / WhatsApp
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1" htmlFor="message">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell us about your order or inquiry..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition resize-none"
                />
              </div>

              <Button type="submit" variant="whatsapp" size="lg" fullWidth>
                <WhatsAppIcon className="w-5 h-5" />
                Send via WhatsApp
              </Button>
              <p className="text-xs text-gray-400 text-center">
                Submitting opens WhatsApp with your message pre-filled.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
