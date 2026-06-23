"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

// 复刻原型滚动揭示:对所有 .reveal 元素加 .in。尊重 prefers-reduced-motion。
export default function RevealOnScroll() {
  const pathname = usePathname();
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("in");
            io.unobserve(en.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.06 }
    );
    const vh = window.innerHeight || document.documentElement.clientHeight;
    els.forEach((el) => {
      // 首屏内已经可见的元素直接显示,避免必须滚动一下才出现
      const r = el.getBoundingClientRect();
      if (r.top < vh && r.bottom > 0) {
        el.classList.add("in");
        return;
      }
      const parent = el.parentElement;
      if (parent) {
        const sibs = Array.from(parent.querySelectorAll(":scope > .reveal"));
        el.style.transitionDelay = Math.min(sibs.indexOf(el), 5) * 60 + "ms";
      }
      io.observe(el);
    });
    return () => io.disconnect();
  }, [pathname]);
  return null;
}
