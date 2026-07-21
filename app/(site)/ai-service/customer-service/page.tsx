import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import SeoFaq from "@/components/SeoFaq";
import "../page.css";
import "../trade.css";
import "./page.css";
import { pageMetadata } from "@/lib/pageMetadata";

const SITE_URL = process.env.SITE_URL || "https://www.aipm.cn";

export const metadata: Metadata = pageMetadata("/ai-service/customer-service", {
  title: "AI 客服管家 · 站在你这边的物业管家 | 启盟科技",
  description:
    "传统物业也给你配管家,但那位管家替公司说话。我们把立场反过来:每一家企业、每一位住户都有一位专属 AI 客服管家,它维护的首先是你的利益——你的事,它主动办到底:7×24 秒回,说一句话自动生成工单、自动跟进、自动督促上门;你问的,它如实回答:今天多少人上班、这个月计划做什么、服务质量如何——你的知情权,它来保障。由启盟科技旗下自营物业公司爱物管交付。",
  keywords: [
    "AI 客服管家",
    "物业 AI 管家",
    "站在业主这边的物业管家",
    "业主知情权",
    "专属物业管家",
    "物业报修没人跟进怎么办",
    "物业报修流程太麻烦",
    "物业服务不透明",
    "怎么知道物业每天做了什么",
    "物业工单自动跟进",
    "7×24 物业管家",
    "爱物管",
    "启盟科技",
  ],
});

