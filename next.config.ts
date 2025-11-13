import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
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
