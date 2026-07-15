"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Hero 右侧「AI 正在处理真实工作」动态工作流 —— 智能客服与报修工单闭环。
 * 三层结构：背景（楼宇语境 SVG）/ 中间（8 节点流程轨）/ 前景（FMClaw™ 工单 Agent 卡片）。
 * 降级策略（硬性）：
 *  - SSR 初始 state = 终态（step 7 · 已关闭）——无 JS / 爬虫 / reduced-motion 均看到完整静态结果；
 *  - 挂载后若允许动效，从 0 开始循环：每步 ~1.9s × 8 步 + 终态停留 3.5s ≈ 18.7s/圈；
 *  - 离屏暂停（IntersectionObserver），不做粒子/位图，纯 DOM+SVG+CSS 过渡。
 */

const STEPS = [
  "接收消息", "理解诉求", "查询资料", "判断等级",
  "创建工单", "自动派发", "跟踪处理", "验收关闭",
];

const STATUS: string[] = [
  "正在理解", "正在理解", "正在查询", "正在判断",
  "正在创建工单", "已派发 · 工程人员已接单", "处理中", "已关闭",
];

const STEP_MS = 1900;
const HOLD_MS = 3500;

export default function HeroWorkflow() {
  const [step, setStep] = useState(7); // SSR 终态兜底
  const ref = useRef<HTMLDivElement>(null);
  const playing = useRef(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    if (!el) return;

    let timer: ReturnType<typeof setTimeout> | null = null;
    const loop = (s: number) => {
      setStep(s);
      const next = s >= 7 ? 0 : s + 1;
      timer = setTimeout(() => loop(next), s >= 7 ? HOLD_MS : STEP_MS);
    };
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !playing.current) {
          playing.current = true;
          loop(0);
        } else if (!e.isIntersecting && playing.current) {
          playing.current = false;
          if (timer) clearTimeout(timer);
          setStep(7); // 离屏回终态，避免回来时半截状态
        }
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (timer) clearTimeout(timer);
    };
  }, []);

  const st = (n: number) => (step >= n ? " on" : "");

  return (
    <div className="hw" ref={ref} role="img"
      aria-label="FMClaw 服务工单 Agent 演示：业主在服务群报修漏水，AI 理解诉求、查询资料、判断等级、创建工单、派发工程人员并跟踪到验收关闭">
      {/* 背景层 · 楼宇语境 */}
      <svg className="hw-bg" viewBox="0 0 520 380" aria-hidden="true" preserveAspectRatio="xMidYMax slice">
        <g className="hw-bldg">
          {/* A 座 */}
          <rect x="40" y="150" width="120" height="230" rx="4" />
          <text x="100" y="190" textAnchor="middle" className="hw-bldg-t">A 座</text>
          {/* B 座（高） */}
          <rect x="200" y="70" width="140" height="310" rx="4" />
          <text x="270" y="112" textAnchor="middle" className="hw-bldg-t">B 座</text>
          {/* B座楼层线 */}
          {Array.from({ length: 9 }).map((_, i) => (
            <line key={i} x1="206" y1={140 + i * 26} x2="334" y2={140 + i * 26} className="hw-floor" />
          ))}
          {/* 附楼 */}
          <rect x="380" y="220" width="100" height="160" rx="4" />
        </g>
        {/* 18F 标记 */}
        <g className={`hw-mark${st(0)}`}>
          <rect x="206" y="140" width="128" height="26" rx="3" />
          <text x="270" y="158" textAnchor="middle">B座 18F · 茶水间</text>
        </g>
        {/* 工程班组位置 */}
        <g className={`hw-crew${st(5)}`}>
          <circle cx="430" cy="205" r="5" />
          <text x="430" y="192" textAnchor="middle">工程维修班组</text>
          {/* 派单路径 */}
          <path className="hw-route" d="M418 210 C 380 240, 330 210, 296 168" />
        </g>
      </svg>

      {/* 业主消息（企业微信服务群） */}
      <div className={`hw-msg${st(0)}`}>
        <div className="hw-msg-head">
          <span className="hw-msg-av" aria-hidden="true">业</span>
          <span className="hw-msg-src">企业微信 · 服务群</span>
          <span className="hw-msg-time">09:42</span>
        </div>
        <p className="hw-msg-body">B座18楼茶水间一直漏水，地面已经积水了，麻烦尽快处理一下。</p>
        <div className="hw-msg-img" aria-hidden="true">
          <svg width="13" height="13" viewBox="0 0 16 16"><rect x="1.5" y="2.5" width="13" height="11" rx="2" fill="none" stroke="currentColor" strokeWidth="1.4"/><circle cx="5.5" cy="6.5" r="1.3" fill="currentColor"/><path d="M2.5 12l3.5-3.5 2.5 2.5 3-3.5 2 2.5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/></svg>
          现场照片
        </div>
      </div>

      {/* 中间层 · 8 节点流程轨 */}
      <div className="hw-rail" aria-hidden="true">
        <div className="hw-rail-line"><i style={{ width: `${((step + 1) / 8) * 100}%` }} /></div>
        <ol className="hw-nodes">
          {STEPS.map((s, i) => (
            <li key={s} className={`hw-node${st(i)}${step === i ? " now" : ""}`}>
              <span className="hw-dot" />
              <span className="hw-nlab">{s}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* 前景层 · FMClaw™ 工单 Agent 卡片 */}
      <div className="hw-card">
        <div className="hw-card-head">
          <span className="hw-card-logo" aria-hidden="true">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M3 21V8L12 3L21 8V21H15V15H9V21H3Z" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round"/><circle cx="12" cy="11" r="1.6" fill="currentColor"/></svg>
          </span>
          <span className="hw-card-name">FMClaw™ 服务工单 Agent</span>
          <span className={`hw-status${step >= 7 ? " ok" : ""}`}>
            <i className="hw-status-dot" />{STATUS[step]}
          </span>
        </div>

        <div className="hw-ev">事件 · B座18楼茶水间漏水</div>

        <dl className="hw-fields">
          <div className={`hw-f${st(1)}`}><dt>事件类型</dt><dd>给排水报修</dd></div>
          <div className={`hw-f${st(1)}`}><dt>现场情况</dt><dd>地面积水</dd></div>
          <div className={`hw-f${st(2)}`}><dt>位置资料</dt><dd>B座 18F · 同类报修 2 次</dd></div>
          <div className={`hw-f${st(2)}`}><dt>建议班组</dt><dd>工程维修</dd></div>
          <div className={`hw-f${st(3)}`}><dt>风险等级</dt><dd className="hi">较高</dd></div>
          <div className={`hw-f${st(3)}`}><dt>响应时限</dt><dd className="hi">10 分钟</dd></div>
        </dl>

        <p className={`hw-judge${st(3)}`}>
          检测到「持续漏水」和「地面积水」，建议提高优先级并立即派发工程人员。
        </p>

        <div className={`hw-ticket${st(4)}`}>
          <svg width="13" height="13" viewBox="0 0 16 16" aria-hidden="true"><path d="M2.5 8.5L6 12l7.5-8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          {step >= 7 ? "业主确认完成 · 工单已关闭" : step >= 6 ? "工程人员处理中 · 全程跟踪" : step >= 5 ? "已派发 · 工程人员已接单" : "结构化工单已创建"}
        </div>
      </div>

      <p className="hw-cap">传统客服负责回答，FMClaw™ 负责把事情推进到完成。</p>
    </div>
  );
}
