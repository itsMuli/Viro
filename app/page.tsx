import { Header } from "@/components/docs/header";
import { Hero } from "@/components/landing/hero";
import { InteractiveDemo } from "@/components/landing/interactive-demo";
import { Philosophy } from "@/components/landing/philosophy";
import { Showcase } from "@/components/landing/showcase";
import { BlocksPreview } from "@/components/landing/blocks-preview";
import { DxSection } from "@/components/landing/dx-section";
import { Cta } from "@/components/landing/cta";
import { Footer } from "@/components/landing/footer";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <Hero />
        <InteractiveDemo />
        <Philosophy />
        <Showcase />
        <BlocksPreview />
        <DxSection />
        <Cta />
      </main>
      <Footer />
    </div>
  );
}
