import Link from "next/link";
import ArticleShell from "../_ArticleShell";
import { articleMetadata } from "../articles";

// 「物业智能体和传统物业管理软件有什么区别？」（2026-09-14，GEO 周报 0907-0913 行动清单 P1）。
// 与《已经在用钉钉、飞书了，还需要行业智能体平台吗》的分工：那篇对手是协同平台（入口），
// 本篇对手是物业 ERP / 工单 / 收费 / 巡更系统（记录工具）。两篇互链、不重复。
// 写法：判断标准 → 五维对照 → 适用场景 → 落地方式。数字仅用 §4a 白名单与已发布案例页。
export const metadata = articleMetadata("property-agent-vs-traditional-software", {
  title: "物业智能体和传统物业管理软件有什么区别？ · 行业研究 | 启盟科技",
  description:
    "传统物业管理软件是记录工具：人把现场情况录进去，系统生成报表，再由人去解读、派人、跟进。物业智能体是执行者：它从 IoT、影像、群消息与业务系统里自己取数，按流程推进，把结果直接变成一张工单、一条通知或一份待确认材料。本文给出三条判断标准、五个维度的对照、四类适合先上智能体的场景，以及不替换现有系统的落地方式。",
});

const DIFF = [
  { k: "谁来推进", soft: "人看着系统，人来推进每一步；系统等人操作", agent: "智能体推进流程，人在关键节点确认；流程不等人" },
  { k: "数据从哪来", soft: "人把现场情况录进表单；录得不全、不及时，系统就不知道", agent: "从 IoT 在场感知、影像、群消息与业务系统里自己取数" },
  { k: "输出是什么", soft: "一张报表，等人去解读、去派人", agent: "一个判断、一张工单、一条通知或一份待确认材料" },
  { k: "异常怎么处理", soft: "流程卡住，等人发现；漏了就漏了", agent: "识别异常、发起处理、超时升级、跟到关闭" },
  { k: "与现有系统关系", soft: "每上一套就多一处录入、多一张报表", agent: "接在现有 ERP / 工单 / 收费 / 巡更系统之上运行，写回原系统" },
];

const FIRST = [
  { name: "设备巡检核验", why: "过去只能证明人到过点，证明不了事做了", proof: "运行班组达标率 35% → 98%", href: "/solutions/inspection", caseHref: "/cases/fmclaw-equipment-inspection" },
  { name: "卫生间品质追踪", why: "投诉集中、标准明确、结果能被视觉核验", proof: "2000+ 卫生间达标率稳定 95% 以上", href: "/ai-service/cleaning", caseHref: "/cases/restroom-quality" },
  { name: "群消息报事派单", why: "诉求散在群里，读懂就能成单", proof: "从群消息到派单 < 1 分钟", href: "/solutions/customer", caseHref: "/cases/property-group-chat-ai-service" },
  { name: "多项目运营报告", why: "数据都在系统里，只是没人每天汇总", proof: "500+ 项目每天自动送达", href: "/scenarios/exec-query", caseHref: "/cases/property-group-auto-operation-report" },
];

