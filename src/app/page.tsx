import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import NewTrending from "@/components/NewTrending";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <AboutSection />
      <NewTrending />
      <Footer />
    </main>
  );
}
