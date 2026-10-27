// 全站导航与路由配置（锁定结构 A9）。第二期未建页面暂指向最近的核心页。

// 核心产品 FMClaw 的独立产品域名（登录/进入产品）。域名切换时只改这一处。
export const FMCLAW_URL = "https://www.fmclaw.cn";

export type DropItem = { label: string; href: string; small?: string; links?: { label: string; href: string }[] };
export type DropGroup = { heading?: string; items: DropItem[] };
export type MenuItem = {
  label: string;
  href?: string;
  groups?: DropGroup[];
  minWidth?: number;
  // 多列下拉：首个无标题分组（总览）与末尾分组（查看全部）横跨整行，中间 cols 个分组并排
  cols?: number;
};

export const MENU: MenuItem[] = [
  {
    label: "产品",
    minWidth: 360,
    groups: [
      {
        heading: "FMClaw™ 智能体平台",
        items: [
          { label: "AI 物业经理 · FMClaw™", href: "/products/fmclaw", small: "让项目的管理工作自己运转" },
          { label: "项目大脑", href: "/products/fmclaw/ontology", small: "行业数据本体 · 国内首个物业行业模型" },
          { label: "工作流引擎", href: "/products/fmclaw/workflow-engine", small: "让项目管理工作自动跑完" },
          {
            label: "工具箱 · AI 物业管理系统", href: "/products/fmclaw/connectors",
            links: [
              { label: "业主小程序与工单", href: "/products/fmclaw/connectors/owner" },
              { label: "收费", href: "/products/fmclaw/connectors/billing" },
              { label: "停车", href: "/products/fmclaw/connectors/parking" },
              { label: "门禁访客", href: "/products/fmclaw/connectors/access" },
              { label: "楼宇自控", href: "/products/fmclaw/connectors/building" },
            ],
          },
          { label: "控制台", href: "/products/fmclaw/agent-runtime", small: "权限、运行、审计与人工接管" },
        ],
      },
      {
        heading: "IoT 与机器人",
        items: [
          { label: "IoT 物理世界感知", href: "/products/iot", small: "让现场状态成为 AI 可用的数据" },
          { label: "机器人与智能装备", href: "/products/robots", small: "把管理指令转化为现场执行" },
        ],
      },
      {
        items: [{ label: "价格", href: "/pricing", small: "个人免费 · 项目团队版 19,800 元起" }],
      },
    ],
  },
  {
    label: "智能体解决方案",
    href: "/agents",
    minWidth: 760,
    cols: 3,
    // 2026-10-13：菜单只放搜索与 AI 提问最多的 5 个方案（百度联想 + GEO 监测题排序）+ 4 个智能体；
    // 其余方案在 /solutions 总览、页脚与方案间互链里承接，不删页。
    // 2026-10-13：/agents 动画总览保留为菜单根与首项；/solutions 为按业务目标的全量列表。
    groups: [
      {
        items: [
          { label: "物业管理智能体矩阵（总览）", href: "/agents", small: "四个智能体群，从服务设计、运营管理、质量评估到服务优化" },
        ],
      },
      {
        // 2026-10-27：加「按系统找」列（docs/PRODUCT-SYSTEMS.md）：用户先找「要买的系统」，再看「要达成的目标」。
        heading: "按系统找",
        items: [
          { label: "业主小程序与物业工单", href: "/products/fmclaw/connectors/owner" },
          { label: "物业收费系统", href: "/products/fmclaw/connectors/billing" },
          { label: "停车场管理系统", href: "/products/fmclaw/connectors/parking" },
          { label: "门禁与访客管理", href: "/products/fmclaw/connectors/access" },
          { label: "楼宇自控与设备能耗", href: "/products/fmclaw/connectors/building" },
        ],
      },
      {
        heading: "按业务目标",
        items: [
          { label: "降本增效与人员成本", href: "/solutions/cost" },
          { label: "服务品质管理", href: "/solutions/quality" },
          { label: "设备巡检管理", href: "/solutions/inspection" },
          { label: "报事报修与投诉", href: "/solutions/customer" },
          { label: "集团智能问数", href: "/solutions/ask-data" },
        ],
      },
      {
        heading: "四个智能体群",
        items: [
          { label: "服务设计智能体群", href: "/solutions/service-design", small: "服务标准 · 人员编制 · 项目预算" },
          { label: "运营管理智能体群", href: "/solutions/operations", small: "现场感知 · 审批 · 调度派单" },
          { label: "质量评估智能体群", href: "/solutions/assessment", small: "保洁质检 · 拍照抄表 · 隐患识别" },
          { label: "服务优化智能体群", href: "/solutions/optimization", small: "报告 · 复盘 · 结算" },
        ],
      },
      {
        items: [
          { label: "查看全部 14 个解决方案 →", href: "/solutions", small: "分包、采购、对账、薪酬、数据治理等" },
        ],
      },
    ],
  },
  {
    label: "AI 物业服务",
    href: "/ai-service",
    minWidth: 300,
    groups: [
      {
        items: [
          { label: "AI 物业服务（总览）", href: "/ai-service", small: "换物业，先换一种方式" },
        ],
      },
      {
        heading: "合作模式",
        items: [
          { label: "物业委托管理", href: "/ai-service/delegated-operation", small: "像酒管公司管酒店一样 · 您拥有，我们经营" },
        ],
      },
      {
        heading: "四大工种",
        items: [
          { label: "AI 清洁服务", href: "/ai-service/cleaning", small: "干没干，数据会说话" },
          { label: "AI 设施设备服务", href: "/ai-service/facility", small: "每一次巡检，都真实发生" },
          { label: "AI 安保服务", href: "/ai-service/security", small: "人看不过来的，交给 AI 看" },
          { label: "AI 客服管家", href: "/ai-service/customer-service", small: "站在你这边的物业管家" },
        ],
      },
    ],
  },
  { label: "客户案例", href: "/cases" },
  {
    label: "FMClaw™ 加速营",
    href: "/workshop",
    minWidth: 300,
    groups: [
      {
        items: [
          { label: "FMClaw™ 加速营（总览）", href: "/workshop", small: "把你自己的 AI，亲手搭出来" },
        ],
      },
      {
        heading: "四种服务形式",
        items: [
          { label: "Demo Day", href: "/workshop/demo-day", small: "半天–1 天 · 眼见为实" },
          { label: "加速营 · Bootcamp", href: "/workshop/bootcamp", small: "2–3 天 · 亲手搭出来" },
          { label: "AI 应用创新大赛", href: "/workshop/competition", small: "2–4 周 · 以赛促用" },
          { label: "FDE 服务", href: "/workshop/fde", small: "按阶段交付 · 落地到系统" },
        ],
      },
    ],
  },
  { label: "人工智能产业共建", href: "/cobuild" },
  {
    label: "生态伙伴",
    href: "/partners",
    minWidth: 320,
    groups: [
      {
        items: [
          { label: "生态伙伴（总览）", href: "/partners", small: "技术、项目开发与真实场景合作" },
        ],
      },
      {
        heading: "合作方向",
        items: [
          { label: "物业委托管理发展伙伴", href: "/partners/delegated-operation", small: "酒店开发 / 选址 / 经纪 · 报备保护 · 持续分润" },
          { label: "智能体园区伙伴", href: "/partners/agent-park", small: "智能体园区招标，带着 FMClaw 去应" },
          { label: "行业智能体伙伴计划", href: "/partners/program", small: "Refer · Sell · Deliver · Build 四种路径" },
          { label: "具身智能与物理 AI 数据合作", href: "/partners/embodied-ai-data", small: "第一视角数据 · 环境语义 · 实训场" },
        ],
      },
    ],
  },
  {
    label: "公司",
    groups: [
      {
        items: [
          { label: "关于启盟科技", href: "/company" },
          { label: "启盟的秘密蓝图", href: "/company/master-plan" },
          { label: "团队", href: "/team" },
          { label: "新闻动态", href: "/news" },
          { label: "行业研究", href: "/insights" },
          { label: "联系我们", href: "/contact" },
        ],
      },
    ],
  },
];

