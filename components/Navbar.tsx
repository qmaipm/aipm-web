"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import { MENU } from "@/lib/nav";

function Caret() {
  return (
    <svg className="car" viewBox="0 0 12 12">
      <path d="M2 4l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    const onScroll = () => setScrolled((window.scrollY || 0) > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    setOpen(false);
  }, [pathname]);
  const solid = scrolled || open;
  // 深色 hero 页面:顶部未滚动时导航转白字,避免暗底吞掉深色导航
  const DARK_HERO = ["/ai-service", "/ai-service/cleaning", "/ai-service/facility", "/ai-service/security", "/agents", "/cases/aipm-property-ai-transformation"];
  const onDark = !solid && DARK_HERO.includes(pathname);

  return (
    <header className={`nav${solid ? " solid" : ""}${onDark ? " on-dark" : ""}`} id="nav">
      <div className="navrow">
        <Link href="/" className="logo" aria-label="启盟科技 Stalliance">
          <Image src="/images/logo.webp" alt="启盟科技 Stalliance" width={384} height={113} priority />
        </Link>
        <nav className="menu">
          {MENU.map((item) => (
            <div className="item" key={item.label}>
              {item.href ? (
                <Link href={item.href}>{item.label}{item.groups && <Caret />}</Link>
              ) : (
                <a>{item.label}<Caret /></a>
              )}
              {item.groups && (
                <div className="dropdown" style={item.minWidth ? { minWidth: item.minWidth } : undefined}>
                  {item.groups.map((g, gi) => (
                    <div key={gi}>
                      {gi > 0 && <div className="sep" />}
                      {g.heading && <div className="dh">{g.heading}</div>}
                      {g.items.map((it) =>
                        it.links ? (
                          <div className="di-suite" key={it.label + it.href}>
                            <Link className="di-title" href={it.href}>{it.label}</Link>
                            <div className="di-sublinks">
                              {it.links.map((l, li) => (
                                <span key={l.href}>
                                  {li > 0 && <i aria-hidden="true">·</i>}
                                  <Link href={l.href}>{l.label}</Link>
                                </span>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <Link className="di" href={it.href} key={it.label + it.href}>
                            {it.label}
                            {it.small && <small>{it.small}</small>}
                          </Link>
                        )
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
        <div className="nav-spacer" />
        <Link href="/workshop" className="nav-cta">
          预约 <span className="lbl-full">FMClaw™ 加速营</span>
          <svg width="13" height="13" viewBox="0 0 16 16">
            <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
        <button
          className="burger"
          aria-label={open ? "关闭菜单" : "打开菜单"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </div>

      {/* 移动端菜单 */}
      <div className={`mobile-menu${open ? " open" : ""}`}>
        <div className="mm-inner">
          {MENU.map((item) =>
            item.groups ? (
              <div className="mm-group" key={item.label}>
                <div className="mm-h">
                  {item.href ? (
                    <Link href={item.href} onClick={() => setOpen(false)}>{item.label}</Link>
                  ) : (
                    item.label
                  )}
                </div>
                {item.groups.flatMap((g) => g.items).map((it) => (
                  <Fragment key={it.label + it.href}>
                    <Link className="mm-link" href={it.href} onClick={() => setOpen(false)}>
                      {it.label}
                    </Link>
                    {it.links?.map((l) => (
                      <Link className="mm-link mm-sub" href={l.href} key={l.href} onClick={() => setOpen(false)}>
                        {l.label}
                      </Link>
                    ))}
                  </Fragment>
                ))}
              </div>
            ) : (
              <Link className="mm-link mm-top" href={item.href!} key={item.label} onClick={() => setOpen(false)}>
                {item.label}
              </Link>
            )
          )}
          <Link href="/workshop" className="btn btn-primary mm-cta" onClick={() => setOpen(false)}>
            预约 FMClaw™ 加速营
          </Link>
        </div>
      </div>
    </header>
  );
}
