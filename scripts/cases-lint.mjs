#!/usr/bin/env node
/**
 * 客户案例页文案体检器 — docs/CASES-AUDIT-2026-07-25.md 第四部分写作规范的自动化版本。
 *
 * 用法：node scripts/cases-lint.mjs            # 全部案例
 *       node scripts/cases-lint.mjs <slug>     # 单个案例
 *
 * 检查项（硬上限）：
 *   正文 ≤900 字 / 单句 ≤60 字 / 破折号 ≤2 / 「不是…而是…」≤1
 *   禁用词零出现 / 同一数字全页 ≤3 次 / AI 首次出场在正文前 15%
 *   必须有 CaseFit,且 unfit 不为空(读者的「我这儿成立吗」要当场被回答;
 *   只写适用不写不适用,案例集会被当成战报折价阅读)
 *   监管机关名称零出现(公安/司法/警方…—— 官网写这些经不起审计,
 *   一律降级成「外部核查」这类中性口径;用户口径 2026-07-27)
 *   CaseFriction 可选,但一旦出现就必须三段齐全且每段 ≤80 字
 */
import fs from "node:fs";
import path from "node:path";

const CASES_DIR = path.join(process.cwd(), "app", "(site)", "cases");

const LIMITS = {
  body: 900,       // 正文字数（不含 FAQ / CaseWins）
  sentence: 60,    // 单句字数绝对上限
  dash: 2,         // 破折号 —— 每篇
  contrast: 1,     // 「不是…而是…」每篇
  winItem: 30,     // CaseWins 单条字数
  winCount: 4,     // CaseWins 条数
  aiFirst: 0.15,   // AI/FMClaw 首次出场位置（占正文比例）
  numRepeat: 3,    // 同一数字全页出现次数
  fitItem: 3,      // CaseFit 每栏条数上限(超过就不是判断,是清单)
  frSeg: 80,       // CaseFriction 单段字数上限(写长就变公关稿)
};

// SEO-GEO-STRATEGY.md §3 禁用词
const BANNED = ["留痕", "管控", "门控", "控制层", "收口", "赋能", "抓手", "闭环", "拉通"];
/* 禁用词是子串匹配,会误伤正常词:「验收口径」里含「收口」、「验收标准」里含「收标」。
   这里先把确定无害的词组挖掉再查,避免为了过 lint 去改本来正确的中文。
   新增例外必须是**真的正常中文**,不能用它给禁用词开后门。 */
const BANNED_SAFE = ["验收口径", "验收口令"];

/* 监管机关与执法主体一律不写进对外物料(用户口径 2026-07-27)。
   即使案例里客户确实每月接受某机关核查,官网也只写「外部核查」「第三方核查」——
   点名机关既拉高审计风险,也把客户置于不必要的曝光下。这条没有例外。 */
const BANNED_REGULATOR = ["公安", "司法", "警方", "派出所", "执法", "检察", "法院"];
const AI_TOKENS = ["FMClaw", "AI ", "AI，", "AI。", "智能体", "Agent", "机器人", "系统"];

const strip = (s) =>
  s
    .replace(/<Link[^>]*>/g, "")
    .replace(/<\/Link>/g, "")
    .replace(/<[^>]+>/g, "")
    .replace(/\{[^}]*\}/g, "")
    .replace(/\s+/g, "")
    .trim();

/**
 * 按「读者的实际阅读顺序」抽出可读文案。
 * 顺序很重要：AI 首次出场位置要按读者真正读到的先后算，
 * 所以 CaseWins（在正文之上）与正文段落必须在同一条流里按源码位置排序。
 */
