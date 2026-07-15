"use client";

import { useEffect, useRef, useState } from "react";

/**
 * 数据护城河 · 4 个大数。
 * SSR 修复：初始 state 即为终值 —— 服务端 HTML、无 JS、爬虫、reduced-motion
 * 均直接看到真实数字，绝不出现 0。动画仅作为挂载后的视觉增强（从 0 补间到终值）。
 * 数字口径：现有已确认数据，未新造。TODO(待业务方核验)：定期复核四项数值与口径说明。
 */
export default function MoatStats() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className="moat-row reveal" ref={ref}>
      <CountStat inView={inView} target={100} suffix="家" label="企业客户" plus />
      <CountStat inView={inView} target={3000} suffix="万㎡" label="全业态在管面积" />
      <CountStat inView={inView} target={10} suffix="万+" label="传感器实时在线" />
      <LiveStat inView={inView} label="数据持续沉淀" />
    </div>
  );
}

function reduced() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function CountStat({ inView, target, suffix, label, plus }: { inView: boolean; target: number; suffix: string; label: string; plus?: boolean }) {
  // SSR/无JS/爬虫直接渲染终值；动画只在挂载后作为增强。
  const [val, setVal] = useState(target);
  const [done, setDone] = useState(true);

  useEffect(() => {
    if (!inView) return;
    if (reduced()) {
      setVal(target);
      setDone(true);
      return;
    }
    setDone(false);
    let raf = 0;
    let start = 0;
    const dur = 1700;
    const tick = (now: number) => {
      if (!start) start = now;
      const t = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(target * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
      else {
        setVal(target);
        setDone(true);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target]);

  return (
    <div className="mstat">
      <span className="mstat-n">
        {/* 封顶后追加 “+”(如 100+),只在累加结束时显示,避免动画途中闪烁 */}
        {Math.round(val)}
        {plus && done ? "+" : ""}
        <small>{suffix}</small>
      </span>
      <span className="mstat-k">{label}</span>
    </div>
  );
}

const MOAT_MAX = 400_000_000; // 最大值 4 亿条,封顶后保持

function LiveStat({ inView, label }: { inView: boolean; label: string }) {
  const [val, setVal] = useState(360_000_000); // 起步 3.6 亿
  const cur = useRef(360_000_000);

  useEffect(() => {
    if (!inView) return;
    if (reduced()) {
      setVal(MOAT_MAX);
      return;
    }
    let raf = 0;
    let last = 0;
    const tick = (now: number) => {
      if (now - last > 130) {
        last = now;
        // 持续累加 ~25–45 万条/次,直到封顶 4 亿
        cur.current = Math.min(cur.current + Math.floor(Math.random() * 200_000 + 250_000), MOAT_MAX);
        setVal(cur.current);
        if (cur.current >= MOAT_MAX) return; // 到顶即停
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView]);

  return (
    <div className="mstat">
      <span className="mstat-n">
        {(val / 1e8).toFixed(2)}
        <small>亿 · 条/天</small>
      </span>
      <span className="mstat-k">{label}</span>
    </div>
  );
}
