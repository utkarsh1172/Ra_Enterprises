# RA A1 Masale — Website

E-commerce catalog site for RA A1 Masale (spices/masala blends). Next.js (App Router) storefront + a JSON-auth-protected admin panel, backed by Firebase Firestore for product/category data. Orders are handled via WhatsApp handoff (no payment gateway/checkout).

This file exists so a new engineer or AI assistant can get productive here without re-deriving the whole architecture from scratch.

## Stack

- **Next.js 16** (App Router, Turbopack), React 19, TypeScript
- **Tailwind CSS 4** for styling
- **Firebase Admin SDK** (Firestore) for product/category data — server-only, via `firebase-admin`
- **NextAuth v5 (beta)** for admin authentication (credentials provider, JWT sessions)
- No cart/checkout payment integration — the "cart" builds a pre-filled **WhatsApp** message; that's the entire checkout flow

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000 (or next free port)
npm run build    # production build — also type-checks
```

## Environment variables

Required in `.env.local` (git-ignored, never commit):

```
FIREBASE_PROJECT_ID=...
FIREBASE_CLIENT_EMAIL=...
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

These come from a Firebase service account JSON (Firebase Console → Project Settings → Service Accounts → Generate new private key). `FIREBASE_PRIVATE_KEY` keeps its `\n` escapes in the env file — `src/lib/firebase/admin.ts` un-escapes them at runtime.

Optional:

```
NEXT_PUBLIC_SITE_URL=https://your-production-domain.com   # used for canonical URLs, sitemap, JSON-LD, OG images
GOOGLE_SITE_VERIFICATION=...                                # Search Console meta-tag verification (alternative to HTML file upload)
AUTH_SECRET=...                                             # NextAuth JWT signing secret — required in production
```

**If a `.env`/`.env.local` value in this repo was ever pasted into a chat, treat that credential as compromised and rotate it in the Firebase console** — generate a new service account key and delete the old one.

## Data model & where data lives

Products and categories live in **Firestore**, not in the repo, as of the Firestore migration. The repository layer abstracts this:

- `src/lib/firebase/admin.ts` — Firestore client init (reads env vars above)
- `src/lib/db/productRepository.ts` — CRUD for the `products` Firestore collection
- `src/lib/db/categoryRepository.ts` — CRUD for the `categories` Firestore collection
- `src/data/products.ts` — thin async wrapper re-exporting repository functions for use in Server Components/pages
- `src/types/index.ts` — canonical `Product` / `Category` / `Cart*` TypeScript types — check here first when unsure what fields exist

Admin user auth (`src/lib/db/adminRepository.ts`) still reads from **local JSON** (`src/data/db/admin.json`) via `src/lib/db/jsonStore.ts` — this was intentionally *not* migrated to Firestore. `src/data/db/products.json` and `categories.json` are the pre-migration seed data / fallback reference — Firestore is the live source of truth for the site.

A one-off migration script that seeded Firestore from those JSON files: `scripts/migrate-to-firestore.mjs`. Re-run it only if you intend to overwrite Firestore docs with the JSON file contents (it does a batch `set`, not a merge).

### Product pricing convention

Prices are per-package, not just per-kg. `Product.price`/`unit` hold the base display price; `Product.availableSizes` is the authoritative list of `{ label, price }` pairs shown on the product page (e.g. 100g / 250g / 500g / 1kg). When changing a product's per-kg price, recompute every size in `availableSizes` — nothing derives them automatically.

## Contact / business info

Single source of truth: `src/utils/whatsapp.ts` (`WHATSAPP_NUMBER`, `BUSINESS_INFO`). Footer, contact page, WhatsApp floating button, and the cart's WhatsApp order flow all import from here — update this file, not the individual components, when the phone/email/address changes. The same phone/email is also duplicated into the `Organization` JSON-LD in `src/app/layout.tsx` for SEO structured data — keep both in sync.

## SEO setup (already in place)

- `src/app/layout.tsx` — global `<title>` template, OG/Twitter defaults, `Organization` JSON-LD, optional Google verification meta tag
- `src/app/sitemap.ts` — auto-generates from static routes + live Firestore product list
- `src/app/robots.ts` — disallows `/admin`, `/api`, `/cart`
- Each page (`about`, `contact`, `journey`, `products`, `products/[slug]`) exports its own `metadata` with a canonical path — `contact/page.tsx` is a Server Component specifically so it *can* export metadata; its interactive form lives in `src/components/contact/ContactForm.tsx` as a separate client component. Follow that split if you need to add client interactivity to another metadata-bearing page.
- `products/[slug]/page.tsx` adds per-product `Product` + `BreadcrumbList` JSON-LD; `products/page.tsx` adds `ItemList` + `BreadcrumbList`.
- Google Search Console: verify via HTML file (drop the file Google gives you straight into `public/`) or via the `GOOGLE_SITE_VERIFICATION` env var — whichever is more convenient at the time.

## Admin panel

Routes under `src/app/admin/`, gated by `src/proxy.ts` (Next middleware) using NextAuth's `getToken()`. Auth config is split for edge-compatibility:

- `src/lib/auth.config.ts` — edge-safe, no bcrypt, used by middleware
- `src/lib/auth.ts` — full config with the Credentials provider (bcrypt password check), used by API routes

Admin CRUD API routes (`src/app/api/admin/**`) call the same `productRepository`/`categoryRepository` functions as the public site — there's one data layer, not two.

## Conventions worth knowing before editing

- Repository functions (`list*`, `get*By*`, `create*`, `update*`, `delete*`) keep identical signatures whether backed by JSON or Firestore — if you touch the storage layer again, preserve those signatures so callers don't need to change.
- Slugs double as Firestore document IDs (`db.collection('products').doc(slug)`), generated via a local `slugify()` in each repository — don't introduce a second ID scheme.
- `active: false` is the soft-delete/visibility flag for both products and categories — don't hard-delete unless explicitly asked.
- Images live in `public/images/`; product `image`/`images` fields are paths relative to `public/`, not full URLs.
