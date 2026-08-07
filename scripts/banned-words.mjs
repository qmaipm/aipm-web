#!/usr/bin/env node
/**
 * 全站禁用词检查器 — SEO-GEO-STRATEGY.md §3 / SKILL.md §0 的自动化版本。
 *
 * 为什么要单独一个脚本:
 * cases-lint.mjs 里也有一份 BANNED,但它只扫 app/(site)/cases/ 一个目录。
 * 结果是禁用词在案例板块被卡住,在其余几十个页面里活得很好 ——
 * 2026-08-06 清理时实测:「留痕」22 处、「闭环」66 处、「赋能」12 处,
 * 全都在案例目录之外。规则不覆盖的地方,等于没有规则。
 *
 * 注释里的禁用词不算违规:禁用词的目的是不让用户读到这些词,而注释永远不会被
 * 用户读到。案例页 cases.ts 里就有一段注释在说明「留痕」为什么被删掉 ——
 * 如果检查器逼着把它删了,规则就把自己的理由一起删了。
 * 但注释仍然会列出来(标「注释」),否则「藏进注释」就成了绕过规则的后门。
 *
 * 用法:
 *   node scripts/banned-words.mjs           # 全站,对外文案有命中即非零退出(可挂 CI)
 *   node scripts/banned-words.mjs --list    # 只列清单,总是 0 退出(用于盘点)
 *   node scripts/banned-words.mjs <路径>    # 只查某个目录/文件
 */

import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();

/* SEO-GEO-STRATEGY.md §3 的九个词 + 各自的替换建议(照抄那份表,不自创) */
const BANNED = {
  留痕: "有记录、全程有记录",
  管控: "管理、管住",
  门控: "先经人批准",
  流程门控: "先经人批准",
  控制层: "按具体语义改写,如「审批环节」",
  收口: "统一在一个地方",
  赋能: "帮助、支持、让……能够",
  抓手: "切入点、着力处",
  闭环: "全流程、从头到尾",
  拉通: "打通、连起来",
};

/* 禁用词是子串匹配,会误伤正常中文:
   「验收口径」含「收口」、「开关控制」含「管控」的情况都有。
   例外必须是**真的正常中文**,不能拿它给禁用词开后门。 */
const SAFE = ["验收口径", "验收口令", "闭环境", "封闭环境"];

/* 只查会被用户读到的文本载体。.md 里的策略文档本身要写这些词(禁用词表、
   替换建议),所以默认不查 docs/ 与 skills/ —— 那两处是「讨论这些词」,不是「使用这些词」。 */
const EXTS = new Set([".tsx", ".ts", ".jsx", ".js", ".css"]);
const SKIP_DIR = new Set(["node_modules", ".next", ".git", "docs", "skills", "public", "tmp"]);

/* 默认扫描范围:所有承载对外文案的目录。
   只扫 app/ 是不够的 —— components/Navbar.tsx、lib/nav.ts 里的导航文案
   同样是用户第一眼读到的字。scripts/ 也扫,因为规则文件自己也可能夹带口径。 */
const DEFAULT_TARGETS = ["app", "components", "lib", "scripts"];

const argv = process.argv.slice(2);
const listOnly = argv.includes("--list");
const explicit = argv.filter((a) => !a.startsWith("--"));
const targets = explicit.length ? explicit : DEFAULT_TARGETS;

/* 这两个文件里的禁用词就是规则表本身(BANNED 的键),不是文案。
   检查器不该把自己的规则表当成违规。 */
const SKIP_FILE = new Set(["scripts/banned-words.mjs", "scripts/cases-lint.mjs"]);

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.isDirectory()) {
      if (SKIP_DIR.has(e.name)) continue;
      walk(path.join(dir, e.name), out);
    } else if (EXTS.has(path.extname(e.name))) {
      const p = path.join(dir, e.name);
      if (!SKIP_FILE.has(path.relative(ROOT, p))) out.push(p);
    }
  }
  return out;
}

