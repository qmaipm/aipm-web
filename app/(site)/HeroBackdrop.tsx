"use client";

import { useEffect, useRef } from "react";

/**
 * 首屏科技背景:漂浮数据节点 + 邻近连线 + 沿连线流动的数据脉冲。
 * 蓝绿 VI(blue #0070FF / green #12B98A)在浅纸底上克制呈现,读作「运营操作台 / 蓝图在亮起」。
 * 性能护栏(硬性):
 *  - rAF 驱动,单画布;DPR≤2;节点数按宽度自适应,移动端减半。
 *  - IntersectionObserver 离屏暂停;reduced-motion 降级为静态点阵(不动)。
 *  - 不对移动元素加 filter:blur(辉光交给 CSS hero-mesh)。
 */
export default function HeroBackdrop() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const BLUE = [0, 112, 255];
    const GREEN = [18, 185, 138];
    const LINK = 132;        // 连线最大距离
    const LINK2 = LINK * LINK;

    let w = 0;
    let h = 0;
    type Node = { x: number; y: number; vx: number; vy: number; c: number[]; r: number };
    let nodes: Node[] = [];
    type Pulse = { a: number; b: number; t: number; speed: number };
    let pulses: Pulse[] = [];

    // 伪随机(避免 Math.random 也行,但首屏只跑一次无妨)
    const rnd = (n: number) => (Math.sin(n * 12.9898 + 78.233) * 43758.5453) % 1;

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // 密度:每 ~26k px² 一个节点,移动端更稀
      const base = w < 720 ? 30000 : 22000;
      const count = Math.min(64, Math.max(16, Math.round((w * h) / base)));
      nodes = [];
      for (let i = 0; i < count; i++) {
        const a = rnd(i + 1);
        const b = rnd(i + 101);
        const ang = rnd(i + 201) * Math.PI * 2;
        const sp = 0.10 + Math.abs(rnd(i + 301)) * 0.16;
        nodes.push({
          x: Math.abs(a) * w,
          y: Math.abs(b) * h,
          vx: Math.cos(ang) * sp,
          vy: Math.sin(ang) * sp,
          c: i % 3 === 0 ? GREEN : BLUE,
          r: 1.1 + Math.abs(rnd(i + 401)) * 1.4,
        });
      }
      pulses = [];
    };

    const drawStatic = () => {
      ctx.clearRect(0, 0, w, h);
      for (const n of nodes) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${n.c[0]},${n.c[1]},${n.c[2]},0.20)`;
        ctx.fill();
      }
    };

    let raf = 0;
    let running = false;
    let pulseClock = 0;

    const frame = () => {
      if (!running) return;
      ctx.clearRect(0, 0, w, h);

      // 移动节点(边缘回绕)
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < -20) n.x = w + 20;
        else if (n.x > w + 20) n.x = -20;
        if (n.y < -20) n.y = h + 20;
        else if (n.y > h + 20) n.y = -20;
      }

      // 连线(邻近)
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < LINK2) {
            const al = (1 - d2 / LINK2) * 0.16;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(12,139,130,${al})`;
            ctx.stroke();
          }
        }
      }

      // 周期性产生数据脉冲(沿一条邻近连线流动)
      pulseClock++;
      if (pulses.length < 5 && pulseClock % 26 === 0) {
        const i = Math.floor(Math.abs(rnd(pulseClock)) * nodes.length) % nodes.length;
        // 找一个邻居
        let best = -1;
        let bestD = LINK2;
        for (let j = 0; j < nodes.length; j++) {
          if (j === i) continue;
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d2 = dx * dx + dy * dy;
          if (d2 < bestD) {
            bestD = d2;
            best = j;
          }
        }
        if (best >= 0) pulses.push({ a: i, b: best, t: 0, speed: 0.012 + Math.abs(rnd(pulseClock + 7)) * 0.014 });
      }

      // 画脉冲
      for (const p of pulses) {
        p.t += p.speed;
        const a = nodes[p.a];
        const b = nodes[p.b];
        if (!a || !b) {
          p.t = 1.1;
          continue;
        }
        const x = a.x + (b.x - a.x) * p.t;
        const y = a.y + (b.y - a.y) * p.t;
        const c = b.c;
        ctx.beginPath();
        ctx.arc(x, y, 2.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${c[0]},${c[1]},${c[2]},0.9)`;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(x, y, 6, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${c[0]},${c[1]},${c[2]},0.12)`;
        ctx.fill();
      }
      pulses = pulses.filter((p) => p.t < 1);

      // 画节点
      for (const n of nodes) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${n.c[0]},${n.c[1]},${n.c[2]},0.32)`;
        ctx.fill();
      }

      raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    build();

    if (reduce) {
      drawStatic();
      const onR = () => {
        build();
        drawStatic();
      };
      window.addEventListener("resize", onR);
      return () => window.removeEventListener("resize", onR);
    }

    const io = new IntersectionObserver(
      (entries) => (entries[0].isIntersecting ? start() : stop()),
      { threshold: 0.01 }
    );
    io.observe(canvas);

    let rt = 0;
    const onResize = () => {
      clearTimeout(rt);
      rt = window.setTimeout(build, 180);
    };
    window.addEventListener("resize", onResize);

    return () => {
      stop();
      io.disconnect();
      clearTimeout(rt);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return <canvas ref={ref} className="hero-canvas" aria-hidden="true" />;
}
