// ── Testimonials / Social Proof section ──────────────────────

import SectionTitle from '@/components/ui/SectionTitle';
import { StarIcon } from '@/components/layout/Icons';
import Reveal from '@/components/motion/Reveal';
import StaggerGrid from '@/components/motion/StaggerGrid';

// Add or remove testimonials here as you collect reviews
const testimonials = [
  {
    name: 'Priya Joshi',
    location: 'Pune',
    rating: 5,
    text: 'The Ghati Masala is absolutely incredible! It tastes just like my grandmother used to make. Finally found an authentic brand.',
  },
  {
    name: 'Rahul Deshmukh',
    location: 'Mumbai',
    rating: 5,
    text: 'Malvani Masala is the real deal. My fish curry has never tasted better. No artificial smell — pure spice goodness.',
  },
  {
    name: 'Surekha Patil',
    location: 'Kolhapur',
    rating: 5,
    text: 'Love the quality! Turmeric is so vibrant and fresh. You can tell they source carefully. Will never switch brands.',
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <StarIcon
          key={i}
          filled={i <= rating}
          className="w-4 h-4 text-amber-500"
        />
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-amber-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionTitle
            label="What Our Customers Say"
            title="Loved Across India"
            subtitle="Real reviews from families who trust RA A1 Masale every day."
          />
        </Reveal>

        <StaggerGrid className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-white rounded-2xl p-6 shadow-md border border-amber-100 flex flex-col gap-4 h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-950/10"
            >
              <StarRating rating={t.rating} />
              <p className="text-gray-700 text-sm leading-relaxed flex-1 italic">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-2 border-t border-amber-50">
                <div className="w-9 h-9 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 font-bold text-sm">
                  {t.name[0]}
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-900">{t.name}</div>
                  <div className="text-xs text-gray-500">{t.location}</div>
                </div>
              </div>
            </div>
          ))}
        </StaggerGrid>
      </div>
    </section>
  );
}
