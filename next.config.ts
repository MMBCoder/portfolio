import type { NextConfig } from "next";

const securityHeaders = [
  // Force HTTPS for 2 years, including subdomains
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  // Prevent MIME-type sniffing
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  // Only allow the page to be framed by the same origin
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  // Enable browser XSS filter
  {
    key: "X-XSS-Protection",
    value: "1; mode=block",
  },
  // Control referrer information
  {
    key: "Referrer-Policy",
    value: "origin-when-cross-origin",
  },
  // Restrict browser features
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  // DNS prefetch for faster external links
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
];

const nextConfig: NextConfig = {
  // Apply security headers to all routes
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },

  // /awards content now lives on the portfolio page
  async redirects() {
    return [
      {
        source: "/awards",
        destination: "/portfolio#awards",
        permanent: true,
      },
    ];
  },

  // Optimise images
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },

  // Compress responses
  compress: true,

  // Strict mode for catching bugs early
  reactStrictMode: true,

  // Trailing slash consistency
  trailingSlash: false,

  // Power header opt-out (minor security hygiene)
  poweredByHeader: false,
};

export default nextConfig;
