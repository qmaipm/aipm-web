// 全站导航与路由配置（锁定结构 A9）。第二期未建页面暂指向最近的核心页。

export type DropItem = { label: string; href: string; small?: string; links?: { label: string; href: string }[] };
export type DropGroup = { heading?: string; items: DropItem[] };
export type MenuItem = {
  label: string;
  href?: string;
  groups?: DropGroup[];
  minWidth?: number;
};

export const MENU: MenuItem[] = [
  {
    label: "产品",
    minWidth: 360,
    groups: [
      {
        heading: "FMClaw™ 智能体平台",
        items: [
          { label: "FMClaw™ 产品总览", href: "/products/fmclaw", small: "物业与设施管理的生产级 AI 智能体平台" },
          { label: "行业数据本体", href: "/products/fmclaw/ontology", small: "统一业务对象、指标口径与数据权限" },
          { label: "工作流引擎", href: "/products/fmclaw/workflow-engine", small: "让业务流程稳定、可复制地运行" },
          { label: "工具箱", href: "/products/fmclaw/connectors", small: "把在用的软件接为智能体可调用的工具" },
          { label: "控制台", href: "/products/fmclaw/agent-runtime", small: "智能体的身份、权限、运行和记录" },
          { label: "第三方平台 AI 协同", href: "/products/fmclaw/connectors#platforms", small: "钉钉、飞书、企业微信，不替换只接入" },
        ],
      },
      {
        heading: "IoT 与机器人",
        items: [
          { label: "IoT 物理世界感知", href: "/products/iot", small: "让现场状态成为 AI 可用的数据" },
          { label: "机器人与智能装备", href: "/products/robots", small: "把管理指令转化为现场执行" },
        ],
      },
    ],
  },
  {
    label: "智能体解决方案",
    href: "/agents",
    minWidth: 320,
    groups: [
      {
        heading: "解决方案总览",
        items: [
          { label: "物业管理智能体矩阵", href: "/agents", small: "四个智能体，覆盖从服务设计到持续优化的完整管理过程" },
        ],
      },
      {
        heading: "四个行业智能体",
        items: [
          { label: "服务设计智能体", href: "/solutions/service-design" },
          { label: "运营管理智能体", href: "/solutions/operations" },
          { label: "质量评估智能体", href: "/solutions/assessment" },
          { label: "服务优化智能体", href: "/solutions/optimization" },
        ],
      },
      {
        heading: "业务解决方案",
        items: [
          { label: "人员成本优化", href: "/solutions/cost" },
          { label: "服务质量管理", href: "/solutions/quality" },
          { label: "客户服务", href: "/solutions/customer" },
          { label: "服务分包管理", href: "/solutions/subcontract" },
          { label: "设备巡检管理", href: "/solutions/inspection" },
          { label: "人员薪酬管理", href: "/solutions/payroll" },
          { label: "采购管理", href: "/solutions/procurement" },
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
          { label: "生态伙伴（总览）", href: "/partners", small: "我们做产品和平台，伙伴赢市场" },
        ],
      },
      {
        heading: "合作方向",
        items: [
          { label: "智能体园区伙伴", href: "/partners/agent-park", small: "智能体园区招标，带着 FMClaw 去应" },
          { label: "行业智能体伙伴计划", href: "/partners/program", small: "Refer · Sell · Deliver · Build 四种路径" },
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
      { label: "FMClaw™ 产品总览", href: "/products/fmclaw" },
      { label: "行业数据本体", href: "/products/fmclaw/ontology" },
      { label: "工作流引擎", href: "/products/fmclaw/workflow-engine" },
      { label: "工具箱", href: "/products/fmclaw/connectors" },
      { label: "控制台", href: "/products/fmclaw/agent-runtime" },
      { label: "第三方平台 AI 协同", href: "/products/fmclaw/connectors#platforms" },
      { label: "IoT 物理世界感知", href: "/products/iot" },
      { label: "机器人与智能装备", href: "/products/robots" },
    ],
  },
  {
    title: "AI 物业服务",
    links: [
      { label: "AI 物业服务总览", href: "/ai-service" },
      { label: "AI 清洁服务", href: "/ai-service/cleaning" },
      { label: "AI 设施设备服务", href: "/ai-service/facility" },
      { label: "AI 安保服务", href: "/ai-service/security" },
      { label: "AI 客服管家", href: "/ai-service/customer-service" },
    ],
  },
  {
    title: "智能体解决方案",
    links: [
      { label: "物业管理智能体矩阵", href: "/agents" },
      { label: "服务设计智能体", href: "/solutions/service-design" },
      { label: "运营管理智能体", href: "/solutions/operations" },
      { label: "质量评估智能体", href: "/solutions/assessment" },
      { label: "服务优化智能体", href: "/solutions/optimization" },
      { label: "客户案例", href: "/cases" },
    ],
  },
  {
    title: "共建与公司",
    links: [
      { label: "FMClaw™ 加速营", href: "/workshop" },
      { label: "人工智能产业共建", href: "/cobuild" },
      { label: "生态伙伴", href: "/partners" },
      { label: "关于启盟科技 / 团队", href: "/company" },
      { label: "行业研究", href: "/insights" },
    ],
  },
  {
    title: "联系",
    links: [
      { label: "商务合作", href: "/contact" },
      { label: "招商 / 国资对接", href: "/contact" },
      { label: "加入我们", href: "/contact" },
      { label: "公众号", href: "/contact" },
    ],
  },
];
