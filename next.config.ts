import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
  images: {
    localPatterns: [
      {
        pathname: '/api/v1/product',
        search: '?key=**',
      },
      {
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
