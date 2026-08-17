"use client";

import { useEffect, useState } from "react";

const Arrow = ({ s = 15 }: { s?: number }) => (
  <svg className="ar" width={s} height={s} viewBox="0 0 16 16">
    <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

type Status = "idle" | "sending" | "ok" | "error";

// 来源渠道与需求类型的选项。这两个字段是线索归因的最小必要集(2026-08-16 GEO 周报 6.2/6.3):
// 没有它们,「哪篇稿带来哪条线索」只能靠猜。选项与运营线索登记表保持同一套词,
// 改词要两边一起改,否则对不上账。
const CHANNEL_OPTIONS = ["AI 推荐（豆包 / 文心 / 通义等）", "搜索引擎", "朋友或同行推荐", "展会 / 活动", "媒体 / 文章", "其他"];
const INTENT_OPTIONS = ["预约演示 Demo", "了解客户案例", "获取报价", "一般咨询"];

// CTA 链接用短码传意图(/contact?intent=demo),映射到中文选项预填
const INTENT_MAP: Record<string, string> = {
  demo: "预约演示 Demo",
  case: "了解客户案例",
  quote: "获取报价",
  ask: "一般咨询",
};

export default function ContactForm() {
  const [type, setType] = useState("");
  const [company, setCompany] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [channel, setChannel] = useState("");
  const [intent, setIntent] = useState("");

  const [source, setSource] = useState("");

  const [status, setStatus] = useState<Status>("idle");
  const [err, setErr] = useState("");

  // 读取 URL 参数预填：
  // /contact?type=partner|partner-guide&source=partner-program(伙伴计划,既有)
  // /contact?intent=demo|case|quote|ask&from=<来源页>(案例页/产品页 CTA,2026-08-16 起)
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const t = p.get("type");
    if (t === "partner" || t === "partner-guide") {
      setType("生态伙伴合作");
    }
    if (t === "partner-guide") {
      setMessage((m) => m || "希望获取《伙伴计划手册1.0》。");
    }
    if (p.get("source") === "partner-program") {
      setSource("启盟行业智能体伙伴计划");
    }
    const it = p.get("intent");
    if (it && INTENT_MAP[it]) {
      setIntent(INTENT_MAP[it]);
      setType((v) => v || "产品咨询");
    }
    const from = p.get("from");
    if (from) {
      // from 是站内来源页标识(如 cases/restroom-quality),原样记进线索,反查用
      setSource((s) => s || from);
    }
  }, []);

  function validate(): string | null {
    if (!type) return "请选择咨询类型。";
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
          page: "联系我们",
          fields: [
            { label: "咨询类型", value: type },
            ...(intent ? [{ label: "需求类型", value: intent }] : []),
            { label: "公司 / 单位", value: company },
            { label: "姓名", value: name },
            { label: "手机号", value: phone },
            ...(channel ? [{ label: "来源渠道", value: channel }] : []),
            { label: "留言", value: message },
            ...(source ? [{ label: "来源页面", value: source }] : []),
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
      <div className="form cx-form form-done" role="status" aria-live="polite">
        <div className="form-done-mark" aria-hidden="true">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
        </div>
        <h3 className="form-done-h">提交成功！</h3>
        <p className="form-done-p">我们已经收到你的信息，后续会有专人尽快与你联系。感谢你愿意把想法交给我们，这对我们很重要。</p>
      </div>
    );
  }

  return (
    <form className="form cx-form" onSubmit={onSubmit} noValidate>
      <div className="field-row">
        <div className="field"><label>咨询类型<span className="req">*</span></label>
          <select required value={type} onChange={(e) => setType(e.target.value)}>
            <option value="" disabled>请选择</option>
            <option>产品咨询</option>
            <option>生态伙伴合作</option>
            <option>商务合作</option>
            <option>媒体采访</option>
            <option>投资交流</option>
            <option>加入我们</option>
          </select></div>
        <div className="field"><label>公司 / 单位<span className="req">*</span></label><input type="text" required placeholder="你所在的公司或单位" value={company} onChange={(e) => setCompany(e.target.value)} /></div>
      </div>
      <div className="field-row">
        <div className="field"><label>姓名<span className="req">*</span></label><input type="text" required placeholder="怎么称呼你" value={name} onChange={(e) => setName(e.target.value)} /></div>
        <div className="field"><label>手机号<span className="req">*</span></label><input type="tel" required placeholder="方便我们尽快联系你" value={phone} onChange={(e) => setPhone(e.target.value)} /></div>
      </div>
      <div className="field-row">
        <div className="field"><label>需求类型</label>
          <select value={intent} onChange={(e) => setIntent(e.target.value)}>
            <option value="">请选择（可留空）</option>
            {INTENT_OPTIONS.map((o) => <option key={o}>{o}</option>)}
          </select></div>
        <div className="field"><label>你是从哪里了解到我们的？</label>
          <select value={channel} onChange={(e) => setChannel(e.target.value)}>
            <option value="">请选择（可留空）</option>
            {CHANNEL_OPTIONS.map((o) => <option key={o}>{o}</option>)}
          </select></div>
      </div>
      <div className="field"><label>留言</label><textarea placeholder="简单说说你的需求或问题。" value={message} onChange={(e) => setMessage(e.target.value)}></textarea></div>
      {source && <p className="cf-note">来源页面：{source}</p>}
      {err && <p className="form-err" role="alert">{err}</p>}
      <button className="btn btn-primary cx-submit" type="submit" disabled={status === "sending"}>
        {status === "sending" ? "提交中…" : <>提交 <Arrow /></>}
      </button>
      <p className="cf-note">提交即表示同意我们就此次咨询与你联系。我们不会用于其它用途。</p>
    </form>
  );
}
