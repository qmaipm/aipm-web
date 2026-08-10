#!/usr/bin/env node
/**
 * 搜索引擎 URL 主动推送脚本（SEO 自动化）
 *
 * 覆盖两个有合规推送通道的引擎：
 *   1. IndexNow —— Bing（同时分发给 Yandex/Seznam/Naver 等成员引擎）。
 *      key 为自生成，对应站点根目录下的 /<key>.txt 验证文件（public/ 内）。
 *   2. 百度普通收录 API —— 需要 BAIDU_PUSH_TOKEN 环境变量
 *      （百度搜索资源平台 → 普通收录 → API 提交 页面获取；
 *      也可写在 .env.local，脚本会自动读取）。
 *      未配置时自动跳过，不影响 IndexNow。
 *
 *      百度每日配额有限（当前 10 条/天），且批量超出剩余配额会被整批拒绝
 *      （"over quota"）。因此百度通道每次只挑选一小批：未推送过的优先、
 *      按页面重要性排序；超配额时自动折半缩批重试（被拒的请求不消耗配额）。
 *      推送记录存于 scripts/.baidu-pushed.json，全部推完后按最久未推的轮换。
 *
 * Google 无需也无法脚本推送：sitemap ping 已于 2023-06 废弃，
 * Indexing API 仅限招聘/直播类页面。Google 依赖 robots.txt 中的
 * sitemap 声明 + Search Console 后台提交（一次性手动操作）。
 *
 * 用法：
 *   node scripts/submit-urls.mjs                  # 推送 sitemap 中全部 URL
 *   node scripts/submit-urls.mjs /partners /news  # 只推送指定路径
 *   node scripts/submit-urls.mjs --only=baidu     # 只走百度通道
 *   node scripts/submit-urls.mjs --only=indexnow  # 只走 IndexNow 通道
 *   BAIDU_PUSH_TOKEN=xxx node scripts/submit-urls.mjs
 *   DRY_RUN=1 node scripts/submit-urls.mjs        # 只收集不推送，验证 URL 列表
 *
 * 两个通道节奏不同，用 --only 分开跑（见 .github/workflows/）：
 *   百度是配额制的「请收录」，每天推同一批也正常，适合每日定时消耗配额；
 *   IndexNow 的语义是「这个 URL 变了，请重抓」，每天全量重推没变过的页面
 *   会降低 Bing 对本站提交信号的信任度，因此只在发布后触发一次。
 */

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const SITE_URL = (process.env.SITE_URL || "https://www.aipm.cn").replace(/\/$/, "");
const HOST = new URL(SITE_URL).host;
const INDEXNOW_KEY = "174ba57cd2f99c8154daec1ab1c8f82c"; // 对应 public/<key>.txt
const BAIDU_TOKEN = process.env.BAIDU_PUSH_TOKEN || readEnvLocal("BAIDU_PUSH_TOKEN");
const BAIDU_BATCH = Number(process.env.BAIDU_BATCH) || 10; // 每次尝试的最大条数 = 每日配额
const DRY_RUN = process.env.DRY_RUN === "1";
const STATE_FILE = fileURLToPath(new URL("./.baidu-pushed.json", import.meta.url));

// 标志位与路径参数分开：collectUrls() 会把非标志参数当成要推送的路径
const ARGV = process.argv.slice(2);
const PATH_ARGS = ARGV.filter((a) => !a.startsWith("--"));
const ONLY = ARGV.find((a) => a.startsWith("--only="))?.slice("--only=".length).toLowerCase() ?? "";
if (ONLY && ONLY !== "baidu" && ONLY !== "indexnow") {
  console.error(`未知的 --only=${ONLY}（可选值：baidu、indexnow）`);
  process.exit(1);
}

