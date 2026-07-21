import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import "./page.css";
import CobuildForm from "./CobuildForm";
import { FmFaq } from "../products/fmclaw/_shared";
import { pageMetadata } from "@/lib/pageMetadata";

export const metadata: Metadata = pageMetadata("/cobuild", {
  title: "人工智能产业共建 · 与地方共建本地 AI 产业 | 启盟科技",
  description:
    "启盟科技出资金、技术与运营团队，以「先打样板、再建合资、后做推广」三步与地方共建人工智能产业——产值与降本写入合同，前期建设阶段合作方不承担财政与采购风险，产业、税收、就业与数据资产沉淀本地。",
});

const Arrow = ({ s = 15 }: { s?: number }) => (
  <svg className="ar" width={s} height={s} viewBox="0 0 16 16">
    <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ArrowD = ({ s = 15 }: { s?: number }) => (
  <svg className="ar" width={s} height={s} viewBox="0 0 16 16">
    <path d="M8 3v10M4 9l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const Check = () => (
  <svg width="15" height="15" viewBox="0 0 16 16" aria-hidden="true">
    <path d="M3 8.5l3.2 3L13 4.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const Cross = () => (
  <svg width="13" height="13" viewBox="0 0 16 16" aria-hidden="true">
    <path d="M4 4l8 8M12 4l-8 8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

/* ---------- ③ 同一笔预算 · 对比数据(华东某 AI 示范科技园区，项目级实账) ---------- */
const gains = [
  {
    k: "政府得产业",
    v: "¥2,323.88 万 / 6 年",
    p: "一笔物业预算，从 K 类房地产业转入 I 类信息技术服务业。",
  },
  {
    k: "国企省预算",
    v: "¥676.68 万 / 6 年",
    p: "智能化预算免除 ¥335.78 万＋运营成本优化 ¥340.9 万。",
  },
  {
    k: "蓝领涨工资",
    v: "+6–8%",
    p: "一线平均薪酬提升，就业总量不减。",
  },
  {
    k: "数据有沉淀",
    v: "日均结构化数据",
    p: "项目持续产出多模态运营数据，形成地方数据资产，可对接未来数据要素交易。",
  },
];

/* ---------- ④ 三步走 ---------- */
const steps = [
  {
    ph: "第一步",
    title: "先打样板",
    body: "从少量项目起步，数月内跑出第一个可对外展示的样板。我方先期投入；可中止、可评估，贵区不承担财政与采购风险。",
  },
  {
    ph: "第二步",
    title: "再建合资",
    body: "与贵区指定的国企平台共同出资设立合资公司，承接区域内国有物业的 AI 化改造——覆盖面积上一个量级，年度产值进入亿元区间。设立时点有两条路径，供贵区择优。合资公司，是产业沉淀本地的制度载体。",
  },
  {
    ph: "第三步",
    title: "后做推广",
    body: "两条推广线同时展开：更多园区完成产业转化，为服务机器人、具身智能、物理 AI 备好场景土壤；区域内持续运行的智能体与机器人，产生稳定的模型调用与数据流转，带动本地物业行业的 AI 转型。从一个园区，到一类业态，再到一个区域。",
  },
];

/* ---------- ⑤ 出资与分配 ---------- */
const inputs = [
  {
    k: "基金",
    title: "亿元规模 AI+FM 专项基金",
    body: "2025 年 6 月设立，全额采购 AI 系统、IoT 传感器与服务机器人，形成贵辖区的本地固定资产。",
  },
  {
    k: "技术",
    title: "FMClaw™ 智能设施管理系统",
    body: "已在 500 个项目运行；四个 AI 智能体接管日常调度、标准制定、质量评估与服务优化，一线服务岗位原则上不动。",
  },
  {
    k: "运营",
    title: "一个常驻本地的团队",
    body: "子公司注册在本地，工商税务全在贵辖区；运维与技术团队常驻，服务人员本地招聘。",
  },
];
const parties = [
  {
    k: "贵区得到",
    body: "一家注册在本地的 AI 企业，营收、税收、就业逐年归属本地；以及持续产出的结构化数据资产。",
  },
  {
    k: "国企得到",
    body: "服务费持平或低于现有物业支出；同一笔预算，多得一套 AI 系统、机器人与数据资产；降本空间写入合同。",
  },
  {
    k: "我们得到",
    body: "长期服务合同与运营收益，以及真实场景的数据积累——这是我们愿意先期投入的原因。",
  },
];

/* ---------- ⑥ 华东实证 ---------- */
const done = [
  "合作框架定稿，「先打样板、再建合资、后做推广」的路径双方对齐",
  "跨国资、招商、财务、审计的专项工作组组建完成",
  "招采、合同、审计模板同步完成",
];
const doing = [
  "首期试点园区部署进入排期",
  "合资公司架构方案完成，国资平台牵头",
  "省、市两级 AI 应用示范申报路径对接中",
];

/* ---------- ⑦ 五年后 ---------- */
const legacy = [
  { v: "上千台", k: "服务机器人", p: "含具身智能，在区域内商用运营。" },
  { v: "数千套", k: "AI 智能体", p: "覆盖办公、园区、公寓等十余类业态。" },
  { v: "数十亿条 / 日", k: "结构化数据", p: "本地数据要素与词元经济的稳定源头。" },
];

/* ---------- ⑧ FAQ ---------- */
const faq = [
  {
    q: "这和采购一套 AI 系统有什么区别？",
    a: "不是采购。贵区不出预算、不走采购流程；我方出资金、技术与运营团队，在本地注册企业、长期运营。系统与机器人是我方的投入，产业、税收、就业与数据资产是贵区的沉淀。",
  },
  {
    q: "贵区需要投入什么？",
    a: "不需要财政投入。需要三件事：对路径的原则性认可；一位牵头领导与跨部门工作机制；首批样板场景的范围。",
  },
  {
    q: "多久能看到第一个样板？",
    a: "数月内。首批样板即可对外展示，作为后续合资与推广的依据。",
  },
  {
    q: "样板不达预期怎么办？",
    a: "可以中止。三步走的每一步都设评估点，上一步走通才有下一步；前期投入由我方承担。",
  },
  {
    q: "「以投带产」和「以投带引」是一回事吗？",
    a: "方向一致，主体不同。「以投带引」是政府用国资基金投项目、引企业；「以投带产」是企业方出资金、技术与运营，直接在本地把产业做起来——政府不出资，产业照样沉淀本地。",
  },
  {
    q: "数据归谁？",
    a: "项目运营数据形成本地数据资产，权属与使用边界写入合同，可对接本地数据要素交易平台。",
  },
];

export default function Page() {
  return (
    <main className="solcb">
      {/* ===== ① HERO · 实景暗场 ===== */}
      <section className="cb-hero">
        <span className="cb-hero__bg" aria-hidden="true" />
        <div className="cb-grid dark" aria-hidden="true" />
        <div className="wrap cb-hero-top">
          <span className="cb-kicker">
            <Link href="/">启盟科技</Link>
            <i>/</i>人工智能产业共建
          </span>
          <h1 className="cb-h1">
            与贵区共建一个<br /><span className="grad">本地 AI 产业</span>
          </h1>
          <p className="cb-lead">
            启盟科技出资金、出技术、出运营团队，从第一个样板项目做起：先打样板、再建合资、后做推广。产值与降本空间写进合同；<b>前期建设阶段，贵区不承担财政与采购风险。</b>
          </p>
          <div className="cb-cta">
            <a href="#path" className="btn btn-primary">看三步怎么走 <ArrowD /></a>
            <a href="#contact" className="btn btn-ghost">留下联系方式 <Arrow /></a>
          </div>
          <div className="cb-proof">
            <span>我方<b>出资金 · 出技术 · 出团队</b></span>
            <span className="sep" />
            <span>合作方<b>零投入</b></span>
            <span className="sep" />
            <span><b className="grad">华东省会城市已落地</b></span>
          </div>
        </div>
      </section>

      {/* ===== ② 01 · 产业口径 ===== */}
      <section className="cb-band">
        <div className="wrap">
          <span className="cb-eyebrow">01 · 产业口径</span>
          <h2 className="cb-h2">一笔物业预算，怎么变成人工智能产业产值</h2>
          <p className="cb-sub">
            「十五五」末，人工智能相关产业规模的目标是 <b>10 万亿元</b>（国家发展改革委，2026 年全国两会）。目标最终要靠一个个地方项目落成——这套方案给出的路径是：
          </p>
          <div className="cb-def">
            <p>
              物业支出归口 <b>K 类「房地产业」</b>。当 AI 系统承担管理协调、机器人与本地注册的 AI 企业交付服务，同一笔支出就成为 <b>I 类「信息技术服务业」</b>的营收——企业注册、税收、就业与数据资产，全部沉淀本地。
            </p>
            <p className="cb-def-verdict"><span className="grad">支出不增，产业起来了。</span></p>
          </div>
          <p className="cb-note">
            这条路有先例：国家鼓励企业投资节能技术、帮用能单位降耗，电费最终变成技术服务费——能源行业走了二十年。今天，把「能源」换成「物业」。
          </p>
        </div>
      </section>

      {/* ===== ③ 02 · 实证对比 ===== */}
      <section className="cb-band mist">
        <div className="wrap">
          <span className="cb-eyebrow">02 · 实证</span>
          <h2 className="cb-h2">同一笔物业预算，两种结果</h2>
          <p className="cb-sub">以华东某 AI 示范科技园区为例——相同管理范围，不同的成本结构与服务内容。</p>

          <div className="cb-vs">
            <div className="cb-vs-col">
              <div className="cb-vs-tag">传统采购</div>
              <div className="cb-vs-price">¥34.1 万 <em>/ 月</em></div>
              <div className="cb-vs-split">运营 ¥28.5 万＋智能化 ¥5.6 万</div>
              <ul className="cb-vs-list">
                <li className="has"><Check />人工服务（保安 / 保洁）</li>
                <li className="has"><Check />设备物料消耗</li>
                <li className="not"><Cross />无智能设备</li>
                <li className="not"><Cross />无数字化系统</li>
                <li className="not"><Cross />无数据报告</li>
              </ul>
            </div>
            <div className="cb-vs-col ai">
              <div className="cb-vs-tag">AI 方案</div>
              <div className="cb-vs-price">¥23.8 万 <em>/ 月</em></div>
              <div className="cb-vs-split">运营降至 ¥23.8 万；智能化投入 ¥0，由我方投资</div>
              <ul className="cb-vs-list">
                <li className="has"><Check />人工服务（保安 / 保洁）</li>
                <li className="has"><Check />设备物料消耗</li>
                <li className="add"><Check />智能机器人（清洁 / 巡检）</li>
                <li className="add"><Check />AI 数字化系统与数据资产</li>
                <li className="add"><Check />可视化数据分析平台</li>
              </ul>
            </div>
          </div>

          <div className="cb-gains">
            {gains.map((g) => (
              <div className="cb-gain" key={g.k}>
                <span className="cb-gain-k">{g.k}</span>
                <strong className="cb-gain-v">{g.v}</strong>
                <p>{g.p}</p>
              </div>
            ))}
          </div>

          <p className="cb-verdict-bar">
            运营每月降 <b>¥4.7 万</b>，智能化与前期投入由我方承担——同一笔预算，多出一套 AI 系统和一个本地 AI 产业的起点。
          </p>
        </div>
      </section>

      {/* ===== ④ 03 · 三步走 ===== */}
      <section className="cb-band" id="path">
        <div className="wrap">
          <span className="cb-eyebrow">03 · 路径</span>
          <h2 className="cb-h2">先打样板，再建合资，后做推广</h2>
          <p className="cb-sub">每一步可中止、可评估。上一步走通，才有下一步。</p>

          <div className="cb-steps">
            {steps.map((s, i) => (
              <div className="cb-step" key={s.title}>
                <div className="cb-step-ph"><span className="grad">{s.ph}</span></div>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
                {i < steps.length - 1 && <span className="cb-step-ar" aria-hidden="true">→</span>}
              </div>
            ))}
          </div>

          <figure className="cb-photo">
            <Image src="/cobuild/district.jpg" alt="医院、学校与机场等公共建筑集群航拍" width={1800} height={1208} sizes="(max-width:1160px) 100vw, 1096px" />
            <figcaption>办公园区、医院、学校、机场——一个区域里的公共建筑，都是这条路径的推广底盘。（图为场景示意）</figcaption>
          </figure>
          <p className="cb-note">各阶段的覆盖规模、投入与产值测算，我们按辖区实际情况单独出具。</p>
        </div>
      </section>

      {/* ===== ⑤ 04 · 出资与分配 ===== */}
      <section className="cb-band mist">
        <div className="wrap">
          <span className="cb-eyebrow">04 · 出资与分配</span>
          <h2 className="cb-h2">一支基金，一套系统，一个常驻团队</h2>

          <div className="cb-inputs">
            {inputs.map((it) => (
              <div className="cb-input" key={it.k}>
                <span className="cb-input-k grad">{it.k}</span>
                <div>
                  <h3>{it.title}</h3>
                  <p>{it.body}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="cb-parties">
            {parties.map((p) => (
              <div className="cb-party" key={p.k}>
                <span className="cb-k" aria-hidden="true" />
                <h3>{p.k}</h3>
                <p>{p.body}</p>
              </div>
            ))}
          </div>
          <p className="cb-note">结算方式与合规路径，已有全套招采、合同、审计模板；面议时详述。</p>
        </div>
      </section>

      {/* ===== ⑥ 05 · 华东实证 ===== */}
      <section className="cb-band">
        <div className="wrap">
          <span className="cb-eyebrow">05 · 进展</span>
          <h2 className="cb-h2">同一套路径，已在华东落地</h2>
          <p className="cb-sub">合作对象：华东某省会城市，区级国有资产平台。</p>

          <div className="cb-prog">
            <div className="cb-prog-photo">
              <Image src="/cobuild/park.jpg" alt="现代科技园区办公楼与连廊" width={1800} height={1208} sizes="(max-width:900px) 100vw, 520px" />
              <figcaption>现代科技园区，是首批样板的典型场景。（图为场景示意）</figcaption>
            </div>
            <div className="cb-prog-lists">
              <div className="cb-checkpanel">
                <h3>已落地</h3>
                <ul>
                  {done.map((d) => (
                    <li key={d}><Check />{d}</li>
                  ))}
                </ul>
              </div>
              <div className="cb-checkpanel doing">
                <h3>推进中</h3>
                <ul>
                  {doing.map((d) => (
                    <li key={d}><Check />{d}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <p className="cb-note">客户信息脱敏。具体合作方与详细资料，可在保密框架内单独披露。</p>
        </div>
      </section>

      {/* ===== ⑦ 06 · 五年后 ===== */}
      <section className="cb-band mist">
        <div className="wrap">
          <span className="cb-eyebrow">06 · 沉淀</span>
          <h2 className="cb-h2">五年后，贵区会有一家什么样的公司</h2>

          <div className="cb-legacy">
            {legacy.map((l) => (
              <div className="cb-leg" key={l.k}>
                <strong className="grad">{l.v}</strong>
                <h3>{l.k}</h3>
                <p>{l.p}</p>
              </div>
            ))}
          </div>

          <figure className="cb-photo">
            <Image src="/cobuild/vision.jpg" alt="服务机器人在公共建筑中庭作业" width={1800} height={1208} sizes="(max-width:1160px) 100vw, 1096px" />
            <figcaption>服务机器人在公共建筑内常态化作业。（图为场景示意）</figcaption>
          </figure>

          <p className="cb-more">
            延伸阅读：<Link href="/insights/property-management-second-half-ai-company">《物业行业的下半场》</Link>
            <span className="dot" />
            <Link href="/company">关于启盟科技</Link>
          </p>
        </div>
      </section>

      {/* ===== ⑧ FAQ ===== */}
      <FmFaq items={faq} heading="常见问题" />

      {/* ===== ⑨ 联系 ===== */}
      <section className="cb-band mist" id="contact">
        <div className="wrap">
          <span className="cb-eyebrow">联系</span>
          <h2 className="cb-h2">想在贵区，从第一个样板开始</h2>
          <p className="cb-sub">无论你在招商、投资促进、国资还是园区条线——留下联系方式，我们带着完整方案与华东项目细节，当面谈。</p>
          <CobuildForm />
        </div>
      </section>

      {/* CTA */}
      <section className="endcta">
        <div className="wrap">
          <h2 className="reveal">把一个 AI 产业，<br />共建到你的地区</h2>
          <p className="reveal">从一次深入沟通开始。</p>
          <div className="cta-row reveal">
            <a href="#contact" className="btn btn-primary">留下联系方式 <Arrow s={16} /></a>
          </div>
        </div>
      </section>
    </main>
  );
}
