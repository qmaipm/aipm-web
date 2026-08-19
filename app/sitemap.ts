import type { MetadataRoute } from "next";
import { NEWS } from "./(site)/news/articles";
import { ARTICLES } from "./(site)/insights/articles";
import { ALL_CASES } from "./(site)/cases/cases";

// 运行时渲染:URL 用容器注入的 SITE_URL,按当前环境输出测试/生产域名。
export const dynamic = "force-dynamic";

const SITE_URL = process.env.SITE_URL || "https://www.aipm.cn";

// 站点主要可索引路由(与 lib/nav.ts 的页面保持一致)。新增页面时同步补充。
// 主要可索引路由(与 lib/nav.ts 保持一致)。新增页面时同步补充。
const ROUTES = [
  "/",
  "/ai-service",
  "/ai-service/delegated-operation",
  "/ai-service/cleaning",
  "/ai-service/facility",
  "/ai-service/security",
  "/ai-service/customer-service",
  "/agents",
  "/workshop",
  "/workshop/demo-day",
  "/workshop/bootcamp",
  "/workshop/competition",
  "/workshop/fde",
  "/cases",
  "/cobuild",
  "/partners",
  "/partners/agent-park",
  "/partners/program",
  "/partners/embodied-ai-data",
  "/contact",
  "/company",
  "/company/aipm-validation",
  "/team",
  "/news",
  "/products/fmclaw",
  "/products/fmclaw/ontology",
  "/products/fmclaw/workflow-engine",
  "/products/fmclaw/connectors",
  "/products/fmclaw/agent-runtime",
  "/products/iot",
  "/products/robots",
  "/solutions/cost",
  "/solutions/quality",
  "/solutions/customer",
  "/solutions/subcontract",
  "/solutions/inspection",
  "/solutions/payroll",
  "/solutions/procurement",
  "/solutions/assessment",
  "/solutions/operations",
  "/solutions/optimization",
  "/solutions/service-design",
  "/solutions/vendor",
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

// 行业研究文章(GEO 重点内容,优先级更高):直接读登记表,新增文章自动进 sitemap。
// (2026-08-07 改:手写数组导致新内容漏登记——新增视觉案例就漏了,改为从 cases.ts / articles.ts 自动生成)
const INSIGHTS = ["/insights", ...ARTICLES.map((a) => `/insights/${a.slug}`)];

// 客户案例(真实项目,GEO 重点):直接读登记表,新增案例自动进 sitemap。
const CASES = ALL_CASES.map((c) => ({ path: `/cases/${c.slug}`, lastModified: c.dateModified }));

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
  const cases = CASES.map(({ path, lastModified }) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));
  // 新闻正文页:直接读登记表,新增新闻自动进 sitemap
  const news = NEWS.map((n) => ({
    url: `${SITE_URL}/news/${n.slug}`,
    lastModified: n.date,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));
  return [...main, ...insights, ...cases, ...news];
}
