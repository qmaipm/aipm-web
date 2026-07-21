import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Docker 部署:产出自包含的 .next/standalone(含最小 node_modules + server.js)
  output: "standalone",
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  // 伙伴板块路由重命名(2026-07):旧路径 308 到新路径,保住已被抓取的收录与外链
  // /partners/channel → /partners/reseller → /partners/program 两代旧路径均直接指向最终 URL
  async redirects() {
    return [
      { source: "/partners/building", destination: "/partners/agent-park", permanent: true },
      // 第三方平台 AI 协同已并入工具箱页（2026-07）：内容整体迁移，保住收录与外链
      { source: "/products/collaboration", destination: "/products/fmclaw/connectors", permanent: true },
      { source: "/partners/channel", destination: "/partners/program", permanent: true },
      { source: "/partners/reseller", destination: "/partners/program", permanent: true },
    ];
  },
};

export default nextConfig;
