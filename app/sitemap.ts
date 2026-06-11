import type { MetadataRoute } from "next";

// 运行时渲染:URL 用容器注入的 SITE_URL,按当前环境输出测试/生产域名。
export const dynamic = "force-dynamic";

const SITE_URL = process.env.SITE_URL || "https://www.aipm.cn";

// 站点主要可索引路由(与 lib/nav.ts 的页面保持一致)。新增页面时同步补充。
const ROUTES = [
  "/",
  "/agents",
  "/workshop",
  "/cases",
  "/cases/detail",
  "/cobuild",
  "/contact",
  "/company",
  "/team",
  "/news",
  "/insights",
  "/insights/detail",
  "/products/fmclaw",
  "/products/collaboration",
  "/products/iot",
  "/products/robots",
  "/solutions",
  "/solutions/service-design",
  "/solutions/operations",
  "/solutions/quality",
  "/solutions/optimization",
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

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((path) => ({
    url: `${SITE_URL}${path === "/" ? "" : path}`,
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
