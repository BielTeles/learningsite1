import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';
const isGitHubPages = process.env.GITHUB_PAGES === 'true';

const nextConfig: NextConfig = {
  // Enable static export for GitHub Pages
  output: 'export',
  trailingSlash: true,
  
  // Image optimization (disabled for static export)
  images: {
    unoptimized: true,
  },
  
  // Conditional base path for GitHub Pages
  ...(isGitHubPages && {
    basePath: '/learningsite1',
    assetPrefix: '/learningsite1/',
  }),
  
  // Performance optimizations
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
    scrollRestoration: true,
  },

  // Disable x-powered-by header
  poweredByHeader: false,
  
  // TypeScript and ESLint settings
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
