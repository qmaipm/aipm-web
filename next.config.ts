import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Docker 部署:产出自包含的 .next/standalone(含最小 node_modules + server.js)
  output: "standalone",
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  // 伙伴板块路由重命名(2026-07):旧路径 301 到新路径,保住已被抓取的收录与外链
  async redirects() {
    return [
      { source: "/partners/building", destination: "/partners/agent-park", permanent: true },
      { source: "/partners/channel", destination: "/partners/reseller", permanent: true },
    ];
  },
};

export default nextConfig;
