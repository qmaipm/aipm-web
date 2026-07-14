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
  const [biz, setBiz] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [message, setMessage] = useState("");

  const [status, setStatus] = useState<Status>("idle");
  const [err, setErr] = useState("");

  function validate(): string | null {
    if (!name.trim()) return "请填写你的姓名。";
    if (!company.trim()) return "请填写公司名称。";
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
          page: "智能体园区伙伴 · 项目沟通 / 参考架构索取",
          fields: [
            { label: "姓名", value: name },
            { label: "公司", value: company },
            { label: "手机", value: phone },
            { label: "所在城市", value: city },
            { label: "公司业务类型", value: biz },
            { label: "项目情况或留言", value: message },
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
        <h3 className="form-done-h">提交成功</h3>
        <p className="form-done-p">我们已收到你的信息，3 个工作日内会有熟悉招投标的同事与你联系。如果你在留言中注明了「索取参考架构」，会一并发送给你。</p>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={onSubmit} noValidate>
      <div className="field-row">
        <div className="field"><label>姓名<span className="req">*</span></label><input type="text" required placeholder="怎么称呼你" value={name} onChange={(e) => setName(e.target.value)} /></div>
        <div className="field"><label>公司<span className="req">*</span></label><input type="text" required placeholder="你所在的公司" value={company} onChange={(e) => setCompany(e.target.value)} /></div>
      </div>
      <div className="field-row">
        <div className="field"><label>手机<span className="req">*</span></label><input type="tel" required placeholder="方便我们与你联系" value={phone} onChange={(e) => setPhone(e.target.value)} /></div>
        <div className="field"><label>所在城市</label><input type="text" placeholder="你主要开展业务的城市" value={city} onChange={(e) => setCity(e.target.value)} /></div>
      </div>
      <div className="field"><label>公司业务类型</label><input type="text" placeholder="如：弱电集成 / 机电总包 / 设计咨询" value={biz} onChange={(e) => setBiz(e.target.value)} /></div>
      <div className="field"><label>项目情况或留言</label><textarea placeholder="可以粘贴一段脱敏的招标技术要求，或说明正在跟进的项目。需要《智能体园区参考架构》请在此注明。" value={message} onChange={(e) => setMessage(e.target.value)}></textarea></div>
      {err && <p className="form-err" role="alert">{err}</p>}
      <button className="btn btn-primary" type="submit" disabled={status === "sending"}>
        {status === "sending" ? "提交中…" : <>带一个项目来聊 <Arrow /></>}
      </button>
      <p className="bd-note">提交即表示同意我们就项目评估与合作事宜与你联系。我们不会用于其它用途。</p>
    </form>
  );
}
