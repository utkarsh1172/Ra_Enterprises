/**
 * The canonical public origin for this deployment.
 *
 * Resolved once, in priority order:
 *   1. NEXT_PUBLIC_SITE_URL          — an explicit custom domain always wins.
 *   2. VERCEL_PROJECT_PRODUCTION_URL — the stable production domain Vercel
 *      injects automatically, so a forgotten env var can never again emit
 *      localhost URLs into the sitemap (Search Console rejects those with
 *      "URL not allowed").
 *   3. VERCEL_URL                    — this specific deployment (previews).
 *   4. localhost                     — local development.
 *
 * Vercel's system vars carry no protocol and no trailing slash, so both are
 * normalised here rather than at each call site.
 */
function normalise(raw: string | undefined): string | null {
  if (!raw) return null;
  const trimmed = raw.trim().replace(/\/+$/, '');
  if (!trimmed) return null;
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
}

export const SITE_URL =
  normalise(process.env.NEXT_PUBLIC_SITE_URL) ??
  normalise(process.env.VERCEL_PROJECT_PRODUCTION_URL) ??
  normalise(process.env.VERCEL_URL) ??
  'http://localhost:3000';
