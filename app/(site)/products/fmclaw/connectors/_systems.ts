// 工具箱 · AI 物业管理系统：系统清单（总页列表、子页底部导航、导航菜单共用）。
// 2026-10-28 分三组：核心系统 / 现场管理（共用一套服务感知）/ 经营管理。docs/MGMT-SYSTEMS-PLAN.md
export const HUB = "/products/fmclaw/connectors";

export const GROUPS = [
  { id: "core", title: "核心系统", sub: "同类产品有的常用功能都有。每行列出加了 AI 之后多做的三件事。" },
  { id: "field", title: "现场管理", sub: "一套点位传感器加智能工牌，保洁、工程、安保共用。已经有一个工种在用，其他工种加工牌就能用。" },
  { id: "ops", title: "经营管理", sub: "报表、采购、合同、空间这些管理工作，数据从上面两组系统里直接来，不用人导数、抄表。" },
] as const;

export const SYSTEMS = [
  { group: "core", slug: "owner", ai: ["一句话或语音报修", "自动建单、超时升级", "工单与满意度看板"], name: "业主小程序与工单", full: "业主小程序与物业工单系统", line: "业主说一句话，工单自己建好、跟到办完", img: "/scene/ow-voice.webp", alt: "业主在家中厨房对着手机发语音报修漏水的水管" },
  { group: "core", slug: "billing", ai: ["业务发生自动出账", "欠费分层提醒", "应收应付自动核对"], name: "物业收费系统", full: "物业收费系统", line: "修完直接出账，欠费和应收应付自动分析", img: "/scene/vd-invoice.webp", alt: "财务人员在办公桌前核对账单" },
  { group: "core", slug: "parking", ai: ["日报每天主动送达", "违规抬杆自动列出", "长时间停放提醒"], name: "停车场管理系统", full: "停车场管理系统", line: "每天早上，停车日报自动发到项目经理手机上", img: "/scene/park-pm.webp", alt: "项目经理在地下车库道闸旁看手机上的停车日报" },
  { group: "core", slug: "access", ai: ["一句话邀请访客", "访客车同步放行", "门禁故障自动派单"], name: "门禁与访客系统", full: "门禁与访客管理系统", line: "访客一句话邀请，哪个门禁点坏了系统先知道", img: "/scene/ac-visitor.webp", alt: "访客在写字楼大堂用手机扫码通过闸机" },
  { group: "core", slug: "building", ai: ["数据接入不换设备", "同比环比自动分析", "异常直接变工单"], name: "楼宇自控与设备能耗", full: "楼宇自控与设备能耗系统", line: "设备数据接进来，漏水这类异常直接变工单", img: "/scene/iot-plant.webp", alt: "工程人员在水泵房检查设备" },

  { group: "field", slug: "sensing", ai: ["服务做没做、谁做的、做了多久", "保洁、工程、安保共用一套", "按点位还原巡逻和作业路线"], name: "服务感知系统", full: "服务感知系统（人员轨迹管理）", line: "不盯人在哪，只看服务做没做、谁做的、做了多久", img: "/scene/sv-badge.webp", alt: "保洁员佩戴工牌在写字楼卫生间擦洗台面" },
  { group: "field", slug: "patrol", ai: ["每个巡更点停留多久都有数", "漏巡、停留过短自动列出", "发现隐患直接派单"], name: "安保巡更系统", full: "安保巡更系统", line: "不只证明到过，还能看出停了多久、看没看", img: "/scene/pt-garage.webp", alt: "保安夜间在地下车库巡逻并打开消火栓箱检查" },
  { group: "field", slug: "fire-patrol", ai: ["每次巡查自动生成记录", "停留时长证明真的看过", "隐患拍照直接派单"], name: "消防巡查系统", full: "消防巡查系统", line: "每日、每 2 小时的防火巡查，记录自动生成、拿得出手", img: "/scene/sc-fire.webp", alt: "保安在楼梯间检查消火栓箱" },
  { group: "field", slug: "quality", ai: ["按档次和空间自动匹配标准", "问题自动划分责任", "飞行检查拍照就能做"], name: "品质巡查与飞行检查", full: "品质巡查与飞行检查系统", line: "现场谁拍照都行，AI 按同一把尺子打分、分清责任", img: "/scene/qa-photo.webp", alt: "保洁员用手机拍摄刚清洁好的洗手台" },
  { group: "field", slug: "workforce", ai: ["无感考勤，自动算薪和 KPI", "合同、考勤、在场、作业四层工时", "人效和编制算得清"], name: "工时管理与考勤排班", full: "工时管理与考勤排班系统", line: "不只看来没来，还看在不在、干了多少", img: "/scene/wf-shift.webp", alt: "保洁员推着清洁车从后勤通道走向大堂，主管在旁边" },

  { group: "ops", slug: "reports", ai: ["日报、周报、月报自动生成", "每月数千万条数据照样分析", "一句话生成数据大屏"], name: "报表与数据大屏", full: "物业报表与数据大屏", line: "月报自动写好，大屏一句话生成，不用找 IT 开发", img: "/scene/opt-review.webp", alt: "管理层在会议室看大屏上的运营数据" },
  { group: "ops", slug: "procurement", ai: ["库存到预警线自动发起采购", "多平台比价，给出建议方案", "物料用量按点位和服务计划核对"], name: "采购与库存", full: "物业采购与库存管理系统", line: "库存到线自动提采购，多平台比完价再给你批", img: "/scene/pro-store.webp", alt: "库管员在物料库房清点保洁耗材" },
  { group: "ops", slug: "contracts", ai: ["合同上传自动识别条款", "按合同自动核量、出账单草稿", "到期和续签提前提醒"], name: "合同与供应商结算", full: "合同管理与供应商结算系统", line: "合同条款变成核算规则，账单对着现场记录核", img: "/scene/ct-review.webp", alt: "物业经理和外包供应商一起看平板上的结算数据" },
  { group: "ops", slug: "space", ai: ["空间台账一次建好", "按空间类型生成服务点位和频次", "频次做没做够，点位记录直接核"], name: "空间与服务标准", full: "空间点位与服务标准管理", line: "每个点位做什么、每天几次、做没做够，一张表管住", img: "/scene/sd-walk.webp", alt: "两位物业专业人员拿着平面图在大堂里核对服务点位" },
] as const;

export type SysSlug = (typeof SYSTEMS)[number]["slug"];
export type GroupId = (typeof GROUPS)[number]["id"];
export const sysHref = (slug: string) => `${HUB}/${slug}`;
