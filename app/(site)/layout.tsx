import "../globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import RevealOnScroll from "@/components/RevealOnScroll";
import ScrollTopOnNavigate from "@/components/ScrollTopOnNavigate";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ScrollTopOnNavigate />
      <Navbar />
      {children}
      <Footer />
      <BackToTop />
      <RevealOnScroll />
    </>
  );
}
