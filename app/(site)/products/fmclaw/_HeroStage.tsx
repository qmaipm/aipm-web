"use client";
// 首屏产品画面：默认静音循环播放真实产品首页（10 秒）；点「看 3 分钟演示」后，
// 同一个画框切换为带声音、带控件的完整讲解片。尊重 prefers-reduced-motion：循环片段改为静帧。
import { useEffect, useRef, useState } from "react";
import { DEMO_SRC } from "./_demo";

const EVT = "fm:play-demo";

function track(label: string) {
  try {
    const w = window as { _hmt?: unknown[][] };
    w._hmt = w._hmt || [];
    w._hmt.push(["_trackEvent", "cta", "watch-demo", label]);
  } catch {
    /* 统计是旁路 */
  }
}

/** 首屏文字区里的「看 3 分钟演示」文字按钮：只发事件，由画框负责播放。 */
export function PlayDemoLink({ label = "products/fmclaw-hero" }: { label?: string }) {
  return (
    <button
      type="button"
      className="fmv-demolink"
      onClick={() => {
        track(label);
        window.dispatchEvent(new Event(EVT));
        document.getElementById("fm-stage")?.scrollIntoView({ behavior: "smooth", block: "center" });
      }}
    >
      <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="M5 3.5v9l7.5-4.5z" fill="currentColor" /></svg>
      看 3 分钟演示
    </button>
  );
}

export default function HeroStage() {
  const ref = useRef<HTMLVideoElement>(null);
  const [demo, setDemo] = useState(false);

  useEffect(() => {
    const on = () => setDemo(true);
    window.addEventListener(EVT, on);
    return () => window.removeEventListener(EVT, on);
  }, []);

  useEffect(() => {
    if (demo) requestAnimationFrame(() => ref.current?.play().catch(() => {}));
  }, [demo]);

  return (
    <figure className={`fmv-stage${demo ? " is-demo" : ""}`} id="fm-stage">
      <div className="fmv-stage__frame">
        {demo ? (
          <video
            ref={ref}
            key="demo"
            src={DEMO_SRC}
            poster="/products/fmclaw/v2/demo-poster.webp"
            controls
            playsInline
            preload="auto"
            aria-label="AI 物业经理 3 分钟演示：项目的具象化、走进大脑、自动感知、自动总结、自动调度、自动迭代、从零开始"
          />
        ) : (
          <>
            <video
              key="loop"
              className="fmv-stage__loop"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster="/products/fmclaw/v2/hero-poster.webp"
              aria-label="FMClaw™ 真实产品首页：项目大脑与多个项目的数据关系，下方为服务、设备、数据源、视觉、环境与机器人六个感知面板"
            >
              <source src="/products/fmclaw/v2/hero-720.mp4" type="video/mp4" media="(max-width: 760px)" />
              <source src="/products/fmclaw/v2/hero-1080.mp4" type="video/mp4" />
            </video>
            <img
              className="fmv-stage__still"
              src="/products/fmclaw/v2/hero-poster.webp"
              alt="FMClaw™ 真实产品首页：项目大脑与多个项目的数据关系，下方为六个感知面板"
              width={1920}
              height={1080}
            />
            <button
              type="button"
              className="fmv-stage__play"
              onClick={() => {
                track("products/fmclaw-stage");
                setDemo(true);
              }}
            >
              <span className="fmv-stage__btn" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="18" height="18"><path d="M8 5.5v13l11-6.5z" fill="currentColor" /></svg>
              </span>
              <span>
                <b>看 3 分钟演示</b>
                <i>7 个章节 · 有声 · 中文字幕</i>
              </span>
            </button>
          </>
        )}
      </div>
      <figcaption>{demo ? "系统演示及培训引导片 · 3 分钟 · 7 个章节" : "真实产品首页 · 单个项目的实时画面"}</figcaption>
    </figure>
  );
}
