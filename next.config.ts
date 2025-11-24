// import type { NextConfig } from "next";
//
// const nextConfig: NextConfig = {
//   experimental: {
//     serverActions: {
//       bodySizeLimit: "10mb",
//     },
//   },
//   images: {
//     localPatterns: [
//       {
//         pathname: '/api/v1/product',
//         search: '?key=**',
//       },
//       {
//         pathname: "/**",
//       },
//     ],
//   },
// };
//
// export default nextConfig;



// next.config.ts
import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
  images: {
    localPatterns: [
      {
        pathname: "/api/v1/product",
        search: "?key=**",
      },
      {
        pathname: "/**",
      },
    ],
    unoptimized: true,
  },
};

// 👇 Only run this in development so bindings (R2, etc.) work with `next dev`
if (process.env.NODE_ENV === "development") {
  void initOpenNextCloudflareForDev();
}

export default nextConfig;



