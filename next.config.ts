import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Docker 部署:产出自包含的 .next/standalone(含最小 node_modules + server.js)
  output: "standalone",
  // 伙伴板块路由重命名(2026-07):旧路径 308 到新路径,保住已被抓取的收录与外链
  // /partners/channel → /partners/reseller → /partners/program 两代旧路径均直接指向最终 URL
  async redirects() {
    return [
      { source: "/partners/building", destination: "/partners/agent-park", permanent: true },
      // 第三方平台 AI 协同已并入工具箱页（2026-07）：内容整体迁移，保住收录与外链
      { source: "/products/collaboration", destination: "/products/fmclaw/connectors", permanent: true },
      { source: "/partners/channel", destination: "/partners/program", permanent: true },
      { source: "/partners/reseller", destination: "/partners/program", permanent: true },
      // 案例 v2 重写版已合并回正式页（2026-07）：删除重复页，避免同内容双 URL
      { source: "/cases/property-group-chat-ai-service-v2", destination: "/cases/property-group-chat-ai-service", permanent: true },
      // 旗舰样板（爱物管自营验证）迁至公司板块（2026-07）：案例区只保留客户项目
      { source: "/cases/aipm-property-ai-transformation", destination: "/company/aipm-validation", permanent: true },
    ];
  },
};

export default nextConfig;
