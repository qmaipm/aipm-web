import Link from "next/link";
import NewsShell from "../_NewsShell";
import { newsMetadata } from "../articles";

export const metadata = newsMetadata("beyond-expo-2026");

export default function Page() {
  return (
    <NewsShell slug="beyond-expo-2026">
      <p className="lede">
        5 月 27–30 日,亚洲规模最大的科技创新展会 BEYOND Expo 2026 在澳门威尼斯人金光会展中心举行,逾 3 万名观众、1200 余家企业参展。启盟科技作为 NVIDIA Inception 成员企业携 FMClaw™ 亮相。本届大会的主题是「AI: Digital to Physical——从数字走向物理世界」,而这正是我们在做的事。
      </p>

      <h2>设施管理行业的 AI 操作系统</h2>
      <p>
        传统设施管理长期受制于服务盲区、预算损耗、质检覆盖不足与信息滞后——本质上是「人盯人」管理手段的物理天花板。展会现场,启盟科技重点呈现了 FMClaw™ 如何用「数据 + AI」重构设施管理的运转方式:IoT 全域感知网络与四个协同工作的 AI Agent(服务设计、运营管理、质量评估、服务优化),形成从标准制定、任务执行、质量评估到持续优化的自动化闭环。
      </p>
      <p className="pull">让每一笔支出可见、每一次服务可证、每一个决策有据。</p>

      <h2>吸引观众驻足的,是落地数据</h2>
      <p>
        启盟科技自 2019 年起亲自下场运营物业公司,服务过腾讯、特斯拉、字节跳动、顺丰、索迪斯、WeWork 等企业的真实项目:
      </p>
      <ul className="statrow">
        <li><b>2000万㎡</b><span>累计覆盖管理面积</span></li>
        <li><b>20万G</b><span>结构化行业数据资产</span></li>
        <li><b>10万+</b><span>在线 IoT 传感器</span></li>
        <li><b>4亿条</b><span>日均新增数据记录</span></li>
      </ul>
      <p>
        在华南某 6 万平方米综合项目中,FMClaw™ 落地后团队减少 50%、管理岗从 6 人降至 1 人、IoT 覆盖率 100%、住户缴费率 99%——高出行业平均约 28 个百分点。这个项目的完整故事见<Link href="/cases/south-china-mixed-use-6-to-1">案例详情</Link>。
      </p>

      <h2>资本与资质</h2>
      <p>
        启盟科技获蓝驰创投、微光创投等机构持续支持;已获国家高新技术企业、专精特新企业认定,入选大湾区具身智能图谱及广州市「人工智能+」示范应用案例,拥有近百项发明专利与软著。投资方看重的,正是 AI 在设施管理这一垂直领域的长期落地价值。
      </p>
      <p>
        「我们不是做一点点优化,而是从根本上改变管理的效率和透明度。」此次澳门之行,启盟与全球科技领袖、投资人和潜在客户深入交流——AI 正从屏幕走向真实的工厂、设备与日常运营,我们希望设施管理这个传统行业,搭上这一轮变革的列车。
      </p>
    </NewsShell>
  );
}
