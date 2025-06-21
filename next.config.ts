import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable static export for GitHub Pages
  output: 'export',
  trailingSlash: true,
  distDir: 'out',
  
  // Image optimization (disabled for static export)
  images: {
    unoptimized: true,
  },
  
  // Performance optimizations
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
    scrollRestoration: true,
  },

  // Disable x-powered-by header
  poweredByHeader: false,
  
  // Ensure proper asset handling for static export
  assetPrefix: '',
  
  // Disable ISR and other server features for static export
  typescript: {
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    ignoreBuildErrors: false,
  },
  
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;
