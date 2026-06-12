"use client";

import { useEffect, useRef } from "react";

/**
 * 使命句背景:点阵的物理世界 + 智能光波扩散。
 * 一张代表"物理世界"的点阵,智能像光波一圈圈漫过、把点点亮 —— 呼应 ambient intelligence。
 * 性能:rAF 驱动、离屏自动暂停(IntersectionObserver)、prefers-reduced-motion 降级为静态点阵。
 */
export default function MissionBackdrop() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const SPACING = 30;
    const BAND = 46;
    const GLOW = [
      [0, 112, 255], // blue
      [18, 185, 138], // green
    ];

    let w = 0;
    let h = 0;
    let dots: { x: number; y: number; c: number[] }[] = [];

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      dots = [];
      const cols = Math.ceil(w / SPACING) + 1;
      const rows = Math.ceil(h / SPACING) + 1;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const jx = ((Math.sin(r * 12.9 + c * 4.1) + 1) / 2 - 0.5) * 7;
          const jy = ((Math.sin(r * 6.3 + c * 9.7) + 1) / 2 - 0.5) * 7;
          dots.push({ x: c * SPACING + jx, y: r * SPACING + jy, c: GLOW[(r + c) % 2] });
        }
      }
    };

    type Wave = { x: number; y: number; r: number; speed: number; max: number };
    let seed = 0;
    const spawn = (startR = 0): Wave => {
      seed += 1;
      return {
        x: w * (0.2 + ((Math.sin(seed * 2.3) + 1) / 2) * 0.6),
        y: h * (0.25 + ((Math.sin(seed * 3.7) + 1) / 2) * 0.5),
        r: startR,
        speed: 26 + ((Math.sin(seed) + 1) / 2) * 14,
        max: Math.hypot(w, h) * 0.85 || 1,
      };
    };
    let waves: Wave[] = [];

    const drawStatic = () => {
      ctx.clearRect(0, 0, w, h);
      for (const d of dots) {
        ctx.beginPath();
        ctx.arc(d.x, d.y, 1, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.07)";
        ctx.fill();
      }
    };

    let raf = 0;
    let last = 0;
    let running = false;

    const frame = (now: number) => {
      if (!running) return;
      const dt = last ? Math.min((now - last) / 1000, 0.05) : 0;
      last = now;

      for (const wave of waves) wave.r += wave.speed * dt;
      waves = waves.map((wave) => (wave.r > wave.max ? spawn() : wave));

      ctx.clearRect(0, 0, w, h);
      for (const d of dots) {
        let lit = 0;
        for (const wave of waves) {
          const dist = Math.hypot(d.x - wave.x, d.y - wave.y);
          const off = Math.abs(dist - wave.r);
          if (off < BAND) {
            const fall = Math.exp(-(off * off) / (2 * (BAND / 2.4) * (BAND / 2.4)));
            const life = 1 - wave.r / wave.max;
            lit = Math.max(lit, fall * life);
          }
        }
        const baseA = 0.07;
        if (lit < 0.02) {
          ctx.beginPath();
          ctx.arc(d.x, d.y, 1, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,255,255,${baseA})`;
          ctx.fill();
        } else {
          const a = baseA + lit * 0.78;
          const rad = 1 + lit * 1.8;
          ctx.beginPath();
          ctx.arc(d.x, d.y, rad, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${d.c[0]},${d.c[1]},${d.c[2]},${a})`;
          ctx.fill();
          if (lit > 0.5) {
            ctx.beginPath();
            ctx.arc(d.x, d.y, rad * 2.6, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${d.c[0]},${d.c[1]},${d.c[2]},${(lit - 0.5) * 0.12})`;
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

    waves = [spawn(140), spawn(280), spawn(60)];

    const io = new IntersectionObserver(
      (entries) => (entries[0].isIntersecting ? start() : stop()),
      { threshold: 0.05 }
    );
    io.observe(canvas);

    const onResize = () => build();
    window.addEventListener("resize", onResize);

    return () => {
      stop();
      io.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return <canvas ref={ref} className="mission-canvas" aria-hidden="true" />;
}
