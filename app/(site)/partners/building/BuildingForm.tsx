"use client";

import { useState } from "react";

const Arrow = ({ s = 15 }: { s?: number }) => (
  <svg className="ar" width={s} height={s} viewBox="0 0 16 16">
    <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

type Status = "idle" | "sending" | "ok" | "error";

export default function BuildingForm() {
  const [company, setCompany] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [message, setMessage] = useState("");

  const [status, setStatus] = useState<Status>("idle");
  const [err, setErr] = useState("");

  function validate(): string | null {
    if (!company.trim()) return "请填写公司 / 单位。";
    if (!name.trim()) return "请填写你的姓名。";
    if (!phone.trim()) return "请填写手机号。";
    return null;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const v = validate();
    if (v) {
      setErr(v);
      return;
    }
    setErr("");
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          page: "智能体园区伙伴 · 白皮书索取",
          fields: [
            { label: "公司 / 单位", value: company },
            { label: "姓名", value: name },
            { label: "职务", value: role },
            { label: "手机号", value: phone },
            { label: "所在城市", value: city },
            { label: "近期项目情况", value: message },
          ],
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        setStatus("ok");
      } else {
        setErr(data.error || "提交失败，请稍后再试。");
        setStatus("error");
      }
    } catch {
      setErr("网络好像不太顺畅，请稍后再试。");
      setStatus("error");
    }
  }

  if (status === "ok") {
    return (
      <div className="form form-done" role="status" aria-live="polite">
        <div className="form-done-mark" aria-hidden="true">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
        </div>
        <h3 className="form-done-h">登记成功！</h3>
        <p className="form-done-p">我们已经收到你的信息，会尽快把白皮书发送给你。如果你在留言里提到了近期项目，会有熟悉招投标的同事直接联系你。</p>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={onSubmit} noValidate>
      <div className="field-row">
        <div className="field"><label>公司 / 单位<span className="req">*</span></label><input type="text" required placeholder="你所在的公司或单位" value={company} onChange={(e) => setCompany(e.target.value)} /></div>
        <div className="field"><label>姓名<span className="req">*</span></label><input type="text" required placeholder="怎么称呼你" value={name} onChange={(e) => setName(e.target.value)} /></div>
      </div>
      <div className="field-row">
        <div className="field"><label>职务</label><input type="text" value={role} onChange={(e) => setRole(e.target.value)} /></div>
        <div className="field"><label>手机号<span className="req">*</span></label><input type="tel" required placeholder="方便我们尽快联系你" value={phone} onChange={(e) => setPhone(e.target.value)} /></div>
      </div>
      <div className="field"><label>所在城市</label><input type="text" placeholder="你主要开展业务的城市" value={city} onChange={(e) => setCity(e.target.value)} /></div>
      <div className="field"><label>近期项目情况</label><textarea placeholder="可以简单说说：手头有没有在跟的项目、招标文件里出现了哪些 AI 要求。" value={message} onChange={(e) => setMessage(e.target.value)}></textarea></div>
      {err && <p className="form-err" role="alert">{err}</p>}
      <button className="btn btn-primary" type="submit" disabled={status === "sending"}>
        {status === "sending" ? "提交中…" : <>登记并索取白皮书 <Arrow /></>}
      </button>
      <p className="bd-note">提交即表示同意我们就白皮书发送与合作事宜与你联系。我们不会用于其它用途。</p>
    </form>
  );
}
