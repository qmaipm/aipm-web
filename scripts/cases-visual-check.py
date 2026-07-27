#!/usr/bin/env python3
"""案例页视觉复验:量测排版而不是靠眼睛看。

跑之前先起服务:npx next start -p 3000
用法:python3 scripts/cases-visual-check.py [base_url]

检查项(对应本轮改动的风险点):
  1. 正文每行汉字数 ≈36(P0 的 --cf-read:36em 是否真的生效)
  2. .cf-facts chips 窄屏是否换行错乱 / dd 是否溢出
  3. .cf-cmp 对比表首列在移动端是否被挤压到读不了
  4. 斑马条纹:结果(mist) → 相关案例(白) → FAQ(mist)
  5. 页面总高度(信息密度的粗糙代理指标)
"""
import json
import sys
from pathlib import Path

from playwright.sync_api import TimeoutError as PWTimeout, sync_playwright

BASE = sys.argv[1] if len(sys.argv) > 1 else "http://localhost:3000"
OUT = Path(__file__).resolve().parent.parent / "tmp" / "visual"
OUT.mkdir(parents=True, exist_ok=True)

SLUGS = [
    "intl-hospital-medical-grade-fm",
    "south-china-mixed-use-6-to-1",
    "fmclaw-equipment-inspection",
    "restroom-quality",
    "metro-3400-rooms-daily-inspection",
    "hazardous-area-dual-person-patrol",
    "gigafactory-4-vendor-cleaning",
    "property-group-auto-operation-report",
    "property-group-chat-ai-service",
    "coworking-supplier-reconciliation",
    "30w-park-ai-property-manager-robot",
]

DESKTOP = {"width": 1440, "height": 900}
MOBILE = {"width": 390, "height": 844}