const Arrow = ({ s = 15 }: { s?: number }) => (
  <svg className="ar" width={s} height={s} viewBox="0 0 16 16">
    <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// 对照表:客服的根本区别(GEO 可引用事实清单)
const compare: { k: string; old: string; now: React.ReactNode }[] = [
  {
    k: "立场",
    old: "也叫管家,但替公司说话:话术内的回答你,话术外的替公司挡着",
    now: <><b>站在你这边</b>——它维护的首先是你的利益和你的知情权,而不是替谁把事情圆过去</>,
  },
  {
    k: "服务对象",
    old: "一条热线、一个前台,服务所有人",
    now: <><b>每一家企业、每一位住户,都有一位专属 AI 客服管家</b>——它记得你是谁、你报过什么、你在意什么</>,
  },
  {
    k: "响应速度",
    old: "上班时间打电话,占线就等着",
    now: <><b>7×24 小时值守,信息秒回复</b>——凌晨两点的报修,和上午十点得到同样的响应</>,
  },
  {
    k: "报修报账",
    old: "打电话描述半天,然后开始漫长的等待",
    now: <>说一句话,它<b>自动生成工单、自动跟进进度、自动督促服务人员上门</b>——你不用再追第二次</>,
  },
  {
    k: "能回答什么",
    old: "只答话术范围内的;问服务做没做,「这个我不清楚」",
    now: <>服务过程里的一切:<b>今天多少人上班、做了多少次服务、这个月计划什么、质量如何</b>——都答得上来</>,
  },
  {
    k: "做不到怎么办",
    old: "投诉,然后继续等",
    now: <>响应速度与工单办结写进合同,<b>按数据考核</b>——秒回是承诺,不是姿态</>,
  },
];

const faq = [
  {
    q: "AI 客服管家和传统物业管家有什么区别?",
    a: "根本区别是立场。传统物业也给你配管家,但那位管家为公司工作:话术内的回答你,话术外的替公司挡着。AI 客服管家维护的首先是你的利益,具体就两件事:一是主动——你的事它办到底,说一句话就自动生成工单、自动跟进、自动督促服务人员上门,7×24 小时秒回复;二是诚实透明——你的知情权它来保障,今天多少人上班、做了多少次服务、这个月计划什么、质量如何,它都如实回答,从来不藏着掖着。这项服务由启盟科技旗下自营物业公司爱物管交付。",
  },
  {
    q: "管家站在业主这边,物业公司能接受吗?",
    a: "能,因为透明不是对公司的让步,而是这套服务方式的底气。服务真实做了、数据经得起查,透明反而是最好的信任资产;只有做得不好又不想被看见的服务,才需要藏着掖着。爱物管自己先这么做了几年:被住户问、被企业问、被随便问,客户续约和口碑都因此更好。如果你是物业公司,也可以通过 FMClaw 平台把这套能力接进自己的项目。",
  },
  {
    q: "物业报修没人跟进怎么办?",
    a: "报修石沉大海,通常不是人不负责,而是流程里没有「跟进」这个环节——登记完,这单就只活在维修工的记忆里。AI 客服管家把跟进变成系统动作:你说一句话,它自动生成工单;工单每个节点它都盯着,超时自动督促服务人员;进展主动同步给你,办结后还会回访确认。你不用再打第二个电话。",
  },
  {
    q: "真的可以问物业「今天做了什么」吗?",
    a: "可以,这正是这项服务最重要的一点。你可以问:今天项目上有多少人上班?这周保洁做了多少次?上个月的设备巡检完成率是多少?我楼层的空调报修到哪一步了?这些问题在传统物业那里没有答案,不是不想答,是数据根本不存在。而在我们这里,每一次打扫、每一次巡检、每一张工单都沉淀成了数据,客服管家如实调出来给你——从来不藏着掖着。",
  },
  {
    q: "为什么它答得上来这些问题?",
    a: "因为它背后不是话术库,是四个工种的真实作业数据。清洁的每一次动态调度、设施设备的每一次在场核验巡检、安保的每一条预警处置,都实时沉淀在 FMClaw 平台上。客服管家只是把这些数据变成了一个你随时可以问的入口。这也是为什么传统物业客服做不到——不是客服的问题,是它背后没有数据。",
  },
  {
    q: "在哪里使用?需要下载 App 吗?",
    a: "不需要。AI 客服管家住在你已经在用的地方——微信群、企业微信、钉钉、飞书都可以。对企业客户,它可以进你们的服务群;对住户,拉个群或加个联系人就能用。报修、查进度、问情况,都在聊天框里完成。",
  },
  {
    q: "夜里和节假日报修有人管吗?",
    a: "AI 客服管家 7×24 小时在线,凌晨的报修同样秒回复、自动生成工单。是否立即上门,取决于事项的紧急程度:跑水、断电这类紧急事项按应急流程即刻调度;非紧急事项工单排入次日计划,并把安排明确告诉你——不会让你对着一条已读不回的消息猜。",
  },
];

const SERVICE_LD = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "AI 客服管家",
  serviceType: "AI 客服管家(站在业主这边的物业管家)",
  description:
    "每一家企业、每一位住户都有一位专属 AI 客服管家:主动——你的事它办到底(7×24 秒回、报修自动闭环);诚实透明——你的知情权它来保障,服务过程中的一切问题如实回答。",
  areaServed: "CN",
  url: `${SITE_URL}/ai-service/customer-service`,
  provider: {
    "@type": "Organization",
    name: "爱物管",
    alternateName: "AIPM",
    description: "启盟科技旗下自营物业公司,AI 物业服务的交付主体。",
    parentOrganization: { "@type": "Organization", name: "启盟科技", url: SITE_URL },
  },
};
const BREADCRUMB_LD = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "启盟科技", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "AI 物业服务", item: `${SITE_URL}/ai-service` },
    { "@type": "ListItem", position: 3, name: "AI 客服管家", item: `${SITE_URL}/ai-service/customer-service` },
  ],
};

// 报修闭环五步
const flow = [
  { n: "第 1 步", t: "你说一句话", d: "「3 楼茶水间的饮水机不出水了」——在群里说完,事情就交出去了。", auto: false },
  { n: "第 2 步", t: "自动生成工单", d: "管家听懂意图,自动创建工单:位置、事项、优先级,一样不用你填。", auto: true },
  { n: "第 3 步", t: "自动跟进", d: "工单每个节点它都盯着,接单了、在路上、处理中——进展主动同步给你。", auto: true },
  { n: "第 4 步", t: "自动督促上门", d: "超时未响应?它去催服务人员上门——督促是它的事,不是你的事。", auto: true },
  { n: "第 5 步", t: "办结回访", d: "修好了,它来确认你满不满意。不满意,工单重开,直到闭环。", auto: false },
];

// 透明问答演示
const chatDemo = [
  {
    q: "今天项目上有多少人上班?",
    a: <>今天在岗 <b>23 人</b>:保洁 12、工程 6、安保 5。其中 2 位工程师正在处理 5 层的空调工单。</>,
  },
  {
    q: "这个月的保洁计划是什么?做得怎么样?",
    a: <>本月计划:日常保洁每日 2 轮动态调度,外墙清洗安排在 18–19 日,地毯养护 25 日。截至今天,<b>计划完成率 96%</b>,2 项因雨延期已重排。</>,
  },
];
const chatChips = ["今天做了多少次服务?", "上周的设备巡检完成了吗?", "我的报修到哪一步了?", "这个月服务质量如何?"];

