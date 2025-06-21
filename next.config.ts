import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable static export for GitHub Pages
  output: 'export',
  trailingSlash: true,
  distDir: 'out',
  
  // Performance optimizations
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
    scrollRestoration: true,
  },
  
  // Image optimization (disabled for static export)
  images: {
    unoptimized: true,
  },

  // Disable x-powered-by header
  poweredByHeader: false,
};

export default nextConfig;
