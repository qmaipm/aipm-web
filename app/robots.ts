import type { MetadataRoute } from "next";

// 运行时渲染:SITE_ENV / SITE_URL 由容器环境变量注入(见 docker-compose.yml),
// 一个镜像即可适配测试/生产。force-dynamic 确保按当前环境而非构建时的值输出。
export const dynamic = "force-dynamic";

// 仅生产环境允许收录;测试环境(t1816-www)整站 noindex,避免被搜索引擎抓取。
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