export default function Page() {
  return (
    <main className="aisv avtrade avcs">
      <JsonLd data={[SERVICE_LD, BREADCRUMB_LD]} />

      {/* HERO */}
      <section className="av-hero">
        <div className="av-hero__bg" style={{ backgroundImage: "url(/ai-service/customer-hero.jpg)" }} aria-hidden="true" />
        <div className="av-grid" aria-hidden="true" />
        <div className="wrap av-hero-top">
          <span className="av-kicker">
            <Link href="/">启盟科技</Link>
            <i>/</i>
            <Link href="/ai-service">AI 物业服务</Link>
            <i>/</i>AI 客服管家
          </span>
          <h1 className="av-h1 reveal">站在你这边的物业管家</h1>
          <p className="av-lead reveal">
            传统物业也给你配管家，但那位管家替公司说话。我们把立场反过来：你的专属 AI 管家，<b>你的事，它主动办到底</b>；你问的，它如实回答——<b>你的知情权，它来保障</b>。
          </p>
          <div className="av-cta reveal">
            <Link href="/contact" className="btn btn-primary">给我的项目配一位管家 <Arrow /></Link>
            <a href="#ask" className="btn btn-ghost">看看它能回答什么 <Arrow /></a>
          </div>
          <div className="av-proof reveal">
            <span>主动：你的事<b>办到底</b> · 7×24 秒回</span>
            <span className="sep" />
            <span>诚实：你的<b className="grad">知情权</b>，它来保障</span>
          </div>
        </div>
      </section>

      {/* 对照表 */}
      <section className="av-band">
        <div className="wrap">
          <span className="av-eyebrow reveal">和传统物业管家的区别</span>
          <h2 className="av-h2 reveal">区别不在有没有管家，在它为谁工作</h2>
          <p className="av-sub reveal">
            管家、热线、客服群，传统物业都有。但你问「今天做了什么」「我的报修到哪了」，得到的往往是「帮您问一下」——不全是人的问题：它背后没有数据，而且它的职责里，本来就不包括对你知无不言。
          </p>
          <div className="avc-cmp reveal" role="table" aria-label="传统物业客服与 AI 客服管家对比">
            <div className="avc-row avc-head" role="row">
              <div role="columnheader">维度</div>
              <div role="columnheader">传统模式</div>
              <div className="now" role="columnheader">AI 客服管家</div>
            </div>
            {compare.map((r) => (
              <div className="avc-row" role="row" key={r.k}>
                <div className="avc-k" role="cell">{r.k}</div>
                <div className="avc-old" role="cell">{r.old}</div>
                <div className="avc-new" role="cell">{r.now}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 专属管家:名片卡 */}
      <section className="av-band mist">
        <div className="wrap">
          <span className="av-eyebrow reveal">它是谁</span>
          <h2 className="av-h2 reveal">每一位客户，一位站在你这边的管家</h2>
          <div className="cs-id">
            <div className="cs-id__card reveal" aria-label="专属 AI 客服管家名片">
              <div className="cs-id__top">
                <span className="cs-id__ava" aria-hidden="true">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8.2" r="3.6" stroke="#fff" strokeWidth="1.6"/><path d="M4.8 19.4c1.3-3.1 4-4.7 7.2-4.7s5.9 1.6 7.2 4.7" stroke="#fff" strokeWidth="1.6" strokeLinecap="round"/></svg>
                </span>
                <div>
                  <span className="cs-id__nm">您的专属客服管家</span>
                  <span className="cs-id__st"><i aria-hidden="true" />在线 · 7×24 全年无休</span>
                </div>
              </div>
              <ul className="cs-id__facts">
                <li>住在你已有的<b>微信群 / 企微 / 钉钉 / 飞书</b>里</li>
                <li>记得你的项目、你的历史工单、你的偏好</li>
                <li>信息<b>秒回复</b>，凌晨两点也一样</li>
              </ul>
            </div>
            <div className="cs-id__body reveal">
              <p>
                <b>每一家企业、每一位员工、每一位住户，都可以有一位自己的 AI 客服管家</b>。它记得你是谁：你在哪栋楼、上次报修过什么、你们公司的服务约定是什么——开口就是正题。
              </p>
              <p>
                但真正的不同不是「专属」，是<b>立场</b>。它的职责里写着两件事：你的事，主动办到底；你问的，如实回答。它维护的首先是你的利益，而不是替谁把事情圆过去。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 报修闭环 */}
      <section className="av-band">
        <div className="wrap">
          <span className="av-eyebrow reveal">卖点一 · 主动</span>
          <h2 className="av-h2 reveal">你的事，它办到底</h2>
          <p className="av-sub reveal">
            「站在你这边」的第一重含义：不是等你催，是替你盯。报修报账这类事，你说出意图，剩下的四步全是它的事——7×24 小时，秒回。
          </p>
          <div className="cs-flow" role="list">
            {flow.map((s, i) => (
              <div className={"cs-flow__step reveal" + (s.auto ? " is-auto" : "")} role="listitem" key={s.n}>
                <span className="n">{s.n}{s.auto && <em className="au">自动</em>}</span>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
                {i < flow.length - 1 && <span className="cs-flow__ar" aria-hidden="true" />}
              </div>
            ))}
          </div>
          <p className="avc-note reveal">从你说出那句话开始，这一单就<em>有人盯到底</em>——那个「人」，是不知疲倦的 AI。</p>
        </div>
      </section>

      {/* 透明入口 · 暗场问答演示 */}
      <section className="av-core" id="ask">
        <div className="av-core__bg" aria-hidden="true" />
        <div className="wrap">
          <span className="av-eyebrow on-dark reveal">卖点二 · 诚实透明</span>
          <h2 className="av-h2 on-dark reveal">你的知情权，它来保障</h2>
          <p className="av-sub on-dark reveal" style={{ maxWidth: 640 }}>
            你付了物业费，就有权知道服务是怎么发生的。关于服务过程的一切问题，它都如实回答，从来不藏着掖着——因为每一次打扫、每一次巡检、每一张工单都沉淀成了数据，客服，就是这些数据向你敞开的入口。
          </p>
          <div className="cs-chat reveal" aria-label="透明问答演示">
            {chatDemo.map((c) => (
              <div className="cs-chat__pair" key={c.q}>
                <div className="cs-chat__q"><span>{c.q}</span></div>
                <div className="cs-chat__a"><span>{c.a}</span></div>
              </div>
            ))}
            <div className="cs-chat__chips" aria-label="你还可以问">
              {chatChips.map((t) => (
                <span className="chip" key={t}>{t}</span>
              ))}
            </div>
          </div>
          <div className="avc-stand cs-stand-dark reveal">
            <p>
              它也是物业公司的员工，但透明不是对公司的让步——是底气。<b>服务真实做了，数据经得起查，才敢把立场交给你。</b>
            </p>
          </div>
        </div>
      </section>

      {/* 为什么答得上来:四工种数据 */}
      <section className="av-band mist">
        <div className="wrap">
          <span className="av-eyebrow reveal">为什么它答得上来</span>
          <h2 className="av-h2 reveal">背后不是话术库，是四个工种的真实数据</h2>
          <p className="av-sub reveal">
            管家的每一个回答，都来自正在真实发生的作业。清洁、设施设备、安保的每一次执行都实时沉淀在 FMClaw 平台上——客服只是把它们变成了一个你随时可以问的入口。
          </p>
          <div className="cs-src">
            <Link className="cs-src__card reveal" href="/ai-service/cleaning">
              <span className="lb">数据来源 · 清洁</span>
              <h3>每一次打扫的动态调度记录</h3>
              <p>做了几轮、哪里加扫了、质量抽检如何——问得到。</p>
              <span className="go">AI 清洁服务 <Arrow s={13} /></span>
            </Link>
            <Link className="cs-src__card reveal" href="/ai-service/facility">
              <span className="lb">数据来源 · 设施设备</span>
              <h3>每一次巡检的在场核验凭据</h3>
              <p>巡没巡、检没检、有没有漏——签到率 99% 的账本随你查。</p>
              <span className="go">AI 设施设备服务 <Arrow s={13} /></span>
            </Link>
            <Link className="cs-src__card reveal" href="/ai-service/security">
              <span className="lb">数据来源 · 安保</span>
              <h3>每一条预警的处置下文</h3>
              <p>预警看完没有、消防巡到没有——每一条都有记录。</p>
              <span className="go">AI 安保服务 <Arrow s={13} /></span>
            </Link>
          </div>
          <div className="avc-cases" style={{ marginTop: 34 }}>
            <Link className="avc-case on-light reveal" href="/cases/30w-park-ai-property-manager-robot">
              <span className="tag">智慧园区 · 约 30 万㎡</span>
              <h3>物业相关投诉，下降超过 80%</h3>
              <p>管家秒回、工单闭环、进展主动同步——投诉少了，不是嗓门小了，是事真的被办了。</p>
              <span className="go">看这个项目 <Arrow s={13} /></span>
            </Link>
            <Link className="avc-case on-light reveal" href="/cases/aipm-property-ai-transformation">
              <span className="tag">爱物管 · 自营项目</span>
              <h3>先给自己的客户配上管家</h3>
              <p>每一个能力都先用在自己身上:被住户问、被企业问、被随便问——经得起,再对外。</p>
              <span className="go">看爱物管的故事 <Arrow s={13} /></span>
            </Link>
          </div>
        </div>
      </section>

      {/* 谁在为你服务 · 爱物管 */}
      <section className="av-band">
        <div className="wrap">
          <span className="av-eyebrow reveal">谁在为你服务</span>
          <h2 className="av-h2 reveal">先用在自己身上，再对外提供</h2>
          <div className="avc-who reveal">
            <div className="avc-who__brand">
              <span className="nm">爱物管</span>
              <span className="en">AIPM</span>
              <span className="rel">启盟科技旗下<br />自营物业公司</span>
            </div>
            <div className="avc-who__body">
              <p>
                2019 年，为了把 AI 真正做进物业，我们自己开了一家物业公司：装传感器、跑工单、面对投诉，把每一个 AI 能力先用在自己身上，再对外提供服务。它自己的账本——<b>管理层 69 → 5 人，净利率 3.4% → 14%</b>——就是这套服务方式最直接的证据。
              </p>
              <div className="avc-who__links">
                <Link className="av-link" href="/cases/aipm-property-ai-transformation">看爱物管自己的故事 <Arrow s={13} /></Link>
                <Link className="av-link" href="/company">关于启盟科技 <Arrow s={13} /></Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 三种合作方式 */}
      <section className="av-band mist">
        <div className="wrap">
          <span className="av-eyebrow reveal">三种合作方式</span>
          <h2 className="av-h2 reveal">按你的情况，选一种开始</h2>
          <div className="avc-modes">
            <article className="avc-mode reveal">
              <span className="lab">方式一 · 全委服务</span>
              <h3>物业服务整体交给爱物管</h3>
              <p>清洁、设施设备、安保与客服一体交付，每一位客户配专属管家。响应速度与工单办结写进合同，按数据结算。</p>
              <span className="who"><b>适合：</b>想整体换一种物业服务方式的业主</span>
            </article>
            <article className="avc-mode reveal">
              <span className="lab">方式二 · 顾问驻场</span>
              <h3>你的团队留下，换管理方式</h3>
              <p>我们派驻项目顾问，带全套 AI 产品进场，参与管理与考核。服务期至少一年。</p>
              <span className="who"><b>适合：</b>现有团队不想动、但想让客户体验和透明度上一个台阶的业主</span>
            </article>
            <article className="avc-mode reveal">
              <span className="lab">方式三 · 产品与平台</span>
              <h3>把这套能力接进你的交付</h3>
              <p>你是物业公司？专属客服管家、工单自动闭环与数据透明入口，都可以接进你自己的项目。</p>
              <span className="who"><b>入口：</b><Link className="av-link" href="/products/fmclaw" style={{ fontSize: 13 }}>FMClaw™ AI 平台 <Arrow s={12} /></Link></span>
            </article>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <SeoFaq heading="关于 AI 客服管家，问得最多的" items={faq} />

      {/* 尾部 CTA */}
      <section className="avc-end">
        <div className="avc-end__glow" aria-hidden="true" />
        <div className="wrap">
          <h2 className="reveal">下一次，随便问你的物业</h2>
          <p className="reveal">
            给你的项目配一位专属 AI 客服管家——秒回、闭环、什么都答得上来。先聊聊你的项目，我们把方案和账一起摆给你看。
          </p>
          <div className="av-cta reveal">
            <Link href="/contact" className="btn btn-primary">联系我们 <Arrow /></Link>
            <span className="alt">或先看 <Link href="/solutions/customer">客服 Claw 智能体</Link></span>
          </div>
        </div>
      </section>
    </main>
  );
}
