#!/usr/bin/env node
/**
 * 场景标签审计（SKILL.md §3g）。
 * 改过 CASE_TAGS 就跑这个 —— 标签是流量入口,孤儿标签会让用户白点一次。
 *
 * 门槛:
 *   1. 每个标签 >= 2 篇（孤儿标签无筛选价值）
 *   2. 标签总数是 3 的倍数（场景索引是 3 列网格,落单会出孤儿卡）
 *   3. 每篇案例 >= 2 个标签,且全部案例被覆盖（零标签案例在索引里消失）
 *   4. USE_CASE_ORDER 与 CASE_TAGS 实际用到的标签完全一致
 */
import { readFileSync } from "node:fs";

const SRC = "app/(site)/cases/cases.ts";
const src = readFileSync(SRC, "utf8");

const tagsBlock = src.slice(
  src.indexOf("CASE_TAGS: Record"),
  src.indexOf("export const USE_CASE_ORDER"),
);

const perCase = {};
const re = /"([a-z0-9-]+)":\s*\{\s*industryTag:\s*"([^"]+)",\s*useCases:\s*\[([^\]]+)\]/g;
let m;
while ((m = re.exec(tagsBlock))) {
  perCase[m[1]] = (m[3].match(/"([^"]+)"/g) || []).map((x) => x.replace(/"/g, ""));
}

const orderMatch = src.match(/USE_CASE_ORDER = \[([\s\S]*?)\] as const/);
const order = (orderMatch?.[1].match(/"([^"]+)"/g) || []).map((x) => x.replace(/"/g, ""));

const count = {};
for (const tags of Object.values(perCase)) {
  for (const t of tags) count[t] = (count[t] || 0) + 1;
}

const errors = [];
const caseCount = Object.keys(perCase).length;

for (const t of order) {
  const n = count[t] || 0;
  if (n < 2) errors.push(`标签「${t}」只挂 ${n} 篇 —— 至少要 2 篇,否则并进别的标签或写进标题`);
}
if (order.length % 3 !== 0) {
  errors.push(`标签总数 ${order.length} 不是 3 的倍数 —— 场景索引 3 列网格会出现孤儿卡`);
}
for (const [slug, tags] of Object.entries(perCase)) {
  if (tags.length < 2) errors.push(`案例「${slug}」只有 ${tags.length} 个标签 —— 至少 2 个`);
}
const missing = Object.keys(count).filter((t) => !order.includes(t));
if (missing.length) errors.push(`USE_CASE_ORDER 缺少: ${missing.join("、")}`);
const unused = order.filter((t) => !count[t]);
if (unused.length) errors.push(`USE_CASE_ORDER 多余（没有案例在用）: ${unused.join("、")}`);

const covered = new Set(
  order.flatMap((t) => Object.entries(perCase).filter(([, v]) => v.includes(t)).map(([k]) => k)),
);
if (covered.size !== caseCount) {
  const lost = Object.keys(perCase).filter((s) => !covered.has(s));
  errors.push(`有案例未被任何场景标签覆盖: ${lost.join("、")}`);
}

const width = Math.max(...order.map((t) => [...t].length)) + 2;
console.log("场景标签  篇数");
for (const t of order) {
  const n = count[t] || 0;
  console.log(`  ${t.padEnd(width - [...t].length + t.length)}  ${n}${n < 2 ? "  <-- 孤儿" : ""}`);
}
console.log(
  `\n案例 ${caseCount} · 标签 ${order.length} · 覆盖 ${covered.size}/${caseCount} · 孤儿 ${
    Object.values(count).filter((v) => v < 2).length
  }`,
);

if (errors.length) {
  console.error("\n✗ 场景标签审计未通过:");
  for (const e of errors) console.error("  · " + e);
  console.error("\n规则见 skills/aipm-site/SKILL.md §3g");
  process.exit(1);
}
console.log("\n✓ 场景标签审计通过");
