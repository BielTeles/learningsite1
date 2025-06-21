import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable static export for GitHub Pages
  output: 'export',
  trailingSlash: true,
  
  // Performance optimizations
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
    scrollRestoration: true,
  },
  
  // Image optimization (disabled for static export)
  images: {
    unoptimized: true,
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60 * 60 * 24 * 7, // 7 days
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Compression
  compress: true,

  // Headers and redirects disabled for static export
  // Static sites don't support dynamic headers/redirects
  // These would be configured at the hosting level (GitHub Pages, etc.)

  // Bundle analyzer in development
  webpack: (config, { dev, isServer }) => {
    return config;
  },
  
  // Disable x-powered-by header
  poweredByHeader: false,

  // Generate build ID for better caching
  generateBuildId: async () => {
    return `build-${Date.now()}`;
  },

  // Bundle analyzer in production
  ...(process.env.ANALYZE === 'true' && {
    webpack: (config: any) => {
      if (process.env.NODE_ENV === 'production') {
        const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
        config.plugins.push(
          new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            openAnalyzer: false,
          })
        );
      }
      return config;
    },
  }),
};

export default nextConfig;
