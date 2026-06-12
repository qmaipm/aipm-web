# DESIGN.md — 启盟科技 / FMClaw™ 官网

> 本规范由现有站点逆向沉淀（Phase A：从 `app/globals.css` 与既有页面提取 Token），作为首页及全站视觉优化的统一依据。调性硬约束：**70% Anthropic（克制、留白、平静陈述、句子当标题、无营销形容词）+ 30% Palantir（已部署的真实感、用事实说话、短句即笃定）**。酷炫永远让位于克制一致。

## 1. Visual Theme & Atmosphere
- 设计哲学：**安静的笃定**。米白纸感底色 + 近黑墨色文字，留白充足，靠事实与排版说话，不靠装饰。
- 氛围关键词：editorial、warm-ivory、calm、deployed-not-demo、印刷感。
- 一句话定调：像一份排版考究的产品白皮书在网页上呼吸——克制，但每一句都笃定。

## 2. Color Palette & Roles
```css
:root{
  /* 底色 / 纸面 */
  --ivory:#F6F4EE;  /* rgb(246,244,238) 页面底 */
  --ivory-2:#F0EDE3;/* rgb(240,237,227) 次级底 / alt 段 */
  --paper:#FBFAF6;  /* rgb(251,250,246) 卡片面 */
  /* 文字墨阶 */
  --ink:#1A1916;    /* rgb(26,25,22) 主文字 / 标题 */
  --ink-2:#46443D;  /* rgb(70,68,61) 正文 */
  --mut:#787469;    /* rgb(120,116,105) 弱化文字 */
  --mut-2:#9A958A;  /* rgb(154,149,138) 最弱 / 分隔 */
  /* 描边 */
  --line:#E2DDD0;   /* rgb(226,221,208) */
  --line-2:#ECE8DC; /* rgb(236,232,220) */
  /* 暗色段（workshop / cases / footer） */
  --dark:#15140F; --dark-2:#1E1C15; --dark-line:#33301F; --dark-mut-c:#A29C8A;
  /* 强调色（克制使用，仅作accent，不铺面） */
  --blue:#0070FF;   /* rgb(0,112,255) 主强调 / 链接 */
  --green:#12B98A;  /* rgb(18,185,138) */
  --gold:#F59E0B;   /* rgb(245,158,11) */
  --purple:#9333EA; /* rgb(147,51,234) */
  --pink:#EC4899;   /* rgb(236,72,153) */
}
```
- 角色：底色 ivory；文字 ink/ink-2；弱化 mut/mut-2；强调色仅用于 accent 条、链接、关键数字下划线，**不大面积铺色**。

## 3. Typography Rules
```css
/* 中文优先，英文 fallback；中文页面硬约束：行高≥1.7、字距.02em、正文≥16px */
body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Noto Sans SC",sans-serif;
  font-size:17px; line-height:1.75}
.serif{font-family:"Noto Sans SC","Noto Serif",Georgia,serif} /* 大标题 / 引语 */
.mono{font-family:"JetBrains Mono",ui-monospace,monospace}     /* eyebrow / 标签 / 数据 */
```
- 字号层级：H1 `clamp(40px,5.2vw,64px)/700/-.025em`；H2 `clamp(28px,3.4vw,38px)`；H3 19–22px；正文 17px；eyebrow 12px mono 大写 letter-spacing .22em。
- 禁止：纯英文字体让系统回退中文；标题用全大写英文+中文副标的双层路演结构。

## 4. Component Stylings（关键件，含状态）
- **按钮 `.btn`**：min-height 50px，radius 999，padding 0 28px。
  - primary：`linear-gradient(135deg,var(--blue),var(--green))` 白字；hover `translateY(-2px)+filter brightness`；focus-visible 2px blue 描边；disabled opacity .5。
  - ghost / outline：透明 + ink 描边；hover 实化。箭头 `.ar` hover 右移 3px。
- **卡片 `.card` / `.tri .t`**：paper 底 + 1px line + radius 16；hover `translateY(-3px)+shadow`；顶部 4px accent 条区分类别；focus-visible 同按钮。
- **eyebrow**：mono 大写、字距 .22em、mut 色，前缀小横线。
- **链接**：inherit 色，hover 转 ink/accent；正文内链 accent + 下划线 offset 3px。

## 5. Layout Principles
- 容器 `--maxw:1160px`；正文测量宽 `--measure:760px`（≤66 字符/行）。
- 段落节奏：`.band` 上下大留白（约 110–120px，移动端 84px），明暗段交替（ivory / ivory-2 / dark）。
- 网格：客户墙 4 列、卡片 c2/c3、自适应降列。间距梯度 8 / 14 / 22 / 32 / 48。

## 6. Depth & Elevation
- 极轻阴影体系：卡片 hover `0 16px 44px rgba(26,25,22,.10)`；浮层 dropdown `0 16px 44px rgba(26,25,22,.13)`。纸感为主，不做强投影、不做拟物。

## 7. Animation & Interaction — 档位 **L2（克制）**
- 入场：`.reveal` fadeInUp（opacity+translateY 22px，.8s cubic-bezier(.2,.7,.2,1)），IntersectionObserver 触发；**首屏错峰**（H1→态度句→注解→CTA 逐级 +80ms）。
- 氛围：Hero `hero-mesh` 柔和渐变漂移（drift 26s），blur≤70px 仅作背景、不在滚动区移动。
- 悬停：按钮上浮 + 箭头位移；卡片上浮 + 轻投影；logo 轻微放大 1.04。
- **禁用**：滚动劫持 / WebGL / 自定义光标 / 大动效。`prefers-reduced-motion` 全量降级（已实现）。

## 8. Do's and Don'ts
**Do**
1. 句子当标题，平实中文，靠事实与数字说话。
2. 强调色只作 accent（条 / 链接 / 关键数字下划线）。
3. 关键数字（51、5–7 天→半小时）给克制强调，让信息一眼可读。
4. 所有交互件都有 hover + focus-visible 态。
5. 中文行高 ≥1.7、正文 ≥16px、留白充足。

**Don't**
1. 不用全大写英文大标题 + 中文副标的 PPT 双层结构。
2. 不用感叹号、夸大词（最/第一/颠覆/领先）、emoji。
3. 不堆爆点动效 / WebGL / 滚动劫持 / 自定义光标。
4. 不大面积铺强调色、不做彩色大色块。
5. 不用纯色块占位图；不让中文回退到英文字体。
6. 不在移动端产生横向溢出；触摸目标 <44px 不允许。

## 9. Responsive Behavior
- 断点：1024 / 900 / 760 / 600。容器 padding 32→22。
- 折叠：客户墙 4→2 列；卡片 c3/c4→2→1；导航折叠为移动菜单；首屏 CTA 纵向铺满。
- 触摸目标 ≥44×44；≤600px 无横向溢出。
</content>
