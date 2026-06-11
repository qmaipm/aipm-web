import Navbar from '@hp/components/layout/Navbar';
import Footer from '@hp/components/layout/Footer';
import Hero from '@hp/components/sections/Hero';
import Clients from '@hp/components/sections/Clients';
import AgentShowcase from '@hp/components/sections/AgentShowcase';
import GuideLineOverlay from '@hp/components/debug/GuideLineOverlay';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Clients />
      <AgentShowcase />
      <Footer />
      {/* 调试：按 Ctrl+G 显示/隐藏参照线 */}
      <GuideLineOverlay />
    </main>
  );
}
