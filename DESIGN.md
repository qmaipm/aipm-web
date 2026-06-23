# DESIGN.md — 启盟科技 / FMClaw™ 官网

> 本规范由现有站点逆向沉淀（Phase A：从 `app/globals.css` 与既有页面提取 Token），作为首页及全站视觉优化的统一依据。调性硬约束：**70% Anthropic（克制、留白、平静陈述、句子当标题、无营销形容词）+ 30% Palantir（已部署的真实感、用事实说话、短句即笃定）**。酷炫永远让位于克制一致。

> 跟随 Anthropic `frontend-design` 技能重做（2026-06）：把设计**扎根到主体本身**——一家让 AI 智能体接管物理世界（楼宇 / 设施）日常运营的公司。产品主张只有一句：**智能体负责想，人只做最后那个决定。** 这句主张被做成了视觉系统本身，而非装饰。胆量只花在一处（使命签名时刻），其余一律安静。

> **2026-06-14 蓝绿 VI 升级（本轮 · 先落首页）**：公司 VI 是**蓝绿**（`#0070FF → #12B98A`）。此前蓝绿只出现在按钮，页面被暖纸底 + 琥珀主导，读起来与 VI 脱节。本轮把**蓝绿升为页面一级存在**——仍保留暖纸底与克制编辑感，但蓝绿出现在：首屏科技背景（蓝图网格 + 数据节点/数据流 canvas + 蓝绿双核辉光）、eyebrow 引线、H1 关键词与所有大数字（渐变文字）、章节/卡片强调、使命点阵、数据网格底纹。**冷暖冲突的处理**：蓝绿=机器/系统（主导、大面积），琥珀 `--human` 降为**唯一、稀有**的「人做最后一个决定」点缀——青绿与琥珀是互补色，这样配是**刻意**而非打架。整体更**大气**（首屏放大为近整屏、H1 加大到 78px、大数字渐变），但不堆爆点、不劫持滚动。字体仍为开源字族（Noto Sans SC / Noto Serif SC / JetBrains Mono，SIL OFL / Apache，**无版权风险**）。

## 1. Visual Theme & Atmosphere
- 设计哲学：**安静的操作台（Operations, quieted）**。暖纸底像建筑制图纸，近黑墨字，靠事实与排版说话；Palantir 的「已部署」精确感，用 Anthropic 的安静语气讲出来。
- 氛围关键词：architectural-paper、operations-console、telemetry、deployed-not-demo、calm。
- 一句话定调：一台冷静的运营操作台，铺在一张暖白制图纸上——每个颜色都在说话，但全程不抬高嗓门。
- **避开 AI 默认三连**：不做高对比衬里标题 + 赤陶强调的「奶油默认」；不做近黑 + 荧光绿；不做全 hairline 报纸体。暖底是 brief 明确要的（70% Anthropic），差异化花在语义化配色、结构化信息、单一签名时刻上。

## 2. Color Palette & Roles
配色的核心是**语义化双色**：`signal` = 智能体 / 在线 / 链接 / 关键事实；`human` = 人的最后一个决定。旧的五彩强调系统收为同族克制色，仅用于「区分四类对象 / 内页身份」，不再表达情绪。
```css
:root{
  /* 底色 / 纸面（建筑制图纸,暖但比 AI 默认奶油更克制） */
  --ivory:#F4F1E8;  /* rgb(244,241,232) 页面底 */
  --ivory-2:#ECE8DB;/* rgb(236,232,219) 次级底 / alt 段 */
  --paper:#FAF8F1;  /* rgb(250,248,241) 卡片面 */
  /* 文字墨阶 */
  --ink:#17160F;    /* rgb(23,22,15) 主文字 / 标题 */
  --ink-2:#45433A;  /* rgb(69,67,58) 正文 */
  --mut:#75715F;    /* rgb(117,113,95) 弱化文字 */
  --mut-2:#9A9483;  /* rgb(154,148,131) 最弱 / 分隔 */
  /* 描边 */
  --line:#DED8C8;   /* rgb(222,216,200) */
  --line-2:#E9E4D6; /* rgb(233,228,214) */
  /* 暗色段（mission / workshop / cases / footer） */
  --dark:#131209; --dark-2:#1C1A11; --dark-line:#322F1E; --dark-mut-c:#A6A08C;
  /* ★ 语义双色（胆量与意义都在这两支） */
  --signal:#2D58CE; /* rgb(45,88,206)  智能体 / 在线 / 链接 / 关键事实 */
  --human:#BE7A2E;  /* rgb(190,122,46) 人的最后一个决定 */
  /* 同族克制色:仅作分类区分(四类对象 / 内页身份),不表达情绪 */
  --blue:#2D58CE; --green:#2E8C76; --gold:#BE7A2E; --purple:#5B5C9E; --pink:#B25C77;
}
```
- 角色：底色 ivory；文字 ink/ink-2；弱化 mut/mut-2。
- **signal / human 是叙事**：智能体做的事（核完、比完、标出异常、在线数据）一律 signal；人做的那一下（看一眼、签字）用 human。首页流程图、使命点阵、Deployed 字样都遵此。
- 强调色只作 accent 条、链接、关键数字下划线，**不大面积铺色，不做五彩渐变**。

