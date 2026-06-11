import type { Metadata, Viewport } from "next";

// 站点对外地址(用于 OG / canonical 等绝对地址)。构建时按环境注入 SITE_URL,默认生产域名。
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
