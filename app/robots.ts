import type { MetadataRoute } from "next";

// 仅生产环境允许收录;测试环境(t1816-www)整站 noindex,避免被搜索引擎抓取。
// 由构建时的 SITE_ENV 决定:生产镜像 SITE_ENV=production,测试镜像 SITE_ENV=test。
const isProd = process.env.SITE_ENV === "production";
const SITE_URL = process.env.SITE_URL || "https://www.aipm.cn";

export default function robots(): MetadataRoute.Robots {
  if (!isProd) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
