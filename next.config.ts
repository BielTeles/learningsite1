import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';
const isGithubPages = process.env.GITHUB_ACTIONS === 'true';

const nextConfig: NextConfig = {
  // Enable static export for GitHub Pages
  output: 'export',
  
  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },
  
  // Set base path for GitHub Pages
  basePath: isGithubPages ? '/learningsite1' : '',
  assetPrefix: isGithubPages ? '/learningsite1/' : '',
  
  // Ensure trailing slash for GitHub Pages
  trailingSlash: true,
  
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  experimental: {
    // Performance optimizations
    optimizePackageImports: ['lucide-react', 'framer-motion'],
    
    // Improved performance optimizations
    scrollRestoration: true,
  },

  // Compression
  compress: true,

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
