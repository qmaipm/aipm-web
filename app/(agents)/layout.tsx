// /agents:内容来自 homepage 原项目,但导航与页脚用全站统一的组件。
import "../globals.css"; // 全站设计系统(供 Navbar / Footer)
import "./_agents-app/globals.css"; // 原项目样式(供内容区:Hero / Clients / AgentShowcase)
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import RevealOnScroll from "@/components/RevealOnScroll";

export default function AgentsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
      <BackToTop />
      <RevealOnScroll />
    </>
  );
}
