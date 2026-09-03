'use client';

// ── Contact form (client-side WhatsApp handoff) ─────────────────
// Visual shell follows the cream/dark-brown/gold system; the
// submit behaviour (pre-filled WhatsApp message) is unchanged.

import { useState } from 'react';
import { ArrowRightIcon, CheckIcon, WhatsAppIcon } from '@/components/layout/Icons';
import { WHATSAPP_NUMBER } from '@/utils/whatsapp';
import { trackEvent } from '@/lib/analytics';

const fieldClass =
  'w-full rounded-lg border border-[#e6c990] bg-white px-4 py-3 text-input text-[#3d2015] placeholder:text-[#a98d76] outline-none transition focus:border-[#b15a2a] focus:ring-2 focus:ring-[#f5a831]/25';

const labelClass = 'mb-1.5 block text-label text-[#4b3329]';

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
      `Hello RA A1 Enterprises! 🌶️\n\n` +
      `Name: ${form.name}\n` +
      `Email: ${form.email}\n` +
      `Phone: ${form.phone}\n\n` +
      `Message:\n${form.message}`;
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`,
      '_blank'
    );
    trackEvent('enquiry_form_submit');
    setSubmitted(true);
  }

  return (
    <div className="rounded-lg border border-[#ead8b6] bg-[#fffaf0] p-6 shadow-xl shadow-amber-950/10 sm:p-8">
      <h2 className="font-serif text-h3 text-[#542315]">Send Us a Message</h2>

      {submitted ? (
        <div className="py-10 text-center">
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[#f5a831] text-[#321208]">
            <CheckIcon className="h-7 w-7" />
          </span>
          <h3 className="mt-5 font-serif text-h4 text-[#542315]">Message Sent</h3>
          <p className="mx-auto mt-2 max-w-sm text-small leading-relaxed text-[#6f5a4c]">
            We&apos;ve opened WhatsApp with your message. We&apos;ll get back to you shortly.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="mt-6 text-sm font-bold text-[#8d301d] transition-colors hover:text-[#542315]"
          >
            Send another message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div>
            <label className={labelClass} htmlFor="name">Your Name *</label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={form.name}
              onChange={handleChange}
              placeholder="e.g. Rahul Sharma"
              className={fieldClass}
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className={labelClass} htmlFor="email">Email *</label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className={fieldClass}
              />
            </div>
            <div>
              <label className={labelClass} htmlFor="phone">Phone / WhatsApp</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                placeholder="+91 98765 43210"
                className={fieldClass}
              />
            </div>
          </div>

          <div>
            <label className={labelClass} htmlFor="message">Message *</label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              value={form.message}
              onChange={handleChange}
              placeholder="Tell us about your inquiry..."
              className={`${fieldClass} resize-none`}
            />
          </div>

          <button
            type="submit"
            className="group flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#542315] px-6 py-3 text-button text-[#fff8ea] shadow-lg shadow-amber-950/15 transition-all hover:-translate-y-0.5 hover:bg-[#7b2a18]"
          >
            Send Message
            <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>

          <p className="flex items-center justify-center gap-1.5 text-center text-xs font-semibold text-[#8a7261]">
            <WhatsAppIcon className="h-3.5 w-3.5 text-[#16a34a]" />
            Submitting opens WhatsApp with your message pre-filled.
          </p>
        </form>
      )}
    </div>
  );
}