# 页面内量测脚本。返回纯数据,判断留在 Python 侧。
MEASURE = r"""
() => {
  const cjk = (s) => (s.match(/[\u4e00-\u9fff\u3000-\u303f\uff00-\uffef]/g) || []).length;

  // 1. 正文行宽:用 range 逐行拆,拿到真实的每行字符数
  const paras = [...document.querySelectorAll('.cf-sec-body > p')];
  const lines = [];
  for (const p of paras) {
    const node = p.firstChild;
    if (!node || node.nodeType !== 3) continue;   // 只量纯文本段,混排段跳过
    const text = node.textContent;
    const r = document.createRange();
    let start = 0, lastTop = null;
    for (let i = 1; i <= text.length; i++) {
      r.setStart(node, i - 1); r.setEnd(node, i);
      const top = Math.round(r.getBoundingClientRect().top);
      if (lastTop === null) lastTop = top;
      if (top !== lastTop) {
        lines.push(cjk(text.slice(start, i - 1)));
        start = i - 1; lastTop = top;
      }
    }
    if (start < text.length - 1) lines.push(cjk(text.slice(start)));  // 末行不计(未满行)
  }
  const full = lines.slice(0, -1).length ? lines.slice(0, -1) : lines;

  // 2. hero 档案栏 chips
  const facts = [...document.querySelectorAll('.cf-facts')].map((dl) => {
    const items = [...dl.querySelectorAll('.cf-fact')];
    const tops = [...new Set(items.map((el) => Math.round(el.getBoundingClientRect().top)))];
    return {
      count: items.length,
      rows: tops.length,
      // dd 文字是否被裁掉
      overflow: items.filter((el) => {
        const dd = el.querySelector('dd');
        return dd && dd.scrollWidth > dd.clientWidth + 1;
      }).length,
      // chip 是否被推出容器
      escaped: items.filter((el) => {
        const a = el.getBoundingClientRect(), b = dl.getBoundingClientRect();
        return a.right > b.right + 1 || a.left < b.left - 1;
      }).length,
      heights: [...new Set(items.map((el) => Math.round(el.getBoundingClientRect().height)))],
    };
  });

  // 3. 对比表列宽 + 单元格是否溢出
  const cmp = [...document.querySelectorAll('.cf-cmp')].map((t) => {
    const rows = [...t.querySelectorAll('.cf-cmp-row')];
    // 量第一条数据行,不量表头:窄屏下表头的前后两栏是 display:none,
    // 会量出 0px 的假警报。同时跳过被隐藏的格子。
    const dataRow = rows.find((r) => !r.classList.contains('cf-cmp-head')) || rows[0];
    const w = dataRow
      ? [...dataRow.children]
          .filter((c) => c.getClientRects().length)
          .map((c) => Math.round(c.getBoundingClientRect().width))
      : [];
    // 竖排时每格独占一行,列宽检查没有意义
    const stacked = w.length > 1 && w.every((x) => Math.abs(x - w[0]) < 2);
    // squeezed:单元格窄到一行放不下 4 个汉字,就是被挤成竖排字条了。
    // 这才是真问题;文字行正常折两三行不算。
    let wrapped = 0, clipped = 0, squeezed = 0;
    for (const row of rows) {
      for (const c of row.children) {
        const cs = getComputedStyle(c);
        const lh = parseFloat(cs.lineHeight) || parseFloat(cs.fontSize) * 1.5;
        const fs = parseFloat(cs.fontSize);
        const avail = c.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
        const txt = (c.textContent || '').trim();
        if (txt.length > 4 && avail < fs * 4) squeezed++;
        const inner = c.getBoundingClientRect().height
          - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);
        if (inner > lh * 1.6) wrapped++;               // 该单元格文字换了行
        if (c.scrollWidth > c.clientWidth + 1) clipped++;  // 该单元格文字被裁
      }
    }
    return { cols: w, rows: rows.length, wrapped, clipped, squeezed, stacked };
  });

  // 3b. 摩擦三段(CaseFriction):dt 定宽 5.6em,「后来怎么过的」6 字最容易折行。
  //     dt 一折行,整块的基线就乱了,而这类缺陷 lint 完全看不见。
  const fr = [...document.querySelectorAll('.cf-fr')].map((dl) => {
    const rows = [...dl.querySelectorAll('.cf-fr-row')];
    return {
      rows: rows.length,
      // dt 是否被压到折行(高度超过单行行高即判折行)
      dtWrapped: rows.filter((r) => {
        const dt = r.querySelector('dt');
        if (!dt) return false;
        const lh = parseFloat(getComputedStyle(dt).lineHeight) || 20;
        return dt.getBoundingClientRect().height > lh * 1.6;
      }).length,
      // dd 是否溢出容器
      ddEscaped: rows.filter((r) => {
        const dd = r.querySelector('dd');
        if (!dd) return false;
        const a = dd.getBoundingClientRect(), b = dl.getBoundingClientRect();
        return a.right > b.right + 1;
      }).length,
    };
  });

  // 4. 孤儿卡片:任何网格里,最后一行只剩 1 张卡片就是孤儿(§3a)
  //    用每张卡片的 top 分行,比读 grid-template-columns 更可靠(:has / 换行都能覆盖)。
  const orphans = [];
  // 只查等宽网格。.cf-facts 是按内容宽度排的 flex chips,换行成 2+1 是正常形态,
  // 不是孤儿卡片,不能拿同一把尺子量。
  for (const [sel, child] of [['.cf-points', 'li'], ['.cf-wins', 'li'],
                              ['.cf-related', '.cf-rcard'],
                              ['.cf-fit', '.cf-fit-col'], ['.cf-cost', '.cf-cost-item']]) {
    for (const grid of document.querySelectorAll(sel)) {
      const items = [...grid.querySelectorAll(':scope > ' + child)];
      if (items.length < 2) continue;
      const rows = {};
      for (const el of items) {
        const t = Math.round(el.getBoundingClientRect().top);
        rows[t] = (rows[t] || 0) + 1;
      }
      const counts = Object.keys(rows).sort((a, b) => a - b).map((k) => rows[k]);
      // 单列布局(每行 1 张)是正常的移动端形态,不算孤儿
      const singleCol = counts.every((c) => c === 1);
      if (!singleCol && counts[counts.length - 1] === 1)
        orphans.push({ sel, total: items.length, rows: counts });
    }
  }

  // 5. 斑马条纹:按文档顺序列出所有 band 的背景色
  const bands = [...document.querySelectorAll('.cf-band, .cf-core')].map((el) => {
    const h = el.querySelector('h2, .cf-eyebrow');
    return {
      label: (h ? h.textContent : '').trim().slice(0, 14),
      cls: el.className,
      bg: getComputedStyle(el).backgroundColor,
    };
  });

  return {
    lines: full,
    paraCount: paras.length,
    facts,
    cmp,
    fr,
    bands,
    orphans,
    height: document.documentElement.scrollHeight,
    docWidth: document.documentElement.scrollWidth,
    viewportWidth: window.innerWidth,
  };
}
"""


