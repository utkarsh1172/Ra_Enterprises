import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    // Allow external image domains if needed later (e.g. CDN)
    remotePatterns: [
      // Example: { protocol: 'https', hostname: 'cdn.raenterprises.in' },
    ],
    // Suppress missing image errors in development
    unoptimized: false,
  },
};

export default nextConfig;
