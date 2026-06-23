import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

type Field = { label: string; value: string };
type Payload = { page?: string; fields?: Field[] };

function bad(error: string, status = 400) {
  return NextResponse.json({ ok: false, error }, { status });
}

export async function POST(req: Request) {
  let body: Payload;
  try {
    body = (await req.json()) as Payload;
  } catch {
    return bad("请求格式有误。");
  }

  const page = typeof body.page === "string" ? body.page.trim() : "";
  const fields = Array.isArray(body.fields) ? body.fields : null;

  if (!page) return bad("缺少页面名称。");
  if (!fields || fields.length === 0) return bad("缺少提交内容。");

  // 规范化字段，过滤掉非法项
  const clean: Field[] = fields
    .filter(
      (f): f is Field =>
        f != null &&
        typeof f.label === "string" &&
        typeof f.value === "string"
    )
    .map((f) => ({ label: f.label.trim(), value: f.value.trim() }));

  // 服务端必填校验：至少要有一个非空字段值
  const hasContent = clean.some((f) => f.value.length > 0);
  if (!hasContent) return bad("提交内容为空。");

  const {
    SMTP_HOST = "smtp.qiye.aliyun.com",
    SMTP_PORT = "465",
    SMTP_USER,
    SMTP_PASS,
    MAIL_TO,
    MAIL_CC,
  } = process.env;

  if (!SMTP_USER || !SMTP_PASS || !MAIL_TO) {
    console.error("[contact] 邮件配置缺失：请检查 SMTP_USER / SMTP_PASS / MAIL_TO 环境变量。");
    return bad("邮件服务未配置，请稍后再试。", 500);
  }

  const port = Number(SMTP_PORT) || 465;
  const secure = port === 465;

  const lines = clean.map((f) => `${f.label}：${f.value || "（未填写）"}`);
  const text = lines.join("\n");
  const html = `<div style="font-size:14px;line-height:1.8;color:#17160F">
    <p style="margin:0 0 12px"><strong>来自官网「${escapeHtml(page)}」的用户咨询</strong></p>
    ${clean
      .map(
        (f) =>
          `<p style="margin:0 0 6px"><strong>${escapeHtml(f.label)}：</strong>${escapeHtml(
            f.value || "（未填写）"
          )}</p>`
      )
      .join("")}
  </div>`;

  try {
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port,
      secure,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    await transporter.sendMail({
      from: SMTP_USER,
      to: MAIL_TO,
      cc: MAIL_CC || undefined,
      subject: `官网用户咨询-${page}`,
      text,
      html,
    });
  } catch (err) {
    console.error("[contact] 邮件发送失败：", err);
    return bad("邮件发送失败，请稍后再试。", 502);
  }

  return NextResponse.json({ ok: true });
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
