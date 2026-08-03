// ============================================================
// RA Enterprises – Product Catalog
// ============================================================
// To add a new product: copy one of the objects below,
// give it a unique `id` and `slug`, and fill in the details.
// ============================================================

import { Product } from '@/types';

export const products: Product[] = [
  // ── SIGNATURE BLENDS ────────────────────────────────────────
  {
    id: 'ghati-masala',
    slug: 'ghati-masala',
    name: 'Ghati Masala',
    nameHindi: 'घाटी मसाला',
    category: 'masala-blends',
    description:
      'An authentic blend from the Sahyadri ghats — bold, earthy, and deeply aromatic.',
    longDescription:
      'Ghati Masala is a treasured spice mix originating from the Sahyadri mountain belt of Maharashtra. ' +
      'Our recipe is crafted from hand-picked whole spices, slow-roasted over traditional flame and stone-ground to preserve every note of flavour. ' +
      'It adds a robust, warming depth to bhaji, chutney, meat dishes, and dal. ' +
      'No artificial colours or preservatives — pure tradition in every pinch.',
    price: 120,
    unit: '100g',
    availableSizes: [
      { label: '100g', price: 120 },
      { label: '250g', price: 280 },
      { label: '500g', price: 520 },
    ],
    image: '/images/fresh-masala-texture.jpeg',
    images: ['/images/fresh-masala-texture.jpeg'],
    featured: true,
    inStock: true,
    tags: ['maharashtrian', 'signature', 'bestseller'],
  },
  {
    id: 'malvani-masala',
    slug: 'malvani-masala',
    name: 'Malvani Masala',
    nameHindi: 'मालवणी मसाला',
    category: 'masala-blends',
    description:
      'The fiery soul of the Konkan coast — coconut-based, rich, and irresistibly fragrant.',
    longDescription:
      'Malvani Masala is the cornerstone of coastal Konkan cuisine. ' +
      'Our blend uses dried coconut, Kashmiri red chillies, black pepper, and a dozen more whole spices, ' +
      'roasted and ground fresh to deliver that unmistakable oceanic warmth. ' +
      'Perfect for Malvani fish curry, chicken curry, mutton, and crab preparations. ' +
      'Experience the authentic Sindhudurg flavour straight from our kitchen.',
    price: 140,
    unit: '100g',
    availableSizes: [
      { label: '100g', price: 140 },
      { label: '250g', price: 320 },
      { label: '500g', price: 600 },
    ],
    image: '/images/traditional-spice-prep.jpeg',
    images: ['/images/traditional-spice-prep.jpeg'],
    featured: true,
    inStock: true,
    tags: ['konkan', 'coastal', 'signature', 'bestseller'],
  },

  // ── PURE SPICES ─────────────────────────────────────────────
  {
    id: 'turmeric-powder',
    slug: 'turmeric-powder',
    name: 'Turmeric Powder',
    nameHindi: 'हळद',
    category: 'pure-spices',
    description: 'Bright, vibrant, and packed with curcumin — farm-fresh haldi at its purest.',
    longDescription:
      'Our Turmeric Powder is sourced directly from Sangli district farms known for high curcumin content. ' +
      'The roots are sun-dried and cold-ground to lock in colour, aroma, and medicinal value. ' +
      'Free from chalk powder or artificial colour additives commonly found in market turmeric. ' +
      'Use in curries, dal, milk, and as a natural health supplement.',
    price: 80,
    unit: '200g',
    availableSizes: [
      { label: '200g', price: 80 },
      { label: '500g', price: 180 },
      { label: '1kg', price: 340 },
    ],
    image: '/images/whole-spice-selection.jpeg',
    images: ['/images/whole-spice-selection.jpeg'],
    featured: true,
    inStock: true,
    tags: ['essential', 'pure', 'health'],
  },
  {
    id: 'red-chilli-powder',
    slug: 'red-chilli-powder',
    name: 'Red Chilli Powder',
    nameHindi: 'लाल मिरची',
    category: 'pure-spices',
    description: 'Deeply red, intensely spicy — ground from the finest Byadagi and Kolhapuri chillies.',
    longDescription:
      'We use a curated mix of Byadagi chillies (for colour) and Kolhapuri chillies (for heat) to deliver a powder that is both visually vibrant and palate-awakening. ' +
      'Each batch is sun-dried naturally and ground without added colour. ' +
      'Ideal for curries, marinades, chutneys, and tadka.',
    price: 90,
    unit: '200g',
    availableSizes: [
      { label: '200g', price: 90 },
      { label: '500g', price: 200 },
      { label: '1kg', price: 380 },
    ],
    image: '/images/dried-red-chillies.jpeg',
    images: ['/images/dried-red-chillies.jpeg'],
    featured: false,
    inStock: true,
    tags: ['essential', 'pure', 'spicy'],
  },
  {
    id: 'coriander-powder',
    slug: 'coriander-powder',
    name: 'Coriander Powder',
    nameHindi: 'धने',
    category: 'pure-spices',
    description: 'Mildly sweet, citrusy, and aromatic — the base note of Indian cooking.',
    longDescription:
      'Ground from whole Rajasthani coriander seeds, our Coriander Powder adds a subtle citrusy sweetness and earthy undertone to every dish. ' +
      'Freshly milled in small batches to retain the natural essential oils. ' +
      'An indispensable ingredient for curries, dals, meat gravies, and spice rubs.',
    price: 70,
    unit: '200g',
    availableSizes: [
      { label: '200g', price: 70 },
      { label: '500g', price: 160 },
      { label: '1kg', price: 300 },
    ],
    image: '/images/whole-spices-bowls.jpeg',
    images: ['/images/whole-spices-bowls.jpeg'],
    featured: false,
    inStock: true,
    tags: ['essential', 'pure'],
  },
  {
    id: 'garam-masala',
    slug: 'garam-masala',
    name: 'Garam Masala',
    nameHindi: 'गरम मसाला',
    category: 'masala-blends',
    description: 'A warming, aromatic finish blend — the crown jewel of North Indian cooking.',
    longDescription:
      'Our Garam Masala is blended from over 15 premium whole spices including black cardamom, green cardamom, cinnamon, cloves, black pepper, star anise, mace, and more. ' +
      'Each spice is dry-roasted individually and then ground together in perfect proportion. ' +
      'Sprinkle over biryanis, curries, and gravies for an immediate lift of aroma and warmth.',
    price: 110,
    unit: '100g',
    availableSizes: [
      { label: '100g', price: 110 },
      { label: '250g', price: 250 },
      { label: '500g', price: 470 },
    ],
    image: '/images/traditional-spice-prep.jpeg',
    images: ['/images/traditional-spice-prep.jpeg'],
    featured: true,
    inStock: true,
    tags: ['blend', 'aromatic', 'north-indian'],
  },
  {
    id: 'cumin-powder',
    slug: 'cumin-powder',
    name: 'Cumin Powder',
    nameHindi: 'जिरे',
    category: 'pure-spices',
    description: 'Nutty, earthy, and warming — freshly ground jeera for every Indian kitchen.',
    longDescription:
      'Our Cumin Powder is sourced from the premium cumin-growing regions of Gujarat and Rajasthan. ' +
      'Lightly roasted before grinding to enhance the nuttiness and digestive qualities. ' +
      'Essential for raita, curries, dal, chaas, and tadka.',
    price: 85,
    unit: '200g',
    availableSizes: [
      { label: '200g', price: 85 },
      { label: '500g', price: 190 },
      { label: '1kg', price: 360 },
    ],
    image: '/images/whole-spices-bowls.jpeg',
    images: ['/images/whole-spices-bowls.jpeg'],
    featured: false,
    inStock: true,
    tags: ['essential', 'pure'],
  },
  {
    id: 'kitchen-king-masala',
    slug: 'kitchen-king-masala',
    name: 'Kitchen King Masala',
    nameHindi: 'किचन किंग मसाला',
    category: 'masala-blends',
    description: 'All-in-one everyday masala — the king of Indian household cooking.',
    longDescription:
      'Kitchen King Masala is our versatile all-purpose blend designed for everyday cooking. ' +
      'It combines coriander, cumin, turmeric, red chilli, garam masala spices, and more in a balanced ratio that works beautifully in paneer dishes, vegetables, gravies, and rice. ' +
      'Save time without compromising on authentic flavour.',
    price: 100,
    unit: '100g',
    availableSizes: [
      { label: '100g', price: 100 },
      { label: '250g', price: 230 },
      { label: '500g', price: 430 },
    ],
    image: '/images/fresh-masala-bowl.jpeg',
    images: ['/images/fresh-masala-bowl.jpeg'],
    featured: false,
    inStock: true,
    tags: ['blend', 'everyday', 'versatile'],
  },
  {
    id: 'chaat-masala',
    slug: 'chaat-masala',
    name: 'Chaat Masala',
    nameHindi: 'चाट मसाला',
    category: 'specialty',
    description: 'Tangy, spicy, and utterly addictive — the magic dust of Indian street food.',
    longDescription:
      'Our Chaat Masala blends amchur (raw mango powder), black salt, cumin, ginger, and a touch of asafoetida to create that irresistible tangy punch. ' +
      'Sprinkle over fruit, papdi chaat, pani puri, samosa, poha, or salads for an instant street-food kick.',
    price: 75,
    unit: '100g',
    availableSizes: [
      { label: '100g', price: 75 },
      { label: '250g', price: 170 },
    ],
    image: '/images/whole-spice-selection.jpeg',
    images: ['/images/whole-spice-selection.jpeg'],
    featured: false,
    inStock: true,
    tags: ['specialty', 'street-food', 'tangy'],
  },
  {
    id: 'chicken-masala',
    slug: 'chicken-masala',
    name: 'Chicken Masala',
    nameHindi: 'चिकन मसाला',
    category: 'masala-blends',
    description: 'Restaurant-quality chicken curry in your own kitchen — rich, smoky, and aromatic.',
    longDescription:
      'Our Chicken Masala blend is crafted with a focus on depth and balance. ' +
      'Whole spices like black cardamom, cloves, cinnamon, bay leaf are paired with ground coriander, cumin, and Kashmiri chilli for a gravy that is deep red, fragrant, and finger-licking good. ' +
      'Works equally well for dry preparations, curries, and marinades.',
    price: 130,
    unit: '100g',
    availableSizes: [
      { label: '100g', price: 130 },
      { label: '250g', price: 300 },
      { label: '500g', price: 560 },
    ],
    image: '/images/fresh-masala-bowl.jpeg',
    images: ['/images/fresh-masala-bowl.jpeg'],
    featured: false,
    inStock: true,
    tags: ['blend', 'non-veg', 'popular'],
  },
];

// ── Helpers ──────────────────────────────────────────────────

/** Get all featured products */
export const getFeaturedProducts = (): Product[] =>
  products.filter((p) => p.featured);

/** Get product by slug */
export const getProductBySlug = (slug: string): Product | undefined =>
  products.find((p) => p.slug === slug);

/** Get products by category */
export const getProductsByCategory = (category: Product['category']): Product[] =>
  products.filter((p) => p.category === category);

/** All category labels for the filter UI */
export const categoryLabels: Record<Product['category'], string> = {
  'masala-blends': 'Masala Blends',
  'pure-spices': 'Pure Spices',
  specialty: 'Specialty',
};