/* ---------- 小工具 ---------- */
function readEnvLocal(key) {
  try {
    const env = readFileSync(fileURLToPath(new URL("../.env.local", import.meta.url)), "utf8");
    const m = env.match(new RegExp(`^${key}=(.*)$`, "m"));
    return m ? m[1].trim().replace(/^["']|["']$/g, "") : "";
  } catch {
    return "";
  }
}

function loadState() {
  try {
    return JSON.parse(readFileSync(STATE_FILE, "utf8"));
  } catch {
    return {}; // { url: 最近一次推送成功的 ISO 时间 }
  }
}

// 页面重要性:首页 > 栏目页 > 案例/洞察/新闻正文 > 其他内页 > 法务页
function rank(url) {
  const p = new URL(url).pathname.replace(/\/$/, "") || "/";
  if (p === "/") return 0;
  if (p.startsWith("/legal/")) return 9;
  if (p.split("/").filter(Boolean).length === 1) return 1;
  if (/^\/(cases|insights|news)\//.test(p)) return 2;
  return 3;
}

/* ---------- 收集要推送的 URL ---------- */
async function collectUrls() {
  if (PATH_ARGS.length > 0) {
    // 手动指定路径
    return PATH_ARGS.map((p) => (p.startsWith("http") ? p : `${SITE_URL}${p.startsWith("/") ? p : "/" + p}`));
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

  // 挑选本次要推的 URL:没推过的在前，其次按页面重要性，再按最久未推
  const state = loadState();
  const candidates = [...urls].sort((a, b) => {
    const pushedA = state[a] ? 1 : 0;
    const pushedB = state[b] ? 1 : 0;
    if (pushedA !== pushedB) return pushedA - pushedB;
    if (rank(a) !== rank(b)) return rank(a) - rank(b);
    return (state[a] || "").localeCompare(state[b] || "");
  });
  const unpushed = candidates.filter((u) => !state[u]).length;
  console.log(`[百度] 待推 ${candidates.length} 条（其中 ${unpushed} 条从未推送过）`);

  const endpoint = `http://data.zz.baidu.com/urls?site=${SITE_URL}&token=${BAIDU_TOKEN}`;
  // 超出剩余配额的批量会被整批拒绝且不消耗配额，所以从大到小折半重试
  let size = Math.min(BAIDU_BATCH, candidates.length);
  while (size >= 1) {
    const batch = candidates.slice(0, size);
    if (DRY_RUN) {
      batch.forEach((u) => console.log("  [百度候选] " + u));
      console.log("[百度] DRY_RUN — 未实际推送");
      return null;
    }
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: batch.join("\n"),
    });
    const body = await res.json().catch(() => ({}));
    if (body.success !== undefined) {
      // 剔除百度判为无效的 URL，其余记入推送档案
      const rejected = new Set([...(body.not_same_site || []), ...(body.not_valid || [])]);
      const now = new Date().toISOString();
      batch.filter((u) => !rejected.has(u)).forEach((u) => (state[u] = now));
      writeFileSync(STATE_FILE, JSON.stringify(state, null, 2) + "\n");
      console.log(
        `[百度] ✓ 成功 ${body.success} 条，今日剩余配额 ${body.remain ?? "?"}` +
          (rejected.size ? `，无效 ${rejected.size} 条` : "") +
          `；档案累计 ${Object.keys(state).length}/${urls.length} 条`
      );
      return true;
    }
    if (body.message === "over quota") {
      size = Math.floor(size / 2);
      if (size >= 1) console.log(`[百度] 配额不足，缩批到 ${size} 条重试…`);
      continue;
    }
    console.log(`[百度] ✗ HTTP ${res.status} — ${JSON.stringify(body)}`);
    return false;
  }
  console.log("[百度] ⏭ 今日配额已用尽，明天再跑即可（不算失败）");
  return null;
}

/* ---------- 主流程 ---------- */
(async () => {
  console.log(`站点: ${SITE_URL}${ONLY ? `（仅 ${ONLY} 通道）` : ""}`);
  const urls = await collectUrls();
  console.log(`待推送 URL: ${urls.length} 条`);
  const wantIndexNow = ONLY !== "baidu";
  const wantBaidu = ONLY !== "indexnow";
  if (DRY_RUN) {
    urls.forEach((u) => console.log("  " + u));
    if (wantIndexNow) console.log("[DRY_RUN] IndexNow 未推送");
    if (wantBaidu) {
      console.log("[DRY_RUN] 百度本次将选中的批次如下:");
      await pushBaidu(urls);
    }
    return;
  }
  const [indexNowOk, baiduOk] = await Promise.all([
    wantIndexNow ? pushIndexNow(urls) : null,
    wantBaidu ? pushBaidu(urls) : null,
  ]);
  // 任一通道明确失败即脚本失败；未启用/未配置/配额用尽(null)不算失败
  if (indexNowOk === false || baiduOk === false) process.exit(1);
})().catch((e) => {
  console.error("推送失败:", e.message);
  process.exit(1);
});
