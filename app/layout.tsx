import type { Metadata, Viewport } from "next";
import JsonLd from "@/components/JsonLd";

// 运行时渲染:让 metadataBase(OG / canonical 绝对地址)按容器注入的 SITE_URL 取值,
// 测试站显示测试域名、生产站显示生产域名,单镜像适配两套环境。
export const dynamic = "force-dynamic";

// 站点对外地址(用于 OG / canonical 等绝对地址)。由容器环境变量注入,默认生产域名。
const SITE_URL = process.env.SITE_URL || "https://www.aipm.cn";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "启盟科技 · 物业与设施管理的 AI 操作系统 — FMClaw™",
  description:
    "物业与设施管理,正在被 AI 重写。FMClaw™ 把 AI 接入日常运营。带着你的一个真实业务,在 FMClaw™ 加速营里用 1–3 天把它跑通。",
  keywords: [
    "物业 AI",
    "物业管理 AI",
    "设施管理",
    "FM",
    "物业大模型",
    "物业 AI 智能体",
    "物业降本增效",
    "数字员工",
    "数字劳动力",
    "OBC 成果导向合约",
    "设备智能巡检",
    "FMClaw",
    "启盟科技",
    "爱物管",
  ],
  openGraph: {
    type: "website",
    locale: "zh_CN",
    siteName: "启盟科技 FMClaw™",
    url: SITE_URL,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

// 站点级结构化数据:组织 + 站点(供搜索引擎与 AI 生成引擎识别与引用)
const ORG_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "启盟科技",
  alternateName: ["爱物管", "Stalliance"],
  url: SITE_URL,
  logo: `${SITE_URL}/logo-stalliance-clean.png`,
  description: "面向物业与设施管理(FM)的行业级 AI 平台,核心产品 FMClaw™ AI 平台。",
  foundingDate: "2017",
  slogan: "让智能走进物理世界",
  award: [
    "广州市人工智能百强企业(广州市工业和信息化局认可)",
    "NVIDIA Inception 全球 AI 加速营成员",
    "国家高新技术企业",
  ],
  subOrganization: {
    "@type": "Organization",
    name: "爱物管",
    description: "启盟科技自营的物业公司,AI 物业服务的履约交付主体。",
  },
};
const SITE_LD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "启盟科技 FMClaw™",
  url: SITE_URL,
  inLanguage: "zh-CN",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">
        <JsonLd data={[ORG_LD, SITE_LD]} />
        {children}
      </body>
    </html>
  );
}