## 3. Typography Rules
两种声音为主：**中文声**（Noto Sans SC，正文 / 标题 / **使命句**——使命句已与 Hero 统一为同一黑体，不再用衬线）、**机器声**（JetBrains Mono，英文 / 数字 / eyebrow / 遥测标签——Palantir 终端感）。Noto Serif SC 仅保留给 pull-quote 等少数编辑性引语（如需），使命句不再使用。不再使用 Inter（默认味太重）。
```css
@import url('...family=JetBrains+Mono:wght@400;500;600&family=Noto+Sans+SC:wght@300;400;500;600;700&family=Noto+Serif+SC:wght@500;600;700&display=swap');
/* 中文页面硬约束：行高≥1.7、字距.02em、正文≥16px */
body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Noto Sans SC",sans-serif;
  font-size:17px; line-height:1.75}
.serif{font-family:"Noto Serif SC",Georgia,serif} /* 使命句 / 大引语,人文声 */
.mono{font-family:"JetBrains Mono",ui-monospace,monospace} /* 英文 / 数字 / eyebrow,机器声 */
```
- 字号层级：H1 `clamp(40px,5.2vw,64px)/600/-.025em`；H2 `clamp(30px,4.4vw,50px)`；H3 19–22px；正文 17px；eyebrow 12px mono 大写 letter-spacing .22em。
- 禁止：纯英文字体让系统回退中文；标题用全大写英文+中文副标的双层路演结构；Noto Serif SC 用于小字正文（仅留给大字编辑性时刻）。

## 4. Component Stylings（关键件，含状态）
- **按钮 `.btn`**：min-height 50px，radius 999，padding 0 28px。
  - primary：**公司 VI 蓝绿渐变 `--brand-grad`（#0070FF → #12B98A）+ 白字**（VI 主色调，硬约束，不可变）；hover `translateY(-2px)` + `filter:brightness(1.06)`；focus-visible 2px signal 描边；disabled opacity .5。
  - `--brand-grad` 永远是 VI，内页主题（`--vi-grad`/`--accent`）不覆盖它，保证全站主按钮一致。
  - ghost / outline：透明 + ink 描边；hover 实化。箭头 `.ar` hover 右移 3px。
  - nav-cta 同为 VI 蓝绿渐变胶囊。
- **决策面板 `.dpanel`**（首页「看它怎么干活」）：仿真实审批界面——标题栏 + Agent 已分析状态 + 逐行核查（signal 勾 / human 琥珀异常）+ 底部 human 琥珀「签字」按钮。用产品界面讲「AI 想好、人点头」，不用三栏 PPT 卡。
- **部署登记表 `.registry`**（首页「客户案例」）：深色表格，列=项目/规模/Agent在做/状态，每行带 live 呼吸点 + 在线状态。读作「正在运行的现场」，非营销幻灯。
- **数据规格表 `.moat-sheet`**（首页「数据护城河」）：左侧唯一性论断 + 物理→可训练资产 pipeline；右侧 4 行数据规格（signal 编号 + 大数字）。专业、数据密集（Palantir）。
- **卡片 `.card` / `.tri .t`**：paper 底 + 1px line + radius 16；hover `translateY(-3px)+shadow`；顶部 4px accent 条区分类别；focus-visible 同按钮。
- **eyebrow**：mono 大写、字距 .22em、mut 色，前缀小横线。
- **链接**：inherit 色，hover 转 ink/accent；正文内链 accent + 下划线 offset 3px。