const files = [];
for (const t of targets) {
  const abs = path.resolve(ROOT, t);
  if (!fs.existsSync(abs)) continue;
  if (fs.statSync(abs).isDirectory()) walk(abs, files);
  else if (!SKIP_FILE.has(path.relative(ROOT, abs))) files.push(abs);
}

/**
 * 判断某个位置是否落在注释里。
 * 只需要区分「用户会读到」和「只有我们会读到」,不需要完整的语法解析:
 * 逐行跟踪 /* *\/ 块状态,再看命中位置是否在本行 // 之后。
 */
function commentMask(lines) {
  const mask = []; // 每行:一个布尔数组,标记该列是否在注释内
  let inBlock = false;
  for (const raw of lines) {
    const flags = new Array(raw.length).fill(false);
    let i = 0;
    let lineComment = false;
    while (i < raw.length) {
      if (inBlock) {
        flags[i] = true;
        if (raw.startsWith("*/", i)) { flags[i + 1] = true; inBlock = false; i += 2; continue; }
        i += 1; continue;
      }
      if (lineComment) { flags[i] = true; i += 1; continue; }
      if (raw.startsWith("/*", i)) { inBlock = true; continue; }
      if (raw.startsWith("//", i)) { lineComment = true; continue; }
      i += 1;
    }
    mask.push(flags);
  }
  return mask;
}

/* 命中记录:按「词」聚合,便于一次看清一个词散落在哪些页面 */
const hits = new Map(); // word -> [{file, line, text, inComment}]

for (const f of files) {
  const src = fs.readFileSync(f, "utf8");
  const lines = src.split("\n");
  const mask = commentMask(lines);
  lines.forEach((raw, i) => {
    // 先挖掉安全词组,再匹配禁用词,避免误报
    let line = raw;
    for (const s of SAFE) line = line.split(s).join("·".repeat(s.length));
    for (const word of Object.keys(BANNED)) {
      let at = line.indexOf(word);
      while (at !== -1) {
        if (!hits.has(word)) hits.set(word, []);
        hits.get(word).push({
          file: path.relative(ROOT, f),
          line: i + 1,
          text: raw.trim().slice(0, 110),
          inComment: Boolean(mask[i]?.[at]),
        });
        at = line.indexOf(word, at + word.length);
      }
    }
  });
}

const all = [...hits.values()].flat();
const copyTotal = all.filter((h) => !h.inComment).length;
const commentTotal = all.length - copyTotal;

if (all.length === 0) {
  console.log(`✓ 禁用词检查通过 — 扫描 ${files.length} 个文件,0 处命中`);
  process.exit(0);
}

console.log(
  `\n禁用词:对外文案 ${copyTotal} 处` +
    (commentTotal ? `,注释 ${commentTotal} 处(仅提示)` : "") +
    `(扫描 ${files.length} 个文件)\n`,
);

/* 先列对外文案(要改的),再列注释(只提示),不要混在一起 */
for (const bucket of [false, true]) {
  const rows = [...hits]
    .map(([word, list]) => [word, list.filter((h) => h.inComment === bucket)])
    .filter(([, list]) => list.length)
    .sort((a, b) => b[1].length - a[1].length);
  if (!rows.length) continue;
  console.log(bucket ? "—— 以下在注释里,不算违规,仅供核对 ——\n" : "—— 以下是对外文案,必须改 ——\n");
  for (const [word, list] of rows) {
    console.log(`■ 「${word}」${list.length} 处   → 建议改为:${BANNED[word]}`);
    for (const h of list) console.log(`    ${h.file}:${h.line}  ${h.text}`);
    console.log("");
  }
}

if (listOnly) {
  console.log("(--list 模式:只盘点,不作为失败)");
  process.exit(0);
}
if (copyTotal === 0) {
  console.log("✓ 对外文案 0 处命中(上面的命中都在注释里)");
  process.exit(0);
}
console.log("这些词在任何对外物料里一律禁用。改完再提交。");
process.exit(1);
