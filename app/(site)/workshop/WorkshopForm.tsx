"use client";

import { useEffect, useState } from "react";

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

type Status = "idle" | "sending" | "ok" | "error";

const MODES = ["还没想好，帮我判断", "Demo Day（半天–1 天）", "加速营 · Bootcamp（2–3 天）", "办一场 AI 应用创新大赛", "FDE 服务（按阶段交付）"];

// 子页链接预选：/workshop?mode=demo-day|bootcamp|competition|fde#signup
const MODE_MAP: Record<string, string> = {
  "demo-day": MODES[1],
  bootcamp: MODES[2],
  competition: MODES[3],
  fde: MODES[4],
};

export default function WorkshopForm() {
  const [company, setCompany] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [problem, setProblem] = useState("");
  const [mode, setMode] = useState(MODES[0]);
  const [time, setTime] = useState("");
  const [nda, setNda] = useState("视情况而定");

  useEffect(() => {
    const m = new URLSearchParams(window.location.search).get("mode");
    if (m && MODE_MAP[m]) setMode(MODE_MAP[m]);
  }, []);

  const [status, setStatus] = useState<Status>("idle");
  const [err, setErr] = useState("");

  function validate(): string | null {
    if (!company.trim()) return "请填写公司 / 单位。";
    if (!name.trim()) return "请填写你的姓名。";
    if (!phone.trim()) return "请填写手机号。";
    if (!problem.trim()) return "请说说你最头疼的那个业务问题。";
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
          page: "预约加速营",
          fields: [
            { label: "公司 / 单位", value: company },
            { label: "姓名", value: name },
            { label: "职务", value: role },
            { label: "手机", value: phone },
            { label: "邮箱", value: email },
            { label: "最头疼的一个业务问题", value: problem },
            { label: "感兴趣的形式", value: mode },
            { label: "期望时间", value: time },
            { label: "是否需要保密协议", value: nda },
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
        <h3 className="form-done-h">预约成功！</h3>
        <p className="form-done-p">我们已经收到你的信息，后续会有专人尽快与你联系，先看看这个问题适不适合做加速营，再和你约时间。期待和你一起把它跑通。</p>
      </div>
    );
  }

  return (
    <form className="form reveal in" style={{ marginTop: "44px" }} onSubmit={onSubmit} noValidate>
      <div className="field-row">
        <div className="field"><label>公司 / 单位<span className="req">*</span></label><input type="text" required value={company} onChange={(e) => setCompany(e.target.value)} /></div>
        <div className="field"><label>姓名<span className="req">*</span></label><input type="text" required value={name} onChange={(e) => setName(e.target.value)} /></div>
      </div>
      <div className="field-row">
        <div className="field"><label>职务</label><input type="text" value={role} onChange={(e) => setRole(e.target.value)} /></div>
        <div className="field"><label>手机<span className="req">*</span></label><input type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} /></div>
      </div>
      <div className="field"><label>邮箱</label><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} /></div>
      <div className="field"><label>你最头疼的一个业务问题<span className="req">*</span></label>
        <textarea required placeholder="说一件这个月真的让你犯难的事。" value={problem} onChange={(e) => setProblem(e.target.value)}></textarea>
        <div className="hint">200 字以内即可。这一栏决定了我们能不能帮上忙。</div>
      </div>
      <div className="field-row">
        <div className="field"><label>感兴趣的形式</label>
          <select value={mode} onChange={(e) => setMode(e.target.value)}>{MODES.map((m) => <option key={m}>{m}</option>)}</select></div>
        <div className="field"><label>期望时间</label><input type="text" placeholder="如:7 月上旬" value={time} onChange={(e) => setTime(e.target.value)} /></div>
      </div>
      <div className="field"><label>是否需要保密协议</label>
        <select value={nda} onChange={(e) => setNda(e.target.value)}><option>视情况而定</option><option>需要</option><option>不需要</option></select></div>
      {err && <p className="form-err" role="alert">{err}</p>}
      <button className="btn btn-primary" type="submit" style={{ marginTop: "6px" }} disabled={status === "sending"}>
        {status === "sending" ? "提交中…" : <>提交预约 <svg className="ar" width="15" height="15" viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg></>}
      </button>
    </form>
  );
}
