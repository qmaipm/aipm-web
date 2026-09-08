"use client";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

// 前进导航到新页面时,立即(instant,无平滑动画)定位到顶部,杜绝"进内页时看到页面滚到顶部"的观感。
// 后退/前进(popstate)不强制,交给浏览器做滚动位置还原,避免破坏"返回列表回到原位置"的记忆。
export default function ScrollTopOnNavigate() {
  const pathname = usePathname();
  const isPop = useRef(false);

  useEffect(() => {
    const onPop = () => { isPop.current = true; };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  useEffect(() => {
    if (isPop.current) { isPop.current = false; return; }
    // 带锚点的入口应定位到目标内容，不能被全站回顶覆盖。
    const hash = window.location.hash.slice(1);
    if (hash) {
      let id: string;
      try { id = decodeURIComponent(hash); } catch { return; }
      const frame = window.requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ block: "start", behavior: "instant" as ScrollBehavior });
      });
      return () => window.cancelAnimationFrame(frame);
    }
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);

  return null;
}
