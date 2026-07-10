import type { MetadataRoute } from "next";

// 运行时渲染:URL 用容器注入的 SITE_URL,按当前环境输出测试/生产域名。
export const dynamic = "force-dynamic";

const SITE_URL = process.env.SITE_URL || "https://www.aipm.cn";

// 站点主要可索引路由(与 lib/nav.ts 的页面保持一致)。新增页面时同步补充。
// 主要可索引路由(与 lib/nav.ts 保持一致)。新增页面时同步补充。
const ROUTES = [
  "/",
  "/ai-service",
  "/ai-service/cleaning",
  "/agents",
  "/workshop",
  "/cases",
  "/cobuild",
  "/contact",
  "/company",
  "/team",
  "/news",
  "/products/fmclaw",
  "/products/collaboration",
  "/products/iot",
  "/products/robots",
  "/solutions/cost",
  "/solutions/quality",
  "/solutions/customer",
  "/solutions/subcontract",
  "/solutions/inspection",
  "/solutions/payroll",
  "/solutions/procurement",
  "/scenarios/utility-bill",
  "/scenarios/repair-bot",
  "/scenarios/exec-query",
  "/scenarios/reconciliation",
  "/scenarios/inspection",
  "/scenarios/dispatch",
  "/legal/privacy",
  "/legal/terms",
  "/legal/cookies",
];

// 行业研究文章(GEO 重点内容,优先级更高)
const INSIGHTS = [
  "/insights",
  "/insights/property-management-second-half-ai-company",
  "/insights/ai-property-staff-optimization",
  "/insights/how-to-choose-cleaning-robot-roi",
  "/insights/why-obc",
  "/insights/about-obc",
  "/insights/obc-practice",
  "/insights/obc-impact",
  "/insights/obc-in-china",
  "/insights/industry-llm",
  "/insights/digital-labor",
  "/insights/digital-labor-trends",
];

// 客户案例(真实项目,GEO 重点)
const CASES = [
  "/cases/aipm-property-ai-transformation",
  "/cases/south-china-mixed-use-6-to-1",
  "/cases/30w-park-ai-property-manager-robot",
  "/cases/property-group-chat-ai-service",
  "/cases/property-group-auto-operation-report",
  "/cases/coworking-supplier-reconciliation",
  "/cases/restroom-quality",
  "/cases/fmclaw-equipment-inspection",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const main = ROUTES.map((path) => ({
    url: `${SITE_URL}${path === "/" ? "" : path}`,
    changeFrequency: "monthly" as const,
    priority: path === "/" ? 1 : 0.7,
  }));
  const insights = INSIGHTS.map((path) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));
  const cases = CASES.map((path) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));
  return [...main, ...insights, ...cases];
}
