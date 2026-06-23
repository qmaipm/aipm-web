"use client";

import { useEffect, useRef } from "react";

/**
 * 使命句沉浸式背景:点阵物理世界 + 智能光波扩散 + 网络连线 + 鼠标涟漪。
 * 智能像光波一圈圈漫过点阵,途经的点被点亮并彼此结网 —— 呼应 ambient intelligence。
 * 性能护栏:rAF + IntersectionObserver 离屏暂停 + DPR≤2 + 不对移动元素加 blur + reduced-motion 降级静态。
 */
export default function MissionBackdrop() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hover = window.matchMedia("(hover: hover)").matches;
    const SPACING = 30;
    const BAND = 50;
    const GLOW = [
      [0, 112, 255],  // VI blue — 智能体/在线
      [18, 185, 138], // VI green — 蓝绿 VI 第二主色
      [206, 150, 86], // human — 人的最后一个决定(稀疏点缀)
    ];

    let w = 0;
    let h = 0;
    let cols = 0;
    let rows = 0;
    let dots: { x: number; y: number; c: number[]; lit: number }[] = [];

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(w / SPACING) + 1;
      rows = Math.ceil(h / SPACING) + 1;
      dots = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const jx = ((Math.sin(r * 12.9 + c * 4.1) + 1) / 2 - 0.5) * 6;
          const jy = ((Math.sin(r * 6.3 + c * 9.7) + 1) / 2 - 0.5) * 6;
          // 蓝绿 VI 双色为主(蓝多绿少);每隔若干点散布一颗 human 琥珀,呼应「人只做最后那个决定」
          const human = (r * 7 + c * 3) % 17 === 0;
          const green = !human && (r * 3 + c * 5) % 4 === 0;
          const col = human ? GLOW[2] : green ? GLOW[1] : GLOW[0];
          dots.push({ x: c * SPACING + jx, y: r * SPACING + jy, c: col, lit: 0 });
        }
      }
    };

    type Wave = { x: number; y: number; r: number; speed: number; max: number };
    let seed = 0;
    const spawn = (startR = 0): Wave => {
      seed += 1;
      return {
        x: w * (0.15 + ((Math.sin(seed * 2.3) + 1) / 2) * 0.7),
        y: h * (0.2 + ((Math.sin(seed * 3.7) + 1) / 2) * 0.6),
        r: startR,
        speed: 34 + ((Math.sin(seed) + 1) / 2) * 22,
        max: Math.hypot(w, h) * 0.9 || 1,
      };
    };
    let waves: Wave[] = [];

    // 鼠标涟漪
    let mx = -9999;
    let my = -9999;
    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mx = e.clientX - rect.left;
      my = e.clientY - rect.top;
    };
    const onLeave = () => {
      mx = -9999;
      my = -9999;
    };

    const drawStatic = () => {
      ctx.clearRect(0, 0, w, h);
      for (const d of dots) {
        ctx.beginPath();
        ctx.arc(d.x, d.y, 1, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.08)";
        ctx.fill();
      }
    };

    let raf = 0;
    let last = 0;
    let running = false;
    const MR = 150; // 鼠标影响半径

    const frame = (now: number) => {
      if (!running) return;
      const dt = last ? Math.min((now - last) / 1000, 0.05) : 0;
      last = now;

      for (const wave of waves) wave.r += wave.speed * dt;
      waves = waves.map((wave) => (wave.r > wave.max ? spawn() : wave));

      ctx.clearRect(0, 0, w, h);

      // 1) 计算每个点的点亮强度
      for (const d of dots) {
        let lit = 0;
        for (const wave of waves) {
          const off = Math.abs(Math.hypot(d.x - wave.x, d.y - wave.y) - wave.r);
          if (off < BAND) {
            const fall = Math.exp(-(off * off) / (2 * (BAND / 2.4) * (BAND / 2.4)));
            lit = Math.max(lit, fall * (1 - wave.r / wave.max));
          }
        }
        if (mx > -9999) {
          const md = Math.hypot(d.x - mx, d.y - my);
          if (md < MR) lit = Math.max(lit, (1 - md / MR) * 0.9);
        }
        d.lit = lit;
      }

      // 2) 连线:相邻被点亮的点之间拉丝线(右 / 下邻居)
      ctx.lineWidth = 1;
      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];
        if (d.lit < 0.22) continue;
        const col = i % cols;
        const neighbors = [];
        if (col < cols - 1) neighbors.push(dots[i + 1]);
        if (i + cols < dots.length) neighbors.push(dots[i + cols]);
        for (const n of neighbors) {
          const m = Math.min(d.lit, n.lit);
          if (m < 0.22) continue;
          ctx.beginPath();
          ctx.moveTo(d.x, d.y);
          ctx.lineTo(n.x, n.y);
          ctx.strokeStyle = `rgba(${d.c[0]},${d.c[1]},${d.c[2]},${(m - 0.18) * 0.5})`;
          ctx.stroke();
        }
      }

      // 3) 画点
      for (const d of dots) {
        const lit = d.lit;
        if (lit < 0.02) {
          ctx.beginPath();
          ctx.arc(d.x, d.y, 1, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(255,255,255,0.08)";
          ctx.fill();
        } else {
          const rad = 1.2 + lit * 2.6;
          ctx.beginPath();
          ctx.arc(d.x, d.y, rad, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${d.c[0]},${d.c[1]},${d.c[2]},${0.08 + lit * 0.9})`;
          ctx.fill();
          if (lit > 0.4) {
            ctx.beginPath();
            ctx.arc(d.x, d.y, rad * 3, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${d.c[0]},${d.c[1]},${d.c[2]},${(lit - 0.4) * 0.16})`;
            ctx.fill();
          }
        }
      }
      raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (running) return;
      running = true;
      last = 0;
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    build();

    if (reduce) {
      drawStatic();
      const onResizeStatic = () => {
        build();
        drawStatic();
      };
      window.addEventListener("resize", onResizeStatic);
      return () => window.removeEventListener("resize", onResizeStatic);
    }

    waves = [spawn(160), spawn(320), spawn(80), spawn(480), spawn(0)];

    const io = new IntersectionObserver(
      (entries) => (entries[0].isIntersecting ? start() : stop()),
      { threshold: 0.02 }
    );
    io.observe(canvas);

    const onResize = () => build();
    window.addEventListener("resize", onResize);
    if (hover) {
      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerleave", onLeave);
    }

    return () => {
      stop();
      io.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={ref} className="mission-canvas" aria-hidden="true" />;
}
