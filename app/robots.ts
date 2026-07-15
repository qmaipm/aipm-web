import type { MetadataRoute } from "next";

// 运行时渲染:SITE_ENV / SITE_URL 由容器环境变量注入(见 docker-compose.yml),
// 一个镜像即可适配测试/生产。force-dynamic 确保按当前环境而非构建时的值输出。
export const dynamic = "force-dynamic";

// 仅生产环境允许收录;测试环境(t1816-www)整站 noindex,避免被搜索引擎抓取。
const isProd = process.env.SITE_ENV === "production";
const SITE_URL = process.env.SITE_URL || "https://www.aipm.cn";

// 主流中英文搜索引擎爬虫逐个显式放行(部分站长平台按 UA 精确匹配校验 robots)。
const ALLOWED_BOTS = [
  "Bytespider",
  "Baiduspider",
  "Bingbot",
  "Googlebot",
  "Sogou Spider",
  "360Spider",
];

export default function robots(): MetadataRoute.Robots {
  if (!isProd) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }
  return {
    rules: [
      ...ALLOWED_BOTS.map((userAgent) => ({ userAgent, allow: "/" })),
      { userAgent: "*", allow: "/" },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
