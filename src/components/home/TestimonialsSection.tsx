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
          className="h-4 w-4 text-[#f5a831]"
        />
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  return (
    <section className="bg-[#f8efe0] py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <Reveal>
          <SectionTitle
            label="What Our Customers Say"
            title="Loved Across India"
            subtitle="Real reviews from families who trust RA A1 Enterprises every day."
          />
        </Reveal>

        <StaggerGrid className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="flex h-full flex-col gap-4 rounded-lg border border-[#ead8b6] bg-[#fffaf0] p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#b15a2a]/35 hover:shadow-xl hover:shadow-amber-950/10"
            >
              <StarRating rating={t.rating} />
              <p className="flex-1 text-sm leading-relaxed text-[#5f4a3e]">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="flex items-center gap-3 border-t border-[#ead8b6] pt-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#fff1d0] text-sm font-black text-[#b15a2a]">
                  {t.name[0]}
                </span>
                <div>
                  <div className="text-sm font-extrabold text-[#3d2015]">{t.name}</div>
                  <div className="mt-0.5 text-xs font-semibold text-[#7b6658]">{t.location}</div>
                </div>
              </div>
            </div>
          ))}
        </StaggerGrid>
      </div>
    </section>
  );
}
