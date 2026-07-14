"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { companyTypes, pathOptions, projectStages } from "./content";

const Arrow = ({ s = 15 }: { s?: number }) => (
  <svg className="ar" width={s} height={s} viewBox="0 0 16 16">
    <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

type Status = "idle" | "sending" | "ok" | "error";
type Tab = "apply" | "guide" | "project";

/* 转化埋点：项目现有分析工具为百度统计（_hmt）。
   事件：partner_apply_click/submit、partner_guide_click/submit、partner_project_click/submit。
   TODO: 如后续接入 GA4/其它工具，在 track() 内补充对应上报。 */
declare global {
  interface Window {
    _hmt?: unknown[][];
  }
}
function track(action: string, label = "") {
  if (typeof window === "undefined") return;
  window._hmt = window._hmt || [];
  window._hmt.push(["_trackEvent", "partner_program", action, `${location.pathname}|${label}`]);
}

type Field = { label: string; value: string };

async function submit(page: string, fields: Field[]): Promise<{ ok: boolean; error?: string }> {
  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ page, fields }),
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok && data.ok) return { ok: true };
    return { ok: false, error: data.error || "提交失败，请稍后再试。" };
  } catch {
    return { ok: false, error: "网络好像不太顺畅，请稍后再试。" };
  }
}

function Done({ title, body }: { title: string; body: string }) {
  return (
    <div className="form form-done" role="status" aria-live="polite">
      <div className="form-done-mark" aria-hidden="true">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
      </div>
      <h3 className="form-done-h">{title}</h3>
      <p className="form-done-p">{body}</p>
    </div>
  );
}

function Consent({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="pg-consent">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      <span>
        我已阅读并同意<Link href="/legal/privacy" target="_blank">隐私政策</Link>，同意启盟就伙伴合作事宜与我联系。
      </span>
    </label>
  );
}