def check(slug, view, m, problems):
    tag = f"{slug} @{view}"
    ls = m["lines"]
    if ls:
        avg = sum(ls) / len(ls)
        mx = max(ls)
        if view == "desktop":
            if avg > 40:
                problems.append(f"{tag}: 平均每行 {avg:.1f} 汉字,超过 40 的舒适上限")
            if mx > 46:
                problems.append(f"{tag}: 最长一行 {mx} 汉字,有串行风险")
    for i, f in enumerate(m["facts"]):
        if f["overflow"]:
            problems.append(f"{tag}: 第 {i+1} 组 chips 有 {f['overflow']} 个 dd 文字被裁")
        if f["escaped"]:
            problems.append(f"{tag}: 第 {i+1} 组 chips 有 {f['escaped']} 个溢出容器")
        if len(f["heights"]) > 1:
            problems.append(f"{tag}: 第 {i+1} 组 chips 高度不齐 {f['heights']},同行会参差")
    for i, t in enumerate(m["cmp"]):
        if t["clipped"]:
            problems.append(f"{tag}: 对比表 {i+1} 有 {t['clipped']} 个单元格文字被裁")
        if t["cols"] and not t.get("stacked") and min(t["cols"]) < 72:
            problems.append(f"{tag}: 对比表 {i+1} 最窄列仅 {min(t['cols'])}px,首列会挤压")
        if t.get("squeezed"):
            problems.append(
                f"{tag}: 对比表 {i+1} 有 {t['squeezed']} 个单元格被挤到一行放不下 4 个字")
    for i, f in enumerate(m.get("fr", [])):
        if f["dtWrapped"]:
            problems.append(
                f"{tag}: 摩擦块 {i+1} 有 {f['dtWrapped']} 个标签折行，三段基线会错位")
        if f["ddEscaped"]:
            problems.append(f"{tag}: 摩擦块 {i+1} 有 {f['ddEscaped']} 段正文溢出容器")
    for o in m.get("orphans", []):
        problems.append(
            f"{tag}: {o['sel']} 共 {o['total']} 张卡片,分行 {o['rows']},"
            f"最后一行只剩 1 张(孤儿卡片)")
    if m["docWidth"] > m["viewportWidth"] + 1:
        problems.append(f"{tag}: 出现横向滚动 {m['docWidth']}px > {m['viewportWidth']}px")
    # 斑马条纹:相邻 band 底色不应相同
    prev = None
    for b in m["bands"]:
        if prev and prev["bg"] == b["bg"] and "cf-core" not in b["cls"]:
            problems.append(f"{tag}: 「{prev['label']}」与「{b['label']}」底色相同 {b['bg']},斑马条纹断了")
        prev = b


def main():
    report = {}
    problems = []
    with sync_playwright() as p:
        browser = p.chromium.launch()
        for view, size in (("desktop", DESKTOP), ("mobile", MOBILE)):
            ctx = browser.new_context(viewport=size, device_scale_factor=2,
                                      locale="zh-CN")
            page = ctx.new_page()
            for slug in SLUGS:
                # networkidle 在这个站点不收敛(有常驻连接),所以用 load。
                # 注意不能用 domcontentloaded:它在样式表生效前就触发,量到的
                # 会是无样式页面(行宽 64 字、底色全透明),看着像 bug 其实是假象。
                #
                # 重试一次:服务刚起来时第一个页面要冷编译,首访常常超过 60s,
                # 那是环境慢不是页面坏。第二次仍失败才算真问题。
                for attempt in (1, 2):
                    try:
                        page.goto(f"{BASE}/cases/{slug}", wait_until="load",
                                  timeout=60000)
                        break
                    except PWTimeout:
                        if attempt == 2:
                            raise
                        print(f"  · {slug} 首访超时,重试(冷编译)")
                page.wait_for_selector(".cf-related .cf-rcard", timeout=30000)
                # CaseFit 是每篇的必备节(cases-lint 强制),缺了要当场失败,
                # 而不是让后面的量测悄悄跳过它。
                page.wait_for_selector(".cf-fit .cf-fit-col", timeout=30000)
                # 兜底断言样式确实生效了,避免再次量到裸 HTML
                page.wait_for_function(
                    "() => { const e = document.querySelector('.cf-band.mist');"
                    " return e && getComputedStyle(e).backgroundColor"
                    " !== 'rgba(0, 0, 0, 0)'; }", timeout=30000)
                page.evaluate("document.fonts.ready")
                page.wait_for_timeout(600)
                m = page.evaluate(MEASURE)
                report[f"{slug}@{view}"] = m
                check(slug, view, m, problems)
                page.screenshot(path=str(OUT / f"{slug}-{view}-top.png"))
                if slug == SLUGS[0]:
                    page.screenshot(path=str(OUT / f"{slug}-{view}-full.png"),
                                    full_page=True)
            ctx.close()
        browser.close()

    (OUT / "report.json").write_text(json.dumps(report, ensure_ascii=False, indent=1))

    for k, m in report.items():
        ls = m["lines"]
        avg = f"{sum(ls)/len(ls):.1f}" if ls else "-"
        mx = max(ls) if ls else "-"
        print(f"{k:52s} 行宽均 {avg:>5s} 最长 {str(mx):>3s} "
              f"段 {m['paraCount']:>2d} 表 {len(m['cmp'])} 高 {m['height']}px")

    print()
    if problems:
        print(f"发现 {len(problems)} 个问题:")
        for x in problems:
            print("  ✗ " + x)
        sys.exit(1)
    print("视觉复验通过,无量测异常。")


if __name__ == "__main__":
    main()
