import { NextResponse } from "next/server";
import { createHash } from "node:crypto";
import nodemailer from "nodemailer";
import { CHOICES, GRADES, ROLES, POLICY, scoreProject, estimateReturns, validateAssessment, money, percent, EMPTY_ASSESSMENT, type Assessment, type Role } from "@/lib/delegated-policy";
import { PROJECT_CHOICES, COOPERATION_DIRECTIONS } from "@/lib/delegated-presentation";

// 委托管理项目测算通知（2026-10-29）：访客在测算页填写后，即使不点报备，也把填写内容和测算结果发邮件给受理人。
// 不收集联系方式；评级与得分由服务端重新计算，不信任客户端结果。收件人与 /api/contact 相同（MAIL_TO / MAIL_CC）。
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
const headers = { "Cache-Control": "no-store", "X-Robots-Tag": "noindex, nofollow" };
const answer = (data: object, status = 200) => NextResponse.json(data, { status, headers });

const TRIGGERS: Record<string, string> = {
  view: "点了「查看合作方向」",
  report_start: "进入「提交报备」步骤",
  contact: "点了「沟通合作需求」",
  leave: "离开或切走页面（未提交报备）",
};

// 单实例兜底限流：每个来源 10 分钟最多 12 封。
const buckets = new Map<string, { count: number; until: number }>();
function limited(key: string) {
  const now = Date.now();
  for (const [k, b] of buckets) if (b.until <= now) buckets.delete(k);
  const b = buckets.get(key);
  if (b) { b.count++; return b.count > 12; }
  if (buckets.size >= 10000) return true;
  buckets.set(key, { count: 1, until: now + 600000 });
  return false;
}

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const num = (n: number) => n.toLocaleString("zh-CN", { maximumFractionDigits: 2 });

