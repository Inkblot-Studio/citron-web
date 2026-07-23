const BILLING_URL = process.env.NEXT_PUBLIC_BILLING_URL ?? 'https://billing.citronos.com';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    // /account (profile) stays on this site. Usage, billing and invoices live
    // on the billing subdomain — redirect the old sub-routes there.
    return [
      { source: '/account/usage', destination: `${BILLING_URL}/usage`, permanent: false },
      { source: '/account/billing', destination: `${BILLING_URL}/billing`, permanent: false },
    ];
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
      {
        source: '/brand/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ];
  },
};

export default nextConfig;
