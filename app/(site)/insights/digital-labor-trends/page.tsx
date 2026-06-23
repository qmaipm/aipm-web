import ArticleShell, { FigRow } from "../_ArticleShell";

export const metadata = {
  title: "数字劳动力的发展趋势 · 行业研究 — 启盟科技",
  description:
    "AI Agent 让“人机协同”成为新常态,个人与企业步入 AI 助理时代。来自埃森哲、IDC、易观分析的研判与数字员工八大趋势。",
};

const trends = [1, 2, 3, 4, 5, 6, 7, 8].map((i) => ({
  src: `/insights/digital-labor-trends-${i}.${i === 6 ? "jpg" : "png"}`,
  alt: `数字员工发展趋势 ${i}`,
}));

export default function Page() {
  return (
    <ArticleShell slug="digital-labor-trends">
      <p className="lede">
        AI Agent 让“人机协同”成为新常态,个人与企业,正一同步入 AI 助理时代。随着人工智能向智能体演进,自动化系统将能够自主决策和行动——智能体不再只是给人类提供建议,还将代表人类采取行动。
      </p>

      <h2>埃森哲:三年内的重大机遇</h2>
      <p>
        埃森哲在《技术展望 2024》报告中指出,96% 的企业高管认为,AI Agent 生态系统的应用将在未来 3 年内为他们的组织带来重大机遇。当智能体升级成人类的“同事”,企业就需要和智能体一起,重新构建技术与人才的未来。
      </p>

      <h2>IDC:人机协同成为新常态</h2>
      <p>
        IDC 在《AIGC 应用层十大趋势》报告中调研发现,所有受访企业都认为 AI Agent 是 AIGC 发展的确定性方向。其中,50% 的企业已在某项工作中试点 AI Agent,另有 34% 的企业正在制定应用计划。报告强调:AI Agent 让“人机协同”成为新常态,个人与企业步入 AI 助理时代。
      </p>

      <ul className="statrow">
        <li><b>96%</b><span>高管认为未来 3 年是重大机遇(埃森哲)</span></li>
        <li><b>50%</b><span>企业已试点 AI Agent(IDC)</span></li>
        <li><b>34%</b><span>企业正制定应用计划(IDC)</span></li>
      </ul>

      <h2>易观分析:数字员工的八大趋势</h2>
      <p>
        易观分析在《2024 年 AI 加速数字员工智能化落地报告》中,提出了数字劳动力的八大发展趋势,勾勒出数字员工市场未来演进的具体路径。
      </p>

      <FigRow cols={2} items={trends} />

      <p className="pull">智能体的角色正在发生质变:从“提建议”,到“替你做”,再到“自主决策怎么做”。</p>
      <p>
        这场转变要求企业不再把 AI 当成一个工具,而是当成一支需要被组织、被协作、被信任的队伍。谁更早学会和智能体一起工作,谁就更早拿到下一个时代的入场券。
      </p>
    </ArticleShell>
  );
}
