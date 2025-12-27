import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
   experimental: {
    // Increase bundle size limit
    serverComponentsExternalPackages: [],
  },
  typescript: {
    ignoreBuildErrors: true, // Temporary for debugging
  },
  // If using images
  images: {
    unoptimized: true, // Try this if image optimization is causing issues
  },
};

export default nextConfig;
