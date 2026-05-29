import { Nav } from "@/components/landing/nav";
import { Hero } from "@/components/landing/hero";
import { Stats } from "@/components/landing/stats";
import { Features } from "@/components/landing/features";
import { Architecture } from "@/components/landing/architecture";
import { CtaFooter } from "@/components/landing/cta-footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Nav />
      <Hero />
      <Stats />
      <Features />
      <Architecture />
      <CtaFooter />
    </div>
  );
}