## 5. Layout Principles
- 容器 `--maxw:1160px`；正文测量宽 `--measure:760px`（≤66 字符/行）。
- 段落节奏：`.band` 上下大留白（约 110–120px，移动端 84px），明暗段交替（ivory / ivory-2 / dark）。
- 网格：客户墙 4 列、卡片 c2/c3、自适应降列。间距梯度 8 / 14 / 22 / 32 / 48。

## 6. Depth & Elevation
- 极轻阴影体系：卡片 hover `0 16px 44px rgba(26,25,22,.10)`；浮层 dropdown `0 16px 44px rgba(26,25,22,.13)`。纸感为主，不做强投影、不做拟物。

## 7. Animation & Interaction — 档位 **L2（克制）+ 1 个签名时刻**
- 入场：`.reveal` fadeInUp（opacity+translateY 22px，.8s cubic-bezier(.2,.7,.2,1)），IntersectionObserver 触发；**首屏错峰**（H1→态度句→注解→CTA 逐级 +80ms）。
- 氛围：Hero `hero-mesh` = **建筑制图网格（hairline 64px 栅格，径向 mask 淡出）+ 单层 signal 微光**（drift 30s，blur≤64px，仅作背景、不在滚动区移动）。取代旧的五彩 blur-mesh，读作「操作台 / 蓝图」而非「SaaS 落地页」。
- **签名时刻 · 使命段（胆量只花在这一处）**：深色段 `.mission-dark` 背后一层 `MissionBackdrop` canvas——点阵代表「物理世界」，智能像光波一圈圈扩散、把途经的点点亮。**蓝绿 VI 双色为主（蓝多绿少）+ 稀疏 human 琥珀点**（呼应「人只做最后那个决定」）。上方一行 mono 遥测 eyebrow，下方与 Hero 同字体（Noto Sans SC 黑体）大字「让智能，走进物理世界」（标题无句号）。
  - 性能护栏（硬性）：rAF 驱动；`IntersectionObserver` 离屏暂停；DPR ≤2；点距 30px；移动元素不加 `filter:blur`（景深用 alpha+半径）；`prefers-reduced-motion` 降级为**静态点阵**（不动）。单页仅此 1 处重背景，非 WebGL（2D canvas）。
- 悬停：按钮上浮 + 箭头位移；卡片上浮 + 轻投影；logo 轻微放大 1.04。
- **禁用**：滚动劫持 / WebGL / 自定义光标 / 多处重动效。`prefers-reduced-motion` 全量降级（已实现）。

## 8. Do's and Don'ts
**Do**
1. 句子当标题，平实中文，靠事实与数字说话。
2. **用 signal / human 双色讲故事**：智能体做的事 = signal，人做的那一下 = human。
3. 强调色只作 accent（条 / 链接 / 关键数字下划线 / 顶边）。
4. 关键数字（51、5–7 天→半小时）给克制强调，让信息一眼可读。
5. 所有交互件都有 hover + focus-visible 态。
6. 中文行高 ≥1.7、正文 ≥16px、留白充足。
7. 胆量只花在使命签名时刻一处，其余安静。

**Don't**
1. 不用全大写英文大标题 + 中文副标的 PPT 双层结构。
2. 不用感叹号、夸大词（最/第一/颠覆/领先）、emoji。
3. 不堆爆点动效 / WebGL / 滚动劫持 / 自定义光标。
4. **不做五彩渐变 / 大面积铺强调色**。主按钮用 VI 蓝绿渐变（品牌例外），其余处不再造彩色渐变。
5. signal 蓝不滥用——它是「意义色」，只用于智能体动作 / 在线 / 链接 / 关键事实。
6. 描述问题用网页/产品语言（界面、表格、规格表），不用三栏并排 PPT 卡。
6. 不用纯色块占位图；不让中文回退到英文字体；正文不用衬线。
7. 不在移动端产生横向溢出；触摸目标 <44px 不允许。

## 9. Responsive Behavior
- 断点：1024 / 900 / 760 / 600。容器 padding 32→22。
- 折叠：客户墙 4→2 列；卡片 c3/c4→2→1；导航折叠为移动菜单；首屏 CTA 纵向铺满。
- 触摸目标 ≥44×44；≤600px 无横向溢出。
</content>