/* ---------- 伙伴申请表单（完整） ---------- */
function ApplyForm() {
  const [v, setV] = useState({
    company: "", contact: "", role: "", phone: "", city: "", ctype: "",
    hasProject: "", email: "", website: "", industry: "", salesTeam: "",
    techTeam: "", refProject: "", stage: "", wants: "",
  });
  const [chosenPaths, setChosenPaths] = useState<string[]>([]);
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [err, setErr] = useState("");

  const set = (k: keyof typeof v) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setV({ ...v, [k]: e.target.value });

  function togglePath(p: string) {
    setChosenPaths((cur) => (cur.includes(p) ? cur.filter((x) => x !== p) : [...cur, p]));
  }

  function validate(): string | null {
    if (!v.company.trim()) return "请填写公司名称。";
    if (!v.contact.trim()) return "请填写联系人。";
    if (!v.role.trim()) return "请填写职务。";
    if (!v.phone.trim()) return "请填写手机号码。";
    if (!v.city.trim()) return "请填写所在城市。";
    if (!v.ctype) return "请选择企业类型。";
    if (chosenPaths.length === 0) return "请选择意向合作路径（可多选）。";
    if (!v.hasProject) return "请选择是否有正在推进的客户项目。";
    if (!consent) return "请阅读并同意隐私政策。";
    return null;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "sending") return;
    const bad = validate();
    if (bad) { setErr(bad); return; }
    setErr("");
    setStatus("sending");
    const r = await submit("行业智能体伙伴计划 · 伙伴申请", [
      { label: "公司名称", value: v.company },
      { label: "联系人", value: v.contact },
      { label: "职务", value: v.role },
      { label: "手机号码", value: v.phone },
      { label: "所在城市", value: v.city },
      { label: "企业类型", value: v.ctype },
      { label: "意向合作路径", value: chosenPaths.join("、") },
      { label: "是否有正在推进的客户项目", value: v.hasProject },
      { label: "企业邮箱", value: v.email },
      { label: "官网", value: v.website },
      { label: "主要行业", value: v.industry },
      { label: "销售团队人数", value: v.salesTeam },
      { label: "技术团队人数", value: v.techTeam },
      { label: "代表性项目", value: v.refProject },
      { label: "当前项目阶段", value: v.stage },
      { label: "希望获得的支持", value: v.wants },
    ]);
    if (r.ok) {
      track("partner_apply_submit", `paths=${chosenPaths.join(",")}|hasProject=${v.hasProject}`);
      setStatus("ok");
    } else {
      setErr(r.error || "提交失败，请稍后再试。");
      setStatus("error");
    }
  }

  if (status === "ok") {
    return <Done title="申请已提交" body="我们会核验企业信息和业务匹配度，并与你沟通合作路径。审核结果和后续安排会通过你留下的联系方式反馈。" />;
  }

  return (
    <form className="form" onSubmit={onSubmit} noValidate>
      <div className="field-row">
        <div className="field"><label>公司名称<span className="req">*</span></label><input type="text" required value={v.company} onChange={set("company")} /></div>
        <div className="field"><label>联系人<span className="req">*</span></label><input type="text" required value={v.contact} onChange={set("contact")} /></div>
      </div>
      <div className="field-row">
        <div className="field"><label>职务<span className="req">*</span></label><input type="text" required value={v.role} onChange={set("role")} /></div>
        <div className="field"><label>手机号码<span className="req">*</span></label><input type="tel" required value={v.phone} onChange={set("phone")} /></div>
      </div>
      <div className="field-row">
        <div className="field"><label>所在城市<span className="req">*</span></label><input type="text" required value={v.city} onChange={set("city")} /></div>
        <div className="field">
          <label>企业类型<span className="req">*</span></label>
          <select required value={v.ctype} onChange={set("ctype")}>
            <option value="">请选择</option>
            {companyTypes.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
      </div>
      <fieldset className="pg-checks">
        <legend>意向合作路径（可多选）<span className="req">*</span></legend>
        <div className="pg-checks-row">
          {pathOptions.map((p) => (
            <label key={p} className={chosenPaths.includes(p) ? "on" : ""}>
              <input type="checkbox" checked={chosenPaths.includes(p)} onChange={() => togglePath(p)} />
              {p}
            </label>
          ))}
        </div>
      </fieldset>
      <fieldset className="pg-checks">
        <legend>是否有正在推进的客户项目<span className="req">*</span></legend>
        <div className="pg-checks-row">
          {["有", "暂无"].map((p) => (
            <label key={p} className={v.hasProject === p ? "on" : ""}>
              <input type="radio" name="hasProject" checked={v.hasProject === p} onChange={() => setV({ ...v, hasProject: p })} />
              {p}
            </label>
          ))}
        </div>
      </fieldset>

      <details className="pg-more">
        <summary>补充信息（选填）</summary>
        <div className="field-row">
          <div className="field"><label>企业邮箱</label><input type="email" value={v.email} onChange={set("email")} /></div>
          <div className="field"><label>官网</label><input type="url" placeholder="https://" value={v.website} onChange={set("website")} /></div>
        </div>
        <div className="field-row">
          <div className="field"><label>主要行业</label><input type="text" value={v.industry} onChange={set("industry")} /></div>
          <div className="field">
            <label>当前项目阶段</label>
            <select value={v.stage} onChange={set("stage")}>
              <option value="">请选择</option>
              {projectStages.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>
        <div className="field-row">
          <div className="field"><label>销售团队人数</label><input type="text" inputMode="numeric" value={v.salesTeam} onChange={set("salesTeam")} /></div>
          <div className="field"><label>技术团队人数</label><input type="text" inputMode="numeric" value={v.techTeam} onChange={set("techTeam")} /></div>
        </div>
        <div className="field"><label>代表性项目</label><input type="text" placeholder="可简要说明 1–2 个代表性项目" value={v.refProject} onChange={set("refProject")} /></div>
        <div className="field"><label>希望获得的支持</label><textarea value={v.wants} onChange={set("wants")}></textarea></div>
      </details>

      <Consent checked={consent} onChange={setConsent} />
      {err && <p className="form-err" role="alert">{err}</p>}
      <button className="btn btn-primary" type="submit" disabled={status === "sending"}>
        {status === "sending" ? "提交中…" : <>提交伙伴申请 <Arrow /></>}
      </button>
      <p className="pg-fnote">伙伴申请免费。提交信息仅用于伙伴资格审核与合作沟通，不会用于其它用途。</p>
    </form>
  );
}

/* ---------- 手册申请表单（精简） ---------- */
function GuideForm() {
  const [v, setV] = useState({ company: "", name: "", contact: "", ctype: "", path: "" });
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [err, setErr] = useState("");

  const set = (k: keyof typeof v) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setV({ ...v, [k]: e.target.value });

  function validate(): string | null {
    if (!v.company.trim()) return "请填写公司名称。";
    if (!v.name.trim()) return "请填写姓名。";
    if (!v.contact.trim()) return "请填写手机或企业邮箱。";
    if (!v.ctype) return "请选择企业类型。";
    if (!v.path) return "请选择意向合作路径。";
    if (!consent) return "请阅读并同意隐私政策。";
    return null;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "sending") return;
    const bad = validate();
    if (bad) { setErr(bad); return; }
    setErr("");
    setStatus("sending");
    const r = await submit("行业智能体伙伴计划 · 手册申请", [
      { label: "公司名称", value: v.company },
      { label: "姓名", value: v.name },
      { label: "手机或企业邮箱", value: v.contact },
      { label: "企业类型", value: v.ctype },
      { label: "意向合作路径", value: v.path },
    ]);
    if (r.ok) {
      track("partner_guide_submit", `path=${v.path}`);
      setStatus("ok");
    } else {
      setErr(r.error || "提交失败，请稍后再试。");
      setStatus("error");
    }
  }

  if (status === "ok") {
    /* TODO: 手册 PDF 尚未上线，暂不提供下载链接，按提示词要求以核验后发送的方式反馈 */
    return <Done title="申请已提交" body="我们将在完成基本信息核验后发送伙伴计划手册。" />;
  }

  return (
    <form className="form" onSubmit={onSubmit} noValidate>
      <div className="field-row">
        <div className="field"><label>公司名称<span className="req">*</span></label><input type="text" required value={v.company} onChange={set("company")} /></div>
        <div className="field"><label>姓名<span className="req">*</span></label><input type="text" required value={v.name} onChange={set("name")} /></div>
      </div>
      <div className="field"><label>手机或企业邮箱<span className="req">*</span></label><input type="text" required value={v.contact} onChange={set("contact")} /></div>
      <div className="field-row">
        <div className="field">
          <label>企业类型<span className="req">*</span></label>
          <select required value={v.ctype} onChange={set("ctype")}>
            <option value="">请选择</option>
            {companyTypes.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div className="field">
          <label>意向合作路径<span className="req">*</span></label>
          <select required value={v.path} onChange={set("path")}>
            <option value="">请选择</option>
            {pathOptions.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
      </div>
      <Consent checked={consent} onChange={setConsent} />
      {err && <p className="form-err" role="alert">{err}</p>}
      <button className="btn btn-primary" type="submit" disabled={status === "sending"}>
        {status === "sending" ? "提交中…" : <>获取《启盟行业智能体伙伴计划手册1.0》 <Arrow /></>}
      </button>
      <p className="pg-fnote">提交信息仅用于手册发送与合作沟通，不会用于其它用途。</p>
    </form>
  );
}

/* ---------- 脱敏项目需求表单 ---------- */
function ProjectForm() {
  const [v, setV] = useState({ company: "", name: "", phone: "", stage: "", detail: "" });
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [err, setErr] = useState("");

  const set = (k: keyof typeof v) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setV({ ...v, [k]: e.target.value });

  function validate(): string | null {
    if (!v.company.trim()) return "请填写公司名称。";
    if (!v.name.trim()) return "请填写姓名。";
    if (!v.phone.trim()) return "请填写手机号码。";
    if (!v.detail.trim()) return "请填写脱敏后的项目情况。";
    if (!consent) return "请阅读并同意隐私政策。";
    return null;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "sending") return;
    const bad = validate();
    if (bad) { setErr(bad); return; }
    setErr("");
    setStatus("sending");
    const r = await submit("行业智能体伙伴计划 · 脱敏项目需求", [
      { label: "公司名称", value: v.company },
      { label: "姓名", value: v.name },
      { label: "手机号码", value: v.phone },
      { label: "当前项目阶段", value: v.stage },
      { label: "脱敏项目情况", value: v.detail },
    ]);
    if (r.ok) {
      track("partner_project_submit", `stage=${v.stage}`);
      setStatus("ok");
    } else {
      setErr(r.error || "提交失败，请稍后再试。");
      setStatus("error");
    }
  }

  if (status === "ok") {
    return <Done title="项目需求已提交" body="我们会先判断FMClaw™是否适合该项目，并在3个工作日内与你沟通评估结论和合作方式。" />;
  }

  return (
    <form className="form" onSubmit={onSubmit} noValidate>
      <div className="field-row">
        <div className="field"><label>公司名称<span className="req">*</span></label><input type="text" required value={v.company} onChange={set("company")} /></div>
        <div className="field"><label>姓名<span className="req">*</span></label><input type="text" required value={v.name} onChange={set("name")} /></div>
      </div>
      <div className="field-row">
        <div className="field"><label>手机号码<span className="req">*</span></label><input type="tel" required value={v.phone} onChange={set("phone")} /></div>
        <div className="field">
          <label>当前项目阶段</label>
          <select value={v.stage} onChange={set("stage")}>
            <option value="">请选择</option>
            {projectStages.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>
      <div className="field">
        <label>脱敏项目情况<span className="req">*</span></label>
        <textarea required placeholder="请去除客户名称等敏感信息，说明项目类型、规模和大致技术要求。可直接粘贴一段脱敏的招标要求。" value={v.detail} onChange={set("detail")}></textarea>
      </div>
      <Consent checked={consent} onChange={setConsent} />
      {err && <p className="form-err" role="alert">{err}</p>}
      <button className="btn btn-primary" type="submit" disabled={status === "sending"}>
        {status === "sending" ? "提交中…" : <>提交脱敏项目需求 <Arrow /></>}
      </button>
      <p className="pg-fnote">提交信息仅用于项目评估与合作沟通，不会用于其它用途。</p>
    </form>
  );
}

/* ---------- 三合一表单区（Tab 切换） ---------- */
export default function ProgramForms() {
  const [tab, setTab] = useState<Tab>("apply");

  /* 首屏 CTA 以 #apply/#guide/#project 锚点进入时，同步切换到对应 Tab */
  useEffect(() => {
    function syncFromHash() {
      const h = window.location.hash.replace("#", "");
      if (h === "apply" || h === "guide" || h === "project") setTab(h as Tab);
    }
    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, []);

  function switchTab(t: Tab) {
    setTab(t);
    if (t === "apply") track("partner_apply_click", "form_tab");
    if (t === "guide") track("partner_guide_click", "form_tab");
    if (t === "project") track("partner_project_click", "form_tab");
  }

  return (
    <div className="pg-forms" id="apply">
      <div className="pg-tabs" role="tablist" aria-label="伙伴计划表单入口">
        <button role="tab" aria-selected={tab === "apply"} className={tab === "apply" ? "on" : ""} onClick={() => switchTab("apply")}>
          申请成为伙伴
        </button>
        <button role="tab" aria-selected={tab === "guide"} className={tab === "guide" ? "on" : ""} onClick={() => switchTab("guide")} id="guide">
          获取伙伴计划手册1.0
        </button>
        <button role="tab" aria-selected={tab === "project"} className={tab === "project" ? "on" : ""} onClick={() => switchTab("project")} id="project">
          已有项目？提交脱敏项目需求
        </button>
      </div>
      <div className="pg-tabpanel" role="tabpanel">
        {tab === "apply" && <ApplyForm />}
        {tab === "guide" && <GuideForm />}
        {tab === "project" && <ProjectForm />}
      </div>
    </div>
  );
}
