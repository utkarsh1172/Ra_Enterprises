// ── "Why RA A1 Enterprises" feature grid ──────────────────────

import SectionTitle from '@/components/ui/SectionTitle';
import Reveal from '@/components/motion/Reveal';
import StaggerGrid from '@/components/motion/StaggerGrid';
import { FlameIcon, LeafIcon, SparklesIcon, ScaleIcon, CheckIcon, HomeIcon } from '@/components/layout/Icons';

const features = [
  { icon: FlameIcon, title: 'Authentic Flavour', desc: 'Recipes rooted in real Indian kitchens — bold, layered and unmistakably genuine.' },
  { icon: LeafIcon, title: 'Quality Spices', desc: 'Only whole spices that meet our standard for colour, aroma and character make the cut.' },
  { icon: ScaleIcon, title: 'Carefully Selected Ingredients', desc: 'Every batch is hand-checked before it goes anywhere near the grinder.' },
  { icon: SparklesIcon, title: 'Rich Aroma', desc: 'Slow-roasted and freshly ground so the fragrance carries all the way to the plate.' },
  { icon: CheckIcon, title: 'Consistent Quality', desc: 'The same trusted taste in every pack, every single time you reorder.' },
  { icon: HomeIcon, title: 'Made for Indian Kitchens', desc: 'Designed to work the way you actually cook — no adjusting, no guesswork.' },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-[#fffdf8] py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <Reveal>
          <SectionTitle
            label="Why Choose Us"
            title="Why RA A1 Enterprises"
            subtitle="A simple promise, kept in every pack we send out."
          />
        </Reveal>

        <StaggerGrid className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="group h-full rounded-lg border border-[#ead8b6] bg-[#fffaf0] p-7 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-[#b15a2a]/35 hover:shadow-xl hover:shadow-amber-950/10"
            >
              <span className="grid h-12 w-12 place-items-center rounded-full bg-[#fff1d0] text-[#b15a2a] transition-colors duration-300 group-hover:bg-[#f5a831] group-hover:text-[#38170e]">
                <f.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-5 font-serif text-h4 text-[#3d2015]">{f.title}</h3>
              <p className="mt-2 text-small leading-relaxed text-[#6f5a4c]">{f.desc}</p>
            </div>
          ))}
        </StaggerGrid>
      </div>
    </section>
  );
}
