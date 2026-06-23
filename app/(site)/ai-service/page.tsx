import type { Metadata } from "next";
import Link from "next/link";
import "./page.css";

export const metadata: Metadata = {
  title: "AI 物业服务 · 「专业 + 数字」一体化的物业服务 — 启盟科技",
  description:
    "我们以「专业 + 数字」一体化的服务模式承接物业服务:顾问咨询、环境、安全、设施与客户服务五项专业服务,叠加数字化管理体系做数据化运营。对客户,我们的承诺是省心、周到、主动、智能。智在,让物管更自在。",
};

const Arrow = ({ s = 15 }: { s?: number }) => (
  <svg className="ar" width={s} height={s} viewBox="0 0 16 16">
    <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const pledges = [
  {
    no: "01", word: "省心", en: "Effortless",
    ess: "该想的、该盯的，系统先替你想好。",
    detail: "日常运营里大量重复的判断与盯防，交给系统与专业团队。业主不必事事过问，只在关键处点头确认。",
    li: ["自我管理：全面感知服务情况，自我完成整改调度，现场质量稳定", "自我考核：全数字化考核工作量与服务质量，不扯皮"],
  },
  {
    no: "02", word: "周到", en: "Thoughtful",
    ess: "从大堂到外围，不漏项、不将就。",
    detail: "服务覆盖到每一处细节与角落——大堂石材养护、外围绿化、楼宇香薰、活动接待，标准一致、件件到位。",
    li: ["五项专业服务全覆盖、无缝衔接", "服务细节标准化，可核查、可还原"],
  },
  {
    no: "03", word: "主动", en: "Proactive",
    ess: "在问题变成投诉之前，就处理掉。",
    detail: "设备隐患、环境异常、安全风险，系统主动预警、主动处置，不等业主开口、不等投诉上门。",
    li: ["设备隐患预测性维保、提前介入", "风险分级预警，24 小时主动响应"],
  },
  {
    no: "04", word: "智能", en: "Intelligent",
    ess: "每一次服务，都可量化、可追溯、可优化。",
    detail: "用核心指标体系与 AI，把「做得好不好」变成看得见的数据，再用数据让下一次做得更好。",
    li: ["传感器负责感知数据", "机器人参与日常服务"],
  },
];

const services = [
  {
    no: "服务 01", h: "顾问咨询服务", img: "/ai-service/advisory.jpg",
    p: "满足物业顾问咨询各阶段、不同层次的需求,从前期介入一直陪到正常运营。",
    li: ["物业前期介入与承接查验", "前期开办筹备与租户进驻", "正常期物业管理", "绿色建筑认证配合"],
  },
  {
    no: "服务 02", h: "环境管理服务", img: "/ai-service/env.jpg",
    p: "「人 + 机器人」智能保洁,确保项目整体状况持续达标。",
    li: ["日常清洁与石材养护", "外围绿化修剪、浇水施肥", "四害消杀与绿色消杀", "突发公共卫生事件应对"],
  },
  {
    no: "服务 03", h: "安全管理服务", img: "/ai-service/security.jpg",
    p: "「技防 + 人防」双维度的安全布防管控,建立全方位安全防范体系。",
    li: ["智能监控中心 · 24 小时零死角", "分区分级管理与区域责任制", "应急小分队快速响应", "24 小时消防安全排查"],
  },
  {
    no: "服务 04", h: "设施管理服务", img: "/ai-service/facility.jpg",
    p: "设施设备的全生命周期管理,以经济、绿色为原则保障稳定运行。",
    li: ["持续预防性维保", "重点设备专属档案、系统跟踪", "BAS 实时运行记录与监控", "特种设备外包管理"],
  },
  {
    no: "服务 05", h: "客户服务", img: "/ai-service/customer.jpg",
    p: "以客户为中心,急客户之所需,把贴身服务做到日常里。",
    li: ["管家一站式服务", "业户进住与二次装修管理", "日常保洁及周期性保养", "私人活动配合接待"],
  },
];

const compare = [
  ["服务质量", "依赖个人经验、难量化", "指标量化、可视可控"],
  ["管理效率", "逐级上报、层级冗长", "数据中台、扁平协同"],
  ["服务效率", "人工巡查、被动响应", "智能调度、主动预警"],
  ["服务成本", "高且不透明", "结构优化、持续下降"],
];

export default function Page() {
  return (
    <main className="aisv">
      {/* HERO · 实景 */}
      <section className="av-hero">
        <div className="av-hero__bg" aria-hidden="true" />
        <div className="av-grid" aria-hidden="true" />
        <div className="wrap av-hero-top">
          <span className="av-kicker">
            <Link href="/">启盟科技</Link>
            <i>/</i>AI 物业服务
          </span>
          <h1 className="av-h1">智在，让物管更自在</h1>
          <p className="av-lead">
            对客户，我们的承诺就四个词——<b className="tn">省心</b>、<b className="tn">周到</b>、<b className="tn">主动</b>、<b className="tn">智能</b>。以「专业 + 数字」一体化的服务，把它们落到每一次服务里。
          </p>
          <div className="av-cta">
            <Link href="/contact" className="btn btn-primary">联系我们 <Arrow /></Link>
            <a href="#services" className="btn btn-ghost">看五项专业服务 <Arrow /></a>
          </div>
          <div className="av-proof">
            <span><b className="grad">五项</b>专业服务</span>
            <span className="sep" />
            <span>核心指标 <b>数据化管理</b></span>
            <span className="sep" />
            <span><b>专业 + 数字</b> 一体化</span>
          </div>
        </div>
      </section>

      {/* 我们的客户 */}
      <section className="av-clients">
        <div className="wrap">
          <span className="av-clients__lab">我们服务的客户</span>
          <div className="av-clients__row">
            <div className="av-cli"><img src="/ai-service/clients/wework.png" alt="WeWork" /></div>
            <div className="av-cli"><img src="/ai-service/clients/pci.png" alt="PCI 佳都科技" /></div>
            <div className="av-cli"><img src="/ai-service/clients/bama.png" alt="八马茶业 BAMA TEA" /></div>
            <div className="av-cli"><img className="cli-lg" src="/ai-service/clients/wonderlab.png" alt="万益蓝 WonderLab" /></div>
          </div>
        </div>
      </section>

      {/* 对客户的宗旨 · 省心 / 周到 / 主动 / 智能 */}
      <section className="av-band mist av-pledge-band">
        <div className="av-pledge-bg" aria-hidden="true" />
        <div className="wrap">
          <span className="av-eyebrow">对客户的宗旨</span>
          <h2 className="av-h2">省心、周到、主动、智能</h2>
          <p className="av-sub">对客户，我们只承诺四件事。它们不是口号，而是我们每天怎么做事的标准——也是判断一支物业团队好不好的四把尺子。</p>
          <div className="av-pledge">
            {pledges.map((p) => (
              <article className="av-pcard" key={p.no}>
                <div className="av-pcard__top">
                  <span className="av-pno">{p.no}</span>
                  <span className="av-pen">{p.en}</span>
                </div>
                <div className="av-pword">{p.word}</div>
                <p className="av-pess">{p.ess}</p>
                <p className="av-pdetail">{p.detail}</p>
                <ul className="av-ppoints">{p.li.map((x) => <li key={x}>{x}</li>)}</ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 五项专业服务 · 每项一个大板块 */}
      <section className="av-band" id="services">
        <div className="wrap">
          <span className="av-eyebrow">五项专业服务</span>
          <h2 className="av-h2">五项专业服务，一套一体化标准</h2>
          <p className="av-sub">专业团队、标准管理、敏捷质控、透明监管、扁平架构——五项专业服务在同一套标准与数字底座上协同，把「做得好不好」变成「看得见、管得住」。</p>
          <div className="av-venn">
            <svg className="av-arc l" viewBox="0 0 280 290">
              <path className="av-arc-line" d="M238 35 Q152 145 238 255" />
              {[[238, 35], [206, 90], [195, 145], [206, 200], [238, 255]].map(([x, y], i) => (
                <g key={i}>
                  <circle className="av-arc-dot" cx={x} cy={y} r="4.5" />
                  <text className="av-arc-t" x={x - 13} y={y + 4.5} textAnchor="end">
                    {["顾问咨询", "安全管理", "环境管理", "设施管理", "客户服务"][i]}
                  </text>
                </g>
              ))}
            </svg>
            <div className="av-venn__d">
              <div className="av-vc l"><span>专业服务</span></div>
              <div className="av-vc r"><span>数字管理</span></div>
              <span className="av-venn__mid" aria-hidden="true">+</span>
            </div>
            <svg className="av-arc r" viewBox="0 0 280 290">
              <path className="av-arc-line" d="M42 35 Q128 145 42 255" />
              {[[42, 35], [74, 90], [85, 145], [74, 200], [42, 255]].map(([x, y], i) => (
                <g key={i}>
                  <circle className="av-arc-dot" cx={x} cy={y} r="4.5" />
                  <text className="av-arc-t" x={x + 13} y={y + 4.5} textAnchor="start">
                    {["专业团队", "标准管理", "敏捷质控", "透明监管", "扁平架构"][i]}
                  </text>
                </g>
              ))}
            </svg>
          </div>

          <div className="av-svclist">
            {services.map((s) => (
              <article className="av-svc" key={s.no}>
                <div className="av-svc__media">
                  <img src={s.img} alt={s.h} loading="lazy" />
                </div>
                <div className="av-svc__body">
                  <span className="av-svc__no">{s.no}</span>
                  <h3 className="av-svc__h">{s.h}</h3>
                  <p className="av-svc__p">{s.p}</p>
                  <ul className="av-svc__ul">{s.li.map((x) => <li key={x}>{x}</li>)}</ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 数字化管理体系 · 暗场 */}
      <section className="av-core">
        <div className="av-core__bg" aria-hidden="true" />
        <div className="wrap">
          <span className="av-eyebrow on-dark">数字化管理体系</span>
          <h2 className="av-h2 on-dark">把物管，做成一套可量化的指标</h2>
          <p className="av-sub on-dark">我们建立一套业务运行的核心指标体系，叠加「线上+线下」品质管控，让每一次服务都可度量、可追溯。</p>

          <div className="av-metrics">
            <div className="av-metric"><div className="mv"><em>X%</em></div><div className="ml">服务计划完成率</div></div>
            <div className="av-metric"><div className="mv"><em>X</em> 分</div><div className="ml">服务质量评分</div></div>
            <div className="av-metric"><div className="mv"><em>X%</em></div><div className="ml">工单接单及时率</div></div>
            <div className="av-metric"><div className="mv"><em>X%</em></div><div className="ml">工单结单及时率</div></div>
          </div>

          <div className="av-compare">
            <div className="av-cr av-ch">
              <div></div>
              <div className="av-bef">传统物管</div>
              <div className="av-aft">数字化管理后</div>
            </div>
            {compare.map(([k, b, a]) => (
              <div className="av-cr" key={k}>
                <div className="av-ck">{k}</div>
                <div className="av-bef">{b}</div>
                <div className="av-aft">{a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 使命 */}
      <section className="av-mission">
        <span className="av-mission__glow" aria-hidden="true" />
        <div className="wrap">
          <p className="av-mission-en">Make property management effortless</p>
          <p className="av-mission-zh">智在，让物管更自在</p>
          <p className="av-mission-sub">把每一次清洁、每一次巡检、每一笔账都做得更省心、更透明——这是我们想交给业主的物业服务。</p>
        </div>
      </section>

      {/* CTA · 我们来接物业服务 */}
      <section className="endcta">
        <div className="wrap">
          <h2 className="reveal">把物业服务，<br />交给我们来接</h2>
          <p className="reveal">从一个真实的项目、一处真实的需求开始，我们用「专业 + 数字」把它接下来。</p>
          <div className="cta-row reveal">
            <Link href="/contact" className="btn btn-primary">联系我们 <Arrow s={16} /></Link>
          </div>
        </div>
      </section>
    </main>
  );
}
