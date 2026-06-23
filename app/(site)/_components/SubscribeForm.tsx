"use client";

import { useState } from "react";

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

type Status = "idle" | "sending" | "ok" | "error";

type Props = {
  /** 提交按钮文案，默认「订阅」 */
  label?: string;
  /** 是否在按钮上显示箭头图标 */
  arrow?: boolean;
  /** 按钮风格类，默认 btn-primary */
  btnVariant?: string;
  /** 输入框 placeholder */
  placeholder?: string;
};

export default function SubscribeForm({
  label = "订阅",
  arrow = false,
  btnVariant = "btn-primary",
  placeholder = "你的邮箱",
}: Props) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [err, setErr] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const v = email.trim();
    if (!v) {
      setErr("请填写邮箱。");
      return;
    }
    if (!isEmail(v)) {
      setErr("邮箱格式好像不太对，请检查一下。");
      return;
    }
    setErr("");
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          page: "Insights 订阅",
          fields: [{ label: "邮箱", value: v }],
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        setStatus("ok");
      } else {
        setErr(data.error || "订阅失败，请稍后再试。");
        setStatus("error");
      }
    } catch {
      setErr("网络好像不太顺畅，请稍后再试。");
      setStatus("error");
    }
  }

  if (status === "ok") {
    return (
      <p className="sub-done" role="status" aria-live="polite">
        订阅成功！谢谢你愿意一直读下去——有新文章，我们会第一时间提醒你。
      </p>
    );
  }

  return (
    <>
      <form className="subform" onSubmit={onSubmit} noValidate>
        <input
          type="email"
          placeholder={placeholder}
          aria-label="邮箱"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className={`btn ${btnVariant}`} type="submit" disabled={status === "sending"}>
          {status === "sending" ? "提交中…" : (
            <>
              {label}
              {arrow && (
                <svg className="ar" width="14" height="14" viewBox="0 0 16 16">
                  <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </>
          )}
        </button>
      </form>
      {err && <p className="form-err" role="alert">{err}</p>}
    </>
  );
}
