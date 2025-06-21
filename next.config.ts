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
  assetPrefix: isGithubPages ? '/learningsite1' : '',
  
  // Ensure trailing slash for GitHub Pages
  trailingSlash: true,
  
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  
  // Performance optimizations
  compiler: {
    removeConsole: isProd,
  },

  // Disable x-powered-by header
  poweredByHeader: false,
};

export default nextConfig;
