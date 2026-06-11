import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Docker 部署:产出自包含的 .next/standalone(含最小 node_modules + server.js)
  output: "standalone",
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
