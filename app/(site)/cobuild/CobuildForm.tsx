"use client";

import { useState } from "react";

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

type Status = "idle" | "sending" | "ok" | "error";

export default function CobuildForm() {
  const [org, setOrg] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [status, setStatus] = useState<Status>("idle");
  const [err, setErr] = useState("");

  function validate(): string | null {
    if (!org.trim()) return "请填写单位名称。";
    if (!name.trim()) return "请填写你的姓名。";
    if (!phone.trim()) return "请填写电话。";
    if (email.trim() && !isEmail(email.trim())) return "邮箱格式好像不太对，请检查一下。";
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
          page: "政企共建",
          fields: [
            { label: "单位", value: org },
            { label: "姓名", value: name },
            { label: "职务", value: role },
            { label: "电话", value: phone },
            { label: "邮箱", value: email },
            { label: "留言", value: message },
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
      <div className="form form-done" role="status" aria-live="polite" style={{ marginTop: "44px" }}>
        <div className="form-done-mark" aria-hidden="true">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
        </div>
        <h3 className="form-done-h">提交成功！</h3>
        <p className="form-done-p">我们已经收到你的信息，后续会有专人尽快与你联系，带着方案当面来谈。感谢贵区的信任，我们很期待这次合作。</p>
      </div>
    );
  }

  return (
    <form className="form reveal in" style={{ marginTop: "44px" }} onSubmit={onSubmit} noValidate>
      <div className="field-row">
        <div className="field"><label>单位<span className="req">*</span></label><input type="text" required value={org} onChange={(e) => setOrg(e.target.value)} /></div>
        <div className="field"><label>姓名<span className="req">*</span></label><input type="text" required value={name} onChange={(e) => setName(e.target.value)} /></div>
      </div>
      <div className="field-row">
        <div className="field"><label>职务</label><input type="text" value={role} onChange={(e) => setRole(e.target.value)} /></div>
        <div className="field"><label>电话<span className="req">*</span></label><input type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} /></div>
      </div>
      <div className="field"><label>邮箱</label><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} /></div>
      <div className="field"><label>留言</label><textarea placeholder="可简单说明来意,例如所在辖区与希望对接的方向。" value={message} onChange={(e) => setMessage(e.target.value)}></textarea></div>
      {err && <p className="form-err" role="alert">{err}</p>}
      <button className="btn btn-primary" type="submit" style={{ marginTop: "6px" }} disabled={status === "sending"}>
        {status === "sending" ? "提交中…" : <>提交联系方式 <svg className="ar" width="15" height="15" viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg></>}
      </button>
    </form>
  );
}
