'use client';

// ── Contact form (client-side WhatsApp handoff) ─────────────────

import { useState } from 'react';
import { WhatsAppIcon } from '@/components/layout/Icons';
import { WHATSAPP_NUMBER } from '@/utils/whatsapp';
import Button from '@/components/ui/Button';

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Build a WhatsApp message with the form data
    const msg =
      `Hello RA A1 Masale! 🌶️\n\n` +
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
  );
}