export async function POST(req: Request) {
  const origin = req.headers.get("origin");
  // 同站校验：接受本机地址、SITE_URL，以及反向代理转发的 Host（避免代理后 req.url 与浏览器地址不一致而静默丢信）。
  const host = req.headers.get("x-forwarded-host") || req.headers.get("host");
  const proto = req.headers.get("x-forwarded-proto") || new URL(req.url).protocol.replace(":", "");
  const allowed = [new URL(req.url).origin, process.env.SITE_URL, host ? `${proto}://${host}` : null].filter(Boolean);
  if (!origin || !allowed.includes(origin)) return answer({ ok: false }, 403);
  if (!req.headers.get("content-type")?.startsWith("application/json")) return answer({ ok: false }, 415);
  let raw = "";
  try {
    raw = await req.text();
    if (raw.length > 8192) return answer({ ok: false }, 413);
  } catch { return answer({ ok: false }, 400); }
  let v: Record<string, unknown>;
  try { v = JSON.parse(raw); } catch { return answer({ ok: false }, 400); }
  if (!v || typeof v !== "object" || Array.isArray(v)) return answer({ ok: false }, 400);

  const sid = typeof v.sid === "string" && /^[A-Z0-9]{8}$/.test(v.sid) ? v.sid : null;
  const trigger = typeof v.trigger === "string" && TRIGGERS[v.trigger] ? v.trigger : null;
  if (!sid || !trigger) return answer({ ok: false }, 400);
  if (validateAssessment(v.assessment)) return answer({ ok: false }, 400);
  const src = v.assessment as Assessment;
  const a = Object.fromEntries(Object.keys(EMPTY_ASSESSMENT).map((k) => [k, src[k as keyof Assessment]])) as Assessment;
  const filled = Object.values(a).filter((x) => x !== null).length;
  if (filled === 0) return answer({ ok: false }, 400);
  const role: Role = typeof v.role === "string" && Object.hasOwn(ROLES, v.role) ? (v.role as Role) : "refer";
  const strategic = v.strategic === true;
  const optNum = (x: unknown, max: number) => (typeof x === "number" && Number.isFinite(x) && x >= 0 && x <= max ? x : null);
  const fixedWan = optNum(v.fixed, 1e8);
  const effWan = optNum(v.efficiency, 1e8);
  const months = typeof v.months === "number" && Number.isInteger(v.months) && v.months >= 1 && v.months <= POLICY.maxMonths ? v.months : null;
  const device = v.device === "mobile" ? "手机" : v.device === "desktop" ? "电脑" : "未知";

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || req.headers.get("x-real-ip") || "local";
  if (limited(createHash("sha256").update(ip).digest("hex"))) return answer({ ok: true, mail: "throttled" }, 202);

  const result = scoreProject(a);
  const direction = result.grade ? COOPERATION_DIRECTIONS[result.grade].label : null;
  const gradeLabel = result.grade ? GRADES[result.grade].label : "资料未填全，无法定级";

  const choice = (key: keyof typeof CHOICES) => {
    const n = a[key];
    if (n === null) return "不清楚";
    const labels: Readonly<Record<number, string>> = PROJECT_CHOICES[key].labels;
    return `${labels[n] ?? n}（${n} 分）`;
  };
  const rows: [string, string][] = [
    ["项目在哪类区域", choice("location")],
    ["交通", choice("transport")],
    ["周边配套", choice("amenities")],
    ["重点或示范价值", choice("strategy")],
    ["实际管理面积", a.area === null ? "未填" : `${num(a.area)} ㎡`],
    ["现有物业年收入", a.revenue === null ? "未填" : `${num(a.revenue / 10000)} 万元／年`],
    ["实际入住率", a.occupancy === null ? "未填" : `${num(a.occupancy)}%`],
    ["空置收入保障", choice("guarantee")],
    ["固定服务人员", a.staff === null ? "未填" : `${num(a.staff)} 人`],
    ["人员密度", result.density === null ? "—" : `${num(result.density)} 人／万㎡`],
  ];
  const scoreRows: [string, string][] = result.dimensions.map((d) => [d.label, d.score === null ? `— / ${d.max}` : `${d.score} / ${d.max}`]);
  scoreRows.push(["总分", result.total === null ? "—（资料未填全）" : `${result.total} / 100`]);
  scoreRows.push(["初评等级", gradeLabel]);
  scoreRows.push(["页面显示的合作方向", direction ?? "资料未填全，未显示合作方向"]);

  const extra: [string, string][] = [["预计伙伴角色", ROLES[role].label], ["S 战略标签", strategic ? "勾选了拟申请" : "未勾选"]];
  if (result.grade && result.grade !== "reserve" && fixedWan !== null && effWan !== null && months !== null) {
    try {
      const e = estimateReturns(result.grade, role, strategic, fixedWan * 10000, effWan * 10000, months);
      extra.push(["收益情景假设", `固定酬金 ${num(fixedWan)} 万元／年，提效酬金 ${num(effWan)} 万元／年，${months} 个月`]);
      extra.push(["页面算出的情景金额", `开业奖励 ${money(e.opening)}；固定分润 ${money(e.fixed)}（${percent(e.fixedRate)}）；提效分润 ${money(e.efficiency)}（${percent(e.efficiencyRate)}）；合计 ${money(e.total)}`]);
    } catch { /* 情景参数无效时不写 */ }
  }

  const when = new Date().toLocaleString("zh-CN", { timeZone: "Asia/Shanghai", hour12: false });
  const meta: [string, string][] = [
    ["测算编号", sid],
    ["时间", when],
    ["触发", TRIGGERS[trigger]],
    ["已填写", `${filled} / 9 项`],
    ["设备", device],
  ];
  const block = (title: string, list: [string, string][]) =>
    `<h3 style="margin:18px 0 6px;font-size:15px">${esc(title)}</h3><table style="border-collapse:collapse;font-size:14px">${list
      .map(([k, val]) => `<tr><td style="padding:4px 14px 4px 0;color:#555;white-space:nowrap;vertical-align:top">${esc(k)}</td><td style="padding:4px 0">${esc(val)}</td></tr>`)
      .join("")}</table>`;
  const html = `<div style="font-size:14px;line-height:1.7;color:#17160F">
<p style="margin:0 0 8px"><strong>官网「物业委托管理项目评估」有访客做了测算</strong></p>
<p style="margin:0;color:#555">访客未留联系方式。如果随后收到「沟通合作需求」或报备，来源页面里带同一个测算编号 ${esc(sid)}，可据此对应。</p>
${block("概况", meta)}${block("填写内容", rows)}${block("测算结果（白皮书 V" + POLICY.version + "）", scoreRows)}${block("其他选择", extra)}
</div>`;
  const text = [["概况", meta], ["填写内容", rows], ["测算结果", scoreRows], ["其他选择", extra]]
    .map(([t, list]) => `【${t}】\n` + (list as [string, string][]).map(([k, val]) => `${k}：${val}`).join("\n"))
    .join("\n\n");
  const subject = `官网项目测算-${result.grade ? gradeLabel + (result.total !== null ? ` ${result.total}分` : "") : "资料未填全"}-${a.area !== null ? num(a.area) + "㎡" : "面积未填"}-${sid}`;

  const { SMTP_HOST = "smtp.qiye.aliyun.com", SMTP_PORT = "465", SMTP_USER, SMTP_PASS, MAIL_TO, MAIL_CC } = process.env;
  if (!SMTP_USER || !SMTP_PASS || !MAIL_TO) {
    console.error(`[delegated-assessment] 邮件未配置，测算 ${sid} 未发送`);
    return answer({ ok: true, mail: "skipped" }, 202);
  }
  try {
    const port = Number(SMTP_PORT) || 465;
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST, port, secure: port === 465,
      connectionTimeout: 8000, greetingTimeout: 8000, socketTimeout: 12000,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });
    await transporter.sendMail({ from: SMTP_USER, to: MAIL_TO, cc: MAIL_CC || undefined, subject, text, html });
  } catch {
    console.error(`[delegated-assessment] 邮件发送失败：${sid}`);
    return answer({ ok: true, mail: "failed" }, 202);
  }
  return answer({ ok: true, mail: "sent" }, 202);
}
