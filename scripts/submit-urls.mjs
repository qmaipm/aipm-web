#!/usr/bin/env node
/**
 * 搜索引擎 URL 主动推送脚本（SEO 自动化）
 *
 * 覆盖两个有合规推送通道的引擎：
 *   1. IndexNow —— Bing（同时分发给 Yandex/Seznam/Naver 等成员引擎）。
 *      key 为自生成，对应站点根目录下的 /<key>.txt 验证文件（public/ 内）。
 *   2. 百度普通收录 API —— 需要 BAIDU_PUSH_TOKEN 环境变量
 *      （百度搜索资源平台 → 普通收录 → API 提交 页面获取）。
 *      未配置时自动跳过，不影响 IndexNow。
 *
 * Google 无需也无法脚本推送：sitemap ping 已于 2023-06 废弃，
 * Indexing API 仅限招聘/直播类页面。Google 依赖 robots.txt 中的
 * sitemap 声明 + Search Console 后台提交（一次性手动操作）。
 *
 * 用法：
 *   node scripts/submit-urls.mjs                  # 推送 sitemap 中全部 URL
 *   node scripts/submit-urls.mjs /partners /news  # 只推送指定路径
 *   BAIDU_PUSH_TOKEN=xxx node scripts/submit-urls.mjs
 *   DRY_RUN=1 node scripts/submit-urls.mjs        # 只收集不推送，验证 URL 列表
 *
 * 建议接入部署流程：生产发布成功后执行一次（见 package.json 的 postdeploy:push）。
 */

const SITE_URL = (process.env.SITE_URL || "https://www.aipm.cn").replace(/\/$/, "");
const HOST = new URL(SITE_URL).host;
const INDEXNOW_KEY = "174ba57cd2f99c8154daec1ab1c8f82c"; // 对应 public/<key>.txt
const BAIDU_TOKEN = process.env.BAIDU_PUSH_TOKEN || "";
const DRY_RUN = process.env.DRY_RUN === "1";

/* ---------- 收集要推送的 URL ---------- */
async function collectUrls() {
  const args = process.argv.slice(2);
  if (args.length > 0) {
    // 手动指定路径
    return args.map((p) => (p.startsWith("http") ? p : `${SITE_URL}${p.startsWith("/") ? p : "/" + p}`));
  }
  // 默认：拉取线上 sitemap，推送全部 URL
  const res = await fetch(`${SITE_URL}/sitemap.xml`);
  if (!res.ok) throw new Error(`拉取 sitemap 失败: HTTP ${res.status}`);
  const xml = await res.text();
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
  if (urls.length === 0) throw new Error("sitemap 中没有解析到任何 URL");
  return urls;
}

/* ---------- IndexNow（Bing 等）---------- */
async function pushIndexNow(urls) {
  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host: HOST,
      key: INDEXNOW_KEY,
      keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
      urlList: urls,
    }),
  });
  // IndexNow 成功返回 200 或 202；4xx 说明 key 验证或参数问题
  const ok = res.status === 200 || res.status === 202;
  console.log(`[IndexNow] ${ok ? "✓" : "✗"} HTTP ${res.status} — 提交 ${urls.length} 条 URL${ok ? "" : `（${await res.text()}）`}`);
  return ok;
}

/* ---------- 百度普通收录 API ---------- */
async function pushBaidu(urls) {
  if (!BAIDU_TOKEN) {
    console.log("[百度] ⏭ 跳过 — 未配置 BAIDU_PUSH_TOKEN（百度搜索资源平台 → 普通收录 → API 提交 获取）");
    return null;
  }
  const endpoint = `http://data.zz.baidu.com/urls?site=${SITE_URL}&token=${BAIDU_TOKEN}`;
  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "text/plain" },
    body: urls.join("\n"),
  });
  const body = await res.json().catch(() => ({}));
  if (body.success !== undefined) {
    // 百度每日有配额（remain），推送成功条数为 success
    console.log(`[百度] ✓ 成功 ${body.success} 条，今日剩余配额 ${body.remain ?? "?"}`);
    return true;
  }
  console.log(`[百度] ✗ HTTP ${res.status} — ${JSON.stringify(body)}`);
  return false;
}

/* ---------- 主流程 ---------- */
(async () => {
  console.log(`站点: ${SITE_URL}`);
  const urls = await collectUrls();
  console.log(`待推送 URL: ${urls.length} 条`);
  if (DRY_RUN) {
    urls.forEach((u) => console.log("  " + u));
    console.log("[DRY_RUN] 未实际推送");
    return;
  }
  const results = await Promise.all([pushIndexNow(urls), pushBaidu(urls)]);
  // IndexNow 失败视为脚本失败；百度未配置(null)不算失败
  if (results[0] === false || results[1] === false) process.exit(1);
})().catch((e) => {
  console.error("推送失败:", e.message);
  process.exit(1);
});