function extract(src) {
  const stream = []; // {i, kind, text}
  const push = (i, kind, text) => { const t = strip(text); if (t) stream.push({ i, kind, text: t }); };

  for (const m of src.matchAll(/<p>([\s\S]*?)<\/p>/g)) push(m.index, "para", m[1]);

  for (const block of src.matchAll(/<CaseWins items=\{\[([\s\S]*?)\]\}/g))
    for (const m of block[1].matchAll(/["'`]([\s\S]*?)["'`]\s*,/g)) push(block.index + m.index, "win", m[1]);

  for (const block of src.matchAll(/<Case(?:Flow steps|Points items)=\{\[([\s\S]*?)\]\}/g))
    for (const m of block[1].matchAll(/[kd]:\s*["'`]([\s\S]*?)["'`]/g)) push(block.index + m.index, "struct", m[1]);

  // CaseCompare:表头 label/head 与每一行的 k/before/after 都算可读文案,
  // 否则对比表会变成禁用词与数字重复检查的盲区。
  for (const block of src.matchAll(/<CaseCompare([\s\S]*?)\/>/g))
    for (const m of block[1].matchAll(/(?:label|k|before|after)=?:?\s*["'`]([\s\S]*?)["'`]/g))
      push(block.index + m.index, "struct", m[1]);

  // CaseFit:适用/不适用/接入方式的文案也要过禁用词与半角标点检查。
  for (const block of src.matchAll(/<CaseFit([\s\S]*?)\/>/g))
    for (const m of block[1].matchAll(/["'`]([^"'`]{4,})["'`]/g)) push(block.index + m.index, "fit", m[1]);

  // CaseFriction:摩擦叙事同样是正文,必须一起过禁用词、监管词与句长检查。
  for (const block of src.matchAll(/<CaseFriction([\s\S]*?)\/>/g))
    for (const m of block[1].matchAll(/["'`]([^"'`]{4,})["'`]/g)) push(block.index + m.index, "fr", m[1]);

  // CaseFig:图注(caption)与 alt 都是对外文案,同样要过禁用词与监管词。
  // 图注常被当成"顺手写的说明"而漏检,恰恰是最容易夹带旧口径的地方。
  for (const block of src.matchAll(/<CaseFig([\s\S]*?)\/>/g))
    for (const m of block[1].matchAll(/(?:alt|caption)="([^"]{4,})"/g))
      push(block.index + m.index, "fig", m[1]);

  for (const m of src.matchAll(/<CaseNote[^>]*>([\s\S]*?)<\/CaseNote>/g)) push(m.index, "note", m[1]);
  for (const m of src.matchAll(/<CaseQuote[^>]*>([\s\S]*?)<\/CaseQuote>/g)) push(m.index, "quote", m[1]);

  stream.sort((a, b) => a.i - b.i);
  const of = (k) => stream.filter((s) => s.kind === k).map((s) => s.text);
  return {
    paras: of("para"),
    wins: of("win"),
    struct: of("struct"),
    fit: of("fit"),
    fr: of("fr"),
    fig: of("fig"),
    noteTexts: of("note"),
    quote: of("quote").join(""),
    reading: stream.map((s) => s.text).join(""),
  };
}

function sentences(text) {
  return text.split(/(?<=[。！？])/).map((s) => s.trim()).filter((s) => s.length > 1);
}

const slugArg = process.argv[2];
const slugs = fs
  .readdirSync(CASES_DIR, { withFileTypes: true })
  .filter((d) => d.isDirectory() && fs.existsSync(path.join(CASES_DIR, d.name, "page.tsx")))
  .map((d) => d.name)
  .filter((s) => !slugArg || s === slugArg)
  .sort();

let fail = 0;
const rows = [];

/* cases.ts 单独查一遍监管机关词:标题、summary、seoTitle、metaDescription、FAQ
   都住在注册表里,而不是各案例的 page.tsx。这些字段直接进搜索结果和 AI 引用,
   漏查等于把风险最高的位置留成盲区。 */
{
  const reg = fs.readFileSync(path.join(CASES_DIR, "cases.ts"), "utf8");
  const hits = BANNED_REGULATOR.filter((w) => reg.includes(w));
  if (hits.length) {
    fail++;
    console.log(`\n✗ cases.ts（注册表：标题 / SEO / FAQ）`);
    for (const w of hits) console.log(`   监管机关名称「${w}」不得出现在对外文案，改用「外部核查」`);
  }
}

for (const slug of slugs) {
  const src = fs.readFileSync(path.join(CASES_DIR, slug, "page.tsx"), "utf8");
  const { paras, wins, struct, fit, fr, fig, noteTexts, quote, reading } = extract(src);
  const body = paras.join("");
  const all = [...paras, ...wins, ...struct, ...fit, ...fr, ...fig, ...noteTexts, quote].join("");
  const errs = [];

  /* 过程中的摩擦:不强制每篇都有(没有真实素材就不许编),
     但写了就必须三段齐全——只写「起初以为」不写「后来怎么过的」,
     等于把读者留在焦虑里,比不写更糟。 */
  const frBlock = src.match(/<CaseFriction([\s\S]*?)\/>/);
  if (frBlock) {
    for (const f of ["title", "expected", "actual", "resolution"])
      if (!new RegExp(`${f}=`).test(frBlock[1])) errs.push(`CaseFriction 缺 ${f}`);
    const fat = fr.filter((t) => t.length > LIMITS.frSeg);
    if (fat.length)
      errs.push(`CaseFriction 单段超 ${LIMITS.frSeg} 字 ${fat.length} 处（最长 ${Math.max(...fat.map((t) => t.length))}），写长就成公关稿`);
  }

  // 适用性判断:必须存在,且必须写「不适用」。
  const fitBlock = src.match(/<CaseFit([\s\S]*?)\/>/);
  if (!fitBlock) {
    errs.push("缺少 <CaseFit>：读者读完结果会问「我这儿成立吗」，必须当场回答");
  } else {
    const arr = (name) => {
      const m = fitBlock[1].match(new RegExp(`${name}=\\{\\[([\\s\\S]*?)\\]\\}`));
      return m ? [...m[1].matchAll(/["'`]([^"'`]+)["'`]/g)].map((x) => x[1]) : [];
    };
    const yes = arr("fit");
    const no = arr("unfit");
    if (!yes.length) errs.push("CaseFit 缺 fit（适用条件）");
    if (!no.length) errs.push("CaseFit 缺 unfit：只写适用不写不适用，等于一份战报");
    for (const [n, list] of [["fit", yes], ["unfit", no]])
      if (list.length > LIMITS.fitItem)
        errs.push(`CaseFit ${n} ${list.length} 条 > ${LIMITS.fitItem}，条数一多就从判断退化成清单`);
  }

  // 篇幅
  if (body.length > LIMITS.body) errs.push(`正文 ${body.length} 字 > ${LIMITS.body}`);

  // 句长
  const sents = paras.flatMap(sentences);
  const longs = sents.filter((s) => s.length > LIMITS.sentence);
  if (longs.length) {
    errs.push(`超长句 ${longs.length} 句（最长 ${Math.max(...longs.map((s) => s.length))} 字）`);
    for (const s of longs.slice(0, 3)) errs.push(`  └ ${s.slice(0, 46)}…`);
  }

  // 破折号 / 修正式句型
  const dash = (all.match(/——/g) || []).length;
  if (dash > LIMITS.dash) errs.push(`破折号 ${dash} > ${LIMITS.dash}`);
  const contrast = (all.match(/不是[^。！？]{0,30}?而是/g) || []).length;
  if (contrast > LIMITS.contrast) errs.push(`「不是…而是…」${contrast} > ${LIMITS.contrast}`);

  // 禁用词(先剔除无害词组,见 BANNED_SAFE)
  let scan = all;
  for (const s of BANNED_SAFE) scan = scan.split(s).join("");
  for (const w of BANNED) if (scan.includes(w)) errs.push(`禁用词「${w}」`);
  // 监管机关名称:含 SEO 字段一起查,seoTitle/metaDescription 会直接进搜索结果,
  // 风险比正文更高,不能只扫正文。
  for (const w of BANNED_REGULATOR)
    if (all.includes(w)) errs.push(`监管机关名称「${w}」不得出现在对外文案，改用「外部核查」`);

  // 半角标点（代码之外的中文正文里不应出现）
  const halfw = (all.match(/[a-zA-Z\u4e00-\u9fa5],|[\u4e00-\u9fa5]:/g) || []).length;
  if (halfw) errs.push(`半角标点 ${halfw} 处`);

  // CaseWins
  if (wins.length > LIMITS.winCount) errs.push(`CaseWins ${wins.length} 条 > ${LIMITS.winCount}`);
  const fatWins = wins.filter((w) => w.length > LIMITS.winItem);
  if (fatWins.length) errs.push(`CaseWins 超 ${LIMITS.winItem} 字 ${fatWins.length} 条（最长 ${Math.max(...fatWins.map((w) => w.length))}）`);

  // AI 出场位置（按读者实际阅读顺序，含 CaseWins / CaseFlow）
  const idx = AI_TOKENS.map((t) => reading.indexOf(t)).filter((i) => i >= 0);
  const aiPos = idx.length ? Math.min(...idx) / reading.length : 1;
  if (aiPos > LIMITS.aiFirst) errs.push(`AI 首次出场在全文 ${(aiPos * 100).toFixed(0)}% > ${LIMITS.aiFirst * 100}%`);

  // 数字重复
  const nums = {};
  for (const m of all.matchAll(/\d[\d,.]*\s*(?:%|次|人|个|家|项|台|分钟|小时|万㎡|㎡)?/g)) {
    const k = m[0].trim();
    if (k.length < 2) continue;
    nums[k] = (nums[k] || 0) + 1;
  }
  const hot = Object.entries(nums).filter(([, n]) => n > LIMITS.numRepeat);
  if (hot.length) errs.push(`数字重复超 ${LIMITS.numRepeat} 次：${hot.map(([k, n]) => `${k}×${n}`).join("、")}`);

  rows.push({ slug, body: body.length, sents: sents.length, max: sents.length ? Math.max(...sents.map((s) => s.length)) : 0, dash, ai: `${(aiPos * 100).toFixed(0)}%`, ok: errs.length === 0 });
  if (errs.length) {
    fail++;
    console.log(`\n✗ ${slug}`);
    for (const e of errs) console.log(`   ${e}`);
  }
}

console.log("\n slug".padEnd(44) + "正文".padStart(6) + "句数".padStart(6) + "最长".padStart(6) + "破折".padStart(6) + "AI".padStart(7));
for (const r of rows) {
  console.log(
    `${r.ok ? " ✓" : " ✗"} ${r.slug}`.padEnd(44) +
      String(r.body).padStart(6) + String(r.sents).padStart(6) + String(r.max).padStart(6) +
      String(r.dash).padStart(6) + String(r.ai).padStart(7)
  );
}
console.log(`\n${rows.length - fail}/${rows.length} 通过`);
process.exit(fail ? 1 : 0);