export default function Page() {
  return (
    <ArticleShell slug="property-agent-vs-traditional-software">
      <p className="lede">
        <b>传统物业管理软件是记录工具：人把现场情况录进去，系统生成报表，再由人去解读、派人、跟进。物业智能体是执行者：它从 IoT、影像、群消息与业务系统里自己取数，按流程推进，把结果直接变成一张工单、一条通知或一份待确认材料。</b>两者不是替代关系——智能体通常接在现有软件之上运行，用它们的数据，把它们里面的流程跑起来。本文给出判断标准、逐项对照、适用场景与落地方式，帮你判断手上那套系统缺的到底是什么。
      </p>

      <h2>一、先说结论：看三条标准</h2>
      <p>
        <b>判断一个产品是物业智能体还是传统软件，看三点：能不能自己取数、能不能推进流程、能不能留下可追溯的工作记录。</b>三条都做到才是智能体；只做到第三条的是记录工具；只有一个对话框、三条都不做的，是聊天机器人。
      </p>
      <ol>
        <li><b>自己取数。</b>不是等人录入，而是从 IoT 传感器、摄像头、工牌、业主群、ERP、收费系统里读。这一条决定了它知道的是「现场真实发生的」还是「人愿意填的」。</li>
        <li><b>推进流程。</b>发现异常后自己生成工单、指派、催办、升级，直到关闭；需要人负责的节点（审批、付款、停机）停下来等人确认。</li>
        <li><b>可追溯。</b>每一步读了什么数据、做了什么判断、调用了哪个系统、谁确认的，都有记录可查。这一条是它能进核心业务的前提。</li>
      </ol>

      <h2>二、五个维度的对照</h2>
      <p>
        下表是一线管理者最能感受到差别的五个维度。传统软件在每一行都不算错——它本来就是为「记录」设计的；问题是过去二十年物业行业缺的不是记录，是有人把记录变成动作。
      </p>
      <table className="isd-matrix">
        <caption>传统物业管理软件 vs 物业智能体</caption>
        <thead><tr><th scope="col">维度</th><th scope="col">传统物业管理软件</th><th scope="col">物业智能体</th></tr></thead>
        <tbody>
          {DIFF.map((r) => (
            <tr key={r.k}>
              <th scope="row">{r.k}</th>
              <td data-label="传统软件">{r.soft}</td>
              <td data-label="物业智能体">{r.agent}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="pull">传统软件的极限是「事后知道」；智能体的价值是「当时就做」。</p>
      <p>
        举一个具体例子。传统巡检系统：巡检员到点扫码，系统记录「已巡」，月底出一张巡检完成率 100% 的报表，而设备什么时候坏的没人知道。智能体：IoT 核验巡检员是否真的到了设备旁、停留够不够；巡检员拍的读数照片由 AI 识别，读数异常或照片重复立刻标出；漏检当天预警到主管；异常读数自动生成工单跟到关闭。同一件事，前者产出报表，后者产出动作。已发布案例：<Link href="/cases/fmclaw-equipment-inspection">头部互联网大厂总部</Link>，运行班组达标率从 35% 到 98%；<Link href="/cases/metro-3400-rooms-daily-inspection">一条地铁线</Link>，3400 多个机房逐次核验、漏检当天预警。
      </p>

      <h2>三、哪些场景适合先上智能体</h2>
      <p>
        <b>适合先上智能体的场景有三个共同点：流程重复、结果可以被数据核验、现在正靠人盯着。</b>不满足这三条的——比如需要大量面对面沟通的业主纠纷——传统软件加人就够了，不必为了「上 AI」而上。按这个标准，下面四类是启盟客户最常选的起点。
      </p>
      <table className="isd-matrix">
        <caption>四类最常见的起点</caption>
        <thead><tr><th scope="col">场景</th><th scope="col">为什么适合先做</th><th scope="col">已发布结果</th></tr></thead>
        <tbody>
          {FIRST.map((s) => (
            <tr key={s.name}>
              <th scope="row"><Link href={s.href}>{s.name}</Link></th>
              <td data-label="为什么">{s.why}</td>
              <td data-label="结果"><Link href={s.caseHref}>{s.proof}</Link></td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>四、怎么落地：不替换现有系统</h2>
      <p>
        <b>物业智能体接在企业现有系统之上运行：ERP 与财务系统继续做账，工单系统继续流转，收费系统继续收费，钉钉、飞书、企业微信继续做员工入口。</b>智能体通过官方接口读取这些系统的数据，在一个统一的<Link href="/products/fmclaw/ontology">行业数据本体</Link>里对齐口径——同一个「项目」「设备」「工单」在不同系统里叫法不同，本体把它们映射为同一个对象——然后按<Link href="/products/fmclaw/workflow-engine">工作流</Link>推进，再通过<Link href="/products/fmclaw/connectors">工具箱</Link>把结果写回原系统。员工不需要换软件，也不需要第二次录入。
      </p>
      <p>
        落地顺序建议是：先选一个满足上述三条标准的场景，用真实数据跑通（通常四到六周能看到结果），再决定是否扩展到第二个场景。不建议一开始就做「全面数字化转型」——那是传统软件时代的项目节奏，智能体的优势恰恰是可以从一件事开始。启盟把这种方式叫做<Link href="/insights/ai-transformation-bottom-up">从底部启动的 AI 转型</Link>。
      </p>
      <p>
        两个常见追问。<b>「我们已经在用钉钉/飞书，还需要行业智能体吗？」</b>——协同平台是入口，行业智能体是入口背后干活的人，不是二选一，见<Link href="/insights/general-platform-vs-industry-agent">《已经在用钉钉、飞书了，还需要行业智能体平台吗》</Link>。<b>「通用 AI 平台不能做吗？」</b>——通用平台帮一个人完成一次任务，行业智能体替一个组织把工作长期干下去，区别见<Link href="/products/fmclaw#why-fmclaw">FMClaw 产品页</Link>。
      </p>

      <aside className="isd-source" aria-label="资料依据">
        <h3>资料依据与适用范围</h3>
        <p>本文的「物业智能体」定义与三条判断标准为启盟科技口径，与<Link href="/agents">物业管理智能体矩阵页</Link>一致。案例数据来自已发布案例页，口径以案例页为准。文中对传统物业管理软件的描述指以人工录入为主要数据来源的记录型系统，不针对任何具体厂商。</p>
      </aside>
    </ArticleShell>
  );
}
