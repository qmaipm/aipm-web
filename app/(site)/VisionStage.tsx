"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * 首页愿景段（2026-10）：全站唯一的深色重点段。
 * 滚动驱动：一座由点阵构成的「物理世界」（几栋楼的剖面），随滚动依次被三层智能点亮——
 *   01 管理：AI 智能体在楼层之间连线（网络生长）
 *   02 劳动：机器人沿楼层来回作业（亮色小块 + 短尾迹）
 *   03 感知：IoT 传感点发出扩散环
 * 左侧三章文字同步推进。单一强调色（蓝），其余为白色不同透明度。
 * 降级：窄屏 / 无 sticky 空间时，进入视口后自动播放一遍；prefers-reduced-motion 直接静态呈现终态。
 */

type Chapter = { no: string; title: string; body: ReactNode; link: ReactNode };

const ACCENT = [111, 168, 255]; // 深色底上的品牌蓝

const clamp = (v: number) => Math.max(0, Math.min(1, v));
const ease = (v: number) => v * v * (3 - 2 * v);

export default function VisionStage({
  en, zh, note, chapters, close, film,
}: {
  en: string;
  zh: ReactNode;
  note: ReactNode;
  chapters: Chapter[];
  close: ReactNode;
  film: ReactNode;
}) {
  const secRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progRef = useRef(1); // SSR / 无 JS：终态
  const [stage, setStage] = useState(4);

  useEffect(() => {
    const sec = secRef.current;
    const canvas = canvasRef.current;
    if (!sec || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const scrollMode = () => window.matchMedia("(min-width: 981px) and (min-height: 640px)").matches && !reduce;
    sec.dataset.mode = scrollMode() ? "scroll" : "auto";

    /* ---------- 场景几何 ---------- */
    let W = 0, H = 0, dpr = 1;
    type P = { x: number; y: number; t: number; f: number };
    let pts: P[] = [];
    let edges: [number, number, number][] = []; // a, b, 出现顺序 0..1（每条弧上有一个流动的光点）
    let rows: { t: number; y: number; x0: number; x1: number }[] = [];
    let sensors: number[] = [];
    let bots: { r: number; s: number; o: number }[] = [];
    let outlines: { x: number; w: number; top: number; bottom: number }[] = [];

    const build = () => {
      const r = canvas.getBoundingClientRect();
      W = r.width; H = r.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const ground = H * 0.92;
      const gap = Math.max(16, Math.min(22, W / 30));
      const fh = Math.max(18, H / 20);
      // 几栋楼：相对宽度 / 层数
      const towers = [
        { w: 0.14, n: 7 }, { w: 0.2, n: 12 }, { w: 0.12, n: 8 }, { w: 0.19, n: 15 }, { w: 0.14, n: 10 },
      ];
      const totalW = towers.reduce((s, t) => s + t.w, 0) + 0.04 * (towers.length - 1);
      let x = (1 - totalW) / 2 * W;
      pts = []; rows = []; outlines = [];
      towers.forEach((tw, ti) => {
        const tw_px = tw.w * W;
        const cols = Math.max(3, Math.floor(tw_px / gap));
        const n = Math.min(tw.n, Math.floor((ground - H * 0.14) / fh));
        for (let f = 0; f < n; f++) {
          const y = ground - f * fh;
          rows.push({ t: ti, y, x0: x, x1: x + (cols - 1) * gap });
          for (let c = 0; c < cols; c++) pts.push({ x: x + c * gap, y, t: ti, f });
        }
        outlines.push({ x, w: (cols - 1) * gap, top: ground - (n - 1) * fh, bottom: ground });
        x += tw_px + 0.04 * W;
      });
      // 网络：跨楼的弧线（AI 在楼与楼、层与层之间调度），按从左到右的顺序生长
      const rnd = mulberry(7);
      edges = [];
      const nT = towers.length;
      for (let k = 0; k < 24; k++) {
        const ta = Math.floor(rnd() * nT);
        let tb = ta + (rnd() < 0.5 ? -1 : 1) * (rnd() < 0.75 ? 1 : 2); if (tb < 0 || tb >= nT) tb = ta === 0 ? 1 : ta - 1;
        const A = pts.filter((q) => q.t === ta), Bp = pts.filter((q) => q.t === tb);
        if (!A.length || !Bp.length) continue;
        const i1 = pts.indexOf(A[Math.floor(rnd() * A.length)]);
        const i2 = pts.indexOf(Bp[Math.floor(rnd() * Bp.length)]);
        edges.push([i1, i2, Math.min(pts[i1].x, pts[i2].x) / W]);
      }
      edges.sort((a, b) => a[2] - b[2]);
      edges.forEach((e, k) => (e[2] = k / Math.max(1, edges.length - 1)));
      // 传感点
      sensors = [];
      pts.forEach((_, i) => { if (rnd() < 0.035) sensors.push(i); });
      // 机器人：分配到靠下的楼层
      const low = rows.filter((rw) => rw.y > H * 0.55);
      bots = Array.from({ length: Math.min(8, low.length) }, (_, k) => ({ r: rows.indexOf(low[Math.floor(rnd() * low.length)]), s: 0.25 + rnd() * 0.35, o: rnd() * 10 + k }));
    };

    /* ---------- 绘制 ---------- */
    const draw = (p: number, time: number) => {
      ctx.clearRect(0, 0, W, H);
      const a = ease(clamp((p - 0.2) / 0.16));
      const b = ease(clamp((p - 0.44) / 0.14));
      const c = ease(clamp((p - 0.66) / 0.14));
      const [R, G, B] = ACCENT;

      // 地平线
      ctx.strokeStyle = "rgba(255,255,255,.14)"; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(W * 0.02, H * 0.92 + 16.5); ctx.lineTo(W * 0.98, H * 0.92 + 16.5); ctx.stroke();

      // 01 网络
      if (a > 0) {
        ctx.lineWidth = 1;
        for (const [i, j, o] of edges) {
          const k = clamp((a - o * 0.8) / 0.2);
          if (k <= 0) continue;
          const P1 = pts[i], P2 = pts[j];
          const mx = (P1.x + P2.x) / 2, my = Math.min(P1.y, P2.y) - Math.abs(P2.x - P1.x) * 0.18 - 12;
          ctx.strokeStyle = `rgba(${R},${G},${B},${0.34 * k})`;
          ctx.beginPath(); ctx.moveTo(P1.x, P1.y);
          // 按比例截取二次曲线（de Casteljau）
          const t = k;
          const q1x = P1.x + (mx - P1.x) * t, q1y = P1.y + (my - P1.y) * t;
          const q2x = mx + (P2.x - mx) * t, q2y = my + (P2.y - my) * t;
          ctx.quadraticCurveTo(q1x, q1y, q1x + (q2x - q1x) * t, q1y + (q2y - q1y) * t);
          ctx.stroke();
          if (k >= 1) {
            ctx.fillStyle = `rgba(${R},${G},${B},.95)`; ctx.fillRect(P1.x - 1.5, P1.y - 1.5, 3, 3); ctx.fillRect(P2.x - 1.5, P2.y - 1.5, 3, 3);
            // 流动光点：调度指令沿弧线从一栋楼送到另一栋
            const u = (time / 2200 + o * 3.7) % 1;
            const bx = (1 - u) * (1 - u) * P1.x + 2 * (1 - u) * u * mx + u * u * P2.x;
            const by = (1 - u) * (1 - u) * P1.y + 2 * (1 - u) * u * my + u * u * P2.y;
            ctx.fillStyle = `rgba(${R},${G},${B},${0.35 + 0.65 * Math.sin(u * Math.PI)})`;
            ctx.beginPath(); ctx.arc(bx, by, 2.2, 0, Math.PI * 2); ctx.fill();
          }
        }
      }
      // 楼体轮廓与楼板（物理世界的骨架）
      ctx.strokeStyle = `rgba(255,255,255,${0.1 + 0.08 * a})`; ctx.lineWidth = 1;
      for (const o of outlines) {
        ctx.strokeRect(o.x - 6.5, o.top - 10.5, o.w + 13, o.bottom - o.top + 21);
      }
      ctx.strokeStyle = "rgba(255,255,255,.05)";
      for (const rw of rows) { ctx.beginPath(); ctx.moveTo(rw.x0 - 6, rw.y + 0.5 + 6); ctx.lineTo(rw.x1 + 6, rw.y + 0.5 + 6); ctx.stroke(); }
      // 点阵（物理世界）
      for (let i = 0; i < pts.length; i++) {
        const q = pts[i];
        ctx.fillStyle = `rgba(255,255,255,${0.2 + 0.25 * a})`;
        ctx.fillRect(q.x - 1, q.y - 1, 2, 2);
      }
      // 03 传感扩散环
      if (c > 0) {
        for (let k = 0; k < sensors.length; k++) {
          const q = pts[sensors[k]];
          const ph = ((time / 2400 + k * 0.37) % 1);
          ctx.strokeStyle = `rgba(${R},${G},${B},${(1 - ph) * 0.8 * c})`;
          ctx.lineWidth = 1.2;
          ctx.beginPath(); ctx.arc(q.x, q.y, 3 + ph * 26, 0, Math.PI * 2); ctx.stroke();
          ctx.fillStyle = `rgba(${R},${G},${B},${c})`;
          ctx.beginPath(); ctx.arc(q.x, q.y, 2.4, 0, Math.PI * 2); ctx.fill();
        }
      }
      // 02 机器人
      if (b > 0) {
        for (const bot of bots) {
          const rw = rows[bot.r]; if (!rw) continue;
          const len = rw.x1 - rw.x0;
          const u = (Math.sin(time / 1000 * bot.s + bot.o) + 1) / 2;
          const bx = rw.x0 + u * len;
          const dir = Math.cos(time / 1000 * bot.s + bot.o) >= 0 ? -1 : 1;
          const grd = ctx.createLinearGradient(bx, 0, bx + dir * 26, 0);
          grd.addColorStop(0, `rgba(255,255,255,${0.35 * b})`); grd.addColorStop(1, "rgba(255,255,255,0)");
          ctx.fillStyle = grd; ctx.fillRect(Math.min(bx, bx + dir * 26), rw.y - 1, 26, 2);
          ctx.fillStyle = `rgba(255,255,255,${b})`;
          ctx.fillRect(bx - 4, rw.y - 5, 8, 6);
        }
      }
    };

    /* ---------- 进度来源 ---------- */
    let raf = 0, visible = false, autoStart = 0;
    const scrollProg = () => {
      const r = sec.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      return total > 0 ? clamp(-r.top / total) : 1;
    };
    const stageOf = (p: number) => (p < 0.2 ? 0 : p < 0.44 ? 1 : p < 0.66 ? 2 : p < 0.86 ? 3 : 4);

    const loop = (t: number) => {
      let p: number;
      if (sec.dataset.mode === "scroll") p = scrollProg();
      else { if (!autoStart) autoStart = t; p = clamp((t - autoStart) / 7000); }
      progRef.current = p;
      setStage((s) => (s === stageOf(p) ? s : stageOf(p)));
      draw(p, t);
      if (visible) raf = requestAnimationFrame(loop);
    };

    build();
    if (reduce) { draw(1, 0); setStage(4); }
    else { progRef.current = 0; setStage(0); draw(0, 0); }

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (reduce) return;
      cancelAnimationFrame(raf);
      if (visible) raf = requestAnimationFrame(loop);
    }, { threshold: 0 });
    io.observe(sec);

    const onResize = () => {
      sec.dataset.mode = scrollMode() ? "scroll" : "auto";
      build(); draw(progRef.current, performance.now());
    };
    window.addEventListener("resize", onResize);
    return () => { io.disconnect(); cancelAnimationFrame(raf); window.removeEventListener("resize", onResize); };
  }, []);

  return (
    <section className="h-vision" id="mission" ref={secRef} data-stage={stage}>
      <div className="h-vision__stick">
        <div className="wrap h-vision__grid">
          <div className="h-vision__text">
            <p className="h-vision__en">{en}</p>
            <h2 className="h-vision__zh">{zh}</h2>
            <p className="h-vision__note">{note}</p>
            <ol className="h-vision__ch">
              {chapters.map((c, i) => (
                <li key={c.no} className={stage === i + 1 ? "is-on" : stage > i + 1 ? "is-done" : undefined}>
                  <span className="no">{c.no}</span>
                  <div>
                    <h3>{c.title}</h3>
                    <p>{c.body}</p>
                    <span className="go">{c.link}</span>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="h-vision__art">
            <canvas ref={canvasRef} aria-hidden="true" />
          </div>
        </div>
        <div className="wrap h-vision__end">
          <p className="h-vision__close">{close}</p>
          {film}
        </div>
      </div>
    </section>
  );
}

function mulberry(seed: number) {
  let a = seed;
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
