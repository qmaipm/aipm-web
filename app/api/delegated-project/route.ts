import { NextResponse } from "next/server";
import { createHash } from "node:crypto";
import { intakeEnabled, notifyIntake, parseIntake, saveIntake } from "@/lib/project-intake";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
const headers = { "Cache-Control": "no-store", "X-Robots-Tag": "noindex, nofollow" };
const answer = (data: object, status = 200) => NextResponse.json(data, { status, headers });
// A local backstop, not a replacement for reverse-proxy rate limiting in multi-instance deployments.
const buckets = new Map<string, { count: number; until: number }>();
function limited(key: string) {
  const now = Date.now();
  for (const [k, b] of buckets) if (b.until <= now) buckets.delete(k);
  const b = buckets.get(key);
  if (b) { b.count++; return b.count > 5; }
  if (buckets.size >= 10000) return true;
  buckets.set(key, { count: 1, until: now + 600000 }); return false;
}
export async function POST(req: Request) {
  if (!intakeEnabled()) return answer({ ok: false, error: "在线报备暂未开放，请通过伙伴页的联系方式沟通。" }, 503);
  const origin = req.headers.get("origin");
  const allowed = [new URL(req.url).origin, process.env.SITE_URL].filter(Boolean);
  if (!origin || !allowed.includes(origin)) return answer({ ok: false, error: "请求来源不正确。" }, 403);
  if (!req.headers.get("content-type")?.startsWith("application/json")) return answer({ ok: false, error: "请使用项目报备表提交。" }, 415);
  if (Number(req.headers.get("content-length") || 0) > 32768) return answer({ ok: false, error: "提交内容过长。" }, 413);
  let value: unknown;
  try {
    const reader = req.body?.getReader();
    if (!reader) throw new Error();
    const chunks: Uint8Array[] = []; let size = 0;
    while (true) {
      const { done, value: chunk } = await reader.read();
      if (done) break;
      size += chunk.byteLength;
      if (size > 32768) { await reader.cancel(); return answer({ ok: false, error: "提交内容过长。" }, 413); }
      chunks.push(chunk);
    }
    value = JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch { return answer({ ok: false, error: "提交格式不正确。" }, 400); }
  let intake;
  try { intake = parseIntake(value); }
  catch (error) { return answer({ ok: false, error: (error as Error).message }, 400); }
  // Hash contact information instead of retaining plaintext in the throttling map.
  const throttleKey = createHash("sha256").update(intake.phone.replace(/\D/g, "")).digest("hex");
  if (limited(throttleKey)) return answer({ ok: false, error: "提交较频繁，请十分钟后重试或联系受理人。" }, 429);
  try {
    const { record } = await saveIntake(intake);
    const notified = await notifyIntake(record);
    return answer({ ok: true, receipt: record.receipt, status: "submitted", notification: notified ? "sent" : "pending" }, 202);
  } catch (error) {
    if ((error as Error).message === "REQUEST_ID_CONFLICT") return answer({ ok: false, error: "本次提交内容已变更，请重新发起报备。" }, 409);
    console.error("[project-intake] private persistence failed");
    return answer({ ok: false, error: "资料未能保存，请稍后重试。本次尚未形成报备。" }, 503);
  }
}