export const FOOTER_COLS: { title: string; links: DropItem[] }[] = [
  {
    title: "产品",
    links: [
      { label: "AI 物业经理 FMClaw™", href: "/products/fmclaw" },
      { label: "项目大脑", href: "/products/fmclaw/ontology" },
      { label: "工作流引擎", href: "/products/fmclaw/workflow-engine" },
      { label: "AI 物业管理系统（工具箱）", href: "/products/fmclaw/connectors" },
      { label: "业主小程序与工单", href: "/products/fmclaw/connectors/owner" },
      { label: "物业收费系统", href: "/products/fmclaw/connectors/billing" },
      { label: "停车场管理系统", href: "/products/fmclaw/connectors/parking" },
      { label: "门禁与访客管理", href: "/products/fmclaw/connectors/access" },
      { label: "楼宇自控与设备", href: "/products/fmclaw/connectors/building" },
      { label: "控制台", href: "/products/fmclaw/agent-runtime" },
      { label: "IoT 物理世界感知", href: "/products/iot" },
      { label: "机器人与智能装备", href: "/products/robots" },
      { label: "价格", href: "/pricing" },
      { label: "登录 FMClaw →", href: FMCLAW_URL },
    ],
  },
  {
    title: "AI 物业服务",
    links: [
      { label: "AI 物业服务总览", href: "/ai-service" },
      { label: "物业委托管理", href: "/ai-service/delegated-operation" },
      { label: "AI 清洁服务", href: "/ai-service/cleaning" },
      { label: "AI 设施设备服务", href: "/ai-service/facility" },
      { label: "AI 安保服务", href: "/ai-service/security" },
      { label: "AI 客服管家", href: "/ai-service/customer-service" },
    ],
  },
  {
    title: "解决方案",
    links: [
      { label: "全部解决方案", href: "/solutions" },
      { label: "降本增效与人员成本", href: "/solutions/cost" },
      { label: "服务品质管理", href: "/solutions/quality" },
      { label: "设备巡检管理", href: "/solutions/inspection" },
      { label: "报事报修与投诉", href: "/solutions/customer" },
      { label: "人员薪酬管理", href: "/solutions/payroll" },
      { label: "服务分包管理", href: "/solutions/subcontract" },
      { label: "供应商管理与自动对账", href: "/solutions/vendor" },
      { label: "采购管理", href: "/solutions/procurement" },
      { label: "物业智能问数", href: "/solutions/ask-data" },
      { label: "物业数据治理", href: "/solutions/data-governance" },
    ],
  },
  {
    title: "智能体",
    links: [
      { label: "物业管理智能体矩阵", href: "/agents" },
      { label: "服务设计智能体群", href: "/solutions/service-design", small: "服务标准 · 人员编制 · 项目预算" },
      { label: "运营管理智能体群", href: "/solutions/operations", small: "现场感知 · 审批 · 调度派单" },
      { label: "质量评估智能体群", href: "/solutions/assessment", small: "保洁质检 · 拍照抄表 · 隐患识别" },
      { label: "服务优化智能体群", href: "/solutions/optimization", small: "报告 · 复盘 · 结算" },
      { label: "客户案例", href: "/cases" },
    ],
  },
  {
    title: "共建与公司",
    links: [
      { label: "FMClaw™ 加速营", href: "/workshop" },
      { label: "人工智能产业共建", href: "/cobuild" },
      { label: "生态伙伴", href: "/partners" },
      { label: "委托管理发展伙伴", href: "/partners/delegated-operation" },
      { label: "具身智能数据合作", href: "/partners/embodied-ai-data" },
      { label: "关于启盟科技", href: "/company" },
      { label: "新闻动态", href: "/news" },
      { label: "行业研究", href: "/insights" },
    ],
  },
  {
    title: "联系",
    links: [
      { label: "商务合作", href: "/contact" },
      { label: "招商 / 国资对接", href: "/contact" },
      { label: "加入我们", href: "/contact" },
      { label: "团队", href: "/team" },
    ],
  },
];
