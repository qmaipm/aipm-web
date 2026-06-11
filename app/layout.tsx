import type { Metadata, Viewport } from "next";

// 运行时渲染:让 metadataBase(OG / canonical 绝对地址)按容器注入的 SITE_URL 取值,
// 测试站显示测试域名、生产站显示生产域名,单镜像适配两套环境。
export const dynamic = "force-dynamic";

// 站点对外地址(用于 OG / canonical 等绝对地址)。由容器环境变量注入,默认生产域名。
const SITE_URL = process.env.SITE_URL || "https://www.aipm.cn";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "启盟科技 · 物业与设施管理的 AI 操作系统 — FMClaw™",
  description:
    "物业与设施管理,正在被 AI 重写。FMClaw™ 把 AI 接入日常运营。带着你的一个真实业务,在 FMAI 工作坊里用 1–3 天把它跑通。",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">{children}</body>
    </html>
  );
}
